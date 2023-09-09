import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Pressable,
  ActivityIndicator,
  Dimensions,
  Platform,
} from "react-native";
import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { userActions } from "../../store/user-slice";
import RNSocialButton from "../../reusable/RNSocialButton";
import RNButton from "../../reusable/RNButton";
import RNTextInput from "../../reusable/RNTextInput";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as AuthSession from "expo-auth-session";
import * as AppleAuthentication from "expo-apple-authentication";
import { Buffer } from "buffer";

WebBrowser.maybeCompleteAuthSession();

const apple_icon = require("../../assets/images/apple.png");
const fb_icon = require("../../assets/images/fb-icon.png");
const google_icon = require("../../assets/images/google-icon.png");
const apple_txt = "CONTINUE WITH APPLE";
const fb_txt = "CONTINUE WITH FACEBOOK";
const google_txt = "CONTINUE WITH GOOGLE";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [devicePushToken, setDevicePushToken] = useState(null);

  useEffect(() => {
    getDevicePushToken();
  }, []);

  const getDevicePushToken = async () => {
    let deviceToken = await AsyncStorage.getItem("deviceToken");
    setDevicePushToken(deviceToken);
  };

  const [, , promptAsync] = Google.useAuthRequest(
    {
      expoClientId:
        "35614476491-a0frolldqkhk3dot3ocs6sn6jdvc67o6.apps.googleusercontent.com",
      androidClientId:
        "35614476491-2tri7g1q7jkp81gk3lfqiu3h9jm9c2ap.apps.googleusercontent.com",
      iosClientId:
        "35614476491-fm0bhigqufhukiqla1od3jm7gs7788ps.apps.googleusercontent.com",
      redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    },
    { useProxy: true }
  );

  const [, , fbPromptAsync] = Facebook.useAuthRequest(
    {
      clientId: "2294396260733301",
      scopes: ["public_profile", "email"],
      redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    },
    { useProxy: true }
  );

  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.userAuth);

  const registerGoogle = async () => {
    const responseGoogle = await promptAsync();
    if (responseGoogle?.type === "success") {
      setLoading(true);
      let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: {
          Authorization: `Bearer ${responseGoogle?.authentication?.accessToken}`,
        },
      });
      const userInfo = await response?.json();
      const userData = {
        email: userInfo?.email,
        fullName: userInfo?.name,
        password: userInfo?.id,
        accountType: "Google",
        socialId: userInfo?.id,
        photoUrl: userInfo?.picture,
        deviceToken: devicePushToken,
      };
      setAccountType("Google");
      loginUser(userData);
    }
  };

  const registeFb = async () => {
    const response = await fbPromptAsync();
    if (response?.type === "success") {
      setLoading(true);
      const { access_token } = response?.params;
      let data = await fetch(
        `https://graph.facebook.com/me?access_token=${access_token}&fields=id,name,email,picture`
      );
      const userInfo = await data?.json();
      const userData = {
        email: userInfo?.email,
        fullName: userInfo?.name,
        password: userInfo?.id,
        accountType: "Facebook",
        socialId: userInfo?.id,
        photoUrl: userInfo?.picture?.data?.url,
        deviceToken: devicePushToken,
      };
      setAccountType("Facebook");
      loginUser(userData);
    }
  };

  const submitHander = () => {
    // Empty field
    if (email == "" || password == "") {
      alert("Please fill in all fields.");
      // Continue
    } else {
      setLoading(true);
      const userData = {
        email,
        fullName: "",
        password,
        accountType: "Email",
        socialId: "",
        photoUrl: "",
        deviceToken: devicePushToken,
      };
      setAccountType("Email");
      loginUser(userData);
    }
  };

  const loginUser = (user) => {
    axios
      .post("https://ethicallybased.com/mohanji-app-api/login.php", user)
      .then((result) => {
        if (result?.data?.status == 200) {
          // Save authToken to AsyncStorage
          const saveAuthToken = async () => {
            try {
              await AsyncStorage.setItem("authToken", result?.data?.authToken);
            } catch (err) {
              // console.log(err);
            }
          };
          saveAuthToken();
          dispatch(
            userActions.userAuthenticated({
              fullName: result?.data?.fullName,
              email: result?.data?.email,
              photoUrl: result?.data?.photoUrl ?? "",
              accountType: result?.data?.accountType ?? accountType,
              country: result?.data?.country ?? "",
              province: result?.data?.province ?? "",
              city: result?.data?.city ?? "",
              gender: result?.data?.gender,
              authToken: result?.data?.authToken,
              loggedIn: true,
            })
          );
          navigation.navigate("NavBarBottom");
          setLoading(false);
        } else {
          alert(result?.data?.errorMessage);
          setLoading(false);
        }
      });
  };

  return (
    <ImageBackground
      source={require("../../assets/splash/background2.png")}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        <ScrollView
          style={styles.containerInner}
          showsVerticalScrollIndicator={false}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Image
              source={require("../../assets/images/arrow-back.png")}
              style={styles.backArrow}
            />
          </Pressable>
          <Text style={styles.title}>Log in</Text>
          {Platform.OS === "ios" && (
            <RNSocialButton
              title={apple_txt}
              borderColor={"#00000090"}
              source={apple_icon}
              onPress={async () => {
                try {
                  const credential = await AppleAuthentication.signInAsync({
                    requestedScopes: [
                      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                      AppleAuthentication.AppleAuthenticationScope.EMAIL,
                    ],
                  });
                  const token = credential.identityToken;
                  const parts = token
                    .split(".")
                    .map((part) =>
                      Buffer.from(
                        part.replace(/-/g, "+").replace(/_/g, "/"),
                        "base64"
                      ).toString()
                    );

                  const payload = JSON.parse(parts[1]);

                  // console.log("JWT payload", payload);
                  var nameUser = payload?.email.substring(
                    0,
                    payload?.email.lastIndexOf("@")
                  );
                  setLoading(true);
                  const userData = {
                    email: payload?.email ?? "",
                    fullName:
                      credential?.fullName?.givenName !== null
                        ? credential?.fullName?.givenName
                        : nameUser,
                    password: credential?.user,
                    accountType: "Apple",
                    socialId: credential?.user,

                    photoUrl: "",
                    deviceToken: devicePushToken,
                  };
                  setAccountType("Apple");
                  loginUser(userData);
                  // signed in
                } catch (e) {
                  if (e.code === "ERR_REQUEST_CANCELED") {
                    // handle that the user canceled the sign-in flow
                  } else {
                    // handle other errors
                  }
                }
              }}
              width={48}
              paddingHorizontal={18}
            />
          )}
         {/* <RNSocialButton
            title={fb_txt}
            borderColor={"#AA8455"}
            tintColor={"#4267B2"}
            source={fb_icon}
            onPress={registeFb}
          />*/}
          <RNSocialButton
            title={google_txt}
            borderColor={"#66458F"}
            source={google_icon}
            onPress={registerGoogle}
          />
          <View style={styles.orContainer}>
            <Text style={styles.orTxt}>{"OR LOG IN WITH EMAIL"}</Text>
          </View>
          <RNTextInput
            placeholder={"Email address"}
            title={"Email"}
            onTextChange={setEmail}
            value={email}
          />
          <RNTextInput
            placeholder={"Password"}
            title={"Password"}
            secureTextEntry={true}
            onTextChange={setPassword}
            value={password}
          />
          <View style={{ height: 12 }} />
         {/* <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
            <View style={{ marginLeft: 16 }}>
              <Text style={{ color: "#3F414E", fontSize: 15 }}>
                {"Forgot Password? "}
              </Text>
            </View>
          </Pressable>*/}
          <View style={styles.spacer} />
          <RNButton
            title={"LOG IN"}
            // onPress={() => {
            //   navigation.navigate("NavBarBottom");
            // }}
            onPress={submitHander}
          />
          <Text style={styles.textBelow}>
            NEED AN ACCOUNT?{" "}
            <Text
              style={{ color: "#8E97FD", fontWeight: "bold" }}
              onPress={() => navigation.navigate("Register")}
            >
              SIGN UP
            </Text>
          </Text>
          {loading && (
            <View
              style={{
                position: "absolute",
                right: 0,
                left: 0,
                top: Dimensions.get("window").height / 2,
              }}
            >
              <ActivityIndicator size="large" color="#66458F" />
            </View>
          )}
          <View style={styles.divider}></View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingTop: 5,
  },
  containerInner: {
    padding: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    paddingTop: 0,
    paddingBottom: 20,
  },
  input: {
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 15,
    fontSize: 18,
  },
  textBelow: {
    marginTop: 15,
    textAlign: "center",
  },
  bioImage: {
    width: "100%",
    height: 200,
    marginTop: 40,
    borderRadius: 12,
  },
  bioText: {
    marginTop: 20,
  },
  bottomDivider: {
    height: 100,
  },
  backArrow: {
    width: 46,
    height: 51,
    resizeMode: "contain",
    marginVertical: 22,
  },
  spacer: { height: 18 },
  orContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
  },
  orTxt: {
    color: "#7E7E7E",
  },
  divider: {
    height: 100,
  },
});

// const response = await fetch(
//   `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`
// );

// const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
//   clientId:
//     "107702169396-v5uc8u4ukfeni1263tk98buk428tvsbf.apps.googleusercontent.com",
//   iosClientId:
//     "107702169396-2nul7pmo0vvjor3ll7kr19q3vq1ouuhj.apps.googleusercontent.com",
//   androidClientId:
//     "107702169396-g723hgopmjeegnfu1nn2f86np44sngct.apps.googleusercontent.com",
//   scopes: ["profile", "email"],
// });

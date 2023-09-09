import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Form,
  ImageBackground,
  Pressable,
  Dimensions,
  ActivityIndicator,
  Platform,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import "react-native-gesture-handler";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { userActions } from "../../store/user-slice";
import UserDashboard from "./UserDashboard";
import { Cache } from "react-native-cache";
import { setCacheData, getCacheData } from "../../utils/CacheHelper"; // Destructure returned values
import { useEffect } from "react";
import RNTextInput from "../../reusable/RNTextInput";
import RNButton from "../../reusable/RNButton";
import RNSocialButton from "../../reusable/RNSocialButton";
import BouncyCheckbox from "react-native-bouncy-checkbox";
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

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
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
      registerUser(userData);
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
      registerUser(userData);
    }
  };

  // // String

  // // Store cache data
  // setCacheData("Key 3", "Val");

  // // Get cache data
  // (async () => {
  //   const val = await getCacheData("Key 3");
  //   console.log(val.value);
  // })();

  // // OBJECT

  // const itemsArray = [
  //   { name: "Steven", email: "steven@test.com" },
  //   { name: "Lisa", email: "lisa@test.com" },
  // ];

  // // Store cache data
  // setCacheData("Key-Object", JSON.stringify(itemsArray));

  // // Get cache data
  // (async () => {
  //   const val = await getCacheData("Key-Object");
  //   console.log(JSON.parse(val.value));
  // })();

  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.userAuth);

  const submitHander = () => {
    if (email === "" || fullName === "" || password === "") {
      alert("Please full in all fields.");
      return;
      // Continue
    } else if (!isChecked) {
      alert("Please check privacy policy");
      return;
    } else {
      setLoading(true);
      const userData = {
        email,
        fullName,
        password,
        accountType: "Email",
        socialId: "",
        photoUrl: "",
        deviceToken: devicePushToken,
      };
      setAccountType("Email");
      registerUser(userData);
    }
  };

  const registerUser = (user) => {
    axios
      .post("https://ethicallybased.com/mohanji-app-api/register.php", user)
      .then((result) => {
        if (result.data.status == 200) {
          // Save authToken to AsyncStorage
          const saveAuthToken = async () => {
            try {
              await AsyncStorage.setItem("authToken", result.data.authToken);
            } catch (err) {
              //
            }
          };
          saveAuthToken();

          dispatch(
            userActions.userAuthenticated({
              fullName: result?.data?.fullName,
              email: result?.data?.email,
              photoUrl: result?.data?.photoUrl ?? "",
              accountType: result?.data?.accountType ?? accountType,
              authToken: result?.data?.authToken,
              country: result?.data?.country ?? "",
              province: result?.data?.province ?? "",
              city: result?.data?.city ?? "",
              gender: result?.data?.gender,
              loggedIn: true,
            })
          );
          navigation.navigate("NavBarBottom");
          setLoading(false);
        } else {
          alert(result.data.errorMessage);
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
          <Text style={styles.title}>Create your account</Text>
          {Platform.OS === "ios" && <RNSocialButton
              title={apple_txt}
              borderColor={"#00000090"}
              width={48}
              paddingHorizontal={18}
              source={apple_icon}
              onPress={async () => {
                try {
                  const credential = await AppleAuthentication.signInAsync({
                    requestedScopes: [
                      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                      AppleAuthentication.AppleAuthenticationScope.EMAIL,
                    ],
                  });
                  console.log("credential");
                  console.log(credential);
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

                  console.log("JWT payload", payload);
                  let nameUser = payload?.email.substring(
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
                  console.log(userData);
                  registerUser(userData);
                  // signed in
                } catch (e) {
                  if (e.code === "ERR_REQUEST_CANCELED") {
                    // handle that the user canceled the sign-in flow
                  } else {
                    // handle other errors
                  }
                }
              }}
            />}
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
            <Text style={styles.orTxt}>{"OR SIGN UP WITH EMAIL"}</Text>
          </View>

          <RNTextInput
            placeholder={"Full Name"}
            title={"Full Name"}
            onTextChange={setFullName}
            value={fullName}
          />
          <RNTextInput
            placeholder={"Email"}
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
          <View style={styles.policyContainer}>
            <Text style={{ color: "#7E7E7E", fontSize: 14 }}>
              {"I have read the "}
              <Text style={{ color: "#7583CA" }}>{"Privacy Policy"}</Text>
            </Text>
            <BouncyCheckbox
              size={24}
              fillColor="#66458F"
              unfillColor="#FFFFFF"
              textStyle={{
                textDecorationLine: "none",
              }}
              iconStyle={{ borderColor: "#66458F", borderRadius: 5 }}
              innerIconStyle={{ borderWidth: 2, borderRadius: 5 }}
              onPress={() => setIsChecked(!isChecked)}
            />
          </View>

          <View style={{ height: 22 }} />
          <RNButton
            title={"GET STARTED"}
            // onPress={() => {
            //   navigation.navigate("Questionare");
            // }}
            onPress={submitHander}
          />
          <Text style={[styles.textBelow, { color: "#7E7E7E" }]}>
            ALREADY HAVE AN ACCOUNT?{" "}
            <Text
              style={{ color: "#8E97FD", fontWeight: "bold" }}
              onPress={() => navigation.navigate("Login")}
            >
              LOG IN
            </Text>
          </Text>
          <View style={styles.spacer} />
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
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default Register;

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
    fontWeight: "600",
    paddingTop: 0,
    paddingBottom: 22,
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
  orContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
  },
  orTxt: {
    color: "#7E7E7E",
  },
  policyContainer: {
    height: 22,
    marginLeft: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  spacer: { height: 66 },
  backArrow: {
    width: 46,
    height: 51,
    resizeMode: "contain",
    marginVertical: 22,
  },
});

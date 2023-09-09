import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Form,
  ImageBackground,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import "react-native-gesture-handler";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { userActions } from "../../store/user-slice";

const Login = ({ navigation }, props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.userAuth);

  const submitHander = (e) => {
    e.preventDefault();

    // Empty field
    if (email == "" || password == "") {
      alert("Please full in all fields.");
      // Continue
    } else {
      const userData = {
        email: email,
        password: password,
      };

      axios
        .post("https://ethicallybased.com/mohanji-app-api/login.php", userData)
        .then((result) => {
          if (result.data.status == 200) {
            // Save authToken to AsyncStorage
            const saveAuthToken = async () => {
              try {
                await AsyncStorage.setItem("authToken", result.data.authToken);
              } catch (err) {
                // console.log(err);
              }
            };
            saveAuthToken();

            dispatch(
              userActions.userAuthenticated({
                fullName: result.data.fullName,
                email: result.data.email,
                authToken: result.data.authToken,
                loggedIn: true,
              })
            );
            navigation.navigate("UserDashboard");
          } else {
            alert(result.data.errorMessage);
          }
        });
    }
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
          <Text style={styles.title}>Login</Text>
          <TextInput
            label="Email"
            value={email}
            onChangeText={(val) => setEmail(val)}
            style={styles.input}
            activeUnderlineColor="#E1AE00"
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={(val) => setPassword(val)}
            style={styles.input}
            activeUnderlineColor="#E1AE00"
            secureTextEntry={true}
          />
          <Button
            mode="contained-tonal"
            onPress={submitHander}
            textColor="#222"
            buttonColor="#E1AE00"
            style={styles.button}
          >
            Login
          </Button>
          <Text style={styles.textBelow}>
            Need an account?{" "}
            <Text
              style={{ color: "#E1AE00", fontWeight: "bold" }}
              onPress={() => navigation.navigate("Register")}
            >
              Join
            </Text>
          </Text>
          <View>
            <Image
              style={styles.bioImage}
              source={{
                uri: "https://mohanji-app.fra1.digitaloceanspaces.com/images/mohanji-2.jpeg",
              }}
            />
          </View>
          <View style={styles.bottomDivider}></View>
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
    marginBottom: 60,
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
});

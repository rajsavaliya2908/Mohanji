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
import UserDashboard from "./UserDashboard";
import { Cache } from "react-native-cache";
import { setCacheData, getCacheData } from "../../utils/CacheHelper"; // Destructure returned values
import { useEffect } from "react";

const Register = ({ navigation }, props) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

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

  const submitHander = (e) => {
    e.preventDefault();

    // Empty field
    if (email == "" || fullName == "" || password == "") {
      alert("Please full in all fields.");
      // Continue
    } else {
      const userData = {
        email: email,
        fullName: fullName,
        password: password,
      };

      axios
        .post("https://ethicallybased.com/mohanji-app-api/register.php", userData)
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
          <Text style={styles.title}>Register</Text>
          <TextInput
            label="Full Name"
            value={fullName}
            onChangeText={(val) => setFullName(val)}
            style={styles.input}
            activeUnderlineColor="#E1AE00"
          />
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
            Join
          </Button>
          <Text style={styles.textBelow}>
            Already have an account?{" "}
            <Text
              style={{ color: "#E1AE00", fontWeight: "bold" }}
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Text>
          </Text>
          <View>
            <Image
              style={styles.bioImage}
              source={{
                uri: "https://mohanji-app.fra1.digitaloceanspaces.com/images/mohanji-1.jpeg",
              }}
            />
          </View>
          <Text style={styles.bioText}>
            Mohanji describes himself as a friend of the world, as a person
            trying to raise the awareness of generations from selfishness to
            selflessness. He has dedicated his life to serving the world with
            this single purpose - to raise humans to achieve the highest values
            of human potential such as kindness, compassion and non-violence. Or
            in other words, make the transition from human-kind to kind humans.
          </Text>
          <View style={styles.bottomDivider}></View>
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

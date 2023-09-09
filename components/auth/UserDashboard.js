import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import React from "react";
import { TextInput, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { userActions } from "../../store/user-slice";
import { useState } from "react";

const UserDashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.userAuth);

  const [email, setEmail] = useState(userAuth.email);
  const [fullName, setFullName] = useState(userAuth.fullName);
  const [authToken, setAuthToken] = useState(userAuth.authToken);

  const submitHander = (e) => {
    e.preventDefault();

    // Empty field
    if (email == "" || fullName == "") {
      alert("Please full in all fields.");
      // Continue
    } else {
      const userData = {
        email: email,
        fullName: fullName,
        authToken: authToken,
      };

      axios
        .post("https://ethicallybased.com/mohanji-app-api/updateBasicInfo.php", userData)
        .then((result) => {
          if (result.data.status == 200) {
            alert(result.data.successMessage);
            dispatch(
              userActions.userAuthenticated({
                fullName: result.data.fullName,
                email: result.data.email,
                loggedIn: true,
              })
            );
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
          <View
            style={{ flexDirection: "row", paddingTop: 0, paddingBottom: 30 }}
          >
            <Text
              style={{
                width: "30%",
                marginLeft: "3%",
                textAlign: "center",
                fontSize: 16,
                fontWeight: "bold",
              }}
              onPress={() => navigation.navigate("UserDashboard")}
            >
              Account Information
            </Text>
            <Text
              style={{
                width: "30%",
                marginLeft: "1.5%",
                marginRight: "1.5%",
                textAlign: "center",
                fontSize: 16,
              }}
              onPress={() => navigation.navigate("UpdatePassword")}
            >
              Change Password
            </Text>
            <Text
              style={{
                width: "30%",
                marginRight: "3%",
                textAlign: "center",
                fontSize: 16,
              }}
              onPress={() => navigation.navigate("CommunicationPreferences")}
            >
              Notifications
            </Text>
          </View>

          <Text style={styles.title}>Welcome {userAuth.fullName}</Text>

          <Text style={{ marginTop: 5, marginBottom: 20, textAlign: "center" }}>
            Update your information
          </Text>
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
          <Button
            mode="contained-tonal"
            onPress={submitHander}
            textColor="#222"
            buttonColor="#E1AE00"
            style={styles.button}
          >
            Update
          </Button>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default UserDashboard;

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
    fontSize: 22,
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

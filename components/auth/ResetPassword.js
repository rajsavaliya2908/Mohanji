import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import RNTextInput from "../../reusable/RNTextInput";
import RNButton from "../../reusable/RNButton";

const ResetPassword = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <ImageBackground
      source={require("../../assets/splash/background2.png")}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <Pressable onPress={() => navigation.goBack()}>
        <Image
          source={require("../../assets/images/arrow-back.png")}
          style={styles.backArrow}
        />
      </Pressable>
      <View style={styles.container}>
        <View style={styles.spacer} />

        <Text style={styles.forgotTxtTitle}>{"Reset Your Password"}</Text>

        <Text style={styles.resetTxt}>{"Please enter your new password."}</Text>
        <RNTextInput
          placeholder={"Password"}
          title={"Password"}
          secureTextEntry={true}
          onTextChange={setPassword}
          value={password}
        />
        <RNTextInput
          placeholder={"Confirm Password"}
          title={"Confirm Password"}
          secureTextEntry={true}
          onTextChange={setConfirmPassword}
          value={confirmPassword}
        />
        <View style={{ height: 16 }} />
        <RNButton
          title={"RESET PASSWORD"}
          onPress={() => navigation.navigate("ResetPassword")}
        />
      </View>
    </ImageBackground>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  container: {
    flex: 1,
    paddingTop: 5,
  },
  backArrow: {
    width: 46,
    height: 51,
    resizeMode: "contain",
    marginVertical: 22,
  },
  forgotTxtTitle: {
    color: "#515151",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  spacer: { height: 100 },
  resetTxt: {
    textAlign: "center",
    color: "#515151",
    marginVertical: 12,
    fontSize: 14,
    fontWeight: "400",
  },
  signinTxt: {
    color: "#8E97FD",
    textAlign: "center",
    marginVertical: 12,
    fontSize: 16,
    fontWeight: "600",
  },
});

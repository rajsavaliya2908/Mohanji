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

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
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

        <Text style={styles.forgotTxtTitle}>{"Forgot Your Password"}</Text>

        <Text style={styles.instructionTxt}>
          {"Please enter your email address.\n"}
          <Text>
            {
              "If an account exists with this email address,\n you will recive a password reset link."
            }
          </Text>
        </Text>
        <RNTextInput
          placeholder={"Email address"}
          title={"Email"}
          onTextChange={setEmail}
          value={email}
        />
        <View style={{ height: 16 }} />
        <RNButton
          title={"SUBMIT"}
          onPress={() => navigation.navigate("ResetPassword")}
        />
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.signinTxt}>{"SIGN IN"}</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default ForgotPassword;

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
  instructionTxt: {
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

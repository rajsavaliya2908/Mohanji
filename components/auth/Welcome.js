import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  Pressable,
} from "react-native";
import React from "react";
import RNButton from "../../reusable/RNButton";

const { width } = Dimensions.get("window");

const Welcome = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/splash/background2.png")}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        <View style={styles.spacer} />
        <Image
          style={styles.logo}
          source={require("../../assets/images/Mohanji-Logo.png")}
        />
        <Text style={styles.welcomeTxt}>{"Welcome!"}</Text>
        <Text style={styles.descTxt}>
          {"Start your inner journey of self-discovery today."}
        </Text>
        <View style={{ height: 60 }} />
        <RNButton
          title={"SIGN UP"}
          borderColor={"#7851A9"}
          bgColor={"transparent"}
          titleColor={"#66458F"}
          onPress={() => {
            navigation.navigate("Register");
          }}
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
      </View>
    </ImageBackground>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  spacer: {
    height: 150,
  },
  logo: {
    width: width,
    height: 150,
    resizeMode: "contain",
    alignSelf: "center",
  },
  welcomeTxt: {
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 44,
    marginBottom: 22,
  },
  descTxt: {
    alignSelf: "center",
    color: "#515151",
    fontSize: 14,
  },
  textBelow: {
    marginTop: 20,
    alignSelf: "center",
  },
  skipTxt: {
    alignSelf: "center",
    marginVertical: 12,
    fontSize: 16,
    fontWeight: "600",
  },
});

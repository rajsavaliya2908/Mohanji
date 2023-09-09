import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const DropDown = ({ title, inputTxt }) => {
  return (
    <View style={styles.conatiner}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.txtInput}>
        <Text style={styles.inputTxt}>{inputTxt}</Text>
        <Image
          style={{ width: 22, height: 22, resizeMode: "contain" }}
          source={require("../assets/images/arrow-down.png")}
        />
      </View>
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  conatiner: {
    marginHorizontal: 22,
  },
  title: {
    color: "#7E7E7E",
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 10,
  },
  txtInput: {
    height: 56,
    backgroundColor: "#FFFFFF",
    borderRadius: 33,
    backgroundColor: "#FFFFFF",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 2,
    paddingHorizontal: 22,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  inputTxt: {
    color: "#A1A4B2",
    fontSize: 18,
    fontWeight: "500",
  },
});

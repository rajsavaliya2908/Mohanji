import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const RNButton = ({ title, onPress, borderColor, bgColor, titleColor }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => onPress()}>
      <View
        style={[
          styles.container,
          {
            borderColor: borderColor ? borderColor : null,
            borderWidth: borderColor ? 2 : null,
            backgroundColor: bgColor ? bgColor : "#66458F",
          },
        ]}
      >
        <Text
          style={[styles.title, { color: titleColor ? titleColor : "#F6F1FB" }]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RNButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 33,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
});

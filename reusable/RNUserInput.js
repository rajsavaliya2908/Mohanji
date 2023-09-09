import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import React from "react";

const RNUserInput = ({
  placeholder,
  title,
  value,
  onTextChange = () => {},
  secureTextEntry,
  icon,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholderTextColor={"#A1A4B2"}
          placeholder={placeholder}
          style={styles.input}
          textAlign={"left"}
          onChangeText={onTextChange}
          value={value}
          secureTextEntry={secureTextEntry}
        />
        {icon && (
          <Image
            style={styles.editIcon}
            source={require("../assets/images/editPreset.png")}
          />
        )}
      </View>
    </View>
  );
};

export default RNUserInput;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 22,
  },
  input: {
    width: "100%",
    height: 56,
    backgroundColor: "#FFFFFF",
    borderRadius: 33,
    fontSize: 18,
    fontWeight: "400",
    paddingBottom: 0,
    paddingTop: 0,
    paddingHorizontal: 22,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 2,
  },
  title: {
    color: "#7E7E7E",
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  editIcon: {
    width: 26,
    height: 26,
    resizeMode: "contain",
    right: 46,
  },
});

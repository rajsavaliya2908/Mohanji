import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

const RNTextInput = ({
  placeholder,
  title,
  value,
  onTextChange = () => {},
  secureTextEntry,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        placeholderTextColor={"#A1A4B2"}
        placeholder={placeholder}
        style={styles.input}
        textAlign={"left"}
        onChangeText={onTextChange}
        value={value}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default RNTextInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    width: "100%",
    height: 56,
    backgroundColor: "#FFFFFF",
    borderRadius: 33,
    fontSize: 16,
    fontWeight: "400",
    marginTop: 8,
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
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 12,
  },
});

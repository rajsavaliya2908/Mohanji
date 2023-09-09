import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";

const RNSocialButton = ({
  title,
  borderColor,
  source,
  tintColor,
  onPress,
  width,
  paddingHorizontal,
}) => {
  return (
    <Pressable onPress={() => onPress()}>
      <View
        style={[
          styles.container,
          {
            borderColor: borderColor,
            paddingHorizontal: paddingHorizontal ? paddingHorizontal : 28,
          },
        ]}
      >
        <Image
          source={source}
          style={[
            styles.icon,
            {
              tintColor: tintColor,
              width: width ? width : 28,
            },
          ]}
        />
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default RNSocialButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 56,
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 33,
    borderWidth: 2,
    flexDirection: "row",
    marginVertical: 12,
  },
  title: {
    color: "#3F414E",
    fontSize: 14,
    fontWeight: "500",
    paddingHorizontal: 33,
  },
  icon: {
    resizeMode: "contain",
    height: 28,
  },
});

import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import "react-native-gesture-handler";
import React from "react";

const Presets = ({ navigation }, props) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerInner}>
        <View
          style={{ flexDirection: "row", paddingTop: 0, paddingBottom: 30 }}
        >
          <Text
            style={{
              width: "30%",
              marginLeft: "20%",
              textAlign: "center",
              fontSize: 16,
            }}
            onPress={() => navigation.navigate("Timer")}
          >
            Timer
          </Text>
          <Text
            style={{
              width: "30%",
              marginRight: "20%",
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
            }}
            onPress={() => navigation.navigate("Presets")}
          >
            Presets
          </Text>
        </View>

        <Text style={styles.title}>Presets</Text>
      </View>
    </View>
  );
};

export default Presets;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginBottom: 60,
      backgroundColor: "#fff",
    },
    containerInner: {
      padding: 20,
      textAlign: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
    },
    title: {
      textAlign: "center",
      fontSize: 26,
      fontWeight: "bold",
      paddingBottom: 25,
    },
    modalInner: {
      flexDirection: "row",
    },
    modalInnerPadding: {
      paddingTop: 30,
      paddingLeft: 30,
      paddingRight: 50,
      paddingBottom: 10,
    },
    modalTitle: {
      textAlign: "center",
      fontSize: 22,
      fontWeight: "bold",
      paddingTop: 35,
      paddingBottom: 0,
    },
    wheelEach: {
      marginTop: 10,
      flex: 1,
      alignItems: "center",
      fontSize: 18,
    },
    bottomDivider: {
      height: 100,
    },
    timerRowFirst: {
      paddingTop: 15,
      paddingBottom: 15,
      flexDirection: "row",
      borderTopWidth: 1,
      borderTopColor: "#ccc",
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
    timerRowAdditional: {
      paddingTop: 15,
      paddingBottom: 15,
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
    timerRowLeft: {
      width: "50%",
      textAlign: "left",
    },
    timerRowRight: {
      width: "50%",
      textAlign: "right",
    },
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 4,
      color: "black",
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: "purple",
      borderRadius: 8,
      color: "black",
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });
  
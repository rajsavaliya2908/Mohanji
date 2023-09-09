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
import BouncyCheckbox from "react-native-bouncy-checkbox";

const CommunicationPreferences = ({ navigation }) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

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
          <View>
            <View
              style={{ flexDirection: "row", paddingTop: 0, paddingBottom: 30 }}
            >
              <Text
                style={{
                  width: "30%",
                  marginLeft: "3%",
                  textAlign: "center",
                  fontSize: 16,
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
                  fontWeight: "bold",
                  fontSize: 16,
                }}
                onPress={() => navigation.navigate("CommunicationPreferences")}
              >
                Notifications
              </Text>
            </View>
            <View>
              <Text style={styles.title}>Communication Preferences</Text>
              <Text>
                Choose which notifications you want to receive to your phone.
              </Text>
            </View>
            <View style={styles.containerRow}>
              <BouncyCheckbox
                size={32}
                fillColor="#B78F5E"
                unfillColor="#FFFFFF"
                text="Daily Quotes"
                textStyle={{
                  textDecorationLine: "none",
                }}
                iconStyle={{ borderColor: "#B78F5E", borderRadius: 5 }}
                innerIconStyle={{ borderWidth: 2, borderRadius: 5 }}
                style={{ marginTop: 15 }}
                onPress={() => {}}
              />
              <BouncyCheckbox
                size={32}
                fillColor="#B78F5E"
                unfillColor="#FFFFFF"
                text="Upcoming Events"
                textStyle={{
                  textDecorationLine: "none",
                }}
                iconStyle={{ borderColor: "#B78F5E", borderRadius: 5 }}
                innerIconStyle={{ borderWidth: 2, borderRadius: 5 }}
                style={{ marginTop: 15 }}
                onPress={() => {}}
              />
              <BouncyCheckbox
                size={32}
                fillColor="#B78F5E"
                unfillColor="#FFFFFF"
                text="Meditation Reminders"
                textStyle={{
                  textDecorationLine: "none",
                }}
                iconStyle={{ borderColor: "#B78F5E", borderRadius: 5 }}
                innerIconStyle={{ borderWidth: 2, borderRadius: 5 }}
                style={{ marginTop: 15 }}
                onPress={() => {}}
              />
              <BouncyCheckbox
                size={32}
                fillColor="#B78F5E"
                unfillColor="#FFFFFF"
                text="Check-In: Question Abour Your Day"
                textStyle={{
                  textDecorationLine: "none",
                }}
                iconStyle={{ borderColor: "#B78F5E", borderRadius: 5 }}
                innerIconStyle={{ borderWidth: 2, borderRadius: 5 }}
                style={{ marginTop: 15 }}
                onPress={() => {}}
              />
              <BouncyCheckbox
                size={32}
                fillColor="#B78F5E"
                unfillColor="#FFFFFF"
                text="Milestones"
                textStyle={{
                  textDecorationLine: "none",
                }}
                iconStyle={{ borderColor: "#B78F5E", borderRadius: 5 }}
                innerIconStyle={{ borderWidth: 2, borderRadius: 5 }}
                style={{ marginTop: 15 }}
                onPress={() => {}}
              />
              <BouncyCheckbox
                size={32}
                fillColor="#B78F5E"
                unfillColor="#FFFFFF"
                text="Miscellaneous Updates"
                textStyle={{
                  textDecorationLine: "none",
                }}
                iconStyle={{ borderColor: "#B78F5E", borderRadius: 5 }}
                innerIconStyle={{ borderWidth: 2, borderRadius: 5 }}
                style={{ marginTop: 15 }}
                onPress={() => {}}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default CommunicationPreferences;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    marginBottom: 60,
    paddingTop: 5,
  },
  containerInner: {
    padding: 20,
  },
  containerRow: {
    marginTop: 10,
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
  checkboxContainer: {
    paddingTop: 25,
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});

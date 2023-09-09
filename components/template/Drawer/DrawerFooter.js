import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userActions } from "../../../store/user-slice";

const DrawerFooter = ({ navigation }) => {
  const dispatch = useDispatch();
  const confirmation = () => {
    Alert.alert("Logout", "Do you want to logout?", [
      {
        text: "No",
        style: "cancel",
      },
      { text: "Yes", onPress: () => logout() },
    ]);
  };
  const logout = async () => {
    navigation.toggleDrawer();
    await AsyncStorage.removeItem("authToken");
    dispatch(
      userActions.userAuthenticated({
        fullName: "",
        email: "",
        authToken: "",
        photoUrl: "",
        country: "",
        province: "",
        city: "",
        gender: "",
        loggedIn: false,
      })
    );
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "AuthStack", params: { screen: "Login" } }],
        })
      );
    }, 50);
  };
  return (
    <View>
      <TouchableOpacity activeOpacity={0.7} onPress={confirmation}>
        <View style={styles.footer}>
          <Image
            source={require("../../../assets/images/sign-out.png")}
            style={styles.icon}
          />
          <Text style={styles.footerLabel}>{"Sign Out"}</Text>
        </View>
        <View style={{ height: 22 }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    marginHorizontal: 22,
    marginVertical: 26,
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 26,
    resizeMode: "contain",
  },
  footerLabel: {
    paddingHorizontal: 22,
    color: "#515151",
    fontSize: 18,
    fontWeight: "500",
  },
});

export default DrawerFooter;

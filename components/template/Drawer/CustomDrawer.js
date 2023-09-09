import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, StyleSheet } from "react-native";
import DrawerHeader from "./DrawerHeader";
import DrawerFooter from "./DrawerFooter";
import DrawerItem from "./DrawerItem";
import PrivacyPolicy from "../PrivacyPolicy";
import ProgressTab from "../ProgressTab";

const CustomDrawer = (props) => {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <DrawerHeader {...props} />
        <DrawerItemList {...props} />
        <DrawerItem
          src={require("../../../assets/images/account.png")}
          imgStyles={styles.icon}
          labelStyle={styles.label}
          txt={"My Account"}
          screen={"UserAccount"}
          navigation={props.navigation}
        />
        {/* <DrawerItem
          src={require("../../../assets/images/account.png")}
          imgStyles={styles.icon}
          labelStyle={styles.label}
          txt={"Contemplation Assistant"}
          screen={"ContemplationAssistantHome"}
          navigation={props.navigation}
        /> */}
        <DrawerItem
          src={require("../../../assets/images/about-us.png")}
          imgStyles={styles.icon}
          labelStyle={styles.label}
          txt={"Who Is Mohanji"}
          screen={"WhoIsMohanji"}
          navigation={props.navigation}
        />
        {/* <DrawerItem
          src={require("../../../assets/images/account.png")}
          imgStyles={styles.icon}
          labelStyle={styles.label}
          txt={"My Journal"}
          screen={"Journal"}
          navigation={props.navigation}
        /> */}
        {/* <DrawerItem
          src={require("../../../assets/images/progress.png")}
          imgStyles={styles.icon}
          labelStyle={styles.label}
          txt={"Your Progress"}
          screen={"ProgressTab"}
          navigation={props.navigation}
        /> */}
        <DrawerItem
          src={require("../../../assets/images/privacy.png")}
          imgStyles={styles.icon}
          labelStyle={styles.label}
          txt={"Notifications"}
          screen={"NotificationsPreferences"}
          navigation={props.navigation}
        />
        {/* <DrawerItem
          src={require("../../../assets/images/terms-of-service.png")}
          imgStyles={styles.icon}
          labelStyle={styles.label}
          txt={"Terms of Service"}
        /> */}
        <DrawerItem
          src={require("../../../assets/images/get-involved.png")}
          imgStyles={styles.icon}
          labelStyle={styles.label}
          txt={"Get Involved"}
          linking={true}
        />
        <DrawerItem
          src={require("../../../assets/images/app-share.png")}
          imgStyles={styles.icon}
          labelStyle={styles.label}
          txt={"Share This App"}
          share={true}
        />
        <DrawerItem
          src={require("../../../assets/images/privacy_policy.png")}
          imgStyles={styles.icon}
          labelStyle={styles.label}
          txt={"Privacy Policy"}
          screen={"PrivacyPolicy"}
          navigation={props.navigation}
        />
      </DrawerContentScrollView>
      <DrawerFooter {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
    resizeMode: "contain",
  },
  label: {
    color: "#515151",
    fontSize: 18,
    fontWeight: "500",
  },
  icon: {
    width: 30,
    height: 26,
    resizeMode: "contain",
    tintColor: "#515151",
  },
  divider: {
    borderBottomColor: "#38393D",
    borderWidth: 1.2,
    marginHorizontal: 22,
  },
});

export default CustomDrawer;

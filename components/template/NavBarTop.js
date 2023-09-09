import * as React from "react";
import { Appbar, Menu, Button } from "react-native-paper";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { Modal, Portal } from "react-native-paper";
import store from "../../store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import HomeScreen from "./HomeScreen";
import languageList from "../../hooks/LanguageList";
import { Ionicons } from "@expo/vector-icons";
import SearchResults from "./SearchResults";

const NavBarTop = ({ navigation, back }) => {
  const dispatch = useDispatch();
  const [menuVisible, setMenuVisible] = useState(false);
  const userAuth = useSelector((state) => state.userAuth);
  const userLink = userAuth.loggedIn ? "UserDashboard" : "Register";
  const [languageSelect, setLanguageSelect] = useState();
  const [visibleLanguageSelect, setVisibleLanguageSelect] = useState(false);

  // MODAL CONTAINER STYLE
  const containerStyle = {
    margin: 20,
    borderRadius: 20,
    backgroundColor: "#fff",
  };

  // STARTING BELL MODAL
  const LanguageWrapperModal = () => {
    const dispatch = useDispatch();

    const languageUpdateFunc = (language) => {
      dispatch(
        userActions.languagePref({
          language: language,
        })
      );
      setVisibleLanguageSelect(false);
    };

    return (
      <Portal>
        <Modal
          visible={visibleLanguageSelect}
          onDismiss={() => setVisibleLanguageSelect(false)}
          contentContainerStyle={containerStyle}
        >
          <ScrollView persistentScrollbar={true}>
            <View style={styles.languageWrapperInner}>
              {languageList.map((language) => (
                <TouchableOpacity
                  style={styles.languageEach}
                  onPress={() => languageUpdateFunc(language.languageCode)}
                >
                  <View style={styles.languageEachTextWrapper}>
                    <Text style={styles.languageEachText}>
                      {language.languageDisplay}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </Modal>
      </Portal>
    );
  };

  const logoutHandler = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      dispatch(
        userActions.userAuthenticated({
          fullName: "",
          email: "",
          authToken: "",
          loggedIn: "",
        })
      );
      navigation.navigate("Home");
    } catch (exception) {
      //
    }
  };
  
  return (
    <View>
      {/* <LanguageWrapperModal /> */}
      <Appbar.Header style={styles.header}>
        <Menu
          visible={menuVisible}
          onDismiss={() => navigation.toggleDrawer()}
          // onDismiss={() => setMenuVisible(false)}
          style={styles.menuDrawerWrapper}
          color="white"
          anchor={
            <Appbar.Action
              icon="menu"
              color="#222"
              // onPress={() => setMenuVisible(true)}
              onPress={() => navigation.toggleDrawer()}
            />
          }
        >
          {/* <Menu.Item
            onPress={() => {
              navigation.navigate("HomeScreen");
              setMenuVisible(false);
            }}
            title="Home"
          /> */}

          <Menu.Item
            style={styles.menuEachFirst}
            onPress={() => {
              navigation.navigate("Timer");
              setMenuVisible(false);
            }}
            title="Meditation timer"
          />

          {/* Logged out */}
          {!userAuth.loggedIn && (
            <View>
              <Menu.Item
                style={styles.menuEach}
                title="Create Account"
                onPress={() => {
                  navigation.navigate("Register");
                  setMenuVisible(false);
                }}
              />
              <Menu.Item
                style={styles.menuEach}
                title="Login"
                onPress={() => {
                  navigation.navigate("Login");
                  setMenuVisible(false);
                }}
              />
            </View>
          )}

          {/* Logged in */}
          {userAuth.loggedIn && (
            <Menu.Item
              title="Logout"
              style={styles.menuEach}
              onPress={() => logoutHandler()}
            />
          )}
        </Menu>
        <Appbar.Content title="" />
        <Image
          style={{
            width: 100,
            height: 50,
            resizeMode: "contain",
            bottom: 4,
          }}
          source={require("../../assets/images/mohanji-logo-main.png")}
        />
        <Appbar.Content title="" />
        <Menu
          anchor={
            <Appbar.Action
              icon="magnify"
              color="#222"
              onPress={() => {
                navigation.navigate("SearchResults");
              }}
            />
          }
        ></Menu>
      </Appbar.Header>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    height: 60,
    backgroundColor: "#FFFFFF",
    padding: 2,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: "#f6f6f6",
    elevation: 3,
  },
  languageWrapperInner: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  languageEach: {
    width: "100%",
    paddingBottom: 10,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  languageEachTextWrapper: {
    // marginTop: 4,
  },
  languageEachText: {
    fontSize: 22,
  },
  menuDrawerWrapper: {
    width: "70%",
    flex: 1,
    height: "100%",
    // top: 0,
    marginLeft: -10,
    borderBottomRightRadius: 40,
  },
  menuEachFirst: {
    marginTop: 0,
    marginLeft: 20,
  },
  menuEach: {
    marginLeft: 20,
  },
});

export default NavBarTop;
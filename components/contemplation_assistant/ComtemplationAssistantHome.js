import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Linking,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import axios from "axios";

const ContemplationAssistantHome = ({ navigation }, props) => {
  const userAuth = useSelector((state) => state.userAuth);
  const [fullName, setFullName] = useState(userAuth.fullName);

  return (
    <ImageBackground
      source={require("../../assets/splash/background2.png")}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Contemplation Assistant</Text>
          </View>

          
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default ContemplationAssistantHome;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingTop: 25,
    paddingBottom: 0,
    color: "#fff",
  },
  containerInner: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    width: "100%",
    paddingHorizontal: 8,
  },
  divider: {
    height: 100,
  },
});

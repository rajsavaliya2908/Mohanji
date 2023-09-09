import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AudioSlider from "../audio/AudioSlider";
import DropDown from "react-native-paper-dropdown";

const createTwoButtonAlert = () =>
  Alert.alert(
    "",
    "Much more than just a relaxing meditation, Power of Purity Meditation is a cleansing operation for our inner space where we unhook from the past through forgiveness and gratitude. Each time this meditation is practiced, deep inner healing and cleansing takes place. It is also excellent for healing relationships and shifting into the vibration of gratitude.",
    [{ text: "Close" }]
  );

// AXIOS, create object of all meditations

const updateLanguageFunc = () => {
  //
};

const PracticesEach = ({ navigation, route }, props) => {
  const userAuth = useSelector((state) => state.userAuth);
  const [showDropDown, setShowDropDown] = useState(false);
  const [meditationLanguageCode, setMeditationLanguageCode] = useState(
    route.params.languageCode
  );
  const [meditationLanguageDisplay, setMeditationLanguageDisplay] = useState(
    route.params.LanguageDisplay
  );
  const [meditationType, setMeditationType] = useState(
    route.params.meditationType
  );
  const [audioUrl, setAudioUrl] = useState(route.params.audioUrl);
  const [durationMinutes, setDurationMinutes] = useState(
    route.params.durationMinutes
  );
  const [durationSeconds, setDurationSeconds] = useState(
    route.params.durationSeconds
  );
  const [languagesList, setLanguagesList] = useState([]);

  useEffect(() => {
    setMeditationType(route.params.meditationType);
  });

  useEffect(() => {
    
    axios
      .get(
        "https://ethicallybased.com/mohanji-app-api/get.php?type=practices&languageCode=" +
          meditationLanguageCode +
          "&meditationType=" +
          meditationType
      )
      .then((response) => {
        // Success
        if (response.data.status == 200) {
          setAudioUrl(response.data.audioUrl);
          setDurationMinutes(response.data.durationMinutes);
          setDurationSeconds(response.data.durationSeconds);
          setMeditationLanguageCode(response.data.languageCode);
          setMeditationLanguageDisplay(response.data.languageDisplay);
          setLanguagesList(response.data.languagesList);

          if (response.data.audioUrl !== audioUrl) {
            navigation.replace("PracticesEach", {
              meditationType: response.data.meditationType,
              content: route.params.content,
              thumbnail: route.params.thumbnail,
              audioUrl: response.data.audioUrl,
              durationMinutes: response.data.durationMinutes,
              durationSeconds: response.data.durationSeconds,
              languageCode: response.data.languageCode,
            });
          }

          // Error
        } else {
          // alert(response.data.errorMessage);
          // If user switches to a new practice and it's set to a non-existing language, default it back to english.
          setMeditationLanguageCode("en");
          setMeditationLanguageDisplay("English");
        }
      });
  }, [audioUrl, meditationLanguageCode, meditationType]);

  return (
    <ImageBackground
      source={require("../../assets/splash/background2.png")}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <ScrollView style={styles.container}>
        <View style={styles.containerInner}>
          <SafeAreaView style={styles.safeContainerStyle}>
            <DropDown
              label={"Meditation Language"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={meditationLanguageCode}
              setValue={setMeditationLanguageCode}
              list={languagesList}
            />
          </SafeAreaView>
          <View style={styles.imageWrapper}>
            <Image
              source={{
                uri: "https://mohanji-app.fra1.digitaloceanspaces.com/images/practices.jpg",
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>
              {meditationType} - {meditationLanguageDisplay}
            </Text>
          </View>
          <View
            style={{
              marginBottom: 10,
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: "#999", fontSize: 12 }}
              onPress={createTwoButtonAlert}
            >
              BENEFITS OF PRACTICE
            </Text>
          </View>
          <AudioSlider
            audioUrl={route.params.audioUrl}
            durationMinutes={route.params.durationMinutes}
            durationSeconds={route.params.durationSeconds}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default PracticesEach;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    marginBottom: 100,
    paddingTop: 5,
    overflow: "visible",
  },
  containerInner: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    marginTop: 0,
  },
  safeContainerStyle: {
    marginTop: 0,
    marginBottom: 20,
  },
  imageWrapper: {
    marginBottom: 20,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    borderColor: "#fcf4eb",
    borderWidth: 10,
  },
  titleWrapper: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 0,
    paddingBottom: 15,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

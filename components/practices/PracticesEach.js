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
  ImageBackground, Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AudioSlider from "../audio/AudioSlider";
import DropDown from "react-native-paper-dropdown";
import { DefaultTheme } from "react-native-paper";

const createTwoButtonAlert = (meditationType) => {
  switch (meditationType) {
    case "Power Of Purity":
      var benefitsOfPracticeText =
        "Much more than just a relaxing meditation, Power of Purity Meditation is a cleansing operation for our inner space where we unhook from the past through forgiveness and gratitude. Each time this meditation is practiced, deep inner healing and cleansing takes place. It is also excellent for healing relationships and shifting into the vibration of gratitude.";
      break;
    case "Bliss Of Silence":
      var benefitsOfPracticeText =
        "Bliss of Silence is a 40-minute guided meditation that is ideal for any spiritual aspirant, from a busy businessman to a teenager. It firstly helps us relax at the level of the physical body, and then slowly dive into stillness. We are guided to expand our consciousness to reveal our true identity.";
      break;
    case "Blossoms of Love":
      var benefitsOfPracticeText =
        "Blossoms of Love- This is a 30-minute guided meditation helps us develop unconditional love that culminates in a feeling of containing the entire universe within us. It teaches us to acknowledge and become familiar with our infinite consciousness, as well as understand our relationship with the universe.";
      break;
    case "360 Degrees":
      var benefitsOfPracticeText =
        "360 Degrees meditation is a powerful, guided chakra meditation by Mohanji aimed at shifting the consciousness to 360 degrees resulting in access to higher dimensions & stability within.";
      break;
    case "Freedom Meditation: For Children":
      var benefitsOfPracticeText =
        "Freedom Meditation is a 10-minute guided meditation provides a therapeutic solace for children, including those struggling to cope with anxiety, autism, ADD, ADHD, OCD and so on.";
      break;
    case "Shree Jagannatha Meditation":
      var benefitsOfPracticeText =
        "Krishna, in his most compassionate form, is Shree Jagannatha. Mohanji has dedicated this meditation to Shree Jagannatha for all the devotees of Krishna. This will aid in transforming the devotees through the power of Bhakti yoga: devotion, unshakable faith and love for their deity.";
      break;
    case "Shirdi Sai Baba Miracle Meditation":
      var benefitsOfPracticeText =
        "In this meditation, you establish Sai Baba inside your heart as his temple. Immersed in Baba's presence, you will experience the ultimate joy and contentment with Shraddha & Saburi. The devotion and surrender to Baba will bring you miraculous healing, acceptance, and true happiness beyond any boundaries.";
      break;

    default:
      var benefitsOfPracticeText = "";
  }
  Alert.alert("", benefitsOfPracticeText, [{ text: "Close" }]);
};

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
  const [isPlaying, setIsPlaying] = useState(false);

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
            {isPlaying ?
                Platform.OS === "ios" && <Text style={{marginHorizontal:20,marginTop: 5, fontSize: 18, textAlign:'center', fontStyle:'italic', fontWeight:'bold'}}>
                    {'Keep your screen on while the meditation is playing.'}</Text> :
                <DropDown
              label={"Meditation Language"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={meditationLanguageCode}
              setValue={setMeditationLanguageCode}
              list={languagesList}
              theme={DefaultTheme}
            />}

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
              onPress={() => createTwoButtonAlert(meditationType)}
            >
              BENEFITS OF PRACTICE
            </Text>
          </View>
          <AudioSlider
            audioUrl={route.params.audioUrl}
            durationMinutes={route.params.durationMinutes}
            durationSeconds={route.params.durationSeconds}
            onIsPlaying={(state) => setIsPlaying(state)}
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
    height: 50,
    width:'100%',
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

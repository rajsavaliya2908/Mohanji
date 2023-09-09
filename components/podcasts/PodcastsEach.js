import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
  Alert,
  SafeAreaView, Platform,
} from "react-native";
import axios from "axios";
import AudioSlider from "../audio/AudioSlider";
import { ScrollView } from "react-native-gesture-handler";

const PodcastsEach = ({ navigation, route }, props) => {

  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={require("../../assets/images/mohanji-speaks-sq.jpeg")}
          style={styles.image}
        />
      </View>
      <View style={styles.containerInner}>
        <View style={styles.titleWrapper}>
          {isPlaying && Platform.OS === "ios" && <Text style={{marginTop: -5,marginBottom:20, fontSize: 18, textAlign:'center', fontStyle:'italic', fontWeight:'bold'}}>
            {'Keep your screen on while the podcast is playing.'}</Text>}
          <Text style={styles.title}>{route.params.audioTitle}</Text>
        </View>
        <AudioSlider
          audioUrl={route.params.audioUrl}
          durationMinutes={route.params.audioDurationMinutes}
          durationSeconds={route.params.audioDurationSeconds}
          onIsPlaying={(state) => setIsPlaying(state)}
        />
      </View>
      <View style={styles.descriptionWrapper}>
        <Text style={styles.description}>{route.params.audioDescription}</Text>
      </View>
    </ScrollView>
  );
};

export default PodcastsEach;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 60,
    paddingTop: 5,
    overflow: "visible",
  },
  containerInner: {
    padding: 20,
    marginTop: 10,
  },
  safeContainerStyle: {
    marginTop: 0,
    marginBottom: 40,
  },
  imageWrapper: {
    marginBottom: 0,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 290,
    marginTop: -5,
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
    paddingBottom: 20,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionWrapper: {
    paddingBottom: 50
  },
  description: {
    fontSize: 16,
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
});

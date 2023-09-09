import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

// *** TODO: ADD PAGINATION WITH <Flatlist> *** //

const PodcastsAll = ({ navigation }, props) => {
  const [latestPodcastsList, setLatestPodcastsList] = useState([]);

  // Fetch latest Podcasts
  useEffect(() => {
    axios
      .get(
        "https://ethicallybased.com/mohanji-app-api/get.php?type=allPostcastsPodbean&limit=500"
      )
      .then((response) => {
        // Success
        if (response.data.status == 200) {
          setLatestPodcastsList(response.data.latestPodcastsList);
        } else {
          // console.log(response.data.errorMessage);
        }
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerInner}>
        <Text style={styles.header}>Latest Mohanji Podcasts</Text>
        <ScrollView>
          {latestPodcastsList.map((data, index) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(data.component, {
                  audioUrl: data.audioUrl,
                  audioTitle: data.title,
                  audioDescription: data.description,
                  audioDurationMinutes: data.durationMinutes,
                  audioDurationSeconds: data.durationSeconds,
                  audioThumbnail: require("../../assets/images/mohanji-speaks-sq.jpeg"),
                })
              }
            >
              <View style={styles.podcastThumbnailWrapper}>
                <Text style={styles.podcastTitle}>{data.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <View style={styles.divider}></View>
        </ScrollView>
      </View>
    </View>
  );
};

export default PodcastsAll;

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
    textAlign: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    marginBottom: 25,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
  },
  horizontalScrollWrapper: {
    paddingTop: 10,
  },
  horizontalScrollCardFirst: {
    width: 90,
    height: 90,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#F1EBE4",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  horizontalScrollCard: {
    width: 90,
    height: 90,
    marginRight: 20,
    backgroundColor: "#F1EBE4",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  horizontalScrollCardImageWrapper: {},
  horizontalScrollCardImage: {
    borderRadius: 15,
  },
  horizontalScrollCardTextFirst: {
    width: 90,
    marginLeft: 20,
    paddingTop: 12,
    alignItems: "center",
  },
  horizontalScrollCardText: {
    width: 90,
    marginTop: 10,
    alignItems: "center",
  },
  fullWidthImageWrapper: {
    flex: 1,
    marginTop: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },
  fullWidthImage: {
    height: 110,
    borderRadius: 10,
  },
  fullWidthImageArrow: {},
  colorTitle: {
    fontSize: 16,
  },
  podcastsHeader: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 24,
    paddingTop: 20,
  },
  podcastTitle: {
    marginTop: 12,
    marginLeft: 10,
    fontSize: 16,
  },
  podcastDescription: {
    marginTop: 10,
  },
  podcastThumbnail: {
    width: "100%",
    height: "auto",
    aspectRatio: 480 / 250,
    borderRadius: 10,
  },
  podcastThumbnailWrapper: {
    width: "100%",
    marginBottom: 20,
  },
  podcastsWrapper2: {
    marginTop: 20,
  },
  podcastsHeader2: {
    marginLeft: 20,
    fontSize: 24,
    paddingTop: 30,
  },
  podcastTitle2: {
    marginTop: 12,
    marginLeft: 10,
    fontSize: 16,
  },
  podcastDescription2: {
    marginTop: 10,
  },
  podcastThumbnail2: {
    width: 140,
    height: 140,
    borderRadius: 10,
  },
  podcastThumbnailWrapperFirst2: {
    width: 140,
    marginLeft: 20,
    marginRight: 20,
  },
  podcastThumbnailWrapper2: {
    width: 140,
    height: 140,
    marginRight: 15,
  },
  divider: {
    height: 30,
  },
});

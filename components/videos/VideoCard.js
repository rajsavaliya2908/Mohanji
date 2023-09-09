import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import YoutubePlayer from "react-native-youtube-iframe";
import { useKeepAwake } from "expo-keep-awake";
import { Buffer } from "buffer";
import axios from "axios";

export default function VideoCard({ route, navigation }) {
  /* 2. Get the param */
  const { videoDescription, videoTitle, videoId, videoThumbnail } =
    route?.params;

  const scrollRef = useRef();
  const [loading, setLoading] = useState(true);
  const [randomVideosList, setRandomVideosList] = useState([]);

  // Fetch latest videos
  useEffect(() => {
    getRandomVideos();
  }, []);

  // Screen Keep Awake for Youtube video
  useKeepAwake();

  const getRandomVideos = () => {
    axios
      .get(
        "https://ethicallybased.com/mohanji-app-api/get.php?type=latestVideosLimit&isRand=1&limit=10&showMore=1"
      )
      .then((response) => {
        // Success
        if (response?.data?.status == 200) {
          setRandomVideosList(response?.data?.latestVideosList);
        } else {
          // console.log(response.data.errorMessage);
        }
      });
  };

  const [playing, setPlaying] = useState(false);


  const base64_decode = (videoDescription) => {
    var val = "";
    val =
      videoDescription !== "" &&
      Buffer.from(videoDescription, "base64")?.toString("ascii");

    // Subscring up until first "<" occurance.
    return val === "" ? "" : (val = val?.substring(0, val?.indexOf("<")));
  };

  const setVideoData = (data) => {
    if (data?.component === "VideosAll") {
      navigation.navigate(data?.component);
    } else {
      navigation?.navigate(data?.component, {
        videoTitle: data?.title_full,
        videoDescription: data?.description,
        videoId: data?.videoId,
        videoThumbnail: data?.videoThumbnail,
      });

      scrollRef?.current?.scrollTo({
        x: 0,
        y: 0,
        animated: true,
      }),
        getRandomVideos();
    }
  };

  return (
    <ScrollView ref={scrollRef} style={styles.container}>
      <View style={styles.video}>
        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator
              animating={loading}
              size={"large"}
              color={"#66458F"}
            />
          </View>
        )}
        <YoutubePlayer
          onReady={() => setLoading(!loading)}
          height={230}
          play={playing}
          videoId={videoId && videoId}
          webViewStyle={{ opacity: 0.99 }}
        />
      </View>
      <View style={styles.videoContent}>
        <Text style={styles.title}>{videoTitle && videoTitle}</Text>
        <Text>{base64_decode(videoDescription)}</Text>
      </View>
      <View>
        <Text style={styles.videosMainHeader}>More Videos</Text>
      </View>
      <ScrollView
        style={styles.videosWrapper}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {randomVideosList?.length > 0 &&
          randomVideosList?.map((data, index) => (
            <TouchableOpacity onPress={() => setVideoData(data)}>
              <View
                style={
                  index == 0
                    ? styles.videoThumbnailWrapperFirst
                    : styles.videoThumbnailWrapper
                }
              >
                <Image
                  style={styles.videoThumbnail}
                  source={{
                    uri: data?.videoThumbnail,
                  }}
                />

                <View>
                  <Icon
                    name="play-circle"
                    size={35}
                    color="#fff"
                    style={{
                      marginTop: -148,
                      marginLeft: 10,
                      opacity: 0.5,
                    }}
                  />
                </View>
                <Text style={styles.videoTitle}>{data?.title_short}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <View style={styles.divider}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  video: {
    marginTop: 15,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    marginBottom: 20,
  },
  title: {
    textAlign: "left",
    fontSize: 26,
    fontWeight: "bold",
    paddingTop: 0,
    paddingBottom: 20,
  },
  loader: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
  },
  videoContent: {
    marginBottom: 30,
  },
  videosWrapper: {},
  videosMainHeader: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  videosHeader: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 24,
    paddingTop: 20,
  },
  videoTitleStyle: {
    marginTop: 12,
    marginLeft: 10,
    fontSize: 16,
  },
  videoDescription: {
    marginTop: 10,
  },
  videoThumbnail: {
    backgroundColor: "#fff",
    borderWidth: 0,
    aspectRatio: 480 / 270,
    borderRadius: 10,
  },
  videoThumbnailWrapperFirst: {
    width: 280,
    marginLeft: 0,
    marginRight: 20,
  },
  videoThumbnailWrapper: {
    width: 280,
    height: 160,
    marginRight: 15,
  },
  videosWrapper2: {
    marginTop: 20,
  },
  videosHeader2: {
    marginLeft: 20,
    fontSize: 24,
    paddingTop: 30,
  },
  videoTitle: {
    marginTop: 10,
  },
  videoTitle2: {
    marginTop: 12,
    marginLeft: 10,
    fontSize: 16,
  },
  videoDescription2: {
    marginTop: 10,
  },
  videoThumbnail2: {
    width: 140,
    height: 140,
    borderRadius: 10,
  },
  videoThumbnailWrapperFirst2: {
    width: 140,
    marginLeft: 20,
    marginRight: 20,
  },
  videoThumbnailWrapper2: {
    width: 140,
    height: 140,
    marginRight: 15,
  },
  divider: {
    height: 120,
  },
});

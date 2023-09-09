import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import { ActivityIndicator, IconButton } from "react-native-paper";
import YoutubePlayer, { getYoutubeMeta } from "react-native-youtube-iframe";
import axios from "axios";
import RenderHtml from "react-native-render-html";
import {useKeepAwake} from "expo-keep-awake";

const { width } = Dimensions.get("window");

export default function VideoCardPranayama({ route, navigation }) {
  /* 2. Get the param */
  const { videoDescription, videoTitle, videoId, videoThumbnail } =
    route?.params;

  const video = useRef(null);
  const scrollRef = useRef();
  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(true);

  // Screen Keep Awake for Youtube video
  useKeepAwake();

  const handleVideoRef = async (component) => {
    const playbackObject = component;
    if (playbackObject) {
      await playbackObject?.loadAsync({ uri: videoId });
    }
  };

  const [playing, setPlaying] = useState(false);

  const togglePlaying = () => {
    setPlaying((prev) => !prev);
  };

  return (
    <ScrollView ref={scrollRef} style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <Image
          style={styles.backArrow}
          source={require("../../assets/images/arrow-back.png")}
        />
      </Pressable>
      <View style={styles.video}>
        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator
              animating={loading}
              // size={"small"}
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
        <RenderHtml
          contentWidth={width}
          source={{ html: `${videoDescription}` }}
        />
      </View>
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
    borderRadius: 10,
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
  backArrow: {
    width: 46,
    height: 46,
    resizeMode: "contain",
    marginVertical: 2,
  },
});

import React, { useState } from "react";
import { View, StyleSheet, Button, Text, ScrollView } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import { ActivityIndicator, IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {useKeepAwake} from "expo-keep-awake";

export default function VideoCardNative({ route, navigation }) {
  /* 2. Get the param */
  const { videoContent, videoTitle, videoUrl, videoThumbnail } = route?.params;

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [isPreloading, setIsPreloading] = useState(true);

  const handleVideoRef = async (component) => {
    const playbackObject = component;
    if (playbackObject) {
      await playbackObject.loadAsync({ uri: videoUrl });
    }
  };

  // Screen Keep Awake for Plays video
  useKeepAwake();

  return (
    <ScrollView style={styles.container}>
      {isPreloading && (
        <ActivityIndicator
          animating
          size="large"
          color="#E1AE00"
          style={styles.loader}
        />
      )}
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: videoUrl,
        }}
        posterSource={{
          uri: videoThumbnail,
        }}
        usePoster={true}
        useNativeControls
        resizeMode="contain"
        isLooping
        onLoadStart={() => setIsPreloading(true)}
        onReadyForDisplay={() => setIsPreloading(false)}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      {/* <ActivityIndicator size="large" color="#E1AE00" style={styles.loader} />
      </Video> */}

      {/* <View style={styles.buttons}>
        <Icon
          name={status.isPlaying ? "pause-circle" : "play-circle"}
          size={70}
          color="#66458F"
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View> */}
      <Text style={styles.title}>{videoTitle}</Text>
      <Text>{videoContent}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  video: {
    marginTop: 0,
    alignSelf: "center",
    width: "100%",
    height: 224,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 20,
  },
  // loader: {
  //   marginTop: 70,
  // },
  loader: { position: "absolute", left: 0, right: 0, top: 70 },
});

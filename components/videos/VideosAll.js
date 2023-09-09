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
import React, { useState, useRef, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";

// *** TODO: ADD PAGINATION WITH <Flatlist> *** //

const VideosAll = ({ navigation }, props) => {
  const [latestVideosList, setLatestVideosList] = useState([]);
  const [pageStart, setPageStart] = useState(0);
  const [moreResults, setMoreResults] = useState(1);
  const scrollRef = useRef();

  // Fetch latest videos
  useEffect(() => {
    axios
      .get(
        "https://ethicallybased.com/mohanji-app-api/get.php?type=latestVideosLimit&limit=10&showMore=0&pagination=1&pageStart=" +
          pageStart
      )
      .then((response) => {
        // Success
        if (response.data.status == 200) {
          setLatestVideosList(response.data.latestVideosList);
          setMoreResults(response.data.moreResults);
        } else {

        }
      });
  }, [pageStart]);

  return (
    <ScrollView ref={scrollRef} style={styles.container}>
      <View style={styles.containerInner}>
        <Text style={styles.header}>All Mohanji Videos</Text>
        <Text style={styles.subHeader}>Page {pageStart + 1}</Text>
        {latestVideosList.map((data, index) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(data.component, {
                videoTitle: data.title_full,
                videoDescription: data.description,
                videoId: data.videoId,
                videoThumbnail: data.videoThumbnail,
              })
            }
          >
            <View style={styles.videoThumbnailWrapper}>
              <Image
                style={styles.videoThumbnail}
                source={{
                  uri: data.videoThumbnail,
                }}
              />
              <View>
                <Icon
                  name="play-circle"
                  size={35}
                  color="#fff"
                  style={{
                    marginTop: -190,
                    marginLeft: 10,
                    opacity: 0.5,
                  }}
                />
              </View>
              <Text style={styles.videoTitle}>{data.title_full}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <View
          style={[
            styles.paginationWrapper,
            { justifyContent: pageStart == 0 ? "flex-end" : "flex-start" },
          ]}
        >
          {pageStart > 0 && (
            <View style={styles.prevButton}>
              <Button
                title="Previous"
                onPress={() => {
                  setPageStart(pageStart - 1);
                  scrollRef?.current?.scrollTo({
                    x: 0,
                    y: 0,
                    animated: true,
                  });
                }}
              />
            </View>
          )}
          {moreResults == 1 && (
            <View style={styles.nextButton}>
              <Button
                title="Next"
                onPress={() => {
                  setPageStart(pageStart + 1);
                  scrollRef?.current?.scrollTo({
                    x: 0,
                    y: 0,
                    animated: true,
                  });
                }}
              />
            </View>
          )}
        </View>
        <View style={styles.divider}></View>
      </View>
    </ScrollView>
  );
};

export default VideosAll;

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
    marginBottom: 15,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 25,
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
  videosHeader: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 24,
    paddingTop: 20,
  },
  videoTitle: {
    marginTop: 12,
    marginLeft: 10,
    fontSize: 16,
  },
  videoDescription: {
    marginTop: 10,
  },
  videoThumbnail: {
    width: "100%",
    height: "auto",
    aspectRatio: 480 / 250,
    borderRadius: 10,
  },
  videoThumbnailWrapper: {
    width: "100%",
    marginBottom: 35,
  },
  videosWrapper2: {
    marginTop: 20,
  },
  videosHeader2: {
    marginLeft: 20,
    fontSize: 24,
    paddingTop: 30,
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
  paginationWrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start", // if you want to fill rows left to right
  },
  prevButton: {
    width: "40%",
    marginRight: "10%",
  },
  nextButton: { width: "40%", marginLeft: "10%" },
  divider: {
    height: 30,
  },
});

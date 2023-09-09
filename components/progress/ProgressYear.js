import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import "react-native-gesture-handler";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const { width } = Dimensions.get("window");

const ProgressYear = ({ navigation }, props) => {
  const [progressList, setProgressList] = useState([]);
  const [pageStart, setPageStart] = useState(0);
  const [moreResults, setMoreResults] = useState(1);
  const scrollRef = useRef();

  // Fetch upcoming progress
  useEffect(() => {
    axios
      .get(
        "https://ethicallybased.com/mohanji-app-api/get.php?type=progress&direction=past&limit=10&showMore=0&pagination=0&pageStart=" +
          pageStart
      )
      .then((response) => {
        // Success
        if (response.data.status == 200) {
          setProgressList(response.data.progressList);
          setMoreResults(response.data.moreResults);
        } else {
          // console.log(response.data.errorMessage);
        }
      });
  }, []);

  const footer = () => {
    return <View style={{ height: 33 }} />;
  };
  const header = () => {
    return (
      <Image
        source={require("../../assets/images/placeholder.png")}
        style={styles.img}
      />
    );
  };
  return (
    <ImageBackground
      source={require("../../assets/splash/background2.png")}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <ScrollView ref={scrollRef} style={styles.container}>
        <View style={styles.containerInner}>
          {progressList.map((data, index) => (
            <TouchableOpacity
              style={styles.progressBannerEach}
              onPress={() =>
                navigation.navigate("Progress", {
                  title_full: data.title_full,
                  description: data.description,
                  more_information_link: data.more_information_link,
                  start_time: data.start_time,
                  end_time: data.end_time,
                  image_loc: data.image_loc,
                  image_ext: data.image_ext,
                })
              }
            >
              <Image
                style={{
                  width: "100%",
                  height: undefined,
                  aspectRatio: 1.8,
                  borderRadius: 15,
                  resizeMode: "contain",
                }}
                source={{
                  uri: data.image_loc + ".thumb_540_width." + data.image_ext,
                }}
              />
              <Text style={styles.bannerEachTitle}>{data.title_full}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default ProgressYear;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
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
  progressBannerEach: {
    marginBottom: 30,
  },
  img: {
    width: width,
    height: 220,
    resizeMode: "contain",
    marginVertical: 16,
  },
  listInnerContainer: {
    alignItems: "center",
    flex: 1,
  },
  listComponent: {
    width: width / 2.3,
    height: 233,
    backgroundColor: "#E2D7C8",
    marginHorizontal: 22,
    marginVertical: 12,
    borderRadius: 16,
  },
  bannerEachTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

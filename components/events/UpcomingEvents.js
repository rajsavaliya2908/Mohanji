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
  ActivityIndicator,
} from "react-native";
import "react-native-gesture-handler";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import FastImage from "react-native-fast-image";

const { width } = Dimensions.get("window");

const UpcomingEvents = ({ navigation }, props) => {
  const [eventsList, setEventsList] = useState([]);
  const [pageStart, setPageStart] = useState(0);
  const [moreResults, setMoreResults] = useState(1);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef();

  // Fetch upcoming events
  useEffect(() => {
    axios
      .get(
        "https://ethicallybased.com/mohanji-app-api/get.php?type=events&direction=upcoming&limit=10&showMore=0&pagination=0&pageStart=" +
          pageStart
      )
      .then((response) => {
        // Success
        if (response?.data?.status == 200) {
          setEventsList(response?.data?.eventsList);
          setMoreResults(response?.data?.moreResults);
          setLoading(false);
        } else {
          // console.log(response.data.errorMessage);
          setLoading(false);
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
          {eventsList?.map((data, index) => (
            <TouchableOpacity
              style={styles.eventsBannerEach}
              onPress={() =>
                navigation.navigate("Event", {
                  title_full: data.title_full,
                  description: data.description,
                  more_information_link: data.more_information_link,
                  start_time: data.start_time,
                  end_time: data.end_time,
                  image_loc: data.image_loc,
                  image_ext: data.image_ext,
                  image_key: data?.key,
                })
              }
            >
              {/* <Image
                    style={{
                      width: "100%",
                      height: undefined,
                      aspectRatio: 3 / 1.6,
                      borderRadius: 15,
                      resizeMode: "cover",
                    }}
                    source={{
                      uri:
                        data.image_loc + ".thumb_540_width." + data.image_ext,
                    }}
                  /> */}
              <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  source={{
                    uri: data?.image_loc + ".thumb_540_width." + data?.image_ext,
                    priority: FastImage.priority.normal,
                  }}
                  cacheKey={data?.key} // could be a unque id
                  style={{
                    width: "100%",
                    height: undefined,
                    aspectRatio: 3 / 1.6,
                    borderRadius: 15,
                    resizeMode: "cover",
                  }} // your custom style object
                  // any supported props by Image
              />
              <Text style={styles.bannerEachTitle}>{data.title_full}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {loading && (
          <View
            style={{
              position: "absolute",
              right: 0,
              left: 0,
              top: Dimensions.get("window").height / 2.77,
            }}
          >
            <ActivityIndicator size="large" color="#66458F" />
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

export default UpcomingEvents;

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
  eventsBannerEach: {
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

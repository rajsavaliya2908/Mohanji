import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Pressable,
  Dimensions,
} from "react-native";
import { Button } from "react-native-paper";
import React from "react";
import RenderHtml from "react-native-render-html";
import * as WebBrowser from "expo-web-browser";
import FastImage from 'react-native-fast-image'
const backArrow = require("../../assets/images/arrow-back.png");
const { width } = Dimensions.get("window");

const Event = ({ route, navigation }) => {
  const {
    title_full,
    description,
    more_information_link,
    start_time,
    end_time,
    image_loc,
    image_ext,
    image_key,
  } = route?.params;

  return (
    <ImageBackground
      source={require("../../assets/splash/background2.png")}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <ScrollView style={styles.container}>
        <View style={styles.containerInner}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image
              source={backArrow}
              style={[styles.backArrow, { marginVertical: 8 }]}
            />
          </Pressable>
          <View style={styles.topDivider}></View>
          {/* <Image
            style={{
              width: "100%",
              height: undefined,
              aspectRatio: 2,
              marginBottom: 30,
              borderRadius: 15,
            }}
            source={{
              uri: image_loc + ".thumb_540_width." + image_ext,
            }}
          /> */}
          <FastImage
              resizeMode={FastImage.resizeMode.contain}
              source={{
                uri: image_loc + ".thumb_540_width." + image_ext,
                priority: FastImage.priority.normal,
              }}
              cacheKey={image_key} // could be a unque id
             style={{
              width: "100%",
              height: undefined,
              aspectRatio: 2,
              marginBottom: 30,
              borderRadius: 15,
            }} // your custom style object
            // any supported props by Image
          />

          <View style={styles.headerTitleContianer}>
            <Text style={styles.title}>{title_full}</Text>
          </View>
          <View style={styles.eventTimerWrapper}>
            <View>
              <Text style={styles.eventTimerWrapperParagraph}>
                Start time: {start_time}
              </Text>
            </View>
            <View>
              <Text style={styles.eventTimerWrapperParagraph}>
                End time: {end_time}
              </Text>
            </View>
          </View>
          <RenderHtml
            contentWidth={width}
            source={{ html: `${description}` }}
          />
        </View>
        <View style={{ margin: 22 }}>
          <Button
            mode="elevated"
            textColor="#fff"
            labelStyle={{ fontSize: 20 }}
            style={styles.button}
            onPress={() =>
              WebBrowser.openBrowserAsync(more_information_link, {
                showTitle: true,
              })
            }
          >
            {"Read More"}
          </Button>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </ImageBackground>
  );
};

export default Event;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingTop: 5,
  },
  card: {
    width: "100%",
    height: undefined,
    resizeMode: "contain",
    aspectRatio: 1.5,
    marginVertical: 12,
  },
  containerInner: {
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  headerCardWrapper: {
    marginTop: 10,
    alignSelf: "center",
  },
  button: {
    width: "100%",
    backgroundColor: "#66458F",
    borderColor: "#66458F",
    fontWeight: "600",
    borderWidth: 2,
    borderRadius: 50,
    height: 50,
    justifyContent: "center",
  },
  headerCard: {
    width: 90,
    height: 90,
    backgroundColor: "#F1EBE4",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  headerCardImage: {
    borderRadius: 15,
  },
  headerCardText: {
    width: 90,
    marginTop: 10,
    alignItems: "center",
  },
  colorTitle: {
    fontSize: 16,
  },
  headerTitleContianer: {
    marginTop: 0,
    marginBottom: 25,
    flexDirection: "row",
  },
  headerImage: { width: 33, height: 33, resizeMode: "contain" },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  bodyContentWrapper: {},
  bodyParagraph: {
    marginBottom: 15,
    fontWeight: "500",
  },
  eventTimerWrapper: {
    marginTop: 0,
    marginBottom: 15,
  },
  eventTimerWrapperParagraph: {
    marginBottom: 15,
    fontWeight: "500",
    fontSize: 18,
  },
  buttonsWrapper: {
    marginTop: 30,
  },
  buttonEachHolder: {
    width: "100%",
    marginBottom: 25,
  },
  button: {
    width: "100%",
    backgroundColor: "#66458F",
    borderColor: "#66458F",
    fontWeight: "600",
    borderWidth: 2,
    borderRadius: 50,
  },
  backArrow: {
    width: 36,
    height: 36,
    resizeMode: "contain",
  },
  topDivider: {
    height: 15,
  },
});

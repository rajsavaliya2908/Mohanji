import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Linking,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import "react-native-gesture-handler";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CardItem from "../videos/CardItem";
import translations from "../../hooks/LanguageTranslations.js";
import { useEffect } from "react";
import axios from "axios";
import ImageSlider from "../../reusable/ImageSlider";

const HomeScreen = ({ navigation }, props) => {
  const userAuth = useSelector((state) => state.userAuth);
  const [fullName, setFullName] = useState(userAuth.fullName);
  const [latestVideosList, setLatestVideosList] = useState([]);
  const [latestPodcastsList, setLatestPodcastsList] = useState([]);
  const [message, setMessage] = useState(null);

  const companiesImages = [
    {
      key: 1,
      imageName: require("../../assets/images/companies/act-4-hunger.png"),
      link: 'https://act4hunger.org/',
    },
    {
      key: 2,
      imageName: require("../../assets/images/companies/act.png"),
      link: 'https://actfoundation.org/',
    },
    {
      key: 3,
      imageName: require("../../assets/images/companies/ammucare.png"),
      link: 'https://ammucare.org/',
    },
    {
      key: 4,
      imageName: require("../../assets/images/companies/ebc-kids.png"),
      link: 'https://www.facebook.com/earlybirdskids/',
    },
    {
      key: 5,
      imageName: require("../../assets/images/companies/ebc-teens.png"),
      link: 'https://www.facebook.com/earlybirdsteens/',
    },
    {
      key: 6,
      imageName: require("../../assets/images/companies/ebc.png"),
      link: 'https://earlybirdsclub.org/',
    },
    {
      key: 7,
      imageName: require("../../assets/images/companies/fruit-tree-plantation.png"),
      link: 'https://fruittreeplantation.org/',
    },
    {
      key: 8,
      imageName: require("../../assets/images/companies/gurulight.png"),
      link: 'https://gurulight.com/',
    },
    {
      key: 9,
      imageName: require("../../assets/images/companies/himalayan-academy-of-traditions.png"),
      link: 'https://himalayanschool.com/',
    },
    {
      key: 10,
      imageName: require("../../assets/images/companies/hst-dance.png"),
      link: 'https://himalayanschool.com/',
    },
    {
      key: 11,
      imageName: require("../../assets/images/companies/hst-languages.png"),
      link: 'https://himalayanschool.com/',
    },
    {
      key: 12,
      imageName: require("../../assets/images/companies/hst-martial-arts.png"),
      link: 'https://himalayanschool.com/',
    },
    {
      key: 13,
      imageName: require("../../assets/images/companies/hst-music.png"),
      link: 'https://himalayanschool.com/',
    },
    {
      key: 14,
      imageName: require("../../assets/images/companies/hst-yoga.png"),
      link: 'https://himalayanschool.com/',
    },
    // {
    //   key: 15,
    //   imageName: require("../../assets/images/companies/m-house-media.png"),
    //   link: '',
    // },
    {
      key: 16,
      imageName: require("../../assets/images/companies/mohanji-foundation.png"),
      link: 'https://mohanji.foundation/',
    },
    {
      key: 17,
      imageName: require("../../assets/images/companies/mohanji-youth-club.png"),
      link: 'https://mohanjiyouth.org/',
    },
    {
      key: 18,
      imageName: require("../../assets/images/companies/success-mpowered.png"),
      link: 'https://www.successmpowered.com/',
    },
    {
      key: 19,
      imageName: require("../../assets/images/companies/the-awakening-times.png"),
      link: 'http://awakeningtimes.com/',
    },
    {
      key: 20,
      imageName: require("../../assets/images/companies/wca.png"),
      link: 'https://www.facebook.com/wcaearth/',
    },
  ];

  const horizontalListCards = [
    {
      key: 1,
      imageName: require("../../assets/images/breath-work.png"),
      linkOrComponent: "component",
      component: "BreathingHome",
      text: "Breath Work",
    },
    {
      key: 2,
      imageName: require("../../assets/images/Wisdom.png"),
      linkOrComponent: "component",
      component: "WisdomHome",
      text: "Wisdom",
    },
    {
      key: 3,
      imageName: require("../../assets/images/Kriya.png"),
      linkOrComponent: "component",
      component: "KriyaHome",
      text: "Kriya",
    },
    {
      key: 4,
      imageName: require("../../assets/images/q-and-a.png"),
      linkOrComponent: "link",
      link: "https://mohanji.org/contact-us/",
      text: "Support",
    },
  ];

  useEffect(() => {
    const time = new Date().getHours();
    if (time >= 0 && time <= 11) {
      setMessage("Good Morning");
    } else if (time >= 12 && time <= 17) {
      setMessage("Good Afternoon");
    } else {
      setMessage("Good Evening");
    }
  }, []);

  // Fetch latest videos
  useEffect(() => {
    axios
      .get(
        "https://ethicallybased.com/mohanji-app-api/get.php?type=latestVideosLimit&limit=10&showMore=1"
      )
      .then((response) => {
        // Success
        if (response.data.status == 200) {
          setLatestVideosList(response.data.latestVideosList);
        } else {
          // console.log(response.data.errorMessage);
        }
      });

    axios
      .get(
        "https://ethicallybased.com/mohanji-app-api/get.php?type=latestPostcastsPodbean&limit=10"
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
    <ImageBackground
      source={require("../../assets/splash/background2.png")}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
          <ImageSlider navigation={navigation} />
          <View>
            <Text style={styles.mainHeader}>
              {/* {translations[userAuth.language]["goodMorning"]} */}
              {message}
              {userAuth.fullName && ", " + userAuth.fullName}
            </Text>
            <Text style={styles.mainSubHeader}>
              Start your day centered & aligned.
            </Text>
          </View>

          {/* Top nav menu icons */}
          <View style={styles.horizontalScrollWrapper}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {horizontalListCards.map((list, index) => (
                <TouchableOpacity
                  onPress={() => {
                    list.linkOrComponent == "component"
                      ? navigation.navigate(list.component)
                      : Linking.openURL(list.link);
                  }}
                >
                  <View
                    style={
                      index == 0
                        ? styles.horizontalScrollCardFirst
                        : styles.horizontalScrollCard
                    }
                    key={list.key}
                  >
                    <Image
                      style={styles.horizontalScrollCardImage}
                      source={list.imageName}
                    />
                  </View>
                  <View
                    style={
                      index == 0
                        ? styles.horizontalScrollCardTextFirst
                        : styles.horizontalScrollCardText
                    }
                  >
                    <Text style={styles.colorTitle}>{list.text}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          {/* Veritical breathing image */}
          {/* <TouchableOpacity
            onPress={() => navigation.navigate("VerticalBreathing")}
          >
            <View style={styles.fullWidthImageWrapper}>
              <Image
                style={styles.fullWidthImage}
                source={require("../../assets/images/vertical.png")}
              />
              <View style={styles.fullWidthImageTextOverlayWrapper}>
                <Text style={styles.fullWidthImageTextOverlay1}>
                  Vertical Breathing
                </Text>
                <Text style={styles.fullWidthImageTextOverlay2}>
                  TECHNIQUE 1-3 MIN
                </Text>
                <View>
                  <Icon
                    name="arrow-right-circle"
                    size={55}
                    color="#fff"
                    style={{
                      opacity: ".5",
                      alignSelf: "flex-end",
                      marginRight: 40,
                      marginTop: -52,
                    }}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity> */}
          {/* Latest Mohanji Videos */}
          <Text style={styles.videosHeader}>Latest Mohanji Videos</Text>
          <ScrollView
            style={styles.videosWrapper}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
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
                      uri: data.videoThumbnail,
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
                  <Text style={styles.videoTitle}>{data.title_short}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.videosHeader2}>Listen to Mohanji Speaks</Text>
          <ScrollView
            style={styles.videosWrapper2}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
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
                <View
                  style={
                    index == 0
                      ? styles.videoThumbnailWrapperFirst2
                      : styles.videoThumbnailWrapper2
                  }
                >
                  <Image
                    style={styles.videoThumbnail2}
                    source={require("../../assets/images/mohanji-speaks-sq.jpeg")}
                  />
                  <View>
                    <Icon
                      name="play-circle"
                      size={35}
                      color="#fff"
                      style={{
                        marginTop: -150,
                        marginLeft: 10,
                        opacity: 0.5,
                      }}
                    />
                  </View>
                  <Text style={styles.videoTitle2}>{data.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={styles.videosHeader2}>Mohanji Founded Platforms</Text>
          <View style={styles.companiesWrapper}>
            <ScrollView
              style={styles.videosWrapper2}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {companiesImages.map((list, index) => (
                <TouchableOpacity
                  onPress={() => Linking.openURL(list.link)}
                  style={styles.companiesImageEachWrapper}
                >
                  <Image
                    style={styles.companiesImage}
                    source={list.imageName}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={styles.divider}></View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
    color: "#fff",
  },
  containerInner: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  mainHeader: {
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
  mainSubHeader: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    fontSize: 16,
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
    width: "100%",
    height: 110,
    borderRadius: 10,
  },
  fullWidthImageArrow: {},
  colorTitle: {
    fontSize: 16,
  },
  colorBody: {},
  videosWrapper: {
    marginTop: 20,
  },
  fullWidthImageTextOverlayWrapper: {
    position: "absolute",
    marginLeft: 40,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
  },
  fullWidthImageTextOverlay1: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  fullWidthImageTextOverlay2: {
    marginTop: 15,
    color: "#fff",
    fontSize: 13,
  },
  companiesWrapper: {
    width: "100%",
  },
  companiesImageEachWrapper: {
    width: 90,
  },
  companiesImage: {
    marginLeft: 10,
    width: 75,
    height: 75,
  },
  videosHeader: {
    marginTop: 10,
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
    backgroundColor: "#fff",
    borderWidth: 0,
    width: "100%",
    height: "auto",
    aspectRatio: 480 / 270,
    borderRadius: 10,
  },
  videoThumbnailWrapperFirst: {
    width: 280,
    marginLeft: 20,
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
    height: 110,
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
    height: 100,
  },
});

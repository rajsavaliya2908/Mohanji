import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Linking,
} from "react-native";
import { Button } from "react-native-paper";
import React from "react";
import * as WebBrowser from "expo-web-browser";

const img1 = require("../../assets/images/Mohanji-img-1.png");
const img2 = require("../../assets/images/Mohanji-img-2.png");
const img3 = require("../../assets/images/Mohanji-img-3.png");

const aboutUs = require("../../assets/images/about-us.png");

const para1 =
  "Mohanji is a friend of the world, a person commited to raising the awareness of generations from selfishness to selflessness. His mission is to wake up kindness in the hearts of people.He has dedicated his life to serving the world with this single purpose – to raise humans to achieve the highest values of human potential such as kindness, compassion and non-violence. Or in other words, make the transition from humankind to kind humans.";

const para2 =
  "Mohanji firmly believes that humanity is the best religion for humans and the best practice is ahimsa, or non-violence – in thoughts, words or actions towards fellow beings across all species. His core teaching is simply “Be You” – accept, understand, recognise and express your uniqueness in the world. Mohanji has founded various global platforms for people to express themselves through acts of compassion and kindness that add value to society. Mohanji is married to Devi Mohan, and they have a daughter together – Mila Mohan.";

const para3 =
  "Liberation is the cornerstone of Mohanji’s teachings where he points us at where to look but not what to see. He places great emphasis on liberation from the bindings, concepts and habits of life. He himself practically demonstrates this by leading a life free from the bindings and conditioning of the mind – totally natural, with total acceptance of life as it comes without resistance, irrespective of people, time, space, situations or concepts.";
const para4 =
  "“True mastery is the mastery of one’s own mind.” says Mohanji, who maintains that spirituality is expressed in the awareness with which we live and experience our daily lives. He advocates the path of Pathlessness where the spontaneity and flow is all there is; being totally yourself! He believes in romancing life, approaching every situation in life with wonder and curiosity of a new-born child without preconceptions or judgments.";

const AboutUs = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/splash/background2.png")}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <ScrollView style={styles.container}>
        <View style={styles.containerInner}>
          <View style={styles.headerTitleContianer}>
            <Image source={aboutUs} style={styles.headerImage} />
            <Text style={styles.title}>Who Is Mohanji?</Text>
          </View>
          <Text style={styles.bodyParagraph}>{para1}</Text>
          <Image source={img1} style={styles.card} />
          <Text style={styles.bodyParagraph}>{para2}</Text>
          <Image source={img2} style={styles.card} />
          <Text style={styles.bodyParagraph}>{para3}</Text>
          <Image source={img3} style={styles.card} />
          <Text style={styles.bodyParagraph}>{para4}</Text>
        </View>
        <View style={{ margin: 22 }}>
          <Button
            mode="elevated"
            textColor="#fff"
            labelStyle={{ fontSize: 20 }}
            style={styles.button}
            onPress={() =>
              WebBrowser.openBrowserAsync(
                "https://mohanji.org/who-is-mohanji/",
                {
                  showTitle: true,
                }
              )
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

export default AboutUs;

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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
  },
  headerImage: { width: 33, height: 33, resizeMode: "contain" },
  title: {
    fontSize: 24,
    fontWeight: "500",
    marginLeft: 4,
  },
  bodyContentWrapper: {},
  bodyParagraph: {
    fontSize: 15,
    color: "#515151",
    fontSize: 16,
    fontWeight: "500",
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
});

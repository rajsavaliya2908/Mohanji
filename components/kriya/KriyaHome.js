import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Pressable,
} from "react-native";
import { Button } from "react-native-paper";
import React from "react";
import * as WebBrowser from "expo-web-browser";

const backArrow = require("../../assets/images/back-arrow.png");
const kriya1 = require("../../assets/images/kriya-1.png");
const kriya2 = require("../../assets/images/kriya-2.png");

const KriyaHome = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/splash/background2.png")}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <ScrollView style={styles.container}>
        <View style={styles.containerInner}>
          <View style={styles.headerContainer}>
            <Pressable onPress={() => navigation.goBack()}>
              <Image source={backArrow} style={styles.backArrow} />
            </Pressable>
            <Text style={styles.title}>Consciousness Kriya</Text>
          </View>
          <View style={styles.bodyContentWrapper}>
            <Text style={styles.bodyParagraph}>
              Consciousness Kriya is a powerful technique that enables a seeker
              to lead a life of liberated existence, i.e. a life of complete
              freedom - freedom from the shackles of our mind and its patterns.
              This technique was given to Mohanji for the purpose of guiding
              mankind to liberation.
            </Text>
            <Image source={kriya1} style={styles.card} />
            <Text style={styles.bodyParagraph}>
              Consciousness Kriya begins with an initiation into a specific
              technique but it is actually a lifestyle of humility,
              non-violence, gratitude and purity. When practiced consistently
              with commitment, Consciousness Kriya can be described as a rocket
              towards spiritual evolution and liberation.
            </Text>
            <Image source={kriya2} style={styles.card} />
            <Text style={styles.bodyParagraph}>
              Initiation into Kriya by the Guru is essential. This ensures
              connectivity to the Guru Principle, which protects and elevates.
              Growth in the path of Kriya happens in stages and initiation into
              higher Kriyas is based on levels of elevation in consciousness
              achieved through dedication, conviction, commitment and
              consistency in practice.
            </Text>
          </View>
          <View style={styles.buttonsWrapper}>
            <View style={styles.buttonEachHolder1}>
              <Button
                mode="contained-tonal"
                onPress={() =>
                  WebBrowser.openBrowserAsync(
                    "https://mohanji.org/apply-for-consciousness-kriya/",
                    {
                      showTitle: true,
                    }
                  )
                }
                textColor="#fff"
                labelStyle={{ fontSize: 18 }}
                style={styles.button}
              >
                Apply
              </Button>
            </View>
            <View style={styles.buttonEachHolder2}>
              <Button
                mode="contained-tonal"
                onPress={() =>
                  WebBrowser.openBrowserAsync(
                    "https://mohanji.org/consciousness-kriya/",
                    {
                      showTitle: true,
                    }
                  )
                }
                textColor="#fff"
                labelStyle={{ fontSize: 18 }}
                style={styles.button}
              >
                Learn More
              </Button>
            </View>
          </View>
        </View>
        <View style={{ height: 120 }} />
      </ScrollView>
    </ImageBackground>
  );
};

export default KriyaHome;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingTop: 5,
  },
  containerInner: {
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  backArrow: {
    width: 22,
    resizeMode: "contain",
    top: -15,
    right: 4,
  },
  headerCardWrapper: {
    marginTop: 10,
    alignSelf: "center",
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
  title: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    width: "90%",
    marginRight: 22,
    marginTop: 0,
    paddingHorizontal: 8,
  },
  bodyContentWrapper: {
    marginTop: 0,
  },
  bodyParagraph: {
    fontSize: 15,
    color: "#515151",
    fontSize: 16,
    fontWeight: "500",
  },
  buttonsWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  buttonEachHolder1: {
    width: "100%",
    marginTop: 25,
  },
  buttonEachHolder2: {
    width: "100%",
    marginTop: 15,
  },
  card: {
    width: "100%",
    height: undefined,
    resizeMode: "contain",
    aspectRatio: 1.7,
    marginVertical: 12,
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

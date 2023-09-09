import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  ImageBackground,
  Pressable,
  Share,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import React, { useState } from "react";
import Quotes from "../includes/Quotes";

const backArrow = require("../../assets/images/arrow-back.png");
const quote = require("../../assets/images/quote.png");
const logo = require("../../assets/images/Mohanji-Logo.png");

const WisdomHome = ({ navigation }) => {
  const randomQuoteInit =
    Quotes[Math.floor(Math.random() * Quotes.length)].quote;

  const [randomQuote, setRandomQuotes] = useState(randomQuoteInit);

  const generateQuote = () => {
    const randomQuote = Quotes[Math.floor(Math.random() * Quotes.length)].quote;
    setRandomQuotes(randomQuote);
  };

  return (
    <ImageBackground
      source={require("../../assets/splash/background2.png")}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <ScrollView>
        <View style={styles.containerInner}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image
              source={backArrow}
              style={[styles.backArrow, { marginVertical: 8 }]}
            />
          </Pressable>
          <View style={styles.quoteContainer}>
            <Image source={quote} style={styles.quoteImage} />
          </View>
          <Text style={styles.quote}>{randomQuote}</Text>
          <View style={styles.logoConatiner}>
            <Image source={logo} style={styles.logo} />
          </View>
          <View style={{ marginHorizontal: 22, marginVertical: 6 }}>
            <Button
              mode="elevated"
              onPress={generateQuote}
              textColor="#fff"
              labelStyle={{ fontSize: 20 }}
              style={styles.button}
            >
              {"Another Quote"}
            </Button>
          </View>
          <View style={{ alignItems: "center", marginVertical: 12 }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={async () =>
                await Share.share({
                  title: "Quote",
                  message: `${randomQuote} #MohanjiDaily`,
                })
              }
            >
              <View style={styles.shareContainer}>
                <Text style={styles.shareTxt}>{"Share"}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </ImageBackground>
  );
};

export default WisdomHome;

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
    paddingTop: 12,
    paddingLeft: 22,
    paddingRight: 30,
  },
  quoteContainer: {
    alignItems: "center",
    marginVertical: 8,
  },
  backArrow: {
    width: 36,
    height: 36,
    resizeMode: "contain",
  },
  quoteImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  logoConatiner: {
    alignItems: "flex-end",
    marginVertical: 12,
    marginHorizontal: 22,
  },
  logo: {
    width: 120,
    height: 70,
    resizeMode: "contain",
  },
  colorTitle: {
    fontSize: 16,
  },
  title: {
    marginTop: 25,
    marginBottom: 5,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
  },
  bodyParagraph: {
    marginBottom: 20,
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
    paddingVertical: 0,
  },
  quote: {
    fontSize: 22,
    alignSelf: "flex-start",
    color: "#515151",
    marginHorizontal: 22,
    fontWeight: "500",
  },
  shareContainer: {
    width: 150,
    height: 50,
    backgroundColor: "#AA8455",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 2,
  },
  shareTxt: { fontSize: 22, color: "#FFFFFF" },
  hashTag: { color: "#515151", fontSize: 18, marginTop: 12 },
});
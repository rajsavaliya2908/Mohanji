import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  ImageBackground,
  Animated,
} from "react-native";
import { Provider as PaperProvider, Button } from "react-native-paper";
import { useSelector } from "react-redux";
import LanguagePrefData from "../../hooks/LanguagePrefData";
import { useFonts } from "expo-font";
import axios from "axios";
import Quotes from "../includes/Quotes";

const SplashPage = ({ navigation }) => {
  const userAuth = useSelector((state) => state.userAuth);
  const [quote, setQuote] = useState("");
  const [quoteFontSize, setQuoteFontSize] = useState(null);
  const [quoteLineHeight, setQuoteLineHeight] = useState(null);
  const [quoteLength, setQuoteLength] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const hideSplash = () => {
    // props.setSplashShows(true);
    if (userAuth?.loggedIn) {
      navigation.replace("NavBarBottom", { screen: "NavBarBottom" });
    } else {
      navigation.replace("AuthStack", { screen: "Welcome" });
    }
  };

  useEffect(() => {
    const getQuote = () => {
      axios
        .get(
          `https://ethicallybased.com/mohanji-app-api/quotes.php?language=en&length=200`
        )
        .then((result) => {
          var quote = result?.data?.quote;
          var quote_length = quote?.length;
          setQuote(quote);
          setQuoteLength(quote_length);
          if (quote_length >= 200) {
            setQuoteFontSize(24);
            setQuoteLineHeight(28);
          } else if (quote_length >= 150 && quote_length < 200) {
            setQuoteFontSize(22);
            setQuoteLineHeight(26);
          } else if (quote_length < 150) {
            setQuoteFontSize(24);
            setQuoteLineHeight(28);
          }
        })
        .catch((error) => console.log(error));
    };

    getQuote();
  }, []);

  useEffect(() => {
    quote && fadeIn();
  }, [quote]);

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ImageBackground
      source={require("../../assets/splash/background1.png")}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      {quote && (
        <Animated.View style={[styles.containerSplash, { opacity: fadeAnim }]}>
          <Text
            style={{
              width: "100%",
              textAlign: "left",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              fontWeight: "bold",
              fontSize: quoteFontSize,
              lineHeight: quoteLineHeight,
            }}
          >
            <Text>&#8220;&nbsp; </Text>
            <Text>{quote}</Text>
            <Text> &nbsp;&#8221;</Text>
          </Text>
          <View
            style={{
              width: "100%",
              textAlign: "left",
              float: "left",
            }}
          >
            <Image
              style={{
                width: 100,
                height: 70,
                marginTop: 20,
                resizeMode: "contain",
              }}
              source={require("../../assets/splash/mohanji-logo-white.png")}
            />
          </View>
          <View style={styles.buttonHolder}>
            <Button
              mode="contained-tonal"
              onPress={hideSplash}
              textColor="#555"
              labelStyle={{ fontSize: 16 }}
              style={styles.button}
            >
              TAKE ME INSIDE
            </Button>
          </View>
        </Animated.View>
      )}
    </ImageBackground>
  );
};

export default SplashPage;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "center",
  },
  containerSplash: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 26,
    overflow: "hidden",
  },
  navBottomContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  NavBottomTab: {
    marginTop: 10,
    flex: 1,
    alignItems: "center",
    fontSize: 18,
  },
  buttonHolder: {
    width: "100%",
    marginTop: 15,
    fontSize: 17,
    padding: 0,
    marginTop: 15,
    width: "100%",
    height: 50,
    padding: 0,
    marginTop: 15,
    justifyContent: "center",
    alignContent: "center",
    color: "#4B3269",
  },
  button: {
    height: 50,
    backgroundColor: "#fff",
    borderColor: "#AA8455",
    borderWidth: 2,
    borderRadius: 50,
    justifyContent: "center",
    alignContent: "center",
  },
});

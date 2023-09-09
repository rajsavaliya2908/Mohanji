import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import "react-native-gesture-handler";
import React from "react";
import PracticesCard from "./PracticesCard";
const { width, height } = Dimensions.get("window");

const Practices = ({ navigation }, props) => {
  const cards = [
    {
      key: 1,
      meditationType: "Bliss of Silence",
      duration: 40,
      content:
        "Bliss of Silence is a 40-minute guided meditation that is ideal for any spiritual aspirant, from a busy businessman to a teenager. It firstly helps us relax at the level of the physical body, and then slowly dive into stillness. We are guided to expand our consciousness to reveal our true identity.",
      thumbnail:
        "https://mohanji-app.fra1.digitaloceanspaces.com/images/bliss-of-silence.png",
      audioUrl:
        "https://mohanji.org/mf-drive/media/meditations/Bliss%20of%20Silence/English/Bliss%20of%20Silence%20-%20English%20-%20v1.2.mp3",
      durationMinutes: 41,
      durationSeconds: 19,
    },
    {
      key: 2,
      meditationType: "Blossoms Of Love",
      duration: 30,
      content:
        "Blossoms of Love- This is a 30-minute guided meditation helps us develop unconditional love that culminates in a feeling of containing the entire universe within us. It teaches us to acknowledge and become familiar with our infinite consciousness, as well as understand our relationship with the universe.",
      thumbnail:
        "https://mohanji-app.fra1.digitaloceanspaces.com/images/blossoms-of-love.png",
      audioUrl:
        "https://mohanji.org/mf-drive/media/meditations/Blossoms%20of%20Love/English/Blossoms%20of%20Love_Final.mp3",
      durationMinutes: 26,
      durationSeconds: 0,
    },
    {
      key: 3,
      meditationType: "360 Degrees",
      duration: 100,
      content:
        "360 Degrees meditation is a powerful, guided chakra meditation by Mohanji aimed at shifting the consciousness to 360 degrees resulting in access to higher dimensions & stability within.",
      thumbnail:
        "https://mohanji-app.fra1.digitaloceanspaces.com/images/360-degrees-meditation.png",
      audioUrl:
        "https://mohanji.org/mf-drive/media/meditations/360%20Degree/English/360%20Degrees%20-%20English.mp3",
      durationMinutes: 74,
      durationSeconds: 23,
    },
    {
      key: 4,
      meditationType: "Freedom Meditation: For Children",
      duration: 10,
      content:
        "Freedom Meditation is a 10-minute guided meditation provides a therapeutic solace for children, including those struggling to cope with anxiety, autism, ADD, ADHD, OCD and so on.",
      thumbnail:
        "https://mohanji-app.fra1.digitaloceanspaces.com/images/freedom-meditation.png",
      audioUrl:
        "https://mohanji.org/mf-drive/media/meditations/Freedom%20Meditation%20for%20Children/English/Freedom%20Meditation%20-%20English.mp3",
      durationMinutes: 9,
      durationSeconds: 59,
    },
    {
      key: 5,
      meditationType: "Power Of Purity",
      duration: 45,
      content:
        "Power of Purity Meditation is Mohanji's signature guided gratitude meditation- the very first meditation that he received from the higher realms of consciousness and shared with humanity in 2007. It has a powerful effect of cleansing and opening the heart.",
      thumbnail:
        "https://mohanji-app.fra1.digitaloceanspaces.com/images/power-of-purity.png",
      audioUrl:
        "https://mohanji.org/mf-drive/media/meditations/Power%20of%20Purity/English/The%20Power%20of%20Purity%20_%20English.mp3",
      durationMinutes: 51,
      durationSeconds: 57,
    },
    {
      key: 6,
      meditationType: "Shirdi Sai Baba Miracle Meditation",
      duration: 46,
      content:
        "In this meditation, you establish Sai Baba inside your heart as his temple. Immersed in Baba's presence, you will experience the ultimate joy and contentment with Shraddha & Saburi. The devotion and surrender to Baba will bring you miraculous healing, acceptance, and true happiness beyond any boundaries.",
      thumbnail:
        "https://mohanji-app.fra1.digitaloceanspaces.com/images%2Fsai-baba-meditation.png",
      audioUrl:
        "https://mohanji-app.fra1.digitaloceanspaces.com/meditations%2FShirdi%20Sai%20Baba%20Miracle%20Meditation%2FShirdi%20Sai%20Baba%20Miracle%20Meditation%20-%20English.mp3",
      durationMinutes: 45,
      durationSeconds: 54,
    },
    {
      key: 7,
      meditationType: "Shree Jagannatha Meditation",
      duration: 32,
      content:
        "Mohanji says that being connected to Lord Jagannath is our deepest Blessing. Jagannath is the Essence of the whole Universe and is huge, vast, and unfathomable.",
      thumbnail:
        "https://mohanji-app.fra1.digitaloceanspaces.com/images/shree-jagannatha-meditation.png",
      audioUrl:
        "https://mohanji-app.fra1.digitaloceanspaces.com/meditations%2FShree%20Jagannatha%20Meditation%2FJagannatha%20Meditation%20English-%20Final.mp3",
      durationMinutes: 31,
      durationSeconds: 54,
    },
  ];

  return (
    <ImageBackground
      source={require("../../assets/splash/background2.png")}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        <View style={styles.containerInner}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Power of Purity */}
            <View style={{ marginHorizontal: 22 }}>
              <TouchableOpacity
                style={{
                  alignItems: "flex-start",
                  backgroundColor: "#F1EBE4",
                  borderRadius: 16,
                  height: 240,
                  marginTop: 16,
                }}
                onPress={() =>
                  navigation.navigate("PracticesEach", {
                    meditationType: cards[4]["meditationType"],
                    content: cards[4]["content"],
                    thumbnail: cards[4]["thumbnail"],
                    audioUrl: cards[4]["audioUrl"],
                    durationMinutes: cards[4]["durationMinutes"],
                    durationSeconds: cards[4]["durationSeconds"],
                    languageCode: "en",
                    LanguageDisplay: "English",
                  })
                }
              >
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 29,
                      fontWeight: "bold",
                      paddingVertical: 20,
                      paddingHorizontal: width > 375 ? 20 : 15,
                    }}
                  >
                    {cards[4]["meditationType"]}
                  </Text>
                  <View
                    style={{
                      width: 70,
                      height: 30,
                      marginTop: 20,
                      backgroundColor: "#fff",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 30,
                      marginRight: 22,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "600",
                        // float: "right",
                      }}
                    >
                      {cards[4]["duration"]} min
                    </Text>
                  </View>
                </View>
                <Image
                  style={{
                    width: 300,
                    height: 200,
                    marginTop: 20,
                    resizeMode: "contain",
                    top: 40,
                    right: -16,
                    zIndex: 5,
                    position: "absolute",
                  }}
                  source={require("../../assets/images/power-of-purity.png")}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginHorizontal: 22,
              }}
            >
              <View style={{ width: "50%" }}>
                {/* Bliss of Silence */}
                <View
                  style={{ width: "100%", marginTop: 18, marginBottom: 16 }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#D4C1AA",
                      borderRadius: 16,
                      height: 190,
                      marginRight: 10,
                    }}
                    onPress={() =>
                      navigation.navigate("PracticesEach", {
                        meditationType: cards[0]["meditationType"],
                        content: cards[0]["content"],
                        thumbnail: cards[0]["thumbnail"],
                        audioUrl: cards[0]["audioUrl"],
                        durationMinutes: cards[0]["durationMinutes"],
                        durationSeconds: cards[0]["durationSeconds"],
                        languageCode: "en",
                        LanguageDisplay: "English",
                      })
                    }
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                      }}
                    >
                      {cards[0]["meditationType"]}
                    </Text>

                    <View
                      style={{
                        width: "100%",
                      }}
                    >
                      <View
                        style={{
                          width: 70,
                          height: 30,
                          marginLeft: 20,
                          backgroundColor: "#fff",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 20,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: "600",
                            // float: "right",
                          }}
                        >
                          {cards[0]["duration"]} min
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Image
                        style={{
                          width: 150,
                          height: 150,
                          resizeMode: "contain",
                          right: width > 375 ? -30 : -25,
                          bottom: width > 375 ? 20 : 16,
                          zIndex: 5,
                        }}
                        source={require("../../assets/images/bliss-of-silence.png")}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                {/* 360 Degrees Meditation */}
                <View
                  style={{
                    width: "100%",
                    marginTop: height > 896 ? 0 : 26,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#F1EBE4",
                      borderRadius: 16,
                      height: 270,
                      marginRight: 10,
                    }}
                    onPress={() =>
                      navigation.navigate("PracticesEach", {
                        meditationType: cards[2]["meditationType"],
                        content: cards[2]["content"],
                        thumbnail: cards[2]["thumbnail"],
                        audioUrl: cards[2]["audioUrl"],
                        durationMinutes: cards[2]["durationMinutes"],
                        durationSeconds: cards[2]["durationSeconds"],
                        languageCode: "en",
                        LanguageDisplay: "English",
                      })
                    }
                  >
                    <View style={{ width: "100%" }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          paddingHorizontal: 20,
                          paddingVertical: 10,
                        }}
                      >
                        {cards[2]["meditationType"]}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: 70,
                        height: 30,
                        marginLeft: 20,
                        backgroundColor: "#fff",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 20,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "600",
                          // float: "right",
                        }}
                      >
                        {cards[2]["duration"]} min
                      </Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Image
                        style={{
                          width: width > 414 ? 240 : 200,
                          height: width > 414 ? 240 : 200,
                          marginTop: 0,
                          resizeMode: "contain",
                          top: 10,
                          zIndex: 5,
                        }}
                        source={require("../../assets/images/360-degrees.png")}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                {/* Sai Baba Mirical Meditation */}
                <View
                  style={{
                    width: "100%",
                    marginTop: height > 896 ? 55 : 65,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#F1EBE4",
                      borderRadius: 16,
                      height: 270,
                      marginRight: 10,
                    }}
                    onPress={() =>
                      navigation.navigate("PracticesEach", {
                        meditationType: cards[5]["meditationType"],
                        content: cards[5]["content"],
                        thumbnail: cards[5]["thumbnail"],
                        audioUrl: cards[5]["audioUrl"],
                        durationMinutes: cards[5]["durationMinutes"],
                        durationSeconds: cards[5]["durationSeconds"],
                        languageCode: "en",
                        LanguageDisplay: "English",
                      })
                    }
                  >
                    <View style={{ width: "100%" }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          paddingHorizontal: 20,
                          paddingVertical: 10,
                        }}
                      >
                        {cards[5]["meditationType"]}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: 70,
                        height: 30,
                        marginLeft: 20,
                        backgroundColor: "#fff",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 20,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "600",
                          // float: "right",
                        }}
                      >
                        {cards[5]["duration"]} min
                      </Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Image
                        style={{
                          width: width > 414 ? 240 : 200,
                          height: width > 414 ? 200 : 180,
                          marginTop: 0,
                          resizeMode: "contain",
                          top: 10,
                          zIndex: 5,
                        }}
                        source={require("../../assets/images/sai-baba.png")}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ width: "50%" }}>
                {/* Blosoms of Love */}
                <View
                  style={{
                    width: "100%",
                    marginTop: 18,
                    marginBottom: 16,
                    marginLeft: 8,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#D4C1AA80",
                      borderRadius: 16,
                      height: 300,
                    }}
                    onPress={() =>
                      navigation.navigate("PracticesEach", {
                        meditationType: cards[1]["meditationType"],
                        content: cards[1]["content"],
                        thumbnail: cards[1]["thumbnail"],
                        audioUrl: cards[1]["audioUrl"],
                        durationMinutes: cards[1]["durationMinutes"],
                        durationSeconds: cards[1]["durationSeconds"],
                        languageCode: "en",
                        LanguageDisplay: "English",
                      })
                    }
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                      }}
                    >
                      {cards[1]["meditationType"]}
                    </Text>

                    <View
                      style={{
                        width: 70,
                        height: 30,
                        marginLeft: 20,
                        backgroundColor: "#fff",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 30,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          // float: "right",
                        }}
                      >
                        {cards[1]["duration"]} min
                      </Text>
                    </View>

                    <View>
                      <Image
                        style={{
                          width: 200,
                          height: 200,
                          marginTop: -30,
                          resizeMode: "contain",
                          top: 30,
                          // right: -20,
                          zIndex: 5,
                        }}
                        source={require("../../assets/images/blossoms-of-love.png")}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                {/* Freedom */}
                <View style={{ width: "100%", marginLeft: 8 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#D4C1AA99",
                      borderRadius: 16,
                      height: 240,
                    }}
                    onPress={() =>
                      navigation.navigate("PracticesEach", {
                        meditationType: cards[3]["meditationType"],
                        content: cards[3]["content"],
                        thumbnail: cards[3]["thumbnail"],
                        audioUrl: cards[3]["audioUrl"],
                        durationMinutes: cards[3]["durationMinutes"],
                        durationSeconds: cards[3]["durationSeconds"],
                        languageCode: "en",
                        LanguageDisplay: "English",
                      })
                    }
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                      }}
                    >
                      {cards[3]["meditationType"]}
                    </Text>
                    <View
                      style={{
                        width: "100%",
                      }}
                    >
                      <View
                        style={{
                          width: 70,
                          height: 30,
                          marginLeft: 20,
                          backgroundColor: "#fff",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 30,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: "600",
                            // float: "right",
                          }}
                        >
                          {cards[3]["duration"]} min
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Image
                        style={{
                          width: 200,
                          height: 200,
                          resizeMode: "contain",
                          zIndex: 5,
                          bottom: width > 390 ? 45 : 40,
                          left: width > 390 ? 22 : 10,
                        }}
                        source={require("../../assets/images/freedom.png")}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                {/* Shree Jagannatha Meditation */}
                <View style={{ width: "100%", marginTop: 35, marginLeft: 8 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#D4C1AA99",
                      borderRadius: 16,
                      height: 240,
                    }}
                    onPress={() =>
                      navigation.navigate("PracticesEach", {
                        meditationType: cards[6]["meditationType"],
                        content: cards[6]["content"],
                        thumbnail: cards[6]["thumbnail"],
                        audioUrl: cards[6]["audioUrl"],
                        durationMinutes: cards[6]["durationMinutes"],
                        durationSeconds: cards[6]["durationSeconds"],
                        languageCode: "en",
                        LanguageDisplay: "English",
                      })
                    }
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                      }}
                    >
                      {cards[6]["meditationType"]}
                    </Text>
                    <View
                      style={{
                        width: "100%",
                      }}
                    >
                      <View
                        style={{
                          width: 70,
                          height: 30,
                          marginLeft: 20,
                          backgroundColor: "#fff",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 30,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: "600",
                            // float: "right",
                          }}
                        >
                          {cards[6]["duration"]} min
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Image
                        style={{
                          width: 140,
                          height: 200,
                          resizeMode: "contain",
                          zIndex: 5,
                          bottom: width > 390 ? 20 : 20,
                          left: width > 390 ? 25 : 10,
                        }}
                        source={require("../../assets/images/jaganath.png")}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* Invisible View to allow overflow imnages */}
            <View style={{ height: 160 }}></View>
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Practices;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    overflow: "hidden",
  },
  containerInner: {
    textAlign: "center",
    justifyContent: "center",
    // marginHorizontal: 22,
  },
  cardLinkWrapper: {
    width: "100%",
    // float: "left",
  },
  meditationType: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    paddingTop: 0,
    paddingBottom: 20,
  },
});

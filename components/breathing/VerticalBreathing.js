import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  ImageBackground,
} from "react-native";
import { Button } from "react-native-paper";
import React from "react";
import * as WebBrowser from "expo-web-browser";

const VerticalBreathing = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/splash/background2.png")}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <ScrollView style={styles.container}>
        <View style={styles.containerInner}>
          <View style={styles.headerCardWrapper}>
            <View style={styles.fullWidthImageWrapper}>
              <Image
                style={styles.fullWidthImage}
                source={require("../../assets/images/vertical.png")}
              />
            </View>
          </View>
          <Text style={styles.title}>Vertical Breathing Technique</Text>
          <View style={styles.bodyContentWrapper}>
            <Text style={styles.bodyParagraphSubHeader}>
              Two techniques to counter the speed of time
            </Text>
            <Text style={styles.bodyParagraph}>
              1. As I said, we are frontal lobe oriented. How do we connect to
              the back side? It's not easy. For that you need to shift your
              level of awareness for at least some time every day. This can be a
              meditation. While you are sitting and watching a programme, feel
              the spine for a few minutes.
            </Text>
            <Text style={styles.bodyParagraph}>
              Just be aware that you have a spine. No need to do any meditation,
              feel the spine. When you sit in the car and the car is at the
              traffic light and you see the sign 50 seconds to 40 seconds etc.
              It counts down. At that time during these seconds, feel the spine.
            </Text>
            <Text style={styles.bodyParagraph}>
              Like that, feel the spine many times a day. Just realise you have
              a spine. After some time, you will tend to move to the spine
              faster, and in a few months, depending on how fast you can
              connect, you whole perception changes. From horizontal, it will
              become vertical.
            </Text>
            <Text style={styles.bodyParagraph}>
              Your awareness shifts. Your understanding level changes. It is
              like that. If I am sitting here, I can see this much. If I stand
              up, my view is different. I can see from above. My awareness
              changes to a different dimension, just by being aware of the
              spine.
            </Text>
            <Text style={styles.bodyParagraph}>
              2. Also, when you close your eyes and feel your spine, you can
              automatically see that your awareness has shifted to the third
              eye. So if you concentrate on the third eye directly, this is the
              junction where 72,000 meridians are connected. Energy goes to that
              and reaches the 72,000 locations of our system.
            </Text>
            <Text style={styles.bodyParagraph}>
              At the same time, there is always the possibility that when we
              concentrate and meditate on the third eye, it can overenergise and
              even lead to paralysis. This has happened even to saints in the
              Himalayas.
            </Text>
            <Text style={styles.bodyParagraph}>
              They concentrated on the third eye for too long, and then they
              couldn't move because their whole system was paralysed. However if
              you try concentrating on your spine instead, there will be no
              overenergisation. What is needed in the third eye, will go there,
              the rest will be located in the spine.
            </Text>
            <Text style={styles.bodyParagraph}>
              So this is not your problem, this is a problem with time. I've
              given you two techniques to counter the speed of time. Because you
              have to go with time and be with yourself. That's the only way we
              can survive this time.
            </Text>
            <Text style={styles.bodyParagraph}>
              Furthermore, we must never feel that there is some deficiency in
              us. This is actually mind's projection. Deficiencies are always
              mind's projection. Mind says you can't do it. That's not true. We
              can definitely do it, but the concepts which we've fed into our
              mind, create an impression that we can't do it. So there is some
              problem with us.
            </Text>
            <Text style={styles.bodyParagraph}>
              That has to be completely wiped away. I'm fine just like anybody
              else. Then each step you take, see if you can remove the mental
              block. We may not have it, we collect it from the society, also
              people tell us that you may not be able to do it. Like in the
              programme in Dubai, somebody said, "Mohanji, you can do it, but I
              am not like you." I said that's nonsense. "I have tried and I had
              conviction."
            </Text>
            <Text style={styles.bodyParagraph}>
              That's the only thing. In the early 2000s when I was practising on
              my own, I used to wake up at 3am every day, I couldn't sleep
              beyond it. I used to be a corporate head of country, so we
              sometimes had late parties but again, I woke up at 3am and from
              3-8am I completely detached myself from the world and meditated.
            </Text>
            <Text style={styles.bodyParagraph}>
              I sometimes chanted, then I meditated, connected to the spine and
              dissolved. So five hours was dedicated to myself whatever was
              happening in the world. This helped. After all these years it has
              given the awareness which I am sharing with people. It is always a
              discipline and conviction. Even if nothing happens, it's ok. In
              everybody's stage of evolution in spirituality, the first is the
              experience.
            </Text>
            <Text style={styles.bodyParagraph}>
              We experienced meditation, something is happening, we are very
              happy. After some time, stagnation. The same thing cannot give the
              same result. So you stagnate. Most people stop there. Then they go
              to another programme. There is a sensation for a few days. Then
              again stagnation. So people do not cross over to higher levels.
              This is why people do not achieve something.
            </Text>
            <Text style={styles.bodyParagraph}>
              Somebody asked Buddha, "How can we be like you?" Buddha said,
              "That is very simple. Do the penance like I did. Do tapas. He
              said, "I cannot do that. Because you have done extreme penance to
              reach that stage." Then Buddha said, "Then serve the people, serve
              the poor, do something for the world." If that is also difficult,
              third is merge your consciousness to mine.
            </Text>
            <Text style={styles.bodyParagraph}>
              Look at me, connect to me, whenever your mind is with me, you are
              with me. If your body is with me, you may not necessarily be with
              me because if your mind is outside, you are outside. If you want
              to be with me, let your mind be with me. Wherever you are, no
              problem. So you will start moving into my consciousness and you
              will achieve what I achieved.
            </Text>
          </View>
          <View style={styles.buttonsWrapper}>
            <View style={styles.buttonEachHolder}>
              <Button
                mode="contained-tonal"
                onPress={() =>
                  WebBrowser.openBrowserAsync(
                    "https://mohanji.org/blogs/satsangs/2015/05/21/breathe-vertically/",
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
      </ScrollView>
    </ImageBackground>
  );
};

export default VerticalBreathing;

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
    paddingBottom: 80,
  },
  headerCardWrapper: {
    marginTop: 10,
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
  colorTitle: {
    fontSize: 16,
  },
  title: {
    marginTop: 25,
    marginBottom: 25,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
  },
  bodyContentWrapper: {},
  bodyParagraphSubHeader: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: "500",
  },
  bodyParagraph: {
    marginBottom: 20,
    fontSize: 15,
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
  fullWidthImageWrapper: {},
  fullWidthImage: {
    width: "100%",
    height: 110,
    borderRadius: 10,
  },
});

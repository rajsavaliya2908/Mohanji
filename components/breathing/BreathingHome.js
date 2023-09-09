import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  useWindowDimensions,
} from "react-native";
import React from "react";
import VideoCardPranayama from "../videos/VideoCardPranayama";
import RenderHtml from "react-native-render-html";

const backArrow = require("../../assets/images/back-arrow.png");

const source = {
  html: `
<p style='text-align:center;'>
  Hello World!
</p>`,
};

const links = [
  {
    key: 1,
    title: "Kapal Bhati Kriya",
    html: `<strong>Instructions:</strong><br><br>Kapalbhati is a respiratory kriya practice with exhalation active and inhalation passive and automatic.<br>Exhale forcibly with a sound using abdominal muscles. While inhaling silently, the abdomen should return to its original position&nbsp;(abdomen should not come outward as you take in air).<br>One inhale/exhale is one round.<br>Repeat at least 15 to 30 rounds.&nbsp;<br>Relax for a while and start the next cycle.<br>Try to practice 5 to 10 cycles, but it is important to pause between two cycles and feel the stillness of mind&nbsp;<br><br><strong>Caution:</strong> If pain or dizziness is experienced, stop the practice and relax for some time. Resume the practice with more awareness and less force. Those suffering from heart disease, high blood pressure, gastritis, vertigo or hernia should not practice Kapalbhati. This kriya should be practised with attention in a rhythmic slow speed.&nbsp;<br><br><strong>Important:</strong> Every round should begin with an exhalation and should end with an inhalation.&nbsp;<br><br><strong>Effects &amp; Benefits:</strong> This technique enables in eliminating large amounts of toxins contained in the body. This kriya clears the nasal cavities and lungs, stimulates the abdominal organs and activates brain cells. It brings relief from asthma and tones the abdominal muscles and helps to develop concentration. It purifies the Ida and Pingala nadis and removes sensory distractions from the mind. It energizes the body, stimulates the mind, removes lethargy and prepares mind for meditation.</p>`,
    card: require("../../assets/images/breathwork-1.png"),
    link: "VideoCardPranayama",
    videoId: "6zxtm9dQBas",
    videoThumbnail:
      "https://mohanji-app.fra1.digitaloceanspaces.com/videos%2FKapalbhati-Kriya%20Thumbnail.png",
  },
  {
    key: 2,
    title: "Nadi Shodana",
    html: `<p>Nadi Sodana, also known&nbsp;Alternate nostril breathing, is&nbsp;primarily aimed at&nbsp;purifying or cleansing the channels of the subtle and physical body,&nbsp;while bringing balance to the system as a whole.&nbsp;<br><br><strong>Instructions:</strong>&nbsp;</p>
    <p>Sit in any comfortable posture of choice (Ardhapadmaasana/Padmaasana) or Sukhaasana)&nbsp;<br>Fold the forefinger and middle finger of the right hand.<br>Place the thumb above the right nostril and the ring and little finger above the left.<br>These 2 fingers control the flow of breath in the nostril by alternately pressing on one nostril, blocking the flow of breath with the other finger.<br>Same technique is repeated with the other nostril.<br>Inhale through left nostril closing the right nostril with thumb.<br>Exhale through right nostril by removing the thumb and closing the left nostril with the ring finger.<br>Inhale through right nostril closing left nostril with ring finger.<br>Exhale through left nostril closing the right nostril with thumb.<br>This is one round of Nadī Śodana.<br>Continue to do 10 rounds.</p>
    <p><strong>Caution:</strong> One should not practice while having cold, cough or fever.&nbsp;<br><br><strong>Effects &amp; Benefits:</strong> This practice purifies the Nadīs and Cakras. Asthma and nasal allergies can be contained by doing this practice. It reduces anxiety and stress, helps in developing concentration and enables mind to focus. Long standing practice of Nadī Śodana helps to bring balance and equanimity in life.</p>`,
    card: require("../../assets/images/breathwork-2.png"),
    link: "VideoCardPranayama",
    videoId: "KnhCg9V4yTQ",
    videoThumbnail:
      "https://mohanji-app.fra1.digitaloceanspaces.com/videos%2FNadi-Sodana-Thumbnail.png",
  },
  {
    key: 3,
    title: "Yogic Breathing",
    html: `<p>Yogic Breathing consists of deep and fluid inhalations and exhalations that fill three sections of the torso &ndash; abdominal, thoracic, clavicle. The breathing is done through nose. First, we breathe into the lower abdomen. Then, into the mid-section of the torso &ndash; thoracic part, expanding the diaphragm and the ribs as the inhalation continues. And finally, we draw the breath into the upper chest and shoulders &ndash; clavicle part, as the inhalation comes to a close.</p>
    <p><strong>Instructions:</strong><br><br>Sit in a comfortable cross-legged position.<br>Keep the back and spine erect, placing the palms on the thighs comfortably.<br>Close the eyes and relax the body<br><br>Keep palms at navel region making a fist with thumb inside&nbsp;<br>Inhale with abdominal, thoracic, and clavicle part and exhale in the same order.&nbsp;<br>Continue for 7 to 10 rounds of breathing.&nbsp;<br><br><strong>Effects &amp; Benefits:</strong> This Pranayama helps to relieve anxiety, tension, calms the mind and helps to reduce psychosomatic disorders.</p>`,
    card: require("../../assets/images/breathwork-3.png"),
    link: "VideoCardPranayama",
    videoId: "PilFVPAntUA",
    videoThumbnail:
      "https://mohanji-app.fra1.digitaloceanspaces.com/videos%2FYogic-Breathing%20Thumbnail.png",
  },
  {
    key: 4,
    title: "Ujjai",
    html: `<p>Ujjayi is a breathing technique that focuses on breathing through your nose and tightening your throat to make a sound similar to a light snore. It is also called victorious breath. Unlike other breathing techniques, this pranayama can be done during yoga postures and&nbsp;helps us stay embodied and focused during postures.<br><br><strong>Instructions:<br></strong><br>Sit in a comfortable position, keeping the spine erect and body relaxed.<br>Bring your focus on the throat.<br>Slightly constrict the throat (the glottis) and inhale and exhale. There will be a slight hissing sound produced through the throat as one inhales and exhales. The sound should be very subtle.&nbsp;<br>The inhale and exhale should be smooth without disruption.<br>Practice for 10 to 12 breaths&nbsp;<br><br><strong>Caution:</strong> People having throat infections may avoid this pranayama.&nbsp;<br><br><strong>Effects &amp; Benefits:</strong> This pranayama soothes the nervous system, calms the mind and helps to prevent thyroid disorders.</p>`,
    card: require("../../assets/images/breathwork-4.png"),
    link: "VideoCardPranayama",
    videoId: "AAbAZTwv918",
    videoThumbnail:
      "https://mohanji-app.fra1.digitaloceanspaces.com/videos%2FUjjai-Thumbnail.png",
  },
  {
    key: 5,
    title: "Bhramari",
    html: `<p>Bhramari,&nbsp;also known as Humming Bee Breath. <em>Bhramari</em> is the Sanskrit word for &ldquo;bee,&rdquo; The pranayama is named after the humming sound produced at the back of the throat during the practice, like the gentle humming of a bee.</p>
    <p><strong>Instructions:</strong>&nbsp;<br><br>Sit in a comfortable position.<br>Keep the back and spine erect.<br>Close the eyes and relax the body.<br>Raise your arms from the sides with elbows pointing sideways.<br>Place the thumbs at the openings of the ears, index fingers on the eyes, middle fingers at the nostrils, ring fingers above lips and little fingers below the mouth. This is also known as sanmukhi mudra.<br>Inhale slowly and deeply through the nose.<br>Exhale slowly with the humming sound of a bee.<br>Repeat for 10 breaths.</p>
    <p><strong>Effects &amp; Benefits:</strong> This Pranayama helps to relieve anxiety and tension. It calms the mind, helps people suffering from blood pressure, migraines and helps to build concentration.</p>`,
    card: require("../../assets/images/breathwork-5.png"),
    link: "VideoCardPranayama",
    videoId: "6ogvDBu8I_k",
    videoThumbnail:
      "https://mohanji-app.fra1.digitaloceanspaces.com/videos%2FBhramari-Thumbnail.png",
  },
];

const BreathingHome = ({ navigation }) => {
  const { width } = useWindowDimensions();

  return (
    <ImageBackground
      source={require("../../assets/splash/background2.png")}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <ScrollView bounces={false} style={styles.container}>
        <View style={styles.containerInner}>
          <View style={styles.headerContainer}>
            <Pressable onPress={() => navigation.goBack()}>
              <Image source={backArrow} style={styles.backArrow} />
            </Pressable>
            <Text style={styles.title}>Learn how to practice Pranayama</Text>
          </View>
          <Text style={styles.bodyParagraph}>
            Start by choosing one of the Pranayama exercises and follow the
            directions. Brought to you by the Himalayan School of Traditional
            Yoga.
          </Text>
          <RenderHtml contentWidth={width} source={source} />
          <View style={styles.buttonsWrapper}>
            {links.map((list, index) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate(list.link, {
                    videoId: list.videoId,
                    videoThumbnail: list.videoThumbnail,
                    videoTitle: list.title,
                    videoDescription: list.html,
                  })
                }
              >
                <Image source={list.card} style={styles.card} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </ImageBackground>
  );
};

export default BreathingHome;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    paddingTop: 5,
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
  },
  containerInner: {
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },

  colorTitle: {
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    width: "100%",
    paddingHorizontal: 8,
  },
  bodyParagraph: {
    fontWeight: "500",
    textAlign: "center",
    color: "#515151",
  },
  card: {
    width: "100%",
    height: undefined,
    resizeMode: "contain",
    aspectRatio: 2,
  },
});

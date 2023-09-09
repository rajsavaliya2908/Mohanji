import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import "react-native-gesture-handler";
import React from "react";
import CardItem from "../videos/CardItem";

const Meditations = ({ navigation }, props) => {
  const cards = [
    {
      key: 1,
      title: "How To Control Your Thoughts?",
      content:
        "In this video, Mohanji explains the process of thoughts and steps we can take to move more and more into silence.",
      link: "Video",
      videoUrl:
        "https://mohanji-app.fra1.digitaloceanspaces.com/videos/how-to-control-your-thoughts.mp4",
      videoThumbnail:
        "https://mohanji-app.fra1.digitaloceanspaces.com/images/how-to-control-your-thoughts.jpeg",
    },
    {
      key: 2,
      title: "What Is Heaven And What Is Hell?",
      content:
        "In this deeply insightful video recorded in 2013, Mohanji clearly explains what is heaven and what is hell in relation to one's operational level. He speaks about how to maintain higher consciousness and prevent oneself to fall into the lower vibrational frequencies such as anger, hatred etc.",
      link: "Video",
      videoUrl:
        "https://mohanji-app.fra1.digitaloceanspaces.com/videos/what-is-heaven-and-what-is-hell.mp4",
      videoThumbnail:
        "https://mohanji-app.fra1.digitaloceanspaces.com/images/what-is-heaven-and-hell.jpeg",
    },
    {
      key: 3,
      title: "What Is The Role Of Personality In Our Incarnation?",
      content:
        "Mohanji explains the purpose of birth and how one's inclinations and desires create and shape one's personality. In this video Mohanji also talks about how patterns shape one's life choices and experiences.",
      link: "Video",
      videoUrl:
        "https://mohanji-app.fra1.digitaloceanspaces.com/videos/what-is-the-role-of-personality-in-our-incarnation.mp4",
      videoThumbnail:
        "https://mohanji-app.fra1.digitaloceanspaces.com/images/the-role-of-personality-in-our-incarnation.jpeg",
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.containerInner}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Mohanji Meditations</Text>
          {cards.map((card) => (
            <CardItem
              key={card.key}
              title={card.title}
              content={card.content}
              link={card.link}
              navigation={navigation}
              videoUrl={card.videoUrl}
              videoThumbnail={card.videoThumbnail}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Meditations;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "center",
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
  cardLinkWrapper: {
    width: "100%",
    // float: "left",
  },
  title: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    paddingTop: 15,
    paddingBottom: 20,
  },
});

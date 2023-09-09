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
import CoursesCard from "./CoursesCard";

const Courses = ({ navigation }, props) => {
  const cards = [
    {
      key: 1,
      title: "Empowered 1.0 - Get to know your true self",
      content:
        "This is an intensive online course where Mohanji will guide you and share techniques that will empower you, transform you and BRING YOU HOME to yourself.",
      link: "CoursesEach",
      thumbnail:
        "https://mohanji-app.fra1.digitaloceanspaces.com/images/empowered-1.png",
    },
    {
      key: 2,
      title: "Empowered 2.0 - Being yourself",
      content:
        "During the Empowered 2.0 program, you will embark on the deeper work of replacing negative patterns of thinking and behaving, with a positive state of mind and positive actions. The program will help you stop waiting for others and circumstances to change and empower you to take destiny into your own hands. By showing you how to take full responsibility for your thoughts, emotions, behavior, you can begin to attain the results you desire.",
      link: "CoursesEach",
      thumbnail:
        "https://mohanji-app.fra1.digitaloceanspaces.com/images/empowered-2.jpeg",
    },
    {
      key: 3,
      title: "Empowered 3.0 - Creating masters",
      content:
        "One and half hours every day, be it your very early morning, middle of a working day or late evenings, is worth investing for a 360 degree turnaround. You deserve these life transforming experiences amidst the chaos of daily life!",
      link: "CoursesEach",
      thumbnail:
        "https://mohanji-app.fra1.digitaloceanspaces.com/images/empowered-3.jpg",
    },
    {
      key: 4,
      title: "Empowered 4.0 - Your are your own master",
      content:
        "When you become purified with perfect awareness about yourself and devotion to supreme consciousness, the TRUTH reveals itself to you through consistent connection. Reality shines forth. All you need is to pay attention to the God within you with full awareness.",
      link: "CoursesEach",
      thumbnail:
        "https://mohanji-app.fra1.digitaloceanspaces.com/images/empowered-4.jpg",
    },
    {
      key: 5,
      title: "Empowered 5.0 - Meet the master within you",
      content:
        "The next program in this series – Empowered 5.0 is going even deeper, penetrating the silence within through intense practices in Mohanji’s presence and with his guidance.",
      link: "CoursesEach",
      thumbnail:
        "https://mohanji-app.fra1.digitaloceanspaces.com/images/empowered-5.jpeg",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.containerInner}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Empowered Series</Text>
          <Text style={{ marginBottom: 15, textAlign: "justify" }}>
            Through these online sessions, you get to receive Mohanji’s guidance
            directly, almost like a one-on-one session in the comfort of your
            home. No travel, no sharing! Further, you can decide which time of
            the day best suits you for this session – a dedicated 90 minutes a
            day just for yourself. You can watch, re-watch, listen and
            contemplate; allow yourself to absorb the content as much as you
            want.
          </Text>
          {cards.map((card) => (
            <CoursesCard
              key={card.key}
              title={card.title}
              content={card.content}
              link={card.link}
              navigation={navigation}
              thumbnail={card.thumbnail}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Courses;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingTop: 5,
    marginBottom: 60,
  },
  containerInner: {
    padding: 20,
  },
  cardLinkWrapper: {
    width: "100%",
    // float: "left",
  },
  title: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    paddingTop: 0,
    paddingBottom: 20,
  },
});

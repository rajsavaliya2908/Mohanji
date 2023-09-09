import * as React from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "@react-navigation/native";

import { NavigationContainer } from "@react-navigation/native";

const PracticesCard = (props) => {
  return (
    <Card style={styles.card} elevation={0}>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate(props.link, {
            thumbnail: props.thumbnail,
            title: props.title,
            content: props.content,
            audioUrl: 'https://mohanji-app.fra1.digitaloceanspaces.com/practices/practices/bliss-of-silence/bos-english.mp3'
          })
        }
      >
        <Card.Cover
          style={styles.cardCover}
          source={{ uri: props.thumbnail }}
        />
        <Card.Content style={styles.cardContent}>
          <Title style={styles.cardTitle}>{props.title}</Title>
          <Paragraph>{props.content}</Paragraph>
        </Card.Content>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  card: {
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 15,
  },
  cardCover: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardTitle: {
    marginTop: 15,
    marginBottom: 5,
  },
  cardContent: {
    paddingBottom: 15,
    backgroundColor: "#f2f2f2",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});

export default PracticesCard;

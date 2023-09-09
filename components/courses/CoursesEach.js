import * as React from "react";
import { View, StyleSheet, Button, Text, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function CoursesEach({ route, navigation }) {
  /* 2. Get the param */
  const { content, title, thumbnail } = route.params;

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text>{content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 25,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 0,
    paddingBottom: 30
  },
  loader: {
    marginTop: 70,
  },
});

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  ImageBackground,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import "react-native-gesture-handler";
import { userActions } from "../../store/user-slice";
import * as WebBrowser from "expo-web-browser";

const Donate = ({ navigation }, props) => {
  return (
    <ImageBackground
      source={require("../../assets/splash/background2.png")}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        <ScrollView
          style={styles.containerInner}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Thank you for your donation!</Text>
          <Button
            icon="heart"
            mode="contained"
            style={{ backgroundColor: "#e60000" }}
            onPress={() =>
              WebBrowser.openBrowserAsync("https://mohanji.org/donate", {
                showTitle: true,
              })
            }
          >
            Donate Here
          </Button>

          <View>
            <Image
              style={styles.bioImage}
              source={{
                uri: "https://mohanji-app.fra1.digitaloceanspaces.com/images/donate.png",
              }}
            />
          </View>
          <Text style={styles.bioText}>
            Mohanji describes himself as a friend of the world. He is a lover of
            humanity believing humanity to be the best religion for humans.
            Humanity beyond all man-made barriers such as caste, colour, creed,
            nationality and culture. His love extends to all the beings on earth
            and he walks the path of ahimsa (non-violence) in thought, word and
            action.
            {"\n"}
            {"\n"}
            To fulfil his purpose, Mohanji has founded various non-profit
            organizations and movements that operate across 6 continents, each
            with a distinct purpose and flavor, and inspiring thousands of
            volunteers to serve with passion and add value to the world.
          </Text>
          <View style={styles.bottomDivider}></View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default Donate;

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
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    paddingTop: 0,
    paddingBottom: 35,
  },
  input: {
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 15,
    fontSize: 18,
  },
  textBelow: {
    marginTop: 15,
    textAlign: "center",
  },
  bioImage: {
    width: "100%",
    height: 200,
    marginTop: 40,
    borderRadius: 12,
  },
  bioText: {
    marginTop: 20,
  },
  bottomDivider: {
    height: 100,
  },
});

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Searchbar, MD3LightTheme } from "react-native-paper";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const SearchResults = ({ navigation, back }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const [searchResultsList, setSearchResultsList] = useState([]);
  const [searchResultsMessage, setSearchResultsMessage] = useState();
  const [searchResultsCount, setSearchResultsCount] = useState();

  useEffect(() => {
    if (searchQuery !== "") {
      axios
        .get(
          "https://ethicallybased.com/mohanji-app-api/get.php?type=search&searchQuery=" +
            searchQuery
        )
        .then((response) => {
          setSearchResultsList(response.data.searchResults);
          setSearchResultsCount(response.data.searchResultsCount);

          // 1+ results
          if (
            response.data.status == 200 &&
            response.data.searchResultsCount > 1
          ) {
            setSearchResultsMessage("");
          }
          // 0 results
          else if (
            response.data.status == 200 &&
            response.data.searchResultsCount == 1
          ) {
            setSearchResultsMessage(response.data.message);
          }
          // Error
          else if (response.data.status == 202) {
            setSearchResultsMessage(response.data.message);
          }
        });
    }
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <View style={styles.containerInner}>
        <View style={{ width: "100%", marginTop: -10, marginBottom: 15 }}>
          <Text
            onPress={() => navigation.goBack()}
            style={{ textAlign: "right", marginRight: -5 }}
          >
            <Icon
              name="window-close"
              size={30}
              color="#555"
              // style={{ float: "right" }}
            />
          </Text>
        </View>
        <Text
          style={{
            marginTop: 0,
            marginBottom: 15,
            fontSize: 22,
            fontWeight: "bold",
            color: "#000000",
          }}
        >
          {"Search all videos"}
        </Text>
        <View>
          <View>
            <Searchbar placeholder="Search" onChangeText={onChangeSearch} />
          </View>
          <View style={{ marginTop: 20 }}>
            <View>
              <Text>{searchResultsMessage}</Text>
            </View>
            <View>
              <ScrollView contentContainerStyle={{paddingBottom: 400}}>
                {searchResultsList.map((data, index) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(data.component, {
                        videoTitle: data.title,
                        videoDescription: data.description,
                        videoId: data.videoId,
                        videoThumbnail: data.videoThumbnail,
                      })
                    }
                  >
                    <View style={styles.videoThumbnailWrapper}>
                      <Image
                        style={styles.videoThumbnail}
                        source={{
                          uri: data.videoThumbnail,
                        }}
                      />
                      <View>
                        <Icon
                          name="play-circle"
                          size={35}
                          color="#fff"
                          style={{
                            marginTop: -190,
                            marginLeft: 10,
                            opacity: 0.5,
                          }}
                        />
                      </View>
                      <Text style={styles.videoTitle}>{data.title}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SearchResults;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    marginBottom: 60,
  },
  containerInner: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 25,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
  },
  horizontalScrollWrapper: {
    paddingTop: 10,
  },
  horizontalScrollCardFirst: {
    width: 90,
    height: 90,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#F1EBE4",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  horizontalScrollCard: {
    width: 90,
    height: 90,
    marginRight: 20,
    backgroundColor: "#F1EBE4",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  horizontalScrollCardImageWrapper: {},
  horizontalScrollCardImage: {
    borderRadius: 15,
  },
  horizontalScrollCardTextFirst: {
    width: 90,
    marginLeft: 20,
    paddingTop: 12,
    alignItems: "center",
  },
  horizontalScrollCardText: {
    width: 90,
    marginTop: 10,
    alignItems: "center",
  },
  fullWidthImageWrapper: {
    flex: 1,
    marginTop: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },
  fullWidthImage: {
    height: 110,
    borderRadius: 10,
  },
  fullWidthImageArrow: {},
  colorTitle: {
    fontSize: 16,
  },
  videosHeader: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 24,
    paddingTop: 20,
  },
  videoTitle: {
    marginTop: 12,
    marginLeft: 10,
    fontSize: 16,
  },
  videoDescription: {
    marginTop: 10,
  },
  videoThumbnail: {
    width: "100%",
    height: "auto",
    aspectRatio: 480 / 250,
    borderRadius: 10,
  },
  videoThumbnailWrapper: {
    marginBottom: 35,
  },
  videosWrapper2: {
    marginTop: 20,
  },
  videosHeader2: {
    marginLeft: 20,
    fontSize: 24,
    paddingTop: 30,
  },
  videoTitle2: {
    marginTop: 12,
    marginLeft: 10,
    fontSize: 16,
  },
  videoDescription2: {
    marginTop: 10,
  },
  videoThumbnail2: {
    width: 140,
    height: 140,
    borderRadius: 10,
  },
  videoThumbnailWrapperFirst2: {
    width: 140,
    marginLeft: 20,
    marginRight: 20,
  },
  videoThumbnailWrapper2: {
    width: 140,
    height: 140,
    marginRight: 15,
  },
});

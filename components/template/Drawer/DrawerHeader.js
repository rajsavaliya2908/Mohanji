import React, { useContext, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";

const DrawerHeader = ({ navigation }) => {
  const userAuth = useSelector((state) => state.userAuth);
  const [image, setImage] = useState(userAuth?.photoUrl);
  return (
    <View>
      <Pressable>
        <View style={styles.container}>
          <Image
            source={
              image === null || image === "" || image === undefined
                ? require("../../../assets/images/profile-photo.png")
                : { uri: image }
            }
            style={styles.avatar}
          />
          <View
            style={[
              styles.userName,
              {
                justifyContent:
                  userAuth?.country !== "" ? "space-between" : "center",
              },
            ]}
          >
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.headerTxt,
                { color: "#515151", fontWeight: "700" },
              ]}
            >
              {userAuth?.fullName?.length < 16
                ? userAuth?.fullName
                : `${userAuth?.fullName.substring(0, 16)}...`}
            </Text>
            {userAuth?.country !== "" && (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.headerTxt,
                  { color: "#7E7E7E", fontWeight: "500" },
                ]}
              >
                {userAuth?.country !== "" && <Text>{userAuth?.country}</Text>}
              </Text>
            )}
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    flexDirection: "row",
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
    resizeMode: "cover",
    backgroundColor: "#66458F",
  },
  userName: {
    margin: 12,
  },
  headerTxt: {
    fontSize: 16,
  },
  direction: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default DrawerHeader;

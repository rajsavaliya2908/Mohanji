import React from "react";
import { Image, Text, Platform, Share } from "react-native";
import { DrawerItem } from "@react-navigation/drawer";
import * as WebBrowser from "expo-web-browser";
const Draweritem = ({
  src,
  imgStyles,
  labelStyle,
  txt,
  navigation,
  screen,
  linking,
  share,
}) => {
  return (
    <DrawerItem
      icon={() => <Image source={src} style={imgStyles} />}
      label={() => <Text style={labelStyle}>{txt}</Text>}
      onPress={async () => {
        navigation && navigation.navigate(screen);
        linking &&
          WebBrowser.openBrowserAsync("https://mohanji.org/volunteer/", {
            showTitle: true,
          });
        share &&
          (Platform.OS == "android"
            ? await Share.share({
                title: "App Link",
                url: "https://play.google.com/store/apps/details?id=com.mohanji.mmap&hl=en_US&gl=US",
                message:
                  "https://play.google.com/store/apps/details?id=com.mohanji.mmap&hl=en_US&gl=US",
              })
            : await Share.share({
                title: "App Link",
                url: "https://apps.apple.com/us/app/mohanji/id1451080250",
                message: "https://apps.apple.com/us/app/mohanji/id1451080250",
              }));
      }}
    />
  );
};

export default Draweritem;

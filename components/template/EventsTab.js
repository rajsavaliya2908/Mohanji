import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  Animated,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import PastEvents from "../events/PastEvents";
import UpcomingEvents from "../events/UpcomingEvents";

const { width } = Dimensions.get("window");

const Tab = createMaterialTopTabNavigator();

const TAB_WIDTH = width * 0.5;

const TabBarIndicator = ({ state }) => {
  const [itemWidth, setItemWidth] = useState(TAB_WIDTH);
  const [translateValue] = useState(new Animated.Value(0));

  useEffect(() => {
    slide();
  }, [state]);

  const slide = () => {
    setItemWidth(TAB_WIDTH);
    const toValue = state.index * TAB_WIDTH;
    Animated.timing(translateValue, {
      toValue: toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom: 0,
        width: itemWidth,
        borderBottomColor: "#A93EFF",
        borderBottomWidth: 2,
        transform: [{ translateX: translateValue }],
      }}
    />
  );
};

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/splash/background2.png")}
      resizeMode="cover"
      style={{ flexDirection: "row" }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const tabbarItemWidth = TAB_WIDTH;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              width: tabbarItemWidth,
              alignItems: "center",
              justifyContent: "center",
              height: 40,
            }}
          >
            <Animated.Text
              style={{
                color: isFocused ? "#3F414E" : "#3F414E90",
                fontWeight: isFocused ? "800" : "600",
                fontSize: 16,
              }}
            >
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
      <TabBarIndicator state={state} />
    </ImageBackground>
  );
};

const EventsTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="UpcomingEvents"
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen
        name="UpcomingEvents"
        component={UpcomingEvents}
        options={{ tabBarLabel: "Upcoming Events" }}
      />
      <Tab.Screen
        name="PastEvents"
        component={PastEvents}
        options={{ tabBarLabel: "Past Events" }}
      />
    </Tab.Navigator>
  );
};

export default EventsTab;

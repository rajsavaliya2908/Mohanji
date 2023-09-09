import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HomeStack from "./HomeStack";
import Courses from "../courses/CoursesHome";
import Practices from "../practices/PracticesHome";
import Timer from "../timer/Timer";
import Register from "../auth/Register";
import { useSelector } from "react-redux";
import NavBarTop from "./NavBarTop";
import Donate from "../donate/Donate";
import Test from "../test/Test";
import EventStack from "./EventStack";

const Tab = createBottomTabNavigator();

const tabsList = [
  {
    name: "Home",
    component: HomeStack,
    tabBarLabel: "Home",
    iconLabel: "home",
  },
  {
    name: "Meditations Tab",
    component: Practices,
    tabBarLabel: "Meditate",
    iconLabel: "meditation",
  },
  // {
  //   name: "Courses Tab",
  //   component: Courses,
  //   tabBarLabel: "Courses",
  //   iconLabel: "school",
  // },
  {
    name: "Timer Tab",
    component: Timer,
    tabBarLabel: "Timer",
    iconLabel: "timer",
  },
  {
    name: "Upcoming Events Tab",
    component: EventStack,
    // component: UpcomingEvents,
    tabBarLabel: "Events",
    iconLabel: "calendar-month",
  },
  // {
  //   name: "Test",
  //   component: Test,
  //   tabBarLabel: "Test",
  //   iconLabel: "calendar-month",
  // },
  // {
  //   name: "Donate Tab",
  //   component: Donate,
  //   tabBarLabel: "Donate",
  //   iconLabel: "hand-coin",
  // },
];

const NavBarBottom = () => {
  const userAuth = useSelector((state) => state.userAuth);

  return (
    <Tab.Navigator
      initialRouteName="Home Tab"
      headerShown={false}
      screenOptions={() => ({
        header: (props) => <NavBarTop {...props} />,
        tabBarStyle: {
          height: 80,
          paddingHorizontal: 5,
          paddingTop: 0,
          paddingBottom: 22,
          borderTopWidth: 0,
          shadowOpacity: 0.3,
          shadowRadius: 3,
          shadowOffset: {
            height: 0,
            width: 0,
          },
          elevation: 2,
          // backgroundColor: "#B78F5E",
          backgroundColor: "#FFFFFF",
          position: "absolute",
          zIndex: 10,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          overflow: "hidden",
        },
      })}
    >
      <Tab.Group>
        {tabsList.map((tabEach) => (
          <Tab.Screen
            key={tabEach.name}
            name={tabEach.name}
            component={tabEach.component}
            options={{
              tabBarLabel: tabEach.tabBarLabel,
              tabBarLabelStyle: {
                fontSize: 11,
                color: "#333",
                marginTop: -10,
                marginBottom: -5,
                fontWeight: "bold",
              },
              tabBarIcon: () => (
                <Icon
                  name={tabEach.iconLabel}
                  color="#333"
                  size={24}
                />
              ),
            }}
          />
        ))}
      </Tab.Group>
    </Tab.Navigator>
  );
};

export default NavBarBottom;

const styles = StyleSheet.create({
  navBottomContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  NavBottomTab: {
    marginTop: 10,
    flex: 1,
    alignItems: "center",
    fontSize: 18,
  },
});

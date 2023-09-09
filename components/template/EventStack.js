import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";
import EventsTab from "./EventsTab";
import Event from "../events/Event";

const Stack = createNativeStackNavigator();

const EventStack = () => {
  const EventsScreens = [
    { name: "EventsTab", component: EventsTab },
    { name: "Event", component: Event },
  ];
  return (
    <Stack.Navigator
      initialRouteName="EventsTab"
      screenOptions={{
        headerShown: false,
      }}
    >
      {EventsScreens.map(({ name, component }) => (
        <Stack.Screen name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
};

export default EventStack;

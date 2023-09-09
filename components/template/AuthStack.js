import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from "../auth/Register";
import Login from "../auth/Login";
import ForgotPassword from "../auth/ForgotPassword";
import { useSelector } from "react-redux";
import ResetPassword from "../auth/ResetPassword";
import Questionare from "../auth/Questionare";
import Welcome from "../auth/Welcome";
import SplashPage from "../splash/SplashPage";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const userAuth = useSelector((state) => state.userAuth);

  const AuthScreens = [
    { name: "SplashPage", component: SplashPage },
    { name: "Register", component: Register },
    { name: "Login", component: Login },
    { name: "ForgotPassword", component: ForgotPassword },
    { name: "ResetPassword", component: ResetPassword },
    { name: "Questionare", component: Questionare },
    { name: "Welcome", component: Welcome },
  ];
  return (
    <Stack.Navigator
      initialRouteName="SplashPage"
      screenOptions={{
        headerShown: false,
      }}
    >
      {AuthScreens.map(({ name, component }) => (
        <Stack.Screen name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
};

export default AuthStack;

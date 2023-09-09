import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, Platform, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import store from './store';
import AuthData from './hooks/AuthData';
// import LanguagePrefData from "./hooks/LanguagePrefData";
import AppNavigator from './components/template/AppNavigation';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import {navigationRef} from "./utils/RootNavigationRef";
import {deactivateKeepAwake} from "expo-keep-awake";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  Constants.manifest.originalFullName = '@mohanjiapp/mohanji-app';

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const theme = {
    ...DefaultTheme,
  };

  // useEffect(() => {
  //   registerForPushNotificationsAsync();
  // }, []);

  /*useEffect(() => {
    registerForPushNotificationsAsync().then(async token => {
      await AsyncStorage.setItem('deviceToken', token);
    });

    notificationListener.current =
        Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });

    responseListener.current =
        Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });

    return () => {
      Notifications.removeNotificationSubscription(
          notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);*/

  // Push Notifications Setup
  const registerForPushNotificationsAsync = async () => {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('NOTIFICATION', {
        name: 'NOTIFICATION',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        enableLights: true,
        enableVibrate: true,
      });
    }

    if (Device.isDevice) {
      const {status: existingStatus} =
          await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const {status} = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      console.log(finalStatus);

      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      console.log('Must use physical device for Push Notifications');
    }

    return token;
  };

  // Natigation bar default theme colors
  const NavigationTheme = {
    colors: {
      background: '#fff',
      text: '#000',
    },
  };

  return (
      <Provider store={store}>
        <AuthData />
        <PaperProvider theme={theme}>
          <StatusBar style={'dark'} />
          <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
            <AppNavigator />
          </NavigationContainer>
        </PaperProvider>
      </Provider>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  containerSplash: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBottomContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  NavBottomTab: {
    marginTop: 10,
    flex: 1,
    alignItems: 'center',
    fontSize: 18,
  },
  buttonHolder: {
    width: '100%',
    marginTop: 15,
    fontSize: 44,
  },
  button: {
    width: '100%',
    paddingTop: 7,
    paddingBottom: 7,
    marginTop: 15,
    color: '#4B3269',
    textDecorationLine: 'underline',
    borderRadius: 50,
    borderColor: '#7851A9',
    borderWidth: 2,
    backgroundColor: '#fff',
  },
});

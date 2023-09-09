import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userActions} from '../store/user-slice';
import axios from 'axios';
import {dispatchRoute} from "../utils/RootNavigationRef";

const AuthData = () => {
  const dispatch = useDispatch();
  const [devicePushToken, setDevicePushToken] = useState(null);

  useEffect(() => {
    getDevicePushToken();
  }, []);

    const logout = async () => {
        await AsyncStorage.removeItem("authToken");
        dispatch(
            userActions.userAuthenticated({
                fullName: "",
                email: "",
                authToken: "",
                photoUrl: "",
                country: "",
                province: "",
                city: "",
                gender: "",
                loggedIn: false,
            })
        );
        setTimeout(() => {
            dispatchRoute("AuthStack");
        }, 50);
    };


    const getDevicePushToken = async () => {
    let deviceToken = await AsyncStorage.getItem('deviceToken');
    setDevicePushToken(deviceToken);
  };

  const loadAuthToken = async () => {
    try {
      let authToken = await AsyncStorage.getItem('authToken');
      if (authToken !== null) {
        const userData = {
            authToken: authToken,
          deviceToken: devicePushToken,
        };
        axios
          .post(
            'https://ethicallybased.com/mohanji-app-api/refresh.php',
            userData,
          )
          .then(response => {
            if (response?.data?.status == 200) {
              dispatch(
                userActions.userAuthenticated({
                  fullName: response.data.fullName,
                  email: response.data.email,
                  authToken: response.data.authToken,
                  accountType: response.data.accountType,
                  photoUrl: response.data.photoUrl,
                  country: response.data.country,
                  city: response.data.city,
                  gender: response.data.gender,
                  province: response.data.province,
                  loggedIn: true,
                }),
              );
            } else {
                // 202 Status for Invalid Token and User will Logout
                logout();
            }
          });
      }
    } catch (err) {
      //
    }
  };

  useEffect(() => {
    loadAuthToken();
  }, [devicePushToken]);

  return null;
};

export default AuthData;

import { View, Text } from "react-native";
import React from "react";
import { Cache } from "react-native-cache";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const setAsyncStorageData = async (key, value) => {		
    try {
      await AsyncStorage.setItem(key, value);
      return {
          success: true
      }
    } catch (error) {
      return {
          success: false,
          error
      }
    }
  }
  // get item
  export const getAsyncStorageData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      return {
          success: true,
          value
      }
    } catch(error) {
      return {
          success: false,
          error
      }
    }
  }

  export default {
      getAsyncStorageData,
      setAsyncStorageData
  }
import { View, Text } from "react-native";
import React from "react";
import { Cache } from "react-native-cache";
import AsyncStorage from "@react-native-async-storage/async-storage";

const cache = new Cache({
  namespace: "myapp",
  policy: {
    maxEntries: 50000, // if unspecified, it can have unlimited entries
    stdTTL: 0, // the standard ttl as number in seconds, default: 0 (unlimited)
  },
  backend: AsyncStorage,
});

export const setCacheData = async (key, value) => {
  try {
    await cache.set(key, value);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};
// get item
export const getCacheData = async (key) => {
  try {
    const value = await cache.get(key);
    return {
      success: true,
      value,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export default {
  getCacheData,
  setCacheData,
};

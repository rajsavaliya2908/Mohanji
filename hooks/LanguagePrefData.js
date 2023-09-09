import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userActions } from "../store/user-slice";

const LanguagePrefData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const saveLanguagePref = async () => {
      try {
        await AsyncStorage.setItem("language", "en");
      } catch (err) {
        //
      }
    };
    saveLanguagePref();

    const languagePref = async () => {
      try {
        const language = await AsyncStorage.getItem("language");

        dispatch(
          userActions.languagePref({
            language: language,
          })
        );
      } catch (err) {
        //
      }
    };

    const language = languagePref();
  }, []);
};

export default LanguagePrefData;

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userAuth",
  initialState: {
    fullName: "",
    email: "",
    photoUrl: "",
    accountType: "",
    country: "",
    province: "",
    city: "",
    gender: "",
    loggedIn: false,
    language: "en",
  },
  reducers: {
    languagePref(state, action) {
      const userData = action.payload;
      state.language = userData.language;
    },
    userAuthenticated(state, action) {
      const userData = action.payload;
      state.fullName = userData.fullName;
      state.email = userData.email;
      state.accountType = userData?.accountType;
      state.photoUrl = userData?.photoUrl;
      state.country = userData?.country;
      state.province = userData?.province;
      state.city = userData?.city;
      state.gender = userData?.gender;
      state.authToken = userData.authToken;
      state.loggedIn = userData.loggedIn;
    },
    userLogout(state) {
      state.fullName = "";
      state.email = "";
      state.accountType = "";
      state.photoUrl = "";
      state.authToken = "";
      state.loggedIn = false;
      state.country = "";
      state.province = "";
      state.city = "";
      state.gender = "";
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;

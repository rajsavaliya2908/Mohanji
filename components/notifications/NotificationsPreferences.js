import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Switch } from "react-native-paper";
import { useSelector } from "react-redux";
import axios from "axios";
import SwitchRow from "./SwitchRow";

const privacy_preferences = [
  { id: 1, title: "Daily Quotes", isSelected: false },
  { id: 2, title: "Upcoming Events", isSelected: false },
  { id: 3, title: "Meditation Reminders", isSelected: false },
  { id: 4, title: "Check-In: Question About Your Day", isSelected: false },
];

const NotificationsPreferences = () => {
  const userAuth = useSelector((state) => state.userAuth);
  const [authToken] = useState(userAuth?.authToken);
  const [meditationReminders, setMeditationReminders] = useState(0);
  const [questionCheckIn, setQuestionCheckIn] = useState(0);
  const [milestones, setMilestones] = useState(0);
  const [dailyQuotes, setDailyQuotes] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState(0);
  const [miscellaneous, setMiscellaneous] = useState(0);
  const [newVideos, setNewVideos] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://ethicallybased.com/mohanji-app-api/notifications-retreive.php?authToken=${authToken}`
      )
      .then((result) => {
        let response = result?.data;
        setDailyQuotes(response?.dailyQuotes);
        setMeditationReminders(response?.meditationReminders);
        setMilestones(response?.milestones);
        setQuestionCheckIn(response?.questionCheckIn);
        setUpcomingEvents(response?.upcomingEvents);
        setMiscellaneous(response?.miscellaneous);
        setNewVideos(response?.newVideos);
      })
      .catch((error) => console.log(error));
  }, [authToken]);
  const [privacyList, setPrivacyList] = useState(privacy_preferences);

  useEffect(() => {
    if (count > 7) {
      postNotificationPreferences();
    }
    setCount(count + 1);
  }, [
    meditationReminders,
    questionCheckIn,
    milestones,
    dailyQuotes,
    upcomingEvents,
    miscellaneous,
    newVideos,
  ]);

  const postNotificationPreferences = () => {
    let preferences = {
      authToken: authToken,
      meditationReminders,
      questionCheckIn,
      milestones,
      dailyQuotes,
      upcomingEvents,
      miscellaneous,
      newVideos,
    };
    axios
      .post(
        "https://ethicallybased.com/mohanji-app-api/notifications-update.php",
        preferences
      )
      .then((result) => {})
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.contaier}>
      <View style={styles.headerContianer}>
        <Image
          source={require("../../assets/images/privacy.png")}
          style={styles.icon}
        />
        <Text style={styles.headerTxt}>{"Notifications"}</Text>
      </View>
      <ScrollView>
        <Text style={styles.titleTxt}>{"Notification Preferences"}</Text>
        <View style={styles.divider} />
        <SwitchRow
          title={"Daily Quotes"}
          value={dailyQuotes}
          setValue={setDailyQuotes}
        />
        <SwitchRow
          title={"Upcoming Events"}
          value={upcomingEvents}
          setValue={setUpcomingEvents}
        />
        <SwitchRow
          title={"Meditation Reminders"}
          value={meditationReminders}
          setValue={setMeditationReminders}
        />
        <SwitchRow
          title={"Check-In: Question About Your Day"}
          value={questionCheckIn}
          setValue={setQuestionCheckIn}
        />
        <SwitchRow
          title={"Milestones"}
          value={milestones}
          setValue={setMilestones}
        />
        <SwitchRow
          title={"New Videos"}
          value={newVideos}
          setValue={setNewVideos}
        />
        <SwitchRow
          title={"Miscellaneous Updates"}
          value={miscellaneous}
          setValue={setMiscellaneous}
        />
        {/* <Text style={styles.titleTxt}>{"Privacy Preferences"}</Text>
        <View style={styles.divider} />
        {privacyList?.map((item, index) => (
          <View key={index}>
            <View style={styles.rowStyle}>
              <Text style={styles.rowTitile}>{item.title}</Text>
              <Switch
                value={item?.isSelected}
                onValueChange={() => {
                  let obj = privacyList[index];
                  let arr = [...privacyList];
                  obj = { ...obj, isSelected: !obj.isSelected };
                  arr[index] = obj;
                  setPrivacyList(arr);
                }}
              />
            </View>
            <View style={styles.divider} />
          </View>
        ))} */}
        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
};

export default NotificationsPreferences;

const styles = StyleSheet.create({
  contaier: {
    flex: 1,
  },
  headerContianer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 22,
  },
  headerTxt: {
    color: "#515151",
    fontSize: 20,
    fontWeight: "500",
    marginHorizontal: 12,
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
    tintColor: "#515151",
  },
  titleTxt: {
    color: "#7E7E7E",
    fontWeight: "500",
    marginHorizontal: 22,
    marginVertical: 12,
  },
  divider: {
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#E6E6E6",
    marginVertical: 6,
  },
  rowStyle: {
    flexDirection: "row",
    marginVertical: 12,
    marginHorizontal: 22,
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowTitile: { fontSize: 18, color: "#515151" },
  spacer: { height: 110 },
});

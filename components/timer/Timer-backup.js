import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  Pressable,
  Dimensions,
  AppState,
} from "react-native";
import { useSelector } from "react-redux";
import {
  Modal,
  Portal,
  Text,
  Button,
  TextInput,
  Provider,
} from "react-native-paper";
import WheelPickerExpo from "react-native-wheel-picker-expo";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HorizontalPicker from "@vseslav/react-native-horizontal-picker";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import uuid from "react-native-uuid";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./TimerStyles.js";
import axios from "axios";
import Toast from "react-native-easy-toast";
import RenderHtml from "react-native-render-html";
import { useIsFocused } from "@react-navigation/native";
import BackgroundTask from "../template/WebView.js";

// Hours, minutes, seconds list
const hoursList =
  "00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24".split(
    ","
  );
const minutesList =
  "00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59".split(
    ","
  );
const secondsList =
  "00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59".split(
    ","
  );

const { width } = Dimensions.get("window");
const source = {
  html: `
  <h1>This HTML snippet is now rendered with native components !</h1>
  <h2>Enjoy a webview-free and blazing fast application</h2>
  <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
  <em style="textAlign: center;">Look at how happy this native cat is</em>
`,
};

const Timer = ({ navigation }, props) => {
  // User Object
  const isFocused = useIsFocused();
  const userAuth = useSelector((state) => state.userAuth);
  const [authToken, setAuthToken] = useState(userAuth?.authToken);
  // Ref object (this makes it so state is no re-rendered each time the timer is updated)
  const durationHoursRef = useRef(0);
  const durationMinutesRef = useRef(10);
  const durationSecondsRef = useRef(0);
  const intervalBellSoundRef = useRef("Tibetan Bowl (Low)");
  const timerRemainingTotalSecondsRef = useRef(600);
  const timerRemainingDisplayRef = useRef("10:00");
  const presetNameRef = useRef("");
  const toastRef = useRef();
  const bellSoundRef = useRef(null);
  // Duration state
  const [durationHours, setDurationHours] = useState(0);
  const [durationMinutes, setDurationMinutes] = useState(10);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [timerRemainingTotalSeconds, setTimerRemainingTotalSeconds] =
    useState(600);
  const [timerRemainingDisplay, setTimerRemainingDisplay] = useState("10:00");
  const [timerSecondsLogged, setTimerSecondsLogged] = useState(0);

  // State main
  const [visibleDuration, setVisibleDuration] = useState(false);
  const [startBellSound, setstartBellSound] = useState("Tibetan Bowl (Low)");
  const [endBellSound, setendBellSound] = useState("Tibetan Bowl (Low)");
  const [visiblePreset, setVisiblePreset] = useState(false);
  const [preset, setPreset] = useState("Timer");
  const [visibleStartBellSound, setvisibleStartBellSound] = useState(false);
  const [visibleendBellSound, setVisibleendBellSound] = useState(false);
  const [visibleAddInterval, setVisibleAddInterval] = useState(false);
  const [visibleTimer, setVisibleTimer] = useState(false);

  // State/Ref intervals
  const [visibleAllIntervalsMainModal, setVisibleNewIntervalsMainModal] =
    useState(false);
  const [visibleEditIntervalSingle, setVisibleEditIntervalSingle] =
    useState(false);
  const [visibleSavePreset, setVisibleSavePreset] = useState(false);
  const [visibleEditPreset, setVisibleEditPreset] = useState(false);
  const [allIntervalBellsObj, setAllIntervalBellsObj] = useState([]);
  const [allPresetsObj, setAllPresetsObj] = useState([]);
  const [presetId, setPresetId] = useState();
  const [intervalBellSound, setIntervalBellSound] =
    useState("Tibetan Bowl (Low)");
  const [intervalStartEndFrom, setIntervalStartEndFrom] = useState("fromStart");
  const intervalDurationHoursRef = useRef(0);
  const intervalDurationMinutesRef = useRef(1);
  const intervalDurationSecondsRef = useRef(0);
  const [intervalDurationHours, setIntervalDurationHours] = useState(0);
  const [intervalDurationMinutes, setIntervalDurationMinutes] = useState(1);
  const [intervalDurationSeconds, setIntervalDurationSeconds] = useState(0);
  const [allIntervalsCount, setAllIntervalsCount] = useState(0);
  const [presetsList, setPresetsList] = useState([]);
  const [presetBgColor, setPresetBgColor] = useState("#FFFFFF");
  const [presetIndex, setPresetIndex] = useState(null);
  const [presetDateDisplay, setPresetDateDisplay] = useState();
  const [editIntervalId, setEditIntervalId] = useState("");
  const [PresetTimerId, setPresetTimerId] = useState(null);
  const [activePreset, setActivePreset] = useState(false);
  const [newChanges, setNewChanges] = useState(false);
  const [resetClick, setResetClick] = useState(false);

  const currentDateRef = useRef(new Date().getTime());

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
      }
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // useEffect(() => {
  //   if (appStateVisible === "active" && visibleTimer && timerIsPlaying) {
  //     let recentTime = null;
  //     var seconds = Math.ceil(
  //       (new Date().getTime() - currentDateRef.current) / 1000
  //     );
  //     recentTime = timerCountDesc - seconds;
  //     setTimerCountDesc(recentTime);
  //   } else if (
  //     appStateVisible === "background" &&
  //     visibleTimer &&
  //     timerIsPlaying
  //   ) {
  //     currentDateRef.current = new Date().getTime();
  //     setTimerCountDesc(timerCountDesc);
  //   }
  // }, [appStateVisible]);

  useEffect(() => {
    !isFocused && timerIsPlaying && setTimerIsPlaying(false);
    !isFocused &&
      bellSoundRef.current !== null &&
      bellSoundRef.current.unloadAsync();
    // !isFocused && bellSoundRef !== null && discardSessionFunc();
  }, [isFocused]);

  // MODAL CONTAINER STYLE
  const modalContainerStyle = {
    margin: 20,
    paddingBottom: 30,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#fff",
  };

  useEffect(() => {
    if (activePreset) {
      setNewChanges(true);
    }
  }, [startBellSound, endBellSound]);

  useEffect(() => {
    durationHoursRef.current = 0;
    durationMinutesRef.current = 10;
    durationSecondsRef.current = 0;
    intervalDurationHoursRef.current = 0;
    intervalDurationMinutesRef.current = 0;
    intervalDurationSecondsRef.current = 0;
    setIntervalDurationHours(0);
    setIntervalDurationMinutes(1);
    setIntervalDurationSeconds(0);
    setDurationHours(0);
    setDurationMinutes(10);
    setDurationSeconds(0);
    setTimerRemainingTotalSeconds(600);
    setTimerRemainingDisplay("10:00");
    setTimerCountDesc(600);
    setTimerCountDescFixed(600);
    setPresetTimerId(null);
    setActivePreset(false);
    setPresetIndex(null);
    setAllIntervalsCount(0);
    setAllIntervalBellsObj([]);
    setPreset("Timer");
    setPresetId("");
    setIntervalStartEndFrom("fromStart");
    setEditIntervalId("");
    setVisibleEditPreset(false);
    setVisibleSavePreset(false);
    setVisibleEditIntervalSingle(false);
    setIntervalBellSound("Tibetan Bowl (Low)");
    setstartBellSound("Tibetan Bowl (Low)");
    setendBellSound("Tibetan Bowl (Low)");
    presetNameRef.current = "";
    intervalBellSoundRef.current = "Tibetan Bowl (Low)";
  }, [resetClick]);

  const resetBell = () => {
    bellSoundRef.current !== null && bellSoundRef.current.unloadAsync();
  };

  useEffect(() => {}, []);

  // TIMER

  // Save seconds logged
  const trackTimerLog = () => {
    console.log("timerSecondsLogged", timerSecondsLogged);
    console.log("presetId", presetId);

    const data = {
      authToken,
      timerLogObj: [
        {
          presetId: presetId,
          timerSecondsLogged: timerSecondsLogged,
        },
      ],
    };
    axios
      .post(
        "https://ethicallybased.com/mohanji-app-api/track-timer-log.php",
        data
      )
      .then((result) => {
        console.log("result", result);
        if (result?.data?.success === 1) {
        }
      })
      .catch((error) => console.log(error));

    // Reset seconds logged = 0
    setTimerSecondsLogged(0);
  };

  // Timer countdown
  const timerCountDescDisplayFunc = (seconds, showFinished) => {
    var date_display = "";
    if (seconds < 3600) {
      date_display = new Date(seconds * 1000).toISOString().substring(14, 19);
    } else if (seconds >= 3600) {
      date_display = new Date(seconds * 1000).toISOString().substring(11, 19);
    }
    if (seconds <= 0 && showFinished == 1) {
      date_display = "Finished";
    }
    return date_display;
  };

  // State timer
  const [timerCountDesc, setTimerCountDesc] = useState(
    timerRemainingTotalSeconds
  );
  const [timerCountDescFixed, setTimerCountDescFixed] = useState(
    timerRemainingTotalSeconds
  );
  const [timerCountDescDisplay, setTimerCountDescDisplay] = useState(
    timerCountDescDisplayFunc(timerCountDesc, 1)
  );
  const [timerIsPlaying, setTimerIsPlaying] = useState(false);
  const intervalRef = useRef(null);
  const [timerFinished, setTimerFinished] = useState(true);

  // Timer play/pause
  const playPauseTimer = () => {
    setTimerIsPlaying(!timerIsPlaying);
    timerIsPlaying &&
      bellSoundRef.current !== null &&
      bellSoundRef.current.unloadAsync();
  };

  // Start timer
  const startTimerHandler = () => {
    setTimerFinished(false);

    // Play timer
    if (timerIsPlaying == false) {
      setTimerIsPlaying(true);
      setVisibleTimer(true);

      // TimerCountDescdownHandler();
      if (startBellSound !== "None") {
        playSound(startBellSound);
      }

      // Stop timer
    } else {
      setTimerIsPlaying(false);
    }
  };

  const convertTimeToSeconds = (hours, minutes, seconds) => {
    return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
  };

  // Discard session function
  const discardSessionFunc = () => {
    setVisibleTimer(false);
    setTimerIsPlaying(false);
    setTimerFinished(true);
    // stopSound(bellTextToIndex(startBellSound)); // *** NOT BEING USED (DOESN'T WORK IN SIMULATOR. TEST IT IN LIVE APP).
    const totalSeconds = convertTimeToSeconds(
      durationHoursRef.current,
      durationMinutesRef.current,
      durationSecondsRef.current
    );
    bellSoundRef.current !== null && bellSoundRef.current.unloadAsync();
    setTimerCountDesc(totalSeconds);
    setTimerCountDescFixed(totalSeconds);

    // Reset seconds logged = 0
    setTimerSecondsLogged(0);
  };

  // Finish session func
  const finshSessionFunc = () => {
    setVisibleTimer(false);
    setTimerIsPlaying(false);
    setTimerFinished(true);
    bellSoundRef.current !== null && bellSoundRef.current.unloadAsync();

    // stopSound(bellTextToIndex(startBellSound)); // *** NOT BEING USED (DOESN'T WORK IN SIMULATOR. TEST IT IN LIVE APP).

    // Reset timer countdown to defaults
    const totalSeconds = convertTimeToSeconds(
      durationHoursRef.current,
      durationMinutesRef.current,
      durationSecondsRef.current
    );
    setTimerCountDesc(totalSeconds);
    setTimerCountDescFixed(totalSeconds);

    // Save seconds logged
    trackTimerLog();
  };

  // Start timer countdown when timerIsPlaying == true (when user clicks the start timer button)
  useEffect(() => {
    if (Platform.OS === "android" && appStateVisible === "active") {
      var date_display = "";
      var timerCountAsc = 0;
      if (timerIsPlaying == true && !timerFinished) {
        intervalRef.current = setInterval(() => {
          setTimerCountDesc((prevState) => prevState - 1);

          if (timerCountDesc <= 1 && endBellSound !== "None") {
            playSound(endBellSound);
            clearInterval(intervalRef.current);
            setTimerIsPlaying(false);
            setTimerFinished(true); // addtional setState 27/02/2023
            return;
          }
          timerCountAsc = timerCountDescFixed - timerCountDesc + 1; // Add +1 to make it accurate
          allIntervalBellsObj?.map((interval) => {
            if (
              timerCountDesc === interval.intervalTotalSeconds &&
              interval.intervalStartEndFrom === "fromEnd"
            ) {
              playSound(interval.intervalBellSound);
            } else if (
              timerCountAsc == interval.intervalTotalSeconds &&
              interval.intervalStartEndFrom === "fromStart"
            ) {
              playSound(interval.intervalBellSound);
            }
          });

          // Save total seconds logged
          setTimerSecondsLogged((secondsLogged) => secondsLogged + 1);
        }, 1000);

        return () => clearInterval(intervalRef.current);
      }
    }
  }, [timerIsPlaying, timerCountDesc]);

  useEffect(() => {
    if (Platform.OS === "android" && appStateVisible === "background") {
      var timerCountAsc = 0;

      if (timerIsPlaying == true && !timerFinished) {
        if (timerCountDesc < 1) {
          setTimerIsPlaying(false);
          setTimerFinished(true);
          endBellSound !== "None" && playSound(endBellSound);
          return;
        }
        timerCountAsc = timerCountDescFixed - timerCountDesc + 1; // Add +1 to make it accurate
        allIntervalBellsObj?.map((interval) => {
          if (
            timerCountDesc === interval.intervalTotalSeconds &&
            interval.intervalStartEndFrom === "fromEnd"
          ) {
            playSound(interval.intervalBellSound);
          } else if (
            timerCountAsc == interval.intervalTotalSeconds &&
            interval.intervalStartEndFrom === "fromStart"
          ) {
            playSound(interval.intervalBellSound);
          }
        });
      }
    }
  }, [timerIsPlaying, timerCountDesc]);

  const comapreVDurationValues = () => {
    if (
      activePreset &&
      (durationHours != parseInt(durationHoursRef.current) ||
        durationMinutes != parseInt(durationMinutesRef.current) ||
        durationSeconds != parseInt(durationSecondsRef.current))
    ) {
      setNewChanges(true);
    }
  };

  useEffect(() => {
    if (Platform.OS === "ios") {
      var date_display = "";
      var timerCountAsc = 0;
      if (timerIsPlaying == true && !timerFinished) {
        intervalRef.current = setInterval(() => {
          setTimerCountDesc((prevState) => prevState - 1);

          if (timerCountDesc <= 1 && endBellSound !== "None") {
            playSound(endBellSound);
            clearInterval(intervalRef.current);
            setTimerIsPlaying(false);
            setTimerFinished(true); // addtional setState 27/02/2023
            return;
          }
          timerCountAsc = timerCountDescFixed - timerCountDesc + 1; // Add +1 to make it accurate
          allIntervalBellsObj?.map((interval) => {
            if (
              timerCountDesc === interval.intervalTotalSeconds &&
              interval.intervalStartEndFrom === "fromEnd"
            ) {
              playSound(interval.intervalBellSound);
            } else if (
              timerCountAsc == interval.intervalTotalSeconds &&
              interval.intervalStartEndFrom === "fromStart"
            ) {
              playSound(interval.intervalBellSound);
            }
          });

          // Save total seconds logged
          setTimerSecondsLogged((secondsLogged) => secondsLogged + 1);
        }, 1000);

        return () => clearInterval(intervalRef.current);
      }
    }
  }, [timerIsPlaying, timerCountDesc]);

  // DURATION

  // This is used when the duration timer is closed. It gets the times from a ref, and updates the state (it was causing issues with the timer picker when state was rendered on every change).
  const updateDurationRef = () => {
    setDurationHours(parseInt(durationHoursRef.current));
    setDurationMinutes(parseInt(durationMinutesRef.current));
    setDurationSeconds(parseInt(durationSecondsRef.current));

    const totalSeconds = convertTimeToSeconds(
      durationHoursRef.current,
      durationMinutesRef.current,
      durationSecondsRef.current
    );

    setTimerRemainingTotalSeconds(totalSeconds);

    if (totalSeconds < 3600 && totalSeconds > 0) {
      date_display = new Date(totalSeconds * 1000)
        .toISOString()
        .substring(14, 19);
    } else if (totalSeconds >= 3600) {
      var date_display = (date_display = new Date(totalSeconds * 1000)
        .toISOString()
        .substring(11, 19));
    }
    setTimerRemainingDisplay(date_display);
    setTimerCountDesc(totalSeconds);
    setTimerCountDescFixed(totalSeconds);
  };

  const durationModalOnDismiss = () => {
    setVisibleDuration(false);
    comapreVDurationValues();
    updateDurationRef();
  };

  const DurationModal = () => {
    return (
      <Portal>
        <Modal
          visible={visibleDuration}
          onDismiss={durationModalOnDismiss}
          contentContainerStyle={modalContainerStyle}
        >
          <Text style={styles.modalTitle}>Duration</Text>
          <View style={styles.modalInner}>
            <View style={styles.wheelEach}>
              <WheelPickerExpo
                height={180}
                width={30}
                initialSelectedIndex={durationHours}
                items={hoursList.map((name) => ({ label: name, value: "" }))}
                onChange={({ item }) => (durationHoursRef.current = item.label)}
              />
              <Text style={{ color: "#000000" }}>Hours</Text>
            </View>
            <View style={styles.wheelEach}>
              <WheelPickerExpo
                height={180}
                width={30}
                initialSelectedIndex={durationMinutes}
                items={minutesList.map((name) => ({
                  label: name,
                  value: "",
                }))}
                style={styles.wheelEach}
                onChange={({ item }) =>
                  (durationMinutesRef.current = item.label)
                }
              />
              <Text style={{ color: "#000000" }}>Minutes</Text>
            </View>
            <View style={styles.wheelEach}>
              <WheelPickerExpo
                height={180}
                width={30}
                initialSelectedIndex={durationSeconds}
                items={secondsList.map((name) => ({
                  label: name,
                  value: "",
                }))}
                style={styles.wheelEach}
                onChange={({ item }) =>
                  (durationSecondsRef.current = item.label)
                }
              />
              <Text style={{ color: "#000000" }}>Seconds</Text>
            </View>
          </View>
        </Modal>
      </Portal>
    );
  };

  useEffect(() => {
    setAudioDefaults();
  }, []);

  const setAudioDefaults = async () => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      shouldDuckAndroid: false,
      playThroughEarpieceAndroid: false,
    });
  };

  // AUDIO (for bell)

  // Play bell audio ()
  async function playSound(bellText) {
    // console.log(bellText);
    if (bellText == "Tibetan Bowl (Low)") {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/audio/tibetan-bowl-low.mp3")
      );
      bellSoundRef.current = sound;
      bellSoundRef.current.playAsync();
    } else if (bellText == "Tibetan Bowl (Medium)") {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/audio/tibetan-bowl-medium.mp3")
      );
      bellSoundRef.current = sound;
      bellSoundRef.current.playAsync();
    } else if (bellText == "Tibetan Bowl (High)") {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/audio/tibetan-bowl-high.mp3")
      );
      bellSoundRef.current = sound;
      bellSoundRef.current.playAsync();
    } else if (bellText == "Gong") {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/audio/gong.mp3")
      );
      bellSoundRef.current = sound;
      bellSoundRef.current.playAsync();
    } else if (bellText == "Conch") {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/audio/conch.mp3")
      );
      bellSoundRef.current = sound;
      bellSoundRef.current.playAsync();
    }
  }

  const retreivePresetData = (data) => {
    let intervalBellsDecode = JSON.parse(data?.intervalBells);
    setPreset(data?.presetName ?? "Preset dummy");
    durationHoursRef.current = data?.durationHours;
    durationMinutesRef.current = data?.durationMinutes;
    durationSecondsRef.current = data?.durationSeconds;
    setDurationHours(data?.durationHours == 0 ? 0 : data?.durationHours);
    setDurationMinutes(
      data?.durationMinutes == 10 ? 10 : data?.durationMinutes
    );
    setDurationSeconds(data?.durationSeconds == 0 ? 0 : data?.durationSeconds);
    setAllIntervalBellsObj(intervalBellsDecode);
    let totalSeconds = convertTimeToSeconds(
      data?.durationHours,
      data?.durationMinutes,
      data?.durationSeconds
    );
    setTimerCountDesc(totalSeconds);
    setTimerCountDescFixed(totalSeconds); // addtional setState 27/02/2023
    intervalBellsDecode?.length > 0 &&
      setAllIntervalsCount(intervalBellsDecode?.length);
  };

  const deletePreset = (user_meditation_timers_id) => {
    console.log(user_meditation_timers_id);
    const data = {
      user_meditation_timers_id,
      authToken,
    };
    axios
      .post(
        "https://ethicallybased.com/mohanji-app-api/presets-delete.php",
        data
      )
      .then((result) => {
        if (result?.data?.success === 1) {
          console.log(result?.data);
          retreivePresets("re-render");
          setTimeout(() => {
            setResetClick(!resetClick);
          }, 50);
        }
      })
      .catch((error) => console.log(error));
  };

  // PRESET
  const PresetModal = () => {
    return (
      <Portal>
        <Modal
          visible={visiblePreset}
          onDismiss={() => setVisiblePreset(false)}
          contentContainerStyle={modalContainerStyle}
        >
          <Text style={styles.modalTitle}>{"Choose A Preset"}</Text>
          <View style={styles.modalInnerCenter3}>
            {/* {allPresetsObj.map((preset) => (
              <Text></Text>
            ))} */}
            {presetsList?.length === 0 && (
              <Text style={{ color: "gray", fontWeight: "500" }}>
                {"No saved presets"}
              </Text>
            )}
            {presetsList?.length > 0 &&
              presetsList?.map((preset, index) => (
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: presetIndex === index ? "#D1D3D4" : null,
                    alignItems: "center",
                  }}
                  key={preset?.user_meditation_timers_id}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setPresetIndex(index),
                        retreivePresetData(preset),
                        setActivePreset(true),
                        (presetNameRef.current = preset?.presetName),
                        setPresetTimerId(preset?.user_meditation_timers_id);
                      setPresetId(preset?.user_meditation_timers_id);
                      setVisiblePreset(false);
                    }}
                    style={{
                      width: "80%",
                      paddingVertical: 8,
                    }}
                  >
                    <Text
                      style={{
                        alignSelf: "center",
                        paddingLeft: 11,
                        fontSize: 20,
                        fontWeight: presetIndex === index ? "600" : "400",
                        color: "#3F414E",
                      }}
                    >
                      {preset?.presetName ?? "Preset dummy"}
                    </Text>
                  </TouchableOpacity>
                  <Icon
                    name="delete"
                    size={24}
                    color="#000"
                    onPress={() =>
                      deletePreset(preset?.user_meditation_timers_id)
                    }
                    style={{ paddingRight: 6 }}
                  />
                </View>
              ))}
          </View>
        </Modal>
      </Portal>
    );
  };

  // Bells for starting / ending / interval bell

  const BellsInfo = [
    {
      title: "None",
      imageName: require("../../assets/images/bells/no-sound.png"),
    },
    {
      title: "Tibetan Bowl (Low)",
      imageName: require("../../assets/images/bells/tibetan-bowl-low-sq.png"),
    },
    {
      title: "Tibetan Bowl (Medium)",
      imageName: require("../../assets/images/bells/tibetan-bowl-medium-sq.png"),
    },
    {
      title: "Tibetan Bowl (High)",
      imageName: require("../../assets/images/bells/tibetan-bowl-high-sq.png"),
    },
    {
      title: "Gong",
      imageName: require("../../assets/images/bells/gong-sq.png"),
    },
    {
      title: "Conch",
      imageName: require("../../assets/images/bells/conch-sq.png"),
    },
  ];

  const bellIndexToText = (index) => {
    switch (index) {
      case 0:
        return "None";
        break;

      case 1:
        return "Tibetan Bowl (Low)";
        break;

      case 2:
        return "Tibetan Bowl (Medium)";
        break;

      case 3:
        return "Tibetan Bowl (High)";
        break;

      case 4:
        return "Gong";
        break;

      case 5:
        return "Conch";
        break;
    }
  };

  const bellTextToIndex = (text) => {
    console.log(text);
    switch (text) {
      case "None":
        return 0;
        break;

      case "Tibetan Bowl (Low)":
        return 1;
        break;

      case "Tibetan Bowl (Medium)":
        return 2;
        break;

      case "Tibetan Bowl (High)":
        return 3;
        break;

      case "Gong":
        return 4;
        break;

      case "Conch":
        return 5;
        break;
    }
  };

  const bellPicker = (data) => (
    <View style={{ width: 130 }}>
      <Image
        style={{ width: 100, height: 100, marginLeft: 15, marginRight: 15 }}
        source={data?.imageName}
      />
      <Text
        style={{
          width: "100%",
          padding: 10,
          textAlign: "center",
          // float: "left",
          color: "#000000",
        }}
      >
        {data?.title}
      </Text>
    </View>
  );

  // Start Bell

  const StartBellSoundPickerComponent = () => {
    return (
      <HorizontalPicker
        data={BellsInfo}
        renderItem={bellPicker}
        defaultIndex={bellTextToIndex(startBellSound)}
        itemWidth={130}
        snapTimeout={1}
        animatedScrollToDefaultIndex={false}
        onChange={(index) => {
          console.log(index);
          resetBell();
          setstartBellSound(bellIndexToText(index));
          if (bellIndexToText(index) !== "None") {
            playSound(bellIndexToText(index));
          } else {
            resetBell();
          }
        }}
      />
    );
  };

  const StartBellSoundModal = () => {
    visibleStartBellSound && playSound(startBellSound);
    return (
      <Portal>
        <Modal
          visible={visibleStartBellSound}
          onDismiss={() => {
            setvisibleStartBellSound(false),
              bellSoundRef.current !== null &&
                bellSoundRef.current.unloadAsync();
          }}
          contentContainerStyle={modalContainerStyle}
        >
          <Text style={styles.modalTitle}>{"Start Bell"}</Text>
          <View style={styles.modalInnerCenter3}>
            <StartBellSoundPickerComponent />
          </View>
        </Modal>
      </Portal>
    );
  };

  // End Bell

  const EndBellSoundPickerComponent = () => {
    return (
      <HorizontalPicker
        data={BellsInfo}
        renderItem={bellPicker}
        defaultIndex={bellTextToIndex(endBellSound)}
        itemWidth={130}
        snapTimeout={1}
        animatedScrollToDefaultIndex={false}
        onChange={(index) => {
          resetBell();
          setendBellSound(bellIndexToText(index));
          if (bellIndexToText(index) !== "None") {
            playSound(bellIndexToText(index));
          } else {
            resetBell();
          }
        }}
      />
    );
  };

  const EndBellSoundModal = () => {
    visibleendBellSound && playSound(endBellSound);
    return (
      <Portal>
        <Modal
          visible={visibleendBellSound}
          onDismiss={() => {
            setVisibleendBellSound(false),
              bellSoundRef.current !== null &&
                bellSoundRef.current.unloadAsync();
          }}
          contentContainerStyle={modalContainerStyle}
        >
          <Text style={styles.modalTitle}>{"End Bell"}</Text>
          <View style={styles.modalInnerCenter3}>
            <EndBellSoundPickerComponent />
          </View>
        </Modal>
      </Portal>
    );
  };

  // Save as preset modal (choose name)
  const SaveAsPresetModal = () => {
    return (
      <Portal>
        <Modal
          visible={visibleSavePreset}
          onDismiss={() => setVisibleSavePreset(false)}
          contentContainerStyle={modalContainerStyle}
        >
          <View
            style={{
              width: "100%",
              paddingTop: 30,
              paddingLeft: 30,
              paddingRight: 30,
              paddingBottom: 20,
            }}
          >
            <Text>{"What do you want to name it?"}</Text>
            <TextInput
              style={styles.input}
              activeUnderlineColor="#E1AE00"
              onChangeText={(val) => (presetNameRef.current = val)}
              value={presetNameRef}
            />
            <Button
              mode="contained-tonal"
              onPress={() => {
                if (presetNameRef.current === "") {
                  // toastRef.current.show("Empty preset not saved");
                  alert("Empty preset not saved");
                } else {
                  setVisibleSavePreset(false);
                  savePreset();
                }
              }}
              textColor="#222"
              style={styles.button}
            >
              Save
            </Button>
          </View>
        </Modal>
      </Portal>
    );
  };

  // Edit as preset modal (update/change name)
  const EditAsPresetModal = () => {
    return (
      <Portal>
        <Modal
          visible={visibleEditPreset}
          onDismiss={() => setVisibleEditPreset(false)}
          contentContainerStyle={modalContainerStyle}
        >
          <View
            style={{
              width: "100%",
              paddingTop: 30,
              paddingLeft: 30,
              paddingRight: 30,
              paddingBottom: 20,
            }}
          >
            <TextInput
              label="Change preset name?"
              style={styles.input}
              activeUnderlineColor="#E1AE00"
              onChangeText={(val) => (presetNameRef.current = val)}
              value={presetNameRef}
              defaultValue={presetNameRef.current}
            />
            <Button
              mode="contained-tonal"
              onPress={() => {
                if (presetNameRef.current === "") {
                  // toastRef.current.show("Empty preset not saved");
                  alert("Empty preset not updated");
                } else {
                  setVisibleEditPreset(false);
                  updatePreset();
                }
              }}
              textColor="#222"
              style={styles.button}
            >
              Update
            </Button>
          </View>
        </Modal>
      </Portal>
    );
  };

  // INTERVALS

  const AddIntervalChooseBellComponent = () => {
    return (
      <HorizontalPicker
        style={{ marginTop: 15 }}
        data={BellsInfo}
        renderItem={bellPicker}
        defaultIndex={bellTextToIndex(intervalBellSound)}
        itemWidth={130}
        snapTimeout={1}
        animatedScrollToDefaultIndex={false}
        onChange={(index) => {
          resetBell();
          // setIntervalBellSound(bellIndexToText(index));
          intervalBellSoundRef.current = bellIndexToText(index);
          if (bellIndexToText(index) !== "None") {
            playSound(bellIndexToText(index));
          } else {
            resetBell();
          }
        }}
      />
    );
  };

  const intervalStartEndFromList = [
    {
      label: "From Start",
      value: "fromStart",
    },
    {
      label: "From End",
      value: "fromEnd",
    },
  ];

  const [showStartEndFromDropDown, setShowStartEndFromDropDown] =
    useState(false);
  const [startEndFromDropdown, setStartEndFromDropdown] = useState("fromStart");

  // From Start or From End
  const AddIntervalStartEndFromComponent = () => {
    return (
      <View style={{ marginTop: 20, marginBottom: 10 }}>
        <RNPickerSelect
          useNativeAndroidPickerStyle={false}
          onValueChange={(value) => {
            setStartEndFromDropdown(value), setIntervalStartEndFrom(value);
          }}
          value={startEndFromDropdown}
          items={intervalStartEndFromList}
        />
        {/* <DropDown
            mode={"outlined"}
            visible={showStartEndFromDropDown}
            showStartEndFromDropDown={() => setShowStartEndFromDropDown(true)}
            onDismiss={() => setShowStartEndFromDropDown(false)}
            value={startEndFromDropdown}
            setValue={setStartEndFromDropdown}
            list={intervalStartEndFromList}
          /> */}
      </View>
    );
  };

  // New interval - set duration
  const AddIntervalDurationComponent = () => {
    return (
      <View style={styles.modalInner}>
        <View style={styles.wheelEach}>
          <WheelPickerExpo
            height={180}
            width={30}
            initialSelectedIndex={intervalDurationHours}
            items={hoursList.map((name) => ({ label: name, value: "" }))}
            onChange={({ item }) =>
              (intervalDurationHoursRef.current = item.label)
            }
          />
          <Text style={{ color: "#000000" }}>Hours</Text>
        </View>
        <View style={styles.wheelEach}>
          <WheelPickerExpo
            height={180}
            width={30}
            initialSelectedIndex={intervalDurationMinutes}
            items={minutesList.map((name) => ({
              label: name,
              value: "",
            }))}
            style={styles.wheelEach}
            onChange={({ item }) =>
              (intervalDurationMinutesRef.current = item.label)
            }
          />
          <Text style={{ color: "#000000" }}>Minutes</Text>
        </View>
        <View style={styles.wheelEach}>
          <WheelPickerExpo
            height={180}
            width={30}
            initialSelectedIndex={intervalDurationSeconds}
            items={secondsList.map((name) => ({
              label: name,
              value: "",
            }))}
            style={styles.wheelEach}
            onChange={({ item }) =>
              (intervalDurationSecondsRef.current = item.label)
            }
          />
          <Text style={{ color: "#000000" }}>Seconds</Text>
        </View>
      </View>
    );
  };

  // Reset add interval to default
  const resetIntervals = () => {
    intervalDurationHoursRef.current = parseInt("0");
    intervalDurationMinutesRef.current = parseInt("1");
    intervalDurationSecondsRef.current = parseInt("0");
    setIntervalDurationHours(parseInt("0"));
    setIntervalDurationMinutes(parseInt("1"));
    setIntervalDurationSeconds(parseInt("0"));
    setIntervalBellSound("Tibetan Bowl (Medium)");
  };

  const newIntervalSave = () => {
    const newIntervalSave = {
      id: uuid.v4(),
      intervalBellSound: intervalBellSoundRef.current,
      intervalStartEndFrom: intervalStartEndFrom,
      intervalDurationHours: parseInt(intervalDurationHoursRef.current),
      intervalDurationMinutes: parseInt(intervalDurationMinutesRef.current),
      intervalDurationSeconds: parseInt(intervalDurationSecondsRef.current),
      intervalTotalSeconds: convertTimeToSeconds(
        intervalDurationHoursRef.current,
        intervalDurationMinutesRef.current,
        intervalDurationSecondsRef.current
      ),
    };
    setAllIntervalBellsObj([...allIntervalBellsObj, newIntervalSave]);
    setAllIntervalsCount(parseInt(allIntervalsCount) + 1);
    if (activePreset) {
      setNewChanges(true);
    }
    resetIntervals();
  };

  const existingIntervalEdit = () => {
    let singleObjIndex = allIntervalBellsObj.findIndex(
      (item) => item.id === editIntervalId
    );
    let allIntervalBellsData = [...allIntervalBellsObj];
    let singleObjEdit = {
      id: editIntervalId,
      intervalStartEndFrom: intervalStartEndFrom,
      intervalBellSound: intervalBellSoundRef.current,
      intervalDurationHours: parseInt(intervalDurationHoursRef.current),
      intervalDurationMinutes: parseInt(intervalDurationMinutesRef.current),
      intervalDurationSeconds: parseInt(intervalDurationSecondsRef.current),
      intervalTotalSeconds: convertTimeToSeconds(
        intervalDurationHoursRef.current,
        intervalDurationMinutesRef.current,
        intervalDurationSecondsRef.current
      ),
    };
    allIntervalBellsData[singleObjIndex] = singleObjEdit;
    setAllIntervalBellsObj(allIntervalBellsData);
    if (activePreset) {
      setNewChanges(true);
    }
    resetIntervals();
  };

  useEffect(() => {
    retreivePresets("render");
  }, []);

  const retreivePresets = (from) => {
    axios
      .get(
        `https://ethicallybased.com/mohanji-app-api/presets-retreive.php?authToken=${authToken}`
      )
      .then((result) => {
        if (result?.data?.length > 0) {
          setPresetsList(result?.data);
          if (from === "save") {
            activateNewPreset(result?.data);
          }
        } else {
          setPresetsList([]);
        }
      })
      .catch((error) => console.log(error));
  };

  // update preset
  const updatePreset = () => {
    const data = {
      authToken,
      allPresetsObj: [
        {
          id: PresetTimerId,
          presetName: presetNameRef.current,
          durationHours: parseInt(durationHoursRef.current),
          durationMinutes: parseInt(durationMinutesRef.current),
          durationSeconds: parseInt(durationSecondsRef.current),
          startingBell: startBellSound,
          endingBell: endBellSound,
          allIntervalBellsObj: JSON.stringify(allIntervalBellsObj),
        },
      ],
    };
    axios
      .post(
        "https://ethicallybased.com/mohanji-app-api/presets-insert.php",
        data
      )
      .then((result) => {
        if (result?.data?.success === 1) {
          retreivePresets("update");
          setPreset(presetNameRef.current);
          setNewChanges(false);
          // presetNameRef.current = "";
        }
      })
      .catch((error) => console.log(error));
  };

  // Save preset
  const savePreset = () => {
    const presetId = uuid.v4();
    setPresetId(presetId);

    // if (allIntervalBellsObj === undefined || allIntervalBellsObj.length == 0) {

    // }

    const data = {
      authToken,
      allPresetsObj: [
        {
          id: presetId,
          presetName: presetNameRef.current,
          durationHours: parseInt(durationHoursRef.current),
          durationMinutes: parseInt(durationMinutesRef.current),
          durationSeconds: parseInt(durationSecondsRef.current),
          startingBell: startBellSound,
          endingBell: endBellSound,
          allIntervalBellsObj: JSON.stringify(allIntervalBellsObj),
        },
      ],
    };

    axios
      .post(
        "https://ethicallybased.com/mohanji-app-api/presets-insert.php",
        data
      )
      .then((result) => {
        if (result?.data?.success === 1) {
          retreivePresets("save");
          presetNameRef.current = "";
        }
      })
      .catch((error) => console.log(error));
  };

  const activateNewPreset = (list) => {
    let index = list?.findIndex(
      (item) => item?.presetName === presetNameRef.current
    );
    let found = list?.filter(
      (item) => item?.presetName === presetNameRef.current
    );
    if (found) {
      setPresetIndex(index);
      retreivePresetData(found[0]);
      setActivePreset(true);
      presetNameRef.current = found[0]?.presetName;
      setPresetTimerId(found[0]?.user_meditation_timers_id);
      setVisiblePreset(false);
    }
  };

  // Click "Save" button to add an interval bell
  const saveAddInterval = () => {
    newIntervalSave();
  };

  const saveEditInterval = () => {
    existingIntervalEdit();
  };

  // ADD "INTERVAL" MODAL
  const AddIntervalModal = () => {
    // visibleAddInterval && playSound(intervalBellSound);
    return (
      <Portal>
        <Modal
          visible={visibleAddInterval}
          onDismiss={() => {
            setVisibleAddInterval(false),
              bellSoundRef.current !== null &&
                bellSoundRef.current.unloadAsync();
          }}
          contentContainerStyle={modalContainerStyle}
        >
          <Text style={styles.modalTitle}>{"Add Interval"}</Text>

          <AddIntervalChooseBellComponent />
          <AddIntervalStartEndFromComponent />
          <AddIntervalDurationComponent />

          <View style={styles.modalInnerCenter3}>
            <Button
              style={{ width: 150, display: "flex" }}
              mode="contained"
              onPress={() => {
                setVisibleAddInterval(false);
                setVisibleNewIntervalsMainModal(true);
                saveAddInterval();
              }}
            >
              {"Save"}
            </Button>
          </View>
        </Modal>
      </Portal>
    );
  };

  const intervalDelete = (id) => {
    setAllIntervalBellsObj(
      allIntervalBellsObj.filter((interval) => interval.id !== id)
    );
    setAllIntervalsCount(parseInt(allIntervalsCount) - 1);
    if (activePreset) {
      setNewChanges(true);
    }
  };

  // EDIT SINGLE "INTERVAL"
  const EditIntervalSingleModal = () => {
    visibleEditIntervalSingle && playSound(intervalBellSound);
    return (
      <Portal>
        <Modal
          visible={visibleEditIntervalSingle}
          onDismiss={() => {
            setVisibleEditIntervalSingle(false),
              bellSoundRef.current !== null &&
                bellSoundRef.current.unloadAsync();
          }}
          contentContainerStyle={modalContainerStyle}
        >
          <Text style={styles.modalTitle}>Edit Interval</Text>

          <AddIntervalChooseBellComponent />
          <AddIntervalStartEndFromComponent />
          <AddIntervalDurationComponent />

          <View style={styles.modalInnerCenter3}>
            <Button
              style={{ width: 150, display: "flex" }}
              mode="contained"
              onPress={() => {
                setVisibleEditIntervalSingle(false);
                setVisibleNewIntervalsMainModal(true);
                // saveAddInterval();
                saveEditInterval();
              }}
            >
              Update
            </Button>
          </View>
        </Modal>
      </Portal>
    );
  };

  const showIntervalModal = (interval) => {
    setEditIntervalId(interval?.id);
    setIntervalDurationHours(interval?.intervalDurationHours);
    setIntervalDurationMinutes(interval?.intervalDurationMinutes);
    setIntervalDurationSeconds(interval?.intervalDurationSeconds);
    setStartEndFromDropdown(interval?.intervalStartEndFrom ?? "fromStart");
    setVisibleEditIntervalSingle(true);
    setVisibleNewIntervalsMainModal(false);
  };

  var intervalsCountIncr = 1;

  // ADD/VIEW INTERVALS MAIN MODAL
  const AllIntervalsMainModal = () => {
    return (
      <Portal>
        <Modal
          visible={visibleAllIntervalsMainModal}
          onDismiss={() => setVisibleNewIntervalsMainModal(false)}
          contentContainerStyle={modalContainerStyle}
        >
          <Text style={styles.modalTitle}>{"Interval Bells"}</Text>
          <View style={[styles.modalInnerCenter2, { paddingTop: 10 }]}>
            <Button
              style={{ width: 150, marginTop: 15, display: "flex" }}
              mode="contained"
              onPress={() => {
                setVisibleAddInterval(true);
                setVisibleNewIntervalsMainModal(false);
              }}
            >
              {"+ Add"}
            </Button>
          </View>
          <View style={styles.modalInnerCenter4}>
            {allIntervalBellsObj?.length > 0 && ( // Top border
              <View
                style={{
                  width: "100%",
                  marginBottom: 0,
                  paddingBottom: 0,
                  paddingTop: 10,
                  borderTopColor: "#eee",
                  borderTopWidth: 2,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "flex-start",
                }}
              ></View>
            )}
            {allIntervalBellsObj?.length > 0 &&
              allIntervalBellsObj?.map((interval) => {
                // Loop through all intervals
                return (
                  <View
                    style={{
                      marginBottom: 10,
                      paddingBottom: 10,
                      borderBottomColor: "#eee",
                      borderBottomWidth: 2,
                      flexDirection: "row",
                      flexWrap: "wrap",
                      alignItems: "flex-start",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        width: "100%",
                      }}
                      onPress={() => {
                        showIntervalModal(interval);
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#000000",
                          opacity: 0.9,
                        }}
                      >
                        Bell {intervalsCountIncr++}
                        &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;
                        {timerCountDescDisplayFunc(
                          convertTimeToSeconds(
                            interval.intervalDurationHours,
                            interval.intervalDurationMinutes,
                            interval.intervalDurationSeconds
                          ),
                          0
                        )}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "500",
                          color: "#66458F",
                          marginVertical: 4,
                        }}
                      >
                        {interval?.intervalStartEndFrom === "fromStart"
                          ? "From Start"
                          : "From End"}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ position: "absolute", width: 22, right: 33 }}
                      activeOpacity={0.7}
                      onPress={() => {
                        showIntervalModal(interval);
                      }}
                    >
                      <Icon
                        name="pencil"
                        size={24}
                        color="#aaa"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ position: "absolute", width: 22, right: 0 }}
                      onPress={() => intervalDelete(interval.id)}
                    >
                      <Icon
                        name="minus-circle-outline"
                        size={24}
                        color="#aaa"
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
          </View>
        </Modal>
      </Portal>
    );
  };

  // SHOW CONTENT

  return (
    <ImageBackground
      source={require("../../assets/splash/background2.png")}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
        {/* <RenderHtml contentWidth={width} source={source} /> */}
        <View style={styles.container}>
          <View style={styles.containerInner}>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
              }}
            >
              {presetIndex !== null && (
                <TouchableOpacity
                  style={{ flex: 0.15 }}
                  activeOpacity={0.7}
                  onPress={() => {
                    setResetClick(!resetClick),
                      toastRef.current.show("Default settings restored");
                  }}
                >
                  <Image
                    source={require("../../assets/images/arrow-back.png")}
                    style={{
                      width: 46,
                      height: 51,
                      resizeMode: "contain",
                    }}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  paddingHorizontal: 12,
                }}
                activeOpacity={presetIndex !== null ? 0.7 : 1}
                onPress={() => {
                  presetIndex !== null &&
                    ((presetNameRef.current = preset),
                    setVisibleNewIntervalsMainModal(false),
                    setVisibleEditPreset(!visibleEditPreset));
                }}
              >
                <Text style={styles.title}>{preset}</Text>
                {presetIndex !== null && (
                  <Image
                    source={require("../../assets/images/editPreset.png")}
                    style={{
                      width: 22,
                      height: 22,
                      resizeMode: "contain",
                      marginHorizontal: 12,
                      tintColor: "gray",
                      opacity: 0.8,
                      marginVertical: 8,
                    }}
                  />
                )}
              </TouchableOpacity>
            </View>

            <Text style={styles.timerCountDescdownDisplay}>
              {timerCountDescDisplayFunc(timerCountDesc, 1)}
            </Text>

            {!visibleTimer && (
              <View>
                <Text
                  style={styles.modalSubTitle}
                  onPress={() => setVisibleNewIntervalsMainModal(true)}
                >
                  {allIntervalsCount} Interval Bell
                  {allIntervalsCount !== 1 && "s"}
                </Text>
                {!activePreset && !newChanges && (
                  <View style={styles.modalInnerCenter5}>
                    <Text
                      style={styles.saveAsPresetButton}
                      onPress={() => setVisibleSavePreset(!visibleSavePreset)}
                    >
                      <Icon name="plus" size={15} />
                      &nbsp; Save As Preset
                    </Text>
                  </View>
                )}
              </View>
            )}

            {activePreset && newChanges && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => updatePreset()}
                style={styles.modalInnerCenter5}
              >
                <Text style={[styles.saveAsPresetButton, { color: "#66458F" }]}>
                  <Icon name="content-save" size={15} />
                  &nbsp; Save {preset}
                </Text>
              </TouchableOpacity>
            )}

            {visibleTimer && (
              <View>
                <View style={styles.modalInnerCenter}>
                  {!timerFinished && (
                    <View style={styles.playPauseButtonWrapper}>
                      <Text>
                        <Icon
                          name={
                            timerIsPlaying == true
                              ? "pause-circle"
                              : "play-circle"
                          }
                          size={75}
                          color="gray"
                          onPress={playPauseTimer}
                        />
                      </Text>
                    </View>
                  )}
                  <View style={{ width: "100%" }}>
                    {!timerFinished && (
                      <Button
                        style={{
                          marginTop: 30,
                          padding: 7,
                          display: "flex",
                          backgroundColor: "#eee",
                          borderRadius: 50,
                        }}
                        textColor="#222"
                        mode="contained"
                        labelStyle={{ fontSize: 18 }}
                        onPress={discardSessionFunc}
                      >
                        Discard Session
                      </Button>
                    )}
                    {timerFinished && <View style={{ marginTop: 50 }}></View>}
                    <Button
                      style={{
                        marginTop: 15,
                        padding: 7,
                        display: "flex",
                        backgroundColor: "#eee",
                        borderRadius: 50,
                      }}
                      textColor="#222"
                      mode="contained"
                      labelStyle={{ fontSize: 18 }}
                      onPress={finshSessionFunc}
                    >
                      {!timerFinished ? "Finish" : "Close"}
                    </Button>
                  </View>
                </View>
              </View>
            )}
            {!visibleTimer && (
              <View>
                <View>
                  <DurationModal />
                  <PresetModal />
                  <StartBellSoundModal />
                  <EndBellSoundModal />
                  <AllIntervalsMainModal />
                  <AddIntervalModal />
                  <EditIntervalSingleModal />
                  <SaveAsPresetModal />
                  <EditAsPresetModal />

                  <TouchableOpacity
                    style={styles.timerRowFirst}
                    onPress={() => setVisiblePreset(true)}
                  >
                    <Text style={styles.timerRowLeft}>{"My Presets"}</Text>
                    <Text style={styles.timerRowRight}>
                      <Icon
                        name="chevron-right"
                        size={36}
                        color="gray"
                      />
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.timerRowAdditional}
                    onPress={() => setVisibleDuration(true)}
                  >
                    <Text style={styles.timerRowLeft}>{"Set Duration"}</Text>

                    <Text style={styles.timerRowRight}>
                      <Icon
                        name="chevron-right"
                        size={36}
                        color="gray"
                      />
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.timerRowAdditionalSquaresWrapper}>
                    <TouchableOpacity
                      style={styles.timerRowAdditionalSquare}
                      onPress={() => setvisibleStartBellSound(true)}
                    >
                      <Text style={styles.timerRowTop}>{"Start Bell"}</Text>
                      {/* <Text style={styles.timerRowBottom}>{startBellSound}</Text> */}
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.timerRowAdditionalSquareMiddle}
                      onPress={() => setVisibleendBellSound(true)}
                    >
                      <Text style={styles.timerRowTop}>{"End Bell"}</Text>
                      {/* <Text style={styles.timerRowBottom}>{endBellSound}</Text> */}
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.timerRowAdditionalSquare}
                      onPress={() => setVisibleNewIntervalsMainModal(true)}
                    >
                      <Text style={styles.timerRowTop}>{"Interval Bells"}</Text>
                      {/* <Text style={styles.timerRowBottom}>0</Text> */}
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.startStopWrapper}>
                  <Button
                    mode="text"
                    textColor="#222"
                    style={styles.startStopButton}
                    labelStyle={{ fontSize: 19, fontWeight: "bold" }}
                    buttonColor="#fff"
                    onPress={startTimerHandler}
                  >
                    {"Start"}
                  </Button>
                </View>
              </View>
            )}
          </View>
        </View>
        <View style={{ height: 110 }} />
        {Platform.OS === "android" &&
          visibleTimer &&
          timerIsPlaying &&
          appStateVisible === "background" && (
            <BackgroundTask
              interval={1000}
              function={() => {
                setTimerCountDesc((prevState) => prevState - 1);
              }}
            />
          )}
      </ScrollView>
      <Toast
        ref={(toast) => (toastRef.current = toast)}
        style={{ backgroundColor: "#000000" }}
        position="center"
        positionValue={2000}
        fadeInDuration={750}
        fadeOutDuration={1000}
        opacity={1}
        textStyle={{ color: "#FFFFFF" }}
      />
    </ImageBackground>
  );
};

export default Timer;

import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import "react-native-gesture-handler";
import React, { useState, useRef, useEffect } from "react";
import { LineChart, BarChart } from "react-native-chart-kit";
import axios from "axios";

const { width } = Dimensions.get("window");

const data = {
  labels: ["", "", "", "", "", "", ""],
  datasets: [
    {
      data: [0, 0, 0, 0, 0, 0, 0],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      strokeWidth: 2, // optional
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(63, 143, 244, ${opacity})`,
  strokeWidth: 2,
  decimalPlaces: 0,
};

const ProgressWeek = ({ navigation }, props) => {
  const userAuth = useSelector((state) => state.userAuth);
  const [authToken, setAuthToken] = useState(userAuth?.authToken);
  const [progressList, setProgressList] = useState([]);
  const [pageStart, setPageStart] = useState(0);
  const [moreResults, setMoreResults] = useState(1);
  const [graphData, setGraphData] = useState(data);
  const [dailyLogArray, setDailyLogArray] = useState("");
  const [dailyLogString, setDailyLogString] = useState("");
  const [datesFormatedString, setDatesFormatedString] = useState("");
  const [totalDaysMeditated, setTotalDaysMeditated] = useState(0);
  const [totalSecondsMeditated, setTotalSecondsMeditated] = useState(0);
  const [totalTimeMeditatedDisplay, setTotalTimeMeditatedDisplay] =
    useState("");
  const [consecutiveDays, setConsecutiveDays] = useState(0);
  const scrollRef = useRef();

  // Fetch progress list
  useEffect(() => {
    axios
      .get(
        `https://ethicallybased.com/mohanji-app-api/track-timer-get.php?duration=AllTime&presetId=&authToken=${authToken}`
      )
      .then((response) => {
        setDailyLogArray(response.data.dailyLogArray);
        setDailyLogString(response.data.dailyLogString);
        setDatesFormatedString(response.data.datesFormatedString);
        setTotalDaysMeditated(response.data.totalDaysMeditated);
        setTotalSecondsMeditated(response.data.totalSecondsMeditated);
        setTotalTimeMeditatedDisplay(response.data.totalTimeMeditatedDisplay);
        setConsecutiveDays(response.data.consecutiveDays);

        // Success
        if (response?.data?.status === 200) {
          let labelsWeekly = JSON.parse(response?.data?.datesFormatedString);
          let dataWeekly = JSON.parse(response?.data?.dailyLogString);
          let dataNumberArr = dataWeekly.map(Number);

          let WeeklyData = {
            labels: labelsWeekly,
            datasets: [
              {
                data: dataNumberArr,
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                strokeWidth: 2, // optional
              },
            ],
          };
          setGraphData(WeeklyData);
        } else {
        }
      });
  }, []);

  return (
    <View style={styles.imageBackground}>
      <ScrollView ref={scrollRef} style={styles.container}>
        <View style={styles.containerInner}>
          <Text style={styles.title}>Self-Guided Meditation Tracker</Text>
          <View style={styles.iconContainer}>
            <Image
              source={require("../../assets/images/progress.png")}
              style={styles.icon}
            />
            <Text style={styles.subTitle}>{"Your Progress All Time"}</Text>
          </View>
          {/* <LineChart
            data={graphData}
            width={width}
            height={300}
            chartConfig={chartConfig}
            yAxisLabel=""
            yAxisSuffix=" min."
            verticalLabelRotation={0}
          /> */}
          <View style={styles.allRowsWrapper}>
            <View style={styles.rowEach}>
              <View style={styles.rowEachLeft}>
                <Text style={styles.rowEachLeftHeader}>
                  Total consecutive days
                </Text>
              </View>
              <View style={styles.rowEachRight}>
                <Text style={styles.rowEachRightText}>{consecutiveDays}</Text>
              </View>
            </View>
            <View style={styles.rowEach}>
              <View style={styles.rowEachLeft}>
                <Text style={styles.rowEachLeftHeader}>
                  Total days meditated all time
                </Text>
              </View>
              <View style={styles.rowEachRight}>
                <Text style={styles.rowEachRightText}>
                  {totalDaysMeditated}
                </Text>
              </View>
            </View>
            <View style={styles.rowEach}>
              <View style={styles.rowEachLeft}>
                <Text style={styles.rowEachLeftHeader}>
                  Total time meditated all time
                </Text>
              </View>
              <View style={styles.rowEachRight}>
                <Text style={styles.rowEachRightText}>
                  {totalTimeMeditatedDisplay}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProgressWeek;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginBottom: 60,
    paddingTop: 5,
  },
  containerInner: {
    padding: 20,
    textAlign: "center",
    justifyContent: "center",
  },
  progressBannerEach: {
    marginBottom: 30,
  },
  img: {
    width: width,
    height: 220,
    resizeMode: "contain",
    marginVertical: 16,
  },
  listInnerContainer: {
    alignItems: "center",
    flex: 1,
  },
  listComponent: {
    width: width / 2.3,
    height: 233,
    backgroundColor: "#E2D7C8",
    marginHorizontal: 22,
    marginVertical: 12,
    borderRadius: 16,
  },
  bannerEachTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    width: 30,
    height: 26,
    resizeMode: "contain",
    tintColor: "#515151",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 44,
  },
  allRowsWrapper: {
    paddingTop: 10,
  },
  rowEach: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  rowEachLeft: {
    width: "75%",
  },
  rowEachLeftHeader: {
    // fontWeight: "bold",
  },
  rowEachRight: {
    width: "25%",
    flex: 1,
  },
  rowEachRightText: {
    // textAlight: "right",
  },
  title: {
    marginTop: 5,
    marginBottom: 0,
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    paddingBottom: 0,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

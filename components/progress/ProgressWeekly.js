import { StyleSheet, View, Dimensions, Text, Image } from "react-native";
import React from "react";
import { LineChart, BarChart } from "react-native-chart-kit";
import axios from "axios";

const { width } = Dimensions.get("window");

const data = {
  labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  datasets: [
    {
      data: [20, 30, 40, 80, 60, 70, 50],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      strokeWidth: 2, // optional
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(63, 143, 244, ${opacity})`,
  strokeWidth: 2, // optional, default 3
};

const ProgressWeekly = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          source={require("../../assets/images/progress.png")}
          style={styles.icon}
        />
        <Text style={styles.title}>{"Your Progress"}</Text>
      </View>
      {/* <BarChart
        data={data}
        width={width - 36}
        height={400}
        chartConfig={chartConfig}
      /> */}
      <LineChart
        data={data}
        width={width}
        height={300}
        chartConfig={chartConfig}
      />
    </View>
  );
};

export default ProgressWeekly;

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 22 },
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
  title: { color: "#515151", fontSize: 18, fontWeight: "600", marginLeft: 6 },
});
{
  /* <LineChart
        data={data}
        width={width}
        height={400}
        chartConfig={chartConfig}
      /> */
}

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Switch } from "react-native-paper";

const SwitchRow = ({ title, value, setValue }) => {
  return (
    <View>
      <View style={styles.rowStyle}>
        <Text style={styles.rowTitile}>{title}</Text>
        <Switch
          value={!!parseInt(value)}
          onValueChange={() => {
            setValue(value == 1 ? 0 : 1);
          }}
        />
      </View>
      <View style={styles.divider} />
    </View>
  );
};

export default SwitchRow;

const styles = StyleSheet.create({
  rowStyle: {
    flexDirection: "row",
    marginVertical: 12,
    marginHorizontal: 22,
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowTitile: { fontSize: 18, color: "#515151" },
  divider: {
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#E6E6E6",
    marginVertical: 6,
  },
});

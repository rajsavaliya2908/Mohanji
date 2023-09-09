import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  // ScrollView,
  Platform,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";

const DropDownPicker = ({
  data = [],
  value = {},
  title = {},
  onSelect = () => {},
  tapAction = () => {},
  name = {},
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [text, setText] = useState("");
  const [options, setOptions] = useState(data);

  const onSlectedItem = (val) => {
    setShowOptions(false);
    onSelect(val);
  };

  useEffect(() => {
    if (text) {
      let list = data;
      const filteredList = list.filter((item) =>
        item[name].toLowerCase().includes(text.toLowerCase())
      );
      setOptions(filteredList);
    } else {
      setOptions(data);
    }
  }, [text]);

  useEffect(() => {
    {
      typeof tapAction === "boolean" && showOptions
        ? setShowOptions(false)
        : null;
    }
  }, [tapAction]);

  const setVisibility = () => {
    setShowOptions(!showOptions);
    if (!showOptions) {
      setOptions(data);
      setText("");
    }
  };
  return (
    <View style={[styles.container, Platform.OS === "ios" && { zIndex: 1 }]}>
      <Text style={styles.label}>{title}</Text>
      <TouchableOpacity
        onPress={() => setVisibility()}
        activeOpacity={0.8}
        style={styles.dropdown}
      >
        <Text style={[styles.item, { fontSize: 18, fontWeight: "400" }]}>
          {!!value
            ? value[name]?.length < 26
              ? value[name]
              : `${value[name]?.substring(0, 26)}...`
            : "Select " + title}
        </Text>
        <Image
          source={require("../assets/images/arrow-down.png")}
          style={[
            styles.icon,
            { transform: [{ rotate: showOptions ? "180deg" : "0deg" }] },
          ]}
        />
      </TouchableOpacity>
      {showOptions && (
        <View
          style={[
            styles.dropdownContainer,
            Platform.OS === "android" && { zIndex: 2 },
          ]}
        >
          <View>
            <TextInput
              style={styles.input}
              placeholderTextColor="#00000090"
              placeholder={"Search"}
              fontSize={17}
              fontWeight={"400"}
              onChangeText={(value) => setText(value)}
              value={text}
            />
          </View>
          <ScrollView
            automaticallyAdjustsScrollIndicatorInsets
            nestedScrollEnabled={true}
          >
            {options.map((val, i) => {
              return (
                <TouchableOpacity
                  key={String(i)}
                  onPress={() => onSlectedItem(val)}
                  style={[
                    styles.itemContainer,
                    {
                      backgroundColor:
                        value?._id === val._id ? "#FFFFFF" : null,
                    },
                  ]}
                >
                  <Text style={{ fontSize: 22, marginRight: 12 }}>
                    {val?.emoji}
                  </Text>
                  <Text
                    style={[
                      styles.itemTxt,
                      {
                        color:
                          value?._id === val._id ? "#00000090" : "#ffffff90",
                      },
                    ]}
                  >
                    {val?.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default DropDownPicker;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 22,
  },
  dropdown: {
    height: 56,
    borderRadius: 33,
    backgroundColor: "#FFFFFF",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 2,
    paddingHorizontal: 12,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownContainer: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    top: 106,
    width: "100%",
    minHeight: 77,
    maxHeight: 333,
    borderRadius: 8,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 2,
  },
  item: {
    paddingHorizontal: 12,
    fontSize: 16,
    textAlignVertical: "center",
  },
  itemContainer: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    // marginBottom: 2,
    flexDirection: "row",
    borderRadius: 33,
  },
  itemTxt: {
    fontSize: 18,
  },
  icon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
    marginRight: 12,
  },

  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#7E7E7E",
    fontStyle: "normal",
    paddingVertical: 10,
  },
  input: {
    height: 52,
    width: "100%",
    textAlign: "left",
    paddingHorizontal: 18,
    color: "#00000090",
    borderRadius: 8,
    borderColor: "lightgray",
    borderWidth: 1,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    // elevation: 2,
  },
});

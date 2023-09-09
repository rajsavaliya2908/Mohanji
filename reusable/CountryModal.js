import React, { useEffect, useState } from "react";
import {
  View,
  Pressable,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import Countries from "./CountriesList";

const CountryModal = ({
  setModalVisible,
  modalVisible,
  setSelectedCountry,
}) => {
  const [text, setText] = useState("");
  const [countriesList, setCountriesList] = useState(Countries);

  useEffect(() => {
    modalVisible == true ? setCountriesList(Countries) : setText("");
  }, [modalVisible]);

  useEffect(() => {
    if (text) {
      let list = Countries;
      const filteredList = list.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setCountriesList(filteredList);
    } else {
      setCountriesList(Countries);
    }
  }, [text]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <SafeAreaView style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              {/* <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <Image source={icon.close} style={styles.closeImg} />
              </TouchableWithoutFeedback> */}
              <TextInput
                style={styles.input}
                placeholderTextColor="#4B4C52"
                placeholder={"Search Country name"}
                fontSize={17}
                fontWeight={"400"}
                onChangeText={(value) => setText(value)}
                value={text}
              />
            </View>
            <ScrollView>
              {countriesList.map((item) => {
                return (
                  <Pressable
                    onPress={() => {
                      setSelectedCountry(item.name),
                        setModalVisible(!modalVisible);
                    }}
                    key={item.name}
                    style={styles.name}
                  >
                    <Text style={styles.emojiSize}>{item.emoji}</Text>
                    <Text style={styles.nameTxt}>{item.name}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 52,
    width: "100%",
    paddingHorizontal: 18,
    color: "#FAFBFF",
    // elevation: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  closeImg: {
    width: 32,
    height: 32,
    resizeMode: "contain",
    marginTop: 8,
    marginLeft: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nameTxt: {
    color: "#fff",
    marginLeft: 10,
  },
  name: {
    flexDirection: "row",
    alignItems: "center",
  },
  emojiSize: {
    fontSize: 30,
    marginHorizontal: 12,
  },
});

export default CountryModal;

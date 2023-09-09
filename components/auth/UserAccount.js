import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useRef } from "react";
import DropDown from "../../reusable/DropDown";
import RNUserInput from "../../reusable/RNUserInput";
import DropDownPicker from "../../reusable/DropDownPicker";
import Countries from "../../reusable/CountriesList";
// import * as ImagePicker from "expo-image-picker";
import { Divider } from "react-native-paper";
import Modal from "react-native-modal";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import RNButton from "../../reusable/RNButton";
import { userActions } from "../../store/user-slice";
import Toast from "react-native-easy-toast";

const { width, height } = Dimensions.get("window");

const data = [
  { id: 1, name: "Male", value: "male" },
  { id: 2, name: "Female", value: "female" },
  { id: 3, name: "Prefer not to say", value: "other" },
];

const UserAccount = () => {
  const userAuth = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();
  const toastRef = useRef();

  const [selectedGender, setSelectedGender] = useState(
    userAuth?.gender == 3 ? data[2] : userAuth?.gender == 2 ? data[1] : data[0]
  );
  const [selectedCountry, setSelectedCountry] = useState({
    id: 1,
    name: "Choose",
    value: "choose",
  });
  const [fullName, setFullName] = useState(userAuth?.fullName);
  const [image, setImage] = useState(userAuth?.photoUrl);
  const [province, setProvince] = useState(userAuth?.province);
  const [city, setCity] = useState(userAuth?.city);
  const [file, setFile] = useState({});
  const [password, setPasswod] = useState("");

  const [imageModalVisible, setImageModalVisible] = useState(false);

  useEffect(() => {
    if (userAuth?.country !== "") {
      let countryFound = Countries.filter((item) => {
        return item.name === userAuth?.country;
      });
      if (countryFound) {
        setSelectedCountry(countryFound[0]);
      }
    }
  }, [userAuth]);

  const updateUseInfo = () => {
    updateUserBasicInfo();
    changeUserPassword();
  };

  const updateUserBasicInfo = () => {
    const data = {
      authToken: userAuth?.authToken,
      fullName,
      email: userAuth?.email,
      city,
      province,
      country: selectedCountry?.name,
      gender: selectedGender?.id,
    };

    axios
      .post(
        "https://ethicallybased.com/mohanji-app-api/updateBasicInfo.php",
        data
      )
      .then((result) => {
        if (result?.data?.status == 200) {
          dispatch(
            userActions.userAuthenticated({
              fullName: result?.data?.fullName,
              email: result?.data?.email,
              country: result?.data?.country ?? "",
              province: result?.data?.province ?? "",
              city: result?.data?.city ?? "",
              gender: result?.data?.gender,
              photoUrl: userAuth?.photoUrl ?? "",
              accountType: userAuth?.accountType,
              authToken: userAuth?.authToken,
              loggedIn: true,
            })
          );

          toastRef.current.show(result?.data?.successMessage);
        } else {
          toastRef.current.show(result?.data?.errorMessage);
        }
      })
      .catch((error) => console.log(error));
  };

  const changeUserPassword = () => {
    const userPassword = {
      password,
      authToken: userAuth?.authToken,
    };

    axios
      .post(
        "https://ethicallybased.com/mohanji-app-api/updatePassword.php",
        userPassword
      )
      .then((result) => {
        if (result?.data?.status == 200) {
        } else {
        }
      });
  };

  // const imagePickerModal = () => {
  //   return (
  //     <Modal
  //       isVisible={imageModalVisible}
  //       useNativeDriver={true}
  //       isTransitioning={true}
  //       animationIn={"slideInUp"}
  //       animationInTiming={500}
  //       animationOutTiming={500}
  //       swipeDirection="down"
  //       coverScreen={true}
  //       backdropOpacity={0.2}
  //       backdropTransitionInTiming={500}
  //       backdropColor={"#66458F"}
  //       onBackdropPress={() => setImageModalVisible(false)}
  //       deviceWidth={width}
  //       deviceHeight={height}
  //       onRequestClose={() => setImageModalVisible(false)}
  //       style={{ justifyContent: "flex-end", margin: 0 }}
  //     >
  //       <View style={styles.modalContainer}>
  //         <View style={styles.modalHeader}>
  //           <Text style={styles.modalTitle}>{"Choose Option"}</Text>
  //         </View>
  //         <View style={{ flex: 0.75 }}>
  //           <TouchableOpacity
  //             activeOpacity={0.7}
  //             onPress={cameraImage}
  //             style={styles.modalRowContainer}
  //           >
  //             <FontAwesome color="#66458F" size={26} name="camera" />
  //             <Text style={styles.modalRowTitle}>{"Take a picture"}</Text>
  //           </TouchableOpacity>
  //           <Divider style={styles.divider} />
  //           <TouchableOpacity
  //             activeOpacity={0.7}
  //             onPress={libraryImage}
  //             style={styles.modalRowContainer}
  //           >
  //             <Entypo color="#66458F" size={26} name="images" />
  //             <Text style={styles.modalRowTitle}>{"Image Library"}</Text>
  //           </TouchableOpacity>
  //           <Divider style={styles.divider} />
  //         </View>
  //       </View>
  //     </Modal>
  //   );
  // };

  // const libraryImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   // console.log(result);
  //   setImageModalVisible(false);
  //   if (!result?.cancelled) {
  //     setImage(result?.uri);
  //   }
  //   let Uri = result?.uri;
  //   let index = Uri?.lastIndexOf("/") + 1;
  //   let fileName = Uri.substring(index, Uri?.length);

  //   const formData = new FormData();
  //   formData.append("authToken", userAuth?.authToken);
  //   formData.append("image", {
  //     uri: result?.uri,
  //     type: result?.type,
  //     name: fileName,
  //   });
  //   axios({
  //     method: "post",
  //     url: "https://ethicallybased.com/mohanji-app-api/image-upload.php",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "multipart/form-data",
  //     },
  //     data: formData,
  //   })
  //     .then((response) => {

  //     })
  //     .catch((error) => console.log(error));
  // };

  // const cameraImage = async () => {
  //   let result = await ImagePicker.launchCameraAsync({
  //     quality: 1,
  //   });
  //   // console.log(result);
  //   setImageModalVisible(false);
  //   if (!result?.cancelled) {
  //     setImage(result?.uri);
  //   }
  // };

  return (
    <View style={styles.contaier}>
      <View style={styles.headerContianer}>
        <Image
          source={require("../../assets/images/account.png")}
          style={styles.icon}
        />
        <Text style={styles.headerTxt}>{"My Account"}</Text>
      </View>
      {/* {imagePickerModal()} */}
      <ScrollView>
        {/* <Text style={styles.profileTxt}>{"Change Your Profile Image"}</Text>
        <View style={styles.imgContainer}>
          <TouchableOpacity onPress={() => setImageModalVisible(true)}>
            <Image
              source={require("../../assets/images/add-image.png")}
              style={styles.addImg}
            />
          </TouchableOpacity>
          <Image
            style={styles.img}
            source={
              image === null || image === ""
                ? require("../../assets/images/profile-photo.png")
                : { uri: image }
            }
          />
          {image !== "" && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.deleteIconContainer}
              onPress={() => setImage(null)}
            >
              <Image
                style={styles.deleteIcon}
                source={require("../../assets/images/delete.png")}
              />
            </TouchableOpacity>
          )}
        </View> */}

        {/* <DropDown title={"Kriya Status"} inputTxt={"Kriya Status"} /> */}
        <View style={{ zIndex: 5 }}>
          <DropDownPicker
            data={Countries}
            value={selectedCountry}
            onSelect={setSelectedCountry}
            title={"Country"}
            name={"name"}
          />
        </View>
        <View style={styles.spacer2} />
        <RNUserInput
          title={"Province"}
          placeholder={"Enter Province"}
          icon={false}
          value={province}
          onTextChange={setProvince}
        />
        <View style={styles.spacer2} />
        <RNUserInput
          title={"City"}
          placeholder={"Enter City"}
          icon={false}
          value={city}
          onTextChange={setCity}
        />
        <View style={styles.spacer2} />
        <DropDownPicker
          data={data}
          value={selectedGender}
          onSelect={setSelectedGender}
          title={"Gender"}
          name={"name"}
        />
        <View style={styles.spacer2} />
        <RNUserInput
          title={"Change username"}
          placeholder={"John Doe"}
          icon={false}
          value={fullName}
          onTextChange={setFullName}
        />
        {userAuth?.accountType == "Email" && (
          <View>
            <View style={styles.spacer2} />
            <RNUserInput
              title={"Change Password"}
              placeholder={"Change Password"}
              secureTextEntry={true}
              icon={false}
              value={password}
              onTextChange={setPasswod}
            />
          </View>
        )}
        {/* <Text style={styles.deleteTxt}>{"Delete Account"}</Text> */}
        <View style={{ marginHorizontal: 22, marginTop: 30 }}>
          <RNButton onPress={updateUseInfo} title={"Update"} />
        </View>
        <View style={styles.spacer} />
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
    </View>
  );
};

export default UserAccount;

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
    width: 26,
    height: 26,
    resizeMode: "contain",
    tintColor: "#515151",
  },
  profileTxt: {
    color: "#7E7E7E",
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 22,
  },
  imgContainer: {
    flexDirection: "row",
    marginHorizontal: 22,
    marginVertical: 12,
  },
  addImg: { width: 80, height: 80, resizeMode: "contain" },
  img: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ECEEED",
    marginHorizontal: 22,
  },
  deleteIconContainer: {
    justifyContent: "flex-end",
    right: 40,
    bottom: 3,
  },
  deleteIcon: { width: 22, height: 22, resizeMode: "contain" },
  modalRowContainer: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  modalRowTitle: { fontSize: 20, padding: 15 },
  divider: { height: 1, backgroundColor: "#EAEDF0" },
  modalContainer: { flex: 0.35, backgroundColor: "#FFFFFF" },
  modalHeader: {
    flex: 0.15,
    backgroundColor: "#66458F",
    flexDirection: "row",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "500",
    alignSelf: "center",
  },
  deleteTxt: {
    marginHorizontal: 22,
    marginVertical: 12,
    fontSize: 18,
    color: "#EB4335",
    fontWeight: "500",
  },
  spacer: { height: 100 },
  spacer2: { height: 10 },
});

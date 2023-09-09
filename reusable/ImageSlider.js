import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Carousel, { Pagination } from "react-native-new-snap-carousel";

const data = [
  { id: 1, pic: require("../assets/images/banner-1.png") },
  { id: 2, pic: require("../assets/images/banner-2.png") },
  { id: 3, pic: require("../assets/images/banner-3.png") },
  { id: 4, pic: require("../assets/images/banner-4.png") },
];

const { width } = Dimensions.get("window");

const ImageSlider = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <View style={{ top: -5 }}>
      <Carousel
        layout={"default"}
        data={data}
        sliderWidth={width}
        itemWidth={width}
        useScrollView={true}
        autoplay={true}
        loop={true}
        enableSnap={true}
        autoplayInterval={5000}
        decelerationRate={"normal"}
        inactiveSlideOpacity={1}
        slideStyle={{ width: width }}
        inactiveSlideShift={1}
        enableMomentum={true}
        renderItem={({ index, item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("WhoIsMohanji")}
          >
            <View style={styles.container} key={index}>
              <Image source={item.pic} style={styles.image} />
            </View>
          </TouchableOpacity>
        )}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      <View style={styles.pagination}>
        <Pagination
          dotStyle={styles.paginationView}
          inactiveDotColor={"#D9D9D9"}
          dotColor={"#F0F0F0"}
          activeDotIndex={activeIndex}
          dotsLength={4}
          animatedDuration={5000}
          inactiveDotScale={0.7}
          inactiveDotOpacity={1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationView: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  pagination: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: -12,
  },
  container: {
    backgroundColor: "#111214",
    width: "100%",
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 2,
  },
});

export default ImageSlider;
// export PATH=~/.npm-global/bin:$PATH

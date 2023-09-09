import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState, useRef } from "react";
import Carousel, { Pagination } from "react-native-new-snap-carousel";
import RNButton from "../../reusable/RNButton";

const { width } = Dimensions.get("window");

const data = [
  {
    id: 1,
    img: require("../../assets/images/carousel-1.png"),
    question: "How long have you been meditating?",
    options: [
      { id: 1, title: "Just starting", selected: false },
      { id: 2, title: "For a short time", selected: false },
      { id: 3, title: "I meditate from time to time", selected: false },
      { id: 4, title: "I am a long time meditatant", selected: false },
    ],
  },
  {
    id: 2,
    img: require("../../assets/images/carousel-2.png"),
    question: "Do you feel anxiety or depression each day?",
    options: [
      { id: 1, title: "Yes, anxiety", selected: false },
      { id: 2, title: "Yes, depression", selected: false },
      { id: 3, title: "No, I feel good", selected: false },
      { id: 4, title: "Both, anxiety and depression", selected: false },
    ],
  },
  {
    id: 3,
    img: require("../../assets/images/carousel-3.png"),
    question: "What are your goals?",
    options: [
      { id: 1, title: "Sleep better", selected: false },
      { id: 2, title: "Less stress", selected: false },
      { id: 3, title: "More energy", selected: false },
      { id: 4, title: "More focus", selected: false },
    ],
  },
];

const Questionare = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [q1Selected, setQ1Selected] = useState(null);
  const [q2Selected, setQ2Selected] = useState(null);
  const [q3Selected, setQ3Selected] = useState(null);
  //   const sliderRef = useRef(false);
  return (
    <ImageBackground
      source={require("../../assets/splash/background2.png")}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        <ScrollView
          bounces={false}
          contentContainerStyle={{ marginVertical: 44 }}
          showsVerticalScrollIndicator={false}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Image
              source={require("../../assets/images/arrow-back.png")}
              style={styles.backArrow}
            />
          </Pressable>

          <Carousel
            layout={"default"}
            //   ref={(ref) => (sliderRef.current = ref)}
            data={data}
            sliderWidth={width}
            itemWidth={width}
            useScrollView={true}
            renderItem={({ index, item }) => (
              <View style={styles.containerCarousel} key={index}>
                <Image source={item.img} style={styles.image} />
                <Text style={styles.question}>{item.question}</Text>
                {item?.options?.map((val, qIndex) => (
                  <TouchableOpacity
                    onPress={() => {
                      (index === 0 && setQ1Selected(qIndex)) ||
                        (index === 1 && setQ2Selected(qIndex)) ||
                        (index === 2 && setQ3Selected(qIndex));
                    }}
                    activeOpacity={0.6}
                    style={[
                      styles.options,
                      {
                        backgroundColor:
                          (index === 0 && q1Selected === qIndex) ||
                          (index === 1 && q2Selected === qIndex) ||
                          (index === 2 && q3Selected === qIndex)
                            ? "#66458F"
                            : "#FFFFFF",
                      },
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "400",
                        color:
                          (index === 0 && q1Selected === qIndex) ||
                          (index === 1 && q2Selected === qIndex) ||
                          (index === 2 && q3Selected === qIndex)
                            ? "#F6F1FB"
                            : "#515151",
                      }}
                    >
                      {val?.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            onSnapToItem={(index) => setActiveIndex(index)}
          />

          <Pagination
            dotStyle={styles.paginationView}
            //   carouselRef={sliderRef}
            //   tappableDots={!!sliderRef}
            inactiveDotColor={"#36454F"}
            dotColor={"#66458F"}
            activeDotIndex={activeIndex}
            dotsLength={3}
            animatedDuration={150}
            inactiveDotScale={1.5}
            inactiveDotOpacity={0.1}
            inactiveDotStyle={{ width: 8 }}
          />
          <View style={{ marginHorizontal: 20 }}>
            <RNButton title={"CONTINUE"} onPress={() => {}} />
          </View>
          <View style={{ height: 33 }} />
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default Questionare;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 5,
    // padding: 20,
  },
  backArrow: {
    width: 46,
    height: 51,
    resizeMode: "contain",
    marginLeft: 16,
  },
  containerCarousel: {
    backgroundColor: "transparent",
    borderRadius: 12,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 320,
    borderRadius: 8,
    resizeMode: "contain",
  },
  question: {
    color: "#515151",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 12,
    width: "70%",
  },
  options: {
    width: "70%",
    height: 50,
    marginVertical: 6,
    borderRadius: 33,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  paginationView: {
    width: 55,
    height: 10,
    borderRadius: 8,
  },
});

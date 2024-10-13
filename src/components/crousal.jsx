import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width: screenWidth } = Dimensions.get("window");

const data = [
  {
    title: "1",
    image: require("../assets/images/jiit-1.jpg"),
  },
  {
    title: "2",
    image: require("../assets/images/jiit-2.jpg"),
  },
  {
    title: "3",
    image: require("../assets/images/jiit-3.jpg"),
  },
];

const Carsoul = () => {
  const carouselRef = useRef(null);

  // Function to navigate to the previous slide
  const goToPrevious = () => {
    carouselRef.current?.prev();
  };

  // Function to navigate to the next slide
  const goToNext = () => {
    carouselRef.current?.next();
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        loop
        width={screenWidth}
        height={250}
        autoPlay={true}
        autoPlayInterval={3000}
        data={data}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item.image} style={styles.image} />
          </View>
        )}
      />
      <View style={styles.button}>
        {/* Left arrow button */}
        <TouchableOpacity style={styles.leftArrow} onPress={goToPrevious}>
          <Text style={styles.arrowText}>{"<"}</Text>
        </TouchableOpacity>

        {/* Right arrow button */}
        <TouchableOpacity style={styles.rightArrow} onPress={goToNext}>
          <Text style={styles.arrowText}>{">"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  slide: {
    width: screenWidth,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: screenWidth,
    height: 250,
    resizeMode: "cover",
  },
  button: {
    position: "absolute",
    top: 100,
    left: 0,    
    right: 0,
  },
  leftArrow: {
    position: "absolute",
    left: 10,
    top: "45%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 50,
  },
  rightArrow: {
    position: "absolute",
    right: 10,
    top: "45%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 50,
  },
  arrowText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Carsoul;

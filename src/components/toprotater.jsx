import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const MarqueeSingleLine = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const noticeText =
    "Highest Package of 62 LPA - One offer";

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 10000, // Adjust the speed of scrolling here
        useNativeDriver: true,
      })
    ).start()
  }, [animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [screenWidth, -screenWidth], // Make sure it scrolls all the way through
  });

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[styles.marqueeText, { transform: [{ translateX }] }]}>
        {noticeText}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 30,
    backgroundColor: "green", // Green background
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  marqueeText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    whiteSpace: "nowrap", // Ensures text does not wrap to another line
  },
});

export default MarqueeSingleLine;

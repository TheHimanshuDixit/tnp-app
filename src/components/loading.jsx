import React, { useEffect, useRef } from "react";
import { View, Text, Image, Animated, StyleSheet } from "react-native";

export default function LoadingScreen() {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 100, 
      duration: 3000,
      useNativeDriver: false, 
    }).start();
  }, [progress]);

  const widthInterpolation = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")} 
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.progressBarBackground}>
        <Animated.View
          style={[styles.progressBarFill, { width: widthInterpolation }]}
        />
      </View>

      <Text style={styles.loadingText}>Loading... Please wait</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 50, 
  },
  progressBarBackground: {
    width: "80%",
    height: 20, 
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#4caf50", 
    borderRadius: 10,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: "#333",
  },
});

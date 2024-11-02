import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";

const CircularLoaderScreen = () => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    // Rotate and scale infinitely
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1
    );

    scale.value = withRepeat(
      withTiming(1.2, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  // Apply animated rotation and scaling style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        {/* Outer ring */}
        <Animated.View
          style={[styles.circle, styles.outerCircle, animatedStyle]}
        />
        {/* Inner ring */}
        <Animated.View
          style={[styles.circle, styles.innerCircle, animatedStyle]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  circleContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  outerCircle: {
    borderWidth: 5,
    borderColor: "#00ff00",
    borderTopColor: "transparent",
    shadowColor: "#00ff00",
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  innerCircle: {
    width: 60,
    height: 60,
    borderWidth: 3,
    borderColor: "#ff4500",
    borderTopColor: "transparent",
  },
});

export default CircularLoaderScreen;

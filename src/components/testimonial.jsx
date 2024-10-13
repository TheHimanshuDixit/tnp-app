import React, { useRef } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const testimonials = [
  {
    name: "Srishti Garg",
    position: "Google",
    image: require("../assets/images/Srishti.jpg"), // Adjust the path as necessary
    text: "Thanks to the exceptional support and resources provided by our college's training and placement website, I successfully secured a position as a Software Development Engineer at Google.",
  },
  {
    name: "Divya",
    position: "Morgan Stanley",
    image: require("../assets/images/Divya.jpg"),
    text: "Thanks to the training and placement platform, I secured a role as a Software Development Engineer at Morgan Stanley. The seamless user interface and guidance through the application process were invaluable in achieving my goals.",
  },
  {
    name: "Himanshu Dixit",
    position: "Fidelity International",
    image: require("../assets/images/Himanshu.jpg"),
    text: "Launching into my career journey, the training and placement platform was pivotal in helping me secure my role as a Software Development Engineer at Fidelity International.",
  },
  {
    name: "Kamal Garg",
    position: "Cadence",
    image: require("../assets/images/Kamal.png"),
    text: "The training and placement platform of our college played a crucial role in helping me secure my position as a Software Development Engineer at Cadence. Its resources were indispensable.",
  },
];

const TestimonialCarousel = () => {
  const carouselRef = useRef(null);

  const goToPrevious = () => {
    carouselRef.current?.prev();
  };
  const goToNext = () => {
    carouselRef.current?.next();
  };

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.position}>{item.position}</Text>
        <Text style={styles.testimonial}>{item.text}</Text>
      </View>
    );
  };


  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={testimonials}
        renderItem={renderItem}
        width={300} // Set according to your design
        height={400} // Set according to your design
        onSnapToItem={(index) => setCurrentIndex(index)}
      />
      <View style={styles.button}>
        <TouchableOpacity style={styles.leftArrow} onPress={goToPrevious}>
          <Text style={styles.arrowText}>{"<"}</Text>
        </TouchableOpacity>
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
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  position: {
    fontSize: 14,
    color: "gray",
  },
  testimonial: {
    textAlign: "center",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  button: {
    position: "absolute",
    top: 350,
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
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default TestimonialCarousel;

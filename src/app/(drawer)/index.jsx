import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  BackHandler,
  Alert,
} from "react-native";
import Carsoul from "../../components/crousal";
import NoticeMarquee from "../../components/toprotater";
import TestimonialCarousel from "../../components/testimonial";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Index() {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Exit App", "Do you want to exit?", [
          { text: "Cancel", style: "cancel" },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  const topRecruiters = [
    { name: "Google", logo: "https://th.bing.com/th/id/R.1545a91f24ad97c5ee4ecd67240f426b?rik=fxdRiQf4HzS5AQ&riu=http%3a%2f%2f1.bp.blogspot.com%2f-S8KdP6dHxZc%2fUb6XjRwrRqI%2fAAAAAAAAAMk%2fMtioNEPWi_M%2fs1600%2fchrome.jpg&ehk=ddMUy15BLelPzDGjOrAxKkhBJuIL%2fnc5dhyxPv0%2bSy0%3d&risl=&pid=ImgRaw&r=0" },
    { name: "Microsoft", logo: "https://th.bing.com/th/id/OIP.PWoq1WvDQDxc_MPv4Jt0GwHaHa?rs=1&pid=ImgDetMain" },
    { name: "Amazon", logo: "https://th.bing.com/th/id/OIP.ArzNv7aQ_fdcIJhHBS_wrwHaGL?rs=1&pid=ImgDetMain" },
    { name: "Facebook", logo: "https://www.facebook.com/images/fb_icon_325x325.png" },
    { name: "Apple", logo: "https://th.bing.com/th/id/OIP.pW0TOZyl_OZMIuo5HjUsyQHaIf?rs=1&pid=ImgDetMain" },
    { name: "Netflix", logo: "https://th.bing.com/th/id/OIP.3f-gyLPI4fXP7oofglJNXQAAAA?rs=1&pid=ImgDetMain" },
  ];

  return (
    <ScrollView style={styles.container}>
      <NoticeMarquee />
      <Carsoul />

      {/* About Section */}
      <View style={styles.aboutSection}>
        <Icon name="work-outline" size={40} color="#fff" />
        <Text style={styles.aboutText}>
          🚀 Welcome to our portal, where we connect top talent with leading companies around the globe. 
          Join us today and take the next step in your career!
        </Text>
        <TouchableOpacity style={styles.exploreButton}>
          <Text style={styles.exploreButtonText}>Explore</Text>
          <Icon name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Top Recruiters Section */}
      <View style={styles.recruitersSection}>
        <Text style={styles.recruitersTitle}>🌟 Top Recruiters</Text>
        <View style={styles.recruitersGrid}>
          {topRecruiters.map((recruiter, index) => (
            <View key={index} style={styles.recruiterCard}>
              <Image source={{ uri: recruiter.logo }} style={styles.recruiterLogo} />
              <Text style={styles.recruiterName}>{recruiter.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Testimonials */}
      <Text style={styles.testimonialsTitle}>🎓 Brightest Students</Text>
      <TestimonialCarousel />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  aboutSection: {
    padding: 20,
    backgroundColor: "#007bff",
    borderRadius: 10,
    margin: 15,
    alignItems: "center",
    elevation: 5,
  },
  aboutText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
    color: "#fff",
    fontWeight: "bold",
  },
  exploreButton: {
    flexDirection: "row",
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  exploreButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  recruitersSection: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 15,
    elevation: 3,
  },
  recruitersTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    textDecorationLine: "underline",
    color: "#333",
  },
  recruitersGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  recruiterCard: {
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    elevation: 3,
  },
  recruiterLogo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginBottom: 5,
  },
  recruiterName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  testimonialsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    textDecorationLine: "underline",
    color: "#333",
  },
});


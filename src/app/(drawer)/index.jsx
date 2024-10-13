import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import Carsoul from "../../components/crousal";
import NoticeMarquee from "../../components/toprotater";
import TestimonialCarousel from "../../components/testimonial";
import { useNavigation } from "expo-router";


export default function Index() {

  const navigate = useNavigation();

  const topRecruiters = [
    { name: "Google", logo: "https://via.placeholder.com/100x50" },
    { name: "Microsoft", logo: "https://via.placeholder.com/100x50" },
    { name: "Amazon", logo: "https://via.placeholder.com/100x50" },
    { name: "Facebook", logo: "https://via.placeholder.com/100x50" },
    { name: "Apple", logo: "https://via.placeholder.com/100x50" },
    { name: "Tesla", logo: "https://via.placeholder.com/100x50" },
  ];
  return (
    <ScrollView style={styles.container}>
      <View>
        <NoticeMarquee />
        <Carsoul />
        <View style={styles.aboutSection}>
          <Text style={styles.aboutText}>
            Welcome to our portal, where we connect top talent with leading
            companies around the globe. Join us today and take the next step in
            your career!
          </Text>
          <Button color="green" title="Apply" onPress={() => {
            navigate.navigate("opening");
          }} />
        </View>
        <View style={styles.recruitersSection}>
          <Text style={styles.recruitersTitle}>Top Recruiters</Text>
          <View style={styles.recruitersGrid}>
            {topRecruiters.map((recruiter, index) => (
              <Image
                key={index}
                source={{ uri: recruiter.logo }}
                style={styles.recruiterLogo}
              />
            ))}
          </View>
        </View>
      </View>
      <TestimonialCarousel/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  aboutSection: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    marginBottom: 20,
  },
  aboutText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  recruitersSection: {
    padding: 20,
  },
  recruitersTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  recruitersGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  recruiterLogo: {
    width: 100,
    height: 50,
    marginBottom: 20,
  },
});

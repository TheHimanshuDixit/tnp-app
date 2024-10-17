import React from "react";
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

export default function Index() {

  const topRecruiters = [
    {
      name: "Google",
      logo: "https://th.bing.com/th/id/R.1545a91f24ad97c5ee4ecd67240f426b?rik=fxdRiQf4HzS5AQ&riu=http%3a%2f%2f1.bp.blogspot.com%2f-S8KdP6dHxZc%2fUb6XjRwrRqI%2fAAAAAAAAAMk%2fMtioNEPWi_M%2fs1600%2fchrome.jpg&ehk=ddMUy15BLelPzDGjOrAxKkhBJuIL%2fnc5dhyxPv0%2bSy0%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      name: "Microsoft",
      logo: "https://th.bing.com/th/id/OIP.PWoq1WvDQDxc_MPv4Jt0GwHaHa?rs=1&pid=ImgDetMain",
    },
    {
      name: "Amazon",
      logo: "https://th.bing.com/th/id/OIP.ArzNv7aQ_fdcIJhHBS_wrwHaGL?rs=1&pid=ImgDetMain",
    },
    {
      name: "Facebook",
      logo: "https://www.facebook.com/images/fb_icon_325x325.png",
    },
    {
      name: "Apple",
      logo: "https://th.bing.com/th/id/OIP.pW0TOZyl_OZMIuo5HjUsyQHaIf?rs=1&pid=ImgDetMain",
    },
    {
      name: "Netflix",
      logo: "https://th.bing.com/th/id/OIP.3f-gyLPI4fXP7oofglJNXQAAAA?rs=1&pid=ImgDetMain",
    },
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
          <Button
            color="green"
            title="Explore"
          />
        </View>
        <View style={styles.recruitersSection}>
          <Text style={styles.recruitersTitle}>Top Recruiters</Text>
          <View style={styles.recruitersGrid}>
            {topRecruiters.map((recruiter, index) => (
              <Image
                key={index}
                source={
                  typeof recruiter.logo === "string"
                    ? { uri: recruiter.logo }
                    : recruiter.logo
                }
                style={styles.recruiterLogo}
                onError={(e) =>
                  console.log("Image failed to load", e.nativeEvent.error)
                }
              />
            ))}
          </View>
        </View>
      </View>
      <Text style={styles.recruitersTitle}>Brightest Students</Text>
      <TestimonialCarousel />
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
    textDecorationLine: "underline",
  },
  recruitersGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  recruiterLogo: {
    width: 40,
    height: 40,
    marginBottom: 20,
  },
});

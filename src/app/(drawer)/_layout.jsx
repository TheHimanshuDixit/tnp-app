import React, { useContext, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import logo from "../../assets/images/logo.png";
import { useRouter } from "expo-router";
import CircularLoaderScreen from "../../components/circularLoader";
import { AuthContext } from "../../context/authContext";

export default function Layout() {
  const { token, refresh, removeToken } = useContext(AuthContext);
  const [profilePic, setProfilePic] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileName, setProfileName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        setLoading(true);
        try {
          const res = await fetch("http://10.0.2.2:4000/api/auth/profile", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          });

          const data = await res.json();
          if (data) {
            setLoading(false);
            setProfilePic(data.image);
            setProfileEmail(data.email);
            setProfileName(data.name);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchProfile();
  }, [token, refresh]);
  return loading ? (
    <CircularLoaderScreen />
  ) : (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => (
          <CustomDrawerContent
            {...props}
            profilePic={profilePic}
            profileEmail={profileEmail}
            profileName={profileName}
            removeToken={removeToken}
          />
        )}>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            title: "JIIT - Training & Placement",
            headerShown: true,
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="myProfile"
          options={{
            drawerLabel: "My Profile",
            title: "My Profile",
            headerShown: true,
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
          initialParams={{ token }}
        />
        <Drawer.Screen
          name="myAttendence"
          options={{
            drawerLabel: "My Attendance",
            title: "My Attendance",
            headerShown: true,
            drawerIcon: ({ color, size }) => (
              <Ionicons name="calendar-outline" size={size} color={color} />
            ),
          }}
          initialParams={{ token }}
        />
        <Drawer.Screen
          name="opening"
          options={{
            drawerLabel: "Openings",
            title: "Job & Internship",
            headerShown: true,
            drawerIcon: ({ color, size }) => (
              <Ionicons name="briefcase-outline" size={size} color={color} />
            ),
          }}
          initialParams={{ token }}
        />
        <Drawer.Screen
          name="myApplication"
          options={{
            drawerLabel: "My Applications",
            title: "My Applications",
            headerShown: true,
            drawerIcon: ({ color, size }) => (
              <Ionicons
                name="document-text-outline"
                size={size}
                color={color}
              />
            ),
          }}
          initialParams={{ token }}
        />
        <Drawer.Screen
          name="team"
          options={{
            drawerLabel: "T&P Team",
            title: "T&P Team",
            headerShown: true,
            drawerIcon: ({ color, size }) => (
              <Ionicons name="people-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="contact"
          options={{
            drawerLabel: "Contact Us",
            title: "Contact Us",
            headerShown: true,
            drawerIcon: ({ color, size }) => (
              <Ionicons name="call-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

function CustomDrawerContent(props) {
  const router = useRouter();
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 20 }}>
        <Image
          source={props.profilePic ? { uri: props.profilePic } : logo}
          style={{
            width: 50,
            height: 50,
            marginRight: 5,
            marginLeft: -8,
            borderRadius: 50,
          }} // Circular image
          resizeMode={"contain"}
        />
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>
            {props.profileName || "User Name"}
          </Text>
          <Text style={{ color: "#666" }}>
            {props.profileEmail || "user@example.com"}
          </Text>
        </View>
      </View>

      <DrawerItemList {...props} />

      <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 20 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#e63946",
            marginHorizontal: 20,
            padding: 10,
            borderRadius: 5,
            alignItems: "center",
          }}
          onPress={() => {
            Alert.alert("Logout", "Are you sure you want to logout?", [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "OK",
                onPress: async () => {
                  await props.removeToken();
                  console.log("OK Pressed");
                  router.navigate("/logIn");
                },
              },
            ]);
          }}>
          <Text style={{ color: "white", fontSize: 16 }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

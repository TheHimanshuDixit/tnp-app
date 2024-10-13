import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import logo from "../../assets/images/logo.png";
import { useRouter } from "expo-router";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
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
          name="myprofile"
          options={{
            drawerLabel: "My Profile",
            title: "My Profile",
            headerShown: true,
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="myattendence"
          options={{
            drawerLabel: "My Attendance",
            title: "My Attendance",
            headerShown: true,
            drawerIcon: ({ color, size }) => (
              <Ionicons name="calendar-outline" size={size} color={color} />
            ),
          }}
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
        />
        <Drawer.Screen
          name="myapplication"
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
          source={logo}
          style={{ width: 50, height: 50, marginRight: 10 }} // Circular image
          resizeMode={"contain"}
        />
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>
            User Name
          </Text>
          <Text style={{ color: "#666" }}>user@example.com</Text>
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
            router.push("/login");
          }}>
          <Text style={{ color: "white", fontSize: 16 }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

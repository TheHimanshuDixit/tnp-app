// src/app/_layout.jsx
import React, { useEffect, useCallback } from "react";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import {
  Poppins_400Regular as reg,
  Poppins_400Regular_Italic as ita,
  useFonts,
} from "@expo-google-fonts/poppins";
import { AuthProvider } from "../context/authContext"; // Import the AuthProvider

// Prevent splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const [fontsLoaded, fontError] = useFonts({ reg, ita });

  const hideSplashScreen = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    hideSplashScreen();
  }, [hideSplashScreen]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AuthProvider>
      <Drawer screenOptions={{ headerShown: false }}>
        {["index", "(drawer)", "signUp", "forgotPassword"].map((screen) => (
          <Drawer.Screen
            key={screen}
            name={screen}
            options={{ headerShown: false }}
          />
        ))}
      </Drawer>
    </AuthProvider>
  );
};

export default Layout;

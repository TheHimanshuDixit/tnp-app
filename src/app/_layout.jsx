// src/app/_layout.jsx
import React, { useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import {
  Poppins_400Regular as reg,
  Poppins_400Regular_Italic as ita,
  useFonts,
} from "@expo-google-fonts/poppins";
import { AuthProvider } from "./AuthContext"; // Import the AuthProvider

SplashScreen.preventAutoHideAsync();

const _layout = () => {
  const [loaded, error] = useFonts({
    reg,
    ita,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <Drawer
        screenOptions={{
          headerShown: false,
        }}>
        <Drawer.Screen name="index" options={{ headerShown: false }} />
        <Drawer.Screen name="(drawer)" options={{ headerShown: false }} />
        <Drawer.Screen name="signup" options={{ headerShown: false }} />
        <Drawer.Screen name="forgotpassword" options={{ headerShown: false }} />
      </Drawer>
    </AuthProvider>
  );
};

export default _layout;

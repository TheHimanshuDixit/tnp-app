import React, { useEffect, useState } from "react";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import {
  Poppins_400Regular as reg,
  Poppins_400Regular_Italic as ita,
  useFonts,
} from "@expo-google-fonts/poppins";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();
const _layout = () => {
  const [token, setToken] = useState("");

  const storeToken = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      setToken(value);
    } catch (error) {
      console.error("Error saving data", error);
    }
  };
  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.error("Error retrieving data", error);
    }
  };
  useEffect(() => {
    const checkToken = async () => {
      const t = await getData("authToken");
      if (t) {
        setToken(t);
      }
    };
    checkToken();
  }, []);

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
    <Drawer
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen
        name="index"
        options={{ headerShown: false }}
        initialParams={{ token, storeToken }}
      />
      <Drawer.Screen
        name="(drawer)"
        options={{ headerShown: false }}
        initialParams={{ token }}
      />
      <Drawer.Screen
        name="signup"
        options={{ headerShown: false }}
        initialParams={{ storeToken }}
      />
      <Drawer.Screen name="forgotpassword" options={{ headerShown: false }} />
    </Drawer>
  );
};

export default _layout;

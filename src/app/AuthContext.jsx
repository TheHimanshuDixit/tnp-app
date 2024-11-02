// src/app/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("authToken");
      if (value) {
        setToken(value);
      }
    } catch (error) {
      console.error("Error retrieving data", error);
    }
  };

  const storeToken = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      setToken(value);
    } catch (error) {
      console.error("Error saving data", error);
    }
  };

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      setToken("");
    } catch (error) {
      console.error("Error removing data", error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, storeToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

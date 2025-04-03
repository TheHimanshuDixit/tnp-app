// src/app/AuthContext.js
import React, { createContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const [token, setToken] = useState("");

  // Fetch token from storage on app load
  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("authToken");
        if (storedToken) setToken(storedToken);
      } catch (error) {
        console.error("Error retrieving token:", error);
      }
    };

    getToken();
  }, []);

  // Store token securely
  const storeToken = useCallback(async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      setToken(value);
    } catch (error) {
      console.error("Error saving token:", error);
    }
  }, []);

  // Remove token on logout
  const removeToken = useCallback(async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      setToken("");
    } catch (error) {
      console.error("Error removing token:", error);
    }
  }, []);

  const contextValue = React.useMemo(() => ({ token, storeToken, removeToken }), [token, storeToken, removeToken]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

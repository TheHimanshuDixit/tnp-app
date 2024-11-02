import React, { useEffect, useState } from "react";
import LoadingScreen from "../components/loading";
import Login from "./login";
import { useRoute } from "@react-navigation/native";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const index = () => {
  const route = useRoute();
  const { token, storeToken } = route.params || {};
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <Login token={token} storeToken={storeToken} />;
};

export default index;

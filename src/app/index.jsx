import React, { useEffect, useState } from "react";
import LoadingScreen from "../components/loading";
import Login from "./login";

const index = () => {
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

  return <Login />;
};

export default index;

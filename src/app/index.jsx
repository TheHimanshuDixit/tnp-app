import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LoadingScreen from "../components/loading";
import Login from "./logIn";

const IndexScreen = ({ loadingTime = 3000 }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), loadingTime);
    return () => clearTimeout(timer);
  }, [loadingTime]);

  return isLoading ? <LoadingScreen /> : <Login />;
};
IndexScreen.propTypes = {
  loadingTime: PropTypes.number,
};

export default IndexScreen;

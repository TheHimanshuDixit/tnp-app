import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import CircularLoaderScreen from "../components/circularLoader";
import { AuthContext } from "../context/authContext";
import PropTypes from "prop-types";

const PasswordInput = ({
  value,
  onChangeText,
  isVisible,
  toggleVisibility,
}) => (
  <View style={styles.passwordContainer}>
    <TextInput
      style={styles.inputPassword}
      placeholder="Password"
      placeholderTextColor="#888"
      secureTextEntry={!isVisible}
      value={value}
      onChangeText={onChangeText}
    />
    <TouchableOpacity style={styles.togglePassword} onPress={toggleVisibility}>
      <Icon name={isVisible ? "eye" : "eye-slash"} size={20} color="#888" />
    </TouchableOpacity>
  </View>
);
PasswordInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
};

const LogInScreen = () => {
  const { token, storeToken } = useContext(AuthContext);
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect to home if already authenticated
  useEffect(() => {
    if (token) navigation.navigate("(drawer)");
  }, [token]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://10.0.2.2:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success === "success") {
        await storeToken("authToken", data.authToken);
        Alert.alert("Login successful");
        navigation.navigate("(drawer)");
      } else {
        Alert.alert("Login failed", data.message || "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  return loading ? (
    <CircularLoaderScreen />
  ) : (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <PasswordInput
        value={password}
        onChangeText={setPassword}
        isVisible={isPasswordVisible}
        toggleVisibility={() => setPasswordVisible((prev) => !prev)}
      />

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => navigation.navigate("forgotpassword")}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Signup Navigation */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("signup")}>
          <Text style={styles.signupLink}> Create one</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  inputPassword: { flex: 1, height: 50, fontSize: 16, color: "#333" },
  togglePassword: { padding: 10 },
  forgotPasswordText: {
    color: "#007bff",
    fontSize: 16,
    textAlign: "right",
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  loginButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: { fontSize: 16, color: "#333" },
  signupLink: { fontSize: 16, color: "#007bff", fontWeight: "bold" },
});

export default LogInScreen;

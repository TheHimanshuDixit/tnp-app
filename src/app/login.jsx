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
import { AuthContext } from "./AuthContext";

const Login = () => {
  const { token, storeToken, removeToken } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigator = useNavigation();

  useEffect(() => {
    if (token) {
      navigator.navigate("(drawer)");
    }
  }, []);

  const handleLogin = async (e) => {
    setLoading(true);
    const response = await fetch(
      "https://placement-portall.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();
    if (data.message === "success") {
      await storeToken("authToken", data.authToken);
      setLoading(false);
      setEmail("");
      setPassword("");
      Alert.alert("Login successful");
      navigator.navigate("(drawer)");
    } else {
      Alert.alert("Login failed");
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigator.navigate("forgotpassword");
  };
  const handleSignup = () => {
    navigator.navigate("signup"); // Navigate to Signup screen
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
        onChangeText={(text) => setEmail(text)}
      />

      {/* Password Input */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry={hidePassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.togglePassword}
          onPress={() => setHidePassword(!hidePassword)}>
          <Icon
            name={hidePassword ? "eye-slash" : "eye"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText} onPress={handleLogin}>
          Login
        </Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={handleSignup}>
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
    color: "#333",
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
  inputPassword: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  togglePassword: {
    padding: 10,
  },
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
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: {
    fontSize: 16,
    color: "#333",
  },
  signupLink: {
    fontSize: 16,
    color: "#007bff",
    fontWeight: "bold",
  },
});

export default Login;

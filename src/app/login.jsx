import React, { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const navigator = useNavigation();

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error("Error saving data", error);
    }
  };

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // Data found
        return value;
      }
    } catch (error) {
      console.error("Error retrieving data", error);
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = await getData("authToken");
      if (token) {
        navigator.navigate("(drawer)");
      }
    };
    checkToken();
  }, []);

  const handleLogin = async (e) => {
    // e.preventDefault();
    console.log(email, password);
    const response = await fetch("http://192.168.29.206:4000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.message === "success") {
      storeData("authToken", data.authToken);
      Alert.alert("Login successful");
      navigator.navigate("(drawer)");
    } else {
      Alert.alert("Login failed");
    }
  };

  const handleForgotPassword = () => {
    navigator.navigate("forgotpassword");
  };
  const handleSignup = () => {
    navigator.navigate("signup"); // Navigate to Signup screen
  };
  return (
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

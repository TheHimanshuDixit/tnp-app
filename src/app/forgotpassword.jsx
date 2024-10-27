import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"; // Import Ionicons for the eye icon

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1); // 1: Email input, 2: OTP and Passwords
  const [isPasswordVisible, setPasswordVisible] = useState(false); // Toggle for new password visibility
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // Toggle for confirm password visibility
  const navigator = useNavigation();
  const [otpSent, setOtpSent] = useState("");

  const handleSendResetLink = async (e) => {
    // Here you can add the logic to send the reset link (e.g., API call)
    e.preventDefault();
    const data = await fetch("http://192.168.29.206:4000/api/auth/forgot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const response = await data.json();
    if (response.message === "Email sent") {
      setOtpSent(response.otp);
      setStep(2);
      setNewPassword("");
      setConfirmPassword("");
      setOtp("");
    }
  };

  const handleChangePassword = async (e) => {
    setStep(1); // Reset to step 1
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }
    if (
      otp === "" ||
      oldPassword === "" ||
      newPassword === "" ||
      confirmPassword === ""
    ) {
      Alert.alert("Error", "Please fill in all fields!");
      return;
    }
    if (parseInt(otp) !== parseInt(otpSent)) {
      Alert.alert("Error", "Invalid OTP!");
      return;
    }
    const data = await fetch(
      "http://192.168.29.206:4000/api/auth/updatepassword",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      }
    );
    const response = await data.json();
    if (response.message === "success") {
      Alert.alert("Success", "Your password has been changed!");
      navigator.navigate("index");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        {step === 1
          ? "Enter your email address below and we'll send you a link to reset your password."
          : "Enter the OTP sent to your email and create a new password."}
      </Text>

      {step === 1 ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleSendResetLink}>
            <Text style={styles.resetButtonText}>Send Reset Link</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="OTP"
            placeholderTextColor="#888"
            value={otp}
            onChangeText={(text) => setOtp(text)}
          />

          {/* New Password Input with Show/Hide functionality */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="New Password"
              placeholderTextColor="#888"
              secureTextEntry={!isPasswordVisible} // Toggle visibility
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setPasswordVisible(!isPasswordVisible)}>
              <Ionicons
                name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="#888"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password Input with Show/Hide functionality */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm Password"
              placeholderTextColor="#888"
              secureTextEntry={!isConfirmPasswordVisible} // Toggle visibility
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() =>
                setConfirmPasswordVisible(!isConfirmPasswordVisible)
              }>
              <Ionicons
                name={
                  isConfirmPasswordVisible ? "eye-off-outline" : "eye-outline"
                }
                size={24}
                color="#888"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleChangePassword}>
            <Text style={styles.resetButtonText}>Change Password</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          setStep(1);
          navigator.navigate("index");
        }}>
        <Text style={styles.backButtonText}>Back to Login</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#555",
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
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    color: "#333",
    fontSize: 16,
  },
  eyeIcon: {
    paddingHorizontal: 15,
  },
  resetButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 15,
    alignItems: "center",
  },
  backButtonText: {
    color: "#007bff",
    fontSize: 16,
  },
});

export default ForgotPasswordScreen;

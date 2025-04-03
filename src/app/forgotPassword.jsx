import { useNavigation } from "expo-router";
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"; // Import Ionicons for eye icons
import CircularLoaderScreen from "../components/circularLoader";
import PropTypes from "prop-types";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1); // 1: Email input, 2: OTP & Passwords
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [otpSent, setOtpSent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigator = useNavigation();

  // Function to send the reset email
  const handleSendResetLink = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("http://10.0.2.2:4000/api/auth/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data.success === "success") {
        setOtpSent(data.otp);
        setStep(2);
        setNewPassword("");
        setConfirmPassword("");
        setOtp("");
      } else {
        Alert.alert("Error", "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Something went wrong. Please check your connection."
      );
    } finally {
      setLoading(false);
    }
  }, [email]);

  // Function to change the password
  const handleChangePassword = useCallback(async () => {
    if (!otp || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields!");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    if (parseInt(otp) !== parseInt(otpSent)) {
      Alert.alert("Error", "Invalid OTP!");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "http://10.0.2.2:4000/api/auth/updatepassword",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword }),
        }
      );

      const data = await response.json();
      if (data.success === "success") {
        Alert.alert("Success", "Your password has been changed!");
        navigator.navigate("index");
      } else {
        Alert.alert("Error", "Password update failed. Please try again.");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Something went wrong. Please check your connection."
      );
    } finally {
      setLoading(false);
    }
  }, [otp, newPassword, confirmPassword, otpSent, email, navigator]);

  // Common Password Input Field with Visibility Toggle
  const PasswordInput = ({
    placeholder,
    value,
    onChange,
    isVisible,
    toggleVisibility,
  }) => (
    <View style={styles.passwordContainer}>
      <TextInput
        style={styles.passwordInput}
        placeholder={placeholder}
        placeholderTextColor="#888"
        secureTextEntry={!isVisible}
        value={value}
        onChangeText={onChange}
      />
      <TouchableOpacity style={styles.eyeIcon} onPress={toggleVisibility}>
        <Ionicons
          name={isVisible ? "eye-off-outline" : "eye-outline"}
          size={24}
          color="#888"
        />
      </TouchableOpacity>
    </View>
  );
  PasswordInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
    toggleVisibility: PropTypes.func.isRequired,
  };

  return loading ? (
    <CircularLoaderScreen />
  ) : (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        {step === 1
          ? "Enter your email address below and we'll send you an OTP."
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
            onChangeText={setEmail}
          />

          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleSendResetLink}>
            <Text style={styles.resetButtonText}>Send OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="OTP"
            placeholderTextColor="#888"
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
          />

          <PasswordInput
            placeholder="New Password"
            value={newPassword}
            onChange={setNewPassword}
            isVisible={isPasswordVisible}
            toggleVisibility={() => setIsPasswordVisible(!isPasswordVisible)}
          />

          <PasswordInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            isVisible={isConfirmPasswordVisible}
            toggleVisibility={() =>
              setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
            }
          />

          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleChangePassword}>
            <Text style={styles.resetButtonText}>Change Password</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigator.navigate("index")}>
        <Text style={styles.backButtonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
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
    fontSize: 16,
    color: "#333",
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
    fontSize: 16,
    color: "#333",
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

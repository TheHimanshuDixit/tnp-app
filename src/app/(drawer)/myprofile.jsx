import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { ScrollView } from "react-native-gesture-handler";

const MyProfile = () => {
  const [profile, setProfile] = useState({
    enroll: "123456789",
    coverletter: "This is a sample cover letter.",
    email: "sample@example.com",
    college: "Sample College",
    phone: "123-456-7890",
    branch: "Computer Science",
    gender: "Male",
    year: "Final",
    cgpa: "9.2",
    backlogs: "0",
  });

  const [fname, setFname] = useState("John");
  const [lname, setLname] = useState("Doe");
  const [resume, setResume] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePhoto(result.assets[0].uri);
    }
  };

  const handleResumePicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf", // You can change this to allow other types of documents
      copyToCacheDirectory: true,
    });

    if (result.type === "success") {
      setResume(result);
    } else {
      Alert.alert("Resume selection was canceled.");
    }
  };

  const handleChange = (name, value) => {
    setProfile({ ...profile, [name]: value });
    if (name === "fname") setFname(value);
    if (name === "lname") setLname(value);
  };

  const handleSave = () => {
    Alert.alert("Profile updated successfully");
    // Implement save logic or state management as needed
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
          My Profile
        </Text>

        {/* Profile Photo Section */}
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <TouchableOpacity onPress={handleImagePicker}>
            <Image
              source={
                profilePhoto
                  ? { uri: profilePhoto }
                  : require("../../assets/images/Himanshu.jpg") // replace with your placeholder image
              }
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          </TouchableOpacity>
          <Text>Tap to change photo</Text>
        </View>

        <TextInput
          placeholder="Enrollment Number"
          value={profile.enroll}
          onChangeText={(value) => handleChange("enroll", value)}
          style={{
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          }}
          editable={false}
        />

        <TextInput
          placeholder="Cover Letter"
          value={profile.coverletter}
          onChangeText={(value) => handleChange("coverletter", value)}
          style={{
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          }}
          multiline
          maxLength={200}
        />

        <TextInput
          placeholder="First Name"
          value={fname}
          onChangeText={(value) => handleChange("fname", value)}
          style={{
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          }}
        />

        <TextInput
          placeholder="Last Name"
          value={lname}
          onChangeText={(value) => handleChange("lname", value)}
          style={{
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          }}
        />

        <TextInput
          placeholder="Email"
          value={profile.email}
          onChangeText={(value) => handleChange("email", value)}
          style={{
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          }}
          editable={false}
        />

        <TextInput
          placeholder="College"
          value={profile.college}
          onChangeText={(value) => handleChange("college", value)}
          style={{
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          }}
        />

        <TextInput
          placeholder="Phone"
          value={profile.phone}
          onChangeText={(value) => handleChange("phone", value)}
          style={{
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          }}
        />

        <TextInput
          placeholder="Branch"
          value={profile.branch}
          onChangeText={(value) => handleChange("branch", value)}
          style={{
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          }}
        />

        <TextInput
          placeholder="Year"
          value={profile.year}
          onChangeText={(value) => handleChange("year", value)}
          style={{
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          }}
        />

        <TextInput
          placeholder="CGPA"
          value={profile.cgpa}
          onChangeText={(value) => handleChange("cgpa", value)}
          style={{
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          }}
        />

        <TextInput
          placeholder="Backlogs"
          value={profile.backlogs}
          onChangeText={(value) => handleChange("backlogs", value)}
          style={{
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          }}
        />

        <TextInput
          placeholder="Gender"
          value={profile.gender}
          onChangeText={(value) => handleChange("gender", value)}
          style={{
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          }}
        />

        {/* Resume Section */}
        <View style={{ marginVertical: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            My Resume
          </Text>
          <TouchableOpacity onPress={handleResumePicker}>
            <Text style={{ color: "blue" }}>
              {resume ? resume.name : "Select Resume"}
            </Text>
          </TouchableOpacity>
        </View>

        <Button title="Save" onPress={handleSave} />
      </View>
    </ScrollView>
  );
};

export default MyProfile;

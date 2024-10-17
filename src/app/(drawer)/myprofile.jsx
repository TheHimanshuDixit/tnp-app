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
    enroll: "",
    coverletter: "",
    email: "",
    college: "",
    phone: "",
    branch: "",
    gender: "",
    year: "",
    cgpa: "",
    backlogs: "",
  });

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [resume, setResume] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://10.0.2.2:4000/api/auth/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjQxM2E4NGRkMzY1MTc0NGY5ZDI2MyIsImlhdCI6MTcyOTExMjk5OCwiZXhwIjoxNzI5MTk5Mzk4fQ.8VZhYaCOCTBtwOUWIjHnMkAGOpxz1_hye-4pEUq_l64",
          },
        });

        const data = await res.json();
        setProfile({
          enroll: data.enrollnment,
          coverletter: data.coverletter,
          email: data.email,
          college: data.college,
          phone: data.phoneno,
          branch: data.branch,
          gender: data.gender,
          year: data.year,
          cgpa: data.cgpa,
          backlogs: data.backlogs,
        });
        setResume(data.resume);
        setFname(data.name.split(" ")[0]);
        setLname(data.name.split(" ")[1]);
        setProfilePhoto(data.image); // Load profile image from the backend
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

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

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", `${fname} ${lname}`);
      formData.append("email", profile.email);
      formData.append("enroll", profile.enroll);
      formData.append("coverletter", profile.coverletter);
      formData.append("college", profile.college);
      formData.append("phone", profile.phone);
      formData.append("branch", profile.branch);
      formData.append("year", profile.year);
      formData.append("cgpa", profile.cgpa);
      formData.append("backlogs", profile.backlogs);
      formData.append("gender", profile.gender);
      if (resume) {
        formData.append("resume", {
          uri: resume.uri,
          type: "application/pdf",
          name: resume.name,
        });
      }
      if (profilePhoto) {
        formData.append("profilePhoto", {
          uri: profilePhoto,
          type: "image/jpeg",
          name: "profile.jpg",
        });
      }

      const res = await fetch("http://10.0.2.2:4000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjQxM2E4NGRkMzY1MTc0NGY5ZDI2MyIsImlhdCI6MTcyOTExMjk5OCwiZXhwIjoxNzI5MTk5Mzk4fQ.8VZhYaCOCTBtwOUWIjHnMkAGOpxz1_hye-4pEUq_l64",
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        Alert.alert("Profile updated successfully");
      } else {
        Alert.alert("Failed to update profile", data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("An error occurred while updating the profile.");
    }
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
                  : {
                      uri: "https://th.bing.com/th/id/OIP.PoS7waY4-VeqgNuBSxVUogAAAA?rs=1&pid=ImgDetMain",
                    }
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

        {/* Additional fields for gender, year, CGPA, backlogs */}
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

        {/* Resume Upload Section */}
        <View style={{ marginBottom: 20 }}>
          <Button title="Upload Resume" onPress={handleResumePicker} />
          {resume && <Text>Resume uploaded: {resume.name}</Text>}
        </View>

        <Button title="Save" onPress={handleSave} />
      </View>
    </ScrollView>
  );
};

export default MyProfile;

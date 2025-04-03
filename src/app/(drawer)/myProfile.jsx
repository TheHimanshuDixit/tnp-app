import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { ScrollView } from "react-native-gesture-handler";
import { WebView } from "react-native-webview";
import CircularLoaderScreen from "../../components/circularLoader";
import { AuthContext } from "../../context/authContext";

const MyProfile = () => {
  const { token } = useContext(AuthContext);
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
  const [getResume, setGetResume] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [getProfile, setGetProfile] = useState(null);
  const [resumeModalVisible, setResumeModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        setLoading(true);
        try {
          const res = await fetch("http://10.0.2.2:4000/api/auth/profile", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          });

          const data = await res.json();
          setLoading(false);
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
          setGetResume(data.resume);
          setFname(data.name.split(" ")[0]);
          setLname(data.name.split(" ")[1]);
          setGetProfile(data.image);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchProfile();
  }, [token]);

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

    // console.log(result);

    if (!result.canceled) {
      setProfilePhoto(result);
      setGetProfile(result.assets[0].uri);
    }
  };

  const handleResumePicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf", // You can change this to allow other types of documents
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
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
    setLoading(true);
    if (token) {
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
            uri: resume.assets[0].uri,
            type: resume.assets[0].mimeType,
            name: resume.assets[0].name,
          });
        }
        if (profilePhoto) {
          formData.append("image", {
            uri: profilePhoto.assets[0].uri,
            type: profilePhoto.assets[0].mimeType,
            name: profilePhoto.assets[0].fileName,
          });
        }

        const res = await fetch("http://10.0.2.2:4000/api/auth/profile", {
          method: "POST",
          headers: {
            "auth-token": token,
          },
          body: formData,
        });

        const data = await res.json();
        if (data.success === "success") {
          setGetResume(data.data.resume);
          setGetProfile(data.data.image);
          setLoading(false);
          Alert.alert("Profile updated successfully");
        } else {
          setLoading(false);
          Alert.alert("Failed to update profile", data.success);
          setProfilePhoto(null);
          setResume(null);
        }
      } catch (error) {
        console.log(error);
        Alert.alert("An error occurred while updating the profile.");
        setProfilePhoto(null);
        setResume(null);
      }
    } else {
      Alert.alert("Please login to update the profile");
    }
  };

  return loading ? (
    <CircularLoaderScreen />
  ) : (
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
                getProfile
                  ? { uri: getProfile }
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
          {resume && <Text>Resume Uploaded</Text>}
          {getResume && (
            <TouchableOpacity onPress={() => setResumeModalVisible(true)}>
              <Text style={{ color: "blue", textDecorationLine: "underline" }}>
                View uploaded resume
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <Modal
          visible={resumeModalVisible}
          animationType="slide"
          transparent={false}
          onRequestClose={() => setResumeModalVisible(false)}>
          <View style={styles.modalContainer}>
            <Button
              title="Close"
              onPress={() => setResumeModalVisible(false)}
            />
            {getResume && (
              <WebView
                source={{ uri: getResume }}
                style={{ flex: 1 }}
                javaScriptEnabled={true}
              />
            )}
          </View>
        </Modal>

        <Button title="Save" onPress={handleSave} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
});

export default MyProfile;

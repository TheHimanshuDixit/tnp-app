import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { WebView } from "react-native-webview";
import CircularLoaderScreen from "./circularLoader";
import PropTypes from "prop-types";

const ApplyJobModal = ({
  applyModalVisible,
  setApplyModalVisible,
  selectedJob,
  allCompanies,
  token,
  refresh,
  setRefresh,
}) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    enrollment: "",
    phone: "",
    branch: "",
    cgpa: "",
    gender: "",
  });
  const [placed, setPlaced] = useState(false);
  const [studentPackage, setStudentPackage] = useState("0");
  const [resume, setResume] = useState(null);
  const [getResume, setGetResume] = useState(null);
  const [resumeModalVisible, setResumeModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (!result.canceled) {
      setResume(result);
    }
  };

  const handleSubmit = async () => {
    // handle form submission logic headers
    setLoading(true);
    if (token) {
      if (
        form.cgpa >= selectedJob.cgpacritera &&
        (placed === false ||
          (placed === true &&
            parseInt(studentPackage) >= 1.8 * parseInt(selectedJob.ctc)))
      ) {
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("email", form.email);
        if (resume) {
          formData.append("resume", {
            uri: resume.assets[0].uri,
            type: resume.assets[0].mimeType,
            name: resume.assets[0].name,
          });
        } else {
          formData.append("resume", getResume);
        }
        formData.append("enroll", form.enrollment);
        formData.append("gender", form.gender);
        formData.append("phone", form.phone);
        formData.append("branch", form.branch);
        const response = await fetch(
          `http://10.0.2.2:4000/api/application/add/${selectedJob._id}`,
          {
            method: "POST",
            headers: {
              "auth-token": token,
            },
            body: formData,
          }
        );
        const data = await response.json();
        if (data.success === "success") {
          setLoading(false);
          setRefresh((prev) => !prev);
          Alert.alert("Applied Successfully");
        } else {
          setLoading(false);
          Alert.alert("Already Applied");
        }
      } else {
        setLoading(false);
        Alert.alert("You are not eligible for this job");
      }
    }
    setApplyModalVisible(false);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        setLoading(true);
        try {
          const res = await fetch("http://10.0.2.2:4000/api/auth/profile", {
            method: "GET",
            headers: {
              "auth-token": token,
            },
          });

          const data = await res.json();
          setForm({
            name: data.name,
            email: data.email,
            enrollment: data.enrollnment,
            phone: data.phoneno,
            branch: data.branch,
            cgpa: data.cgpa,
            gender: data.gender,
          });
          setPlaced(data.placed);
          setGetResume(data.resume);
          setLoading(false);
          for (const company of allCompanies) {
            if (
              data.companys.includes(company._id) &&
              parseInt(company.ctc) > parseInt(studentPackage)
            ) {
              setStudentPackage(company.ctc);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchProfile();
  }, [token, refresh]);

  return loading ? (
    <CircularLoaderScreen />
  ) : (
    <Modal
      animationType="slide"
      transparent={true}
      visible={applyModalVisible}
      onRequestClose={() => {
        setApplyModalVisible(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Fill all Details</Text>

            <TextInput
              style={styles.input}
              placeholder="Name"
              value={form.name}
              onChangeText={(text) => handleInputChange("name", text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Email address"
              value={form.email}
              keyboardType="email-address"
              onChangeText={(text) => handleInputChange("email", text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Enrollment"
              value={form.enrollment}
              onChangeText={(text) => handleInputChange("enrollment", text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={form.phone}
              keyboardType="phone-pad"
              onChangeText={(text) => handleInputChange("phone", text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Branch"
              value={form.branch}
              onChangeText={(text) => handleInputChange("branch", text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Gender"
              value={form.gender}
              onChangeText={(text) => handleInputChange("gender", text)}
            />

            <TouchableOpacity
              style={styles.fileUploadButton}
              onPress={pickDocument}>
              <Text style={styles.fileUploadText}>Upload New Resume</Text>
            </TouchableOpacity>
            {resume && (
              <Text style={styles.fileUploadText}>Resume uploaded</Text>
            )}
            <Text style={styles.fileUploadText}>
              {getResume && (
                <TouchableOpacity onPress={() => setResumeModalVisible(true)}>
                  <Text
                    style={{
                      color: "blue",
                      textDecorationLine: "underline",
                    }}>
                    View Resume
                  </Text>
                </TouchableOpacity>
              )}
            </Text>

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

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonClose}>
                <Text
                  style={styles.buttonText}
                  onPress={() => setApplyModalVisible(false)}>
                  CANCEL
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonApply}
                onPress={handleSubmit}>
                <Text style={styles.buttonText}>APPLY</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  modalView: {
    width: "90%",
    margin: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    padding: 20,
    flexGrow: 1,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  fileUploadButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    alignItems: "center",
  },
  fileUploadText: {
    color: "#333",
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonClose: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  buttonApply: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
ApplyJobModal.propTypes = {
  applyModalVisible: PropTypes.bool.isRequired,
  setApplyModalVisible: PropTypes.func.isRequired,
  selectedJob: PropTypes.object.isRequired,
  allCompanies: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
  refresh: PropTypes.bool.isRequired,
  setRefresh: PropTypes.func.isRequired,
};

export default ApplyJobModal;

import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

const ApplyJobModal = ({
  applyModalVisible,
  setApplyModalVisible,
  selectedJob,
}) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    enrollment: "",
    phone: "",
    branch: "",
    gender: "",
    resume: null,
  });

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === "success") {
      setForm({ ...form, resume: result });
    }
  };

  const handleSubmit = () => {
    // handle form submission logic here
    console.log("Form Data:", form);
    setApplyModalVisible(false);
  };
  return (
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
              <Text style={styles.fileUploadText}>
                {form.resume ? form.resume.name : "Choose File"}
              </Text>
            </TouchableOpacity>

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

export default ApplyJobModal;
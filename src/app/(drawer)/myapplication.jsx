import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; 

const Myapplications = () => {
  const [applications, setApplications] = useState([
    {
      id: "1",
      companyName: "Google",
      jobTitle: "Software Engineer",
      applicationDate: "2024-09-15",
    },
    {
      id: "2",
      companyName: "Facebook",
      jobTitle: "Data Scientist",
      applicationDate: "2024-09-12",
    },
  ]);

  const [viewCompany, setViewCompany] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = (company) => {
    setViewCompany(company);
    setModalVisible(true);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text style={styles.index}>{index + 1}.</Text>
      <Text style={styles.companyName}>{item.companyName}</Text>
      <Text style={styles.jobTitle}>{item.jobTitle}</Text>
      <Text style={styles.applicationDate}>{item.applicationDate}</Text>
      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => handleOpenModal(item)}>
        <Icon name="eye" size={20} color="#fff" /> 
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Applications</Text>
      <Text style={styles.subtitle}>
        Please review the status of your applications.
      </Text>
      <FlatList
        data={applications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Company Details</Text>
            <Text style={styles.modalItem}>
              Name: {viewCompany.companyName}
            </Text>
            <Text style={styles.modalItem}>
              Job Title: {viewCompany.jobTitle}
            </Text>
            <Text style={styles.modalItem}>
              Application Date: {viewCompany.applicationDate}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  index: {
    fontWeight: "bold",
    marginRight: 10,
  },
  companyName: {
    fontSize: 16,
    flex: 1,
  },
  jobTitle: {
    fontSize: 14,
    color: "#888",
    flex: 1,
  },
  applicationDate: {
    fontSize: 14,
    color: "#888",
    flex: 1,
  },
  viewButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    width: 40, // Adjust button size
    height: 40,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalItem: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-end",
  },
});

export default Myapplications;

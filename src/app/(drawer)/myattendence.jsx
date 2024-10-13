import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
} from "react-native";
import { Table, Row } from "react-native-table-component";

const PlacementAttendance = () => {
  // Dummy data for companies and their attendance
  const [companies] = useState([
    { id: "1", name: "Company A" },
    { id: "2", name: "Company B" },
    { id: "3", name: "Company C" },
  ]);

  const [attendanceData, setAttendanceData] = useState({
    "Company A": [
      { event: "PPT", date: "2024-10-01", status: "Present" },
      { event: "OA", date: "2024-10-02", status: "Absent" },
      { event: "Interviews", date: "2024-10-03", status: "Present" },
    ],
    "Company B": [
      { event: "PPT", date: "2024-10-04", status: "Present" },
      { event: "OA", date: "2024-10-05", status: "Absent" },
    ],
    "Company C": [
      { event: "Interviews", date: "2024-10-06", status: "Present" },
    ],
  });

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openAttendanceModal = (company) => {
    setSelectedCompany(company);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedCompany(null);
    setModalVisible(false);
  };

  const renderAttendanceTable = () => {
    const data = attendanceData[selectedCompany] || [];
    const tableHead = ["Event", "Date", "Status"];
    const tableData = data.map((item) => [item.event, item.date, item.status]);

    return (
      <Table borderStyle={styles.tableBorder}>
        <Row data={tableHead} style={[styles.head, styles.text]} />
        {tableData.map((rowData, index) => (
          <Row
            key={index}
            data={rowData}
            style={[styles.row, styles.text]} 
          />
        ))}
      </Table>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Placement Attendance</Text>
      <FlatList
        data={companies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.companyButton}
            onPress={() => openAttendanceModal(item.name)}>
            <Text style={styles.companyText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{selectedCompany}</Text>
          {renderAttendanceTable()}
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  companyButton: {
    padding: 15,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    marginBottom: 10,
  },
  companyText: {
    color: "white",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: "#c8e1ff",
  },
  head: {
    height: 40,
    backgroundColor: "#f1f8ff",
  },
  row: {
    height: 30,
    backgroundColor: "#fff",
  },
  text: {
    margin: 6,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#FF5733",
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
  },
});

export default PlacementAttendance;

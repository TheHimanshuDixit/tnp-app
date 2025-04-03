import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
} from "react-native";
import { Table, Row } from "react-native-table-component";
import CircularLoaderScreen from "../../components/circularLoader";
import { AuthContext } from "../AuthContext";

const PlacementAttendance = () => {
  const { token } = useContext(AuthContext);
  const [companies, setCompanies] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (token) {
      setLoading(true);
      fetch("http://10.0.2.2:4000/api/student", {
        method: "GET",
        headers: {
          "auth-token": token, // Replace with your actual token
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          const fetchedCompanies = data.data.map((item, index) => ({
            id: (index + 1).toString(), // Convert index to string for ID
            name: item.company.name,
          }));

          const fetchedAttendanceData = data.data.reduce((acc, item) => {
            const companyName = item.company.name;
            acc[companyName] = item.event.map((e) => ({
              event: e.event,
              date: new Date(e.date).toLocaleDateString("en-GB"), // Format date as DD/MM/YYYY
              status: "Present", // Default status
            }));
            return acc;
          }, {});

          // Handle companies with no events
          fetchedCompanies.forEach((company) => {
            if (!fetchedAttendanceData[company.name]) {
              fetchedAttendanceData[company.name] = []; // Add empty array if no events
            }
          });

          setCompanies(fetchedCompanies);
          setAttendanceData(fetchedAttendanceData);
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    // Fetch attendance data from API
    fetchData();
  }, [token]);

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
        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
        {tableData.map((rowData, index) => (
          <Row
            key={index}
            data={rowData}
            style={styles.row}
            textStyle={styles.text}
          />
        ))}
      </Table>
    );
  };

  return loading ? (
    <CircularLoaderScreen />
  ) : (
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
    height: 60,
    backgroundColor: "#fff",
  },
  text: {
    margin: 6,
    marginBottom: 0,
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

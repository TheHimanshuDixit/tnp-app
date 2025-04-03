import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import { Table, Row } from "react-native-table-component";
import CircularLoaderScreen from "../../components/circularLoader";
import { AuthContext } from "../../context/authContext";
import Icon from "react-native-vector-icons/MaterialIcons";

const PlacementAttendance = () => {
  const { token } = useContext(AuthContext);
  const [companies, setCompanies] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const dateISOToLocaleString = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}, ${day}-${month}-${year}`;
  };

  const fetchData = async () => {
    if (token) {
      setLoading(true);
      fetch("http://10.0.2.2:4000/api/student", {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          const fetchedCompanies = data.data.map((item, index) => ({
            id: (index + 1).toString(),
            name: item.company.name,
          }));

          const fetchedAttendanceData = data.data.reduce((acc, item) => {
            const companyName = item.company.name;
            acc[companyName] = item.event.map((e) => ({
              event: e.event,
              date: e.date,
              status: e.status,
            }));
            return acc;
          }, {});

          fetchedCompanies.forEach((company) => {
            if (!fetchedAttendanceData[company.name]) {
              fetchedAttendanceData[company.name] = [];
            }
          });

          setCompanies(fetchedCompanies);
          setAttendanceData(fetchedAttendanceData);
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
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
    const tableData = data.map((item) => [
      item.event,
      dateISOToLocaleString(item.date),
      item.status,
    ]);

    return (
      <Table borderStyle={styles.tableBorder}>
        <Row
          data={tableHead}
          style={styles.head}
          textStyle={styles.headText}
        />
        {tableData.map((rowData, index) => (
          <Row
            key={index}
            data={rowData}
            style={styles.row}
            textStyle={styles.text} // Ensure it's an object
          />
        ))}
      </Table>
    );
  };

  return loading ? (
    <CircularLoaderScreen />
  ) : (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Icon name="event-available" size={28} color="#007BFF" />
        <Text style={styles.title}> Placement Attendance</Text>
      </View>
      <FlatList
        data={companies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.companyCard}
            onPress={() => openAttendanceModal(item.name)}>
            <Icon
              name="business"
              size={24}
              color="#fff"
              style={styles.companyIcon}
            />
            <Text style={styles.companyText}>{item.name}</Text>
            <Icon name="chevron-right" size={24} color="white" />
          </TouchableOpacity>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalTitleContainer}>
              <Icon name="business-center" size={24} color="#007BFF" />
              <Text style={styles.modalTitle}> {selectedCompany}</Text>
            </View>
            <ScrollView>{renderAttendanceTable()}</ScrollView>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Icon name="close" size={20} color="#fff" />
              <Text style={styles.closeButtonText}> Close</Text>
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
    backgroundColor: "#F0F4F8",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#007BFF",
  },
  companyCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 5,
  },
  companyIcon: {
    marginRight: 10,
  },
  companyText: {
    flex: 1,
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 10,
  },
  modalTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#007BFF",
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: "#c8e1ff",
  },
  head: {
    height: 50,
    backgroundColor: "#007BFF",
  },
  headText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    height: 50,
    backgroundColor: "#fff",
  },
  text: {
    margin: 6,
    fontSize: 14,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#FF5733",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
    marginLeft: 5,
  },
});

export default PlacementAttendance;

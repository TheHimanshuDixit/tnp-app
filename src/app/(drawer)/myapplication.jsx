import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import CircularLoaderScreen from "../../components/circularLoader";
import { AuthContext } from "../AuthContext";

const Myapplications = () => {
  const { token } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [company, setCompany] = useState({});
  const [viewCompany, setViewCompany] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  // Open modal to view company details
  const handleOpenModal = (application) => {
    const selectedCompany = company[application.company];
    if (selectedCompany) {
      setViewCompany(selectedCompany);
      setModalVisible(true);
    }
  };
  // Fetch applications and company data
  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        setLoading(true);
        try {
          // Fetch applications
          const applicationResponse = await fetch(
            "http://10.0.2.2:4000/api/application/get",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "auth-token": token,
              },
            }
          );
          const applicationData = await applicationResponse.json();
          setApplications(applicationData.data);

          // Fetch company details (openings)
          const companyResponse = await fetch(
            "http://10.0.2.2:4000/api/opening/getall"
          );
          const companyData = await companyResponse.json();
          const companyMap = {};
          companyData.data.forEach((opening) => {
            companyMap[opening._id] = opening;
          });
          setCompany(companyMap);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [token]);

  // Render a single application item
  const renderItem = ({ item: application, index }) => (
    <View style={styles.item}>
      <Text style={styles.index}>{index + 1}.</Text>
      <Text style={styles.companyName}>
        {company[application.company]?.name || "Unknown Company"}
      </Text>
      <Text style={styles.jobTitle}>
        {company[application.company]?.jobId || "Unknown Job"}
      </Text>
      <Text style={styles.applicationDate}>
        {application.date.split("T")[1].split(".")[0] +
          ", " +
          application.date.split("T")[0]}
      </Text>
      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => handleOpenModal(application)}>
        <Icon name="eye" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return loading ? (
    <CircularLoaderScreen />
  ) : (
    <View style={styles.container}>
      <Text style={styles.title}>My Applications</Text>
      <Text style={styles.subtitle}>
        Please review the status of your applications.
      </Text>
      <FlatList
        data={applications}
        renderItem={renderItem}
        keyExtractor={(item) => item._id} // Assuming _id is unique
        contentContainerStyle={styles.list}
      />
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Company Details</Text>
            <Text style={styles.modalItem}>
              <Text style={styles.modalLabel}>Name:</Text> {viewCompany.name}
            </Text>
            <Text style={styles.modalItem}>
              <Text style={styles.modalLabel}>Job Title:</Text>{" "}
              {viewCompany.jobId}
            </Text>
            <Text style={styles.modalItem}>
              <Text style={styles.modalLabel}>Role:</Text> {viewCompany.role}
            </Text>
            <Text style={styles.modalItem}>
              <Text style={styles.modalLabel}>Stipend:</Text>{" "}
              {viewCompany.stipend}
            </Text>
            <Text style={styles.modalItem}>
              <Text style={styles.modalLabel}>CTC:</Text> {viewCompany.ctc}
            </Text>
            <Text style={styles.modalItem}>
              <Text style={styles.modalLabel}>Min CGPA:</Text>{" "}
              {viewCompany.cgpacritera}
            </Text>
            <Text style={styles.modalItem}>
              <Text style={styles.modalLabel}>Backlogs:</Text>{" "}
              {viewCompany.backlog}
            </Text>
            <Text style={styles.modalItem}>
              <Text style={styles.modalLabel}>Branches:</Text>{" "}
              {Array.isArray(viewCompany.branch)
                ? viewCompany.branch.join(", ")
                : "N/A"}
            </Text>
            <Text style={styles.modalItem}>
              <Text style={styles.modalLabel}>Locations:</Text>{" "}
              {Array.isArray(viewCompany.location)
                ? viewCompany.location.join(", ")
                : "N/A"}
            </Text>
            <Text style={styles.modalItem}>
              <Text style={styles.modalLabel}>Gender:</Text>{" "}
              {viewCompany.gender}
            </Text>
            <Text style={styles.modalItem}>
              <Text style={styles.modalLabel}>Mode:</Text> {viewCompany.mode}
            </Text>
            <Text style={styles.modalItem}>
              <Text style={styles.modalLabel}>Duration:</Text>{" "}
              {viewCompany.duration}
            </Text>
            <Text style={styles.modalItem}>
              <Text style={styles.modalLabel}>Application Date:</Text>{" "}
              {viewCompany.applyby
                ? viewCompany.applyby.split("T")[1].split(".")[0] +
                  ", " +
                  viewCompany.applyby.split("T")[0]
                : "N/A"}
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
    fontSize: 15,
    flex: 1,
    marginRight: 5,
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
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalLabel: {
    fontWeight: "bold",
  },
  modalItem: {
    fontSize: 16,
    marginBottom: 15,
    borderBottomWidth: 0.5,
  },
  closeButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-end",
  },
});

export default Myapplications;

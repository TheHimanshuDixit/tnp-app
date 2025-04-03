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
import { AuthContext } from "../../context/authContext";

const MyApplications = () => {
  const { token } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [company, setCompany] = useState({});
  const [viewCompany, setViewCompany] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  // Open modal to view company details
  const handleOpenModal = (application) => {
    if(!application) return;
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

  const dateISOToLocaleString = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const localDateTimeString = `${hours}:${minutes}, ${day}-${month}-${year}`;
    return localDateTimeString; // Output: 2025-03-26T16:00:00
  };

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
      <View style={styles.itemHeader}>
        <Text style={styles.no}>No</Text>
        <Text style={styles.comp}>Company</Text>
        <Text style={styles.jd}>Job Id</Text>
        <Text style={styles.ad}>Apply Date</Text>
        <Text style={styles.v}>View</Text>
      </View>
      {applications.length > 0 ? (
        <FlatList
          data={applications}
          renderItem={renderItem}
          keyExtractor={(item) => item._id} // Assuming _id is unique
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={{ fontSize: 18, color: "#888" }}>
            No applications found.
          </Text>
        </View>
      )}

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
              {viewCompany.stipend} PM
            </Text>
            <Text style={styles.modalItem}>
              <Text style={styles.modalLabel}>CTC:</Text> {viewCompany.ctc} LPA
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
            {viewCompany.requirements &&
              viewCompany.requirements.length > 0 && (
                <View>
                  <Text style={styles.modalItem}>
                    <Text style={styles.modalLabel}>Requirements:</Text>{" "}
                    {viewCompany.requirements.join(", ")}
                  </Text>
                </View>
              )}

            {viewCompany.jobdescription &&
              viewCompany.jobdescription.length > 0 && (
                <View>
                  <Text style={styles.modalItem}>
                    <Text style={styles.modalLabel}>Job Description:</Text>{" "}
                    {viewCompany.jobdescription.join(", ")}
                  </Text>
                </View>
              )}

            {viewCompany.selectionprocess &&
              viewCompany.selectionprocess.length > 0 && (
                <View>
                  <Text style={styles.modalItem}>
                    <Text style={styles.modalLabel}>Selection Process:</Text>{" "}
                    {viewCompany.selectionprocess.join(", ")}
                  </Text>
                </View>
              )}

            {viewCompany.ppt && (
              <View>
                <Text style={styles.modalItem}>
                  <Text style={styles.modalLabel}>PPT:</Text>{" "}
                  {viewCompany.ppt !== "To be announced"
                    ? dateISOToLocaleString(viewCompany.ppt)
                    : viewCompany.ppt}
                </Text>
              </View>
            )}
            {viewCompany.test && (
              <View>
                <Text style={styles.modalItem}>
                  <Text style={styles.modalLabel}>Test:</Text>{" "}
                  {viewCompany.test !== "To be announced"
                    ? dateISOToLocaleString(viewCompany.test)
                    : viewCompany.test}
                </Text>
              </View>
            )}
            {viewCompany.interview && (
              <View>
                <Text style={styles.modalItem}>
                  <Text style={styles.modalLabel}>Interview:</Text>{" "}
                  {viewCompany.interview !== "To be announced"
                    ? dateISOToLocaleString(viewCompany.interview)
                    : viewCompany.interview}
                </Text>
              </View>
            )}
            <Text style={styles.modalItem}>
              <Text style={styles.modalLabel}>Application Date:</Text>{" "}
              {dateISOToLocaleString(viewCompany.applyby)}
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
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  no: {
    fontWeight: "bold",
    marginRight: 10,
  },
  comp: {
    fontWeight: "bold",
    flex: 1,
    marginRight: 5,
  },
  jd: {
    fontWeight: "bold",
    flex: 1,
    marginRight: 5,
  },
  ad: {
    fontWeight: "bold",
    flex: 1,
    marginRight: 5,
  },
  v: {
    fontWeight: "bold",
    marginRight: 5,
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

export default MyApplications;

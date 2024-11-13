import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import JobDetailsModal from "../../components/jobDetailsModal";
import ApplyJobModal from "../../components/applyJobModal";
import CircularLoaderScreen from "../../components/circularLoader";
import { AuthContext } from "../AuthContext";

const JobCard = ({ job, onInfoPress, onApplyPress, CompTime }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.companyInfo}>
          <Image source={{ uri: job.logo }} style={styles.logo} />
          <Text style={styles.company}>{job.name}</Text>
        </View>
        <TouchableOpacity onPress={onInfoPress}>
          <MaterialIcons name="info-outline" size={24} color="#555" />
        </TouchableOpacity>
      </View>
      <Text style={styles.role}>{job.role}</Text>
      <View style={styles.divider} />
      <View style={styles.infoRow}>
        <FontAwesome name="money" size={20} color="#28a745" />
        <Text style={styles.infoText}>{job.ctc}</Text>
      </View>
      <View style={styles.infoRow}>
        <MaterialIcons name="location-on" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          {job.location.length > 0
            ? job.location.map((loc) => loc + ", ")
            : "Remote"}
        </Text>
      </View>
      <View style={styles.infoRow}>
        <MaterialIcons name="schedule" size={20} color="#ffb100" />
        <Text style={styles.infoText}>{job.mode}</Text>
      </View>
      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.typeButton}>
          <Text style={styles.typeText}>{job.type}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onApplyPress}
          // disabled={CompTime()}
          style={CompTime() ? styles.applyButton1 : styles.applyButton2}>
          <Text style={styles.applyText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const JobListingScreen = () => {
  const { token } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyModalVisible, setApplyModalVisible] = useState(false);
  const [allCompanies, setAllCompanies] = useState([]);
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line
    const data = (async () => {
      const response = await fetch(
        "https://placement-portall.onrender.com/api/opening/getall"
      );
      const data = await response.json();
      setAllCompanies(data.data);
      let ongoingOpen = data.data.filter((item) => {
        return item.progress === "Ongoing";
      });
      setJobData(ongoingOpen);
      setLoading(false);
    })();
  }, []);

  const handleCompTime = (time) => {
    const d1 = new Date(time);
    const d2 = new Date();
    if (d1 < d2) {
      return true;
    } else {
      return false;
    }
  };

  const handleInfoPress = (job) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  const handleApplyPress = (job) => {
    if (handleCompTime(job.applyby)) {
      Alert.alert("Application Closed");
      return;
    }
    setSelectedJob(job);
    setApplyModalVisible(true); // Show the apply modal
  };

  return loading ? (
    <CircularLoaderScreen />
  ) : (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={jobData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <JobCard
            job={item}
            onInfoPress={() => handleInfoPress(item)}
            onApplyPress={() => handleApplyPress(item)}
            CompTime={() => handleCompTime(item.applyby)}
          />
        )}
      />

      {/* Use the JobDetailsModal component */}
      <JobDetailsModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setApplyModalVisible={setApplyModalVisible}
        selectedJob={selectedJob}
      />

      <ApplyJobModal
        applyModalVisible={applyModalVisible}
        setApplyModalVisible={setApplyModalVisible}
        selectedJob={selectedJob}
        allCompanies={allCompanies}
        token={token}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: "#007bff", // Color for left border
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  companyInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 5,
  },
  company: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  role: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    color: "#555",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    marginLeft: 5,
    color: "#666",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  typeButton: {
    backgroundColor: "#e8e8e8",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderColor: "#007bff",
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  typeText: {
    fontSize: 12,
    color: "#007bff",
    fontWeight: "bold",
  },
  applyButton1: {
    backgroundColor: "gray",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  applyButton2: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  applyText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default JobListingScreen;

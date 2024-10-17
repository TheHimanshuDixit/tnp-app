import React, { useEffect, useState } from "react";
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

// Extended mock data for job listings
// const jobData = [
//   {
//     id: "1",
//     company: "MakeMyTrip",
//     role: "SDE",
//     salary: "35000/Month",
//     location: "Bangalore",
//     schedule: "Full Time",
//     type: "Intern+FTE",
//     details:
//       "MakeMyTrip is hiring SDE for Full-time In-Office role at a monthly stipend of 35,000.",
//     logo: "https://play-lh.googleusercontent.com/19I7zjhAAAud9AztLiIxD1MYVdHusoeaW2-7Fx2FUJvcVZBbUBcGKjBBVPsHkFBLWMs=s256-rw",
//     jobId: "10000",
//     internshipStipend: "35000",
//     companyCtc: "2550000",
//     minCgpa: "7.0",
//     maxBacklogs: "0",
//     branches: "CSE, IT",
//     gender: "No restriction",
//     applyBy: "2025-05-03 02:39:00",
//   },
//   {
//     id: "2",
//     company: "Microsoft",
//     role: "SDE",
//     salary: "0/Month",
//     location: "In-Office",
//     schedule: "Full Time",
//     type: "FTE",
//     details: "Microsoft is hiring SDE for Full-time In-Office role.",
//     logo: "https://play-lh.googleusercontent.com/19I7zjhAAAud9AztLiIxD1MYVdHusoeaW2-7Fx2FUJvcVZBbUBcGKjBBVPsHkFBLWMs=s256-rw",
//     jobId: "10001",
//     internshipStipend: "N/A",
//     companyCtc: "2000000",
//     minCgpa: "8.0",
//     maxBacklogs: "1",
//     branches: "CSE, ECE, IT",
//     gender: "No restriction",
//     applyBy: "2025-04-01 11:00:00",
//   },
//   {
//     id: "3",
//     company: "Amazon",
//     role: "SDE",
//     salary: "0/Month",
//     location: "Bangalore",
//     schedule: "Full Time",
//     type: "FTE",
//     details: "Amazon is hiring SDE for Full-time In-Office role.",
//     logo: "https://play-lh.googleusercontent.com/19I7zjhAAAud9AztLiIxD1MYVdHusoeaW2-7Fx2FUJvcVZBbUBcGKjBBVPsHkFBLWMs=s256-rw",
//     jobId: "10002",
//     internshipStipend: "N/A",
//     companyCtc: "2800000",
//     minCgpa: "7.5",
//     maxBacklogs: "1",
//     branches: "CSE, ECE",
//     gender: "No restriction",
//     applyBy: "2025-06-01 12:00:00",
//   },
//   {
//     id: "4",
//     company: "Google",
//     role: "Software Engineer",
//     salary: "45000/Month",
//     location: "Remote",
//     schedule: "Full Time",
//     type: "Intern+FTE",
//     details: "Google is hiring Software Engineers for Remote Full-time role.",
//     logo: "https://play-lh.googleusercontent.com/19I7zjhAAAud9AztLiIxD1MYVdHusoeaW2-7Fx2FUJvcVZBbUBcGKjBBVPsHkFBLWMs=s256-rw",
//     jobId: "10003",
//     internshipStipend: "45000",
//     companyCtc: "3000000",
//     minCgpa: "8.5",
//     maxBacklogs: "0",
//     branches: "CSE, ECE, IT",
//     gender: "No restriction",
//     applyBy: "2025-07-15 10:00:00",
//   },
// ];

const JobCard = ({ job, onInfoPress, onApplyPress }) => {
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
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyText} onPress={onApplyPress}>
            Apply
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const JobListingScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyModalVisible, setApplyModalVisible] = useState(false);
  const [allCompanies, setAllCompanies] = useState([]);
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line
    const data = (async () => {
      const response = await fetch("http://10.0.2.2:4000/api/opening/getall");
      const data = await response.json();
      setAllCompanies(data.data);
      let ongoingOpen = data.data.filter((item) => {
        return item.progress === "Ongoing";
      });
      setJobData(ongoingOpen);
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

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={jobData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <JobCard
            job={item}
            onInfoPress={() => handleInfoPress(item)}
            onApplyPress={() => handleApplyPress(item)}
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
  applyButton: {
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

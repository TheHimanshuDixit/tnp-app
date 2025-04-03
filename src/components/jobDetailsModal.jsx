// components/JobDetailsModal.js
import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const JobDetailsModal = ({
  modalVisible,
  setModalVisible,
  selectedJob,
  setApplyModalVisible,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView>
            <Text
              className=" text-center border-b font-extrabold pb-2"
              style={styles.modalTitle}>
              Company Details
            </Text>
            {selectedJob && (
              <View>
                <Text style={styles.modalItemTitle}>Name:</Text>
                <Text style={styles.modalItemValue}>{selectedJob.name}</Text>

                <Text style={styles.modalItemTitle}>JobID:</Text>
                <Text style={styles.modalItemValue}>{selectedJob.jobId}</Text>

                <Text style={styles.modalItemTitle}>Role:</Text>
                <Text style={styles.modalItemValue}>{selectedJob.role}</Text>

                <Text style={styles.modalItemTitle}>Internship Stipend:</Text>
                <Text style={styles.modalItemValue}>
                  {selectedJob.stipend} PM
                </Text>

                <Text style={styles.modalItemTitle}>Company CTC:</Text>
                <Text style={styles.modalItemValue}>{selectedJob.ctc} LPA</Text>

                <Text style={styles.modalItemTitle}>Minimum CGPA:</Text>
                <Text style={styles.modalItemValue}>
                  {selectedJob.cgpacritera}
                </Text>

                <Text style={styles.modalItemTitle}>Maximum Backlogs:</Text>
                <Text style={styles.modalItemValue}>{selectedJob.backlog}</Text>

                <Text style={styles.modalItemTitle}>Applicable Branches:</Text>
                <Text style={styles.modalItemValue}>
                  {selectedJob.branch.length > 0
                    ? selectedJob.branch.map((branch) => branch + ", ")
                    : "All"}
                </Text>

                <Text style={styles.modalItemTitle}>Location:</Text>
                <Text style={styles.modalItemValue}>
                  {selectedJob.location.length > 0
                    ? selectedJob.location.map((loc) => loc + ", ")
                    : "Remote"}
                </Text>

                <Text style={styles.modalItemTitle}>Gender:</Text>
                <Text style={styles.modalItemValue}>{selectedJob.gender}</Text>

                <Text style={styles.modalItemTitle}>Mode:</Text>
                <Text style={styles.modalItemValue}>{selectedJob.mode}</Text>

                <Text style={styles.modalItemTitle}>Duration:</Text>
                <Text style={styles.modalItemValue}>
                  {selectedJob.duration}
                </Text>

                <Text style={styles.modalItemTitle}>Apply By:</Text>
                <Text style={styles.modalItemValue}>
                  {selectedJob.applyby.split("T")[1].split(".")[0] +
                    ", " +
                    selectedJob.applyby.split("T")[0]}
                </Text>
              </View>
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalApplyButton}
                onPress={() => {
                  setApplyModalVisible(true);
                  setModalVisible(false);
                }}>
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 22,
    color: "#333",
    marginBottom: 20,
  },
  modalItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  modalItemValue: {
    fontSize: 16,
    color: "#555",
    marginBottom: 12,
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  modalCloseButton: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalApplyButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
JobDetailsModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  selectedJob: PropTypes.shape({
    name: PropTypes.string,
    jobId: PropTypes.string,
    role: PropTypes.string,
    stipend: PropTypes.string,
    ctc: PropTypes.string,
    cgpacritera: PropTypes.string,
    backlog: PropTypes.string,
    branch: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.arrayOf(PropTypes.string),
    gender: PropTypes.string,
    mode: PropTypes.string,
    duration: PropTypes.string,
    applyby: PropTypes.string,
  }),
  setApplyModalVisible: PropTypes.func.isRequired,
};
export default JobDetailsModal;

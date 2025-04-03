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
                {selectedJob.requirements.length > 0 && (
                  <View>
                    <Text style={styles.modalItemTitle}>Requirements:</Text>
                    <Text style={styles.modalItemValue}>
                      {selectedJob.requirements.map((key) => {
                        return key + ",";
                      })}
                    </Text>
                  </View>
                )}
                {selectedJob.jobdescription.length > 0 && (
                  <View>
                    <Text style={styles.modalItemTitle}>Job Description:</Text>
                    <Text style={styles.modalItemValue}>
                      {selectedJob.jobdescription.map((key) => {
                        return key + ",";
                      })}
                    </Text>
                  </View>
                )}
                {selectedJob.selectionprocess.length > 0 && (
                  <View>
                    <Text style={styles.modalItemTitle}>
                      Selection Process:
                    </Text>
                    <Text style={styles.modalItemValue}>
                      {selectedJob.selectionprocess.map((key) => {
                        return key + ",";
                      })}
                    </Text>
                  </View>
                )}
                {selectedJob.ppt && (
                  <View>
                    <Text style={styles.modalItemTitle}>PPT:</Text>
                    <Text style={styles.modalItemValue}>
                      {selectedJob.ppt !== "To be announced"
                        ? dateISOToLocaleString(selectedJob.ppt)
                        : selectedJob.ppt}
                    </Text>
                  </View>
                )}
                {selectedJob.test && (
                  <View>
                    <Text style={styles.modalItemTitle}>Test:</Text>
                    <Text style={styles.modalItemValue}>
                      {selectedJob.test !== "To be announced"
                        ? dateISOToLocaleString(selectedJob.test)
                        : selectedJob.test}
                    </Text>
                  </View>
                )}
                {selectedJob.interview && (
                  <View>
                    <Text style={styles.modalItemTitle}>Interview:</Text>
                    <Text style={styles.modalItemValue}>
                      {selectedJob.interview !== "To be announced"
                        ? dateISOToLocaleString(selectedJob.interview)
                        : selectedJob.interview}
                    </Text>
                  </View>
                )}
                <Text style={styles.modalItemTitle}>Apply By:</Text>
                <Text style={styles.modalItemValue}>
                  {dateISOToLocaleString(selectedJob.applyby)}
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
    requirements: PropTypes.arrayOf(PropTypes.string),
    jobdescription: PropTypes.arrayOf(PropTypes.string),
    selectionprocess: PropTypes.arrayOf(PropTypes.string),
    ppt: PropTypes.string,
    test: PropTypes.string,
    interview: PropTypes.string,
    applyby: PropTypes.string,
  }),
  setApplyModalVisible: PropTypes.func.isRequired,
};
export default JobDetailsModal;

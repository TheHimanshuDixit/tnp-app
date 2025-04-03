import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Collapsible from "react-native-collapsible";
import CircularLoaderScreen from "../../components/circularLoader";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      Alert.alert("Error", "All fields are required");
      return;
    }
    setLoading(true);
    const response = await fetch("http://10.0.2.2:4000/api/contact/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });
    const data = await response.json();
    if (data.success === "Email sent") {
      setEmail("");
      setName("");
      setMessage("");
      setLoading(false);
      Alert.alert(
        "Form Submission",
        `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
      );
    } else {
      alert("Error Occurs");
    }
  };

  return loading ? (
    <CircularLoaderScreen />
  ) : (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formSection}>
        <Text style={styles.formTitle}>
          For Any Queries Use The Form Below!!
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.textArea}
          placeholder="Your message"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
        <Button title="Send" onPress={handleSubmit} />
      </View>

      <View style={styles.accordionSection}>
        <Text style={styles.accordionHeaderText} className="underline">
          Frequently Asked Questions
        </Text>
        <View style={styles.accordionContent}>
          <AccordionItem
            question="What is the purpose of the training and placement portal?"
            answer="The training and placement portal is designed to serve as a bridge between students and potential employers. Its primary goal is to assist students in securing internships, as well as full-time and part-time job opportunities."
          />
          <AccordionItem
            question="Can I access the training and placement portal after graduation?"
            answer="Yes, you can continue to access the portal for a certain period after graduation. However, access might be limited for a specific time."
          />
          <AccordionItem
            question="Can you change your registered email-id once signed-up on the portal?"
            answer="Once registered on the portal, email IDs cannot be changed. Therefore, users are advised to carefully select their email IDs during the registration process. However, if a change is necessary, users may contact the Training and Placement team. Please note that a fine may be applicable for email ID changes."
          />
          <AccordionItem
            question="Who should you contact if you encounter technical difficulties with the website?"
            answer="If you encounter technical difficulties while using the training and placement website, you can reach out to the college's IT department or the support team designated for the website for assistance."
          />
        </View>
      </View>
    </ScrollView>
  );
};

import PropTypes from "prop-types";

const AccordionItem = ({ question, answer }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleAccordion = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <View style={styles.accordionItem}>
      <TouchableOpacity
        style={styles.accordionItemHeader}
        onPress={toggleAccordion}>
        <Text style={styles.accordionItemHeaderText}>{question}</Text>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>
        <Text style={styles.accordionItemAnswer}>{answer}</Text>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  formSection: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    height: 100,
  },
  accordionSection: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  accordionHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  accordionContent: {
    marginTop: 10,
  },
  accordionItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingVertical: 10,
  },
  accordionItemHeader: {
    padding: 10,
  },
  accordionItemHeaderText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#007bff",
  },
  accordionItemAnswer: {
    padding: 10,
    fontSize: 16,
    color: "#555",
  },
});
AccordionItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

export default Contact;

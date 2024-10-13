import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const Team = () => {
  // Sample data to replace API response
  const teams = [
    {
      _id: "1",
      name: "John Doe",
      email: "john@example.com",
      position: "Developer",
      image: "https://via.placeholder.com/150",
    },
    {
      _id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      position: "Designer",
      image: "https://via.placeholder.com/150",
    },
    {
      _id: "3",
      name: "Alice Johnson",
      email: "alice@example .com",
      position: "Manager",
      image: "https://via.placeholder.com/150",
    },
    {
      _id: "4",
      name: "Bob Brown",
      email: "bob@ example.com",
      position: "Tester",
      image: "https://via.placeholder.com/150",
    },
    // Add more team members as needed
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Meet the <Text style={styles.primaryText}>team</Text>
        </Text>
      </View>
      <View style={styles.grid}>
        {teams.map((team) => (
          <View key={team._id} style={styles.card}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: team.image }}
                style={styles.image}
                alt="Avatar"
              />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.name}>{team.name}</Text>
              <Text style={styles.email}>{team.email}</Text>
              <Text style={styles.position}>{team.position}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  header: {
    marginBottom: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  primaryText: {
    color: "#007bff", // Replace with your primary color
    textDecorationLine: "underline",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  card: {
    width: "45%", // Adjust width based on design
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    padding: 16,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    shadowColor: "#000",
  },
  cardContent: {
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    marginBottom: 4,
  },
  position: {
    marginBottom: 12,
  },
});

export default Team;

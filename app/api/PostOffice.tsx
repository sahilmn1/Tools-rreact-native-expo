import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";

const PostOffice = () => {
  const [postOfficeDetails, setPostOfficeDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postoffice, setPostOffice] = useState("");

  useEffect(() => {
    setLoading(false);
    if (postoffice.length === 6) {
      fetchPostOfficeDetails();
    } else {
      setPostOfficeDetails([]);
      setLoading(false);
    }
  }, [postoffice]);

  const fetchPostOfficeDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.postalpincode.in/postoffice/${postoffice}`
      );
      const data = await response.json();
      if (data && data[0] && data[0].PostOffice) {
        setPostOfficeDetails(data[0].PostOffice);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching post office details:", error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search by Post Office Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Post Office Name...."
        keyboardType="default"
        maxLength={20}
        value={postoffice}
        onChangeText={(text) => setPostOffice(text)}
      />
      <Button
        style={styles.btn}
        title="Search"
        onPress={fetchPostOfficeDetails}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : postOfficeDetails.length > 0 ? (
          postOfficeDetails.map((office, index) => (
            <View key={index} style={styles.officeContainer}>
              <Text style={styles.cardText}>Name: {office.Name}</Text>
              <Text style={styles.cardText}>PIN Code: {office.Pincode}</Text>
              <Text style={styles.cardText}>
                Branch Type: {office.BranchType}
              </Text>
              <Text style={styles.cardText}>
                Delivery Status: {office.DeliveryStatus}
              </Text>
              <Text style={styles.cardText}>Circle: {office.Circle}</Text>
              <Text style={styles.cardText}>District: {office.District}</Text>
              <Text style={styles.cardText}>Division: {office.Division}</Text>
              <Text style={styles.cardText}>Region: {office.Region}</Text>
              <Text style={styles.cardText}>State: {office.State}</Text>
              <Text style={styles.cardText}>Country: {office.Country}</Text>
            </View>
          ))
        ) : (
          <Text>No post office details found</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
 
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "flex-start", // Align to the left side
    paddingTop: 10,
  },
  officeContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 10,
    width: "100%", // Increase the width
    padding: 20,
  },
  cardText: {
    marginBottom: 5,
  },
});

export default PostOffice;

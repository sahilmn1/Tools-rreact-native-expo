import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from "react-native";
import { Link } from "expo-router";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
     <Text style={styles.title}>We are Providing a way to search the post office know your Pin code</Text>
      <Pressable>
        <Link style={styles.link} href="api/PostOffice">
          Search Post office
        </Link>
      </Pressable>

      <Pressable>
        <Link style={styles.link} href="api/Notes">
           Make Notes 
        </Link>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  link: {
    fontSize: 16,
    color: "blue",
    marginTop: 10,
  },
});

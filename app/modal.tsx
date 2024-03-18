import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.aboutText}>Hi, I'm Mohd Sahil. This app is created to provide users with useful tools to enhance their experience.</Text>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 16,
    textAlign: "center",
  },
});

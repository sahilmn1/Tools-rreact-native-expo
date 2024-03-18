import { StyleSheet, Pre, Pressable } from "react-native";
import { Link } from "expo-router";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>News Headlines</Text>
      <Pressable style={styles.link} >
      <Link href="api/News"> <Text style={styles.linkText}>News</Text></Link>
      </Pressable>
      <Text style={styles.sectionTitle}>URL Shortener</Text>
      <Pressable style={styles.link} >
        <Text style={styles.linkText}><Link href="api/UrlShortner">Go to Url Shortener</Link></Text>
      </Pressable>
      <Pressable style={styles.link} >
        <Text style={styles.linkText}><Link href="api/JobSearch">Job Search</Link></Text>
      </Pressable>
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  link: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#2196F3",
    borderRadius: 5,
    width: 200, // Adjust width as needed
    alignItems: "center",
  },
  linkText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Linking,
  TextInput,
  Button,
} from "react-native";

const NewsHeadlines = () => {
  const [headlines, setHeadlines] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewsHeadlines();
  }, []);

  const fetchNewsHeadlines = async () => {
    try {
      const response = await fetch(
        "https://newsapi.org/v2/everything?domains=ndtv.com&apiKey=2b48a1a03c70405b8adef4c6a8f7d624"
      );
      const data = await response.json();
      setHeadlines(data.articles);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news headlines:", error);
      setLoading(false);
    }
  };

  const renderHeadlineItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handlePress(item.url)}
      style={styles.headlineContainer}
    >
      <Image source={{ uri: item.urlToImage }} style={styles.headlineImage} />
      <Text style={styles.headlineTitle}>{item.title}</Text>
      <Text style={styles.headlineDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  const handlePress = (url) => {
    // Open the URL within the app using Linking
    Linking.openURL(url);
  };

  const handleSearch = () => {
    // Filter headlines based on search query
    const filteredHeadlines = headlines.filter(
      (item) =>
        (item.title &&
          item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.description &&
          item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    return filteredHeadlines;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search headlines"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>

      <View>
        <Text style={styles.text}>News Headlines</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={searchQuery ? handleSearch() : headlines}
          renderItem={renderHeadlineItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 8,
    marginRight: 10,
  },
  headlineContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headlineImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
  headlineTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  headlineDescription: {
    fontSize: 16,
    color: "#666",
  },
  text: {
    fontSize: 20,
    padding:10,
  },
});

export default NewsHeadlines;

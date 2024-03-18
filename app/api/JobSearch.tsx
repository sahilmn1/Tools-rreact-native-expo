import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';

const JobSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    fetch(`http://api.dataatwork.org/v1/jobs/autocomplete?begins_with=${query}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setResults(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  return (
    <View>
      <TextInput
        placeholder="Enter job keyword..."
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={results}
        keyExtractor={item => item.uuid}
        renderItem={({ item }) => <Text>{item.suggestion}</Text>}
      />
    </View>
  );
};

export default JobSearch;

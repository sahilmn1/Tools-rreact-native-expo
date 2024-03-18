import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ActivityIndicator, TouchableOpacity, Clipboard } from 'react-native';

const UrlShortener = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleShortenUrl = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://cleanuri.com/api/v1/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `url=${encodeURIComponent(longUrl)}`,
      });
      const data = await response.json();
      if (data.result_url) {
        setShortUrl(data.result_url);
        setError('');
      } else {
        setShortUrl('');
        setError(data.error || 'An unknown error occurred.');
      }
    } catch (error) {
      console.error('Error shortening URL:', error);
      setError('An error occurred while shortening the URL.');
    }
    setLoading(false);
  };

  const handleCopyUrl = () => {
    Clipboard.setString(shortUrl);
    Alert.alert('Success', 'Shortened URL copied to clipboard.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Long URL:</Text>
      <TextInput
        style={styles.input}
        value={longUrl}
        onChangeText={text => setLongUrl(text)}
        placeholder="Enter long URL"
      />
      <Button title="Shorten URL" onPress={handleShortenUrl} disabled={loading} />
      {loading && <ActivityIndicator size="small" color="#000" />}
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}
      {shortUrl ? (
        <View style={styles.shortUrlContainer}>
          <Text style={styles.shortUrl}>Shortened URL: {shortUrl}</Text>
          <TouchableOpacity onPress={handleCopyUrl}>
            <Text style={styles.copyButton}>Copy</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    fontSize: 16,
    color: 'red',
    marginTop: 10,
  },
  shortUrlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  shortUrl: {
    fontSize: 16,
    flex: 1,
  },
  copyButton: {
    color: 'blue',
    fontSize: 16,
  },
});

export default UrlShortener;

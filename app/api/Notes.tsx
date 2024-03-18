import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NotesApp = () => {
  const [note, setNote] = useState("");
  const [notesList, setNotesList] = useState([]);

  useEffect(() => {
    loadNotes();
  }, []);

  // Load notes from AsyncStorage
  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem("notes");
      if (storedNotes !== null) {
        setNotesList(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error("Error loading notes:", error);
    }
  };

  // Save notes to AsyncStorage
  const saveNotes = async (notes) => {
    try {
      await AsyncStorage.setItem("notes", JSON.stringify(notes));
    } catch (error) {
      console.error("Error saving notes:", error);
    }
  };

  // Add a new note
  const addNote = () => {
    if (note.trim() !== "") {
      const newNote = { id: Date.now(), text: note };
      setNotesList([...notesList, newNote]);
      saveNotes([...notesList, newNote]);
      setNote("");
    }
  };

  // Delete a note
  const deleteNote = (id) => {
    const updatedNotes = notesList.filter((note) => note.id !== id);
    setNotesList(updatedNotes);
    saveNotes(updatedNotes);
  };

  // Render each note item
  const renderNoteItem = ({ item }) => (
    <TouchableOpacity onPress={() => editNoteAlert(item.id, item.text)}>
      <View style={styles.noteItem}>
        <Text>{item.text}</Text>
        <TouchableOpacity onPress={() => deleteNoteAlert(item.id)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Alert for deleting a note
  const deleteNoteAlert = (id) => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteNote(id),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  // Alert for editing a note
  const editNoteAlert = (id, text) => {
    Alert.prompt(
      "Edit Note",
      "Edit your note:",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Save",
          onPress: (newText) => editNote(id, newText),
        },
      ],
      "plain-text",
      text
    );
  };

  // Edit a note
  const editNote = (id, newText) => {
    const updatedNotes = notesList.map((note) =>
      note.id === id ? { ...note, text: newText } : note
    );
    setNotesList(updatedNotes);
    saveNotes(updatedNotes);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a note"
        value={note}
        onChangeText={(text) => setNote(text)}
        onSubmitEditing={addNote}
      />
      <TouchableOpacity style={styles.addButton} onPress={addNote}>
        <Text style={styles.addButtonText}>Add Note</Text>
      </TouchableOpacity>
      <Text style={styles.text}>List of Notes -</Text>
      <FlatList
        data={notesList}
        renderItem={renderNoteItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "red",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  text: {
    fontSize: 20,
  },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
  },
  noteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
  },
  list: {
    flex: 1,
    width: "100%",
  },
});

export default NotesApp;


import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getNotes } from '../utils/storage';
import { Note } from '../types';

export default function HomeScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadNotes();
    });
    return unsubscribe;
  }, [navigation]);

  const loadNotes = async () => {
    const storedNotes = await getNotes();
    setNotes(storedNotes);
  };

  const handleNotePress = (note: Note) => {
    navigation.navigate('Note', { note });
  };

  const handleCreateNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'New Note',
      content: ''
    };
    navigation.navigate('Note', { note: newNote });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleNotePress(item)} style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleCreateNote}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  },
});

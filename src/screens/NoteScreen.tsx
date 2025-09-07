
import React, { useState, useLayoutEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Markdown from 'react-native-markdown-display';
import { getNotes, saveNotes } from '../utils/storage';
import { Note } from '../types';

export default function NoteScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { note: initialNote } = route.params as { note: Note };

  const [note, setNote] = useState<Note>(initialNote);
  const [isEditing, setIsEditing] = useState(!initialNote.content);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: note.title === 'New Note' ? '' : note.title,
      headerRight: () => (
        <TouchableOpacity onPress={toggleEditMode} style={{ marginRight: 16 }}>
          <Text style={{ color: '#007AFF', fontSize: 16 }}>{isEditing ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, isEditing, note]);

  const toggleEditMode = async () => {
    if (isEditing) {
      const notes = await getNotes();
      const noteIndex = notes.findIndex((n) => n.id === note.id);
      if (noteIndex !== -1) {
        notes[noteIndex] = note;
      } else {
        notes.push(note);
      }
      await saveNotes(notes);
    }
    setIsEditing(!isEditing);
  };

  const handleContentChange = (content: string) => {
    const title = content.split('\n')[0] || 'New Note';
    setNote({ ...note, title, content });
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <TextInput
          style={styles.input}
          multiline
          value={note.content}
          onChangeText={handleContentChange}
          autoFocus
        />
      ) : (
        <Markdown style={{ body: { fontSize: 16 } }}>{note.content}</Markdown>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    fontSize: 16,
    textAlignVertical: 'top',
  },
});

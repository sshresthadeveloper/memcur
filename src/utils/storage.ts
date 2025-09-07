
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note } from '../types';

const NOTES_KEY = 'notes';

export const getNotes = async (): Promise<Note[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(NOTES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to load notes.', e);
    return [];
  }
};

export const saveNotes = async (notes: Note[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(notes);
    await AsyncStorage.setItem(NOTES_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save notes.', e);
  }
};

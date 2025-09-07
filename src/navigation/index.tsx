
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import NoteScreen from '../screens/NoteScreen';
import { Note } from '../types';

export type RootStackParamList = {
  Home: undefined;
  Note: { note: Note };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Notes' }} />
        <Stack.Screen name="Note" component={NoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

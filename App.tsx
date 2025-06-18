import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { Login } from './src/screens/Login/login.screens';
import { Home } from './src/screens/Home/Home.screens';

export default function App() {
  return (
      <PaperProvider>
        {/* <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" /> */}
        <Home/>
      </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

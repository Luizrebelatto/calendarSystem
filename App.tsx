import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { Home } from './src/screens/Home/Home.screens';

export default function App() {
  return (
    <PaperProvider>
      <Home/>
    </PaperProvider>
  );
}

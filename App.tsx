import React from 'react';
import { PaperProvider } from 'react-native-paper';
import CalendarWeek from './src/components/CalendarWeek';
import { Home } from './src/screens/Home/Home.screens';

export default function App() {
  return (
    <PaperProvider>
      {/* <CalendarWeek /> */}
      <Home/>
    </PaperProvider>
  );
}

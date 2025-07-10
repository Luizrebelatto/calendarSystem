import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-paper-dropdown';
import HeaderCalendar from './HeaderCalendar';
import { generateWeekDays } from '../utils/generateWeekDays';
import ScrollViewCalendar from './ScrollViewCalendar';
import { months } from '../utils/months-days-hours';

const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(y => ({ label: `${y}`, value: y.toString() }));

export default function CalendarWeekGoogleStyle({ events, onSlotPress }) {
  const today = new Date();
  const [selectedYear, setSelectedYear] = useState(today.getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth().toString());
  const firstDayOfMonth = new Date(Number(selectedYear), Number(selectedMonth), 1);
  const firstSunday = new Date(firstDayOfMonth);
  firstSunday.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());
  const [weekIndex, setWeekIndex] = useState(0);

  const weekDays = generateWeekDays(firstSunday, weekIndex)

  const goToPreviousWeek = () => setWeekIndex(weekIndex - 1);
  const goToNextWeek = () => setWeekIndex(weekIndex + 1);

  const handleMonthChange = (value) => { setSelectedMonth(value); setWeekIndex(0); };
  const handleYearChange = (value) => { setSelectedYear(value); setWeekIndex(0); };

  return (
    <View style={styles.container}>
      <View style={styles.controlsRow}>
        <Dropdown
          label={"Ano"}
          mode={"outlined"}
          value={selectedYear}
          onSelect={handleYearChange}
          options={years}
          style={{ width: 90, marginRight: 8 }}
        />
        <Dropdown
          label={"Mês"}
          mode={"outlined"}
          value={selectedMonth}
          onSelect={handleMonthChange}
          options={months}
          style={{ width: 120, marginRight: 8 }}
        />
        <TouchableOpacity onPress={goToPreviousWeek} style={styles.navButton}><Text style={styles.navButtonText}>‹</Text></TouchableOpacity>
        <Text style={styles.weekLabel}>Week {weekIndex + 1}</Text>
        <TouchableOpacity onPress={goToNextWeek} style={styles.navButton}><Text style={styles.navButtonText}>›</Text></TouchableOpacity>
      </View>
      <HeaderCalendar
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        weekDays={weekDays}
      />
      <ScrollViewCalendar
        events={events}
        weekDays={weekDays}
        onSlotPress={onSlotPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#dbb781', paddingTop: 50 },
  controlsRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, marginBottom: 6 },
  navButton: { padding: 6, backgroundColor: '#e0e0e0', borderRadius: 5, marginHorizontal: 2 },
  navButtonText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  weekLabel: { fontWeight: 'bold', fontSize: 14, marginHorizontal: 8 },

  row: { flexDirection: 'row', minHeight: 48, borderBottomWidth: 1, borderColor: '#eee' },
}); 
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-paper-dropdown';
import HeaderCalendar from './HeaderCalendar';
import { generateWeekDays } from '../utils/generateWeekDays';

const hours = Array.from({ length: 24 }, (_, i) => i);
const months = [
  { label: 'January', value: '0' },
  { label: 'February', value: '1' },
  { label: 'March', value: '2' },
  { label: 'April', value: '3' },
  { label: 'May', value: '4' },
  { label: 'June', value: '5' },
  { label: 'July', value: '6' },
  { label: 'August', value: '7' },
  { label: 'September', value: '8' },
  { label: 'October', value: '9' },
  { label: 'November', value: '10' },
  { label: 'December', value: '11' },
];
const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(y => ({ label: `${y}`, value: y.toString() }));

const formatHour = (hour) => {
  if (hour === 0) return '12 AM';
  if (hour === 12) return '12 PM';
  if (hour > 12) return `${hour - 12} PM`;
  return `${hour} AM`;
};

export default function CalendarWeekGoogleStyle({ events, onSlotPress }) {
  const today = new Date();
  const [selectedYear, setSelectedYear] = useState(today.getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth().toString());
  const firstDayOfMonth = new Date(Number(selectedYear), Number(selectedMonth), 1);
  const firstSunday = new Date(firstDayOfMonth);
  firstSunday.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());
  const [weekIndex, setWeekIndex] = useState(0);

  const weekDays = generateWeekDays(firstSunday, weekIndex)

  const getEventsStartingAtSlot = (year, month, day, hour) => {
    return events.filter(ev =>
      ev.year === year &&
      ev.month === month &&
      ev.day === day &&
      ev.start === hour
    );
  };

  const isSlotOccupied = (year, month, day, hour) => {
    return events.some(ev =>
      ev.year === year &&
      ev.month === month &&
      ev.day === day &&
      ev.start < hour &&
      ev.end > hour
    );
  };

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
      <ScrollView style={{ flex: 1 }}>
        {hours.map((hour) => (
          <View style={styles.row} key={hour}>
            <View style={styles.hourCol}>
              <Text style={styles.hourText}>{formatHour(hour)}</Text>
            </View>
            {weekDays.map((date, dayIdx) => {
              const slotEvents = getEventsStartingAtSlot(date.getFullYear(), date.getMonth(), date.getDate(), hour);
              if (isSlotOccupied(date.getFullYear(), date.getMonth(), date.getDate(), hour)) {
                return <View key={dayIdx} style={styles.dayCol} />;
              }
              return (
                <TouchableOpacity
                  key={dayIdx}
                  style={styles.dayCol}
                  activeOpacity={0.7}
                  onPress={() => onSlotPress && onSlotPress(date, hour)}
                >
                  {slotEvents.map((ev, i) => (
                    <View
                      key={i}
                      style={[
                        styles.eventBlock,
                        {
                          height: 48 * (ev.end - ev.start) - 8,
                          top: 0,
                        },
                      ]}
                    >
                      <Text style={styles.eventTitle}>{ev.title}</Text>
                      <Text style={styles.eventTime}>{formatHour(ev.start)} - {formatHour(ev.end)}</Text>
                    </View>
                  ))}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#dbb781', paddingTop: 50 },
  controlsRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, marginBottom: 6 },
  navButton: { padding: 6, backgroundColor: '#e0e0e0', borderRadius: 5, marginHorizontal: 2 },
  navButtonText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  weekLabel: { fontWeight: 'bold', fontSize: 14, marginHorizontal: 8 },
  dayCol: {
    flex: 1,
    minHeight: 40,
    borderLeftWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  dayName: { fontWeight: 'bold', color: '#fff', fontSize: 13, marginTop: 4 },
  dayNumber: { fontWeight: 'bold', color: '#fff', fontSize: 18 },
  row: { flexDirection: 'row', minHeight: 48, borderBottomWidth: 1, borderColor: '#eee' },
  hourText: { color: '#888', fontSize: 12 },
  eventBlock: {
    backgroundColor: '#199e4c',
    borderRadius: 6,
    padding: 4,
    margin: 2,
    minWidth: 60,
    alignItems: 'center',
    position: 'absolute',
    left: 2,
    right: 2,
    zIndex: 2,
  },
  eventTitle: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  eventTime: { color: '#fff', fontSize: 10 },
}); 
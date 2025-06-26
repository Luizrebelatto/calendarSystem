import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const hours = Array.from({ length: 12 }, (_, i) => i + 2);

export default function CalendarWeek({ events }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.timeCol} />
        {days.map((day, idx) => (
          <View style={styles.dayCol} key={day}>
            <Text style={styles.dayText}>{day}</Text>
          </View>
        ))}
      </View>
      <ScrollView style={{ flex: 1 }}>
        {hours.map((hour) => (
          <View style={styles.row} key={hour}>
            <View style={styles.timeCol}>
              <Text style={styles.hourText}>{hour} AM</Text>
            </View>
            {days.map((_, dayIdx) => (
              <View style={styles.dayCol} key={dayIdx}>
                {events
                  .filter(
                    (ev) => ev.day === dayIdx && ev.start === hour
                  )
                  .map((ev) => (
                    <View style={styles.event} key={ev.id}>
                      <Text style={styles.eventText}>{ev.title}</Text>
                      <Text style={styles.eventTime}>
                        {ev.start} - {ev.end}am
                      </Text>
                    </View>
                  ))}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 60 },
  header: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#eee', backgroundColor: '#fafbfc' },
  dayCol: { flex: 1, alignItems: 'center', borderLeftWidth: 1, borderColor: '#eee', minHeight: 40 },
  dayText: { fontWeight: 'bold', padding: 6, color: '#222' },
  timeCol: { width: 50, alignItems: 'center', justifyContent: 'center' },
  hourText: { color: '#888', fontSize: 12 },
  row: { flexDirection: 'row', minHeight: 40, borderBottomWidth: 1, borderColor: '#eee' },
  event: { backgroundColor: '#199e4c', borderRadius: 6, padding: 4, margin: 2, minWidth: 80 },
  eventText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  eventTime: { color: '#fff', fontSize: 10 },
}); 
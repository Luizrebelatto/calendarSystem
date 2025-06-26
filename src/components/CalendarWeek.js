import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
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
            {days.map((_, index) => (
              <View style={styles.dayCol} key={index}>
                {events
                  .filter(
                    (item) => item.day === index && item.start === hour
                  )
                  .map((item) => (
                    <View style={styles.event} key={item.id}>
                      <Text style={styles.eventText}>{item.title}</Text>
                      <Text style={styles.eventTime}>
                        {item.start} - {item.end}am
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
  container: { 
    flex: 1, 
    backgroundColor: '#e8d6ac', 
    paddingTop: 60 
  },
  header: { 
    flexDirection: 'row', 
    borderBottomWidth: 1, 
    borderColor: '#453819', 
    backgroundColor: '#e8d6ac' 
  },
  dayCol: { 
    flex: 1, 
    alignItems: 'center', 
    borderLeftWidth: 1, 
    borderColor: '#453819', 
    minHeight: 40 
  },
  dayText: { 
    fontWeight: 'bold', 
    padding: 6, 
    color: '#222' 
  },
  timeCol: { 
    width: 50, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  hourText: { 
    color: '#888', 
    fontSize: 12 
  },
  row: { 
    flexDirection: 'row', 
    minHeight: 40, 
    borderBottomWidth: 1, 
    borderColor: '#453819' 
  },
  event: { 
    backgroundColor: '#199e4c', 
    borderRadius: 6, 
    padding: 4, 
    margin: 2, 
    minWidth: 80 
  },
  eventText: { 
    color: '#453819', 
    fontWeight: 'bold',
    fontSize: 12 
  },
  eventTime: { 
    color: '#453819', 
    fontSize: 10 
  },
}); 
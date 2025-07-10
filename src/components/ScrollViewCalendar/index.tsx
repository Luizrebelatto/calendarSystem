import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './styles';
import { formatHour } from '../../utils/format';
import { getEventsStartingAtSlot, isSlotOccupied } from '../../utils/slotCalendar';

interface IScrollViewCalendar {
    weekDays: any;
    events: any;
    onSlotPress?: (date: string, hour: number) => void;
}

export default function ScrollViewCalendar(data: IScrollViewCalendar) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  return (
    <ScrollView style={{ flex: 1 }}>
        {hours.map((hour) => (
          <View style={styles.row} key={hour}>
            <View style={styles.hourCol}>
              <Text style={styles.hourText}>{formatHour(hour)}</Text>
            </View>
            {data.weekDays.map((date, dayIdx) => {
              const slotEvents = getEventsStartingAtSlot(data.events, date.getFullYear(), date.getMonth(), date.getDate(), hour);
              if (isSlotOccupied(data.events, date.getFullYear(), date.getMonth(), date.getDate(), hour)) {
                return <View key={dayIdx} style={styles.dayCol} />;
              }
              return (
                <TouchableOpacity
                  key={dayIdx}
                  style={styles.dayCol}
                  activeOpacity={0.7}
                  onPress={() => data.onSlotPress && data.onSlotPress(date, hour)}
                >
                  {slotEvents.map((event, index) => (
                    <View
                      key={index}
                      style={[
                        styles.eventBlock,
                        {
                          height: 48 * (event.end - event.start) - 8,
                          top: 0,
                        },
                      ]}
                    >
                      <Text style={styles.eventTitle}>{event.title}</Text>
                      <Text style={styles.eventTime}>{formatHour(event.start)} - {formatHour(event.end)}</Text>
                    </View>
                  ))}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>
  );
}
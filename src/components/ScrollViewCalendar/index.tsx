import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './styles';
import { formatHour } from '../../utils/format';
import { getEventsStartingAtSlot, isSlotOccupied, getEventsWithConflicts } from '../../utils/slotCalendar';

interface IScrollViewCalendar {
    weekDays: any;
    events: any;
    onSlotPress?: (date: string, hour: number) => void;
}

export default function ScrollViewCalendar(data: IScrollViewCalendar) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  const renderEvents = (date: Date, hour: number) => {
    const slotEvents = getEventsStartingAtSlot(data.events, date.getFullYear(), date.getMonth(), date.getDate(), hour);
    const eventGroups = getEventsWithConflicts(data.events, date.getFullYear(), date.getMonth(), date.getDate(), hour);
    
    if (slotEvents.length === 0) {
      return null;
    }
    
    if (eventGroups.length === 1 && eventGroups[0].length === 1) {
      const event = slotEvents[0];
      return (
        <View
          style={[
            styles.eventBlock,
            {
              height: 48 * (event.end - event.start) - 4,
              top: 0,
            },
          ]}
        >
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventTime}>{formatHour(event.start)} - {formatHour(event.end)}</Text>
        </View>
      );
    }
    
    const renderedIds = new Set();
    const uniqueEvents = eventGroups.flat().filter(event => {
      if (renderedIds.has(event.id)) return false;
      renderedIds.add(event.id);
      return true;
    });
    return (
      <View style={styles.conflictingEventsContainer}>
        {uniqueEvents.map((event, eventIndex) => (
          <View
            key={event.id}
            style={[
              styles.conflictingEventBlock,
              {
                height: 48 * (event.end - event.start) - 4,
                marginLeft: 2,
                marginRight: 2,
                flex: 1,
                alignSelf: 'stretch',
              },
            ]}
          >
            <Text style={styles.eventTitle} numberOfLines={1}>{event.title}</Text>
            <Text style={styles.eventTime} numberOfLines={1}>{formatHour(event.start)} - {formatHour(event.end)}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={{ flex: 1 }}>
        {hours.map((hour) => (
          <View style={styles.row} key={hour}>
            <View style={styles.hourCol}>
              <Text style={styles.hourText}>{formatHour(hour)}</Text>
            </View>
            {data.weekDays.map((date, dayIdx) => {
              const slotEvents = getEventsStartingAtSlot(data.events, date.getFullYear(), date.getMonth(), date.getDate(), hour);
              
              if (isSlotOccupied(data.events, date.getFullYear(), date.getMonth(), date.getDate(), hour) && slotEvents.length === 0) {
                return <View key={dayIdx} style={styles.dayCol} />;
              }
              
              return (
                <TouchableOpacity
                  key={dayIdx}
                  style={styles.dayCol}
                  activeOpacity={0.7}
                  onPress={() => data.onSlotPress && data.onSlotPress(date, hour)}
                >
                  {renderEvents(date, hour)}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>
  );
}
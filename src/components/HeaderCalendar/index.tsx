import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './styles';

interface IHeaderCalendar {
    selectedYear: string;
    selectedMonth: string;
    weekDays: any;
}

export default function HeaderCalendar(data: IHeaderCalendar) {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <View style={styles.headerRow}>
      <View style={styles.hourCol} />
      {data.weekDays.map((date, idx) => (
        <View style={styles.dayCol} key={idx}>
          <Text style={styles.dayName}>{daysOfWeek[date.getDay()]}</Text>
          <Text style={styles.dayNumber}>{date.getDate()}</Text>
        </View>
      ))}
    </View>
  );
}



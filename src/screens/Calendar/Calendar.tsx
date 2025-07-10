import React, { useState } from 'react';
import { View } from 'react-native';
import HeaderCalendar from '../../components/HeaderCalendar';
import { generateWeekDays } from '../../utils/generateWeekDays';
import ScrollViewCalendar from '../../components/ScrollViewCalendar';
import { styles } from './styles';
import WrapperMonthYearDropDown from '../../components/WrapperMonthYearDropDown';

export default function Calendar({ events, onSlotPress }) {
  const today = new Date();
  const [selectedYear, setSelectedYear] = useState(today.getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth().toString());
  const firstDayOfMonth = new Date(Number(selectedYear), Number(selectedMonth), 1);
  const firstSunday = new Date(firstDayOfMonth);
  firstSunday.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());
  const [weekIndex, setWeekIndex] = useState(0);

  const weekDays = generateWeekDays(firstSunday, weekIndex)

  return (
    <View style={styles.container}>
      <WrapperMonthYearDropDown
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        setSelectedYear={setSelectedYear}

      />
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
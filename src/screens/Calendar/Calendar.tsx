import React, { useState } from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-paper-dropdown';
import HeaderCalendar from '../../components/HeaderCalendar';
import { generateWeekDays } from '../../utils/generateWeekDays';
import ScrollViewCalendar from '../../components/ScrollViewCalendar';
import { months, years } from '../../utils/months-days-hours';
import { styles } from './styles';
import DateSelect from '../../components/DateSelect';

export default function Calendar({ events, onSlotPress }) {
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
        <DateSelect goToNextWeek={goToNextWeek} goToPreviousWeek={goToPreviousWeek} weekIndex={weekIndex}/>
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
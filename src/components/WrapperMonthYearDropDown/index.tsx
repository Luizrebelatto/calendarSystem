import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { Dropdown } from 'react-native-paper-dropdown';
import DateSelect from '../DateSelect';
import { months, years } from '../../utils/months-days-hours';

interface IWrapperMonthYearDropDown {
    setSelectedMonth: (value) => void;
    setSelectedYear: (value) => void;
    selectedYear: string;
    selectedMonth: string;
}

export default function WrapperMonthYearDropDown(data: IWrapperMonthYearDropDown) {
    const [weekIndex, setWeekIndex] = useState(0);

    const goToPreviousWeek = () => setWeekIndex(weekIndex - 1);
    const goToNextWeek = () => setWeekIndex(weekIndex + 1);
  
    const handleMonthChange = (value) => { data.setSelectedMonth(value); setWeekIndex(0); };
    const handleYearChange = (value) => { data.setSelectedYear(value); setWeekIndex(0); };
  return (
    <View style={styles.controlsRow}>
        <Dropdown
          label={"Year"}
          mode={"outlined"}
          value={data.selectedYear}
          onSelect={handleYearChange}
          options={years}
          menuContentStyle={styles.dropdown}
        />
        <Dropdown
          label={"Month"}
          mode={"outlined"}
          value={data.selectedMonth}
          onSelect={handleMonthChange}
          options={months}
          menuContentStyle={styles.dropdown}
        />
        <DateSelect goToNextWeek={goToNextWeek} goToPreviousWeek={goToPreviousWeek} weekIndex={weekIndex}/>
      </View>
  );
}



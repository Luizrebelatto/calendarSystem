import React from 'react';
import { View } from 'react-native';
import { Dialog, Portal, Button, TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-paper-dropdown';
import { days, hours, months, years } from '../../utils/months-days-hours';
import { styles } from './styles';

interface Props {
  visible: boolean;
  onDismiss: () => void;
  onAdd: () => void;
  meetingTitle: string;
  setMeetingTitle: (title: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  selectedDay: string;
  setSelectedDay: (day: string) => void;
  selectedStartHour: string;
  setSelectedStartHour: (hour: string) => void;
  selectedEndHour: string;
  setSelectedEndHour: (hour: string) => void;
}

export function PortalComponent({
  visible,
  onDismiss,
  onAdd,
  meetingTitle,
  setMeetingTitle,
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  selectedDay,
  setSelectedDay,
  selectedStartHour,
  setSelectedStartHour,
  selectedEndHour,
  setSelectedEndHour,
}: Props) {
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={styles.dialog}
      >
        <Dialog.Title style={{ textAlign: 'center' }}>Create Meeting</Dialog.Title>
        <Dialog.Content>
          <View style={styles.viewTitle}>
            <TextInput
              label="Meeting Title"
              value={meetingTitle}
              onChangeText={setMeetingTitle}
              mode="outlined"
              style={{ marginBottom: 10 }}
              placeholder="Enter the meeting title"
            />
            <Dropdown
              label="Year"
              mode="outlined"
              value={selectedYear}
              onSelect={setSelectedYear}
              options={years}
            />
            <Dropdown
              label="Month"
              mode="outlined"
              value={selectedMonth}
              onSelect={setSelectedMonth}
              options={months}
            />
            <Dropdown
              label="Day"
              mode="outlined"
              value={selectedDay}
              onSelect={setSelectedDay}
              options={days}
            />
            <Dropdown
              label="Begin Hour"
              mode="outlined"
              value={selectedStartHour}
              onSelect={setSelectedStartHour}
              options={hours}
            />
            <Dropdown
              label="End Hour"
              mode="outlined"
              value={selectedEndHour}
              onSelect={setSelectedEndHour}
              options={hours}
            />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancelar</Button>
          <Button onPress={onAdd}>Adicionar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
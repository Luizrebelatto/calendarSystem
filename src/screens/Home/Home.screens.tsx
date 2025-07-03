import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { AnimatedFAB, Dialog, Portal, Button, TextInput } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { styles } from "./Home.styles";
import CalendarWeekGoogleStyle from "../../components/CalendarWeek";

const initialEvents = [
  { id: 1, title: 'Meeting', year: 2024, month: 11, day: 15, start: 9, end: 10 },
  { id: 2, title: 'Meeting', year: 2024, month: 11, day: 18, start: 8, end: 9 },
  { id: 3, title: 'Meeting', year: 2024, month: 11, day: 20, start: 8, end: 9 },
  { id: 4, title: 'Meeting', year: 2024, month: 11, day: 22, start: 9, end: 10 },
];

const days = Array.from({ length: 31 }, (_, i) => i + 1).map(d => ({ label: `${d}`, value: d.toString() }));
const months = [
  { label: 'Janeiro', value: '0' },
  { label: 'Fevereiro', value: '1' },
  { label: 'Março', value: '2' },
  { label: 'Abril', value: '3' },
  { label: 'Maio', value: '4' },
  { label: 'Junho', value: '5' },
  { label: 'Julho', value: '6' },
  { label: 'Agosto', value: '7' },
  { label: 'Setembro', value: '8' },
  { label: 'Outubro', value: '9' },
  { label: 'Novembro', value: '10' },
  { label: 'Dezembro', value: '11' },
];
const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(y => ({ label: `${y}`, value: y.toString() }));
const hours = Array.from({ length: 12 }, (_, i) => i + 2).map(h => ({ label: `${h}:00`, value: h.toString() }));

export function Home(){
    const [events, setEvents] = useState(initialEvents);
    const [modalVisible, setModalVisible] = useState(false);
    const [meetingTitle, setMeetingTitle] = useState('');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth().toString());
    const [selectedDay, setSelectedDay] = useState('15');
    const [selectedStartHour, setSelectedStartHour] = useState('8');
    const [selectedEndHour, setSelectedEndHour] = useState('9');

    const handleCreateMeeting = () => {
        setModalVisible(true);
    };

    const handleSlotPress = (date, hour) => {
        setSelectedYear(date.getFullYear().toString());
        setSelectedMonth(date.getMonth().toString());
        setSelectedDay(date.getDate().toString());
        setSelectedStartHour(hour.toString());
        setSelectedEndHour((hour + 1).toString());
        setModalVisible(true);
    };

    const handleAddMeeting = () => {
        const hasConflict = events.some(ev =>
            ev.year === Number(selectedYear) &&
            ev.month === Number(selectedMonth) &&
            ev.day === Number(selectedDay) &&
            ((Number(selectedStartHour) < ev.end && Number(selectedEndHour) > ev.start))
        );
        if (hasConflict) {
            Alert.alert('Time conflict', 'There is already a meeting during this period.');
            return;
        }
        const nextId = events.length + 1;
        setEvents([
            ...events,
            {
                id: nextId,
                title: meetingTitle || 'Meeting',
                year: Number(selectedYear),
                month: Number(selectedMonth),
                day: Number(selectedDay),
                start: Number(selectedStartHour),
                end: Number(selectedEndHour)
            }
        ]);
        setModalVisible(false);
        setMeetingTitle('');
    };

    return (
        <View style={styles.wrapper}>
            <CalendarWeekGoogleStyle events={events} onSlotPress={handleSlotPress}/>
            <AnimatedFAB
                icon="plus"
                label="Create Meeting"
                extended={true}
                onPress={handleCreateMeeting}
                visible={true}
                animateFrom="left"
                iconMode="dynamic"
                style={styles.fabStyle}
             />
            <Portal>
              <Dialog visible={modalVisible} onDismiss={() => setModalVisible(false)} style={{ alignSelf: 'center', width: 300, backgroundColor: '#cb9b54' }}>
                <Dialog.Title style={{ textAlign: 'center' }}>Create Meeting</Dialog.Title>
                <Dialog.Content>
                  <View style={{ backgroundColor: '#cb9b54', borderRadius: 10, padding: 10 }}>
                    <TextInput
                      label="Meeting Title"
                      value={meetingTitle}
                      onChangeText={setMeetingTitle}
                      mode="outlined"
                      style={{ marginBottom: 10 }}
                      placeholder="Enter the meeting title"
                    />
                    <Dropdown
                      label={"Year"}
                      mode={"outlined"}
                      value={selectedYear}
                      onSelect={setSelectedYear}
                      options={years}
                    />
                    <Dropdown
                      label={"Month"}
                      mode={"outlined"}
                      value={selectedMonth}
                      onSelect={setSelectedMonth}
                      options={months}
                    />
                    <Dropdown
                      label={"day"}
                      mode={"outlined"}
                      value={selectedDay}
                      onSelect={setSelectedDay}
                      options={days}
                    />
                    <Dropdown
                      label={"begin hour"}
                      mode={"outlined"}
                      value={selectedStartHour}
                      onSelect={setSelectedStartHour}
                      options={hours}
                    />
                    <Dropdown
                      label={"end hour"}
                      mode={"outlined"}
                      value={selectedEndHour}
                      onSelect={setSelectedEndHour}
                      options={hours}
                    />
                  </View>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={() => setModalVisible(false)}>Cancelar</Button>
                  <Button onPress={handleAddMeeting}>Adicionar</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
       </View>
    )
}
import React, { useState } from "react";
import { View, Alert } from "react-native";
import { AnimatedFAB } from "react-native-paper";
import { styles } from "./Home.styles";
import CalendarWeekGoogleStyle from "../Calendar/Calendar";
import { PortalComponent } from "../../components/PortalComponent";

const initialEvents = [
  { id: 1, title: 'Meeting', year: 2024, month: 11, day: 15, start: 9, end: 10 },
  { id: 2, title: 'Meeting', year: 2024, month: 11, day: 18, start: 8, end: 9 },
  { id: 3, title: 'Meeting', year: 2024, month: 11, day: 20, start: 8, end: 9 },
  { id: 4, title: 'Meeting', year: 2024, month: 11, day: 22, start: 9, end: 10 },
];

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
        if (Number(selectedEndHour) <= Number(selectedStartHour)) {
            Alert.alert('Invalid time', 'End time must be after start time.');
            return;
        }
        
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
            <PortalComponent
              visible={modalVisible}
              onDismiss={() => setModalVisible(false)}
              onAdd={handleAddMeeting}
              meetingTitle={meetingTitle}
              setMeetingTitle={setMeetingTitle}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              selectedStartHour={selectedStartHour}
              setSelectedStartHour={setSelectedStartHour}
              selectedEndHour={selectedEndHour}
              setSelectedEndHour={setSelectedEndHour}
            />
       </View>
    )
}
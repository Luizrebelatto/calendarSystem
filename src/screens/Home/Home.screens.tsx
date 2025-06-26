import React, { useState } from "react";
import { View, Text } from "react-native";
import { AnimatedFAB, Dialog, Portal, Button, TextInput } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { styles } from "./Home.styles";
import CalendarWeek from "../../components/CalendarWeek";

const initialEvents = [
  { id: 1, title: 'Meeting', day: 1, start: 9, end: 10 },
  { id: 2, title: 'Meeting', day: 2, start: 8, end: 9 },
  { id: 3, title: 'Meeting', day: 3, start: 8, end: 9 },
  { id: 4, title: 'Meeting', day: 2, start: 9, end: 10 },
];

const days = [
  { label: 'Domingo', value: '0' },
  { label: 'Segunda', value: '1' },
  { label: 'Terça', value: '2' },
  { label: 'Quarta', value: '3' },
  { label: 'Quinta', value: '4' },
  { label: 'Sexta', value: '5' },
  { label: 'Sábado', value: '6' },
];
const hours = Array.from({ length: 12 }, (_, i) => i + 2).map(h => ({ label: `${h}:00`, value: h.toString() }));

export function Home(){
    const [events, setEvents] = useState(initialEvents);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState('1');
    const [selectedHour, setSelectedHour] = useState('8');
    const [showDayDropdown, setShowDayDropdown] = useState(false);
    const [showHourDropdown, setShowHourDropdown] = useState(false);

    const handleCreateMeeting = () => {
        setModalVisible(true);
    };

    const handleAddMeeting = () => {
        const nextId = events.length + 1;
        setEvents([
            ...events,
            {
                id: nextId,
                title: 'Meeting',
                day: Number(selectedDay),
                start: Number(selectedHour),
                end: Number(selectedHour) + 1
            }
        ]);
        setModalVisible(false);
    };

    return (
        <View style={styles.wrapper}>
            <CalendarWeek events={events}/>
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
              <Dialog visible={modalVisible} onDismiss={() => setModalVisible(false)} style={{ alignSelf: 'center', width: 260, backgroundColor: '#cb9b54' }}>
                <Dialog.Title style={{ textAlign: 'center' }}>Criar Reunião</Dialog.Title>
                <Dialog.Content>
                  <View style={{ backgroundColor: '#cb9b54', borderRadius: 10, padding: 10 }}>
                    <Dropdown
                      label={"Dia da semana"}
                      mode={"outlined"}
                      value={selectedDay}
                      onSelect={setSelectedDay}
                      options={days}
                    />
                    <Dropdown
                      label={"Hora de início"}
                      mode={"outlined"}
                      value={selectedHour}
                      onSelect={setSelectedHour}
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
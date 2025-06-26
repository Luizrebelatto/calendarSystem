import React, { useState } from "react";
import { View } from "react-native";
import { AnimatedFAB } from "react-native-paper";
import { styles } from "./Home.styles";
import CalendarWeek from "../../components/CalendarWeek";

const initialEvents = [
  { id: 1, title: 'English Class - Aline', day: 1, start: 9, end: 10 },
  { id: 2, title: 'English Class - Aline', day: 2, start: 8, end: 9 },
  { id: 3, title: 'English Class', day: 3, start: 8, end: 9 },
  { id: 4, title: 'English Class - Aline', day: 2, start: 9, end: 10 },
];

export function Home(){
    const [events, setEvents] = useState(initialEvents);

    const handleCreateMeeting = () => {
        // Cria um evento mock para a próxima vaga disponível na semana
        const nextId = events.length + 1;
        // Exemplo: adiciona na quarta-feira às 10h
        setEvents([
            ...events,
            {
                id: nextId,
                title: 'Meeting',
                day: 3, // quarta-feira
                start: 10,
                end: 11
            }
        ]);
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
       </View>
    )
}
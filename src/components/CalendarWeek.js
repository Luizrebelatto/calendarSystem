import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-paper-dropdown';

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const hours = Array.from({ length: 13 }, (_, i) => i + 1); // 1AM até 1PM
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

export default function CalendarWeekGoogleStyle({ events, onSlotPress }) {
  // Estado para ano, mês e semana
  const today = new Date();
  const [selectedYear, setSelectedYear] = useState(today.getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth().toString());
  // Calcula o primeiro dia do mês selecionado
  const firstDayOfMonth = new Date(Number(selectedYear), Number(selectedMonth), 1);
  // Calcula o primeiro domingo do mês selecionado
  const firstSunday = new Date(firstDayOfMonth);
  firstSunday.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());
  // Estado para o índice da semana (0 = primeira semana do mês)
  const [weekIndex, setWeekIndex] = useState(0);

  // Gera os dias da semana exibida
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(firstSunday);
    d.setDate(firstSunday.getDate() + weekIndex * 7 + i);
    return d;
  });

  // Função para encontrar eventos que começam neste slot
  const getEventsStartingAtSlot = (year, month, day, hour) => {
    return events.filter(ev =>
      ev.year === year &&
      ev.month === month &&
      ev.day === day &&
      ev.start === hour
    );
  };

  // Função para saber se o slot está ocupado por um evento que começou antes
  const isSlotOccupied = (year, month, day, hour) => {
    return events.some(ev =>
      ev.year === year &&
      ev.month === month &&
      ev.day === day &&
      ev.start < hour &&
      ev.end > hour
    );
  };

  // Navegação de semana
  const goToPreviousWeek = () => setWeekIndex(weekIndex - 1);
  const goToNextWeek = () => setWeekIndex(weekIndex + 1);
  // Ao trocar mês/ano, reseta para a primeira semana
  const handleMonthChange = (value) => { setSelectedMonth(value); setWeekIndex(0); };
  const handleYearChange = (value) => { setSelectedYear(value); setWeekIndex(0); };

  return (
    <View style={styles.container}>
      {/* Controles de navegação */}
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
        <TouchableOpacity onPress={goToPreviousWeek} style={styles.navButton}><Text style={styles.navButtonText}>‹</Text></TouchableOpacity>
        <Text style={styles.weekLabel}>Semana {weekIndex + 1}</Text>
        <TouchableOpacity onPress={goToNextWeek} style={styles.navButton}><Text style={styles.navButtonText}>›</Text></TouchableOpacity>
      </View>
      {/* Cabeçalho com dias da semana */}
      <View style={styles.headerRow}>
        <View style={styles.hourCol} />
        {weekDays.map((date, idx) => (
          <View style={styles.dayCol} key={idx}>
            <Text style={styles.dayName}>{daysOfWeek[date.getDay()]}</Text>
            <Text style={styles.dayNumber}>{date.getDate()}</Text>
          </View>
        ))}
      </View>
      <ScrollView style={{ flex: 1 }}>
        {hours.map((hour) => (
          <View style={styles.row} key={hour}>
            <View style={styles.hourCol}>
              <Text style={styles.hourText}>{hour} AM</Text>
            </View>
            {weekDays.map((date, dayIdx) => {
              // Só renderiza bloco se o evento começa neste slot
              const slotEvents = getEventsStartingAtSlot(date.getFullYear(), date.getMonth(), date.getDate(), hour);
              // Se o slot está ocupado por evento iniciado antes, não renderiza nada
              if (isSlotOccupied(date.getFullYear(), date.getMonth(), date.getDate(), hour)) {
                return <View key={dayIdx} style={styles.dayCol} />;
              }
              return (
                <TouchableOpacity
                  key={dayIdx}
                  style={styles.dayCol}
                  activeOpacity={0.7}
                  onPress={() => onSlotPress && onSlotPress(date, hour)}
                >
                  {slotEvents.map((ev, i) => (
                    <View
                      key={i}
                      style={[styles.eventBlock, { height: 48 * (ev.end - ev.start) - 8 }]}
                    >
                      <Text style={styles.eventTitle}>{ev.title}</Text>
                      <Text style={styles.eventTime}>{ev.start}:00 - {ev.end}:00</Text>
                    </View>
                  ))}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 10 },
  controlsRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, marginBottom: 6 },
  navButton: { padding: 6, backgroundColor: '#e0e0e0', borderRadius: 5, marginHorizontal: 2 },
  navButtonText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  weekLabel: { fontWeight: 'bold', fontSize: 14, marginHorizontal: 8 },
  headerRow: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#eee', backgroundColor: '#fafbfc' },
  hourCol: { width: 50, alignItems: 'center', justifyContent: 'center' },
  dayCol: { flex: 1, minHeight: 40, borderLeftWidth: 1, borderColor: '#eee', alignItems: 'center', justifyContent: 'flex-start' },
  dayName: { fontWeight: 'bold', color: '#222', fontSize: 13, marginTop: 4 },
  dayNumber: { fontWeight: 'bold', color: '#199e4c', fontSize: 18 },
  row: { flexDirection: 'row', minHeight: 48, borderBottomWidth: 1, borderColor: '#eee' },
  hourText: { color: '#888', fontSize: 12 },
  eventBlock: { backgroundColor: '#199e4c', borderRadius: 6, padding: 4, margin: 2, minWidth: 60, alignItems: 'center' },
  eventTitle: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  eventTime: { color: '#fff', fontSize: 10 },
}); 
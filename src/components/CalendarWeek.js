import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export default function CalendarMonth({ events }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  // Obter o primeiro dia do mês e quantos dias tem o mês
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const firstDayWeekday = firstDayOfMonth.getDay();
  
  // Gerar array de dias para exibir no calendário
  const generateDays = () => {
    const days = [];
    
    // Adicionar dias vazios do início (dias do mês anterior)
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push({ day: '', isEmpty: true });
    }
    
    // Adicionar todos os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dayOfWeek = date.getDay();
      
      // Verificar se há eventos neste dia
      const dayEvents = events.filter(event => {
        return event.year === currentYear && 
               event.month === currentMonth && 
               event.day === day;
      });
      
      days.push({
        day,
        isEmpty: false,
        hasEvents: dayEvents.length > 0,
        events: dayEvents
      });
    }
    
    return days;
  };
  
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };
  
  const goToPreviousYear = () => {
    setCurrentDate(new Date(currentYear - 1, currentMonth, 1));
  };
  
  const goToNextYear = () => {
    setCurrentDate(new Date(currentYear + 1, currentMonth, 1));
  };
  
  const days = generateDays();
  
  return (
    <View style={styles.container}>
      {/* Header com navegação */}
      <View style={styles.header}>
        <View style={styles.navigationRow}>
          <TouchableOpacity onPress={goToPreviousYear} style={styles.navButton}>
            <Text style={styles.navButtonText}>‹‹</Text>
          </TouchableOpacity>
          <Text style={styles.yearText}>{currentYear}</Text>
          <TouchableOpacity onPress={goToNextYear} style={styles.navButton}>
            <Text style={styles.navButtonText}>››</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.navigationRow}>
          <TouchableOpacity onPress={goToPreviousMonth} style={styles.navButton}>
            <Text style={styles.navButtonText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.monthText}>{months[currentMonth]}</Text>
          <TouchableOpacity onPress={goToNextMonth} style={styles.navButton}>
            <Text style={styles.navButtonText}>›</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Dias da semana */}
      <View style={styles.weekDaysHeader}>
        {daysOfWeek.map((day) => (
          <View key={day} style={styles.weekDayCell}>
            <Text style={styles.weekDayText}>{day}</Text>
          </View>
        ))}
      </View>
      
      {/* Grid de dias */}
      <ScrollView style={styles.daysGrid}>
        <View style={styles.daysContainer}>
          {days.map((dayData, index) => (
            <View key={index} style={styles.dayCell}>
              {!dayData.isEmpty && (
                <View style={styles.dayContent}>
                  <Text style={styles.dayText}>{dayData.day}</Text>
                  {dayData.hasEvents && (
                    <View style={styles.eventIndicator}>
                      <Text style={styles.eventIndicatorText}>•</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  header: {
    backgroundColor: '#fafbfc',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  navigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  navButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    minWidth: 40,
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  yearText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  monthText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  weekDaysHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  weekDayCell: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  weekDayText: {
    fontWeight: 'bold',
    color: '#666',
  },
  daysGrid: {
    flex: 1,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%', // 100% / 7 dias
    aspectRatio: 1,
    borderWidth: 0.5,
    borderColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayContent: {
    alignItems: 'center',
  },
  dayText: {
    fontSize: 16,
    color: '#333',
  },
  eventIndicator: {
    marginTop: 2,
  },
  eventIndicatorText: {
    fontSize: 12,
    color: '#199e4c',
    fontWeight: 'bold',
  },
}); 
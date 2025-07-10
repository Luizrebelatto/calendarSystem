import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './styles';

interface IDateSelect {
    weekIndex: number;
    goToPreviousWeek: () => void;
    goToNextWeek: () => void;
}

export default function DateSelect(data: IDateSelect) {
  return (
    <>
        <TouchableOpacity onPress={data.goToPreviousWeek} style={styles.navButton}>
            <Text style={styles.navButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.weekLabel}>Week {data.weekIndex + 1}</Text>
        <TouchableOpacity 
            onPress={data.goToNextWeek} 
            style={styles.navButton}
        >
            <Text style={styles.navButtonText}>›</Text>
        </TouchableOpacity>
    </>
  );
}



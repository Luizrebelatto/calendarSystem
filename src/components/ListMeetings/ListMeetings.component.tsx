import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { styles } from './ListMeetings.styles';

type Meetings = {
  id: string;
  date: string;
  time: string;
  description: string;
};

type ListMeetingsProps = {
  meetings: Meetings[];
};

export default function ListMeetings({ meetings }: ListMeetingsProps) {
  return (
    <FlatList
      data={meetings}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <Card style={styles.card}>
          <Card.Title
            titleStyle={styles.textCard}
            subtitleStyle={styles.textCard}
            title={item.description}
            subtitle={`${item.date} às ${item.time}`}
          />
        </Card>
      )}
      ListEmptyComponent={<Text style={styles.empty}>No appointments found.</Text>}
    />
  );
}
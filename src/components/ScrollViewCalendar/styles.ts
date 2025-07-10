import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    row: { 
        flexDirection: 'row', 
        minHeight: 48, 
        borderBottomWidth: 1, 
        borderColor: '#eee' 
    },
    hourText: { 
        color: '#888', 
        fontSize: 12 
    },
    dayCol: {
      flex: 1,
      minHeight: 40,
      borderLeftWidth: 1,
      borderColor: '#eee',
      alignItems: 'center',
      justifyContent: 'flex-start',
      position: 'relative',
    },
    eventBlock: {
      backgroundColor: '#199e4c',
      borderRadius: 6,
      padding: 4,
      margin: 2,
      minWidth: 60,
      alignItems: 'center',
      position: 'absolute',
      left: 2,
      right: 2,
      zIndex: 2,
    },
    conflictingEventsContainer: {
      flexDirection: 'row',
      width: '100%',
      zIndex: 2,
    },
    eventGroup: {
      flex: 1,
      position: 'relative',
    },
    conflictingEventBlock: {
      backgroundColor: '#ff6b6b',
      borderRadius: 3,
      padding: 1,
      marginLeft: 2,
      marginRight: 2,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      alignSelf: 'stretch',
    },
    eventTitle: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
    eventTime: { color: '#fff', fontSize: 10 },
    hourCol: { 
        width: 50, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
})
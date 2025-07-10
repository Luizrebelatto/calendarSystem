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
    eventTitle: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
    eventTime: { color: '#fff', fontSize: 10 },
    hourCol: { 
        width: 50, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
})
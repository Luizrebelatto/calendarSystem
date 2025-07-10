import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    headerRow: { 
        flexDirection: 'row', 
        borderBottomWidth: 1, 
        borderColor: '#eee', 
        backgroundColor: '#dbb781' 
    },
    hourCol: { 
        width: 50, 
        alignItems: 'center', 
        justifyContent: 'center' 
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
    dayName: { 
        fontWeight: 'bold', 
        color: '#fff', 
        fontSize: 13, 
        marginTop: 4
    },
    dayNumber: { 
        fontWeight: 'bold', 
        color: '#fff', 
        fontSize: 18 
    },
})
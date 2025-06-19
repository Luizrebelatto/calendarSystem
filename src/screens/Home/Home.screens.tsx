

import { View, StyleSheet } from "react-native";
import { AnimatedFAB } from "react-native-paper";
import ListMeetings  from "../../components/ListMeetings/ListMeetings.component";
import { fakeMeetings } from "../../data/meetings";

export function Home(){
    return (
        <View style={styles.wrapper}>
           <ListMeetings meetings={fakeMeetings}/>
            <AnimatedFAB
                icon="plus"
                label="Create Meeting"
                extended={true}
                onPress={() => console.log("Press")}
                visible={true}
                animateFrom="left"
                iconMode="dynamic"
                style={styles.fabStyle}
             />
       </View>
    )
}

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: "100%",
        alignContent: "center",
        justifyContent: "center",
        paddingHorizontal: 15,
        backgroundColor: "#f2dab5",
    },
    container: {
        flexGrow: 1,
    },
    fabStyle: {
        bottom: 16,
        right: 16,
        position: 'absolute',
        backgroundColor: "#cb9b54"
    },
})
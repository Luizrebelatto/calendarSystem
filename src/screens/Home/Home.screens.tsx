

import { View } from "react-native";
import { AnimatedFAB } from "react-native-paper";
import ListMeetings  from "../../components/ListMeetings/ListMeetings.component";
import { fakeMeetings } from "../../data/meetings";
import { styles } from "./Home.styles";

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


import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, AnimatedFAB } from "react-native-paper";

export function Home(){
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    
    return (
        <View style={styles.wrapper}>
            <TextInput
                label="Email"
                mode="outlined"
                value={email}
                onChangeText={email => setEmail(email)}
                keyboardType="email-address"
            />
            <TextInput
                label="Password"
                mode="outlined"
                value={password}
                onChangeText={password => setPassword(password)}
                style={{ marginTop: 10 }}
                keyboardType="default"
                secureTextEntry={true}
            />
            <AnimatedFAB
                icon="plus"
                label="Novo item"
                extended={true}
                onPress={() => console.log("PRESSED")}
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
        backgroundColor: "#f2dab5"
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
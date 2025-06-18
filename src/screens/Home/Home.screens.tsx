import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput, Avatar } from "react-native-paper";

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
            <Button mode="contained" onPress={() => console.log("press")} style={{ marginTop: 60, backgroundColor: "#D86F36" }}>
                Create Meeting
            </Button>
       </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: "100%",
        alignContent: "center",
        justifyContent: "center",
        paddingHorizontal: 15,
        backgroundColor: "#f2dab5"
    }
})
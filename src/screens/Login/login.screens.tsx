import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";

export function Login(){
    const [text, setText] = useState("")
    return (
        <View style={styles.wrapper}>
            <TextInput
                label="Email"
                mode="outlined"
                value={text}
                onChangeText={text => setText(text)}
            />
            <TextInput
                label="Password"
                mode="outlined"
                value={text}
                onChangeText={text => setText(text)}
                style={{ marginTop: 10 }}
            />
            <Button mode="contained" onPress={() => console.log("press")} style={{ marginTop: 60 }}>
                Login
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

    }
})
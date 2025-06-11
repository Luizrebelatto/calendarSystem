import { useState } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
export function Login(){
    const [text, setText] = useState("")
    return (
        <View style={{ flex: 1, width: "100%", alignContent: "center", justifyContent: "center" }}>
            <TextInput
                label="Email"
                mode="outlined"
                value={text}
                onChangeText={text => setText(text)}
                selectionColor="red"
            />
            <TextInput
                label="Email"
                mode="outlined"
                value={text}
                onChangeText={text => setText(text)}
            />
            <Button mode="contained" onPress={() => console.log("press")} style={{ marginTop: 60 }}>
                Login
            </Button>
       </View>
    )
}
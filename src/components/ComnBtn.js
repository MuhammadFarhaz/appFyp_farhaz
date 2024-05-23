import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ComnBtn({ title, add ,createCart, id}) {
    return (
        <View >
                <View  style={{ alignSelf: "center", height: 60, width: "90%", borderRadius: 15, backgroundColor: "#ffbf00", justifyContent: "center" }}>
                    <Text style={{ alignSelf: "center", fontSize: 18, color: "black" }}>{title}</Text>
                </View>
        </View>
    )
}
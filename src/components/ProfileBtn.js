import { View, Text } from 'react-native'
import React from 'react'
import Iconsgreater from 'react-native-vector-icons/Feather';
import Iconsarrow from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ProfileBtn({ text }) {
    return (
        <View >
            <View style={{
                height: 60, width: "100%", borderColor: "grey", borderTopWidth: 1, justifyContent: "center",
            }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: "5%" }}>
                    <View style={{ flexDirection: "row" }}>
                        <Iconsgreater style={{}} name="shopping-bag" size={23} color="black" />
                        <Text style={{ color: "black", fontSize: 16, marginTop: "1%", marginLeft: "5%" }}>{text}</Text>
                    </View>
                    <View>
                        <Iconsarrow style={{}} name="greater-than" size={20} color="black" />
                    </View>
                </View>
            </View>

        </View>
    )
}
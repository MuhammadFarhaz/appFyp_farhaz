import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import ExclusiveOffer from '../components/ExclusiveOffer'

export default function Beverages({navigation}) {
    return (
        <View style={{flex:1}}>
            <TouchableOpacity onPress={() => navigation.navigate("Filters")} >
            <Text style={{
                fontSize: 20, fontWeight: "600", color: "black",
                textAlign: "center", marginTop: 15
            }}>Beverages</Text>
            </TouchableOpacity>
            <ScrollView style={{marginTop: 15}}>
    
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: "5%", marginTop: 10 }}>
                        <ExclusiveOffer  num={2} horzontal={false} title="Organic Bananas" titlea="7pcs, Priceg" titleb="$3.99" />
                    </View>
                  

                   

            </ScrollView>
        </View>
    )
}
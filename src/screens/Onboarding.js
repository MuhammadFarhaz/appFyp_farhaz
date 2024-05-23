import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import ComnBtn from '../components/ComnBtn'

export default function Onboarding({navigation}) {
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground style={{ height: "100%", width: "100%" }} source={require('../assests/menonboard.png')} >



                <View style={{ justifyContent: "flex-end", flex: 2, marginBottom: "20%" }}>
                    <Image style={{ alignSelf: "center" }} source={require('../assests/carrot.png')} />
                    <Text style={{ fontSize: 55, color: "white", alignSelf: "center", textAlign: "center" }}>Welcome{"\n"}FreshPicken</Text>
                    <Text style={{ alignSelf: "center", color: "white" }}>Ger your groceries in as fast as one hour</Text>

                    <TouchableOpacity style={{marginTop:10}} onPress={() => navigation.navigate('BottomTab')}>
                       
                            <ComnBtn title="Get Started" />
                        
                    </TouchableOpacity>
                </View>


            </ImageBackground>




        </View>
    )
}
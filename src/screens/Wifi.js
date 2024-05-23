import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Iconsmin from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Wifi() {
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{}}>
        <Iconsmin
          style={{marginTop: '5%'}}
          name="wifi-strength-1-alert"
          size={100}
          color="#53B175"
        />
      </View>
      <Text style={{fontSize: 18}}>Something Went Wrong</Text>
      <Text style={{textAlign: 'center', marginTop: '7%'}}>
        Make sure wifi or cellular data is turned{'\n'}on and then try again
      </Text>
      <TouchableOpacity
        style={{
          height: 40,
          width: '40%',
          backgroundColor: '#53B175',
          borderRadius: 25,
          marginTop: '8%',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
          TRY AGAIN
        </Text>
      </TouchableOpacity>
    </View>
  );
}

import { View, Text, Image } from 'react-native';
import React from 'react';

export default function FavrtCompnt({ item }) {
  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '90%',
          alignSelf: 'center',
          height: 110,
          borderBottomWidth: 1,
        }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ justifyContent: 'center' }}>
            <Image
              style={{ height: 60, width: 60 }}
              source={{ uri: item?.image }}
            />
          </View>
          <View style={{ justifyContent: 'center', marginLeft: '5%' }}>
            <Text style={{ color: 'black', fontSize: 18 }}>{item?.title}</Text>
          </View>
        </View>

        <View style={{ justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'black', fontSize: 18, marginRight: 10, fontWeight: "bold" }}>
             Rs {item?.price}
            </Text>

          </View>
        </View>
      </View>
    </View>
  );
}

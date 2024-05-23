import { View, Text } from 'react-native';
import React from 'react';
import { Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Iconspplus from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

export default function Card({ title, price, size, id, image, horzontal, item }) {
  const navigation = useNavigation();

  return (

    <View
      style={{
        margin: 10,
        height: 200, // Adjust the height as per your requirement
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View>
        <View
          style={{
            justifyContent: 'center',
            height: 210,
            width: 160,
            backgroundColor: 'white',
            borderColor: '#181725',
            borderWidth: 0.5,
            borderRadius: 20,
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductDetail', {
                title: title,
                price: price,
                image: image,
                size: item.size,
                id: id,
                item: item,
              })
            }>
            <Image
              style={{ alignSelf: 'center', height: 80, width: 80 }}
              source={image}
            />
            <Text style={{ marginLeft: 10, fontSize: 14 }}>{title}</Text>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 10,
              }}>
              <Text style={{ fontSize: 16, color: 'black' }}>{price}kg</Text>
              <View style={{
                height: 40,
                width: 40,
                borderRadius: 13,
                backgroundColor: '#53B175',
                justifyContent: 'center',
              }}>

                <Iconspplus
                  style={{ alignSelf: 'center' }}
                  name="plus"
                  size={20}
                  color="white"
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

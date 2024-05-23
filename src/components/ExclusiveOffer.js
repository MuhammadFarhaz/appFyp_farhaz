import React from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import Iconspplus from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ExclusiveOffer({title, price, size, id, image, item}) {
  const navigation = useNavigation();

  return (
    <View style={{padding: 10}}>
      <View
        style={{
          justifyContent: 'center',
          height: windowHeight * 0.25,
          width: windowWidth * 0.38,
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
              description: item.description,
            })
          }
          style={{flex: 1}}>
          <Image
            style={{
              alignSelf: 'center',
              height: windowHeight * 0.1,
              width: windowWidth * 0.28,
              marginTop: 10,
            }}
            source={image}
          />
          <Text style={{marginLeft: 10, fontSize: 16, color: 'black'}}>
            {title}
          </Text>
          <Text style={{marginLeft: 10, fontSize: 14}}>{item.size}</Text>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
            }}>
            <Text style={{fontSize: 16, color: 'black'}}>${price}</Text>
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 13,
                backgroundColor: '#53B175',
                justifyContent: 'center',
              }}>
              <Iconspplus
                style={{alignSelf: 'center'}}
                name="plus"
                size={20}
                color="white"
              />
            </View>
          </View>
          {item?.stock === 0 ? (
            <Text
              style={{
                fontSize: 14,
                color: 'red',
                fontWeight: 'bold',
                justifyContent: 'center',
                alignSelf: 'center',
                marginTop: '2%',
              }}>
              Out of Stock
            </Text>
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  );
}

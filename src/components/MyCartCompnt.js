import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import Iconsmin from 'react-native-vector-icons/Entypo';
import { useState } from 'react';

export default function MyCartCompnt({
  title,
  quantity,
  id,
  del,
  img,
  price,
  priceProduct,
  total,
  size,
}) {
  const [count, setCount] = useState(quantity);
  const [amount, setAmount] = useState(quantity * priceProduct);
  const [productUnit, setProductUnit] = useState(size?.split(' ')[1]);
  const onHandleAmount = count => {
    setCount(count + 1);
    setAmount(amount + priceProduct);
  };

  useEffect(() => {
    setCount(count);
    setAmount(amount);
  }, [quantity]);

  const onHandleAmountDecrease = count => {
    if (count <= 1) {
      return setCount(1);
    }
    setCount(count - 1);
    setAmount(amount - priceProduct);
  };
  return (
    <View>
      <View
        style={{
          marginTop: '2%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 130,
          width: '90%',
          alignSelf: 'center',
          borderBottomWidth: 1,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{}}>
            <Image
              source={{ uri: `${img}` }}
              style={{
                height: 50,
                width: 50,
              }}
            />
          </View>
          <View style={{ marginLeft: '10%' }}>
            <View>
              <Text style={{ fontSize: 18, color: 'black' }}>{title}</Text>

            </View>
            <View style={{ flexDirection: 'row', marginTop: '10%' }}>
              <View>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: '#ffbf00',
                    fontWeight: 'bold',
                  }}>
                  Quantity : {quantity}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => del(id)}>
              <View style={{}}>
                <Iconsmin style={{}} name="cross" size={25} color="grey" />
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
            }}>
            <View>
              <Text
                style={{
                  marginTop: '10%',
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                Rs {price * quantity}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

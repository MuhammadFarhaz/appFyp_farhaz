import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import MyCartCompnt from '../components/MyCartCompnt';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import PaymentScreen from '../screens/PaymentScreen';
import { useDispatch } from 'react-redux';
import { getCart } from '../slice/CartSlice';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import ComnBtn from '../components/ComnBtn';

export default function MyCart({ navigation }) {
  const isFocused = useIsFocused();
  const [count, setCount] = useState(0);
  const [productUnit, setProductUnit] = useState('');

  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const { carts, isLoading } = useSelector(state => state.cart);
  console.log('carts', carts);

  useEffect(() => {
    dispatch(getCart());
    totalPrice();
  }, [isFocused]);

  const deleteCart = async id => {
    try {
      const dat = await axios.delete(
        `http://192.168.0.103:5001/groceries/deleteCart/${id}`,
      );
      console.log(dat.data);
      setList([dat.data]);
      dispatch(getCart());
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = () => {
    var total = 0;
    try {
      carts?.map(item => {
        total = total + item?.price * item?.quantity;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };
  const dummyCarts = [
    {
      title: "Chicken Burger Chrispy",
      price: 19.99,
      size: "S",
      image: "https://images.pexels.com/photos/1199960/pexels-photo-1199960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Replace with actual image path
      _id: "dummy_id_1",
      quantity: 2,
    },

    // Add more dummy items as needed
  ];
  const IdFetch = () => {
    var userId = '';
    try {
      carts?.map(item => {
        userId = item?.loginId;
      });
      return userId;
    } catch (error) {
      console.log(error);
    }
  };
  console.log('userId', IdFetch());

  const cartsId = IdFetch();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: 'grey',
          height: 60,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            color: 'black',
            fontWeight: 'bold',
          }}>
          My Cart
        </Text>
      </View>
      <ScrollView>
        <View>
          {carts?.map((item, index) => {
            return (
              <MyCartCompnt
                key={index}
                title={item?.title}
                price={item.price}
                size={item?.size}
                img={item.image}
                id={item._id}
                del={deleteCart}
                quantity={item.quantity}
                count={item?.quantity}
                setCount={setCount}
                item={item}
              />
            );
          })}
          <View style={{ marginTop: '3%' }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PaymentScreen', {
                  carts: carts,
                  totalPrice: totalPrice(),
                  userId: IdFetch(),
                })
              }>
              <View
                style={{
                  alignSelf: 'center',
                  height: 60,
                  width: '90%',
                  borderRadius: 15,
                  backgroundColor: 'black',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 18,
                    color: 'white',
                  }}>
                  Card Payment
                </Text>
              </View>
            </TouchableOpacity>
            <View></View>
            <Text
              style={{
                textAlign: 'center',
                marginTop: '2%',
                marginBottom: '2%',
              }}>
              OR
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Cash', {
                  carts: carts,
                  totalPrice: totalPrice(),
                  userId: IdFetch(),
                })
              }>
              <View
                style={{
                  alignSelf: 'center',
                  height: 60,
                  width: '90%',
                  borderRadius: 15,
                  backgroundColor: '#ffbf00',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 18,
                    color: 'black',
                  }}>
                  Cash on Delivery
                </Text>
              </View>
            </TouchableOpacity>
          </View>


        </View>
      </ScrollView>
    </View>
  );
}

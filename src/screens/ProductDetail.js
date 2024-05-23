import {
  View,
  Text,
  ImageBackground,
  Vibration,
  TouchableOpacity,
  Image,
} from 'react-native';
// import React from 'react'
import DetailIcons from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import Share from 'react-native-share';
import Iconsmin from 'react-native-vector-icons/Entypo';
import NotFilledHeart from 'react-native-vector-icons/AntDesign';
import Iconsgreater from 'react-native-vector-icons/MaterialCommunityIcons';
import ComnBtn from '../components/ComnBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';

export default function ProductDetail({ navigation, route }) {
  const { title, price, id, image, item, size, description } = route.params;
  const [count, setCount] = useState(1);
  const [productSize, setProductSize] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const isFocused = useIsFocused();
  const [productUnit, setProductUnit] = useState('');
  const [sizeTotal, setSizeTotal] = useState('');
  const [userId, setUserId] = useState(null);
  // share product

  const shareProduct = item => {
    if (item) {
      const shareOptions = {
        title: 'Share Product',
        message: `Check out this amazing product: ${item.title}`,
        url: item?.image, // Assuming the API response contains the product URL
      };

      Share.open(shareOptions)
        .then(res => console.log('Share success:', res))
        .catch(err => console.log('Share error:', err));
    }
  };

  //
  // useEffect(() => {
  //   checkFavoriteStatus();
  // }, []);

  // const checkFavoriteStatus = async () => {
  //   try {
  //     const favoritesSnapshot = await firestore()
  //       .collection('favorites')
  //       .where('itemId', '==', item.id)
  //       .get();

  //     setIsFavorite(!favoritesSnapshot.empty);
  //   } catch (error) {
  //     console.log('Error checking favorite status:', error);
  //   }
  // };

  useEffect(() => {
    checkFavoriteStatus();
  }, [isFocused]);

  const checkFavoriteStatus = async () => {
    try {
      const favoritesSnapshot = await firestore()
        .collection('favorites')
        .doc(item?._id)
        .get();

      const isFavor = favoritesSnapshot.exists;
      setIsFavorite(!isFavor);

      // Update local storage with the favorite state
      await updateLocalStorage(item._id, isFavor);
    } catch (error) {
      console.log('Error checking favorite status:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('fetchData');
      const id = JSON.parse(storedUserId);
      console.log('Id', id);
      const favoritesRef = firestore().collection('favorites').doc(item?._id);

      if (isFavorite) {
        // Add product to favorites
        await favoritesRef.set({
          itemId: item?._id,
          title: title,
          image: item?.image,
          size: size,
          price: item?.price,
          userId: id,
        });
      } else {
        // Remove product from favorites
        await favoritesRef.delete();
      }

      const isFavor = setIsFavorite(!isFavorite);

      // Update local storage with the favorite state
      await updateLocalStorage(item?._id, isFavor);
    } catch (error) {
      console.log('Error toggling favorite:', error);
    }
  };
  const updateLocalStorage = async (itemId, isFavorite) => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');

      let favoritesObj = {};

      if (favorites) {
        favoritesObj = JSON.parse(favorites);
      }

      if (isFavorite) {
        favoritesObj[itemId] = true;
      } else {
        delete favoritesObj[itemId];
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesObj));
    } catch (error) {
      console.log('Error updating local storage:', error);
    }
  };

  // const toggleFavorite = async item => {
  //   try {
  //     const favoritesRef = firestore().collection('favorites');
  // const toggleFavorite = async item => {
  //   try {
  //     const favoritesRef = firestore().collection('favorites');

  //     if (isFavorite) {
  //       // Remove product from favorites
  //       const favoritesSnapshot = await favoritesRef.get();

  //       favoritesSnapshot.forEach(async doc => {
  //         await doc.ref.delete();
  //       });
  //     } else {
  //       // Add product to favorites
  //       await favoritesRef.add({
  //         itemId: item._id,
  //         title:item?.title,
  //         price:item?.price,
  //         image:item?.image
  //       });
  //     }

  //     setIsFavorite(!isFavorite);

  //   } catch (error) {
  //     console.log('Error toggling favorite:', error);
  //   }
  // };
  const handleRetrieveUserId = async () => {
    try {
      // Retrieve the user ID from AsyncStorage
      const storedUserId = await AsyncStorage.getItem('fetchData');
      if (storedUserId) {
        const data = JSON.parse(storedUserId);
        setUserId(data);
      }
    } catch (error) {
      console.error('Error occurred while retrieving user ID:', error);
    }
  };
  console.log('userId', userId);
  useEffect(() => {
    handleRetrieveUserId();
  }, [isFocused]);

  const createCart = async id => {
    try {
      const dat = await axios.post(
        'http://192.168.0.103:5001/groceries/cart',
        {
          itemId: item?._id,
          title: title,
          price: price,
          quantity: count,
          image: item?.image,
          size: item?.size,
          loginId: userId,
        },
      );
      console.log("dat", dat);
      navigation.navigate('MyCart', {
        priceProduct: price,
        quant: 3,
        title: title,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleAmount = count => {
    setCount(count + 1);
    const dataProduct = item?.size?.split(' ');
    console.log('dataProduct', dataProduct[0]);
    setSizeTotal(dataProduct[0]);
    setProductUnit(dataProduct[1]);
  };
  const onHandleAmountDecrease = count => {
    if (count <= 1) {
      return setCount(1);
    }
    setCount(count - 1);
  };

  const [expanded, setExpanded] = useState(false);
  return (
    <View>
      <ImageBackground
        style={{ height: 280, width: '100%' }}
        imageStyle={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
        resizeMode="contain"
        source={{ uri: image }}>
        {/* <Icons style={{ marginTop: 15, marginLeft: 10 }} name="keyboard-arrow-left" size={25} color="white" /> */}
      </ImageBackground>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: '5%',
          marginTop: 15,
        }}>
        <Text style={{ fontSize: 20, color: 'black' }}>{title}</Text>
        <TouchableOpacity onPress={() => toggleFavorite(item)}>
          <Text>
            {!isFavorite ? (
              <NotFilledHeart name="heart" color={'red'} size={20} />
            ) : (
              <NotFilledHeart name="hearto" size={20} />
            )}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{ marginLeft: '5%', fontSize: 16 }}>
        {' '}
        {/* {sizeTotal ? sizeTotal * count : item.size}
        {productUnit} , Price */}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: '5%',
          marginTop: 15,
        }}>
        <View style={{ flexDirection: 'row' }}>
          {count <= 1 ? (
            <Iconsmin
              style={{ marginTop: 7 }}
              name="minus"
              size={25}
              color="grey"
              onPress={() => onHandleAmountDecrease(count)}
            />
          ) : (
            <Iconsmin
              style={{ marginTop: 7 }}
              name="minus"
              size={25}
              color="#ffbf00"
              onPress={() => onHandleAmountDecrease(count)}
            />
          )}
          <View
            style={{
              marginLeft: 10,
              height: 40,
              width: 40,
              borderRadius: 13,
              backgroundColor: '#ffbf00',
              justifyContent: 'center',
            }}>
            <Text style={{ alignSelf: 'center', color: "black" }}>{count}</Text>
          </View>

          <Iconsmin
            style={{ marginLeft: 10, marginTop: 7 }}
            name="plus"
            size={25}
            color="#ffbf00"
            onPress={() => onHandleAmount(count, price)}
          />
        </View>

        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>
          {price * count}
          </Text>
        </View>
      </View>
      <View style={{}}>
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: '5%',
              marginTop: '5%',
              marginBottom: '5%',
            }}>
            <Text style={{ fontSize: 16, color: 'black' }}>
              Product Detail ( {title} )
            </Text>
            <Image
              source={
                expanded ? (
                  <DetailIcons
                    name="exclamationcircleo"
                    size={50}
                    color={'black'}
                  />
                ) : (
                  <DetailIcons
                    name="exclamationcircleo"
                    size={50}
                    color={'black'}
                  />
                )
              }
              style={{ width: 20, height: 20 }}
            />
          </View>
        </TouchableOpacity>
        {expanded && (
          <View style={{ marginHorizontal: '5%', alignSelf: 'center' }}>
            <Text style={{ textAlign: 'justify' }}>{description}</Text>
          </View>
        )}
      </View>
      <View style={{ marginTop: 15 }}>
        <TouchableOpacity onPress={() => createCart(id, count)}>
          <ComnBtn title="Add To Basket" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

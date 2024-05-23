import { View, Text, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import FavrtCompnt from '../components/FavrtCompnt';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Favourite({ title }) {
  const [uniqueFavorites, setUniqueFavorites] = useState();
  const isFocused = useIsFocused();
  const [IsLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getProductById();
  }, [isFocused]);

  const getProductById = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('fetchData');
      const user = JSON.parse(storedUserId);
      if (!user) {
        // Handle the case when the user is not logged in
        return;
      }

      const userFavoritesSnapshot = await firestore()
        .collection('favorites')
        .where('userId', '==', user)
        .get();

      const userFavorites = userFavoritesSnapshot.docs.map(doc => doc.data());
      console.log(userFavorites);
      setUniqueFavorites(userFavorites);
      setIsLoaded(false);
    } catch (error) {
      console.log('Error fetching favorite items:', error);
    }
  };

  // ...

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: 'black',
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
          Favourite
        </Text>
      </View>
      <ScrollView>
        <View>
          {IsLoaded ? (
            <ActivityIndicator
              style={{ marginTop: '5%' }}
              color="green"
              size={30}
            />
          ) : (
            uniqueFavorites?.map((item, index) => {
              return <FavrtCompnt key={index} item={item} />;
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
}

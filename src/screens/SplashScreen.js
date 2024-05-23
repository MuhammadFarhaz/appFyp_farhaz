import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dawat2 from '../assests/dawat2.png';

const SplashScreen = ({ navigation }) => {
  const fadeInAnimation = useRef(new Animated.Value(0)).current;

  const checkLoginStatus = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      console.log('storedToken', storedToken);
      if (storedToken) {
        navigation.navigate('BottomTab');
      } else {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log('Error reading token:', error);
    }
  };

  useEffect(() => {
    const fadeIn = () => {
      Animated.timing(fadeInAnimation, {
        toValue: 1,
        duration: 1000, // Set the duration of the animation (in milliseconds)
        useNativeDriver: true, // Add this line for performance improvements on native
      }).start();
    };
    fadeIn();
  }, [fadeInAnimation]);

  useEffect(() => {
    setTimeout(() => {
      checkLoginStatus();
    }, 3000);
  }, [checkLoginStatus]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <Animated.Image source={dawat2} style={{ height: 200, width: 200 }} />
      {/* <ActivityIndicator size="large" /> */}
    </View>
  );
};

export default SplashScreen;

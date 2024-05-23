import { View, Text } from 'react-native'
import React from 'react'
import HomeScreen from '../screens/HomeScreen'
import Favourite from '../screens/Favourite'
import Explore from '../screens/Explore'
import MyCart from '../screens/MyCart'
import Account from '../screens/Account'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ionichome from 'react-native-vector-icons/AntDesign';
import Ioniccart from 'react-native-vector-icons/Feather';
import Ionicheart from 'react-native-vector-icons/MaterialCommunityIcons';


const Tab = createBottomTabNavigator();
export default function BottomTab() {
  return (

    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown:false,
        tabBarHideOnKeyboard:true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
              return <Ionichome name="home" size={27} color={color} />
          }

          else if (route.name === 'Deals') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
            return <Ioniccart name="search" size={size} color={color} />;
          }
          else if (route.name === 'MyCart') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
            return <Ioniccart name="shopping-cart" size={size} color={color} />;
          }
          else if (route.name === 'Favourite') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
            return <Ionicheart name="cards-heart-outline" size={size} color={color} />;
          }
          else if (route.name === 'Account') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
            return < Ionicheart name="account-outline" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#ffbf00',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Deals" component={Explore} />
      <Tab.Screen name="MyCart" component={MyCart} />
      <Tab.Screen name="Favourite" component={Favourite} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>

  )
}
import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import Onboarding from '../screens/Onboarding';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import HomeScreen from '../screens/HomeScreen';
import ProductDetail from '../screens/ProductDetail';
import AccountDetail from '../screens/AccountDetail';
import Account from '../screens/Account';
import ExclusiveOffer from '../components/ExclusiveOffer';
import Filters from '../screens/Filters';
import Beverages from '../screens/Beverages';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Explore from '../screens/Explore';
import SellAll from '../screens/SellAll';
import SplashScreen from '../screens/SplashScreen';
import Help from '../screens/Help';
import About from '../screens/About';
import VerifyOtp from '../screens/VerifyOtp';
import ForgotPassword from '../screens/ForgotPassword';
import ChangePassword from '../screens/ChangePassword';
import MyCart from '../screens/MyCart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notification from '../screens/Notification';
import CashOnDelivery from '../screens/CashOnDelivery';
import PaymentScreen from '../screens/PaymentScreen';
import PaymentOptionsScreen from '../screens/PaymentOptionsScreen';
import OrderDetail from '../screens/OrderDetail';
import ChooseDelivery from '../screens/ChooseDelivery';
import ProductScreen from '../screens/ProductScreen';
const Stack = createNativeStackNavigator();
export default function StackNav({navigation}) {
  const [token, setToken] = useState(null);


  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="SplashScreen">
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="BottomTab" component={BottomTab} />
            <Stack.Screen name="Cash" component={CashOnDelivery} />
            <Stack.Screen name="SellAll" component={SellAll} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ChhoseDelivery" component={ChooseDelivery} />
            <Stack.Screen name="ProductScreen" component={ProductScreen} />


            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
            <Stack.Screen name="PaymentOptionsScreen" component={PaymentOptionsScreen} />
            <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Explore" component={Explore} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="AccountDetail" component={AccountDetail} />
            <Stack.Screen name="ExclusiveOffer" component={ExclusiveOffer} />
            <Stack.Screen name="Filters" component={Filters} />
            <Stack.Screen name="Beverages" component={Beverages} />
            <Stack.Screen name="Notifications" component={Notification} />
            <Stack.Screen name="Help" component={Help} />
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="OrderDetail" component={OrderDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Provider} from 'react-redux';
import {Store} from './src/config/Store';
import StackNav from './src/nav/StackNav';
import NetInfo from '@react-native-community/netinfo';
import {StripeProvider} from '@stripe/stripe-react-native';

import Wifi from './src/screens/Wifi';
export default function App({navigation}) {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, [isConnected]);

  return (
    <>
      <StripeProvider
        publishableKey={
          'pk_test_51LrL5CDAlRNZOlyLUp131UCb9oVLEu1gA19Btt1gw2SGJEONhaRBVxgzAAAv56uZO0abqZpFKQ8SGkYHmkQraoZ800yD10kN40'
        }>
        {isConnected ? (
          <Provider store={Store}>
            <StackNav />
          </Provider>
        ) : (
          <Wifi />
        )}
      </StripeProvider>
    </>
  );
}

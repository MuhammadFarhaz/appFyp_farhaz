import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function ForgotPassword() {
  const navigation = useNavigation();
  const [email, setEmail] = useState(email);

  const forgetpassword = async () => {
    try {
      if (!email) {
        return ToastAndroid.show('Please Enter A  Email', ToastAndroid.SHORT);
      }
      const strongRegex = new RegExp(
        '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
      );

      if (!strongRegex.test(email)) {
        ToastAndroid.show(
          `Please Enter Valid Email ${email}`,
          ToastAndroid.SHORT,
        );
        return false;
      }
      const formData = new FormData();

      // Append the registration data to the FormData object
      formData.append('email', email);

      const userData = await axios.post(
        'http://localhost:5001/auth/forgotpassword',
        formData,
      );
      console.log(userData?.data);
      if (userData?.data) {
        ToastAndroid.show('Otp Send', ToastAndroid.SHORT);
        navigation.navigate('ChangePassword');
      }
      if (!userData?.data) {
        return ToastAndroid.show('Enter Valid Email', ToastAndroid.SHORT);
      }
      setEmail('');
    } catch (error) {
      console.log(error, 'error');
      ToastAndroid.show('Please Enter  Your Email', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ marginHorizontal: '5%', marginTop: '25%' }}>
        <View style={{ marginTop: '10%' }}>
          <Text style={{ color: "#ffbf00" }}>Email</Text>
          <View
            style={{
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              height: 30,
            }}>
            <TextInput
              style={{ height: 35 }}
              placeholder="Write You Email"
              value={email}
              onChangeText={email => setEmail(email)}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => forgetpassword()}
          style={{
            height: 60,
            backgroundColor: '#ffbf00',
            borderRadius: 15,
            justifyContent: 'center',
            marginTop: '7%',
          }}>
          <Text style={{ color: 'white', textAlign: 'center' }}> Send Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

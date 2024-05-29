import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import LogoSplash from '../assests/LogoSplash.jpg';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Login({ setIsLoggedIn }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    try {
      if (!email || !password) {
        return ToastAndroid.show('Please Enter All Field', ToastAndroid.SHORT);
      }
      const strongRegex = new RegExp(
        '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
      );

      if (!strongRegex.test(email)) {
        ToastAndroid.show(
          `Please Enter valid Email ${email}`,
          ToastAndroid.SHORT,
        );
        return false;
      } else if (password.length < 8) {
        ToastAndroid.show(
          `Password at least 8 character ${password}`,
          ToastAndroid.SHORT,
        );
        return false;
      }
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const userData = await axios.post(
        'http://localhost:5001/auth/login',
        formData,
      );
      console.log(userData?.request, 'Login');
      const data = await AsyncStorage.setItem(
        'token',
        JSON.stringify(userData?.data?.token),
      );
      const dataId = await AsyncStorage.setItem(
        'fetchData',
        JSON.stringify(userData?.data?.fetchId),
      );
      console.log('dataToken', data);
      console.log('FetchId', dataId);
      if (userData.data.token) {
        ToastAndroid.show('Login Done Successfully', ToastAndroid.SHORT);
        await navigation.replace('BottomTab');
        setEmail('');
        setPassword('');
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status == 401) {
          // If the server responds with status code 401 (Unauthorized),
          // it means the email or password is incorrect.
          ToastAndroid.show(
            'Invalid email or password. Please try again.',
            ToastAndroid.SHORT,
          );
        } else if (error.response.status == 403) {
          // If the server responds with status code 403 (Forbidden),
          // it means the user is blocked.
          ToastAndroid.show(
            'You are blocked. Please contact support for assistance.',
            ToastAndroid.SHORT,
          );
        }
      } else {
        // Handle other errors
        console.log(error, 'error');
      }
    }

  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          marginTop: '5%',
          height: 200, alignItems: "center"
        }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#ffbf00" }}>App Logo</Text>

      </View>
      <View style={{ marginHorizontal: '5%', marginTop: '5%' }}>
        <Text style={{ fontWeight: 'bold', color: '#ffbf00', fontSize: 17 }}>
          Log In
        </Text>
        <Text style={{}}>Enter your emails and password</Text>

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

        <View style={{ marginTop: '8%' }}>
          <Text style={{ color: "#ffbf00" }}>Password</Text>
          <View
            style={{
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              height: 30,
            }}>
            <TextInput
              style={{ height: 35 }}
              placeholder="Password"
              value={password}
              onChangeText={password => setPassword(password)}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={{ textAlign: 'right', marginTop: '2%', color: '#ffbf00' }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => loginUser()}
          style={{
            height: 60,
            backgroundColor: '#ffbf00',
            borderRadius: 15,
            justifyContent: 'center',
            marginTop: '7%',
          }}>
          <Text style={{ color: 'black', textAlign: 'center' }}>Log In</Text>
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', marginTop: '5%' }}>
          Don’t have an account?
          <Text
            style={{ color: '#ffbf00' }}
            onPress={() => navigation.navigate('SignUp')}>
            Singup
          </Text>
        </Text>
      </View>
    </View>
  );
}

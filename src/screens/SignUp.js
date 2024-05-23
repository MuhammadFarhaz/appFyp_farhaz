import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

export default function SignUp({ navigation }) {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shwimg, setShwimg] = useState('');
  const [response, setResponse] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const staticData = {
    img: 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=',
  };
  // SignUp Account
  // signup api

  const registerUser = async () => {
    try {
      if (!email || !password || !shwimg) {
        return ToastAndroid.show('Please Enter All Field', ToastAndroid.SHORT);
      }
      const formData = new FormData();
      const strongRegex = new RegExp(
        '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
      );

      if (!strongRegex.test(email)) {
        ToastAndroid.show(
          `Please Enter Valid Email ${email}`,
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

      // Append the registration data to the FormData object
      formData.append('name', username);
      formData.append('email', email);
      formData.append('password', password);

      // Append the image file to the FormData object
      if (shwimg) {
        formData.append('avatar', {
          uri: shwimg,
          name: 'profileImage.jpg',
          type: 'image/jpeg',
        });
      }
      setIsLoading(true);
      const userData = await axios.post(
        'http://192.168.0.103:5001/auth/register',
        formData,
      );
      console.log("userData",userData)
      ToastAndroid.show('please check your email', ToastAndroid.SHORT);
      await navigation.navigate('VerifyOtp', {
        email: email,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getimg = async () => {
    const dta = await launchImageLibrary({
      quality: 1,
      mediaType: 'photo',
    });

    setShwimg(dta?.assets[0].uri);
  };
  const onhandleSignUp = async () => {
    try {
      const userData = await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
          const data = firestore().collection('Users').add({
            username: username,
            email: email,
          });
          console.log('data', data);
        });
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        ToastAndroid.show('email already used', ToastAndroid.SHORT);
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <TouchableOpacity onPress={() => getimg()}>
        <View>
          <Image
            source={{ uri: shwimg ? shwimg : staticData?.img }}
            style={{
              height: 120,
              width: 120,
              marginTop: '10%',
              display: 'flex',
              justifyContent: 'center',
              alignSelf: 'center',
              presentationStyle: 'overCurrentContext',
              borderRadius: 100,
              backgroundColor: 'black',
            }}
          />
        </View>
      </TouchableOpacity>
      <View style={{ marginHorizontal: '5%', marginTop: '10%' }}>
        <Text style={{ fontWeight: 'bold', color: '#ffbf00', fontSize: 17 }}>
          Sign Up
        </Text>
        <Text style={{}}>Enter your emails and password</Text>

        <View style={{ marginTop: '10%' }}>
          <Text style={{ color: "#ffbf00" }}>Username</Text>
          <View
            style={{
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              height: 30,
            }}>
            <TextInput
              style={{ height: 35 }}
              placeholder="Enter Username"
              value={username}
              onChangeText={username => setUserName(username)}
            />
          </View>
        </View>
        <View style={{ marginTop: '8%' }}>
          <Text style={{ color: "#ffbf00" }}>Email</Text>
          <View
            style={{
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              height: 30,
            }}>
            <TextInput
              style={{ height: 35 }}
              placeholder="Enter Your Email"
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
        <TouchableOpacity
          style={{
            height: 60,
            backgroundColor: '#ffbf00',
            borderRadius: 15,
            justifyContent: 'center',
            marginTop: '7%',
          }}>
          <Text
            style={{ color: 'black', textAlign: 'center' }}
            onPress={() => registerUser()}>
            {isloading ? (
              <ActivityIndicator size={25} color={'white'} />
            ) : (
              'Sign Up'
            )}{' '}
          </Text>
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', marginTop: '5%' }}>
          Already have an account?
          <Text
            style={{ color: '#ffbf00' }}
            onPress={() => navigation.navigate('Login')}>
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
}

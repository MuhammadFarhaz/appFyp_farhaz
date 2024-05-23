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

export default function ChooseDelivery({ setIsLoggedIn }) {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async () => {
        // try {
        //   if (!email || !password) {
        //     return ToastAndroid.show('Please Enter All Field', ToastAndroid.SHORT);
        //   }
        //   const strongRegex = new RegExp(
        //     '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
        //   );

        //   if (!strongRegex.test(email)) {
        //     ToastAndroid.show(
        //       `Please Enter valid Email ${email}`,
        //       ToastAndroid.SHORT,
        //     );
        //     return false;
        //   } else if (password.length < 8) {
        //     ToastAndroid.show(
        //       `Password at least 8 character ${password}`,
        //       ToastAndroid.SHORT,
        //     );
        //     return false;
        //   }
        //   const formData = new FormData();

        //   // Append the registration data to the FormData object
        //   formData.append('email', email);
        //   formData.append('password', password);

        //   const userData = await axios.post(
        //     'https://wild-rose-haddock-kilt.cyclic.app/auth/login',
        //     formData,
        //   );
        //   console.log(userData?.request, 'Login');
        //   const data = await AsyncStorage.setItem(
        //     'token',
        //     JSON.stringify(userData?.data?.token),
        //   );
        //   const dataId = await AsyncStorage.setItem(
        //     'fetchData',
        //     JSON.stringify(userData?.data?.fetchId),
        //   );
        //   console.log('dataToken', data);
        //   console.log('FetchId', dataId);
        //   if (userData?.data?.token) {
        //     ToastAndroid.show('Login Done Successfully', ToastAndroid.SHORT);
        //     navigation.replace('BottomTab');
        //     setEmail('');
        //     setPassword('');
        //     setIsLoggedIn(true);
        //   } else {
        //     ToastAndroid.show('Please Enter A Valid Data', ToastAndroid.SHORT);
        //   }
        // } catch (error) {
        //   console.log(error);
        //   if (error.response) {
        //     if (error.response.status == 401) {
        //       // If the server responds with status code 401 (Unauthorized),
        //       // it means the email or password is incorrect.
        //       ToastAndroid.show(
        //         'Invalid email or password. Please try again.',
        //         ToastAndroid.SHORT,
        //       );
        //     } else if (error.response.status == 403) {
        //       // If the server responds with status code 403 (Forbidden),
        //       // it means the user is blocked.
        //       ToastAndroid.show(
        //         'You are blocked. Please contact support for assistance.',
        //         ToastAndroid.SHORT,
        //       );
        //     }
        //   } else {
        //     // Handle other errors
        //     console.log(error, 'error');
        //   }
        // }
        navigation.replace('BottomTab');

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
            <View style={{ marginHorizontal: '5%', marginTop: '5%', justifyContent: "flex-end", flex: 0.8 }}>
                <TouchableOpacity
                    onPress={() => loginUser()}
                    style={{
                        height: 70,
                        backgroundColor: '#ffbf00',
                        borderRadius: 15,
                        justifyContent: 'center',
                        marginTop: '7%',
                    }}>
                    <Text style={{ color: 'black', textAlign: 'center' }}>Delivery</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => loginUser()}
                    style={{
                        height: 70,
                        backgroundColor: '#ffbf00',
                        borderRadius: 15,
                        justifyContent: 'center',
                        marginTop: '7%',
                    }}>
                    <Text style={{ color: 'black', textAlign: 'center' }}>Pick-Up</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

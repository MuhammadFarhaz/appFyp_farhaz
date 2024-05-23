import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

export default function ChangePassword() {
  const navigation = useNavigation();
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [timer, setTimer] = useState(30);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    const storedTimestamp = Date.now();
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - storedTimestamp;
      const remainingTime = Math.max(30 - Math.floor(elapsedTime / 1000), 0);
      setTimer(remainingTime);
      if (remainingTime <= 0) {
        setButtonDisabled(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const ChangePasswordUser = async () => {
    try {
      if (!otp || !password) {
        return ToastAndroid.show('Please Enter All Fields', ToastAndroid.SHORT);
      }
      if (password.length < 8) {
        ToastAndroid.show(
          'Password should be at least 8 characters',
          ToastAndroid.SHORT,
        );
        return;
      }

      const formData = new FormData();

      // Append the registration data to the FormData object
      formData.append('otp', otp);
      formData.append('newPassword', password);

      const userData = await axios.put(
        'http://192.168.0.103:5001/auth/resetpassword',
        formData,
      );

      if (userData?.data) {
        ToastAndroid.show('Change Password Successfully', ToastAndroid.SHORT);
        navigation.navigate('Login');
      } else {
        ToastAndroid.show('Please Enter valid Data', ToastAndroid.SHORT);
      }

      setOtp('');
      setPassword('');
    } catch (error) {
      console.log(error, 'error');
      ToastAndroid.show('Please Enter Valid OTP', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginHorizontal: '5%', marginTop: '25%'}}>
        <Text style={{fontWeight: 'bold', color: 'black', fontSize: 17}}>
          Change Password
        </Text>
        <Text>Enter your OTP and password</Text>

        <View style={{marginTop: '10%'}}>
          <Text>OTP</Text>
          <View
            style={{
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              height: 30,
            }}>
            <TextInput
              style={{height: 35}}
              placeholder="Write Your OTP"
              value={otp}
              onChangeText={setOtp}
              maxLength={6}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={{marginTop: '8%'}}>
          <Text>Password</Text>
          <View
            style={{
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              height: 30,
            }}>
            <TextInput
              style={{height: 35}}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={ChangePasswordUser}
          disabled={timer === 0}
          style={{
            height: 60,
            backgroundColor: timer === 0 ? 'grey' : '#ffbf00',
            borderRadius: 15,
            justifyContent: 'center',
            marginTop: '7%',
          }}>
          <Text style={{color: 'white', textAlign: 'center'}}>
            Change Password
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            margin: '3%',
            alignSelf: 'center',
            color: 'red',
          }}>
          {timer > 0 && <Text>OTP expires in {timer} seconds</Text>}
        </Text>
      </View>
    </View>
  );
}

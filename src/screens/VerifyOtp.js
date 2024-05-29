import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';

const VerifyOtp = ({ route, navigation }) => {
  const { email } = route.params;
  const [otp, setOtp] = useState('');
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

  const handleVerifyOTP = async () => {
    const formData = new FormData();
    formData.append('otp', otp);
    formData.append('email', email);

    if (!otp) {
      return ToastAndroid.show(`Please Enter A OTP `, ToastAndroid.SHORT);
    }
    if (otp?.length < 6) {
      return ToastAndroid.show(
        `Please Enter Six-digit OTP `,
        ToastAndroid.SHORT,
      );
    }

    try {
      const userData = await axios.post(
        'http://localhost:5001/auth/verify',
        formData,
      );
      console.log(userData);
      ToastAndroid.show('Your Account Verified', ToastAndroid.SHORT);
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 403) {
        ToastAndroid.show('Your OTP has Expired', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('OTP is invalid', ToastAndroid.SHORT);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="ENTER A OTP "
          style={styles.input}
          maxLength={6}
          keyboardType="numeric"
          onChangeText={value => setOtp(value)}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, buttonDisabled && styles.disabledButton]}
        onPress={handleVerifyOTP}
        disabled={buttonDisabled}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
      {!timer == 0 ? (
        <Text
          style={{
            marginTop: 5,
            color: 'red',
          }}>{`Otp Expire in ${timer} Seconds`}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffbf00',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ffbf00',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: '#ffbf00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});

export default VerifyOtp;

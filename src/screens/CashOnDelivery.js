import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ComnBtn from '../components/ComnBtn';
import { SelectList } from 'react-native-dropdown-select-list';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Entypo';

const CashOnDelivery = ({ route, navigation }) => {
  const { carts, totalPrice, userId } = route.params;
  console.log('carts', carts);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
  const [isModalVisibleFail, setIsModalVisibleFail] = useState(false); // State to control modal visibility

  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [selected, setSelected] = React.useState('');
  const [country, setCountry] = useState('');
  const [otpUser, setotpUser] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [visibility, setVisibility] = useState(false);
  const handleSubmit = () => {
    // Perform actions with the form data (e.g., validation, API calls)
    console.log('Form submitted!');
  };
  const getCartsData = () => {
    const cartsData = carts?.map(cart => {
      const { quantity, itemId } = cart;

      return {
        quantity: quantity,
        product: itemId,
      };
    });

    return cartsData;
  };
  var data = getCartsData();
  console.log('list', data);

  console.log('uid', userId);

  const sendOtpVerifyUser = async () => {
    try {
      const data = await axios.post(
        'http://192.168.0.103:5001/groceries/verifysend',
        {
          _id: userId,
        },
      );
      console.log(data.data);
      setVisibility(true);
      ToastAndroid.show('Otp send please check Your Email', ToastAndroid.SHORT);
    } catch (error) { }
  };
  //  create order
  const createOrderByCash = async () => {
    if (
      !address ||
      !selected ||
      !phoneNumber ||
      !postalCode ||
      !country ||
      !otpUser
    ) {
      return ToastAndroid.show('Please Enter All Field', ToastAndroid.SHORT);
    }
    console.log(otpUser);
    if (phoneNumber.length < 11 || phoneNumber.length > 11) {
      return ToastAndroid.show(
        'Please Enter a Valid Phone Number',
        ToastAndroid.SHORT,
      );
    }
    if (postalCode.length < 5 || postalCode.length > 5) {
      return ToastAndroid.show(
        'Please Enter a Valid Postal Code',
        ToastAndroid.SHORT,
      );
    }
    var otpverify = parseInt(otpUser);
    try {
      const res = await axios.post(
        'http://192.168.0.103:5001/groceries/createOrder',
        {
          orderItems: data,
          shippingAddress1: address,
          city: selected,
          zip: postalCode,
          country: country,
          phone: phoneNumber,
          user: userId,
          loginId: userId,
          _id: userId,
          otp: otpverify,
          total: totalPrice,
        },
      );
      console.log('res', res.data);
      setIsModalVisible(true);
      setAdditionalDetails('');
      setCountry('');
      setCity('');
      setCountry('');
      setPostalCode('');
      setotpUser('');
      setSelected('');
      setAddress('');
      setPhoneNumber('');
    } catch (error) {
      console.log(error, 'error');
      if (error.response) {
        if (error.response.status === 400) {
          // If the server responds with status code 401 (Unauthorized),
          // it means the email or password is incorrect.
          setIsModalVisibleFail(true);
        } else if (error.response.status === 403) {
          // If the server responds with status code 403 (Forbidden),
          // it means the user is blocked.
          ToastAndroid.show(
            'You are blocked. Please contact support for assistance.',
            ToastAndroid.SHORT,
          );
        } else if (error.response.status == 405) {
          // If the server responds with status code 403 (Forbidden),
          // it means the user is blocked.
          ToastAndroid.show(
            'Insufficient stock for product',
            ToastAndroid.SHORT,
          );
        }
      } else {
        // Handle other errors
        console.log(error, 'error');
      }
    }
  };

  console.log(selected, 'city');
  const cityList = [
    { key: '1', value: 'Alipur' },
    { key: '2', value: 'Attock' },
    { key: '3', value: 'Bahawalpur' },
    { key: '4', value: 'Burewala' },
    { key: '5', value: 'Chiniot' },
    { key: '6', value: 'Dajkot' },
    { key: '7', value: 'Dera Ghazi Khan', disabled: true },
    { key: '8', value: 'Dipalpur' },
    { key: '9', value: 'Faisalabad' },
    { key: '10', value: 'Gojra' },
    { key: '11', value: 'Gujranwala' },
    { key: '12', value: 'Gujrat' },
    { key: '13', value: 'Haroonabad' },
    { key: '14', value: 'Hafizabad' },
    { key: '15', value: 'Jaranwala' },
    { key: '16', value: 'Lahore' },
    { key: '17', value: 'Islamabad' },
    { key: '18', value: 'Mianwali' },
    { key: '19', value: 'Multan' },
    { key: '20', value: 'Sahiwal' },
  ];
  const closeModal = () => {
    setIsModalVisible(false);
  };
  const closeModalReject = () => {
    setIsModalVisibleFail(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}>
        <View style={styles.modalContainer}>
          <LottieView
            source={{
              uri: 'https://assets1.lottiefiles.com/packages/lf20_HmRWcatRRk.json',
            }}
            autoPlay={true}
            loop={true}
            style={{ height: 400, width: 400 }}
          />

          <Text style={styles.modalText}>Your Order has been accepted</Text>
          <Text style={styles.modalSubText}>Thank you for your order.</Text>
          <TouchableOpacity onPress={() => setIsModalVisible(false)}>
            <Text style={styles.modalButton}>
              <Icon name="cross" color={'black'} size={30} />
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        isVisible={isModalVisibleFail}
        onBackdropPress={closeModalReject}
        onBackButtonPress={closeModalReject}>
        <View style={styles.modalContainer}>
          <LottieView
            source={{
              uri: 'https://assets10.lottiefiles.com/temp/lf20_6wEpxn.json',
            }}
            autoPlay={true}
            loop={true}
            style={{ height: 400, width: 400 }}
          />

          <Text style={styles.modalText}>Oops ! Order Failed</Text>
          <Text style={styles.modalSubText}>Something went tembly wrong.</Text>
          <TouchableOpacity onPress={() => setIsModalVisibleFail(false)}>
            <Text style={styles.modalButton}>
              <Icon name="cross" size={30} color={'black'} />
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View
        style={{
          height: 60,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 22,
            color: '#ffbf00',
            fontWeight: 'bold',
          }}>
          Cash On Delivery
        </Text>
      </View>

      <TextInput
        style={styles.inputAddress}
        placeholder="Street Address"
        value={address}
        onChangeText={address => setAddress(address)}
        multiline
      />
      <SelectList
        setSelected={val => setSelected(val)}
        data={cityList}
        save="value"
        boxStyles={styles.input} //override default styles
        dropdownShown={false}
        dropdownTextStyles={{
          color: 'black',
        }}
        inputStyles={{
          color: 'black',
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={country}
        onChangeText={country => setCountry(country)}
      />
      <TextInput
        style={styles.input}
        placeholder="Postal Code"
        value={postalCode}
        onChangeText={postalCode => setPostalCode(postalCode)}
      />
      <TextInput
        style={styles.input}
        placeholder="03000000000"
        value={phoneNumber}
        onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Additional Details (optional)"
        value={additionalDetails}
        onChangeText={additionalDetails =>
          setAdditionalDetails(additionalDetails)
        }
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Your Email Otp"
        value={otpUser}
        onChangeText={otpUser => setotpUser(otpUser)}
        keyboardType="phone-pad"
      />

      <TouchableOpacity onPress={() => sendOtpVerifyUser()}>
        <View
          style={{
            height: 20,
            width: 70,
            backgroundColor: '#ffbf00',
            marginLeft: '2%',
            borderRadius: 20,
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 10,
              marginTop: 2,
            }}>
            Send Otp
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => createOrderByCash()}>
        <View
          style={{
            alignSelf: 'center',
            height: 60,
            width: '90%',
            borderRadius: 15,
            backgroundColor: '#ffbf00',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'row',
            marginTop: '4%',
          }}>
          <Text style={{ alignSelf: 'center', fontSize: 18, color: 'black' }}>
            <Text>Order Now</Text>
          </Text>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 14,
              color: 'black',
              marginLeft: '10%',
            }}>
            (
            {totalPrice >= 20 ? 'Delivery Free' : `${totalPrice} + 100 Fees`})
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    height: 50,
    borderRadius: 10,
    borderColor: '#ffbf00',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  inputAddress: {
    minHeight: 50,
    borderRadius: 10,
    borderColor: '#ffbf00',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    maxHeight: 300,
    lineHeight: 25,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    height: 600,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    marginHorizontal: '2%',
    textAlign: 'center',
  },
  modalSubText: {
    fontSize: 14,
    marginBottom: 20,
  },
  modalButton: {
    fontSize: 18,
    color: 'blue',
  },
});

export default CashOnDelivery;

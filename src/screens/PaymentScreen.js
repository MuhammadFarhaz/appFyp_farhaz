import {
  View,
  Text,
  Button,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { StripeProvider } from '@stripe/stripe-react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import TextTicker from 'react-native-text-ticker';
import ComnBtn from '../components/ComnBtn';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Entypo';
const closeModal = () => {
  setIsModalVisible(false);
};
const closeModalReject = () => {
  setIsModalVisibleFail(false);
};
export default function PaymentScreen({ route, navigation }) {
  const { confirmPayment, initPaymentSheet, presentPaymentSheet } = useStripe();
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
  const [isModalVisibleFail, setIsModalVisibleFail] = useState(false); // State to
  const [cardinfo, setCardInfo] = useState(null);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [selected, setSelected] = React.useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpUser, setotpUser] = useState('');

  const { carts, totalPrice, userId } = route.params;
  console.log('carts', carts);

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

  const fetchDetach = cardDetails => {
    if (cardDetails?.complete) {
      setCardInfo(cardDetails);
    } else {
      setCardInfo(null);
    }
  };
  console.log('cardDetail Awais', cardinfo);
  const onDone = async () => {
    if (
      !address ||
      !selected ||
      !phoneNumber ||
      !postalCode ||
      !country ||
      !cardinfo ||
      !otpUser
    ) {
      return ToastAndroid.show('Please Enter Field', ToastAndroid.SHORT);
    }
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

    var verifyotp = parseInt(otpUser);
    if (verifyotp < 6) {
      return ToastAndroid.show('Please Enter a Valid OTP', ToastAndroid.SHORT);
    }
    console.log("totalPrice",totalPrice);
    if (cardinfo) {
      try {
        const res = await axios.post('http://192.168.0.103:5001/groceries/newOrder',
          {
            orderItems: data,
            shippingAddress1: address,
            city: selected,
            zip: postalCode,
            country: country,
            phone: phoneNumber,
            user: userId,
            amount: totalPrice,
            loginId: userId,
            total: totalPrice,
            otp: verifyotp,
            _id: userId,
          },
        );
        if (res?.data?.paymentIntent) {
          let confirmData = await confirmPayment(res?.data?.paymentIntent, {
            paymentMethodType: 'Card',
          });
          console.log(confirmData);
          if (confirmData) {
            setIsModalVisible(true);
          }
        }

        const resToken = await createToken({ ...cardinfo, type: 'Card' });
        console.log('resToken', resToken);
        if (!resToken) {
          setIsModalVisibleFail(true);
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          if (error.response.status === 400) {

            setIsModalVisibleFail(true);
          } else if (error.response.status === 403) {

            ToastAndroid.show(
              'You are blocked. Please contact support for assistance.',
              ToastAndroid.SHORT,
            );
          } else if (error.response.status == 405) {

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
  const sendOtpVerifyUser = async () => {
    try {
      const data = await axios.post(
        'http://192.168.0.103:5001/groceries/verifysend',
        {
          _id: userId,
        },
      );
      ToastAndroid.show('Otp send please check Your Email', ToastAndroid.SHORT);
      console.log(data.data);
      setVisibility(true);
    } catch (error) { }
  };

  return (
    <>
      <StripeProvider
        publishableKey={
          'pk_test_51LytqmDkv5vj3ywvdDSgrvYO130oSdLVDPkPODjMjKYbJqj50e44GyD9Q1IlxEFzsG2ZzaC7v90GDocNgiEIFuKX00KPKoWyme'
        }
        merchantIdentifier="merchant.identifier">
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
              <Text style={styles.modalSubText}>
                Something went tembly wrong.
              </Text>
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
                color: 'black',
                fontWeight: 'bold',
              }}>
              Card Payment Detail
            </Text>
          </View>
          <TextTicker
            style={{ fontSize: 16, color: 'red' }}
            duration={15000}
            loop
            bounce
            repeatSpacer={100}
            marqueeDelay={2000}>
            If you order cancel using Card within two hours then payment
            Refunded otherwise no Redunded Payment Thanks Enjoy Dawat-e-Sheraz Restaurant App.
          </TextTicker>
          <TextInput
            style={styles.inputAddress}
            placeholder="Street Address"
            value={address}
            onChangeText={address => setAddress(address)}
          />
          {/* <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={city => setCity(city)}
          /> */}
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
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
            keyboardType="phone-pad"
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

          <CardField
            postalCodeEnabled={false}
            placeholders={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={{
              backgroundColor: '#FFFFFF',
              textColor: '#000000',
            }}
            style={{
              width: '100%',
              height: 50,
              marginVertical: 30,
            }}
            onCardChange={cardDetails => {
              fetchDetach(cardDetails);
            }}
            onFocus={focusedField => {
              console.log('focusField', focusedField);
            }}
          />

          <TouchableOpacity onPress={() => onDone()}>
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
              }}>
              <Text style={{ alignSelf: 'center', fontSize: 18, color: 'black' }}>
                <Text>Go to CheckOut</Text>
              </Text>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 14,
                  color: 'black',
                  marginLeft: '10%',
                }}>
                (
                {totalPrice >= 1000
                  ? 'Delivery Free'
                  : `${totalPrice} + PKR 100 Fees`}
                )
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </StripeProvider>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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

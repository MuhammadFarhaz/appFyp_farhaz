import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';

const {height, width} = Dimensions.get('window');
const PaymentMethods = ({navigation}) => {
  return (
    <View style={styles.conatinerStyle}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <View style={styles.headerContainer}>
        <Text
          style={{
            fontFamily: 'times new roman',
            fontSize: 24,
            color: '#ffbf00',
            fontWeight: 'bold',
            marginRight: width * 0.15,
            marginBottom: height * 0.02,
          }}>
          Payment Methods
        </Text>
      </View>
      <View style={styles.cardcontainerStyle}>
        <Image
          source={require('../assests/masterCard.jpg')}
          style={styles.imageStyle}
        />
        <Text style={styles.textStyle}>Master Card</Text>
      </View>
      <View style={styles.cardcontainerStyle}>
        <Image
          source={require('../assests/visa.png')}
          style={styles.imageStyle}
        />
        <Text style={styles.textStyle}>Visa Card</Text>
      </View>
      <View style={styles.cardcontainerStyle}>
        <Image
          source={require('../assests/cod.png')}
          style={styles.imageStyle}
        />
        <Text style={styles.textStyle}>Cash On Delivery (COD) </Text>
      </View>

      <TouchableOpacity></TouchableOpacity>
    </View>
  );
};

export default PaymentMethods;

const styles = StyleSheet.create({
  conatinerStyle: {height, width, alignItems: 'center',backgroundColor:"white"},
  textStyle: {
    color: '#ffbf00',
    fontSize: 18,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  cardcontainerStyle: {
    backgroundColor: 'white',
    height: height * 0.1,
    width: width * 0.9,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: height * 0.03,
    shadowColor: '#ffbf00',
    elevation: 8,
  },
  imageStyle: {
    height: height * 0.03,
    width: width * 0.08,
    marginTop: height * 0.02,
    resizeMode: 'contain',
  },
  headerContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: height * 0.05,
  },
  headerContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: height * 0.06,
  },
});

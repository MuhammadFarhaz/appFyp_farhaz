import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';
import {Linking} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';

export default function Help() {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View style={{marginHorizontal: '2%'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: '5%',
            }}>
            <Icons
              style={{marginRight: 5}}
              name="whatsapp"
              size={30}
              color="green"
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'green',
              }}
              onPress={() => Linking.openURL('https://wa.link/l748s1')}>
              Whatsapp Us
            </Text>
          </View>
          <Text
            style={{
              marginTop: '5%',
              fontSize: 18,
              fontWeight: 'bold',
              color: 'black',
              lineHeight: 19,
            }}>
            Dawat-e-Sheraz Restaurant App Policy
          </Text>
          <Text
            style={{
              marginTop: '5%',
              fontSize: 14,
              fontWeight: 'bold',
              color: 'black',
              lineHeight: 19,
            }}>
            1. Privacy Policy
          </Text>
          <Text style={{lineHeight: 19, marginTop: '2%'}}>
            At Fresh Pickens, we highly value your privacy and are committed to
            safeguarding your personal information. Our Privacy Policy outlines
            the data we collect, how we use it, and the measures we take to
            protect your data. By using our app, you agree to the terms outlined
            in our Privacy Policy.
          </Text>
          <Text
            style={{
              marginTop: '5%',
              fontSize: 14,
              fontWeight: 'bold',
              color: 'black',
              lineHeight: 19,
            }}>
            2. User Accounts
          </Text>
          <Text style={{lineHeight: 19, marginTop: '2%'}}>
            {'\n'}
            To enhance your shopping experience and provide personalized
            services, we offer user accounts. You are responsible for
            maintaining the confidentiality of your account credentials and for
            any activities that occur under your account. If you suspect any
            unauthorized access to your account, please notify us immediately.
            {'\n'}
          </Text>
          <Text
            style={{
              marginTop: '5%',
              fontSize: 14,
              fontWeight: 'bold',
              color: 'black',
              lineHeight: 19,
            }}>
            3. Payment and Billing Information
          </Text>
          <Text style={{lineHeight: 19, marginTop: '2%'}}>
            {'\n'}
            We take data security seriously and use secure payment gateways to
            process your transactions. We do not store or handle your payment
            card details. Your billing and payment information is encrypted and
            transmitted securely.
            {'\n'}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
              lineHeight: 19,
              marginTop: '2%',
            }}>
            4. Ordering and Delivery
          </Text>

          <Text style={{lineHeight: 19, marginTop: '2%'}}>
            a. Order Accuracy: We make every effort to ensure that product
            details, prices, and availability are accurate. However, in case of
            any discrepancies, we reserve the right to cancel or modify orders.
          </Text>
          <Text style={{lineHeight: 19, marginTop: '2%'}}>
            <Text style={{lineHeight: 19, marginTop: '2%'}}>
              b. Delivery: Our delivery services strive to deliver your orders
              within the specified time frame. Delivery times may vary based on
              factors beyond our control (e.g., traffic, weather).
            </Text>
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
              lineHeight: 19,
              marginTop: '2%',
            }}>
            5. Refund
          </Text>
          <Text style={{lineHeight: 19, marginTop: '2%'}}>
            <Text style={{lineHeight: 19, marginTop: '2%'}}>
              Refunds for eligible returns will be processed via the original
              payment method within 1 to 7 working days.
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

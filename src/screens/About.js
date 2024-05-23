import { View, Text, ScrollView } from 'react-native';
import React from 'react';
export default function About() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <View style={{ marginHorizontal: '2%', marginTop: '5%' }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
              lineHeight: 19,
            }}>
            Dawat-e-Sheraz Restaurant App
          </Text>
          <Text style={{ lineHeight: 19, marginTop: '2%' }}>
            Spare more with Dawat-e-Sheraz Restaurant App! We give you the most minimal costs
            on the entirety of your grocery needs.
            {'\n'}
            {'\n'}
            Dawat-e-Sheraz Restaurant App is a low-cost online general store that gets items
            crosswise over classifications like grocery, natural products and
            vegetables, excellence and health, family unit care, infant care,
            pet consideration, and meats and fish conveyed to your doorstep.
            {'\n'}
            {'\n'}
            Our goal is to give our clients the best shopping background as far
            as service, range, and value, which assembles a solid business and
            conveys long haul an incentive for our investors.
            {'\n'}
            {'\n'}
            Browse more than 5,00 items at costs lower than markets each day!
            {'\n'}
            {'\n'}
            We have built up a novel start to finish working answer for online
            grocery retail dependent on restrictive innovation and IP,
            appropriate for working our very own business and those of our
            business accomplices.
          </Text>
          <Text
            style={{
              lineHeight: 19,
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
              marginTop: '3%',
            }}>
            Points of interest with Dawat-e-Sheraz Restaurant App:
          </Text>
          <Text style={{ lineHeight: 19, marginTop: '2%' }}>
            1-No base request amount required.{'\n'}
            2-Free Shipping {'\n'}
            4-The app may have different categories such as fruits, vegetables,
            dairy, meat, beverages, snacks, etc. {'\n'}
            5-We acknowledge iDeal, Sofort, Bancontact, Visa, Master, American
            Express and PayPal and money. No Credit Card charge.{'\n'}
            6-The app may have a section dedicated to showcasing special deals,
            discounts, or offers on selected products. {'\n'}
            7-Installment over Secured (SSL) association. 8- The search feature
            in the app allows users to search for specific products or brands.
            9- Users can mark certain products as their favorites or add them to
            a wishlist for future reference. 10- The app may have a section
            where users can view their previous orders or purchase history.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

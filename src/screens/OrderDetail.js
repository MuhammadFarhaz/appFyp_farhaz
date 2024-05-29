import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Button,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { getOrders } from '../slice/OrderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
const { height, width } = Dimensions.get('window');
import LottieView from 'lottie-react-native';

import axios from 'axios';

const Accordion = ({ title, content, isOpen, onPress, total }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
      {isOpen && (
        <>
          <View style={styles.card}>
            <Text style={styles.textStyle}>Title</Text>
            <Text style={styles.textStyle}>{content?.product?.title}</Text>
            {/* color add according status */}
          </View>
          <View style={styles.card}>
            <Text style={styles.textStyle}>Quantity</Text>
            <Text style={styles.textStyle}>{content?.quantity}</Text>
            {/* color add according status */}
          </View>

          <View style={styles.card}>
            <Text style={styles.textStyle}>Price</Text>
            <Text style={styles.textStyle}>PKR {content?.product?.price}</Text>
            {/* color add according status */}
          </View>
          <View style={styles.card}>
            <Text style={styles.textStyle}>Item Price (Price*Qty) </Text>
            <Text style={styles.textStyle}>
              PKR {content?.product?.price * content?.quantity}
            </Text>
            {/* color add according status */}
          </View>
        </>
      )}
    </View>
  );
};

const OrderDetail = ({ navigation }) => {
  const { orders, isLoading } = useSelector(state => state.order);
  console.log('orders', orders);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, [isFocused]);
  const handleChange = async (orderId, value) => {
    console.log('orderId', orderId);

    try {
      const { data } = await axios.put(
        `http://localhost:5001/groceries/orderUpdate`,
        {
          _id: orderId,
          status: value,
        },
      );
      console.log('data', data);
      dispatch(getOrders());
    } catch (error) {
      console.log(error);
    }
  };
  const [openSectionIndex, setOpenSectionIndex] = useState(null);

  const handleAccordionPress = id => {
    setOpenSectionIndex(id === openSectionIndex ? null : id);
  };
  const handleCancel = async (orderId, remainingTime) => {
    const order = orders.find(item => item._id === orderId);

    if (order) {
      const orderTime = new Date(order.dateOrdered);
      orderTime.setHours(orderTime.getHours() + 2); // Add 2 hours to the order time for cancellation

      const currentTime = new Date();
      if (currentTime >= orderTime) {
        // Hide the cancel button if the remaining time is zero or negative
        if (remainingTime <= 0) {
          return;
        }

        // Cancel the order
        handleChange(orderId, 'cancel');
      } else {
        try {
          const { data } = await axios.put(
            `https://wild-rose-haddock-kilt.cyclic.app/groceries/orderUpdate`,
            {
              _id: orderId,
              status: 'cancel',
            },
          );
          console.log('data', data);
          dispatch(getOrders());
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const getTimeRemaining = endTime => {
    const currentTime = new Date().getTime();
    const remainingTime = endTime - currentTime;

    if (remainingTime <= 0) {
      return null; // Return null if the remaining time is negative or zero
    }
    const hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60),
    );
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <ActivityIndicator size="large" color="#ffbf00" />
      </View>
    );
  }

  return (
    <View style={styles.conatinerStyle}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text
            style={{
              fontFamily: 'times new roman',
              fontSize: 24,
              color: 'black',
              fontWeight: 'bold',
              marginRight: width * 0.15,
              marginBottom: height * 0.02,
            }}>
            Yours Orders
          </Text>
        </View>
        {orders.length === 0 ? (
          <>
            <LottieView
              source={{
                uri: 'https://assets9.lottiefiles.com/packages/lf20_09nNdJ9qB8.json',
              }}
              autoPlay={true}
              loop={false}
              style={{ height: 400, width: 400 }}
            />
          </>
        ) : (
          orders?.map((item, index) => {
            const orderTime = new Date(item.dateOrdered);
            orderTime.setHours(orderTime.getHours() + 2); // Add 2 hours to the order time for cancellation
            const remainingTime = getTimeRemaining(orderTime.getTime());
            return (
              <>
                <View key={index} style={styles.cardcontainerStyle}>
                  <View style={styles.card}>
                    <Text style={styles.textStyle}>Order Id</Text>
                    <Text style={styles.textStyle}>#{item?._id}</Text>
                  </View>
                  <View style={styles.card}>
                    <Text style={styles.textStyle}>Customer Name</Text>
                    <Text style={styles.textStyle}>{item?.user?.name}</Text>
                  </View>
                  <View style={styles.card}>
                    <Text style={styles.textStyle}>Email</Text>
                    <Text style={styles.textStyle}>{item?.user?.email}</Text>
                  </View>
                  <View style={styles.card}>
                    <Text style={styles.textStyle}>Phone No</Text>
                    <Text style={styles.textStyle}>{item?.phone}</Text>
                    {/* color add according status */}
                  </View>

                  <View style={styles.card}>
                    <Text style={styles.textStyle}>Status</Text>
                    <Text style={styles.textStyle}>
                      {item?.status === 'Not Process' ? (
                        <View>
                          <Text
                            style={{
                              height: 'auto',
                              width: 'auto',
                              backgroundColor: 'red',
                              color: 'white',
                              borderRadius: 10,
                              fontSize: 10,
                              paddingHorizontal: 10,
                              paddingVertical: 2,
                            }}>
                            {item.status}
                          </Text>
                        </View>
                      ) : item?.status === 'Processing' || 'Shipped' ? (
                        <View>
                          <Text
                            style={{
                              height: 'auto',
                              width: 'auto',
                              backgroundColor: '#15527a',
                              color: 'white',
                              borderRadius: 10,
                              fontSize: 10,
                              paddingHorizontal: 10,
                              paddingVertical: 2,
                            }}>
                            {item.status}
                          </Text>
                        </View>
                      ) : item?.status === 'deliverd' ? (
                        <View>
                          {' '}
                          <Text
                            style={{
                              height: 'auto',
                              width: 'auto',
                              backgroundColor: '#0f5657',
                              color: 'white',
                              borderRadius: 10,
                              fontSize: 10,
                              paddingHorizontal: 10,
                              paddingVertical: 2,
                            }}>
                            {item.status}
                          </Text>
                        </View>
                      ) : null}
                    </Text>
                    {/* color add according status */}
                  </View>

                  <View style={styles.card}>
                    <Text style={styles.textStyle}>Order Date</Text>
                    <Text style={styles.textStyle}>{item?.dateOrdered}</Text>
                  </View>
                  <View style={styles.card}>
                    <Text style={styles.textStyle}>Total Price</Text>
                    <Text style={styles.textStyle}>PKR {item?.total}</Text>
                    {/* color add according status */}
                  </View>
                  {item?.status === 'cancel' || item?.status === 'deliverd' ? (
                    <></>
                  ) : (
                    <>
                      <View style={styles.card1}>
                        {!remainingTime ? null : (
                          <Button
                            title="Cancel"
                            color={'red'}
                            disabled={remainingTime === '0h 0m 0s'}
                            onPress={() =>
                              handleCancel(item?._id, remainingTime)
                            }
                          />
                        )}
                        <Button
                          title="Receive"
                          color={'green'}
                          onPress={() => handleChange(item?._id, 'deliverd')}
                        />
                      </View>
                      <Text style={{ marginTop: '3%' }}>
                        {remainingTime ? (
                          <Text>
                            {' '}
                            <Text> Remaining Time for Cancellation:</Text>
                            <Text style={{ color: 'red', fontWeight: 'bold' }}>
                              {' '}
                              {remainingTime}
                            </Text>
                          </Text>
                        ) : null}
                      </Text>
                    </>
                  )}
                  <Text
                    onPress={() => handleAccordionPress(item?._id)}
                    style={{ marginTop: '2%', color: 'red', fontWeight: 'bold' }}>
                    OrderDetail
                  </Text>
                  {item?.orderItems?.map((itemA, ind) => (
                    <Accordion
                      key={ind}
                      content={itemA}
                      total={item?.total}
                      isOpen={openSectionIndex === item?._id}
                    />
                  ))}
                </View>
              </>
            );
          })
        )}

        <TouchableOpacity></TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  conatinerStyle: { height, width, alignItems: 'center' },
  textStyle: {
    color: 'black',
    fontSize: 14,
    paddingTop: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
  },
  card1: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 15,
  },
  cardcontainerStyle: {
    backgroundColor: 'white',
    height: 'auto',
    width: width * 0.9,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: height * 0.03,
    shadowColor: 'black',
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

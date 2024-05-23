import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

const getData = async()=>{
  const getUserToken = await messaging().getToken();
console.log("get",getUserToken);
}
  useEffect(() => {
    getData()
    messaging().onMessage(async remoteMessage => {
      console.log('Foreground Message:', remoteMessage);
      const notifications = await AsyncStorage.getItem('notifications');
      let parsedNotifications = JSON.parse(notifications) || [];
      parsedNotifications.push(remoteMessage);
      console.log(parsedNotifications);
      await AsyncStorage.setItem('notifications', JSON.stringify(parsedNotifications));
    });
    // Load stored notifications from AsyncStorage
    const loadNotifications = async () => {
      try {
        const storedNotifications = await AsyncStorage.getItem('notifications');
        const parsedNotifications = JSON.parse(storedNotifications) || [];
        setNotifications(parsedNotifications);
      } catch (error) {
        console.log('Error loading notifications:', error);
      }
    };
    loadNotifications();
  }, []);
console.log("noti",notifications);

  // Render each notification in the list
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item?.notification?.title}</Text>
      <Text>{item?.notification?.body}</Text>

    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.messageId}_${index}`}
        ListEmptyComponent={<Text>No notifications available</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  removeButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Notification;

import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
  TextInput,
} from 'react-native';
import React from 'react';
import Iconsgreater from 'react-native-vector-icons/MaterialIcons';
import Iconslogout from 'react-native-vector-icons/Feather';
import ProfileBtn from '../components/ProfileBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import { getUser } from '../slice/CurrentUserSlice';
import { useDispatch, useSelector } from 'react-redux';
const staticData = {
  img: 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=',
};

export default function Account({ navigation }) {
  const { users, isLoading } = useSelector(state => state.user);
  console.log('user', users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);

  const isFocused = useIsFocused();

  const logoutAccount = async () => {
    try {
      const dataUser = await axios.get(
        'http://localhost:5001/auth/logout',
      );

      if (dataUser) {
        await AsyncStorage.removeItem('fetchData');

        await AsyncStorage.removeItem('token');
        navigation.replace('Login');
      }
      navigation.replace('Login');

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            aligncurrentUserms: 'center',
            marginTop: '5%',
            marginLeft: '5%',
          }}>
          <View style={{ marginLeft: '3%' }}>
            <View style={{}}>
              {users?.length !== 0 ? (
                [users]?.map((currentUser, i) => {
                  return (
                    <View key={i}>
                      <View
                        style={{
                          flexDirection: 'row',
                          aligncurrentUserms: 'center',
                          marginBottom: '5%',
                        }}>
                        <View>
                          <Image
                            source={{
                              uri: currentUser?.avatar
                                ? currentUser?.avatar?.url
                                : staticData?.img,
                            }}
                            style={{
                              height: 60,
                              width: 60,
                              presentationStyle: 'overCurrentContext',
                              borderRadius: 40,
                            }}
                          />
                        </View>
                        <View>
                          <View
                            style={{ flexDirection: 'row', marginLeft: '5%' }}>
                            <Text
                              style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: 'black',
                                maxWidth: '80%',
                              }}>
                              {currentUser.name}
                            </Text>
                            <TouchableOpacity
                              style={{ marginTop: '2%' }}
                              onPress={() =>
                                navigation.navigate('AccountDetail', {
                                  currentName: currentUser?.name,
                                  currentUserImage: currentUser?.avatar?.url,
                                  currentId: currentUser?._id,
                                })
                              }>
                            </TouchableOpacity>
                          </View>
                          <View style={{ marginLeft: '5%' }}>
                            <Text>{currentUser.userr}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })
              ) : (
                <View
                  style={{ flexDirection: 'row', aligncurrentUserms: 'center' }}>
                  <View>
                    <Image
                      source={{ uri: staticData?.img }}
                      style={{
                        height: 80,
                        width: 80,
                        presentationStyle: 'overCurrentContext',
                        borderRadius: 40,
                      }}
                    />
                  </View>
                  <View>
                    <View style={{ flexDirection: 'row', marginLeft: '5%', marginBottom: "20%" }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: 'black',
                          maxWidth: '90%',
                          marginTop: "2%"
                        }}>
                        Muhammad Awais
                      </Text>
                      <TouchableOpacity
                        style={{ marginTop: '2%' }}
                        onPress={() =>
                          navigation.navigate('AccountDetail', {
                            currentUser: users,
                          })
                        }>
                        {/* <Iconsgreater name="edit" size={20} color="#53B175" /> */}
                      </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: '5%' }}></View>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('OrderDetail')}>
          <ProfileBtn text="Orders" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('PaymentOptionsScreen')}>
          <ProfileBtn text="Payment Methods" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Help')}>
          <View>
            <ProfileBtn text="Help" />
          </View>
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('About')}>
            <ProfileBtn text="About" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            borderColor: 'grey',
            borderBottomWidth: 1,
            justifyContent: 'center',
          }}></View>

        <TouchableOpacity
          onPress={() => logoutAccount()}
          style={{
            marginTop: '13%',
            alignSelf: 'center',
            height: 60,
            width: '90%',
            borderRadius: 15,
            backgroundColor: '#F2F3F2',
            justifyContent: 'center',
          }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '40%' }}>
              <Iconslogout
                style={{ marginLeft: 20 }}
                name="log-out"
                size={22}
                color="#ffbf00"
              />
            </View>
            <View style={{ width: '60%' }}>
              <Text style={{ fontSize: 18, color: '#ffbf00' }}>Log Out</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

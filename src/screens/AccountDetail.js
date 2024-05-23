import {
  View,
  Text,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ComnBtn from '../components/ComnBtn';
import {useIsFocused} from '@react-navigation/native';
// import { Item } from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';
import {updateUserProfile} from '../slice/CurrentUserSlice';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

const staticData = {
  img: 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=',
};

export default function AccountDetail({route, navigation}) {
  const {currentUserImage, currentName, currentId} = route.params;
  console.log('Image', currentId);
  const [profnme, setProfnmae] = useState(currentName || '');
  const [shwimg, setShwimg] = useState('');
  const [username, setUserName] = useState();
  const [detaill, setDetail] = useState();
  const {users, isLoading} = useSelector(state => state.user);
  console.log('profile', users);
  const [isloading, setIsloading] = useState(false);
  const [show, setShow] = useState([]);

  const getimg = async () => {
    const dta = await launchImageLibrary({
      quality: 1,
      mediaType: 'photo',
    });
    console.log(dta);
    setShwimg(dta?.assets[0].uri);
  };

  const updateData = async () => {
    const formData = new FormData();
    formData.append('name', profnme);
    formData.append('avatar', {
      uri: shwimg ? shwimg : currentUserImage,
      name: 'profileImage.jpg',
      type: 'image/jpeg',
    });

    console.log('fordata', formData);
    setIsloading(true);
    try {
      const dataUser = await axios.put(
        `https://wild-rose-haddock-kilt.cyclic.app/auth/updateProfile/${currentId}`,
        formData,
      );
      console.log('formData', dataUser?.data);
      setShow(dataUser.data);
      ToastAndroid.show('Update Your Profile', ToastAndroid.SHORT);
      await navigation?.replace('Account');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <View style={{marginTop: '5%'}}>
        <Image
          source={{uri: shwimg ? shwimg : currentUserImage}}
          style={{
            height: 80,
            width: 80,
            alignSelf: 'center',
            presentationStyle: 'overCurrentContext',
            borderRadius: 40,
          }}
        />

        {/* <Image style={{ height: 80, width: 80, alignSelf: "center", 
                borderRadius: 40 }} source={require('../assests/bnana.png')} /> */}

        <TouchableOpacity onPress={() => getimg()}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#53B175',
              marginTop: '2%',
            }}>
            Edit Picture
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 150,
          width: '100%',
          borderColor: 'gray',
          borderWidth: 1,
          justifyContent: 'center',
          marginTop: '5%',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: '7%',
          }}>
          <View style={{width: '30%', marginTop: '1.5%'}}>
            <Text style={{fontSize: 16, fontWeight: '400', color: 'black'}}>
              Name
            </Text>
          </View>
          <View
            style={{
              width: '70%',
              height: 40,
              borderColor: 'gray',
              borderBottomWidth: 1,
            }}>
            <TextInput
              style={{fontSize: 16}}
              placeholder="Name"
              onChangeText={profnme => setProfnmae(profnme)}
              value={profnme}
            />
          </View>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: '7%',
          }}>
          <View style={{width: '30%', marginTop: '1.5%'}}>
            <Text style={{fontSize: 16, fontWeight: '400', color: 'black'}}>
              Username
            </Text>
          </View>
          <View
            style={{
              width: '70%',
              height: 40,
              borderColor: 'gray',
              borderBottomWidth: 1,
            }}>
            <TextInput
              style={{fontSize: 16}}
              placeholder="admin@123"
              onChangeText={username => setUserName(username)}
              value={username}
            />
          </View>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: '7%',
          }}>
          <View style={{width: '30%', marginTop: '1.5%'}}>
            <Text style={{fontSize: 16, fontWeight: '400', color: 'black'}}>
              Bio
            </Text>
          </View>
          <View
            style={{
              width: '70%',
              height: 40,
              borderColor: 'gray',
              borderBottomWidth: 1,
            }}>
            <TextInput
              style={{fontSize: 16}}
              placeholder="Detail"
              onChangeText={detaill => setDetail(detaill)}
              value={detaill}
            />
          </View>
        </View>
      </View>

      {/* <Button  onPress={() => finalData()} title='SAVE' /> */}
      <TouchableOpacity onPress={() => updateData()} style={{marginTop: '5%'}}>
        <ComnBtn
          title={
            isloading ? <ActivityIndicator size={25} color={'white'} /> : 'Save'
          }
        />
      </TouchableOpacity>
    </View>
  );
}

// detail set data and show

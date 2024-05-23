import React from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function FndPrd({title, bg, image}) {
  const navigation = useNavigation();

  // Calculate the dynamic padding based on the screen height
  const padding = windowHeight * 0.02;

  return (
    // <View style={{padding}}>
    //   <TouchableOpacity
    //     onPress={() =>
    //       navigation.navigate('SellAll', {
    //         test: title,
    //       })
    //     }>
    //     <View
    //       style={{
    //         justifyContent: 'center',
    //         height: windowHeight * 0.23,
    //         width: windowWidth * 0.38,
    //         backgroundColor: bg,
    //         borderWidth: 2,
    //         borderColor: bg,
    //         borderRadius: windowHeight * 0.02,
    //       }}>
    //       <Image
    //         style={{
    //           alignSelf: 'center',
    //           height: windowHeight * 0.08,
    //           width: windowWidth * 0.3,
    //         }}
    //         source={{uri:"https://images.pexels.com/photos/1199960/pexels-photo-1199960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}}
    //       />
    //       <Text
    //         style={{
    //           marginTop: windowHeight * 0.02,
    //           fontSize: 16,
    //           color: 'black',
    //           alignSelf: 'center',
    //           width: windowWidth * 0.35,
    //           textAlign: 'center',
    //         }}>
    //         {title}
    //       </Text>
    //     </View>
    //   </TouchableOpacity>
    // </View>
    <></>
  );
}

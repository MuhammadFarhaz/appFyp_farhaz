import {View, TextInput} from 'react-native';
import React, {useEffect} from 'react';
import Icons from 'react-native-vector-icons/Feather';
import CrossUIcon from 'react-native-vector-icons/Entypo';
import {useState} from 'react';
import {useDispatch} from 'react-redux';

export default function Search({get, postsData}) {
  const [title, setTitle] = useState('');
  useEffect(() => {
    if (title == '') {
      dispatch(postsData());
    }
  }, [title]);
  const dispatch = useDispatch();

  const handleSearch = title => {
    dispatch(get(title));
  };
  const handleShowData = () => {
    setTitle('');
    dispatch(postsData());
  };
  return (
    <View
      style={{
        justifyContent: 'center',
        height: 50,
        width: '90%',
        backgroundColor: '#F2F3F2',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 15,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Icons
          style={{marginTop: 9, marginLeft: 10}}
          name="search"
          size={20}
          color="black"
          onPress={() => handleSearch(title)}
        />
        <TextInput
          style={{height: 40, width: '80%'}}
          placeholder="Search"
          placeholderTextColor={"black"}
          value={title}
          onChangeText={title => setTitle(title)}
        />
        {title ? (
          <CrossUIcon
            style={{marginTop: 9}}
            name="cross"
            size={20}
            color="black"
            onPress={() => handleShowData()}
          />
        ) : null}
      </View>
    </View>
  );
}

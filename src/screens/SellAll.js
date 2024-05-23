import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { getPost } from '../slice/GetSlice';
import ExclusiveOffer from '../components/ExclusiveOffer';

export default function SellAll({route}) {
    const { test } = route.params;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector(state => state.post);

  useEffect(() => {
    dispatch(getPost());
  }, [isFocused]);

  // Filter the posts based on the "Beverages" category
  const filteredPosts = posts.filter(item => item.category === test);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          style={{ alignSelf: 'center', marginHorizontal: '5%' }}
          data={filteredPosts}
          numColumns={2}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <ExclusiveOffer
              key={item._id}
              title={item.title}
              item={item}
              price={item.price}
              image={{ uri: item.image }}
            />
          )}
        />
      )}
    </View>
  );
}

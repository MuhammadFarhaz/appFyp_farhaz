import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { ImageSlider } from 'react-native-image-slider-banner';
import ExclusiveOffer from '../components/ExclusiveOffer';
import Search from '../components/Search';
import { getPost, searchApiData } from '../slice/GetSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import star from "../assests/star.png"
import { scale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Dimensions } from 'react-native';
import Pizza from "../assests/Pizza.png";
import drinks from "../assests/drinks.png";
import Icons from 'react-native-vector-icons/Feather';
import CrossUIcon from 'react-native-vector-icons/Entypo';
import naan from "../assests/naan.png"
import curd from "../assests/curd.png"
import salad from "../assests/salad.png"
import drink from "../assests/drink.png"
import barbecue from "../assests/barbecue.png"
import grilling from "../assests/grilling.png"
import rice from "../assests/rice.png"
import axios from 'axios';




export default function HomeScreen({ navigation }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.post);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [searchQuery, setSearchQuery] = useState('');
  const [productData, setProductData] = useState(null);
  useEffect(() => {
    // Make API call using Axios
    axios.get('http://localhost:5001/groceries/totalsalesproduct')
      .then(response => {
        setProductData(response.data.deliveredProducts);
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, [isFocused]);

  useEffect(() => {
    dispatch(getPost())
      .then(() => setIsLoading(false))
      .catch(error => {
        setIsLoading(false);
        console.log(error); // Handle the error appropriately
      });
  }, [isFocused]);

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(getPost());
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const renderExclusiveOffers = () => {
    const exclusiveOffers = posts
      .filter(item => item.category === 'Exclusive')
      .slice(0, 4);




    return (
      <FlatList
        data={exclusiveOffers}
        style={{ alignSelf: 'center', marginHorizontal: '5%' }}
        numColumns={2}
        keyExtractor={item => item?._id?.toString()}
        renderItem={({ item }) => (
          <ExclusiveOffer
            key={item?._id}
            title={item.title}
            item={item}
            price={item.price}
            image={{ uri: item.image }}
          />
        )}
      />
    );
  };

  const renderBestSelling = () => {
    const bestSelling = posts
      .filter(item => item.category === 'Best selling')
      .slice(0, 4);
    return (
      <FlatList
        data={bestSelling}
        style={{ alignSelf: 'center', marginHorizontal: '5%' }}
        numColumns={2}
        keyExtractor={item => item._id.toString()}
        renderItem={({ item }) => (
          <ExclusiveOffer
            key={item?._id}
            title={item.title}
            item={item}
            price={item.price}
            image={{ uri: item.image }}
          />
        )}
      />
    );
  };
  const categoryArray = [
    { name: "Pizza", image: Pizza },
    { name: "BBQ", image: barbecue },
    { name: "Karahi", image: grilling },
    { name: "Rice", image: rice },
    { name: "Salad", image: salad },
    { name: "Roti & Nan", image: naan },
    { name: "Drinks", image: drink },
    { name: "Raita", image: curd },
  ];
  function chunk(array, size) {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  }
  const filterCarts = () => {
    const filteredArray = categoryArray.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return chunk(filteredArray, 4); // Chunk the filtered array into chunks of size 4
  };


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ height: 60, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#ffbf00" }}>App Logo</Text>

      </View>
      <View
        style={{
          justifyContent: 'center',
          height: windowHeight * 0.06,
          width: windowWidth * 0.95,
          backgroundColor: '#F2F3F2',
          borderRadius: windowWidth * 0.02,
          alignSelf: 'center',
          marginTop: windowHeight * 0.02,
          marginBottom: windowHeight * 0.02,


          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Icons
          style={{ marginLeft: windowWidth * 0.04 }}
          name="search"
          size={windowWidth * 0.06}
          color="black"
          onPress={() => filterCarts(searchQuery)}
        />
        <TextInput
          style={{ height: windowHeight * 0.06, flex: 1 }}
          placeholder="Search Category"
          value={searchQuery}
          onChangeText={searchQuery => setSearchQuery(searchQuery)}
        />
        {searchQuery ? (
          <CrossUIcon
            style={{ marginRight: windowWidth * 0.04 }}
            name="cross"
            size={windowWidth * 0.06}
            color="black"
            onPress={() => setSearchQuery('')}
          />
        ) : null}
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        {/* <View style={{marginTop: 15, maxHeight: 130, marginHorizontal: '2%'}}>
          <ImageSlider
            caroselImageStyle={{resizeMode: 'cover', maxHeight: 130}}
            data={[
              {
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU',
              },
              {
                img: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg',
              },
              {
                img: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg',
              },
            ]}
            showIndicator={true}
            onItemChanged={item => console.log('item', item)}
          />
        </View> */}

        {/* {isLoading && posts.length === 0 ? (
          <ActivityIndicator size={30} style={{marginTop: '5%'}} />
        ) : (
          <>
            {posts.length > 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: '6%',
                  marginTop: 5,
                }}>
                <Text style={{fontSize: 20, color: 'black'}}>
                  Exclusive Offer
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('SellAll', {
                      test: 'Exclusive',
                    })
                  }>
                  <Text style={{fontSize: 15, color: '#53B175'}}>See all</Text>
                </TouchableOpacity>
              </View>
            )}
            {renderExclusiveOffers()}
          </>
        )}

        {posts.length > 0 ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: '6%',
              marginTop: 5,
            }}>
            <Text style={{fontSize: 20, color: 'black'}}>Best Selling</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('SellAll', {
                  test: 'Best selling',
                })
              }>
              <Text style={{fontSize: 15, color: '#53B175'}}>See all</Text>
            </TouchableOpacity>
          </View>
        ) : !isLoading ? (
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LottieView
              source={{
                uri: 'https://assets2.lottiefiles.com/packages/lf20_tmsiddoc.json',
              }}
              autoPlay={true}
              loop={true}
              style={{height: 400, width: 400}}
            />
          </View>
        ) : null}
        {renderBestSelling()} */}
        <View style={{ marginHorizontal: "5%", marginTop: "5%", display: 'flex', justifyContent: "space-between", flexDirection: "row" }}>
          <Text style={{ fontSize: 14, fontWeight: "bold", color: "black" }}>Trending this Week</Text>
        </View>

        <ScrollView horizontal={true} >

          {productData && productData.map(product => (
            <View
              key={product.product?._id}
              style={{
                justifyContent: 'center',
                height: moderateScale(200),
                maxHeight: "auto",
                width: moderateScale(220),
                margin: 10,
                backgroundColor: 'white',
                borderWidth: 0.5,
                borderColor: '#D3D3D3',
                borderRadius: 20,
                marginLeft: scale(25)
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                }}
                onPress={() =>
                  navigation.navigate('ProductDetail', {
                    title: product?.product?.title,
                    price: product?.product?.price,
                    image: product?.product?.image,
                    size: product?.product.size,
                    id: product.product?.id,
                    item: product.product,
                    description: product.product?.description,
                  })}>
                <Image
                  style={{
                    height: moderateScale(120),
                    width: "100%",
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20
                  }}
                  resizeMode='contain'
                  source={{ uri: product?.product.image }}
                />

                <Text style={{ marginLeft: 10, fontSize: 16, color: 'black', fontWeight: "bold", marginTop: "1%" }}>
                  {product.title}
                </Text>
                <Text style={{ marginLeft: 10, fontSize: 10 }}>{product?.product?.title}</Text>
                <View
                  style={{
                    marginTop: scale(10),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 10,
                  }}>
                  <View style={{ display: "flex", flexDirection: "row", marginTop: scale(2), }}>
                    {/* Render stars here */}
                  </View>
                  <Text style={{ fontSize: 14, color: 'black', fontWeight: "bold" }}>RS {product?.product?.price}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}


        </ScrollView>
        <View style={{ marginHorizontal: "5%", marginTop: "5%", display: 'flex', justifyContent: "space-between", flexDirection: "row" }}>
          <Text style={{ fontSize: 14, fontWeight: "bold", color: "black" }}>Categories</Text>
          {/* <Text style={{ fontSize: 14, fontWeight: "bold", color: "#ffbf00" }}>View All</Text> */}
        </View>
        <View style={{ marginHorizontal: "5%", marginTop: "2%" }}>
          {filterCarts().map((row, index) => (
            <View key={index} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: "2%" }}>
              {row.map(category => (
                <TouchableOpacity key={category.name} style={{
                  backgroundColor: 'white',
                  borderWidth: 0.5,
                  borderRadius: 10,
                  borderColor: '#D3D3D3',
                  height: moderateVerticalScale(85),
                  width: moderateScale(65),
                }}
                  onPress={() => navigation.navigate('ProductScreen', {
                    text: category?.name,
                    posts: posts
                  })}>
                  <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Image style={{ height: 30, width: 30, marginTop: 20 }}
                      source={category.image} // Assuming you have an array of category objects with an 'image' property
                    />
                    <Text style={{ fontSize: 12, fontWeight: "bold", color: "#ffbf00", textAlign: "center", paddingTop: "2%" }}>{category.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>


      </ScrollView>

    </View>

  );
}

import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, Dimensions, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import ExclusiveOffer from '../components/ExclusiveOffer';
import FndPrd from '../components/FndPrd';
import Icons from 'react-native-vector-icons/Feather';
import CrossUIcon from 'react-native-vector-icons/Entypo';

import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import { useRoute } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProductScreen({ navigation }) {

    const route = useRoute()
    const { posts, text, dealAllow } = route.params
    // Array of carts
    console.log("posts", posts, text);

    const [searchQuery, setSearchQuery] = useState('');

    const filterCarts = () => {
        return posts.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };
    return (
        <>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignContent: 'center',
                        marginTop: '5%',
                        height: moderateScale(50), alignItems: "center"
                    }}>
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
                        placeholder="Search "
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
                <ScrollView>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                        {filterCarts()?.map((recipe, index) => (
                            recipe?.category == text  &&
                            <View
                                key={recipe?._id}
                                style={{
                                    height: "auto",
                                    minHeight: moderateVerticalScale(220),
                                    width: '47%', // Set width to 48% for two cards in a row
                                    marginVertical: 10,
                                    borderWidth: 1,
                                    position: 'relative',
                                    elevation: 1,
                                    shadowColor: '#AEAEAE',
                                    shadowOpacity: 1,
                                    shadowRadius: 5,
                                    borderColor: 'white',

                                }}
                            >
                                <TouchableOpacity onPress={() =>
                                    navigation.navigate('ProductDetail', {
                                        title: recipe?.title,
                                        price: recipe?.price,
                                        image: recipe?.image,
                                        size: recipe?.size,
                                        id: recipe?._id,
                                        item: recipe,
                                        description: recipe?.description,
                                    })} style={{ height: moderateVerticalScale(150), width: '100%', position: 'relative' }}>
                                    <Image source={{ uri: recipe?.image ? recipe.image.replace(/^http:/, 'https:') : null }} style={{ width: '100%', resizeMode: 'cover', height: 150, borderTopLeftRadius: 7, borderTopRightRadius: 7 }} />
                                </TouchableOpacity>
                                <View style={{ paddingHorizontal: '5%' }}>
                                    <Text style={{ fontSize: scale(11), fontWeight: '500', fontFamily: 'Poppins-SemiBold', color: 'red' }}>
                                        {dealAllow && recipe.deal}
                                    </Text>
                                    <Text style={{ fontSize: scale(11), fontWeight: '500', fontFamily: 'Poppins-SemiBold', color: 'black' }}>{recipe.title}</Text>
                                    <View style={{ display: "flex", flexDirection: "row" }}>

                                        <Text style={styles.newPrice}>Rs {recipe.price}</Text>
                                    </View>
                                </View>

                            </View>))}
                    </View>
                </ScrollView>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    originalPrice: {
        fontSize: scale(11),
        fontWeight: '500',
        fontFamily: 'Poppins-SemiBold',
        color: 'red',
        textDecorationLine: 'line-through', // Add strike-through
        marginRight: "2%", // Adjust as per your design
    },
    newPrice: {
        fontSize: scale(11),
        fontWeight: '500',
        fontFamily: 'Poppins-SemiBold',
        color: 'black',
    },
});

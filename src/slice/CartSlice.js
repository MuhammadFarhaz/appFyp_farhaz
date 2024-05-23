// https://curious-crow-bracelet.cyclic.app/groceries/getGroceries

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get API data
const getCart = createAsyncThunk('api/getCart', async cartsId => {
  const storedUserId = await AsyncStorage.getItem('fetchData');
  const id = JSON.parse(storedUserId);
  console.log('Id', id);
  try {
    const response = await axios.get(`http://192.168.0.103:5001/groceries/getCart/${id}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    carts: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCart.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.carts = action.payload;
        state.isLoading = false;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export {getCart};
export default cartSlice.reducer;

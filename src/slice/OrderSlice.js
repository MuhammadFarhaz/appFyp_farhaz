// https://curious-crow-bracelet.cyclic.app/groceries/getGroceries

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Get API data
const getOrders = createAsyncThunk('api/getOrders', async () => {
  const storedUserId = await AsyncStorage.getItem('fetchData');
  const id = JSON.parse(storedUserId);
  try {
    const response = await axios.get(
      `http://localhost:5001/groceries/getOrder/${id}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});
const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getOrders.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })

  },
});

export { getOrders };
export default orderSlice.reducer;

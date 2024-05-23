// https://curious-crow-bracelet.cyclic.app/groceries/getGroceries

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get API data
const getUser = createAsyncThunk('api/getProfile', async () => {
  const storedUserId = await AsyncStorage.getItem('fetchData');
  const id = JSON.parse(storedUserId);
  console.log('Id', id);
  try {
    const response = await axios.get(
      `http://192.168.0.103:5001/auth/getProfile/${id}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export { getUser };
export default userSlice.reducer;

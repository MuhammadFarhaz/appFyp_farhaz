// https://curious-crow-bracelet.cyclic.app/groceries/getGroceries

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Get API data
const getPost = createAsyncThunk('api/getPost', async () => {
  try {
    const response = await axios.get("http://localhost:5001/groceries/getGroceries",
    );
    console.log("response", response?.data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Search API data
const searchApiData = createAsyncThunk('api/searchApiData', async title => {
  try {
    console.log('title', title);
    const response = await axios.get(
      `https://wild-rose-haddock-kilt.cyclic.app/groceries/search/${title}`,
    );
    console.log('search', response?.data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const apiSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPost.pending, state => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(searchApiData.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchApiData.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
      })
      .addCase(searchApiData.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export { getPost, searchApiData };
export default apiSlice.reducer;

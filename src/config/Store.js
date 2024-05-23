import {configureStore} from '@reduxjs/toolkit';
import apiReducer from '../slice/GetSlice';
import cartReducer from '../slice/CartSlice';
import favouriteSlice from '../slice/favouriteSlice';
import userReducer from "../slice/CurrentUserSlice"
import orderReducer from "../slice/OrderSlice"
export const Store = configureStore({
  reducer: {
    post: apiReducer,
    cart: cartReducer,
    favourite: favouriteSlice,
    user:userReducer,
    order:orderReducer
  },
});

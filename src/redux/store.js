// Redux Toolkit Imports
import {configureStore} from '@reduxjs/toolkit';
// Custom Imports
import {apiSlice} from './api/apiSlice';
import productsReducer from './products/productsSlice';
import wishListReducer from './wishlist/wishlistsSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // For API Integration

    products: productsReducer,
    wishListProducts: wishListReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(apiSlice.middleware), // Include middleware for both API slices
});

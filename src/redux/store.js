// Redux Toolkit Imports
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist'; // Persist utilities
import {apiSlice} from './api/apiSlice';
import productsReducer from './products/productsSlice';
import wishListReducer from './wishlist/wishlistsSlice';
import addressReducer from './address/addressSlice';
import authReducer from './auth/authSlice';
import searchbarReducer from './searchbar/searchbarSlice';

// Configurations for redux-persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['products', 'wishListProducts', 'address', 'auth', 'searchbar'], // Slices to persist
};

// Combine your reducers
const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer, // For API Integration

  products: productsReducer,
  wishListProducts: wishListReducer,
  address: addressReducer,
  auth: authReducer,
  searchbar: searchbarReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(apiSlice.middleware), // Include middleware for both API slices
});

// Export the persistor, which will be used in your app entry file
export const persistor = persistStore(store);

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development
});

export default store;

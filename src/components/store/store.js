import { configureStore } from '@reduxjs/toolkit';
import userReducer from './authslice';
import medicineReducer from './medicineslice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    medicine: medicineReducer,
  },
});

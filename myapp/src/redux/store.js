import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './slices/employeeSlice';

const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/authSlice'
import agencyReducer from './components/Agency/agencySlice'
import alertReducer from './components/Alert/alertSlice'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    agency:agencyReducer,
    alert:alertReducer,
  },

});
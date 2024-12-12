'use client'

import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import userReducer from './userReducer'; // Ensure this file exists
import courseReducer from './courseReducer'; // Ensure this file exists

const rootReducer = combineReducers({
  user: userReducer,
  courses: courseReducer,
  // Add other reducers here
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
}); 
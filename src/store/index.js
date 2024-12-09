'use client'

import { configureStore } from '@reduxjs/toolkit'

const makeStore = () => 
  configureStore({
    reducer: {
      // Add your reducers here
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })

export const store = makeStore() 
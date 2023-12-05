import { configureStore } from '@reduxjs/toolkit'
import { contactSlice } from '../feature'

export const store = configureStore({
  reducer: {
    contact: contactSlice.reducer,
  },
})

import {configureStore} from '@reduxjs/toolkit'
import mainReducer from './features/mainSlice'




export const store = configureStore({
    reducer: {
        main: mainReducer
    },
  })
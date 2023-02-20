import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    turnOnLoading: (state) => {
      state.isLoading = true
    },
    turnOffLoading: (state) => {
      state.isLoading = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { turnOnLoading, turnOffLoading } = mainSlice.actions

export default mainSlice.reducer
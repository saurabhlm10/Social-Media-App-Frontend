import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  followLoader: false,
  deleteModalOpen: false,
  showCheckmark: false,
  user: {},
  tempUser: {},
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    turnOnShowCheckmark: (state) => {
      state.showCheckmark = true
    },
    turnOffShowCheckmark: (state) => {
      state.showCheckmark = false
    },
    turnOnLoading: (state) => {
      state.isLoading = true
    },
    turnOffLoading: (state) => {
      state.isLoading = false
    },
    turnOnLogin: (state) => {
      if(state.isLoggedIn === false) state.isLoggedIn = true
    },
    turnOffLogin: (state) => {
      if(state.isLoggedIn === true) state.isLoggedIn = false
    },
    setUser: (state, {payload}) => {
      state.user = payload
    },
    setTempUser: (state, {payload}) => {
      state.tempUser = payload
    },
    turnOnFollowLoader: (state) => {
      if(state.followLoader === false) state.followLoader = true
    },
    turnOffFollowLoader: (state) => {
      if(state.followLoader === true) state.followLoader = false
    },
    turnOnDeleteModal: (state) => {
      if(state.deleteModalOpen === false) state.deleteModalOpen = true
    },
    turnOffDeleteModal: (state) => {
      if(state.deleteModalOpen === true) state.deleteModalOpen = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { turnOnLoading, turnOffLoading, turnOnLogin, turnOffLogin, setUser, setTempUser, turnOnFollowLoader,turnOffFollowLoader, turnOnCheckFollow, turnOffCheckFollow, turnOnDeleteModal, turnOffDeleteModal, turnOnShowCheckmark, turnOffShowCheckmark } = mainSlice.actions

export default mainSlice.reducer

export const mainState = (state) => state.main
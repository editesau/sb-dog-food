/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { USER_TOKEN_STORAGE_KEY } from '../../tools/storageKeys'

const initialState = {
  value: window.localStorage.getItem(USER_TOKEN_STORAGE_KEY),
}

const authSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.value = action.payload
    },
    clearToken: (state) => {
      state.value = null
    },
  },
})

export const { setToken, clearToken } = authSlice.actions

export default authSlice.reducer

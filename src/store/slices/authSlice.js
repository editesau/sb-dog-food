/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { USER_GROUP_STORAGE_KEY, USER_TOKEN_STORAGE_KEY } from '../../tools/storageKeys'

const initialState = {
  token: window.localStorage.getItem(USER_TOKEN_STORAGE_KEY),
  group: window.localStorage.getItem(USER_GROUP_STORAGE_KEY),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload.token
      window.localStorage.setItem(USER_TOKEN_STORAGE_KEY, action.payload.token)
      window.localStorage.setItem(USER_GROUP_STORAGE_KEY, action.payload.group)
    },
    clearAuth: (state) => {
      state.token = null
      state.group = null
      window.localStorage.clear()
    },
  },
})

export const { setAuth, clearAuth } = authSlice.actions
export default authSlice.reducer

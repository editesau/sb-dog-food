/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { USER_STORAGE_KEY } from '../../../tools/storageKeys'

let initialState = { token: null, id: null, group: null }
const userLS = window.localStorage.getItem(USER_STORAGE_KEY)
if (userLS) initialState = JSON.parse(userLS)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: {
      reducer:
      (state, action) => {
        window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(action.payload))
        state = action.payload
        return state
      },
      prepare: (token, id, group) => {
        return { payload: { token, id, group } }
      },
    },
    clearUser: (state) => {
      state = { token: null, id: null, group: null }
      return state
    },

  },
})

export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer

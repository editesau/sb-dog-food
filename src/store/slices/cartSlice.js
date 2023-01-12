/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { USER_CART_STORAGE_KEY } from '../../tools/storageKeys'

const initialState = JSON.parse(window.localStorage.getItem(USER_CART_STORAGE_KEY)) || []

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const index = state.findIndex((product) => product.id === action.payload.id)
      if (index !== -1) {
        state[index].count = action.payload.count === 1
          ? state[index].count + 1
          : state[index].count + action.payload.count
      } else {
        state.push({
          id: action.payload.id,
          count: action.payload.count,
        })
      }
      window.localStorage.setItem(USER_CART_STORAGE_KEY, JSON.stringify(state))
    },
    removeItem: (state, action) => {
      state.splice(state.indexOf(action.payload), 1)
      window.localStorage.setItem(USER_CART_STORAGE_KEY, JSON.stringify(state))
    },
  },
})

export const { addItem, removeItem } = cartSlice.actions
export default cartSlice.reducer

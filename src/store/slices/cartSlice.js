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
          isSelected: false,
        })
      }
      window.localStorage.setItem(USER_CART_STORAGE_KEY, JSON.stringify(state))
    },
    increaseItemCount: (state, action) => {
      const index = state.findIndex((product) => product.id === action.payload)
      if (index !== -1) {
        state[index].count += 1
        window.localStorage.setItem(USER_CART_STORAGE_KEY, JSON.stringify(state))
      }
    },
    decreaseItemCount: (state, action) => {
      const index = state.findIndex((product) => product.id === action.payload)
      if (index !== -1) {
        state[index].count -= 1
        window.localStorage.setItem(USER_CART_STORAGE_KEY, JSON.stringify(state))
      }
    },
    toggleSelect: (state, action) => {
      const index = state.findIndex((product) => product.id === action.payload)
      if (index !== -1) {
        state[index].isSelected = !state[index].isSelected
        window.localStorage.setItem(USER_CART_STORAGE_KEY, JSON.stringify(state))
      }
    },
    setSelectAll: (state, action) => {
      state.forEach((item) => { item.isSelected = action.payload })
    },
    removeItem: (state, action) => {
      state.splice(state.findIndex((item) => item.id === action.payload), 1)
      window.localStorage.setItem(USER_CART_STORAGE_KEY, JSON.stringify(state))
    },
    removeSelectedItems: (state) => {
      state = state.filter((item) => !item.isSelected)
      window.localStorage.setItem(USER_CART_STORAGE_KEY, JSON.stringify(state))
      return state
    },
  },
})

export const {
  addItem, removeItem, increaseItemCount,
  decreaseItemCount, toggleSelect, setSelectAll, removeSelectedItems,
} = cartSlice.actions
export default cartSlice.reducer

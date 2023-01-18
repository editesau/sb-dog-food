/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { USER_CART_STORAGE_KEY } from '../../../tools/storageKeys'

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
    },
    increaseItemCount: (state, action) => {
      const index = state.findIndex((product) => product.id === action.payload)
      if (index !== -1) {
        state[index].count += 1
      }
    },
    decreaseItemCount: (state, action) => {
      const index = state.findIndex((product) => product.id === action.payload)
      if (index !== -1) {
        state[index].count -= 1
      }
    },
    toggleSelect: (state, action) => {
      const index = state.findIndex((product) => product.id === action.payload)
      if (index !== -1) {
        state[index].isSelected = !state[index].isSelected
      }
    },
    setSelectAll: (state, action) => {
      state.forEach((item) => { item.isSelected = action.payload })
    },
    removeItem: (state, action) => {
      state.splice(state.findIndex((item) => item.id === action.payload), 1)
    },
    removeSelectedItems: (state) => {
      state = state.filter((item) => !item.isSelected)
      return state
    },
    clearCart: (state) => {
      state = []
      return state
    },
  },
})

export const {
  addItem, removeItem, increaseItemCount,
  decreaseItemCount, toggleSelect, setSelectAll, removeSelectedItems,
  clearCart,
} = cartSlice.actions
export default cartSlice.reducer

/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: {},
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      if (action.payload.id in state.cart) {
        state.cart[action.payload.id] += action.payload.count
      } else {
        state.cart[action.payload.id] = action.payload.count
      }
    },
    removeItem: (state, action) => {
      state.cart.splice(state.indexOf(action.payload), 1)
    },
  },
})

export const { addItem, removeItem } = cartSlice.actions
export default cartSlice.reducer

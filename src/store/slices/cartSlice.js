import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload)
    },
    removeItem: (state, action) => {
      state.splice(state.indexOf(action.payload), 1)
    },
  },
})

export const { addItem, removeItem } = cartSlice.actions
export default cartSlice.reducer

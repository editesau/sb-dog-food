/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    allProducts: [],
    filteredProducts: [],
    isFiltered: false,
  },
  reducers: {
    setProducts: (state, action) => {
      state.allProducts = action.payload
    },
    clearProducts: (state) => {
      state.allProducts = []
    },
    filterProducts: (state, action) => {
      const query = RegExp(action.payload, 'i')
      state.isFiltered = true
      state.filteredProducts = state.allProducts.filter(
        (product) => query.test(product.name) || query.test(product.description),
      )
    },
    clearFilter: (state) => {
      state.isFiltered = false
      state.filteredProducts = []
    },
  },
})

export const {
  setProducts, filterProducts, clearFilter, clearProducts,
} = productsSlice.actions
export default productsSlice.reducer

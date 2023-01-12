/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

const filterProductsSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.value = action.payload
    },
    clearFilter: (state) => {
      state.value = ''
    },
  },
})

export const { setFilter, clearFilter } = filterProductsSlice.actions
export default filterProductsSlice.reducer

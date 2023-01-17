/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { sortValues } from './sortValues'

const initialState = {
  value: sortValues.POPULAR,
}

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSort: (state, action) => {
      state.value = action.payload
    },
    clearSort: (state) => {
      state.value = ''
      return state
    },
  },
})

export const { setSort, clearSort } = sortSlice.actions
export default sortSlice.reducer

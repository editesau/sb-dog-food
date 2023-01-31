/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
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

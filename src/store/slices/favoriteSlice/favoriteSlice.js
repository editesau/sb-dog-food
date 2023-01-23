import { createSlice } from '@reduxjs/toolkit'
import { USER_FAVORITE_STORAGE_KEY } from '../../../tools/storageKeys'

const initialState = JSON.parse(window.localStorage.getItem(USER_FAVORITE_STORAGE_KEY)) || []

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addProductToFavorite: (state, action) => {
      state.push(action.payload)
    },
    removeProductFromFavorite: (state, action) => {
      return state.filter((id) => id !== action.payload)
    },
    clearFavoriteList: () => {
      return []
    },
  },
})

export const {
  addProductToFavorite,
  removeProductFromFavorite, clearFavoriteList,
} = favoriteSlice.actions
export default favoriteSlice.reducer

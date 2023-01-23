import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice/userSlice'
import cartReducer from './slices/cartSlice/cartSlice'
import filterReducer from './slices/filterProductsSlice/filterProductsSlice'
import sortReducer from './slices/sortSlice/sortSlice'
import favoriteReducer from './slices/favoriteSlice/favoriteSlice'
import { USER_CART_STORAGE_KEY, USER_FAVORITE_STORAGE_KEY, USER_STORAGE_KEY } from '../tools/storageKeys'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    filter: filterReducer,
    sort: sortReducer,
    favorite: favoriteReducer,
  },
})

store.subscribe(() => {
  const storeState = store.getState()
  const { user, cart, favorite } = storeState
  window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
  window.localStorage.setItem(USER_CART_STORAGE_KEY, JSON.stringify(cart))
  window.localStorage.setItem(USER_FAVORITE_STORAGE_KEY, JSON.stringify(favorite))
})

export default store

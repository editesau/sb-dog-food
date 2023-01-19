import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice/userSlice'
import cartReducer from './slices/cartSlice/cartSlice'
import filterReducer from './slices/filterProductsSlice/filterProductsSlice'
import sortReducer from './slices/sortSlice/sortSlice'
import { USER_CART_STORAGE_KEY, USER_STORAGE_KEY } from '../tools/storageKeys'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    filter: filterReducer,
    sort: sortReducer,
  },
})

store.subscribe(() => {
  const storeState = store.getState()
  const { user, cart } = storeState
  window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
  window.localStorage.setItem(USER_CART_STORAGE_KEY, JSON.stringify(cart))
})

export default store

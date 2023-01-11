import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import cartReducer from './slices/cartSlice'
import filterReducer from './slices/filterProductsSlice'
import sortReducer from './slices/sortSlice'

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  filter: filterReducer,
  sort: sortReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store

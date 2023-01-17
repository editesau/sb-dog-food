import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice/userSlice'
import cartReducer from './slices/cartSlice/cartSlice'
import filterReducer from './slices/filterProductsSlice/filterProductsSlice'
import sortReducer from './slices/sortSlice/sortSlice'

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

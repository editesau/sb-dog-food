import { configureStore, combineReducers } from '@reduxjs/toolkit'
import tokenReducer from './slices/authSlice'
import cartReducer from './slices/cartSlice'
import filterReducer from './slices/filterProductsSlice'
import sortReducer from './slices/sortSlice'

const rootReducer = combineReducers({
  cart: cartReducer,
  token: tokenReducer,
  filter: filterReducer,
  sort: sortReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store

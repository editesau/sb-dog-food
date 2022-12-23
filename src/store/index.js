import { configureStore, combineReducers } from '@reduxjs/toolkit'
import tokenReducer from './slices/authSlice'
import cartReducer from './slices/cartSlice'

const rootReducer = combineReducers({
  cart: cartReducer,
  token: tokenReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store

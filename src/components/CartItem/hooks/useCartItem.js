import { useDispatch, useSelector } from 'react-redux'
import {
  decreaseItemCount, increaseItemCount, removeItem, toggleSelect,
} from '../../../store/slices/cartSlice/cartSlice'

const useCartItem = (product) => {
  const dispatch = useDispatch()

  const isDiscounted = product.discount !== 0
  const cart = useSelector((store) => store.cart)
  const cartItem = cart.find((item) => item.id === product._id)

  const increaseDisabled = cartItem.count >= product.stock
  const decreaseDisabled = cartItem.count <= 1

  const increaseHandler = () => {
    dispatch(increaseItemCount(product._id))
  }

  const decreaseHandler = () => {
    dispatch(decreaseItemCount(product._id))
  }

  const removeHandler = () => {
    dispatch(removeItem(product._id))
  }

  const selectHandler = () => {
    dispatch(toggleSelect(product._id))
  }

  return {
    isDiscounted,
    cart,
    cartItem,
    increaseDisabled,
    decreaseDisabled,
    increaseHandler,
    decreaseHandler,
    removeHandler,
    selectHandler,
  }
}

export default useCartItem

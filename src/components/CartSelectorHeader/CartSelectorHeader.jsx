import { useDispatch, useSelector } from 'react-redux'
import { removeSelectedItems, setSelectAll } from '../../store/slices/cartSlice/cartSlice'
import styles from './CartSelectorHeader.module.scss'

const CartSelectorHeader = () => {
  const dispatch = useDispatch()
  const cart = useSelector((store) => store.cart)
  const allOrdered = cart.every((item) => item.isSelected)

  const selectHandler = (event) => {
    dispatch(setSelectAll(event.target.checked))
  }
  const removeSelectedHandler = () => {
    dispatch(removeSelectedItems())
  }
  return (
    <div className={styles.cartSelectorWrapper}>
      <div>
        <input checked={allOrdered} onChange={selectHandler} type="checkbox" />
        <span>Select all</span>
      </div>
      <button onClick={removeSelectedHandler} type="button">Delete selected</button>
    </div>
  )
}

export default CartSelectorHeader

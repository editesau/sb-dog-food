import { useSelector, useDispatch } from 'react-redux'
import {
  increaseItemCount, decreaseItemCount, removeItem, toggleSelect,
} from '../../store/slices/cartSlice'
import { getDiscountedPrice } from '../../tools/utils'
import styles from './CartItem.module.scss'

const CartItem = ({ product }) => {
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

  return (
    <div className={styles.cartItemContainer}>
      <input checked={cartItem.isSelected} onChange={selectHandler} className={styles.cartItemSelector} type="checkbox" />
      <img src={product.pictures} alt={product.name} />
      <div className={styles.cartItemMain}>
        <div className={styles.cartItemInfo}>
          <p>{product.name}</p>
          <p>
            Stock:
            {' '}
            {product.stock}
          </p>
          <div className={styles.cartItemActions}>
            <i className="fa fa-solid fa-heart" />
            <i onClick={removeHandler} className="fa fa-solid fa-trash" role="presentation" />
          </div>
        </div>
        <div className={styles.cartItemRight}>
          <div className={styles.cartItemCounter}>
            <button disabled={decreaseDisabled} type="button" onClick={decreaseHandler}>-</button>
            <input readOnly type="number" value={cartItem.count} />
            <button disabled={increaseDisabled} type="button" onClick={increaseHandler}>+</button>
          </div>
          <div className={styles.cartItemPrice}>
            <p className={`${styles.fullPrice} ${isDiscounted && styles.discounted}`}>
              {product.price * cartItem.count}
              {' '}
              ₽
            </p>
            {isDiscounted && (
            <p className={styles.discountPrice}>
              {getDiscountedPrice(product.price, product.discount) * cartItem.count}
              {' '}
              ₽
            </p>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default CartItem

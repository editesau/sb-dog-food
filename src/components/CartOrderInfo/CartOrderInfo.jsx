import { useSelector } from 'react-redux'
import { getOrderInfo } from '../../tools/utils'
import styles from './CartOrderInfo.module.scss'

const CartOrderInfo = ({ productPrices }) => {
  const cart = useSelector((store) => store.cart)
  const isItemsSelected = cart.some((item) => item.isSelected)
  const { total, discount } = getOrderInfo(productPrices, cart)
  return (
    <div className={styles.cartOrderWrapper}>
      {!isItemsSelected
        ? <span>Select items to order</span>
        : (
          <>
            <span>
              Total:
              {' '}
              {total}
              {' '}
              ₽
            </span>
            <button className={styles.orderButton} type="button">Order now</button>
          </>
        )}
      {discount !== 0 ? (
        <span className={styles.discountValue}>
          Discount:
          {' '}
          {discount}
          {' '}
          ₽
        </span>
      ) : undefined}
    </div>

  )
}

export default CartOrderInfo

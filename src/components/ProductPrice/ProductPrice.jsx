import { getDiscountedPrice } from '../../tools/utils'
import styles from './ProductPrice.module.scss'

const ProductPrice = ({ price, discount, isDiscounted }) => {
  return (
    <div className={styles.priceWrapper}>
      <p className={`${styles.fullPrice} ${isDiscounted && styles.discounted}`}>
        {price}
        {' '}
        ₽
      </p>
      {isDiscounted && (
      <p className={styles.discountPrice}>
        {getDiscountedPrice(price, discount)}
        {' '}
        ₽
      </p>
      )}
    </div>
  )
}

export default ProductPrice

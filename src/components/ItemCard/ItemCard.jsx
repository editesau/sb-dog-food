import { getDiscountedPrice } from '../../tools/utils'
import ItemTagsHolder from '../ItemTagsHolder/ItemTagsHolder'
import styles from './ItemCard.module.scss'

const ItemCard = ({ product }) => {
  const isDiscounted = product.discount !== 0
  return (
    <div className={styles.cardWrapper}>
      <img src={product.pictures} alt={product.name} />
      <i className={`${styles.favoriteIcon} ${styles.isFavorite}`} />
      <ItemTagsHolder tags={product.tags} productDiscount={product.discount} />
      <div className={styles.priceWrapper}>
        <p className={`${styles.fullPrice} ${isDiscounted && styles.discounted}`}>
          {product.price}
          {' '}
          ₽
        </p>
        {isDiscounted && (
        <p className={styles.discountPrice}>
          {getDiscountedPrice(product.price, product.discount)}
          {' '}
          ₽
        </p>
        )}
      </div>
      <div className={styles.cardBottom}>
        <p className={styles.wight}>{product.wight}</p>
        <h3 className={styles.productName}>{product.name}</h3>
      </div>
      <button className={`${styles.btnToCart} ${styles.raise}`} type="button">To cart</button>
    </div>
  )
}

export default ItemCard

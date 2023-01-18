import { useDispatch, useSelector } from 'react-redux'
import { getDiscountedPrice, getProductRate } from '../../tools/utils'
import { addItem } from '../../store/slices/cartSlice/cartSlice'
import ItemTagsHolder from '../ItemTagsHolder/ItemTagsHolder'
import styles from './ItemCard.module.scss'
import { showSuccess } from '../../tools/toaster'

const ItemCard = ({ product }) => {
  const isDiscounted = product.discount !== 0
  const dispatch = useDispatch()
  const cart = useSelector((store) => store.cart)
  const cartItem = cart.find((item) => item.id === product._id)
  const isInCart = !!cartItem
  const isOutOfStock = isInCart && cartItem.count >= product.stock

  const toCartHandler = () => {
    showSuccess('Item was added to cart!')
    dispatch(addItem({ id: product._id, count: 1 }))
  }

  const renderButtonText = () => {
    if (isOutOfStock) return 'Out of stock'
    if (isInCart) return 'One more'
    return 'To cart'
  }
  return (
    <div className={styles.cardWrapper}>
      <img src={product.pictures} alt={product.name} />
      <i className={`${styles.favoriteIcon} ${styles.isFavorite}`} />
      <i className={styles.productRate}>{getProductRate(product)}</i>
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
      <button
        disabled={isOutOfStock}
        className={
          `${styles.btnToCart}
          ${styles.raise}
          ${isInCart ? styles.btnInCart : undefined} 
          ${isOutOfStock ? styles.btnOutOfStock : undefined}`
        }
        type="button"
        onClick={toCartHandler}
      >
        {}
        {renderButtonText()}
      </button>
    </div>
  )
}

export default ItemCard

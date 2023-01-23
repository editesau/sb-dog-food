import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProductRate } from '../../tools/utils'
import { addItem } from '../../store/slices/cartSlice/cartSlice'
import ProductTagsHolder from '../ProductTagsHolder/ProductTagsHolder'
import styles from './ProductCard.module.scss'
import { showSuccess } from '../../tools/toaster'
import ProductPrice from '../ProductPrice/ProductPrice'

const ProductCard = ({ product }) => {
  const isDiscounted = product.discount !== 0
  const dispatch = useDispatch()
  const cart = useSelector((store) => store.cart)
  const cartItem = cart.find((item) => item.id === product._id)
  const isInCart = !!cartItem
  const isOutOfStock = isInCart && cartItem.count >= product.stock

  const toCartHandler = (event) => {
    event.preventDefault()
    showSuccess('Item was added to cart!')
    dispatch(addItem({ id: product._id, count: 1 }))
  }

  const renderButtonText = () => {
    if (isOutOfStock) return 'Out of stock'
    if (isInCart) return 'One more'
    return 'To cart'
  }
  return (
    <Link to={`/products/${product._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
      <div className={styles.cardWrapper}>
        <img src={product.pictures} alt={product.name} />
        <i className={`${styles.favoriteIcon} ${styles.isFavorite}`} />
        <i className={styles.productRate}>{getProductRate(product)}</i>
        <ProductTagsHolder tags={product.tags} productDiscount={product.discount} />
        <ProductPrice
          price={product.price}
          discount={product.discount}
          isDiscounted={isDiscounted}
        />
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
    </Link>
  )
}

export default ProductCard

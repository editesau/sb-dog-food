/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Link } from 'react-router-dom'
import { getProductRate } from '../../tools/utils'
import ProductTagsHolder from '../ProductTagsHolder/ProductTagsHolder'
import styles from './ProductCard.module.scss'
import ProductPrice from '../ProductPrice/ProductPrice'
import useProductCard from './hooks/useProductCard'

const ProductCard = ({ product }) => {
  const {
    isDiscounted,
    isFavorite,
    isLiked,
    isOutOfStock,
    isInCart,
    renderButtonText,
    renderDefaultImage,
    likeHandler,
    toCartHandler,
  } = useProductCard(product)
  return (
    <Link to={`/products/${product._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
      <div className={styles.cardWrapper}>
        <img src={product.pictures} onError={renderDefaultImage} alt={product.name} />
        <i onClick={likeHandler} className={`${styles.likeIcon} ${isLiked && styles.isLiked}`} />
        <i className={`${styles.favoriteIcon} ${isFavorite && styles.isFavorite}`} />
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

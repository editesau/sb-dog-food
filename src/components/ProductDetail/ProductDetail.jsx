import styles from './ProductDetail.module.scss'
import Loader from '../Loader/Loader'
import ProductDetailReviews from '../ProductDetailReviews/ProductDetailReviews'
import { getProductRate } from '../../tools/utils'
import ProductPrice from '../ProductPrice/ProductPrice'
import ProductTagsHolder from '../ProductTagsHolder/ProductTagsHolder'
import useProductDetail from './hooks/useProductDetail'

const ProductDetail = () => {
  const {
    user,
    isLoading,
    product,
    isFavorite,
    isInCart,
    cartItem,
    renderFavoriteButtonText,
    toCartHandler,
    favoriteHandler,
    editHandler,
  } = useProductDetail()

  if (isLoading) return <Loader />

  const isOutOfStock = isInCart && cartItem.count >= product.data.stock

  const renderCartButtonText = () => {
    if (isOutOfStock) return 'Out of stock'
    if (isInCart) return 'Show cart'
    return 'To cart'
  }
  const rate = getProductRate(product.data)

  return (
    <div className={styles.ProductDetailContainer}>
      <div className={styles.ProductDetailCardContent}>
        <img src={product.data.pictures} alt={product.data.name} />
        <div className={styles.ProductDetailCardInfo}>
          <h3>{`${product.data.name}, ${product.data.wight}`}</h3>
          <div className={styles.productRate}>
            <i className={styles.productRateIcon} />
            <p>{rate}</p>
          </div>
          <p>
            Stock:
            {' '}
            {product.data.stock}
          </p>
          <p>
            Description:
            {' '}
            {product.data.description}
          </p>
          <ProductPrice
            price={product.data.price}
            discount={product.data.discount}
            isDiscounted={product.data.discount > 0}
          />
          <div className={styles.buttonsBlock}>
            <button
              disabled={isOutOfStock}
              className={`
                ${styles.btnToCart}
                ${isInCart ? styles.btnInCart : undefined}
                ${isOutOfStock ? styles.btnOutOfStock : undefined}`}
              type="button"
              onClick={toCartHandler}
            >
              { }
              {renderCartButtonText()}
            </button>
            <button
              onClick={favoriteHandler}
              className={`${styles.btnToFavorite} ${isFavorite && styles.btnIsFavorite}`}
              type="button"
            >
              {renderFavoriteButtonText()}
            </button>
            <button
              disabled={user !== product.data.author._id}
              onClick={editHandler}
              className={`${styles.btnEdit}`}
              type="button"
            >
              Edit
            </button>
          </div>
          <ProductTagsHolder tags={product.data.tags} productDiscount={product.data.discount} />
        </div>
      </div>
      <ProductDetailReviews />
    </div>
  )
}

export default ProductDetail

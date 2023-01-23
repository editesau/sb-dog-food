import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useSelector, useDispatch } from 'react-redux'
import styles from './ProductDetail.module.scss'
import { ITEM_DETAIL_QUERY_KEY } from '../../tools/queryKeys'
import api from '../../tools/Api'
import Loader from '../Loader/Loader'
import ProductDetailReviews from '../ProductDetailReviews/ProductDetailReviews'
import { getProductRate } from '../../tools/utils'
import ProductPrice from '../ProductPrice/ProductPrice'
import ProductTagsHolder from '../ProductTagsHolder/ProductTagsHolder'
import { showSuccess } from '../../tools/toaster'
import { addItem } from '../../store/slices/cartSlice/cartSlice'
import { addProductToFavorite, removeProductFromFavorite } from '../../store/slices/favoriteSlice/favoriteSlice'

const ProductDetail = () => {
  const { id } = useParams()
  const { isLoading, data: product } = useQuery({
    queryKey: [ITEM_DETAIL_QUERY_KEY].concat(id),
    queryFn: () => api.getProductById(id),
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((store) => store.cart)
  const favoriteList = useSelector((store) => store.favorite)

  if (isLoading) return <Loader />

  const isFavorite = favoriteList.includes(product._id)
  const cartItem = cart.find((item) => item.id === product.data._id)
  const isInCart = !!cartItem
  const isOutOfStock = isInCart && cartItem.count >= product.data.stock
  const renderCartButtonText = () => {
    if (isOutOfStock) return 'Out of stock'
    if (isInCart) return 'Show cart'
    return 'To cart'
  }
  const renderFavoriteButtonText = () => {
    return isFavorite ? 'Unfavorite' : 'To favorite'
  }
  const toCartHandler = (event) => {
    event.preventDefault()
    if (isInCart) {
      navigate('/cart')
    } else {
      showSuccess('Item was added to cart!')
      dispatch(addItem({ id: product.data._id, count: 1 }))
    }
  }
  const rate = getProductRate(product.data)
  const favoriteHandler = (event) => {
    event.preventDefault()
    if (isFavorite) {
      dispatch(removeProductFromFavorite(product._id))
      showSuccess('Product was removed from your favorite list')
    } else {
      dispatch(addProductToFavorite(product._id))
      showSuccess('Product was added to your favorite list')
    }
  }

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
            <button onClick={favoriteHandler} className={`${styles.btnToFavorite} ${isFavorite && styles.btnIsFavorite}`} type="button">
              {renderFavoriteButtonText()}
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

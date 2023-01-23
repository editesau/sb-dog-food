/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getProductRate } from '../../tools/utils'
import { addItem } from '../../store/slices/cartSlice/cartSlice'
import ProductTagsHolder from '../ProductTagsHolder/ProductTagsHolder'
import styles from './ProductCard.module.scss'
import { showError, showSuccess } from '../../tools/toaster'
import ProductPrice from '../ProductPrice/ProductPrice'
import api from '../../tools/Api'
import { ITEMS_QUERY_KEY } from '../../tools/queryKeys'

const ProductCard = ({ product }) => {
  const isDiscounted = product.discount !== 0
  const dispatch = useDispatch()
  const cart = useSelector((store) => store.cart)
  const userId = useSelector((store) => store.user.id)
  const cartItem = cart.find((item) => item.id === product._id)
  const isInCart = !!cartItem
  const isOutOfStock = isInCart && cartItem.count >= product.stock
  const isFavorite = product.likes.findIndex((like) => like === userId) !== -1
  const filter = useSelector((store) => store.filter.value)

  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { mutate } = useMutation({
    mutationFn: () => api.toggleProductLike(product._id, isFavorite),
    onSuccess: () => {
      const action = isFavorite ? 'removed from' : 'added to'
      queryClient.invalidateQueries([ITEMS_QUERY_KEY].concat(filter))
      showSuccess(`Item was ${action} favorite!`)
    },
    onError: showError,
  })

  const likeHandler = (event) => {
    event.preventDefault()
    mutate()
  }
  const toCartHandler = (event) => {
    event.preventDefault()
    if (isInCart) {
      navigate('/cart')
    } else {
      showSuccess('Item was added to cart!')
      dispatch(addItem({ id: product._id, count: 1 }))
    }
  }

  const renderButtonText = () => {
    if (isOutOfStock) return 'Out of stock'
    if (isInCart) return 'Show cart'
    return 'To cart'
  }

  const renderDefaultImage = ({ currentTarget }) => {
    currentTarget.onerror = null
    currentTarget.src = 'https://react-learning.ru/image-compressed/default-image.jpg'
  }

  return (
    <Link to={`/products/${product._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
      <div className={styles.cardWrapper}>
        <img src={product.pictures} onError={renderDefaultImage} alt={product.name} />
        <i onClick={likeHandler} className={`${styles.favoriteIcon} ${isFavorite && styles.isFavorite}`} />
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

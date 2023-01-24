/* eslint-disable no-param-reassign */
import { useDispatch, useSelector } from 'react-redux'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { ITEMS_QUERY_KEY } from '../../../tools/queryKeys'
import api from '../../../tools/Api'
import { showError, showSuccess } from '../../../tools/toaster'
import { addItem } from '../../../store/slices/cartSlice/cartSlice'
import { addProductToFavorite, removeProductFromFavorite } from '../../../store/slices/favoriteSlice/favoriteSlice'

const useProductCard = (product) => {
  const isDiscounted = product.discount !== 0
  const dispatch = useDispatch()
  const cart = useSelector((store) => store.cart)
  const userId = useSelector((store) => store.user.id)
  const favoriteList = useSelector((store) => store.favorite)
  const cartItem = cart.find((item) => item.id === product._id)
  const isInCart = !!cartItem
  const isOutOfStock = isInCart && cartItem.count >= product.stock
  const isLiked = product.likes.findIndex((like) => like === userId) !== -1
  const filter = useSelector((store) => store.filter.value)
  const isFavorite = favoriteList.includes(product._id)

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: () => api.toggleProductLike(product._id, isLiked),
    onSuccess: () => {
      const action = isLiked ? 'Like was removed' : 'Product was liked'
      queryClient.invalidateQueries([ITEMS_QUERY_KEY].concat(filter))
      showSuccess(`${action}`)
    },
    onError: showError,
  })

  const likeHandler = (event) => {
    event.preventDefault()
    mutate()
  }

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

  return {
    isDiscounted,
    isLiked,
    isFavorite,
    isOutOfStock,
    isInCart,
    likeHandler,
    favoriteHandler,
    toCartHandler,
    renderButtonText,
    renderDefaultImage,
  }
}

export default useProductCard

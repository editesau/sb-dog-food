import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { ITEM_DETAIL_QUERY_KEY } from '../../../tools/queryKeys'
import api from '../../../tools/Api'
import { showError, showSuccess } from '../../../tools/toaster'
import { addItem } from '../../../store/slices/cartSlice/cartSlice'
import { addProductToFavorite, removeProductFromFavorite } from '../../../store/slices/favoriteSlice/favoriteSlice'

const useProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isLoading, data: product } = useQuery({
    queryKey: [ITEM_DETAIL_QUERY_KEY].concat(id),
    queryFn: () => api.getProductById(id),
    onError: (response) => {
      showError(response.response.data.message)
      navigate('/products')
    },
  })

  const { mutate: deleteMutation, isLoading: isDeleting } = useMutation({
    mutationFn: () => api.deleteProduct(id),
    onSuccess: () => {
      showSuccess('Product was deleted')
      navigate('/products')
    },
    onError: (e) => {
      showError(e.data.message)
    },
  })
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user.id)
  const cart = useSelector((store) => store.cart)
  const favoriteList = useSelector((store) => store.favorite)
  const isFavorite = favoriteList.includes(id)
  const cartItem = cart.find((item) => item.id === id)
  const isInCart = !!cartItem

  const renderFavoriteButtonText = () => {
    return isFavorite ? 'Unfavorite' : 'To favorite'
  }

  const toCartHandler = () => {
    if (isInCart) {
      navigate('/cart')
    } else {
      showSuccess('Item was added to cart!')
      dispatch(addItem({ id, count: 1 }))
    }
  }

  const editHandler = () => {
    navigate('edit')
  }

  const removeHandler = () => {
    deleteMutation()
  }

  const favoriteHandler = () => {
    if (isFavorite) {
      dispatch(removeProductFromFavorite(id))
      showSuccess('Product was removed from your favorite list')
    } else {
      dispatch(addProductToFavorite(id))
      showSuccess('Product was added to your favorite list')
    }
  }

  return {
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
    removeHandler,
    isDeleting,
  }
}

export default useProductDetail

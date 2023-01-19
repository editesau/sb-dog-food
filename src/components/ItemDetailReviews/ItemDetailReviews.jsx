import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import styles from './ItemDetailReviews.module.scss'
import { ITEM_REVIEWS_QUERY_KEY } from '../../tools/queryKeys'
import api from '../../tools/Api'
import Loader from '../Loader/Loader'

const ItemDetailReviews = () => {
  const { id } = useParams()
  const { isLoading, data: reviews } = useQuery({
    queryKey: [ITEM_REVIEWS_QUERY_KEY].concat(id),
    queryFn: () => api.getProductReviews(id),
    onSuccess: console.log,
  })
  if (isLoading) return <Loader />
  if (!reviews.data.length) return 'No reviews for this product yet...'
  return (
    <div>
      review
    </div>
  )
}

export default ItemDetailReviews

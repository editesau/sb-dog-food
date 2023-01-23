import { useSelector } from 'react-redux'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import styles from './Review.module.scss'
import api from '../../tools/Api'
import { showError, showSuccess } from '../../tools/toaster'
import { ITEM_REVIEWS_QUERY_KEY } from '../../tools/queryKeys'

const Review = ({ review }) => {
  const userId = useSelector((store) => store.user.id)
  const isDeleteAvailable = userId === review.author._id
  const queryClient = useQueryClient()

  const onSuccessHandler = () => {
    queryClient.invalidateQueries([ITEM_REVIEWS_QUERY_KEY].concat(review.product))
    showSuccess('Review was deleted')
  }

  const { mutate } = useMutation({
    mutationFn: () => api.deleteProductReview(review.product, review._id),
    onSuccess: onSuccessHandler,
    onError: showError,
  })

  return (
    <div className={styles.reviewContent}>
      <div className={styles.reviewHeader}>
        <div className={styles.reviewAuthor}>
          <img src={review.author.avatar} alt={review.author.name} />
          <p>
            {review.author.name}
          </p>
        </div>
        <i className={styles.productRate}>{review.rating}</i>
        <div className={styles.reviewRight}>
          <p>{new Date(review.created_at).toLocaleDateString()}</p>
          {isDeleteAvailable && <i onClick={mutate} className="fa fa-solid fa-trash" role="presentation" />}
        </div>
      </div>
      <p>{review.text}</p>
      <hr />
    </div>
  )
}

export default Review

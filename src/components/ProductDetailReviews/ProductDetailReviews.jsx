import styles from './ProductDetailReviews.module.scss'
import Loader from '../Loader/Loader'
import Review from '../Review/Review'
import Pagination from './components/Pagination'
import useReviews from './hooks/useReviews'

const ProductDetailReviews = () => {
  const {
    isLoading,
    reviews,
    indexOfFirstReview,
    indexOfLastReview,
    reviewsPerPage,
    setCurrentPage,
    currentPage,
    reviewText,
    reviewRating,
    changeRatingHandler,
    inputChangeHandler,
    mutate,
  } = useReviews()

  let countPages
  let currentReviews

  if (isLoading) return <Loader />

  const renderReviewsList = () => {
    if (!reviews.data.length) return 'No reviews for this product yet...'
    const sortedReviews = [...reviews.data]
    sortedReviews.sort(
      (reviewOne, reviewTwo) => new Date(reviewTwo.created_at).valueOf()
      - new Date(reviewOne.created_at).valueOf(),
    )
    if (sortedReviews.length <= reviewsPerPage) {
      currentReviews = sortedReviews
      countPages = 1
    } else {
      currentReviews = sortedReviews.slice(indexOfFirstReview, indexOfLastReview)
      countPages = Math.ceil(sortedReviews.length / reviewsPerPage)
    }
    return currentReviews.map((review) => <Review key={`${review.author._id}_${review.created_at}`} review={review} />)
  }

  return (
    <>
      <div className={styles.productReviewsContent}>
        {renderReviewsList()}
      </div>
      <Pagination
        countPages={countPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className={styles.productNewReview}>
        <input
          className={styles.productNewReviewInput}
          value={reviewText}
          onChange={inputChangeHandler}
          placeholder="Enter your review"
        />
        <div className={styles.reviewRate}>
          <i className={styles.reviewRateIcon} />
          <select value={reviewRating} onChange={changeRatingHandler}>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
        </div>
        <button onClick={mutate} type="button">send</button>
      </div>
    </>
  )
}

export default ProductDetailReviews

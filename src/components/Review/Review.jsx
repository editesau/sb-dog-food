import styles from './Review.module.scss'

const Review = ({ review }) => {
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
        <p>{new Date(review.created_at).toLocaleDateString()}</p>
      </div>
      <p>{review.text}</p>
      <hr />
    </div>
  )
}

export default Review

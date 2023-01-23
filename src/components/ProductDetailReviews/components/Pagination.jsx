/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import styles from './Pagination.module.scss'

const Pagination = ({ countPages = 1, currentPage, setCurrentPage }) => {
  if (countPages <= 1) return undefined
  const pageNumbers = [...Array(countPages + 1).keys()].slice(1)
  return (
    <div className={styles.pagination}>
      {pageNumbers.map((number) => (
        <span
          className={`${number === currentPage && styles.active}`}
          key={number}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </span>
      ))}
    </div>
  )
}

export default Pagination

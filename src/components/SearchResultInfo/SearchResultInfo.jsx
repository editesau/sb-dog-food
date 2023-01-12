import { useSelector } from 'react-redux'
import styles from './SearchResultInfo.module.scss'

const SearchResultInfo = ({ productsCount }) => {
  const filter = useSelector((store) => store.filter.value)
  if (!filter) return undefined
  return (
    <div className={styles.searchResultWrapper}>
      <p className={styles.resultText}>
        Found
        {' '}
        <span>{productsCount}</span>
        {' '}
        result(s) for your request
        {' '}
        <span>{filter}</span>
      </p>
    </div>
  )
}

export default SearchResultInfo

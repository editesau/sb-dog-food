/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import styles from './OrderByMenu.module.scss'
import { setSort } from '../../store/slices/sortSlice/sortSlice'
import { sortValues } from '../../store/slices/sortSlice/sortValues'

const OrderByMenu = () => {
  const sortValue = useSelector((store) => store.sort.value)
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams({ sort: sortValue })

  useEffect(() => {
    if (searchParams.get('sort')) {
      dispatch(setSort(searchParams.get('sort')))
    }
  }, [])

  const changeSortHandler = (value) => {
    setSearchParams({ sort: value })
    dispatch(setSort(value))
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className={styles.container}>
      <div className={styles.orderWrapper}>
        <p
          onClick={() => changeSortHandler(sortValues.POPULAR)}
          className={sortValue === sortValues.POPULAR ? styles.selected : undefined}
        >
          Popular
        </p>
        <p
          onClick={() => changeSortHandler(sortValues.NEWEST)}
          className={sortValue === sortValues.NEWEST ? styles.selected : undefined}
        >
          Newest
        </p>
        <p
          onClick={() => changeSortHandler(sortValues.PRICE_LOW)}
          className={sortValue === sortValues.PRICE_LOW ? styles.selected : undefined}
        >
          Low price
        </p>
        <p
          onClick={() => changeSortHandler(sortValues.PRICE_HIGH)}
          className={sortValue === sortValues.PRICE_HIGH ? styles.selected : undefined}
        >
          High price
        </p>
        <p
          onClick={() => changeSortHandler(sortValues.RATE)}
          className={sortValue === sortValues.RATE ? styles.selected : undefined}
        >
          Rate
        </p>
        <p
          onClick={() => changeSortHandler(sortValues.DISCOUNT)}
          className={sortValue === sortValues.DISCOUNT ? styles.selected : undefined}
        >
          Discount
        </p>
      </div>
    </div>
  )
}

export default OrderByMenu

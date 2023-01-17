/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useSelector, useDispatch } from 'react-redux'
import styles from './OrderByMenu.module.scss'
import { setSort } from '../../store/slices/sortSlice/sortSlice'
import { sortValues } from '../../store/slices/sortSlice/sortValues'

const OrderByMenu = () => {
  const sortValue = useSelector((store) => store.sort.value)
  const dispatch = useDispatch()

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className={styles.container}>
      <div className={styles.orderWrapper}>
        <p
          onClick={() => dispatch(setSort(sortValues.POPULAR))}
          className={sortValue === sortValues.POPULAR ? styles.selected : undefined}
        >
          Popular
        </p>
        <p
          onClick={() => dispatch(setSort(sortValues.NEWEST))}
          className={sortValue === sortValues.NEWEST ? styles.selected : undefined}
        >
          Newest
        </p>
        <p
          onClick={() => dispatch(setSort(sortValues.PRICE_LOW))}
          className={sortValue === sortValues.PRICE_LOW ? styles.selected : undefined}
        >
          Low price
        </p>
        <p
          onClick={() => dispatch(setSort(sortValues.PRICE_HIGH))}
          className={sortValue === sortValues.PRICE_HIGH ? styles.selected : undefined}
        >
          High price
        </p>
        <p
          onClick={() => dispatch(setSort(sortValues.RATE))}
          className={sortValue === sortValues.RATE ? styles.selected : undefined}
        >
          Rate
        </p>
        <p
          onClick={() => dispatch(setSort(sortValues.DISCOUNT))}
          className={sortValue === sortValues.DISCOUNT ? styles.selected : undefined}
        >
          Discount
        </p>
      </div>
    </div>
  )
}

export default OrderByMenu

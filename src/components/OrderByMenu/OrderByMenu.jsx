/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useSelector, useDispatch } from 'react-redux'
import styles from './OrderByMenu.module.scss'
import { sortValues, setSort } from '../../store/slices/sortSlice'

const OrderByMenu = () => {
  const sortValue = useSelector((store) => store.sort.value)
  const dispatch = useDispatch()

  const changeSortHandler = (e) => {
    if (e.target.id in sortValues) dispatch(setSort(e.target.id))
    // switch (e.target.id) {
    //   case sortValues.POPULAR:
    //     dispatch(setSort(sortValues.POPULAR))
    //     break
    //   case sortValues.NEWEST:
    //     dispatch(setSort(sortValues.POPULAR))
    //     break
    //   case sortValues.PRICE_LOW:
    //     dispatch(setSort(sortValues.POPULAR))
    //     break
    //   case sortValues.PRICE_HIGH:
    //     dispatch(setSort(sortValues.POPULAR))
    //     break
    //   case sortValues.RATE:
    //     dispatch(setSort(sortValues.POPULAR))
    //     break
    //   case sortValues.DISCOUNT:
    //     dispatch(setSort(sortValues.POPULAR))
    //     break
    //   default:
    //     break
    // }
  }
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className={styles.container}>
      <div onClick={changeSortHandler} className={styles.orderWrapper}>
        <p
          id={sortValues.POPULAR}
          className={sortValue === sortValues.POPULAR ? styles.selected : undefined}
        >
          Popular
        </p>
        <p
          id={sortValues.NEWEST}
          className={sortValue === sortValues.NEWEST ? styles.selected : undefined}
        >
          Newest
        </p>
        <p
          id={sortValues.PRICE_LOW}
          className={sortValue === sortValues.PRICE_LOW ? styles.selected : undefined}
        >
          Low price
        </p>
        <p
          id={sortValues.PRICE_HIGH}
          className={sortValue === sortValues.PRICE_HIGH ? styles.selected : undefined}
        >
          High price
        </p>
        <p
          id={sortValues.RATE}
          className={sortValue === sortValues.RATE ? styles.selected : undefined}
        >
          Rate
        </p>
        <p
          id={sortValues.DISCOUNT}
          className={sortValue === sortValues.DISCOUNT ? styles.selected : undefined}
        >
          Discount
        </p>
      </div>
    </div>
  )
}

export default OrderByMenu

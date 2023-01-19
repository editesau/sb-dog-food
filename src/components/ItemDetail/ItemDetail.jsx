import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import styles from './ItemDetail.module.scss'
import { ITEM_DETAIL_QUERY_KEY } from '../../tools/queryKeys'
import api from '../../tools/Api'
import Loader from '../Loader/Loader'
import ItemDetailReviews from '../ItemDetailReviews/ItemDetailReviews'

const ItemDetail = () => {
  const { id } = useParams()
  const { isLoading, data: product } = useQuery({
    queryKey: [ITEM_DETAIL_QUERY_KEY].concat(id),
    queryFn: () => api.getProductById(id),
  })
  if (isLoading) return <Loader />
  return (
    <div className={styles.itemDetailContainer}>
      <div className={styles.itemDetailCardContent}>
        <img src={product.data.pictures} alt={product.data.name} />
        <div className={styles.itemDetailCardInfo}>
          <h3>{`${product.data.name}, ${product.data.wight}`}</h3>
          <p>{product.data.rate}</p>
          <p>{product.data.stock}</p>
          <p>{product.data.description}</p>
          <p>{product.data.price}</p>
          <p>{product.data.discount}</p>
        </div>
      </div>
      <div className={styles.itemReviews}>
        <ItemDetailReviews />
      </div>
    </div>
  )
}

export default ItemDetail

import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ITEMS_QUERY_KEY } from '../../tools/queryKeys'
import api from '../../tools/Api'
import Loader from '../Loader/Loader'
import ProductCard from '../ProductCard/ProductCard'
import styles from './FavoriteBlock.module.scss'
import emptyFavoriteImage from './emptyFavoriteImage.png'

const FavoriteBlock = () => {
  const productIDs = useSelector((store) => store.favorite)

  const { data, isLoading } = useQuery({
    queryKey: [ITEMS_QUERY_KEY].concat(productIDs),
    queryFn: () => api.getProductByIDs(productIDs),
  })

  if (isLoading) return <Loader />
  if (!data.length) {
    return (
      <div className={styles.favoriteEmptyWrapper}>
        <img src={emptyFavoriteImage} alt="empty favorite" />
        <p>Your Favorite list is empty</p>
        <div className={styles.favoriteEmptyButtons}>
          <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/"><button type="button">Catalog</button></Link>
          <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/cabinet"><button type="button">Cabinet</button></Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {data.map((product) => product.data.available
        // eslint-disable-next-line no-underscore-dangle
        && <ProductCard key={product.data._id} product={product.data} />)}
    </div>
  )
}

export default FavoriteBlock

import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import styles from './ProductDetail.module.scss'
import { ITEM_DETAIL_QUERY_KEY } from '../../tools/queryKeys'
import api from '../../tools/Api'
import Loader from '../Loader/Loader'
import ProductDetailReviews from '../ProductDetailReviews/ProductDetailReviews'
import { getProductRate } from '../../tools/utils'
import ProductPrice from '../ProductPrice/ProductPrice'
import ProductTagsHolder from '../ProductTagsHolder/ProductTagsHolder'

const ProductDetail = () => {
  const { id } = useParams()
  const { isLoading, data: product } = useQuery({
    queryKey: [ITEM_DETAIL_QUERY_KEY].concat(id),
    queryFn: () => api.getProductById(id),
  })
  if (isLoading) return <Loader />
  const rate = getProductRate(product.data)
  return (
    <div className={styles.ProductDetailContainer}>
      <div className={styles.ProductDetailCardContent}>
        <img src={product.data.pictures} alt={product.data.name} />
        <div className={styles.ProductDetailCardInfo}>
          <h3>{`${product.data.name}, ${product.data.wight}`}</h3>
          <div className={styles.productRate}>
            <i className={styles.productRateIcon} />
            <p>{rate}</p>
          </div>
          <p>
            Stock:
            {' '}
            {product.data.stock}
          </p>
          <p>
            Description:
            {' '}
            {product.data.description}
          </p>
          <ProductPrice
            price={product.data.price}
            discount={product.data.discount}
            isDiscounted={product.data.discount > 0}
          />
          <ProductTagsHolder tags={product.data.tags} productDiscount={product.data.discount} />
        </div>
      </div>
      <ProductDetailReviews />
    </div>
  )
}

export default ProductDetail

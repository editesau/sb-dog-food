import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../../tools/Api'
import { ITEMS_QUERY_KEY } from '../../tools/queryKeys'
import { showError } from '../../tools/toaster'
import { errorHandler, sortProducts } from '../../tools/utils'
import ItemCard from '../ItemCard/ItemCard'
import Loader from '../Loader/Loader'
import OrderByMenu from '../OrderByMenu/OrderByMenu'
import styles from './CatalogBlock.module.scss'
import SearchResultInfo from '../SearchResultInfo/SearchResultInfo'

const CatalogBlock = () => {
  const navigate = useNavigate()
  const filter = useSelector((store) => store.filter.value)
  const sortValue = useSelector((store) => store.sort.value)

  const {
    isLoading, isFetching, isError, error, refetch, data,
  } = useQuery({
    queryKey: filter === '' ? [ITEMS_QUERY_KEY] : [ITEMS_QUERY_KEY].concat(filter),
    queryFn: filter === '' ? api.getAllProducts : () => api.getFilteredProducts(filter),
    onError: (e) => {
      showError(e.response?.data.message || e.message)
      if (e.response?.status === 401) navigate('/signin')
    },
  })

  if (isLoading || isFetching) return <Loader />

  if (isError) {
    const { status, message } = errorHandler(error)
    showError(`${status} ${message}`)
    return (
      <div className="container d-flex justify-content-center">
        <button className="btn btn-success mt-5" type="button" onClick={refetch}>Reload</button>
      </div>
    )
  }
  const products = filter !== '' ? data.data : data.data.products
  sortProducts(products, sortValue)
  return (
    <>
      <SearchResultInfo productsCount={products.length} />
      {products.length ? <OrderByMenu /> : undefined}
      <div className={styles.container}>
        {products.map((product) => product.available
        // eslint-disable-next-line no-underscore-dangle
        && <ItemCard key={product._id} product={product} />)}
      </div>
    </>
  )
}

export default CatalogBlock

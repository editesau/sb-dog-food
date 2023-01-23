import { useQuery } from '@tanstack/react-query'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../../tools/Api'
import { ITEMS_QUERY_KEY } from '../../tools/queryKeys'
import { showError } from '../../tools/toaster'
import { errorHandler, sortProducts } from '../../tools/utils'
import ProductCard from '../ProductCard/ProductCard'
import Loader from '../Loader/Loader'
import OrderByMenu from '../OrderByMenu/OrderByMenu'
import styles from './CatalogBlock.module.scss'
import SearchResultInfo from '../SearchResultInfo/SearchResultInfo'

const CatalogBlock = () => {
  const filter = useSelector((store) => store.filter.value)
  const sortValue = useSelector((store) => store.sort.value)
  const token = useSelector((store) => store.user.token)

  if (!token) return <Navigate to="/needlogin" />

  const {
    isLoading, isFetching, isError, error, refetch, data,
  } = useQuery({
    queryKey: [ITEMS_QUERY_KEY].concat(filter),
    queryFn: () => api.getAllProducts(filter),
  })

  const renderOrderByMenu = (products) => {
    if (products.length) return <OrderByMenu />
    return undefined
  }

  if (isLoading || isFetching) return <Loader />

  if (isError) {
    const { status, message } = errorHandler(error)
    showError(`${status} ${message}`)
    return (
      <div className="container d-flex justify-content-center">
        {/* TODO style error page */}
        <button className="btn btn-success mt-5" type="button" onClick={refetch}>Reload</button>
      </div>
    )
  }

  let products = filter !== '' ? data.data : data.data.products
  products = sortProducts(products, sortValue)
  return (
    <>
      <SearchResultInfo productsCount={products.length} />
      {renderOrderByMenu(products)}
      <div className={styles.container}>
        {products.map((product) => product.available
        // eslint-disable-next-line no-underscore-dangle
        && <ProductCard key={product._id} product={product} />)}
      </div>
    </>
  )
}

export default CatalogBlock

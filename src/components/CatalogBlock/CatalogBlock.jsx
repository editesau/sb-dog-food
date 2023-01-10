import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import api from '../../tools/Api'
import { ITEMS_QUERY_KEY } from '../../tools/queryKeys'
import { showError } from '../../tools/toaster'
import { errorHandler } from '../../tools/utils'
import ItemCard from '../ItemCard/ItemCard'
import Loader from '../Loader/Loader'
import OrderByMenu from '../OrderByMenu/OrderByMenu'
import styles from './CatalogBlock.module.scss'

const CatalogBlock = () => {
  const navigate = useNavigate()

  const {
    isLoading, isError, error, refetch, data,
  } = useQuery({
    queryKey: [ITEMS_QUERY_KEY],
    queryFn: api.getAllProducts,
    onError: (e) => {
      showError(e.response?.data.message || e.message)
      if (e.response?.status === 401) navigate('/signin')
    },
  })

  if (isLoading) return <Loader />

  if (isError) {
    const { status, message } = errorHandler(error)
    showError(`${status} ${message}`)
    return (
      <div className="container d-flex justify-content-center">
        <button className="btn btn-success mt-5" type="button" onClick={refetch}>Reload</button>
      </div>
    )
  }

  return (
    <>
      <OrderByMenu />
      <div className={styles.container}>
        {data.data.products.map((product) => product.available
        // eslint-disable-next-line no-underscore-dangle
        && <ItemCard key={product._id} product={product} />)}
      </div>
    </>
  )
}

export default CatalogBlock

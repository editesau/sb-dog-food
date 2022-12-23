import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import api from '../../tools/Api'
import { ITEMS_QUERY_KEY } from '../../tools/queryKeys'
import { showError } from '../../tools/toaster'
import ItemCard from '../ItemCard/ItemCard'
import Loader from '../Loader/Loader'

const CatalogBlock = () => {
  const navigate = useNavigate()

  const errorHandler = (errorObj) => {
    switch (errorObj.response?.status) {
      case 401:
      case 400:
      case 404:
        return { status: errorObj.response.status, message: errorObj.response.data.message }
      case undefined:
        return { status: 'Unknown', message: errorObj.message }
      default:
        return { status: errorObj.response?.status || 'Unknown', message: errorObj.response?.data?.message || errorObj.message }
    }
  }

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
    <div className="catalog-block">
      <div className="container d-flex flex-wrap gap-3 my-3 justify-content-center">
        {data.data.products.map((product) => product.available
        // eslint-disable-next-line no-underscore-dangle
        && <ItemCard key={product._id} product={product} />)}
      </div>
    </div>
  )
}

export default CatalogBlock

import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setProducts } from '../../store/slices/productsSlice'
import api from '../../tools/Api'
import { ITEMS_QUERY_KEY } from '../../tools/queryKeys'
import { showError } from '../../tools/toaster'
import ItemCard from '../ItemCard/ItemCard'
import Loader from '../Loader/Loader'

const CatalogBlock = () => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.allProducts)

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
    isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: [ITEMS_QUERY_KEY],
    queryFn: api.getAllProducts,
    onSuccess: ({ data }) => {
      dispatch(setProducts(data.products))
    },
    onError: (e) => {
      showError(e.response?.data.message || e.message)
      if (e.response?.status === 401) navigate('/signin')
    },
  })

  if (isLoading) return <Loader />

  if (isError) {
    const { status, message } = errorHandler(error)
    return (
      <div className="container d-flex justify-content-center">
        <p>
          Status:
          {' '}
          {status}
          {' '}
          Message:
          {' '}
          {message}
          <button className="btn btn-success" type="button" onClick={refetch}>Reload</button>
        </p>
      </div>
    )
  }

  return (
    <div className="catalog-block">
      <div className="container d-flex flex-wrap gap-3 my-3 justify-content-center">
        {products.map((product) => product.available
        // eslint-disable-next-line no-underscore-dangle
        && <ItemCard key={product._id} product={product} />)}
      </div>
    </div>
  )
}

export default CatalogBlock

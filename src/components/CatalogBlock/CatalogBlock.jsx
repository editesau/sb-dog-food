import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { setProducts } from '../../store/slices/productsSlice'
import api from '../../tools/Api'
import { ITEMS_QUERY_KEY } from '../../tools/queryKeys'
import ItemCard from '../ItemCard/ItemCard'
import Loader from '../Loader/Loader'

const CatalogBlock = () => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.allProducts)
  const auth = useSelector((state) => state.auth.token)

  if (!auth) return <Navigate to="/signin" />

  const {
    isLoading, isError, error,
  } = useQuery({
    queryKey: [ITEMS_QUERY_KEY],
    queryFn: async () => {
      const responseData = await api.getAllProducts()
      return responseData
    },
    onSuccess: (responseData) => {
      dispatch(setProducts(responseData.products))
    },
  })

  if (isLoading) return <Loader />
  if (isError) {
    const { status, message } = JSON.parse(error.message)
    return (
      <p>
        Status:
        {' '}
        {status}
        Message:
        {' '}
        {message}
      </p>
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

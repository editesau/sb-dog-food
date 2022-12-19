import { useQuery } from '@tanstack/react-query'
import { Navigate } from 'react-router-dom'
// import { useEffect, useState } from 'react'
import api from '../../tools/Api'
import { ITEMS_QUERY_KEY } from '../../tools/queryKeys'
import ItemCard from '../ItemCard/ItemCard'

const CatalogBlock = () => {
  // const navigate = useNavigate()
  // const [products, setProducts] = useState([])

  // useEffect(() => {
  //   if (!window.localStorage.getItem('authToken')) navigate('/signin')

  //   const getProducts = async () => {
  //     const response = await api.getAllProducts()
  //     const responseData = await response.json()
  //     setProducts(responseData.products)
  //   }

  //   getProducts()
  // }, [])

  if (!window.localStorage.getItem('authToken')) return <Navigate to="/signin" />

  const { isLoading, data } = useQuery({
    queryKey: [ITEMS_QUERY_KEY],
    queryFn: async () => {
      const response = await api.getAllProducts()
      const productsData = await response.json()
      return productsData
    },
  })

  if (isLoading) return 'Loading products'

  return (
    <div className="catalog-block">
      <div className="container d-flex flex-wrap gap-3 my-3 justify-content-center">
        {data.products.map((product) => product.available
        // eslint-disable-next-line no-underscore-dangle
        && <ItemCard key={product._id} product={product} />)}
      </div>
    </div>
  )
}

export default CatalogBlock

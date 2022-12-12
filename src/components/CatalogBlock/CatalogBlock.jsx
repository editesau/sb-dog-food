import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../tools/Api'
import ItemCard from '../ItemCard/ItemCard'

const CatalogBlock = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (!window.localStorage.getItem('authToken')) navigate('/signin')

    const getProducts = async () => {
      const response = await api.getAllProducts()
      const responseData = await response.json()
      setProducts(responseData.products)
    }

    getProducts()
  }, [])

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

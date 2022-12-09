import { Navigate } from 'react-router-dom'
import ItemCard from '../ItemCard/ItemCard'

const CatalogBlock = () => {
  if (!window.localStorage.getItem('authToken')) return <Navigate to="/signin" replace />
  return (
    <div className="catalog-block">
      <div className="container d-flex flex-wrap gap-3 my-3 justify-content-center">
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </div>
    </div>
  )
}

export default CatalogBlock

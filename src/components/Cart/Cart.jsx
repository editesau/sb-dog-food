import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import CartItem from '../CartItem/CartItem'
import { ITEMS_QUERY_KEY } from '../../tools/queryKeys'
import api from '../../tools/Api'
import Loader from '../Loader/Loader'

const Cart = () => {
  const cart = useSelector((store) => store.cart)
  const productIDs = cart.map((product) => product.id)
  const { data, isLoading } = useQuery({
    queryKey: [ITEMS_QUERY_KEY].concat(productIDs),
    queryFn: () => api.getProductByIDs(productIDs),
  })
  if (isLoading) return <Loader />
  return (
    <div className="container d-flex flex-column">
      {data.map((product) => <CartItem key={product.data._id} product={product.data} />)}
    </div>
  )
}

export default Cart

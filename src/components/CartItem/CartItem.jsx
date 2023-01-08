import { useQuery } from '@tanstack/react-query'
import { ITEM_QUERY_KEY } from '../../tools/queryKeys'
import api from '../../tools/Api'

const CartItem = ({ cartItem }) => {
  const { data: product } = useQuery({
    queryKey: [ITEM_QUERY_KEY + cartItem.id],
    queryFn: () => api.getProductById(cartItem.id),
  })
  return (
    <div className="card mb-3 d-flex flex-row">
      <img src={product?.data.pictures} alt={product?.data.name} />
      <div className="d-flex flex-row">
        <div className="d-flex flex-column">
          <h2>{product?.data.name}</h2>
          <h4>{product?.data.weight}</h4>
        </div>
        <div className="d-flex">
          Counter
        </div>
        <div>
          Price
        </div>
      </div>
    </div>
  )
}

export default CartItem

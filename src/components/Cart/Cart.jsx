import { useSelector } from 'react-redux'
import CartItem from '../CartItem/CartItem'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

const Cart = () => {
  const { value: token } = useSelector((store) => store.token)
  if (!token) return <ErrorMessage code={401} />

  const cart = useSelector((store) => store.cart)
  return (
    <div className="container d-flex flex-column">
      {cart.map((cartItem) => <CartItem key={cartItem.id} cartItem={cartItem} />)}
    </div>
  )
}

export default Cart

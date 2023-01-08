import { useSelector } from 'react-redux'
import CartItem from '../CartItem/CartItem'

const Cart = () => {
  const cart = useSelector((store) => store.cart)
  return (
    <div className="container d-flex flex-column">
      {cart.map((cartItem) => <CartItem key={cartItem.id} cartItem={cartItem} />)}
    </div>
  )
}

export default Cart

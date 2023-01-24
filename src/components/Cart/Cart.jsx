import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import CartItem from '../CartItem/CartItem'
import { ITEMS_QUERY_KEY } from '../../tools/queryKeys'
import api from '../../tools/Api'
import Loader from '../Loader/Loader'
import CartOrderInfo from '../CartOrderInfo/CartOrderInfo'
import styles from './Cart.module.scss'
import CartSelectorHeader from '../CartSelectorHeader/CartSelectorHeader'
import emptyCartImage from './emptyCart.png'

const Cart = () => {
  const cart = useSelector((store) => store.cart)

  const productIDs = cart.map((product) => product.id)
  const { data, isLoading } = useQuery({
    queryKey: [ITEMS_QUERY_KEY].concat(productIDs),
    queryFn: () => api.getProductByIDs(productIDs),
  })

  if (isLoading) return <Loader />

  if (!data.length) {
    return (
      <div className={styles.cartEmptyWrapper}>
        <img src={emptyCartImage} alt="empty cart" />
        <p>Your cart is empty</p>
        <div className={styles.cartEmptyButtons}>
          <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/"><button type="button">Catalog</button></Link>
          <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/cabinet"><button type="button">Cabinet</button></Link>
        </div>
      </div>
    )
  }

  const productPrices = data.map((product) => {
    return { id: product.data._id, price: product.data.price, discount: product.data.discount }
  })

  return (
    <div className={styles.cartWrapper}>
      <div className={styles.cartProducts}>
        <CartSelectorHeader />
        {data.map((product) => <CartItem key={product.data._id} product={product.data} />)}
      </div>
      <CartOrderInfo productPrices={productPrices} />
    </div>
  )
}

export default Cart

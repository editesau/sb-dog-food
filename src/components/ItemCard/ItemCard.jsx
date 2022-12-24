import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../../store/slices/cartSlice'
import ItemTagsHolder from '../ItemTagsHolder/ItemTagsHolder'
import CounterControl from './CounterControl/CounterControl'
import itemCardStyles from './itemCard.module.css'

const ItemCard = ({ product }) => {
  const [count, setCount] = useState(1)
  const dispatch = useDispatch()
  const cart = useSelector((store) => store.cart.cart)
  // eslint-disable-next-line no-underscore-dangle
  const isInCart = product._id in cart
  const cartHandler = () => {
    // eslint-disable-next-line no-underscore-dangle
    dispatch(addItem({ id: product._id, count }))
  }
  return (
    <div className={`${itemCardStyles.itemCard} card`}>
      <ItemTagsHolder tags={product.tags} />
      <img src={product.pictures} className="card-img-top" alt="..." />
      <div className="card-body d-flex flex-column justify-content-between">
        <h6 className="card-title">{product.name}</h6>
        {product.wight && (
        <p className="card-subtitle">
          Capacity:
          {' '}
          {product.wight}
        </p>
        )}
        <div className="d-flex justify-content-between">
          <span
            className={`${
              product.discount && itemCardStyles.itemDiscount
            } card-text`}
          >
            {product.price}
            {' '}
            ₽
          </span>
          {product.discount !== 0 && (
          <span className={itemCardStyles.sale}>
            {Math.round(product.price * ((100 - product.discount) / 100))}
            {' '}
            ₽
          </span>
          )}
        </div>
      </div>
      <div className="card-footer d-flex justify-content-center align-items-center">
        <CounterControl count={count} setCount={setCount} />
        <button className={`btn ${isInCart ? 'btn-primary' : 'btn-success'} m-2`} type="button" onClick={cartHandler}>{isInCart ? 'More' : 'Cart'}</button>
      </div>
    </div>
  )
}

export default ItemCard

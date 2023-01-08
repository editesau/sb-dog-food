import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../../store/slices/cartSlice'
import ItemTagsHolder from '../ItemTagsHolder/ItemTagsHolder'
import itemCardStyles from './itemCard.module.css'

const ItemCard = ({ product }) => {
  const dispatch = useDispatch()

  const cart = useSelector((store) => store.cart)
  const isInCart = cart.findIndex((cartItem) => cartItem.id === product._id) !== -1

  const cartHandler = () => {
    dispatch(addItem({ id: product._id, count: 1 }))
  }

  return (
    <div className={`${itemCardStyles.itemCard} card`}>
      <ItemTagsHolder tags={product.tags} />
      <img src={product.pictures} className="card-img-top" alt={product.name} />
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
        <button
          disabled={product.stock <= cart.find((cartItem) => cartItem.id === product._id)?.count}
          className={`btn ${isInCart ? 'btn-primary' : 'btn-success'} m-2`}
          type="button"
          onClick={cartHandler}
        >
          {isInCart ? 'More' : 'Cart'}

        </button>
      </div>
    </div>
  )
}

export default ItemCard

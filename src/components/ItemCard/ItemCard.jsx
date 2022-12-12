import ItemTagsHolder from '../ItemTagsHolder/ItemTagsHolder'
import itemCardStyles from './itemCard.module.css'

const ItemCard = ({ product }) => (
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
        <span className={`${product.discount && itemCardStyles.itemDiscount} card-text`}>
          {product.price}
          {' '}
          ₽
        </span>
        { product.discount !== 0 && (
        <span className={itemCardStyles.sale}>
          {Math.round(product.price * ((100 - product.discount) / 100))}
          {' '}
          ₽
        </span>
        )}
      </div>
    </div>
    <div className="card-footer d-flex justify-content-center">
      <button type="button">Cart</button>
    </div>

  </div>
)

export default ItemCard

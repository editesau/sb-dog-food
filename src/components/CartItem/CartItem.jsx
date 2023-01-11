const CartItem = ({ product }) => {
  return (
    <div className="card mb-3 d-flex flex-row">
      <img src={product.pictures} alt={product.name} />
      <div className="d-flex flex-row">
        <div className="d-flex flex-column">
          <h2>{product.name}</h2>
          <h4>{product.weight}</h4>
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

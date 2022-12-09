import itemCardStyles from './itemCard.module.css'

const ItemCard = () => (
  <div className={`${itemCardStyles.itemCard} card`}>
    <img src="https://unsplash.com/photos/Sm7ebvMgi-E/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTJ8fGRvZyUyMGZvb2R8ZW58MHx8fHwxNjcwNTQyOTM3&force=true&w=1920" className="card-img-top" alt="..." />
    <div className="card-body">
      <h5 className="card-title">Card title</h5>
      <p className="card-text">Some item description</p>
      <button type="button">Cart</button>
    </div>
  </div>
)

export default ItemCard

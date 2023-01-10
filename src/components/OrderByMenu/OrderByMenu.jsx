import styles from './OrderByMenu.module.scss'

const OrderByMenu = () => {
  return (
    <div className={styles.orderWrapper}>
      <p className={styles.selected}>Popular</p>
      <p>Newest</p>
      <p>Cheap</p>
      <p>Costly</p>
      <p>Rate</p>
      <p>Discount</p>
    </div>
  )
}

export default OrderByMenu

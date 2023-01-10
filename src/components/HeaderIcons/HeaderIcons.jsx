import { Link } from 'react-router-dom'
import styles from './headerIcons.module.scss'

const HeaderIcons = () => (
  <div className={styles.headerIcons}>
    <Link
      style={{ color: 'inherit', textDecoration: 'none' }}
      to="/"
    >
      <i className="fa fa-solid fa-heart" />
    </Link>
    <Link
      style={{ color: 'inherit', textDecoration: 'none' }}
      to="/cart"
    >
      <i className="fa fa-solid fa-cart-shopping"><span className={styles.badge}>2</span></i>
    </Link>
    <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/cabinet"><i className="fa fa-solid fa-user" /></Link>
  </div>
)

export default HeaderIcons

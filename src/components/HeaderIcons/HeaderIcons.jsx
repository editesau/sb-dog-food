import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styles from './headerIcons.module.scss'

const HeaderIcons = ({ auth }) => {
  const cartCount = useSelector((store) => store.cart.length)
  const favoriteCount = useSelector((store) => store.favorite.length)
  const token = useSelector((store) => store.user.token)
  const location = useLocation()
  const page = location.pathname

  return (
    <div className={styles.headerIcons}>
      {auth && (
        <>
          <Link
            style={{ color: 'inherit', textDecoration: 'none' }}
            to="/products/create"
          >
            <i className={`fa fa-solid fa-file-circle-plus ${page === '/products/create' ? styles.active : {}}`} />
          </Link>
          <Link
            style={{ color: 'inherit', textDecoration: 'none' }}
            to="/favorites"
          >
            <i className={`fa fa-solid fa-heart ${page === '/favorites' ? styles.active : {}}`}>
              {favoriteCount !== 0 && <span className={styles.badge}>{favoriteCount}</span>}
            </i>
          </Link>
          <Link
            style={{ color: 'inherit', textDecoration: 'none' }}
            to="/cart"
          >
            <i className={`fa fa-solid fa-cart-shopping ${page === '/cart' ? styles.active : {}}`}>
              {cartCount !== 0 && <span className={styles.badge}>{cartCount}</span>}
            </i>
          </Link>
        </>
      )}

      <Link
        style={{ color: 'inherit', textDecoration: 'none' }}
        to={token ? '/cabinet' : '/signin'}
      >
        <i className={`fa fa-solid fa-user ${page === '/cabinet' ? styles.active : {}}`} />

      </Link>
    </div>
  )
}

export default HeaderIcons

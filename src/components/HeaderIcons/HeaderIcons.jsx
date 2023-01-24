import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styles from './headerIcons.module.scss'

const HeaderIcons = ({ auth }) => {
  const cartCount = useSelector((store) => store.cart.length)
  const favoriteCount = useSelector((store) => store.favorite.length)
  const token = useSelector((store) => store.user.token)

  return (
    <div className={styles.headerIcons}>
      {auth && (
        <>
          <Link
            style={{ color: 'inherit', textDecoration: 'none' }}
            to="/newproduct"
          >
            <i className="fa fa-solid fa-file-circle-plus" />
          </Link>
          <Link
            style={{ color: 'inherit', textDecoration: 'none' }}
            to="/favorites"
          >
            <i className="fa fa-solid fa-heart">
              {favoriteCount !== 0 && <span className={styles.badge}>{favoriteCount}</span>}
            </i>
          </Link>
          <Link
            style={{ color: 'inherit', textDecoration: 'none' }}
            to="/cart"
          >
            <i className="fa fa-solid fa-cart-shopping">
              {cartCount !== 0 && <span className={styles.badge}>{cartCount}</span>}
            </i>
          </Link>
        </>
      )}

      <Link style={{ color: 'inherit', textDecoration: 'none' }} to={token ? '/cabinet' : '/signin'}><i className="fa fa-solid fa-user" /></Link>
    </div>
  )
}

export default HeaderIcons

import { Link } from 'react-router-dom'
import logoImage from './Logo.svg'
import styles from './LogoStyles.module.scss'

const Logo = () => (
  <div className={styles.logo}>
    <img src={logoImage} alt="logo" />
    <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/">
      <h2>
        DogFood
      </h2>
    </Link>
  </div>
)

export default Logo

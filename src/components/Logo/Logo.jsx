import { Link } from 'react-router-dom'
import logoImage from './Logo.svg'
import styles from './LogoStyles.module.scss'

const Logo = () => (
  <Link className={styles.logo} to="/">
    <img src={logoImage} alt="logo" />
    <h2>
      DogFood
    </h2>
  </Link>
)

export default Logo

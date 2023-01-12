import { Link } from 'react-router-dom'
import logoImage from '../Logo/Logo.svg'
import styles from './NeedLoginMessage.module.scss'

const NeedLoginMessage = () => {
  return (
    <div className={styles.messageWrapper}>
      <img src={logoImage} alt="restricted" />
      <p>Only authorized users can view product list!</p>
      <div className={styles.messageButtons}>
        <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/signin"><button type="button">Login</button></Link>
        <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/signup"><button type="button">Sign up</button></Link>
      </div>
    </div>
  )
}

export default NeedLoginMessage

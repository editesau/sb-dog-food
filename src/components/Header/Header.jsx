import { useSelector } from 'react-redux'
import HeaderIcons from '../HeaderIcons/HeaderIcons'
import Logo from '../Logo/Logo'
import HeaderSearch from '../HeaderSearch/HeaderSearch'
import styles from './headerStyles.module.scss'

const Header = () => {
  const token = useSelector((store) => store.user.token)

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />
        <HeaderSearch auth={token} />
        <HeaderIcons auth={token} />
      </div>
    </header>
  )
}

export default Header

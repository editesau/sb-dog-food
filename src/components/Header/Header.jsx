import { useSelector } from 'react-redux'
import HeaderIcons from '../HeaderIcons/HeaderIcons'
import Logo from '../Logo/Logo'
import HeaderSearch from '../HeaderSearch/HeaderSearch'
import styles from './headerStyles.module.scss'

const Header = () => {
  const auth = useSelector((store) => store.token.value)
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />
        <HeaderSearch />
        <HeaderIcons auth={auth} />
      </div>
    </header>
  )
}

export default Header

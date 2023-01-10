import HeaderIcons from '../HeaderIcons/HeaderIcons'
import Logo from '../Logo/Logo'
import HeaderSearch from '../HeaderSearch/HeaderSearch'
import styles from './headerStyles.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />
        <HeaderSearch />
        <HeaderIcons />
      </div>
    </header>
  )
}

export default Header

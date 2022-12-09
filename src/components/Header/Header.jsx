import HeaderIcons from '../HeaderIcons/HeaderIcons'
import HeaderSearch from '../HeaderSearch/HeaderSearch'
import Logo from '../Logo/Logo'
import headerStyles from './header.module.css'

const Header = () => (
  <div className={`${headerStyles.navbar} navbar`}>
    <div className={`${headerStyles.container} container d-flex`}>
      <Logo />
      <HeaderSearch />
      <HeaderIcons />
    </div>
  </div>
)

export default Header

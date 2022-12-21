import { useSelector } from 'react-redux'
import HeaderIcons from '../HeaderIcons/HeaderIcons'
import HeaderSearch from '../HeaderSearch/HeaderSearch'
import Logo from '../Logo/Logo'
import headerStyles from './header.module.css'

const Header = () => {
  const auth = useSelector((state) => state.auth.token)
  return (
    <div className={`${headerStyles.navbar} navbar`}>
      <div className={`${headerStyles.container} container d-flex`}>
        <Logo />
        {
          auth ? (
            <>
              <HeaderSearch />
              <HeaderIcons />
            </>
          ) : (<button className="btn btn-primary" type="button">Login</button>)
        }

      </div>
    </div>
  )
}

export default Header

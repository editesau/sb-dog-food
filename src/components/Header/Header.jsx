import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import HeaderIcons from '../HeaderIcons/HeaderIcons'
import HeaderSearch from '../HeaderSearch/HeaderSearch'
import Logo from '../Logo/Logo'
import headerStyles from './header.module.css'

const Header = () => {
  const auth = !!useSelector((store) => store.token.value)
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
          ) : (<Link to="signin" className="btn btn-primary">Login</Link>)
        }

      </div>
    </div>
  )
}

export default Header

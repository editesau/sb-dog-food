import { Link } from 'react-router-dom'
import headerIconsStyles from './headerIcons.module.css'

const HeaderIcons = () => (
  <div className={headerIconsStyles.headerIcons}>
    <i className="fa fa-solid fa-heart" />
    <Link to="/cart" className="fa fa-shopping-cart" />
    <Link to="/cabinet" className="fa fa-solid fa-user" />
  </div>
)

export default HeaderIcons

import { Link } from 'react-router-dom'
import headerIconsStyles from './headerIcons.module.css'

const HeaderIcons = () => (
  <div className={headerIconsStyles.headerIcons}>
    <Link to="/"><i className="fa fa-solid fa-heart" /></Link>
    <Link to="/cart"><i className="fa fa-solid fa-shopping-cart" /></Link>
    <Link to="/cabinet"><i className="fa fa-solid fa-user" /></Link>
  </div>
)

export default HeaderIcons

import { Link } from 'react-router-dom'

const Logo = () => (
  <div className="navbar-brand">
    <Link to="/" style={{ textDecoration: 'none', color: 'black' }}><h2>Dog food</h2></Link>
  </div>
)

export default Logo

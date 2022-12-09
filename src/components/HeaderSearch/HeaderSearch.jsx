import headerSearchStyles from './headerSearch.module.css'

const HeaderSearch = () => (
  <form className={`${headerSearchStyles.headerSearch} d-flex`}>
    <input className="form-control me-2" placeholder="Search" />
    <button className="btn btn-outline-success" type="submit">Search</button>
  </form>
)

export default HeaderSearch

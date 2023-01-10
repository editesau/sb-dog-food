import styles from './HeaderSearch.module.scss'

const HeaderSearch = () => {
  return (
    <div className={styles.searchWrapper}>
      <input className={styles.headerSearchInput} placeholder="Search" />
      <span className="fa fa-solid fa-remove" />
    </div>
  )
}

export default HeaderSearch

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useDispatch } from 'react-redux'
import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { setFilter, clearFilter } from '../../store/slices/filterProductsSlice'
import styles from './HeaderSearch.module.scss'

const HeaderSearch = ({ auth }) => {
  const [inputValue, setInputValue] = useState('')

  const dispatch = useDispatch()
  const location = useLocation()

  const debounce = (func, timeout = 500) => {
    let timer
    return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, args)
      }, timeout)
    }
  }

  const setReduxState = (value) => dispatch(setFilter(value))

  const debounced = useMemo(() => debounce(setReduxState), [])

  const searchHandler = (event) => {
    setInputValue(event.target.value)
    debounced(event.target.value)
  }

  const clearHandler = () => {
    setInputValue('')
    dispatch(clearFilter())
  }
  if (!auth) return undefined
  if (location.pathname !== '/') return undefined
  return (
    <div className={styles.searchWrapper}>
      <input className={styles.headerSearchInput} placeholder="Search" value={inputValue} onChange={searchHandler} />
      <i className={`${styles.clearIcon} fa fa-solid fa-xmark`} onClick={clearHandler} />
    </div>
  )
}

export default HeaderSearch

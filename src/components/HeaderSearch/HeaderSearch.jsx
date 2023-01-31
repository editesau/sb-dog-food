/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useDispatch } from 'react-redux'
import { useMemo, useState, useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { setFilter, clearFilter } from '../../store/slices/filterProductsSlice/filterProductsSlice'
import styles from './HeaderSearch.module.scss'

const HeaderSearch = ({ auth }) => {
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  const debounce = (func, timeout = 500) => {
    let timer
    return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, args)
      }, timeout)
    }
  }

  const setReduxState = (itemValue) => dispatch(setFilter(itemValue))

  const debounced = useMemo(() => debounce(setReduxState), [])

  useEffect(() => {
    setInputValue('')
    setReduxState('')
  }, [location.pathname])

  useEffect(() => {
    if (searchParams.has('search')) {
      const searchValue = searchParams.get('search')
      setInputValue(searchValue)
      setReduxState(searchValue)
    }
  }, [])

  const searchHandler = (event) => {
    setInputValue(event.target.value)
    debounced(event.target.value)

    if (!event.target.value) {
      searchParams.delete('search')
      setSearchParams(searchParams)
    } else {
      setSearchParams(
        {
          ...Object.fromEntries(searchParams.entries()),
          search: event.target.value,
        },
      )
    }
  }

  const clearHandler = () => {
    setInputValue('')
    dispatch(clearFilter())
  }

  if (!auth) return undefined

  if (location.pathname !== '/products') return undefined
  return (
    <div className={styles.searchWrapper}>
      <input className={styles.headerSearchInput} placeholder="Search" value={inputValue} onChange={searchHandler} />
      <i className={`${styles.clearIcon} fa fa-solid fa-xmark`} onClick={clearHandler} />
    </div>
  )
}

export default HeaderSearch

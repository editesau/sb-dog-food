import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import api from '../../tools/Api'
import { USER_INFO_QUERY_KEY } from '../../tools/queryKeys'
import Loader from '../Loader/Loader'
import { clearToken } from '../../store/slices/authSlice'
import styles from './Cabinet.module.scss'

const Cabinet = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isLoading, data: user } = useQuery({
    queryKey: [USER_INFO_QUERY_KEY],
    queryFn: api.getUserInfo,
  })

  const logoutHandler = () => {
    window.localStorage.clear()
    dispatch(clearToken())
    navigate('/signin')
  }

  if (isLoading) return <Loader />

  return (
    <div className={styles.cabinetWrapper}>
      <h2>User info</h2>
      <hr />
      <div className={styles.cabinetContent}>
        <img src={user.data.avatar} alt={user.data.name} />
        <div>
          <h4>{user.data.name}</h4>
          <p>{user.data.about}</p>
          <p>{user.data.email}</p>
        </div>

      </div>
      <div className={styles.cabinetButtons}>
        <button type="button">Change password</button>
        <button type="button">Change info</button>
        <button type="button" onClick={logoutHandler}>Logout</button>
      </div>

    </div>

  )
}

export default Cabinet

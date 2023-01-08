import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import api from '../../tools/Api'
import { USER_INFO_QUERY_KEY } from '../../tools/queryKeys'
import Loader from '../Loader/Loader'
import { clearToken } from '../../store/slices/authSlice'

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
    <div className="container my-3 d-flex flex-column align-items-center">
      <h2>User info</h2>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={user.data.avatar} className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{user.data.name}</h5>
              <p className="card-text">{user.data.about}</p>
              <p className="card-text"><small className="text-muted">{user.data.email}</small></p>
            </div>
          </div>
        </div>
      </div>
      <div className="cabinet-buttons d-flex flex-column gap-2">
        <button type="button" className="btn btn-success">Change password</button>
        <button type="button" className="btn btn-success">Change info</button>
        <button type="button" onClick={logoutHandler} className="btn btn-danger">Logout</button>
      </div>

    </div>

  )
}

export default Cabinet

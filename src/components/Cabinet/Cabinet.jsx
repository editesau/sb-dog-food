import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import api from '../../tools/Api'
import { USER_INFO_QUERY_KEY } from '../../tools/queryKeys'
import Loader from '../Loader/Loader'

const Cabinet = () => {
  const navigate = useNavigate()

  const { isLoading, data: user } = useQuery({
    queryKey: [USER_INFO_QUERY_KEY],
    queryFn: async () => {
      const response = await api.getUserInfo()
      const userData = response.json()
      return userData
    },
  })

  const logout = () => {
    window.localStorage.clear()
    navigate('/signin')
  }

  if (isLoading) return <Loader />

  return (
    <div className="container my-3 d-flex flex-column align-items-center">
      <h2>User info</h2>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={user.avatar} className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text">{user.about}</p>
              <p className="card-text"><small className="text-muted">{user.email}</small></p>
            </div>
          </div>
        </div>
      </div>
      <div className="cabinet-buttons d-flex flex-column gap-2">
        <button type="button" className="btn btn-success">Change password</button>
        <button type="button" className="btn btn-success">Change info</button>
        <button type="button" onClick={logout} className="btn btn-danger">Logout</button>
      </div>

    </div>

  )
}

export default Cabinet

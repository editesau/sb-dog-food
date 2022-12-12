import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../tools/Api'

const Cabinet = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({})

  useEffect(() => {
    if (!window.localStorage.getItem('authToken')) navigate('/signin')

    const getInfo = async () => {
      const response = await api.getUserInfo()
      const responseData = await response.json()
      setUser(responseData)
      console.log(responseData)
    }

    getInfo()
  }, [])

  const logout = () => {
    window.localStorage.clear()
    navigate('/signin')
  }

  return (
    <div className="container my-3 d-flex flex-column align-items-center">
      <h2>User info</h2>
      <div className="card mb-3" style={{ 'max-width': '540px' }}>
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

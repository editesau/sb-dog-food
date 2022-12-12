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

  return (
    <div className="container d-flex justify-content-center mt-3">
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
    </div>
  )
}

export default Cabinet

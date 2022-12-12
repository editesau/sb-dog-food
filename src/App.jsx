import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from './components/Header/Header'

const App = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!window.localStorage.getItem('authToken')) navigate('signin')
  }, [])
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App

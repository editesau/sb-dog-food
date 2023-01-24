import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import Header from './components/Header/Header'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const location = useLocation()
  const token = useSelector((store) => store.user.token)
  if (location.pathname === '/' && token) return <Navigate to="/products" />
  if (location.pathname !== '/signin' && location.pathname !== '/signup' && location.pathname !== '/needlogin' && !token) return <Navigate to="/needlogin" />
  return (
    <>
      <Header />
      <Outlet />
      <ToastContainer />
    </>
  )
}

export default App

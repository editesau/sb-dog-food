import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Header from './components/Header/Header'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ToastContainer />
    </>
  )
}

export default App

import { createBrowserRouter } from 'react-router-dom'
import App from '../../App'
import Cabinet from '../Cabinet/Cabinet'
import Cart from '../Cart/Cart'
import CatalogBlock from '../CatalogBlock/CatalogBlock'
import SignForm from '../SignForm/SignForm'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <CatalogBlock />,
      },
      {
        path: 'signin',
        element: <SignForm />,
      },
      {
        path: 'signup',
        element: <SignForm signup />,
      },
      {
        path: 'cabinet',
        element: <Cabinet />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
    ],
  },
])

export default router

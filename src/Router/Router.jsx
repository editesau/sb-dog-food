import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Cabinet from '../components/Cabinet/Cabinet'
import Cart from '../components/Cart/Cart'
import CatalogBlock from '../components/CatalogBlock/CatalogBlock'
import SignForm from '../components/SignForm/SignForm'
import NeedLoginMessage from '../components/NeedLoginMessage/NeedLoginMessage'
import ProductDetail from '../components/ProductDetail/ProductDetail'

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
      {
        path: 'needlogin',
        element: <NeedLoginMessage />,
      },
      {
        path: 'products/:id',
        element: <ProductDetail />,
      },
      {
        path: 'favorites',
        element: <CatalogBlock favorite />,
      },
    ],
  },
])

export default router

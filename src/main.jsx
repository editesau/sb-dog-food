import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import App from './App'
import CatalogBlock from './components/CatalogBlock/CatalogBlock'
import SignForm from './components/SignForm/SignForm'
import Cabinet from './components/Cabinet/Cabinet'
import './index.css'

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
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

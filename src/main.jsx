import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import App from './App'
import CatalogBlock from './components/CatalogBlock/CatalogBlock'
import SignInForm from './components/SignInForm/SignInForm'
import SignUpForm from './components/SignUpForm/SignUpForm'
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
        element: <SignInForm />,
      },
      {
        path: 'signup',
        element: <SignUpForm />,
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

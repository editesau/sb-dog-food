import { Link } from 'react-router-dom'

const ErrorMessage = ({ code }) => {
  switch (code) {
    case 401:
      return (
        <div className="container d-flex justify-content-center align-items-center">
          <h2>
            To view content on this page you need to
            {' '}
            <Link to="/signin">login</Link>
          </h2>
        </div>
      )
    default:
      return (
        <h2>Unknown error</h2>
      )
  }
}

export default ErrorMessage

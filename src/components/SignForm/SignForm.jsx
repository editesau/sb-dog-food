/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link } from 'react-router-dom'
import useForm from './hooks/useForm'

const SignForm = ({ signup }) => {
  const {
    formData, error, isError, signAction, formChangeHandler,
  } = useForm(signup)

  return (
    <div className="container d-flex justify-content-center mt-3">
      <form>
        <h1>{signup ? 'Sign Up' : 'Login'}</h1>
        <label htmlFor="signEmail" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="signEmail"
          className={`form-control ${isError.email && 'is-invalid'}`}
          value={formData.email}
          onChange={formChangeHandler}
        />
        <label htmlFor="signPassword" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="signPassword"
          className={`form-control ${isError.password && 'is-invalid'}`}
          value={formData.password}
          onChange={formChangeHandler}
        />
        {signup && (
          <>
            <label htmlFor="signGroup" className="form-label">
              Group
            </label>
            <input
              type="text"
              id="signGroup"
              className="form-control"
              value={formData.group}
              onChange={formChangeHandler}
            />
          </>
        )}
        <div className="invalid-feedback">{error}</div>
        <button
          onClick={signAction}
          className="form-control btn btn-primary mt-2"
          type="submit"
        >
          {signup ? 'Sign Up' : 'Login'}
        </button>
        {!signup && (
          <>
            <hr />
            <span>Not registered yet?</span>
            {' '}
            <Link to="/signup">Sign up!</Link>
          </>
        )}
      </form>
    </div>
  )
}

export default SignForm

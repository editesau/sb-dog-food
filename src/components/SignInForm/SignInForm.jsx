/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../../tools/Api'

const SignInForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isError, setIsError] = useState({ email: false, password: false })
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const formChangeHandler = (event) => {
    setIsError({ email: false, password: false })
    switch (event.target.id) {
      case 'signInEmail':
        setFormData((prev) => ({ ...prev, email: event.target.value }))
        break
      case 'signInPassword':
        setFormData((prev) => ({ ...prev, password: event.target.value }))
        break
      default:
        break
    }
  }

  const signIn = async (event) => {
    event.preventDefault()
    const response = await api.signIn(formData)

    const data = await response.json()
    switch (response.status) {
      case 200:
        window.localStorage.setItem('authToken', data.token)
        navigate('/')
        break
      case 400:
      case 401:
      case 404:
        setError(data.message)
        setIsError({ email: true, password: true })
        break
      default:
        break
    }
  }
  return (
    <div className="container d-flex justify-content-center mt-3">
      <form>
        <h1>Login</h1>
        <label htmlFor="signInEmail" className="form-label">Email</label>
        <input type="email" id="signInEmail" className={`form-control ${isError.email && 'is-invalid'}`} value={formData.email} onChange={formChangeHandler} />
        <label htmlFor="signInPassword" className="form-label">Password</label>
        <input type="password" id="signInPassword" className={`form-control ${isError.password && 'is-invalid'}`} value={formData.password} onChange={formChangeHandler} />
        <div className="invalid-feedback">{error}</div>
        <button onClick={signIn} className="form-control btn btn-primary mt-2" type="submit">Login</button>
        <hr />
        <span>Not registered yet?</span>
        {' '}
        <Link to="/signup">Sign up!</Link>
      </form>
    </div>
  )
}

export default SignInForm

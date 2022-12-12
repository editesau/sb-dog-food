/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../tools/Api'

const SignForm = ({ signup }) => {
  const [formData, setFormData] = useState({ email: '', password: '', group: '' })
  const [isError, setIsError] = useState({ email: false, password: false })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const clearForm = () => {
    setFormData({ email: '', password: '', group: '' })
  }

  const formChangeHandler = (event) => {
    setIsError({ email: false, password: false })
    switch (event.target.id) {
      case 'signEmail':
        setFormData((prev) => ({ ...prev, email: event.target.value }))
        break
      case 'signPassword':
        setFormData((prev) => ({ ...prev, password: event.target.value }))
        break
      case 'signGroup':
        setFormData((prev) => ({ ...prev, group: event.target.value }))
        break
      default:
        break
    }
  }

  const signAction = async (event) => {
    event.preventDefault()
    let response = null
    let responseData = null
    if (signup) {
      response = await api.signUp(formData)
    } else {
      const { email, password } = formData
      response = await api.signIn({ email, password })
    }
    responseData = await response.json()
    switch (response.status) {
      case 200:
        clearForm()
        window.localStorage.setItem('authToken', responseData.token)
        window.localStorage.setItem('groupId', responseData.data.group)
        navigate('/')
        break
      case 201:
        clearForm()
        navigate('/signin')
        break
      case 400:
      case 401:
      case 404:
        setError(responseData.message)
        setIsError({ email: true, password: true })
        break
      case 409:
        setError(responseData.message)
        setIsError({ email: true, password: false })
        break
      default:
        break
    }
  }

  return (
    <div className="container d-flex justify-content-center mt-3">
      <form>
        <h1>{signup ? 'Sign Up' : 'Login'}</h1>
        <label htmlFor="signEmail" className="form-label">Email</label>
        <input type="email" id="signEmail" className={`form-control ${isError.email && 'is-invalid'}`} value={formData.email} onChange={formChangeHandler} />
        <label htmlFor="signPassword" className="form-label">Password</label>
        <input type="password" id="signPassword" className={`form-control ${isError.password && 'is-invalid'}`} value={formData.password} onChange={formChangeHandler} />
        {signup
          && (
          <>
            <label htmlFor="signGroup" className="form-label">Group</label>
            <input type="text" id="signGroup" className="form-control" value={formData.group} onChange={formChangeHandler} />
          </>
          )}
        <div className="invalid-feedback">{error}</div>
        <button onClick={signAction} className="form-control btn btn-primary mt-2" type="submit">{signup ? 'Sign Up' : 'Login'}</button>
        {!signup
        && (
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

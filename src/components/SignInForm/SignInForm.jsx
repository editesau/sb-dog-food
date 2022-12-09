/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../../tools/Api'

const SignInForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const formChangeHandler = (event) => {
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

  const navigate = useNavigate()
  const signIn = async (event) => {
    event.preventDefault()
    const response = await api.signIn(formData)

    const data = await response.json()
    switch (response.status) {
      case 200:
        window.localStorage.setItem('authToken', data.token)
        navigate('/catalog')
        break
      case 400:
        console.log(data.message)
        break
      case 401:
        console.log('Incorrect password')
        break
      case 404:
        console.log('User not found')
        break
      default:
        break
    }
  }
  return (
    <div className="container">
      <form className="form">
        <h1>Login</h1>
        <label htmlFor="signInEmail" className="form-label">Email</label>
        <input type="email" id="signInEmail" className="form-control" value={formData.email} onChange={formChangeHandler} />
        <label htmlFor="signInPassword" className="form-label">Password</label>
        <input type="password" id="signInPassword" className="form-control" value={formData.password} onChange={formChangeHandler} />
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

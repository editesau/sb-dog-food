/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react'
import api from '../../tools/Api'

const SignUpForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '', group: '' })

  const formChangeHandler = (event) => {
    switch (event.target.id) {
      case 'signUpEmail':
        setFormData((prev) => ({ ...prev, email: event.target.value }))
        break
      case 'signUpPassword':
        setFormData((prev) => ({ ...prev, password: event.target.value }))
        break
      case 'signUpGroup':
        setFormData((prev) => ({ ...prev, group: event.target.value }))
        break
      default:
        break
    }
  }

  const signUp = async (event) => {
    event.preventDefault()
    const response = await api.signUp(formData)
    const data = await response.json()
    console.log(data)
  }
  return (
    <div className="container d-flex justify-content-center mt-3">
      <form>
        <h1>Sign Up</h1>
        <label htmlFor="signUpEmail" className="form-label">Email</label>
        <input type="email" id="signUpEmail" className="form-control" value={formData.email} onChange={formChangeHandler} />
        <label htmlFor="signUpPassword" className="form-label">Password</label>
        <input type="password" id="signUpPassword" className="form-control" value={formData.password} onChange={formChangeHandler} />
        <label htmlFor="signUpGroup" className="form-label">Group</label>
        <input type="text" id="signUpGroup" className="form-control" value={formData.group} onChange={formChangeHandler} />
        <button onClick={signUp} className="form-control btn btn-primary mt-2" type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm

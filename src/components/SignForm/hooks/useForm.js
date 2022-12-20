import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../tools/Api'

const useForm = (signup) => {
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

  const { mutateAsync } = useMutation({ mutationFn: api.signUp })
  const signAction = async (event) => {
    event.preventDefault()
    let response = null
    let responseData = null
    if (signup) {
      response = await mutateAsync(formData)
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

  return {
    formData, error, isError, signAction, formChangeHandler,
  }
}

export default useForm

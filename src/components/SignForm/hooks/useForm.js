import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { setAuth } from '../../../store/slices/authSlice'
import api from '../../../tools/Api'

const useForm = (signup) => {
  const [formData, setFormData] = useState({ email: '', password: '', group: '' })
  const [isError, setIsError] = useState({ email: false, password: false })
  const [error, setError] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const errorHandler = (errorObj) => {
    switch (errorObj.response?.status) {
      case 400:
      case 401:
        setError(errorObj.response.data.message)
        setIsError({ email: true, password: true })
        break
      case 404:
      case 409:
        setError(errorObj.response.data.message)
        setIsError({ email: true, password: false })
        break
      case undefined:
        setError('Error when sending request, try again.')
        break
      default:
        setError(errorObj.response?.data?.message || errorObj.message)
        break
    }
  }

  const { mutate: signIn, isLoading: isSignInLoading } = useMutation({
    mutationFn: (credentials) => api.signIn(credentials),
    onSuccess: (response) => {
      setFormData({ email: '', password: '', group: '' })
      dispatch(setAuth({ token: response.data.token, group: response.data.data.group }))
      navigate('/')
    },
    onError: (e) => {
      errorHandler(e)
    },
  })

  const { mutate: signUp, isLoading: isSignUpLoading } = useMutation({
    mutationFn: (credentials) => api.signUp(credentials),
    onSuccess: () => {
      setFormData({ email: '', password: '', group: '' })
      navigate('/signin')
    },
    onError: (e) => {
      errorHandler(e)
    },
  })

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
    if (signup) {
      signUp(formData)
    } else {
      const { email, password } = formData
      signIn({ email, password })
    }
  }

  return {
    formData, error, isError, signAction, formChangeHandler, isSignInLoading, isSignUpLoading,
  }
}

export default useForm

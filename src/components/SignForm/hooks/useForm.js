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

  const { mutateAsync: signIn, isLoading: isSignInLoading } = useMutation({
    mutationFn: async (credentials) => {
      const responseData = await api.signIn(credentials)
      return responseData
    },
    onSuccess: (responseData) => {
      setFormData({ email: '', password: '', group: '' })
      dispatch(setAuth({ token: responseData.token, group: responseData.data.group }))
      navigate('/')
    },
    onError: (e) => {
      const { message } = JSON.parse(e.message.slice(e.message.indexOf('{')))
      setError(message)
      setIsError({ email: true, password: true })
    },
  })

  const { mutateAsync: signUp, isLoading: isSignUpLoading } = useMutation({
    mutationFn: async (credentials) => {
      const responseData = await api.signUp(credentials)
      return responseData
    },
    onSuccess: () => {
      setFormData({ email: '', password: '', group: '' })
      navigate('/signin')
    },
    onError: (e) => {
      const { status, message } = JSON.parse(e.message.slice(e.message.indexOf('{')))
      setError(message)
      setIsError({ email: true, password: status !== 409 })
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

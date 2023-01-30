import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import api from '../../../tools/Api'
import { showError, showSuccess } from '../../../tools/toaster'
import { setUser } from '../../../store/slices/userSlice/userSlice'
import useValidate from './useValidate'

const useForm = (signup) => {
  const [formData, setFormData] = useState({ email: '', password: '', group: '' })
  const [isError, setIsError] = useState({ email: false, password: false })
  const token = useSelector((store) => store.user.token)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const validate = useValidate(signup)

  useEffect(() => {
    if (token) {
      showError('You are already authorized, logout and try again!')
      navigate('/')
    }
  }, [navigate])

  const errorHandler = (errorObj) => {
    switch (errorObj.response?.status) {
      case 400:
      case 401:
        showError(errorObj.response.data.message)
        setIsError({ email: true, password: true })
        break
      case 404:
      case 409:
        showError(errorObj.response.data.message)
        setIsError({ email: true, password: false })
        break
      case undefined:
        showError('Error when sending request, try again.')
        break
      default:
        showError(errorObj.response?.data?.message || errorObj.message)
        break
    }
  }

  const { mutate: signIn, isLoading: isSignInLoading } = useMutation({
    mutationFn: (credentials) => api.signIn(credentials),
    onSuccess: (response) => {
      setFormData({ email: '', password: '', group: '' })
      dispatch(setUser(response.data.token, response.data.data._id, response.data.data.group))
      showSuccess(`Sign in successfull! Welcome, ${response.data.data.name}`)
      navigate('/products')
    },
    onError: (e) => {
      errorHandler(e)
    },
  })

  const { mutate: signUp, isLoading: isSignUpLoading } = useMutation({
    mutationFn: (credentials) => api.signUp(credentials),
    onSuccess: () => {
      showSuccess('User successfully registered')
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
    const { isInvalidData, errorStates } = validate(formData)
    if (isInvalidData) {
      setIsError(errorStates)
      return
    }

    if (signup) {
      signUp(formData)
    } else {
      const { email, password } = formData
      signIn({ email, password })
    }
  }

  return {
    formData, isError, signAction, formChangeHandler, isSignInLoading, isSignUpLoading,
  }
}

export default useForm

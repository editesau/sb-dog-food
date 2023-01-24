import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import * as Yup from 'yup'
import { showError, showSuccess } from '../../../tools/toaster'
import api from '../../../tools/Api'

const useNewProductForm = () => {
  const initialValues = {
    name: '',
    pictures: '',
    price: '',
    discount: '',
    stock: '',
    wight: '',
    description: '',
  }

  const validationSchema = Yup.object(
    {
      name: Yup.string()
        .min(2, 'More than 2 symbols')
        .max(20, 'Max 40 symbols')
        .required('Please set name'),
      pictures: Yup.string()
        .min(2, 'More than 2 symbols')
        .max(100, 'Max 100 symbols')
        .required('Please set image url'),
      price: Yup.number()
        .min(1, 'Cant be < 1')
        .required('empty'),
      discount: Yup.number()
        .min(0, 'Must be positive'),
      stock: Yup.number()
        .min(1, 'Min 1 item on stock'),
      wight: Yup.string()
        .min(2, 'More than 2 symbols')
        .max(20, 'Max 20 symbols'),
      description: Yup.string()
        .min(10, 'More than 10 symbols')
        .max(500, 'Max 500 symbols')
        .required('Please set description'),
    },
  )

  const navigate = useNavigate()

  const successHandler = (response) => {
    showSuccess(`Product was successfuly created with id: ${response.data._id}`)
    navigate(`/products/${response.data._id}`)
  }
  const errorHandler = (response) => {
    showError(response.response.data.message)
  }
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: (productData) => api.createProduct(productData),
    onSuccess: successHandler,
    onError: errorHandler,
  })

  return {
    initialValues,
    validationSchema,
    mutate,
    isCreating,
  }
}

export default useNewProductForm

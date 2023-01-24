import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import api from '../../../tools/Api'
import { ITEM_DETAIL_QUERY_KEY } from '../../../tools/queryKeys'
import { showError, showSuccess } from '../../../tools/toaster'

const useEditProductForm = () => {
  const { id } = useParams()

  const { isLoading, data: product } = useQuery({
    queryKey: [ITEM_DETAIL_QUERY_KEY].concat(id),
    queryFn: () => api.getProductById(id),
  })

  const navigate = useNavigate()

  const successHandler = (response) => {
    showSuccess('Product was successfuly edited')
    navigate(`/products/${response.data._id}`)
  }

  const errorHandler = (response) => {
    showError(response.response.data.message)
  }

  const { mutate, isLoading: isEditing } = useMutation({
    mutationFn: (productData) => api.editProduct(productData, id),
    onSuccess: successHandler,
    onError: errorHandler,
  })

  return {
    isLoading,
    product,
    mutate,
    isEditing,
  }
}

export default useEditProductForm

import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ITEM_REVIEWS_QUERY_KEY } from '../../../tools/queryKeys'
import api from '../../../tools/Api'
import { showError, showSuccess } from '../../../tools/toaster'

const useReviews = () => {
  const { id } = useParams()

  const [reviewText, setReviewText] = useState('')
  const [reviewRating, setReviewRating] = useState('5')
  const [currentPage, setCurrentPage] = useState(1)
  const [reviewsPerPage] = useState(5)
  const indexOfLastReview = currentPage * reviewsPerPage
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage

  const inputChangeHandler = (event) => {
    setReviewText(event.target.value)
  }

  const changeRatingHandler = (event) => {
    setReviewRating(event.target.value)
  }

  const queryClient = useQueryClient()

  const onSuccessHandler = () => {
    queryClient.invalidateQueries([ITEM_REVIEWS_QUERY_KEY].concat(id))
    setReviewText('')
    setReviewRating('5')
    showSuccess('Review was added!')
  }

  const { isLoading, data: reviews } = useQuery({
    queryKey: [ITEM_REVIEWS_QUERY_KEY].concat(id),
    queryFn: () => api.getProductReviews(id),
    onError: showError,
  })

  const { mutate } = useMutation({
    mutationFn: () => api.addProductReview(id, reviewText, reviewRating),
    onSuccess: onSuccessHandler,
    onError: showError,
  })

  return {
    isLoading,
    reviews,
    indexOfFirstReview,
    indexOfLastReview,
    reviewsPerPage,
    setCurrentPage,
    currentPage,
    reviewText,
    reviewRating,
    changeRatingHandler,
    inputChangeHandler,
    mutate,
  }
}

export default useReviews

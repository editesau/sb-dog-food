import axios from 'axios'
import { getUserGroupFromLS, getUserTokenFromLS } from './utils'

class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.headers = {
      'Content-Type': 'application/json',
    }
    this.token = getUserTokenFromLS()
    this.group = getUserGroupFromLS()
    this.authInstance = this.token ? axios.create({
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      baseURL: this.baseUrl,
    }) : null
  }

  setToken = (token) => {
    this.token = token
    this.authInstance = this.token ? axios.create({
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      baseURL: this.baseUrl,
    }) : null
  }

  setGroup = (group) => {
    this.group = group
  }

  signIn = (signInData) => {
    return axios.post(`${this.baseUrl}/signin`, signInData)
  }

  signUp = (signUpData) => {
    return axios.post(`${this.baseUrl}/signup`, signUpData)
  }

  getAllProducts = (filter) => {
    if (filter === '') {
      return this.authInstance.get('/products')
    }
    return this.authInstance.get(`/products/search?query=${filter}`)
  }

  getProductById = (id) => {
    return this.authInstance.get(`/products/${id}`)
  }

  getProductByIDs = (ids) => {
    if (!ids.length) return []
    return axios.all(ids.map((id) => this.authInstance.get(`/products/${id}`)))
  }

  getProductReviews = (id) => {
    return this.authInstance.get(`/products/review/${id}`)
  }

  getUserInfo = () => {
    return this.authInstance.get(`/v2/${this.group}/users/me`)
  }

  addProductReview = (id, text, rating) => {
    return this.authInstance.post(`/products/review/${id}`, JSON.stringify({ text, rating }))
  }

  deleteProductReview = (productId, reviewId) => {
    return this.authInstance.delete(`/products/review/${productId}/${reviewId}`)
  }

  toggleProductLike = (id, isLiked) => {
    if (isLiked) return this.authInstance.delete(`/products/likes/${id}`)
    return this.authInstance.put(`/products/likes/${id}`)
  }

  removeProductLike
}

const api = new Api('https://api.react-learning.ru')

export default api

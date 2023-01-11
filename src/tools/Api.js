import axios from 'axios'
import { getUserGroupFromLS, getUserTokenFromLS } from './utils'

class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.headers = {
      'Content-Type': 'application/json',
    }
  }

  signIn = (signInData) => {
    return axios.post(`${this.baseUrl}/signin`, signInData)
  }

  signUp = (signUpData) => {
    return axios.post(`${this.baseUrl}/signup`, signUpData)
  }

  getAllProducts = () => {
    const token = getUserTokenFromLS()
    return axios.get(`${this.baseUrl}/products`, { headers: { ...this.headers, authorization: `Bearer ${token}` } })
  }

  getFilteredProducts = (filter) => {
    const token = getUserTokenFromLS()
    return axios.get(`${this.baseUrl}/products/search?query=${filter}`, { headers: { ...this.headers, authorization: `Bearer ${token}` } })
  }

  getProductById = (id) => {
    const token = getUserTokenFromLS()
    return axios.get(`${this.baseUrl}/products/${id}`, { headers: { ...this.headers, authorization: `Bearer ${token}` } })
  }

  getProductByIDs = (ids) => {
    const token = getUserTokenFromLS()
    return axios.all(ids.map((id) => axios.get(`${this.baseUrl}/products/${id}`, { headers: { ...this.headers, authorization: `Bearer ${token}` } })))
  }

  getUserInfo = () => {
    const token = getUserTokenFromLS()
    const group = getUserGroupFromLS()
    return axios.get(`${this.baseUrl}/v2/${group}/users/me`, { headers: { ...this.headers, authorization: `Bearer ${token}` } })
  }
}

const api = new Api('https://api.react-learning.ru')

export default api

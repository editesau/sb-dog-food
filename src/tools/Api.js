import axios from 'axios'
import { USER_GROUP_STORAGE_KEY, USER_TOKEN_STORAGE_KEY } from './storageKeys'

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
    const token = window.localStorage.getItem(USER_TOKEN_STORAGE_KEY)
    return axios.get(`${this.baseUrl}/products`, { headers: { ...this.headers, authorization: `Bearer ${token}` } })
  }

  getProductById = (id) => {
    const token = window.localStorage.getItem(USER_TOKEN_STORAGE_KEY)
    return axios.get(`${this.baseUrl}/products/${id}`, { headers: { ...this.headers, authorization: `Bearer ${token}` } })
  }

  getUserInfo = () => {
    const group = window.localStorage.getItem(USER_GROUP_STORAGE_KEY)
    const token = window.localStorage.getItem(USER_TOKEN_STORAGE_KEY)
    return axios.get(`${this.baseUrl}/v2/${group}/users/me`, { headers: { ...this.headers, authorization: `Bearer ${token}` } })
  }
}

const api = new Api('https://api.react-learning.ru')

export default api

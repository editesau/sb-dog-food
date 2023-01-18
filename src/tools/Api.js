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
      },
    }) : null
  }

  setToken = (token) => {
    this.token = token
    this.authInstance = this.token ? axios.create({
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
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
      return this.authInstance.get(`${this.baseUrl}/products`)
    }
    return this.authInstance.get(`${this.baseUrl}/products/search?query=${filter}`)
  }

  getProductById = (id) => {
    return this.authInstance.get(`${this.baseUrl}/products/${id}`)
  }

  getProductByIDs = (ids) => {
    if (!ids.length) return []
    return axios.all(ids.map((id) => this.authInstance.get(`${this.baseUrl}/products/${id}`)))
  }

  getUserInfo = () => {
    return this.authInstance.get(`${this.baseUrl}/v2/${this.group}/users/me`)
  }
}

const api = new Api('https://api.react-learning.ru')

export default api

import { USER_GROUP_STORAGE_KEY, USER_TOKEN_STORAGE_KEY } from './storageKeys'

class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.headers = {
      'Content-Type': 'application/json',
    }
  }

  async signIn(signInData) {
    let response = null
    try {
      response = await fetch(`${this.baseUrl}/signin`, { method: 'POST', headers: this.headers, body: JSON.stringify(signInData) })
    } catch (e) {
      throw Error(JSON.stringify({ status: 0, message: 'Failed to fetch' }))
    }
    switch (response.status) {
      case 200:
        return await response.json()
      case 400:
        throw Error(JSON.stringify({ status: 400, message: 'Bad request' }))
      case 401:
        throw Error(JSON.stringify({ status: 401, message: 'Invalid credentials' }))
      case 404:
        throw Error(JSON.stringify({ status: 404, message: 'User not found' }))
      default:
        throw Error(JSON.stringify({ status: 1, message: 'Something went wrong' }))
    }
  }

  async signUp(signUpData) {
    let response = null
    try {
      response = await fetch(`${this.baseUrl}/signup`, { method: 'POST', headers: this.headers, body: JSON.stringify(signUpData) })
    } catch (e) {
      throw Error(JSON.stringify({ status: 0, message: 'Failed to fetch' }))
    }
    try {
      switch (response.status) {
        case 201:
          return await response.json()
        case 400:
          throw Error(JSON.stringify({ status: 400, message: 'Invalid params' }))
        case 409:
          throw Error(JSON.stringify({ status: 409, message: 'User already exists' }))
        default:
          throw Error(JSON.stringify({ status: 1, message: 'Something went wrong' }))
      }
    } catch (e) {
      throw Error(e)
    }
  }

  async getUserInfo() {
    const group = window.localStorage.getItem(USER_GROUP_STORAGE_KEY)
    const token = window.localStorage.getItem(USER_TOKEN_STORAGE_KEY)
    let response = null
    try {
      response = await fetch(`${this.baseUrl}/v2/${group}/users/me`, { method: 'GET', headers: { ...this.headers, authorization: `Bearer ${token}` } })
    } catch (e) {
      throw Error(JSON.stringify({ status: 0, message: 'Failed to fetch' }))
    }
    switch (response.status) {
      case 200:
        return await response.json()
      case 401:
        throw Error(JSON.stringify({ status: 401, message: 'Authorization required!' }))
      default:
        throw Error(JSON.stringify({ status: 1, message: 'Something went wrong' }))
    }
  }

  async getAllProducts() {
    const token = window.localStorage.getItem(USER_TOKEN_STORAGE_KEY)
    let response = null
    try {
      response = await fetch(`${this.baseUrl}/products`, { method: 'GET', headers: { ...this.headers, authorization: `Bearer ${token}` } })
    } catch (e) {
      throw Error(JSON.stringify({ status: 0, message: 'Failed to fetch' }))
    }
    switch (response.status) {
      case 200:
        return await response.json()
      case 401:
        throw Error(JSON.stringify({ status: 401, message: 'Authorization required!' }))
      default:
        throw Error(JSON.stringify({ status: 1, message: 'Something went wrong' }))
    }
  }
}

const api = new Api('https://api.react-learning.ru')

export default api

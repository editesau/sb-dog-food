class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.headers = {
      'Content-Type': 'application/json',
    }
  }

  async signIn(signInData) {
    try {
      return await fetch(`${this.baseUrl}/signin`, { method: 'POST', headers: this.headers, body: JSON.stringify(signInData) })
    } catch (e) {
      return e.message
    }
  }

  async signUp(signUpData) {
    console.log(signUpData)
    try {
      return await fetch(`${this.baseUrl}/signup`, { method: 'POST', headers: this.headers, body: JSON.stringify(signUpData) })
    } catch (e) {
      return e.message
    }
  }

  async getUserInfo() {
    const group = window.localStorage.getItem('groupId')
    const token = window.localStorage.getItem('authToken')
    try {
      const response = await fetch(`${this.baseUrl}/v2/${group}/users/me`, { method: 'GET', headers: { ...this.headers, authorization: `Bearer ${token}` } })
      switch (response.status) {
        case 200:
          return await response.json()
        case 401:
          throw new Error({ status: 401, message: 'Authorization required!' })
        default:
          throw new Error({ status: 0, message: 'Something went wrong' })
      }
    } catch (e) {
      console.log(e)
      throw new Error({ status: e.status, message: e.message })
    }
  }

  async getAllProducts() {
    const token = window.localStorage.getItem('authToken')
    try {
      const response = await fetch(`${this.baseUrl}/products`, { method: 'GET', headers: { ...this.headers, authorization: `Bearer ${token}` } })
      switch (response.status) {
        case 200:
          return await response.json()
        case 401:
          throw Error('Authorization required!', { cause: 'Fetch return 401 status' })
        default:
          throw Error('Something went wrong', { cause: 'Unknown error' })
      }
    } catch (e) {
      throw Error(e.message, { cause: 'Failed to fetch' })
    }
  }
}

const api = new Api('https://api.react-learning.ru')

export default api

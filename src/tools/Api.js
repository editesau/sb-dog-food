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
      return await fetch(`${this.baseUrl}/v2/${group}/users/me`, { method: 'GET', headers: { ...this.headers, authorization: `Bearer ${token}` } })
    } catch (e) {
      return e.message
    }
  }

  async getAllProducts() {
    const token = window.localStorage.getItem('authToken')
    try {
      return await fetch(`${this.baseUrl}/products`, { method: 'GET', headers: { ...this.headers, authorization: `Bearer ${token}` } })
    } catch (e) {
      return e.message
    }
  }

  // async getUserInfo(token) {
  //   try {
  //     return await fetch (`${this.baseUrl}/`)
  //   }
  // }
}

const api = new Api('https://api.react-learning.ru')

export default api

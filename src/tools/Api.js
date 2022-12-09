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
    try {
      return await fetch(`${this.baseUrl}/signup`, { method: 'POST', headers: this.headers, body: JSON.stringify(signUpData) })
    } catch (e) {
      return e.message
    }
  }
}

const api = new Api('https://api.react-learning.ru')

export default api

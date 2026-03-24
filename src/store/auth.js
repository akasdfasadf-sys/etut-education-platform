import { reactive } from 'vue'

// Fake accountlar
const USERS = [
  { username: 'admin', password: '1234', name: 'Admin Agza' },
  { username: 'talip1', password: 'talip123', name: 'Aýnur Durdyýewa' },
  { username: 'talip2', password: 'talip456', name: 'Merdan Annaorazow' },
]

export const auth = reactive({
  user: JSON.parse(localStorage.getItem('auth_user') || 'null'),

  login(username, password) {
    const found = USERS.find(
      u => u.username === username && u.password === password
    )
    if (!found) {
      return { success: false, error: 'Ulanyjy ady ýa-da açar söz ýalňyş!' }
    }
    this.user = { username: found.username, name: found.name }
    localStorage.setItem('auth_user', JSON.stringify(this.user))
    return { success: true }
  },

  logout() {
    this.user = null
    localStorage.removeItem('auth_user')
  },

  get isLoggedIn() {
    return !!this.user
  }
})

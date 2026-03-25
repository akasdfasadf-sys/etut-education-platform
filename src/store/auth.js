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
    const userExists = USERS.find(u => u.username === username)
    if (!userExists) {
      return { success: false, error: 'Bu ulanyjy ady ulgamda ýok!' }
    }
    if (userExists.password !== password) {
      return { success: false, error: 'Açar söz ýalňyş!' }
    }
    this.user = { username: userExists.username, name: userExists.name }
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

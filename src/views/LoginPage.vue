<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-logo">
        <img src="/vite.svg" alt="logo" />
        <h2>ETUT.EDU.TM</h2>
      </div>
      <h3>Ulgama giriş</h3>
      <p class="login-sub">Hasabyňyza giriş üçin maglumatlaryňyzy giriziň</p>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Ulanyjy ady</label>
          <input
            v-model="username"
            type="text"
            placeholder="Ulanyjy adyňyz"
            :class="{ error: errorMsg }"
            autocomplete="username"
          />
        </div>
        <div class="form-group">
          <label>Açar söz</label>
          <div class="password-wrap">
            <input
              v-model="password"
              :type="showPass ? 'text' : 'password'"
              placeholder="Açar söziňiz"
              :class="{ error: errorMsg }"
              autocomplete="current-password"
            />
            <button type="button" class="toggle-pass" @click="showPass = !showPass">
              {{ showPass ? '🙈' : '👁️' }}
            </button>
          </div>
        </div>

        <div v-if="errorMsg" class="error-msg">
          ⚠️ {{ errorMsg }}
        </div>

        <button type="submit" class="login-btn" :disabled="loading">
          <span v-if="loading">Girýär...</span>
          <span v-else>Giriş</span>
        </button>
      </form>


    </div>
  </div>
</template>

<script>
import { auth } from '../store/auth.js'

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      errorMsg: '',
      showPass: false,
      loading: false
    }
  },
  methods: {
    handleLogin() {
      this.errorMsg = ''
      if (!this.username || !this.password) {
        this.errorMsg = 'Ähli meýdanlary dolduryň!'
        return
      }
      this.loading = true
      setTimeout(() => {
        const result = auth.login(this.username, this.password)
        if (result.success) {
          this.$router.push('/')
        } else {
          this.errorMsg = result.error
        }
        this.loading = false
      }, 600)
    }
  }
}

</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: #f0f4ff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login-card {
  background: white;
  border-radius: 8px;
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.1);
}

.login-logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
}

.login-logo img { width: 32px; height: 32px; }

.login-logo h2 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1a56db;
}

.login-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.4rem;
}

.login-sub {
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 1.8rem;
}

.form-group {
  margin-bottom: 1.2rem;
}

.form-group label {
  display: block;
  font-size: 0.88rem;
  font-weight: 600;
  color: #444;
  margin-bottom: 0.4rem;
}

.form-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1.5px solid #ddd;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: border-color 0.2s;
  font-family: inherit;
}

.form-group input:focus {
  outline: none;
  border-color: #1a56db;
}

.form-group input.error {
  border-color: #e53e3e;
}

.password-wrap {
  position: relative;
}

.password-wrap input { padding-right: 3rem; }

.toggle-pass {
  position: absolute;
  right: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
}

.error-msg {
  background: #fff5f5;
  border: 1px solid #fed7d7;
  color: #c53030;
  padding: 0.7rem 1rem;
  border-radius: 6px;
  font-size: 0.88rem;
  margin-bottom: 1rem;
}

.login-btn {
  width: 100%;
  padding: 0.85rem;
  background: #1a56db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 0.5rem;
}

.login-btn:hover:not(:disabled) { background: #1447b8; }
.login-btn:disabled { opacity: 0.7; cursor: not-allowed; }
</style>

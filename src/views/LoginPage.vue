<template>
  <div class="login-page">
    <div class="login-left">
      <div class="login-left-content">
        <h1>ETUT.EDU.TM</h1>
        <p>Oguz han Engineering and Technology University of Turkmenistan</p>
        <div class="login-left-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>

    <div class="login-right">
      <div class="login-card">
        <div class="login-logo">
          <img src="/vite.svg" alt="logo" />
          <span>ETUT.EDU.TM</span>
        </div>

        <h2>Ulgama giriş</h2>
        <p class="login-sub">Hasabyňyza giriş üçin maglumatlaryňyzy giriziň</p>

        <form @submit.prevent="handleLogin">
          <div class="form-group" :class="{ 'has-error': errors.username }">
            <label>Ulanyjy ady</label>
            <div class="input-wrap">
              <span class="input-icon">👤</span>
              <input
                v-model="username"
                type="text"
                placeholder="Ulanyjy adyňyz"
                autocomplete="username"
                @input="errors.username = ''"
              />
            </div>
            <span class="field-error" v-if="errors.username">{{ errors.username }}</span>
          </div>

          <div class="form-group" :class="{ 'has-error': errors.password }">
            <label>Açar söz</label>
            <div class="input-wrap">
              <span class="input-icon">🔒</span>
              <input
                v-model="password"
                :type="showPass ? 'text' : 'password'"
                placeholder="Açar söziňiz"
                autocomplete="current-password"
                @input="errors.password = ''"
              />
              <button type="button" class="toggle-pass" @click="showPass = !showPass">
                {{ showPass ? '🙈' : '👁️' }}
              </button>
            </div>
            <span class="field-error" v-if="errors.password">{{ errors.password }}</span>
          </div>

          <div v-if="generalError" class="error-banner">
            <span>⚠️</span> {{ generalError }}
          </div>

          <button type="submit" class="login-btn" :disabled="loading">
            <span v-if="loading" class="spinner"></span>
            <span v-else>Giriş</span>
          </button>
        </form>

        <div class="login-hint">
          <p>Synag hasaplary:</p>
          <code>admin / 1234</code>
          <code>talip1 / talip123</code>
        </div>
      </div>
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
      errors: { username: '', password: '' },
      generalError: '',
      showPass: false,
      loading: false
    }
  },
  methods: {
    handleLogin() {
      this.errors = { username: '', password: '' }
      this.generalError = ''
      if (!this.username) { this.errors.username = 'Ulanyjy adyny giriziň!'; return }
      if (!this.password) { this.errors.password = 'Açar sözi giriziň!'; return }
      this.loading = true
      setTimeout(() => {
        const result = auth.login(this.username, this.password)
        if (result.success) {
          this.$router.push('/')
        } else {
          if (result.error.includes('ulanyjy ady')) {
            this.errors.username = result.error
          } else {
            this.errors.password = result.error
          }
          this.generalError = result.error
        }
        this.loading = false
      }, 600)
    }
  }
}
</script>

<style scoped>
.login-page { min-height: 100vh; display: flex; }

.login-left {
  flex: 1;
  background: linear-gradient(135deg, #1a1a2e 0%, #1a56db 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
}

.login-left-content { color: white; max-width: 380px; }
.login-left-content h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; }
.login-left-content p { font-size: 1rem; color: rgba(255,255,255,0.75); line-height: 1.7; }
.login-left-dots { display: flex; gap: 0.5rem; margin-top: 2rem; }
.login-left-dots span { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.4); }
.login-left-dots span:first-child { background: white; }

.login-right {
  width: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8faff;
  padding: 2rem;
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 12px;
  padding: 2.5rem 2rem;
  box-shadow: 0 4px 32px rgba(26,86,219,0.1);
}

.login-logo { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 2rem; }
.login-logo img { width: 28px; height: 28px; }
.login-logo span { font-size: 1rem; font-weight: 700; color: #1a56db; }

.login-card h2 { font-size: 1.6rem; font-weight: 800; color: #1a1a2e; margin-bottom: 0.4rem; }
.login-sub { color: #999; font-size: 0.88rem; margin-bottom: 2rem; }

.form-group { margin-bottom: 1.2rem; }
.form-group label { display: block; font-size: 0.85rem; font-weight: 600; color: #444; margin-bottom: 0.4rem; }

.input-wrap { position: relative; display: flex; align-items: center; }
.input-icon { position: absolute; left: 0.9rem; font-size: 1rem; pointer-events: none; }

.input-wrap input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.6rem;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
  background: #fafafa;
  box-sizing: border-box;
}

.input-wrap input:focus {
  outline: none;
  border-color: #1a56db;
  background: white;
  box-shadow: 0 0 0 3px rgba(26,86,219,0.08);
}

.has-error .input-wrap input { border-color: #e53e3e; background: #fff5f5; }

.toggle-pass {
  position: absolute;
  right: 0.8rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
}

.field-error { display: block; color: #e53e3e; font-size: 0.8rem; margin-top: 0.3rem; }

.error-banner {
  background: #fff5f5;
  border: 1px solid #fed7d7;
  color: #c53030;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.88rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.login-btn {
  width: 100%;
  padding: 0.9rem;
  background: #1a56db;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
}

.login-btn:hover:not(:disabled) { background: #1447b8; transform: translateY(-1px); }
.login-btn:disabled { opacity: 0.7; cursor: not-allowed; }

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}

@keyframes spin { to { transform: rotate(360deg); } }

.login-hint { margin-top: 1.8rem; padding-top: 1.2rem; border-top: 1px solid #eee; }
.login-hint p { font-size: 0.78rem; color: #aaa; margin-bottom: 0.4rem; }
.login-hint code {
  display: inline-block;
  background: #f0f4ff;
  color: #1a56db;
  font-size: 0.78rem;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  margin-right: 0.4rem;
  margin-bottom: 0.3rem;
}

@media (max-width: 768px) {
  .login-left { display: none; }
  .login-right { width: 100%; }
}
</style>

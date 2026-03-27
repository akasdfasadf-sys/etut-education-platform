<template>
  <div class="login-page">

    <!-- Çep: bulutly gradient panel -->
    <div class="login-left">
      <div class="login-left-inner">
        <div class="login-brand-icon">🎓</div>
        <h1>ETUT.EDU.TM</h1>
        <p>Bilim platformasyna hoş geldiňiz</p>
        <span class="login-tagline">Connect effortlessly.</span>
      </div>
    </div>

    <!-- Sag: forma -->
    <div class="login-right">
      <div class="login-card">
        <div class="login-card-logo">
          <span class="logo-icon">🎓</span>
          <span class="logo-text">ETUT.EDU.TM</span>
        </div>
        <p class="login-card-sub">LOGIN</p>

        <h2>Hasabyňyza giriş</h2>

        <form @submit.prevent="handleLogin">
          <div class="form-group" :class="{ 'has-error': errors.username }">
            <label>Ulanyjy ady</label>
            <div class="input-wrap">
              <svg class="input-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              <input v-model="username" type="text" placeholder="Ulanyjy adyňyzy giriziň" autocomplete="username" @input="errors.username = ''; generalError = ''" />
            </div>
            <span class="field-error" v-if="errors.username">{{ errors.username }}</span>
          </div>

          <div class="form-group" :class="{ 'has-error': errors.password }">
            <label>Açar söz</label>
            <div class="input-wrap">
              <svg class="input-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <input v-model="password" :type="showPass ? 'text' : 'password'" placeholder="Açar söziňizi giriziň" autocomplete="current-password" @input="errors.password = ''; generalError = ''" />
              <button type="button" class="show-btn" @click="showPass = !showPass">{{ showPass ? 'Gizle' : 'Görkez' }}</button>
            </div>
            <span class="field-error" v-if="errors.password">{{ errors.password }}</span>
          </div>

          <div v-if="generalError" class="error-banner">⚠️ {{ generalError }}</div>

          <button type="submit" class="login-btn" :disabled="loading">
            <span v-if="loading" class="spinner"></span>
            <span v-else>GIRIŞ</span>
          </button>
        </form>

        <div class="login-hint">
          <p>Synag hasaplary: <code>admin / 1234</code> <code>talip1 / talip123</code></p>
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
    return { username: '', password: '', errors: { username: '', password: '' }, generalError: '', showPass: false, loading: false }
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
          if (result.error.includes('ulanyjy ady')) { this.errors.username = result.error }
          else { this.errors.password = result.error }
          this.generalError = result.error
          this.username = ''
          this.password = ''
        }
        this.loading = false
      }, 600)
    }
  }
}
</script>

<style scoped>
* { box-sizing: border-box; }

.login-page {
  min-height: 100vh;
  display: flex;
}

/* ---- ÇEPE ---- */
.login-left {
  flex: 1;
  background: linear-gradient(160deg, #c8d8ff 0%, #b8c8f8 20%, #d4b8f0 50%, #f0c8a0 80%, #f8d8b0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.login-left::before {
  content: '';
  position: absolute;
  bottom: -60px;
  left: -60px;
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%);
  border-radius: 50%;
}

.login-left::after {
  content: '';
  position: absolute;
  top: -40px;
  right: -40px;
  width: 240px;
  height: 240px;
  background: radial-gradient(circle, rgba(200,180,255,0.4) 0%, transparent 70%);
  border-radius: 50%;
}

.login-left-inner {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #2a2a5a;
}

.login-brand-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0 4px 12px rgba(100,80,200,0.3));
}

.login-left-inner h1 {
  font-size: 2rem;
  font-weight: 800;
  color: #2a2a5a;
  margin-bottom: 0.5rem;
}

.login-left-inner p {
  font-size: 1rem;
  color: #4a4a7a;
  margin-bottom: 0.3rem;
}

.login-tagline {
  font-size: 0.9rem;
  color: #6a6aaa;
  font-style: italic;
}

/* ---- SAG ---- */
.login-right {
  width: 500px;
  background: #f5f7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login-card {
  width: 100%;
  max-width: 380px;
  background: white;
  border-radius: 16px;
  padding: 2.5rem 2rem;
  box-shadow: 0 8px 40px rgba(100,80,200,0.1);
}

.login-card-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.3rem;
}

.logo-icon { font-size: 1.4rem; }
.logo-text { font-size: 1rem; font-weight: 700; color: #1a56db; }

.login-card-sub {
  text-align: center;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: #aaa;
  margin-bottom: 1.5rem;
}

.login-card h2 {
  font-size: 1.4rem;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 1.5rem;
  text-align: center;
}

.form-group { margin-bottom: 1.1rem; }

.form-group label {
  display: block;
  font-size: 0.82rem;
  font-weight: 600;
  color: #555;
  margin-bottom: 0.35rem;
}

.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.input-svg-icon {
  position: absolute;
  left: 0.9rem;
  width: 16px;
  height: 16px;
  color: #aaa;
  pointer-events: none;
}

.input-wrap input {
  width: 100%;
  padding: 0.75rem 3.5rem 0.75rem 2.5rem;
  border: 1.5px solid #ececec;
  border-radius: 50px;
  font-size: 0.9rem;
  font-family: inherit;
  background: #f9faff;
  color: #333;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input-wrap input:focus {
  outline: none;
  border-color: #1a56db;
  background: white;
  box-shadow: 0 0 0 3px rgba(26,86,219,0.08);
}

.has-error .input-wrap input { border-color: #e53e3e; background: #fff5f5; }

.show-btn {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.78rem;
  font-weight: 600;
  color: #1a56db;
  font-family: inherit;
  padding: 0;
}

.field-error { display: block; color: #e53e3e; font-size: 0.78rem; margin-top: 0.3rem; padding-left: 0.5rem; }

.error-banner {
  background: #fff5f5;
  border: 1px solid #fed7d7;
  color: #c53030;
  padding: 0.65rem 1rem;
  border-radius: 50px;
  font-size: 0.83rem;
  margin-bottom: 0.8rem;
}

.login-btn {
  width: 100%;
  padding: 0.85rem;
  background: linear-gradient(90deg, #4a7cf8, #8b5cf6);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;
  margin-top: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
}

.login-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
.login-btn:disabled { opacity: 0.65; cursor: not-allowed; }

.spinner {
  width: 18px; height: 18px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}

@keyframes spin { to { transform: rotate(360deg); } }

.login-hint {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
  text-align: center;
}

.login-hint p { font-size: 0.75rem; color: #bbb; }

.login-hint code {
  background: #f0f4ff;
  color: #1a56db;
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  margin: 0 0.2rem;
}

@media (max-width: 768px) {
  .login-left { display: none; }
  .login-right { width: 100%; background: linear-gradient(160deg, #c8d8ff, #f0c8a0); }
  .login-card { box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
}
</style>

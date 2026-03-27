<template>
  <nav class="navbar" :class="{ scrolled: scrolled }">
    <div class="navbar-container">
      <div class="navbar-logo">
        <router-link to="/">
          <img src="/vite.svg" alt="logo" class="logo-icon" />
          <span>ETUT.EDU.TM</span>
        </router-link>
      </div>

      <div class="hamburger" @click="toggleMenu" :class="{ active: isMenuOpen }">
        <span></span><span></span><span></span>
      </div>

      <ul class="nav-menu" :class="{ active: isMenuOpen }">
        <li class="nav-item">
          <router-link to="/" @click="closeMenu">Baş Sahypa</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/biz-barada" @click="closeMenu">Biz Barada</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/video-sapaklar" @click="closeMenu">Video Sapaklar</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/temalar" @click="closeMenu">Temalar</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/fakultetler" @click="closeMenu">Fakultetler</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/testler" @click="closeMenu">Testler</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/contact" @click="closeMenu">Contact</router-link>
        </li>
        <li class="nav-item nav-icons">
          <a href="mailto:" class="icon-btn" title="Email">✉</a>
          <a href="tel:+99364716128" class="icon-btn" title="Phone">📞</a>
        </li>
        <li class="nav-item nav-auth" v-if="!isLoggedIn">
          <router-link to="/login" @click="closeMenu" class="login-link">Giriş</router-link>
        </li>
        <li class="nav-item nav-auth" v-else>
          <span class="user-name">👤 {{ userName }}</span>
          <button class="logout-btn" @click="logout">Çykyş</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { auth } from '../store/auth.js'

export default {
  name: 'NavbarComponent',
  data() {
    return { isMenuOpen: false, scrolled: false }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  computed: {
    isLoggedIn() { return auth.isLoggedIn },
    userName() { return auth.user?.name }
  },
  methods: {
    toggleMenu() { this.isMenuOpen = !this.isMenuOpen },
    closeMenu() { this.isMenuOpen = false },
    handleScroll() { this.scrolled = window.scrollY > 50 },
    logout() {
      auth.logout()
      this.$router.push('/')
      this.closeMenu()
    }
  }
}
</script>

<style scoped>
.navbar {
  background: #1a1a2e;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  transition: background 0.3s;
}

.navbar.scrolled {
  background: red;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-logo a {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
}

.logo-icon {
  width: 28px;
  height: 28px;
  filter: brightness(0) invert(1);
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 0.2rem;
  align-items: center;
}

.nav-item a {
  color: rgba(255,255,255,0.8);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  transition: all 0.2s;
}

.nav-item a:hover,
.nav-item a.router-link-active {
  color: white;
  background: rgba(255,255,255,0.1);
}

.nav-item a.router-link-exact-active {
  color: white;
  font-weight: 700;
}

.nav-icons {
  display: flex;
  align-items: center;
  gap: 0.2rem;
}

.icon-btn {
  font-size: 1rem;
  padding: 0.4rem 0.6rem !important;
}

.nav-auth {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 0.5rem;
}

.login-link {
  background: #1a56db !important;
  color: white !important;
  font-weight: 600 !important;
  padding: 0.4rem 1rem !important;
  border-radius: 4px !important;
}

.login-link:hover {
  background: #1d4ed8 !important;
}

.user-name {
  color: rgba(255,255,255,0.9);
  font-size: 0.88rem;
  font-weight: 500;
}

.logout-btn {
  background: rgba(255,255,255,0.1);
  color: white;
  border: 1px solid rgba(255,255,255,0.3);
  padding: 0.35rem 0.9rem;
  border-radius: 4px;
  font-size: 0.88rem;
  cursor: pointer;
  transition: all 0.2s;
}

.logout-btn:hover { background: rgba(255,255,255,0.2); }

.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 5px;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background: white;
  border-radius: 3px;
  transition: all 0.3s;
}

.hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(8px, 8px); }
.hamburger.active span:nth-child(2) { opacity: 0; }
.hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(7px, -7px); }

@media (max-width: 768px) {
  .hamburger { display: flex; }
  .nav-menu {
    position: fixed;
    left: -100%;
    top: 64px;
    flex-direction: column;
    background: #1a1a2e;
    width: 100%;
    text-align: center;
    transition: left 0.3s;
    padding: 1.5rem 0;
    gap: 0;
  }
  .nav-menu.active { left: 0; }
  .nav-item { margin: 0.4rem 0; }
}
</style>

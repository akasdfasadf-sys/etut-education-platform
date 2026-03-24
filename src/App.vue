<template>
  <div id="app">
    <NavbarComponent />
    <router-view></router-view>
    <FooterComponent />
  </div>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

export default {
  name: 'App',
  components: { NavbarComponent, FooterComponent },
  mounted() {
    this.initScrollReveal()
  },
  methods: {
    initScrollReveal() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed')
            } else {
              entry.target.classList.remove('revealed')
            }
          })
        },
        { threshold: 0.12 }
      )

      const observe = () => {
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
      }

      observe()

      // router geçende täzeden gözle
      this.$router.afterEach(() => {
        setTimeout(observe, 100)
      })
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #fff;
  color: #2c3e50;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Scroll reveal animasiýalary */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

.reveal-left {
  opacity: 0;
  transform: translateX(-50px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal-left.revealed {
  opacity: 1;
  transform: translateX(0);
}

.reveal-right {
  opacity: 0;
  transform: translateX(50px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal-right.revealed {
  opacity: 1;
  transform: translateX(0);
}

.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }
.reveal-delay-4 { transition-delay: 0.4s; }
</style>

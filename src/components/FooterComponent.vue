<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-brand">
        <h3>ETUT.EDU.TM</h3>
        <p>Bilim platformasy - Öwreniň we ösdüriň</p>
      </div>
      <div class="footer-links">
        <h4>Baglanyşyklar</h4>
        <ul>
          <li><router-link to="/">Baş Sahypa</router-link></li>
          <li><router-link to="/biz-barada">Biz Barada</router-link></li>
          <li><router-link to="/video-sapaklar">Video Sapaklar</router-link></li>
          <li><router-link to="/temalar">Temalar</router-link></li>
          <li><router-link to="/fakultetler">Fakultetler</router-link></li>
          <li><router-link to="/testler">Testler</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
        </ul>
      </div>
      <div class="footer-contact">
        <h4>Habarlaşmak</h4>
        <p>Email: info@etut.edu.tm</p>
        <p>Tel: +99364716128</p>
        <p>Aşgabat, Türkmenistan</p>
      </div>
    </div>

  </footer>
</template>

<script>
export default { name: 'FooterComponent' }
</script>

<style scoped>
.footer {
  background: #1a1a2e;
  color: #ccc;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
}

.footer-brand h3 {
  color: white;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.footer-brand p { font-size: 0.9rem; line-height: 1.6; }

.footer-links h4,
.footer-contact h4 {
  color: white;
  font-size: 0.9rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.footer-links ul { list-style: none; }
.footer-links li { margin-bottom: 0.5rem; }
.footer-links a {
  color: #ccc;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
}
.footer-links a:hover { color: white; }

.footer-contact p { font-size: 0.9rem; margin-bottom: 0.4rem; }

.footer-bottom {
  border-top: 1px solid #333;
  text-align: center;
  padding: 1.2rem 2rem;
  font-size: 0.85rem;
  color: #888;
}

@media (max-width: 768px) {
  .footer-container { grid-template-columns: 1fr; gap: 2rem; }
}
</style>

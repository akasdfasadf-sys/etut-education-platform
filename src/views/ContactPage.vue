<template>
  <div class="contact-page">
    <section class="contact-section">
      <h2 class="section-title">CONTACT</h2>
      <div class="section-divider"></div>

      <div class="contact-form-row">
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Phone" />
        <input type="email" placeholder="Email address" />
        <button class="btn-contact">CONTACT US</button>
      </div>

      <div class="contact-bottom">
        <div class="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.0!2d58.3230!3d37.9340!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f6b0e0e0e0e0e0f%3A0x0!2sAshgabat%2C%20Turkmenistan!5e0!3m2!1sen!2s!4v1700000000001"
            width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy">
          </iframe>
        </div>
        <div class="contact-info">
          <p class="info-location">Aşgabat, Türkmenistan</p>
          <p>📞 +99364716128</p>
          <p>✉ info@etut.edu.tm</p>
          <p>🕐 Mon-Fri · 08:00–19:00</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default { name: 'ContactPage' }
</script>

<style scoped>
.contact-page { flex: 1; }

.contact-section {
  padding: 4rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: #1a1a2e;
  text-align: center;
  margin-bottom: 0.8rem;
}

.section-divider {
  width: 50px;
  height: 3px;
  background: #1a56db;
  margin: 0 auto 2.5rem;
}

.contact-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: 0;
  margin-bottom: 2rem;
  border: 1px solid #ddd;
  border-radius: 2px;
  overflow: hidden;
}

.contact-form-row input {
  padding: 0.9rem 1rem;
  border: none;
  border-right: 1px solid #ddd;
  font-size: 0.9rem;
  font-family: inherit;
  outline: none;
  width: 100%;
}

.btn-contact {
  background: #4a8fa8;
  color: white;
  border: none;
  padding: 0.9rem 1.8rem;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s;
}

.btn-contact:hover { background: #3a7a93; }

.contact-bottom {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 0;
  border: 1px solid #eee;
  border-radius: 2px;
  overflow: hidden;
  min-height: 320px;
}

.map-container { height: 320px; }

.contact-info {
  padding: 2rem;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.8rem;
}

.info-location {
  font-weight: 700;
  color: #1a1a2e;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.contact-info p {
  color: #555;
  font-size: 0.95rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .contact-form-row { grid-template-columns: 1fr; }
  .contact-form-row input { border-right: none; border-bottom: 1px solid #ddd; }
  .contact-bottom { grid-template-columns: 1fr; }
  .map-container { height: 250px; }
}
</style>

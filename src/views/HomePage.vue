<template>
  <div class="home">

    <!-- Hero -->
    <section class="hero">
      <video class="hero-video" autoplay muted loop playsinline>
        <source src="/normal_69be910e13749.mp4" type="video/mp4" />
      </video>
      <div class="hero-overlay"></div>
      <div class="hero-text">
        <h1 class="hero-title">Oguz Han Engineering and Technology University of Turkmenistan Education Platform</h1>
      </div>
    </section>

    <!-- Press -->
    <section class="press-section">
      <h2 class="section-title reveal">PRESS</h2>
      <div class="section-divider reveal"></div>
      <div class="press-grid">
        <div class="press-card reveal" v-for="p in pressItems" :key="p.title">
          <img :src="p.img" :alt="p.title" />
          <div class="press-body">
            <p class="press-date">{{ p.date }}</p>
            <h3>{{ p.title }}</h3>
            <p class="press-desc">{{ p.desc }}</p>
            <button class="btn-read">READ MORE</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section class="contact-section">
      <h2 class="section-title reveal">CONTACT</h2>
      <div class="section-divider reveal"></div>

      <div class="contact-form-row reveal">
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Phone" />
        <input type="email" placeholder="Email address" />
        <button class="btn-contact">CONTACT US</button>
      </div>

      <div class="contact-bottom reveal">
        <div class="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95000!2d58.3794!3d37.9601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f6fffd1e8d5b6b7%3A0x400a01269bf5e30!2sAshgabat%2C%20Turkmenistan!5e0!3m2!1sen!2s!4v1700000000000"
            width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy">
          </iframe>
        </div>
        <div class="contact-info">
          <p class="contact-location">Aşgabat, Türkmenistan</p>
          <p>📞 +993 12 345678</p>
          <p>✉ info@etut.edu.tm</p>
          <p>🕐 Mon-Fri · 08:00–19:00</p>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      pressItems: [
        {
          title: 'First Press Release',
          date: '2020/05/06',
          desc: 'Here you can add the short text for your press release. Usually it will be a short text that explains what the press release is all about. It needs to urge the user to click READ MORE to read the rest.',
          img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80'
        },
        {
          title: 'Second Press Release',
          date: '2020/03/03',
          desc: 'Here you can add the short text for your press release. Usually it will be a short text that explains what the press release is all about. It needs to urge the user to click READ MORE to read the rest.',
          img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&q=80'
        },
        {
          title: 'Third Press Release',
          date: '2020/02/06',
          desc: 'Here you can add the short text for your press release. Usually it will be a short text that explains what the press release is all about. It needs to urge the user to click READ MORE to read the rest.',
          img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80'
        }
      ]
    }
  }
}
</script>

<style scoped>
.home { flex: 1; }

/* Hero */
.hero {
  position: relative;
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
}

.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
}

.hero-text {
  position: relative;
  z-index: 2;
  max-width: 480px;
  width: 90%;
  margin-right: 5%;
}

.hero-title {
  font-size: 2rem;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.3;
  margin: 0;
  text-shadow: 0 2px 12px rgba(0,0,0,0.4);
}

/* Shared */
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
  margin: 0 auto 3rem;
}

/* Press */
.press-section {
  padding: 5rem 2rem;
  background: #f9fafb;
}

.press-grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.press-card {
  background: white;
  border-radius: 2px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  display: flex;
  flex-direction: column;
  text-align: center;
}

.press-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.press-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.press-date {
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 0.5rem;
}

.press-body h3 {
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.8rem;
}

.press-desc {
  font-size: 0.88rem;
  color: #666;
  line-height: 1.6;
  flex: 1;
  margin-bottom: 1.2rem;
}

.btn-read {
  background: #4a8fa8;
  color: white;
  border: none;
  padding: 0.6rem 1.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  border-radius: 2px;
  transition: background 0.2s;
  align-self: center;
}

.btn-read:hover { background: #3a7a93; }

/* Contact */
.contact-section {
  padding: 5rem 2rem;
  background: white;
}

.contact-form-row {
  max-width: 1000px;
  margin: 0 auto 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
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
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 300px;
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

.contact-location {
  font-weight: 700;
  color: #1a1a2e;
  font-size: 1rem;
}

.contact-info p {
  color: #555;
  font-size: 0.95rem;
  line-height: 1.6;
}

@media (max-width: 900px) {
  .press-grid { grid-template-columns: 1fr; }
  .contact-grid { grid-template-columns: 1fr; gap: 2rem; }
}

@media (max-width: 768px) {
  .hero { justify-content: center; }
  .hero-card { margin: 1rem; max-width: 100%; }
  .form-row { grid-template-columns: 1fr; }
}
</style>

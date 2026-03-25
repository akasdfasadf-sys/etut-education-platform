<template>
  <div class="biz-barada-page">

    <section class="about-hero">
      <div class="about-bg"></div>
      <div class="about-overlay"></div>
      <div class="about-content">
        <h1>Biz Barada</h1>
        <div class="about-divider"></div>
        <p>
          ETUT.EDU.TM — Oguz han Engineering and Technology University of Turkmenistan
          tarapyndan hödürlenýän döwrebap sanly bilim platformasydyr. Biziň esasy maksadymyz,
          talyplaryň okuw materiallaryna islendik wagtda we islendik ýerden aňsatlyk bilen
          elýeterliligini üpjün etmekdir.
        </p>
        <p>
          Platformamyzda her bir talyp öz fakultetine we dersine degişli iň täze okuw
          gollanmalaryny, PDF materiallaryny tapyp biler we öz bilimini testler arkaly
          barlap biler. Biz bilimiň sanlylaşmagy arkaly geljegiň hünärmenleriniň
          taýýarlanmagyna goşant goşýarys.
        </p>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  name: 'BizBaradaPage'
}
</script>

<style scoped>
.biz-barada-page { flex: 1; }

.about-hero {
  position: relative;
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
}

.about-bg {
  position: absolute;
  inset: 0;
  background: url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1400&q=80') center/cover no-repeat;
}

.about-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.1) 100%);
}

.about-content {
  position: relative;
  z-index: 2;
  max-width: 600px;
  padding: 4rem;
}

.about-content h1 {
  font-size: 2.8rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.about-divider {
  width: 60px;
  height: 3px;
  background: #1a56db;
  margin-bottom: 1.5rem;
}

.about-content p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 1rem;
}

.about-date {
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.55);
  font-style: italic;
}

@media (max-width: 768px) {
  .about-content {
    padding: 2rem;
    max-width: 100%;
  }
  .about-content h1 { font-size: 2rem; }
}
</style>

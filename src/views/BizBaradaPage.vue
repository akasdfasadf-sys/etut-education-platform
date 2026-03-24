<template>
  <div class="biz-barada-page">

    <section class="about-hero">
      <div class="about-bg"></div>
      <div class="about-overlay"></div>
      <div class="about-content">
        <h1>Biz Barada</h1>
        <div class="about-divider"></div>
        <p>
          ETUT.EDU.TM uniwersitet bilim platformasy bolup, talyplaryna programmalary öwrenmäge,
          uniwersitetleri deňeşdirmäge we arzadan okuwa kabul edilýänçä aýdyň ýol meýilleşdirmäge
          kömek edýär. Biz programma maglumatlaryny, kabul ediş talaplaryny, möhletleri we
          maliýe kömegi gollanmasyny bir amatly tejribä jemleýäris. Esasy ugur saýlaýarsyňyzmy,
          resminamalary taýýarlaýarsyňyzmy ýa-da arzaňyzyň ýagdaýyny yzarlaýarsyňyzmy —
          gurallarmyz sizi tertipli we ynamly saklaýar. Uniwersitetler hem takyk sanawlary
          paýlaşyp, täzelikleri netijeli habar berip bilýärler. Biziň missiýamyz ýönekeý:
          ýokary bilimi has elýeterli, aç-açan we her bir öwreniji üçin gazanylýan etmekdir.
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
}

@media (max-width: 768px) {
  .about-content {
    padding: 2rem;
    max-width: 100%;
  }
  .about-content h1 { font-size: 2rem; }
}
</style>

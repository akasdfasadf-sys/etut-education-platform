<template>
  <div class="video-page">

    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="page-hero-overlay"></div>
      <div class="page-hero-text">
        <h1>Video Sapaklar</h1>
        <p>Fakultetlere degişli wideo sapaklar</p>
      </div>
    </section>

    <div class="page-container">

      <!-- Fakultet tabs -->
      <div class="selector-section">
        <div class="fakultet-tabs">
          <button
            v-for="f in fakultetler"
            :key="f.id"
            :class="['fak-btn', { active: selectedFakultet === f.id }]"
            @click="selectFakultet(f.id)"
          >
            <span class="fak-icon">{{ f.icon }}</span>
            <span>{{ f.name }}</span>
          </button>
        </div>
      </div>

      <!-- Gözleg -->
      <div class="filter-section" v-if="selectedFakultet">
        <input v-model="searchQuery" type="text" placeholder="Wideo gözle..." class="search-input" />
      </div>

      <!-- Pleýer gerek däl, wideo göni YouTube-da açylýar -->

      <!-- Wideo grid -->
      <div class="video-grid" v-if="selectedFakultet">
        <div
          v-for="video in filteredVideos"
          :key="video.id"
          class="video-card"
          @click="openVideo(video)"
          :class="{ active: activeVideo && activeVideo.id === video.id }"
        >
          <div class="video-thumb">
            <img :src="`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`" :alt="video.title" />
            <div class="play-overlay"><span class="play-icon">▶</span></div>
            <span class="video-duration" v-if="video.duration">{{ video.duration }}</span>
          </div>
          <div class="video-info">
            <h3>{{ video.title }}</h3>
            <p>{{ video.desc }}</p>
          </div>
        </div>
        <div v-if="filteredVideos.length === 0" class="no-results">
          <p>Bu fakultet üçin wideo heniz goşulmady</p>
        </div>
      </div>

      <div v-if="!selectedFakultet" class="select-prompt">
        <p>Wideo görmek üçin fakultet saýlaň</p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoSapaklar',
  data() {
    return {
      selectedFakultet: null,
      searchQuery: '',
      activeVideo: null,
      fakultetler: [
        { id: 1, name: 'Kiberfiziki Ulgamlar Fakulteti', icon: '🤖' },
        { id: 2, name: 'Innowasiýalaryň Ykdysadyýeti Fakulteti', icon: '💡' },
        { id: 3, name: 'Kompýuter Ylymlary we Maglumat Tehnologiýalary Fakulteti', icon: '💻' },
        { id: 4, name: 'Himiki we Nanotehnologiýalar Fakulteti', icon: '🧪' },
        { id: 5, name: 'Biotehnologiýa we Ekologiýa Fakulteti', icon: '🧬' }
      ],
      videos: [
        { id: 4, fakultet: 2, youtubeId: 'qf8Ei1w11Dg', title: 'Jeff-ism: Video Culture Creates the Economics of Innovation', duration: '', desc: 'Innowasion ykdysadyýet we wideo medeniýeti.' },
        { id: 5, fakultet: 2, youtubeId: '6MK6tuZ7Rws', title: 'How do we create a better economy?', duration: '', desc: 'Gowy ykdysadyýeti nädip döredip bileris?' }
      ]
    }
  },
  computed: {
    filteredVideos() {
      let list = this.videos.filter(v => v.fakultet === this.selectedFakultet)
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase()
        list = list.filter(v => v.title.toLowerCase().includes(q) || v.desc.toLowerCase().includes(q))
      }
      return list
    }
  },
  methods: {
    selectFakultet(id) {
      this.selectedFakultet = id
      this.activeVideo = null
      this.searchQuery = ''
    },
    openVideo(video) {
      window.open(`https://www.youtube.com/watch?v=${video.youtubeId}`, '_blank')
    }
  }
}
</script>

<style scoped>
.video-page { flex: 1; }

.page-hero {
  position: relative;
  min-height: 280px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
}

.page-hero-bg {
  position: absolute;
  inset: 0;
  background: url('https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1400&q=80') center/cover no-repeat;
}

.page-hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.45);
}

.page-hero-text {
  position: relative;
  z-index: 2;
  max-width: 480px;
  width: 90%;
  margin-right: 5%;
}

.page-hero-text h1 {
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 12px rgba(0,0,0,0.4);
}

.page-hero-text p {
  color: rgba(255,255,255,0.85);
  font-size: 1rem;
  text-shadow: 0 1px 6px rgba(0,0,0,0.4);
}

.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.selector-section { margin-bottom: 2rem; }

.fakultet-tabs {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.fak-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.2rem;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 2px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  color: #555;
  transition: all 0.2s;
}

.fak-btn:hover { border-color: #1a56db; color: #1a56db; }
.fak-btn.active { background: #1a1a2e; border-color: #1a1a2e; color: white; }
.fak-icon { font-size: 1.1rem; }

.filter-section { margin-bottom: 2rem; }

.search-input {
  width: 100%;
  max-width: 380px;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 2px;
  font-size: 0.95rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus { border-color: #1a56db; }

/* Pleýer */
.video-player-section {
  background: white;
  border-radius: 2px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.1);
  overflow: hidden;
  margin-bottom: 2.5rem;
  border-top: 3px solid #1a56db;
}

.player-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid #eee;
  gap: 1rem;
}

.player-header h2 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.3rem;
}

.player-desc {
  font-size: 0.85rem;
  color: #888;
}

.close-btn {
  background: none;
  border: 1px solid #ddd;
  padding: 0.4rem 0.9rem;
  border-radius: 2px;
  cursor: pointer;
  font-size: 0.85rem;
  font-family: inherit;
  color: #666;
  white-space: nowrap;
  transition: all 0.2s;
  flex-shrink: 0;
}

.close-btn:hover { background: #f5f5f5; }

.player-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  background: #000;
}

.yt-player {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

/* Wideo grid */
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.video-card {
  background: white;
  border-radius: 2px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
  border-top: 3px solid #1a56db;
}

.video-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.video-card.active { border-top-color: #e53e3e; }

.video-thumb {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  background: #1a1a2e;
}

.video-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.video-card:hover .video-thumb img { transform: scale(1.04); }

.play-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.video-card:hover .play-overlay { opacity: 1; }

.play-icon {
  width: 48px;
  height: 48px;
  background: rgba(255,255,255,0.95);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: #1a56db;
  padding-left: 4px;
}

.video-duration {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  background: rgba(0,0,0,0.75);
  color: white;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.15rem 0.45rem;
  border-radius: 3px;
}

.video-info { padding: 1rem 1.2rem 1.2rem; }

.video-info h3 {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.4rem;
  line-height: 1.4;
}

.video-info p {
  font-size: 0.82rem;
  color: #888;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.no-results { text-align: center; padding: 3rem; color: #888; grid-column: 1/-1; }

.select-prompt { text-align: center; padding: 5rem 2rem; color: #aaa; font-size: 1rem; }

@media (max-width: 768px) {
  .page-hero { justify-content: center; }
  .page-hero-text { margin-right: 0; text-align: center; }
  .video-grid { grid-template-columns: 1fr; }
  .search-input { max-width: 100%; }
}
</style>

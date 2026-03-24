<template>
  <div class="temalar-page">

    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="page-hero-overlay"></div>
      <div class="page-hero-text">
        <h1>Dersler we Temalar</h1>
        <p>Öwrenmek üçin dersiňizi saýlaň</p>
      </div>
    </section>

    <div class="page-container">
      <div class="filter-section">
        <input v-model="searchQuery" type="text" placeholder="Ders gözle..." class="search-input" />
        <select v-model="selectedCategory" class="category-select">
          <option value="hemmesi">Ähli kategoriýalar</option>
          <option value="matematika">Matematika</option>
          <option value="ykdysadyýet">Ykdysadyýet</option>
          <option value="biznes">Biznes</option>
          <option value="diller">Diller</option>
          <option value="informatika">Informatika</option>
          <option value="sport">Sport</option>
          <option value="ylym">Ylym</option>
          <option value="inženerçilik">Inženerçilik</option>
        </select>
      </div>

      <div class="subjects-grid">
        <div v-for="subject in filteredSubjects" :key="subject.id" class="subject-card" @click="goToSubject(subject.id)">
          <div class="subject-icon">{{ subject.icon }}</div>
          <h3>{{ subject.name }}</h3>
          <p class="subject-category">{{ subject.category }}</p>
          <p class="subject-description">{{ subject.description }}</p>
          <div class="subject-meta">
            <span>📖 {{ subject.lessonCount }} tema</span>
            <span>{{ getDifficultyText(subject.difficulty) }}</span>
          </div>
          <button class="start-btn">Başla</button>
        </div>
      </div>

      <div v-if="filteredSubjects.length === 0" class="no-results">
        <p>Hiç hili netije tapylmady</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'TemalarPage',
  data() {
    return {
      searchQuery: '',
      selectedCategory: 'hemmesi',
      subjects: [
        { id: 1, name: 'Fundamental of Marketing', category: 'biznes', icon: '📊', description: 'Marketing esaslary we strategiýalary', lessonCount: 28, difficulty: 'orta' },
        { id: 2, name: 'Economics of Enterprise', category: 'ykdysadyýet', icon: '🏢', description: 'Kärhana ykdysadyýeti we dolandyryş', lessonCount: 32, difficulty: 'kyn' },
        { id: 3, name: 'Physical Education', category: 'sport', icon: '⚽', description: 'Beden terbiýesi we sagdynlyk', lessonCount: 20, difficulty: 'ýeňil' },
        { id: 4, name: 'Algebra', category: 'matematika', icon: '🔢', description: 'Algebranyň esasy düşünjeleri we deňlemeler', lessonCount: 35, difficulty: 'orta' },
        { id: 5, name: 'Linear Algebra', category: 'matematika', icon: '📐', description: 'Çyzykly algebra we matrisalar', lessonCount: 30, difficulty: 'kyn' },
        { id: 6, name: 'Japanese', category: 'diller', icon: '🇯🇵', description: 'Ýapon dili we medeniýeti', lessonCount: 40, difficulty: 'kyn' },
        { id: 7, name: 'English Profession', category: 'diller', icon: '🇬🇧', description: 'Hünär üçin iňlis dili', lessonCount: 38, difficulty: 'orta' },
        { id: 8, name: 'Information', category: 'informatika', icon: '💻', description: 'Maglumat tehnologiýalary esaslary', lessonCount: 25, difficulty: 'ýeňil' },
        { id: 9, name: 'Microeconomics', category: 'ykdysadyýet', icon: '💰', description: 'Mikroykdysadyýet nazaryýeti', lessonCount: 30, difficulty: 'kyn' },
        { id: 10, name: 'Scientific', category: 'ylym', icon: '🔬', description: 'Ylmy gözleg usullary', lessonCount: 22, difficulty: 'orta' },
        { id: 11, name: 'Engineering Pedagogic', category: 'inženerçilik', icon: '⚙️', description: 'Inženerçilik pedagogikasy', lessonCount: 26, difficulty: 'kyn' },
        { id: 12, name: 'Mathematical Modeling', category: 'matematika', icon: '📈', description: 'Matematiki modelirleme we simulýasiýa usullary', lessonCount: 30, difficulty: 'kyn' }
      ]
    }
  },
  computed: {
    filteredSubjects() {
      let filtered = this.subjects
      if (this.selectedCategory !== 'hemmesi') filtered = filtered.filter(s => s.category === this.selectedCategory)
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase()
        filtered = filtered.filter(s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q))
      }
      return filtered
    }
  },
  methods: {
    getDifficultyText(d) {
      return { 'ýeňil': '🟢 Ýeňil', 'orta': '🟡 Orta', 'kyn': '🔴 Kyn' }[d] || d
    },
    goToSubject(id) { this.$router.push(`/tema/${id}`) }
  }
}
</script>

<style scoped>
.temalar-page { flex: 1; }

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
  background: url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1400&q=80') center/cover no-repeat;
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
  color: #ffffff;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
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

.filter-section {
  display: flex;
  gap: 1rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 250px;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 2px;
  font-size: 0.95rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
}

.category-select {
  min-width: 200px;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 2px;
  font-size: 0.95rem;
  font-family: inherit;
  outline: none;
  cursor: pointer;
}

.search-input:focus, .category-select:focus { border-color: #1a56db; }

.subjects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.subject-card {
  background: white;
  padding: 1.8rem;
  border-radius: 2px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  border-top: 3px solid #1a56db;
}

.subject-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.subject-icon { font-size: 2.2rem; margin-bottom: 0.8rem; }

.subject-card h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.3rem;
}

.subject-category {
  color: #1a56db;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.8rem;
}

.subject-description {
  color: #666;
  font-size: 0.88rem;
  line-height: 1.6;
  flex: 1;
  margin-bottom: 1rem;
}

.subject-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 1.2rem;
}

.start-btn {
  background: #1a1a2e;
  color: white;
  border: none;
  padding: 0.7rem;
  border-radius: 2px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.start-btn:hover { background: #1a56db; }

.no-results { text-align: center; padding: 3rem; color: #888; }

@media (max-width: 768px) {
  .page-hero { justify-content: center; }
  .page-hero-card { margin: 1rem; max-width: 100%; }
  .subjects-grid { grid-template-columns: 1fr; }
  .filter-section { flex-direction: column; }
}
</style>

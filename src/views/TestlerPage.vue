<template>
  <div class="testler-page">

    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="page-hero-overlay"></div>
      <div class="page-hero-card">
        <h1>Testler</h1>
        <div class="hero-divider"></div>
        <p>Bilimiňizi barlaň we ösdüriň</p>
      </div>
    </section>

    <div class="page-container">
      <div class="test-categories">
        <button
          v-for="category in categories"
          :key="category.id"
          :class="['category-btn', { active: selectedTestCategory === category.id }]"
          @click="selectedTestCategory = category.id"
        >
          {{ category.icon }} {{ category.name }}
        </button>
      </div>

      <div class="tests-grid">
        <div v-for="test in filteredTests" :key="test.id" class="test-card">
          <div class="test-header">
            <h3>{{ test.title }}</h3>
            <span :class="['test-status', test.status]">{{ getStatusText(test.status) }}</span>
          </div>
          <p class="test-description">{{ test.description }}</p>
          <div class="test-info">
            <span>❓ {{ test.questionCount }} sorag</span>
            <span>⏱️ {{ test.duration }} min</span>
            <span>📊 {{ test.difficulty }}</span>
          </div>
          <div v-if="test.lastScore" class="test-score">
            <p>Soňky netije: <strong>{{ test.lastScore }}%</strong></p>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: test.lastScore + '%' }"></div>
            </div>
          </div>
          <button class="test-start-btn" @click="startTest(test.id)">
            {{ test.status === 'completed' ? 'Täzeden geç' : 'Başla' }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'TestlerPage',
  data() {
    return {
      selectedTestCategory: 'all',
      categories: [
        { id: 'all', name: 'Ählisi', icon: '📚' },
        { id: 'matematika', name: 'Matematika', icon: '🔢' },
        { id: 'ykdysadyýet', name: 'Ykdysadyýet', icon: '💰' },
        { id: 'biznes', name: 'Biznes', icon: '📊' },
        { id: 'diller', name: 'Diller', icon: '🗣️' },
        { id: 'informatika', name: 'Informatika', icon: '💻' },
        { id: 'sport', name: 'Sport', icon: '⚽' },
        { id: 'ylym', name: 'Ylym', icon: '🔬' },
        { id: 'inženerçilik', name: 'Inženerçilik', icon: '⚙️' }
      ],
      tests: [
        { id: 1, title: 'Fundamental of Marketing - Test 1', description: 'Marketing esaslary we strategiýalary', category: 'biznes', questionCount: 25, duration: 35, difficulty: 'Orta', status: 'new', lastScore: null },
        { id: 2, title: 'Economics of Enterprise', description: 'Kärhana ykdysadyýeti we dolandyryş', category: 'ykdysadyýet', questionCount: 30, duration: 45, difficulty: 'Kyn', status: 'new', lastScore: null },
        { id: 3, title: 'Physical Education - Sagdynlyk', description: 'Beden terbiýesi we sagdynlyk esaslary', category: 'sport', questionCount: 20, duration: 25, difficulty: 'Ýeňil', status: 'completed', lastScore: 88 },
        { id: 4, title: 'Algebra - Deňlemeler', description: 'Algebranyň esasy düşünjeleri', category: 'matematika', questionCount: 28, duration: 40, difficulty: 'Orta', status: 'in_progress', lastScore: 72 },
        { id: 5, title: 'Linear Algebra - Matrisalar', description: 'Çyzykly algebra we matrisalar', category: 'matematika', questionCount: 25, duration: 40, difficulty: 'Kyn', status: 'new', lastScore: null },
        { id: 6, title: 'Japanese - Hiragana', description: 'Ýapon elipbiýi we esasy sözler', category: 'diller', questionCount: 35, duration: 45, difficulty: 'Kyn', status: 'new', lastScore: null },
        { id: 7, title: 'English Profession - Business', description: 'Iş üçin iňlis dili', category: 'diller', questionCount: 30, duration: 40, difficulty: 'Orta', status: 'completed', lastScore: 85 },
        { id: 8, title: 'Information Technology', description: 'Maglumat tehnologiýalary esaslary', category: 'informatika', questionCount: 22, duration: 30, difficulty: 'Ýeňil', status: 'in_progress', lastScore: 78 },
        { id: 9, title: 'Microeconomics - Bazar', description: 'Mikroykdysadyýet we bazar ykdysadyýeti', category: 'ykdysadyýet', questionCount: 28, duration: 40, difficulty: 'Kyn', status: 'new', lastScore: null },
        { id: 10, title: 'Scientific Research Methods', description: 'Ylmy gözleg usullary we metodologiýa', category: 'ylym', questionCount: 20, duration: 35, difficulty: 'Orta', status: 'new', lastScore: null },
        { id: 11, title: 'Engineering Pedagogic', description: 'Inženerçilik pedagogikasy esaslary', category: 'inženerçilik', questionCount: 24, duration: 35, difficulty: 'Kyn', status: 'completed', lastScore: 90 },
        { id: 12, title: 'Mathematical Modeling', description: 'Matematiki modelirleme we simulýasiýa usullary', category: 'matematika', questionCount: 28, duration: 40, difficulty: 'Kyn', status: 'new', lastScore: null }
      ]
    }
  },
  computed: {
    filteredTests() {
      if (this.selectedTestCategory === 'all') return this.tests
      return this.tests.filter(t => t.category === this.selectedTestCategory)
    }
  },
  methods: {
    getStatusText(s) {
      return { 'new': 'Täze', 'in_progress': 'Dowam edýär', 'completed': 'Tamamlanan' }[s] || s
    },
    startTest(id) { this.$router.push(`/test/${id}`) }
  }
}
</script>

<style scoped>
.testler-page { flex: 1; }

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
  background: url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1400&q=80') center/cover no-repeat;
}

.page-hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.45);
}

.page-hero-card {
  position: relative;
  z-index: 2;
  background: transparent !important;
  padding: 2.5rem;
  max-width: 480px;
  width: 90%;
  margin-right: 5%;
  border-radius: 0;
  box-shadow: none !important;
}

.page-hero-card h1 {
  font-size: 2rem;
  font-weight: 800;
  color: #ffffff !important;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
  text-shadow: 0 2px 12px rgba(0,0,0,0.4);
}

.hero-divider { display: none; }

.page-hero-card p { color: rgba(255,255,255,0.85) !important; font-size: 1rem; text-shadow: 0 1px 6px rgba(0,0,0,0.4); }

.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.test-categories {
  display: flex;
  gap: 0.6rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.category-btn {
  padding: 0.5rem 1.1rem;
  border: 1px solid #ddd;
  background: white;
  border-radius: 2px;
  cursor: pointer;
  font-size: 0.88rem;
  font-weight: 600;
  font-family: inherit;
  transition: all 0.2s;
  color: #555;
}

.category-btn:hover { border-color: #1a56db; color: #1a56db; }

.category-btn.active {
  background: #1a1a2e;
  color: white;
  border-color: #1a1a2e;
}

.tests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.test-card {
  background: white;
  padding: 1.8rem;
  border-radius: 2px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  border-top: 3px solid #1a56db;
}

.test-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.test-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
}

.test-header h3 {
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a2e;
  flex: 1;
}

.test-status {
  padding: 0.25rem 0.7rem;
  border-radius: 2px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}

.test-status.new { background: #e3f2fd; color: #1976d2; }
.test-status.in_progress { background: #fff3e0; color: #f57c00; }
.test-status.completed { background: #e8f5e9; color: #388e3c; }

.test-description {
  color: #666;
  font-size: 0.88rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  flex: 1;
}

.test-info {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 1rem;
  padding: 0.8rem;
  background: #f9fafb;
  border-radius: 2px;
}

.test-score { margin-bottom: 1rem; }

.test-score p { font-size: 0.88rem; color: #555; margin-bottom: 0.4rem; }

.progress-bar {
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #1a56db;
  transition: width 0.3s;
}

.test-start-btn {
  background: #1a1a2e;
  color: white;
  border: none;
  padding: 0.7rem;
  border-radius: 2px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: auto;
  font-family: inherit;
}

.test-start-btn:hover { background: #1a56db; }

@media (max-width: 768px) {
  .page-hero { justify-content: center; }
  .page-hero-card { margin: 1rem; max-width: 100%; }
  .tests-grid { grid-template-columns: 1fr; }
  .test-info { flex-wrap: wrap; gap: 0.5rem; }
}
</style>

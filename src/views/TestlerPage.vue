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
      <!-- Fakultet saýlamak -->
      <div class="selector-section">
        <div class="fakultet-tabs">
          <button
            v-for="f in fakultetler"
            :key="f.id"
            :class="['fak-btn', { active: selectedFakultet === f.id }]"
            @click="selectFakultet(f.id)"
          >
            <span class="fak-icon">{{ f.icon }}</span>
            <span class="fak-name">{{ f.name }}</span>
          </button>
        </div>
        <div class="kurs-tabs" v-if="selectedFakultet">
          <button
            v-for="k in kurslar"
            :key="k"
            :class="['kurs-btn', { active: selectedKurs === k }]"
            @click="selectedKurs = k"
          >
            {{ k }}-nji kurs
          </button>
        </div>
      </div>

      <div class="tests-grid" v-if="selectedFakultet && selectedKurs">
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
        <div v-if="filteredTests.length === 0" class="no-results">
          <p>Bu kurs üçin test tapylmady</p>
        </div>
      </div>

      <div v-if="!selectedFakultet" class="select-prompt">
        <p>Dowam etmek üçin fakultet saýlaň</p>
      </div>
      <div v-else-if="!selectedKurs" class="select-prompt">
        <p>Dowam etmek üçin kurs saýlaň</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'TestlerPage',
  data() {
    return {
      selectedFakultet: null,
      selectedKurs: null,
      fakultetler: [
        { id: 1, name: 'Kiberfizika', icon: '🤖' },
        { id: 2, name: 'Innowasiýa Ykdysadyýeti', icon: '💡' },
        { id: 3, name: 'Kompyuter Tehnologiýalary', icon: '💻' },
        { id: 4, name: 'Himiýa we Nano', icon: '🧪' },
        { id: 5, name: 'Biotehnologiýa', icon: '🧬' }
      ],
      kurslar: [1, 2, 3, 4],
      tests: [
        { id: 1,  fakultet: 2, kurs: 1, title: 'Fundamental of Marketing',    description: 'Marketing esaslary we strategiýalary',             questionCount: 25, duration: 35, difficulty: 'Orta',  status: 'new',         lastScore: null },
        { id: 2,  fakultet: 2, kurs: 1, title: 'Economics of Enterprise',      description: 'Kärhana ykdysadyýeti we dolandyryş',               questionCount: 30, duration: 45, difficulty: 'Kyn',   status: 'new',         lastScore: null },
        { id: 3,  fakultet: 1, kurs: 1, title: 'Physical Education',           description: 'Beden terbiýesi we sagdynlyk esaslary',            questionCount: 20, duration: 25, difficulty: 'Ýeňil', status: 'completed',   lastScore: 88   },
        { id: 4,  fakultet: 3, kurs: 1, title: 'Algebra',                      description: 'Algebranyň esasy düşünjeleri',                     questionCount: 28, duration: 40, difficulty: 'Orta',  status: 'in_progress', lastScore: 72   },
        { id: 5,  fakultet: 3, kurs: 2, title: 'Linear Algebra',               description: 'Çyzykly algebra we matrisalar',                    questionCount: 25, duration: 40, difficulty: 'Kyn',   status: 'new',         lastScore: null },
        { id: 6,  fakultet: 2, kurs: 2, title: 'Japanese',                     description: 'Ýapon elipbiýi we esasy sözler',                   questionCount: 35, duration: 45, difficulty: 'Kyn',   status: 'new',         lastScore: null },
        { id: 7,  fakultet: 2, kurs: 1, title: 'English Profession',           description: 'Iş üçin iňlis dili',                              questionCount: 30, duration: 40, difficulty: 'Orta',  status: 'completed',   lastScore: 85   },
        { id: 8,  fakultet: 3, kurs: 1, title: 'Information Technology',       description: 'Maglumat tehnologiýalary esaslary',                questionCount: 22, duration: 30, difficulty: 'Ýeňil', status: 'in_progress', lastScore: 78   },
        { id: 9,  fakultet: 2, kurs: 2, title: 'Microeconomics',               description: 'Mikroykdysadyýet we bazar ykdysadyýeti',           questionCount: 28, duration: 40, difficulty: 'Kyn',   status: 'new',         lastScore: null },
        { id: 10, fakultet: 1, kurs: 3, title: 'Scientific Research Methods',  description: 'Ylmy gözleg usullary we metodologiýa',             questionCount: 20, duration: 35, difficulty: 'Orta',  status: 'new',         lastScore: null },
        { id: 11, fakultet: 1, kurs: 2, title: 'Engineering Pedagogic',        description: 'Inženerçilik pedagogikasy esaslary',               questionCount: 24, duration: 35, difficulty: 'Kyn',   status: 'completed',   lastScore: 90   },
        { id: 12, fakultet: 3, kurs: 3, title: 'Mathematical Modeling',        description: 'Matematiki modelirleme we simulýasiýa usullary',   questionCount: 28, duration: 40, difficulty: 'Kyn',   status: 'new',         lastScore: null }
      ]
    }
  },
  computed: {
    filteredTests() {
      return this.tests.filter(t => t.fakultet === this.selectedFakultet && t.kurs === this.selectedKurs)
    }
  },
  methods: {
    selectFakultet(id) {
      this.selectedFakultet = id
      this.selectedKurs = null
    },
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

.selector-section { margin-bottom: 2rem; }

.fakultet-tabs {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
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

.kurs-tabs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 2px;
  border: 1px solid #eee;
}

.kurs-btn {
  padding: 0.45rem 1.1rem;
  border: 1px solid #ddd;
  background: white;
  border-radius: 2px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.88rem;
  font-weight: 600;
  color: #555;
  transition: all 0.2s;
}

.kurs-btn:hover { border-color: #1a56db; color: #1a56db; }
.kurs-btn.active { background: #1a56db; border-color: #1a56db; color: white; }

.select-prompt {
  text-align: center;
  padding: 4rem 2rem;
  color: #aaa;
  font-size: 1rem;
}

.no-results { text-align: center; padding: 3rem; color: #888; grid-column: 1/-1; }

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

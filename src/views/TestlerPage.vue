<template>
  <div class="testler-page">

    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="page-hero-overlay"></div>
      <div class="page-hero-card">
        <h1>Testler</h1>
        <p>Bilimiňizi barlaň we ösdüriň</p>
      </div>
    </section>

    <div class="page-container">
      <div class="selector-section">
        <div class="fakultet-tabs">
          <button
            v-for="f in fakultetler" :key="f.id"
            :class="['fak-btn', { active: selectedFakultet === f.id }]"
            @click="selectFakultet(f.id)"
          >
            <span class="fak-icon">{{ f.icon }}</span>
            <span class="fak-name">{{ f.name }}</span>
          </button>
        </div>
        <div class="kurs-tabs" v-if="selectedFakultet">
          <button
            v-for="k in kurslar" :key="k"
            :class="['kurs-btn', { active: selectedKurs === k }]"
            @click="selectKurs(k)"
          >
            {{ k }}-nji kurs
          </button>
        </div>
      </div>

      <!-- Dersler sanawy -->
      <div class="tests-grid" v-if="selectedFakultet && selectedKurs && !selectedDers">
        <div
          v-for="ders in filteredDersler" :key="ders.id"
          class="test-card"
          @click="selectedDers = ders"
        >
          <div class="test-header">
            <h3>{{ ders.title }}</h3>
            <span class="test-badge new">📚 {{ ders.topics.length }} tema</span>
          </div>
          <div class="test-meta">
            <span>⏱️ {{ ders.duration }} min / tema</span>
          </div>
          <button class="start-btn">▶ Açmak</button>
        </div>
        <div v-if="filteredDersler.length === 0" class="no-results">
          <p>Bu kurs üçin test tapylmady</p>
        </div>
      </div>

      <!-- Saýlanan dersiň temalary -->
      <div v-if="selectedDers" class="topics-section">
        <div class="topics-header">
          <button class="back-btn" @click="selectedDers = null">← Yza</button>
          <h2>{{ selectedDers.title }}</h2>
        </div>
        <div class="topics-list">
          <div v-for="topic in selectedDers.topics" :key="topic.testId" class="topic-row">
            <div class="topic-info">
              <span class="topic-num">{{ topic.num }}</span>
              <span class="topic-name">{{ topic.name }}</span>
            </div>
            <button class="topic-test-btn" @click="$router.push(`/test/${topic.testId}`)">
              📝 Testi geç
            </button>
          </div>
        </div>
      </div>

      <div v-if="!selectedFakultet" class="select-prompt"><p>Dowam etmek üçin fakultet saýlaň</p></div>
      <div v-else-if="!selectedKurs" class="select-prompt"><p>Dowam etmek üçin kurs saýlaň</p></div>
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
      selectedDers: null,
      fakultetler: [
        { id: 1, name: 'Kiberfiziki Ulgamlar Fakulteti', icon: '🤖' },
        { id: 2, name: 'Innowasiýalaryň Ykdysadyýeti Fakulteti', icon: '💡' },
        { id: 3, name: 'Kompýuter Ylymlary we Maglumat Tehnologiýalary Fakulteti', icon: '💻' },
        { id: 4, name: 'Himiki we Nanotehnologiýalar Fakulteti', icon: '🧪' },
        { id: 5, name: 'Biotehnologiýa we Ekologiýa Fakulteti', icon: '🧬' }
      ],
      kurslar: [1, 2, 3, 4],
      dersler: [
        {
          id: 12, fakultet: 3, kurs: 3,
          title: 'Mathematical Modeling',
          duration: 20,
          topics: [
            { num: 1,  name: 'Introduction to Mathematical Modeling',                        testId: 12 },
            { num: 2,  name: 'Objectives of the Modeling',                                   testId: 13 },
            { num: 3,  name: 'Formulation of the Problem. Mathematical Formulation',         testId: 14 },
            { num: 4,  name: 'The Stages of Modelling',                                      testId: 15 },
            { num: 5,  name: 'Basic Concepts of Operations Research',                        testId: 16 },
            { num: 6,  name: 'Tools, Techniques and Applications of Operations Research',    testId: 17 },
            { num: 7,  name: 'Introduction to Linear Programming',                           testId: 18 },
            { num: 8,  name: 'Linear Programming Problem and Model Formulation',             testId: 19 },
            { num: 9,  name: 'Graphical Solution of Linear Programming Problem',             testId: 20 },
            { num: 10, name: 'Types of Graphical Solution',                                  testId: 21 },
            { num: 11, name: 'Basics of Simplex Method',                                     testId: 22 },
            { num: 12, name: 'Simplex Method for Solving Linear Programming Problems',       testId: 23 },
            { num: 13, name: 'Transportation Problem',                                       testId: 24 },
            { num: 14, name: 'Basic Feasible Solution of a Transportation Problem',          testId: 25 },
            { num: 15, name: 'Modified Distribution Method',                                 testId: 26 }
          ]
        }
      ]
    }
  },
  computed: {
    filteredDersler() {
      return this.dersler.filter(d => d.fakultet === this.selectedFakultet && d.kurs === this.selectedKurs)
    }
  },
  methods: {
    selectFakultet(id) {
      this.selectedFakultet = id
      this.selectedKurs = null
      this.selectedDers = null
    },
    selectKurs(k) {
      this.selectedKurs = k
      this.selectedDers = null
    }
  }
}
</script>

<style scoped>
.testler-page { flex: 1; }
.page-hero { position: relative; min-height: 280px; display: flex; align-items: center; justify-content: flex-end; overflow: hidden; }
.page-hero-bg { position: absolute; inset: 0; background: url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1400&q=80') center/cover no-repeat; }
.page-hero-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.45); }
.page-hero-card { position: relative; z-index: 2; padding: 2.5rem; max-width: 480px; width: 90%; margin-right: 5%; }
.page-hero-card h1 { font-size: 2rem; font-weight: 800; color: #fff; margin: 0 0 0.5rem; text-shadow: 0 2px 12px rgba(0,0,0,0.4); }
.page-hero-card p { color: rgba(255,255,255,0.85); font-size: 1rem; text-shadow: 0 1px 6px rgba(0,0,0,0.4); }
.page-container { max-width: 1200px; margin: 0 auto; padding: 3rem 2rem; }
.selector-section { margin-bottom: 2rem; }
.fakultet-tabs { display: flex; gap: 0.8rem; flex-wrap: wrap; margin-bottom: 1rem; }
.fak-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.65rem 1.2rem; border: 2px solid #e0e0e0; background: white; border-radius: 2px; cursor: pointer; font-family: inherit; font-size: 0.9rem; font-weight: 600; color: #555; transition: all 0.2s; }
.fak-btn:hover { border-color: #1a56db; color: #1a56db; }
.fak-btn.active { background: #1a1a2e; border-color: #1a1a2e; color: white; }
.fak-icon { font-size: 1.1rem; }
.kurs-tabs { display: flex; gap: 0.5rem; flex-wrap: wrap; padding: 1rem; background: #f9fafb; border-radius: 2px; border: 1px solid #eee; }
.kurs-btn { padding: 0.45rem 1.1rem; border: 1px solid #ddd; background: white; border-radius: 2px; cursor: pointer; font-family: inherit; font-size: 0.88rem; font-weight: 600; color: #555; transition: all 0.2s; }
.kurs-btn:hover { border-color: #1a56db; color: #1a56db; }
.kurs-btn.active { background: #1a56db; border-color: #1a56db; color: white; }

/* Ders kartasy */
.tests-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
.test-card { background: white; padding: 1.8rem; border-radius: 2px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); display: flex; flex-direction: column; border-top: 3px solid #1a56db; transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; }
.test-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
.test-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.8rem; }
.test-header h3 { font-size: 1rem; font-weight: 700; color: #1a1a2e; flex: 1; }
.test-badge { padding: 0.25rem 0.7rem; border-radius: 2px; font-size: 0.75rem; font-weight: 600; white-space: nowrap; }
.test-badge.new { background: #e3f2fd; color: #1976d2; }
.test-meta { display: flex; gap: 1rem; font-size: 0.85rem; color: #888; margin-bottom: 1rem; padding: 0.8rem; background: #f9fafb; border-radius: 2px; }
.start-btn { background: #1a1a2e; color: white; border: none; padding: 0.7rem; border-radius: 2px; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: background 0.2s; margin-top: auto; font-family: inherit; }
.start-btn:hover { background: #1a56db; }

/* Temalar bölümi */
.topics-section { background: white; border-radius: 2px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); overflow: hidden; }
.topics-header { display: flex; align-items: center; gap: 1rem; padding: 1.2rem 1.5rem; border-bottom: 2px solid #1a56db; background: #f9fafb; }
.topics-header h2 { font-size: 1.1rem; font-weight: 700; color: #1a1a2e; margin: 0; }
.back-btn { background: white; border: 1px solid #ddd; padding: 0.4rem 1rem; border-radius: 2px; cursor: pointer; font-family: inherit; font-size: 0.88rem; font-weight: 600; color: #555; transition: all 0.2s; white-space: nowrap; }
.back-btn:hover { background: #1a1a2e; color: white; border-color: #1a1a2e; }
.topics-list { display: flex; flex-direction: column; }
.topic-row { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; border-bottom: 1px solid #f0f0f0; gap: 1rem; transition: background 0.15s; }
.topic-row:hover { background: #f5f7ff; }
.topic-row:last-child { border-bottom: none; }
.topic-info { display: flex; align-items: center; gap: 0.8rem; flex: 1; }
.topic-num { width: 28px; height: 28px; background: #1a56db; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.78rem; font-weight: 700; flex-shrink: 0; }
.topic-name { font-size: 0.92rem; font-weight: 600; color: #1a1a2e; }
.topic-test-btn { background: #1a56db; color: white; border: none; padding: 0.5rem 1.2rem; border-radius: 2px; font-size: 0.85rem; font-weight: 600; cursor: pointer; font-family: inherit; transition: background 0.2s; white-space: nowrap; flex-shrink: 0; }
.topic-test-btn:hover { background: #1d4ed8; }

.select-prompt { text-align: center; padding: 4rem 2rem; color: #aaa; font-size: 1rem; }
.no-results { text-align: center; padding: 3rem; color: #888; grid-column: 1/-1; }

@media (max-width: 768px) {
  .page-hero { justify-content: center; }
  .page-hero-card { margin: 1rem; max-width: 100%; }
  .tests-grid { grid-template-columns: 1fr; }
  .topic-row { flex-direction: column; align-items: flex-start; }
  .topic-test-btn { width: 100%; text-align: center; }
}
</style>

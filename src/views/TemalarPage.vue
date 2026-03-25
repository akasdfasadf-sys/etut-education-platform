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

        <!-- Kurs saýlamak -->
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

      <!-- Gözleg we süzgüç -->
      <div class="filter-section" v-if="selectedFakultet && selectedKurs">
        <input v-model="searchQuery" type="text" placeholder="Ders gözle..." class="search-input" />
      </div>

      <div class="subjects-grid" v-if="selectedFakultet && selectedKurs">
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
        <div v-if="filteredSubjects.length === 0" class="no-results">
          <p>Bu kurs üçin ders tapylmady</p>
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
  name: 'TemalarPage',
  data() {
    return {
      searchQuery: '',
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
      subjects: [
        { id: 1,  fakultet: 2, kurs: 1, name: 'Fundamental of Marketing',  category: 'Biznes',       icon: '📊', description: 'Marketing esaslary we strategiýalary',              lessonCount: 28, difficulty: 'orta' },
        { id: 2,  fakultet: 2, kurs: 1, name: 'Economics of Enterprise',    category: 'Ykdysadyýet',  icon: '🏢', description: 'Kärhana ykdysadyýeti we dolandyryş',              lessonCount: 32, difficulty: 'kyn'  },
        { id: 3,  fakultet: 1, kurs: 1, name: 'Physical Education',         category: 'Sport',        icon: '⚽', description: 'Beden terbiýesi we sagdynlyk',                   lessonCount: 20, difficulty: 'ýeňil'},
        { id: 4,  fakultet: 3, kurs: 1, name: 'Algebra',                    category: 'Matematika',   icon: '🔢', description: 'Algebranyň esasy düşünjeleri we deňlemeler',      lessonCount: 35, difficulty: 'orta' },
        { id: 5,  fakultet: 3, kurs: 2, name: 'Linear Algebra',             category: 'Matematika',   icon: '📐', description: 'Çyzykly algebra we matrisalar',                   lessonCount: 30, difficulty: 'kyn'  },
        { id: 6,  fakultet: 2, kurs: 2, name: 'Japanese',                   category: 'Diller',       icon: '🇯🇵', description: 'Ýapon dili we medeniýeti',                       lessonCount: 40, difficulty: 'kyn'  },
        { id: 7,  fakultet: 2, kurs: 1, name: 'English Profession',         category: 'Diller',       icon: '🇬🇧', description: 'Hünär üçin iňlis dili',                          lessonCount: 38, difficulty: 'orta' },
        { id: 8,  fakultet: 3, kurs: 1, name: 'Information',                category: 'Informatika',  icon: '💻', description: 'Maglumat tehnologiýalary esaslary',               lessonCount: 25, difficulty: 'ýeňil'},
        { id: 9,  fakultet: 2, kurs: 2, name: 'Microeconomics',             category: 'Ykdysadyýet',  icon: '💰', description: 'Mikroykdysadyýet nazaryýeti',                     lessonCount: 30, difficulty: 'kyn'  },
        { id: 10, fakultet: 1, kurs: 3, name: 'Scientific',                 category: 'Ylym',         icon: '🔬', description: 'Ylmy gözleg usullary',                           lessonCount: 22, difficulty: 'orta' },
        { id: 11, fakultet: 1, kurs: 2, name: 'Engineering Pedagogic',      category: 'Inženerçilik', icon: '⚙️', description: 'Inženerçilik pedagogikasy',                      lessonCount: 26, difficulty: 'kyn'  },
        { id: 12, fakultet: 3, kurs: 3, name: 'Mathematical Modeling',      category: 'Matematika',   icon: '📈', description: 'Matematiki modelirleme we simulýasiýa usullary',  lessonCount: 30, difficulty: 'kyn'  }
      ]
    }
  },
  computed: {
    filteredSubjects() {
      let list = this.subjects.filter(s => s.fakultet === this.selectedFakultet && s.kurs === this.selectedKurs)
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase()
        list = list.filter(s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q))
      }
      return list
    }
  },
  methods: {
    selectFakultet(id) {
      this.selectedFakultet = id
      this.selectedKurs = null
      this.searchQuery = ''
    },
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

.search-input:focus { border-color: #1a56db; }

.selector-section {
  margin-bottom: 2rem;
}

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

.fak-btn.active {
  background: #1a1a2e;
  border-color: #1a1a2e;
  color: white;
}

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

.kurs-btn.active {
  background: #1a56db;
  border-color: #1a56db;
  color: white;
}

.select-prompt {
  text-align: center;
  padding: 4rem 2rem;
  color: #aaa;
  font-size: 1rem;
}

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

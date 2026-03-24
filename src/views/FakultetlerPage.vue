<template>
  <div class="fakultetler-page">
    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="page-hero-overlay"></div>
      <div class="page-hero-card">
        <h1>Fakultetler</h1>
        <p>Uniwersitetimiziň fakultetleri we hünär ugurlary</p>
      </div>
    </section>
    <div class="page-container">
      <div class="fakultetler-grid">
        <div v-for="f in fakultetler" :key="f.id" class="fakultet-card">
          <div class="fakultet-top">
            <span class="fakultet-num">{{ f.id }}</span>
            <h3>{{ f.name }}</h3>
          </div>
          <p class="fakultet-desc">{{ f.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FakultetlerPage',
  data() {
    return {
      fakultetler: [
        {
          id: 1,
          name: 'Kiberfizika Ulgamlary Fakulteti',
          description: 'Fiziki we sanly ulgamlaryň birleşmesi esasynda akylly önümçilik, robot tehnikasy we kiberfiziki ulgamlary öwredýär.',
          hunarler: ['Kiberfiziki ulgamlar', 'Robot tehnikasy', 'Akylly önümçilik', 'Sensor tehnologiýalary'],
          departmentler: ['Kiberfiziki ulgamlar dep.', 'Awtomat dolandyryş dep.', 'Robot tehnikasy dep.'],
          studentCount: 760
        },
        {
          id: 2,
          name: 'Innowasiýalaryň Ykdysadyýeti Fakulteti',
          description: 'Innowasiýa ykdysadyýeti, sanly ykdysadyýet we tehnologiýa startaplary ugurlarynda hünärmenler taýýarlaýar.',
          hunarler: ['Innowasiýa dolandyryşy', 'Sanly ykdysadyýet', 'Startap we telekeçilik', 'Tehnologiýa marketingi'],
          departmentler: ['Innowasiýa ykdysadyýeti dep.', 'Sanly işewürlik dep.', 'Telekeçilik dep.'],
          studentCount: 680
        },
        {
          id: 3,
          name: 'Kompyuter Tehnologiýalary we Ylymlary Fakulteti',
          description: 'Programma üpjünçiligi, emeli intellekt, kiberhowpsuzlyk we maglumat ulgamlary ugurlarynda hünärmenler ýetişdirýär.',
          hunarler: ['Programma üpjünçiligi', 'Emeli intellekt', 'Kiberhowpsuzlyk', 'Maglumat ulgamlary'],
          departmentler: ['Kompyuter ylymlary dep.', 'Emeli intellekt dep.', 'Kiberhowpsuzlyk dep.'],
          studentCount: 920
        },
        {
          id: 4,
          name: 'Himiýa we Nanotehnologiýa Fakulteti',
          description: 'Himiýa ylymlary we nanotehnologiýa ugurlarynda täze materiallary we önümçilik usullaryny öwredýär.',
          hunarler: ['Organiki himiýa', 'Nanomateriallar', 'Himiýa inženerçiligi', 'Täze materiallar'],
          departmentler: ['Himiýa ylymlary dep.', 'Nanotehnologiýa dep.', 'Himiýa inženerçiligi dep.'],
          studentCount: 540
        },
        {
          id: 5,
          name: 'Biotehnologiýa Fakulteti',
          description: 'Biologiýa we tehnologiýanyň birleşmesi esasynda lukmançylyk, oba hojalygy we daşky gurşaw ugurlarynda hünärmenler taýýarlaýar.',
          hunarler: ['Molekulýar biologiýa', 'Lukmançylyk biotehnologiýasy', 'Oba hojalygy biotehnologiýasy', 'Ekologik biotehnologiýa'],
          departmentler: ['Biotehnologiýa dep.', 'Molekulýar biologiýa dep.', 'Amaly biotehnologiýa dep.'],
          studentCount: 490
        }
      ]
    }
  }
}
</script>

<style scoped>
.fakultetler-page { flex: 1; }

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
  background: url('../../public/GRdztOEULoKdCGQydRuZmAUzn0e.jpg') center/cover no-repeat;
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

.fakultetler-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.5rem;
}

.fakultet-card {
  background: white;
  border-radius: 2px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 1.8rem;
  border-top: 3px solid #1a56db;
  transition: transform 0.2s, box-shadow 0.2s;
}

.fakultet-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.fakultet-top {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
}

.fakultet-num {
  width: 32px;
  height: 32px;
  background: #1a56db;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  flex-shrink: 0;
}

.fakultet-top h3 {
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.3;
}

.fakultet-desc {
  color: #666;
  font-size: 0.88rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.divider {
  width: 100%;
  height: 1px;
  background: #eee;
  margin-bottom: 1rem;
}

.fakultet-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.fakultet-cols h4 {
  font-size: 0.8rem;
  font-weight: 700;
  color: #1a56db;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
}

.fakultet-cols ul {
  list-style: none;
  padding: 0;
}

.fakultet-cols ul li {
  font-size: 0.82rem;
  color: #555;
  padding: 0.2rem 0;
  border-bottom: 1px solid #f0f0f0;
  line-height: 1.4;
}

.fakultet-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.82rem;
  color: #888;
  padding-top: 0.8rem;
  border-top: 1px solid #f0f0f0;
}

@media (max-width: 768px) {
  .page-hero { justify-content: center; }
  .page-hero-card { margin: 1rem; max-width: 100%; }
  .fakultetler-grid { grid-template-columns: 1fr; }
  .fakultet-cols { grid-template-columns: 1fr; }
}
</style>

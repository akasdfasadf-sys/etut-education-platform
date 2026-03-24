<template>
  <div class="subject-detail-page">

    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="page-hero-overlay"></div>
      <div class="page-hero-card">
        <h1>{{ subject.name }}</h1>
        <p>{{ subject.description }}</p>
      </div>
    </section>

    <div class="page-container">
      <h2 class="topics-title">Temalar</h2>
      <div class="topics-list">
        <div v-for="(topic, i) in subject.topics" :key="i" class="topic-item">
          <div class="topic-header" @click="toggle(i)">
            <span class="topic-name">{{ i + 1 }}. {{ topic.name }}</span>
            <span class="topic-arrow" :class="{ open: openIndex === i }">&#8964;</span>
          </div>
          <div class="topic-body" v-if="openIndex === i">
            <iframe
              v-if="topic.pdf"
              :src="topic.pdf"
              class="pdf-viewer"
              frameborder="0"
            ></iframe>
            <p v-else class="no-pdf">PDF faýl heniz goşulmady.</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
const subjectsData = {
  12: {
    name: 'Mathematical Modeling',
    description: 'Matematiki modelirleme we simulýasiýa usullary',
    topics: [
      { name: 'Introduction to Mathematical Modeling', pdf: '/pdfs/46.pdf' },
      { name: 'Objectives of the Modeling', pdf: '/pdfs/Modelling_multiple_objectives_of_land_us.pdf' },
      { name: 'Formulation of the Problem. Mathematical Formulation', pdf: '/pdfs/FeynmanQED.pdf' },
      { name: 'The Stages of Modelling', pdf: '/pdfs/main.pdf' },
      { name: 'Basic Concepts of Operations Research', pdf: '/pdfs/New_Emphasis_on_Real_Applications.pdf' },
      { name: 'Tools, Techniques and Applications of Operations Research', pdf: '/pdfs/97862098dc07c4efeeb193f4962f7690c790.pdf' },
      { name: 'Introduction to Linear Programming', pdf: '/pdfs/LinearProgramming.pdf' },
      { name: 'Linear Programming Problem and Model Formulation', pdf: '/pdfs/Mixed_Integer_Linear_Programming_Formula.pdf' },
      { name: 'Graphical Solution of Linear Programming Problem', pdf: '/pdfs/AD0607024.pdf' },
      { name: 'Types of Graphical Solution', pdf: '/pdfs/31295004770920.pdf' },
      { name: 'Basics of Simplex Method', pdf: '/pdfs/87252.88081.pdf' },
      { name: 'Simplex Method for Solving Linear Programming Problems', pdf: '/pdfs/Simplex_Method_For_Solving_Linear_Progra.pdf' },
      { name: 'Transportation Problem', pdf: '/pdfs/munkres.pdf' },
      { name: 'Basic Feasible Solution of a Transportation Problem', pdf: '/pdfs/apam-v1n2-12.pdf' },
      { name: 'Modified Distribution Method', pdf: '/pdfs/A_Modified_Newton_Method_for_Radial_Dist.pdf' }
    ]
  }
}

export default {
  name: 'SubjectDetailPage',
  data() {
    return {
      openIndex: null,
      subject: { name: '', description: '', topics: [] }
    }
  },
  mounted() {
    const id = parseInt(this.$route.params.id)
    this.subject = subjectsData[id] || { name: 'Ders tapylmady', description: '', topics: [] }
  },
  methods: {
    toggle(i) {
      this.openIndex = this.openIndex === i ? null : i
    }
  }
}
</script>

<style scoped>
.subject-detail-page { flex: 1; }

.page-hero {
  position: relative;
  min-height: 220px;
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
  background: rgba(0,0,0,0.5);
}

.page-hero-card {
  position: relative;
  z-index: 2;
  background: transparent !important;
  box-shadow: none !important;
  padding: 2.5rem;
  max-width: 480px;
  width: 90%;
  margin-right: 5%;
}

.page-hero-card h1 {
  font-size: 2rem;
  font-weight: 800;
  color: #fff !important;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 12px rgba(0,0,0,0.4);
}

.page-hero-card p {
  color: rgba(255,255,255,0.85) !important;
  font-size: 0.95rem;
  text-shadow: 0 1px 6px rgba(0,0,0,0.4);
}

.page-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.topics-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid #1a56db;
  display: inline-block;
}

.topics-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.topic-item {
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
}

.topic-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.2rem;
  cursor: pointer;
  background: #fff;
  transition: background 0.2s;
  user-select: none;
}

.topic-header:hover { background: #f5f7ff; }

.topic-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #1a1a2e;
}

.topic-arrow {
  font-size: 1.4rem;
  color: #1a56db;
  transition: transform 0.3s;
  line-height: 1;
}

.topic-arrow.open { transform: rotate(180deg); }

.topic-body {
  border-top: 1px solid #e0e0e0;
  background: #fafafa;
}

.pdf-viewer {
  width: 100%;
  height: 600px;
  display: block;
}

.no-pdf {
  padding: 1.5rem;
  color: #888;
  font-size: 0.9rem;
  text-align: center;
}

@media (max-width: 768px) {
  .page-hero { justify-content: center; }
  .page-hero-card { margin: 1rem; max-width: 100%; }
  .pdf-viewer { height: 400px; }
}
</style>

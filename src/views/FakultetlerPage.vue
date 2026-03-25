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
      <!-- Fakultet tablary -->
      <div class="fak-tabs">
        <button
          v-for="f in fakultetler"
          :key="f.id"
          :class="['fak-tab', { active: openId === f.id }]"
          @click="toggleFakultet(f.id)"
        >
          <span class="fak-tab-num">{{ f.id }}</span>
          {{ f.name }}
        </button>
      </div>

      <!-- Saýlanan fakultetiň maglumaty -->
      <div class="fak-detail-panel" v-if="selected">
        <div class="fak-panel-header">
          <h2>{{ selected.name }}</h2>
          <p>{{ selected.description }}</p>
        </div>
        <h3 class="hunar-section-title">Hünärler</h3>
        <div class="hunar-grid">
          <div v-for="h in selected.hunarler" :key="h.name" class="hunar-card">
            <span class="hunar-card-name">{{ h.name }}</span>
            <p class="hunar-card-desc">{{ h.desc }}</p>
          </div>
        </div>
      </div>

      <div v-else class="select-prompt">
        <p>Maglumat görmek üçin fakultet saýlaň</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FakultetlerPage',
  data() {
    return {
      openId: null,
      fakultetler: [
        {
          id: 1,
          name: 'Kiberfiziki Ulgamlar Fakulteti',
          description: 'Kiberfiziki ulgamlar fakultetinde jemi 7 sany hünär bolup, olara Awtomatlaşdyrmak we dolandyrmak, Häzirkizaman tehnologiýalaryň fizikasy, Mehatronika we robot tehnikasy, Sanly ykdysadyýetiň tehnologiýasy, Elektronika we nanoelektronika, Biolukmançylyk elektronikasy, Maglumatlary goramagyň tehniki serişdeleri hünärleri degişlidir. Kiberfiziki ulgamlar fakulteti kiberfiziki ulgamlaryň dürli ugurlary boýunça talyplary bakalawr derejede taýýarlaýar. Kiberfiziki ulgamlar fiziki we hasaplaýyş elementlerini öz içine alyp daşky gurşaw bilen yzygiderli täsirleşýän, ondan maglumat alýan we dolandyryş amallaryny oňat şekilde ulanýan çylşyrymly ulgamlardyr.',
          hunarler: [
            { name: 'Awtomatlaşdyrmak we dolandyrmak', desc: 'Ölçeg, kadalaşdyrmak, gözegçilik, enjamlary awtomatlaşdyrmak, programma üpjünçiligini we enjam ulgamlaryny döretmek, şeýle hem maglumat tehnologiýasy we tehniki goldaw, şeýle hem gurnamak, sazlamak, synag etmek, işe girizmek, işlemek we abatlamak boýunça hünärmenler öz enjamlar, biziň ýurdumyzdaky elektronika pudagy üçin hünärmenleri taýýarlamak bilen meşgullanýar.' },
            { name: 'Häzirkizaman tehnologiýalaryň fizikasy', desc: 'Hünärmenler häzirki zaman tehnologiýalaryny we enjamlaryny ulanyp, nanotehnologiýa, biotehnologiýa, maglumat we aň-bilim tehnologiýalary boýunça taslamalary işläp düzmek, dolandyrmak we durmuşa geçirmek bilen meşgullanýar.' },
            { name: 'Mehatronika we robot tehnikasy', desc: 'Mehaniki we robot ulgamlary boýunça hünärmenler (zawodlarda, programma bilen dolandyrylýan enjamlar, pilotsyz ulaglar üçin ofis enjamlary, senagat, gurluşyk, öý we beýleki robotlar) maglumat-elektromehaniki, elektro-gidrawlik, elektron we mikroprosessor komponentlerini ösdürýärler.' },
            { name: 'Sanly ykdysadyýetiň tehnologiýalary', desc: 'Hünärmenler sanly tehnologiýalara (Big Data, AI, Blockchain, IoT), ýokary derejeli sanly platformalara, täze kärhanalara esaslanýan taslamalary taýýarlaýarlar we durmuşa geçirýärler, modeller ýasamak bilen meşgullanýarlar.' },
            { name: 'Elektronika we nanoelektronika', desc: 'Hünärmenler dürli elektron enjamlary (wakuum, plazma, mikrotolkun, suwuk kristal, optiki, kwant, mikro we nanoelektronika) önümçilik tehnologiýasyny ösdürmek bilen meşgullanýar.' },
            { name: 'Biolukmançylyk elektronikasy', desc: 'Tehniki işgärler biomedikal programmalarda ulanylýan elektron enjamlaryny döretmek, ulanmak, hyzmat etmek we işlemek bilen meşgullanýar.' },
            { name: 'Maglumatlary goramagyň tehniki serişdeleri', desc: 'Hünärmenler maglumatlaryň ýitmeginiň, ogurlanmagynyň, bikanun ulanylmagynyň, maglumat howpsuzlygyny üpjün etmegiň, şeýle hem biometrik tehnologiýalara (barmak yzy, ýüz, göz, el geometriýasy, ses tanamak) we kesgitlemek we iş usullaryna esaslanýan enjamlary ösdürýärler we durmuşa geçirýärler.' }
          ]
        },
        {
          id: 2,
          name: 'Innowasiýalaryň Ykdysadyýeti Fakulteti',
          description: 'Innowasiýalaryň ykdysadyýeti fakultetinde jemi 6 sany hünär bolup, olara Işgärleri dolandyryş, Innowasion ykdysadyýet, Innowasion menejment we halkara işewürligi, Tehnologiýa işewürligi, Filologiýa (tehniki iňlis dili we ýapon dili), Kompýuter lingwistikasy hünärleri degişlidir. Ýurdumyz üçin ýene-de möhüm bolan ugurlar täze tehnologiýalary önümlige ornaşdyrmak, innowasiýalaryň ykdysadyýeti, adam gorlaryny dolandyrmak we bilimleriň ykdysadyýetidir.',
          hunarler: [
            { name: 'Innowasion ykdysadyýet', desc: 'Hünärmenler innowasion önümçiligini guramak, innowasiýalary döretmek, olary ornaşdyrmak we durmuşa geçirmek, innowasion işinde töwekgelçiligi dolandyrmak, innowasion işini maliýeleşdirmek, innowasion önümlerini marketing, "akylly ýöriteledşirme" usuly boýunça welaýatlary ösdürmek, seljermek bilen meşgullanýar.' },
            { name: 'Innowasion menejment we halkara işewürligi', desc: 'Hünärmenler kärhananyň halkara derejesinde strategiki ýagdaýyna yzygiderli seljermek we baha bermek, halkara bilelikdäki kärhanalaryn täze usullaryny döretmek we işini kämilleşdirmek, dünýä bazarynda innowasion önümleri we baha strategiýalaryny ösdürmek, marketing gözlegleri we derňewleri geçirmek.' },
            { name: 'Tehnologiýa işewürligi', desc: 'Hünärmenler innowasion önümleri öndürmek üçin tehnologiýalary we zerur meýilnamalary taýýarlaýarlar, şeýle hem olaryň ýerine ýetirilişine gözegçilik edýärler, önümçiligi dolandyryýarlar, kärhananyň ykdysadyýeti we maliýe işleri, maliýe dolandyryşy we maslahat beriş, hil dolandyryşy, satuw, tehnologiki senagat marketingi we tehnologiýa taslamalaryny dolandyrmak işlerini tapýar.' },
            { name: 'Işgärleri dolandyryş', desc: 'Hünärmenler zähmet bazarynda bolup geçýän üýtgeşmeleri seljeriýärler we oňaýly netijeleri çykarýarlar, biziň ýurdumyz üçin zerur hünärmenleri anyk kesgitleýärler, işçileri saýlaýarlar we dolandyrýarlar, işlerini optimallaşdyrmak strategiýalaryny düzýärler we işçileriň mümkinçiliklerini kesgitleýärler.' },
            { name: 'Filologiýa (tehniki iňlis dili we ýapon dili)', desc: 'Hünärmenler maglumat tehnologiýalary, tehnika, tehnologiýa we inženerçilik ulgamlarynda, maşyn gurluşykda, howa ýollary gullugynda we dürli ugurly önümçilik kärhanalarynda ylmy-tehniki dil bilen baglanşykly wezipeleri ýerine ýetirmek, şeýle hem ýurdumyzyň orta mekdeplerinde hem-de başlangyç we orta hünär okuw mekdeplerinde taýýarlygyň ugryna laýyklylykda mugallymçylyk işini amala aşyrmak ýaly işler bilen meşgullanýar.' },
            { name: 'Kompýuter lingwistikasy', desc: 'Hünärmenler häzirki zaman kompýuter tehnologiýalarynyň, matematiki modelleriň, akylly algoritmleriň hem-de programmirlemegiň kömegi bilen, belli bir diliň maglumatlaryny seljermek we onuň lingwistik işjeňligini modelirlemek, şeýle hem tebigy diliň awtomatlaşdyrylan ýagdaýda işlenmegi (gözleg ulgamlary, awtomatlaşdyrylan ýa-da akylly terjime we ş.m.) bilen baglanşykly programmalary döretmek, ýurdumyzda sanly ykdysadyýeti ornaşdyrmak, ony dolandyrmak hem-de döredilen ulgamlary, programmalary durmuşa ornaşdyrmak we olary ulanmak ýaly işler bilen meşgullanýar.' }
          ]
        },
        {
          id: 3,
          name: 'Kompýuter Ylymlary we Maglumat Tehnologiýalary Fakulteti',
          description: 'Kompýuter ylymlary we maglumat tehnologiýalary fakultetinde jemi 8 sany hünär bolup, olara Amaly matematika we informatika (inženerler üçin matematika), Informatika we hasaplaýyş tehnikasy, Maglumat ulgamlary we tehnologiýalary, Sanly infrastruktura we kiberhowpsuzlyk, Mobil we tor inžiniring, Animasiýa we grafika dizaýny, Emeli aň we ekspert ulgamy, Kartografiýa we geoinformatika hünärleri degişlidir. Kompýuter ylymlary we maglumat tehnologiýalary fakulteti Türkmenistanyň Oguz han adyndaky Inžener we tehnologiýalar uniwersitetiniň iň uly fakultetleriniň biridir.',
          hunarler: [
            { name: 'Maglumat ulgamlary we tehnologiýalary', desc: 'Maglumat ulgamynyň hünärmenleri ykdysadyýetiň dürli pudaklary üçin maglumatlary ýygnamak, goramak, üýtgetmek we işlemek üçin kompýuter programmalaryny we tehnologiýalaryny ösdürýärler.' },
            { name: 'Informatika we hasaplaýyş tehnikasy', desc: 'Hünärmenler kompýuterleri we kompýuter tehnologiýalaryny döretmek, elektronikasyny öwrenmek, ähli pudaklarda täze pudaklary awtomatlaşdyrmak, maglumat we awtomatlaşdyrylan ulgamlar üçin programma üpjünçiligi we enjamlar bilen üpjün etmek we özara baglanşygy döretmek bilen meşgullanýar.' },
            { name: 'Sanly infrastruktura we kiberhowpsuzlyk', desc: 'Hünärmenler ýurtda sanly infrastrukturany döretmek we durmuşa geçirmek, biometrika, kriptografiýa we maglumatlary goramak programma üpjünçiligi ýaly kiberhowpsuzlyk tehnologiýalaryny ösdürmek we ulanmak bilen meşgullanýar.' },
            { name: 'Mobil we tor inžiniring', desc: 'Hünärmenler ykjam we tor tehnologiýalaryny (5G, NGEN, Wi-Fi) ýurdumyzdaky kärhanalaryn sanly infrastrukturasyna ornaşdyrmak, şeýle hem ykjam aragatnaşyk ulgamlary (Android / IOS) üçin dürli görnüşli programma üpjünçiligini döretmek bilen meşgullanýar.' },
            { name: 'Animasiýa we grafika dizaýny', desc: 'Hünärmenler animasiýa, grafika, 3D oýun oýnamak, 2D we 3D programma üpjünçiligini işläp düzmek, wideo we fotosurat, içerki we daşarky dizaýn bilen meşgullanýar.' },
            { name: 'Emeli aň we ekspert ulgamy', desc: 'Emeli intellekt we hünärmen ulgamlary boyunça hünärmenler emeli intellekt tehnologiýalaryna, maşyn öwrenmäge we çuňňur öwrenmäge esaslanýan akylly ulgamlary döredýärler, algoritmleri we programma üpjünçiligini ösdürýärler, taýýarlanan programma üpjünçiligini barlaýarlar, kämilleşdirýärler we düzedýärler, modelleri, algoritmleri we başlangyç maglumatlary döredýärler we dolandyrýarlar.' },
            { name: 'Kartografiýa we geoinformatika', desc: 'Hünärmenler, emeli hemralardan, uçarlardan we pilotsyz uçarlardan alnan suratlara esaslanýp, belli bir ýer bölekleri baradaky maglumatlary ýygnamak, guramak we işlemek arkaly tematiki kartalaryň we atlaslaryn elektron görnüşlerini döredýärler we bu elektron kartalar ykdysadyýetiň dürli pudaklarynda ulanylar (logistika, nawigasiýa, ýer kadastr we ş.m.).' },
            { name: 'Amaly matematika we informatika', desc: 'Hünärmenler ykdysadyýetde we in engineeringenerçilikde matematiki usullary ulanmagy, täze matematiki usullary ulanyp, ýurtda sanly ykdysadyýet tehnologiýalaryny ösdürmek we ornaşdyrmak bilen baglanşykly meseleleri çözmegi, maliýe bazaryny matematiki taýdan seljermegi, in engineeringenerçilik modellerini işläp düzmegi we yzygiderli derňemegi öwrenýärler.' }
          ]
        },
        {
          id: 4,
          name: 'Himiki we Nanotehnologiýalar Fakulteti',
          description: 'Himiki tehnologiýa, himiki inžiniring, nanomateriallar, materiallary öwrenmek we täze materiallaryň tehnologiýasy taýýarlygynyň ugurlary boýunça bakalawrlary taýýarlaýan uniwersitetiň bölümidir. Fakultet himiki önümleri öndürýän senagat pudaklarynyň tehnologiýasyny işläp düzmäge, şol senagatda ulanylýan enjamlaryň taslamasyny işläp taýýarlamaga, materiallaryň, nanomateriallaryň himiki we fiziki häsiýetlerini öwrenmäge we gerekli häsiýetleri özünde jemleýän täze materiallary işläp düzmäge hemde dizaýn etmäge ukyply talyplary taýýarlamaga jogapkärdir.',
          hunarler: [
            { name: 'Himiki tehnologiýalar', desc: 'Hünärmenler organiki we organiki däl maddalar, gurluşyk, metal we polimer materiallar, minerallar, nebit we gaz gaýtadan işleýän önümler üçin ýerli çig mallardan tehnologiýalary ösdürmek bilen meşgullanýar.' },
            { name: 'Himiki inžiniring', desc: 'Hünärmenler himiki zawodlary, ösümlikleri dizaýn etmegi we işlemegi, ýerli çig maldan import edilýän ornuny tutyanlary we dünýäde bäsdeşlige ukyply himiki serişdeleri nädip öndürmelidigini öwrenýärler.' },
            { name: 'Nanomateriallar', desc: 'Hünärmenler ýerli çig maldan nanomateriallary döretmek, olaryň häsiýetlerini öwrenmek we ykdysadyýetiň we senagatyň, gün energiýasynyň we elektronika pudagynyň ähli pudaklary üçin senagat amaly tehnologiýalaryny ösdürmek bilen meşgullanýar.' },
            { name: 'Materiallary öwrenmek we täze materiallaryň tehnologiýasy', desc: 'Hünärmenler ykdysadyýetiň we senagatyň ähli pudaklary üçin ýerli çig maldan täze ýokary öndürijiliki materiallary döretmek, olaryň häsiýetlerini öwrenmek we senagatda ulanmak üçin tehnologiýalary ösdürmek bilen meşgullanýar.' }
          ]
        },
        {
          id: 5,
          name: 'Biotehnologiýa we Ekologiýa Fakulteti',
          description: 'Ýurdumyzyň dürli klimat we ekologiýa aýratynlyklary, çöllük, dagly, takyrly, subtropik, deňiz, derýa ýaly ekologik zolaklaryň bolmagy giň möçberli gaýtalanmaýan biologik dürliligini emele getirýär. Şu nukdaýnazardan, häzirki wagtda fakultetimizde 5 sany ugur bolup olara Öýjük we molekulýar biologiýa, Mikrobiologiýa, Genetika we bioinžiniring, Biotehnologiýa, Ekologiýa we tebigatdan peýdalanmak ugurlary boýunça bakalawrlar taýýarlanylýar.',
          hunarler: [
            { name: 'Biotehnologiýa', desc: 'Hünärmenler haýwan we ösümlik öýjüklerini, mikroorganizmleri, wiruslary, fermentleri öwrenýärler, dürli maddalary olardan izolirlemek we önümçilikde ulanmak tehnologiýalaryny ösdürýärler. Bu önümler azyk, derman we dokma senagatynda, oba hojalygy, suw we balykçylyk, lukmançylyk, energiýa we beýleki pudaklarda ulanylar.' },
            { name: 'Öýjük we molekulýar biologiýa', desc: 'Hünärmenler öýjügiň esasy görnüşlerini we aýratynlyklaryny, fiziologiýasyny, organellerini we olaryň funksýalaryny, öýjügiň daşky gurşaw bilen gatnaşygyny, ýaşaýyş siklini, bölünişini, ölümini we molekulýar gurluşyny öwrenýärler.' },
            { name: 'Mikrobiologiýa', desc: 'Hünärmenler giň ýaýran kesellere garşy göreş, fermentasiýa usullaryna esaslanýan täze iýmitleri we önümçilik önümlerini döretmek, tebigatda tapylan mikroorganizmleri we olaryň ösümliklere, haýwanlara, adamlara we tebigata edýän täsirlerini üns bilen öwrenmek arkaly daşky gurşawyň ýagdaýyna gözegçilik etmek bilen meşgullanýar.' },
            { name: 'Genetika we bioinžiniring', desc: 'Genetika we bioineringenerçilik kanunlaryny we in engineeringenerçilik usullaryny ulanyp, hünärmenler özüne çekiji, gymmatly, ykdysady taýdan arzan görnüşleri, görnüşleri, haýwanlaryň, ösümlikleriň we mikroorganizmleriň gibridlerini döretmek bilen meşgullanýar.' },
            { name: 'Ekologiýa we tebigatdan peýdalanmak', desc: 'Hünärmenler ekologiýa taýdan arassa, howadan arassa, galyndysyz, dürli pudaklarda energiýa we material tygşytlaýjy tehnologiýalary ösdürmek bilen meşgullanýar.' }
          ]
        }
      ]
    }
  },
  computed: {
    selected() {
      return this.fakultetler.find(f => f.id === this.openId) || null
    }
  },
  methods: {
    toggleFakultet(id) {
      this.openId = this.openId === id ? null : id
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

.fak-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 2rem;
}

.fak-tab {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.7rem 1.3rem;
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

.fak-tab:hover { border-color: #1a56db; color: #1a56db; }

.fak-tab.active {
  background: #1a1a2e;
  border-color: #1a1a2e;
  color: white;
}

.fak-tab-num {
  width: 24px;
  height: 24px;
  background: #1a56db;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.78rem;
  font-weight: 700;
  flex-shrink: 0;
}

.fak-tab.active .fak-tab-num { background: rgba(255,255,255,0.25); }

.fak-detail-panel {
  background: white;
  border-radius: 2px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 2rem;
  border-top: 3px solid #1a56db;
}

.fak-panel-header {
  margin-bottom: 1.8rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid #eee;
}

.fak-panel-header h2 {
  font-size: 1.3rem;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.fak-panel-header p {
  color: #666;
  font-size: 0.92rem;
  line-height: 1.7;
}

.hunar-section-title {
  font-size: 0.8rem;
  font-weight: 700;
  color: #1a56db;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
}

.hunar-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}

.hunar-card {
  padding: 1.1rem 1.2rem;
  background: #f9fafb;
  border-left: 3px solid #1a56db;
  border-radius: 0 2px 2px 0;
}

.hunar-card-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a1a2e;
  display: block;
  margin-bottom: 0.4rem;
}

.hunar-card-desc {
  font-size: 0.83rem;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.select-prompt {
  text-align: center;
  padding: 4rem 2rem;
  color: #aaa;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .page-hero { justify-content: center; }
  .page-hero-card { margin: 1rem; max-width: 100%; }
  .fakultetler-grid { grid-template-columns: 1fr; }
  .fakultet-cols { grid-template-columns: 1fr; }
}
</style>

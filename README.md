# ETUT.EDU.TM - Onlaýn Bilim Platformasy

Vue.js 3 arkaly döredilen onlaýn bilim platformasy.

## Aýratynlyklar

- 🏠 **Baş sahypa** - Platformanyň esasy sahypasy
- 📚 **Temalar** - Dürli ugurlarda dersler we temalar
- ✍️ **Testler** - Interaktiw synaglar we testler
- 👥 **Biz barada** - Platforma we topar barada maglumat
- 📱 **Responsive dizaýn** - Ähli enjamlar üçin laýyk
- 🍔 **Hamburger menýu** - Ykjam enjamlar üçin
- 🎨 **Owadan UI/UX** - etut.edu.tm stilinde

## Gurluş

```
vue-education-project/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── NavbarComponent.vue     # Navigasiýa we hamburger menýu
│   │   └── FooterComponent.vue     # Footer komponenti
│   ├── views/
│   │   ├── HomePage.vue            # Baş sahypa
│   │   ├── TemalarPage.vue         # Temalar sahypasy
│   │   ├── TestlerPage.vue         # Testler sahypasy
│   │   └── BizBaradaPage.vue       # Biz barada sahypasy
│   ├── router/
│   │   └── index.js                # Vue Router konfigurasiýasy
│   ├── App.vue                     # Esasy komponent
│   └── main.js                     # Giriş nokady
├── package.json
└── README.md
```

## Gurnamak

```bash
# Dependensiýalary gurnamak
npm install

# Ösüş režiminde işletmek
npm run serve

# Production üçin build etmek
npm run build
```

## Tehnologiýalar

- **Vue.js 3** - Progressive JavaScript framework
- **Vue Router 4** - Official router
- **CSS3** - Modern styling with gradients and animations
- **Responsive Design** - Mobile-first approach

## Aýratynlyklar

### Baş sahypa
- Hero seksiýa owadan gradient bilen
- Platformanyň aýratynlyklary
- Statistika görkeziji
- CTA (Call-to-Action) seksiýasy

### Temalar
- Dersler boýunça filter
- Gözleg funksiýasy
- Kategoriýa boýunça saýlama
- Her dersiň jikme-jik maglumaty

### Testler
- Kategoriýa boýunça testler
- Test statusy (Täze, Dowam edýär, Tamamlanan)
- Soňky netijeleriň görnüşi
- Interaktiw başlama düwmeleri

### Biz barada
- Platforma barada maglumat
- Missiýa we gymmatlyklarymyz
- Topar agzalary
- Habarlaşmak maglumaty

## Ösüş üçin

Programmany ösüşine üçin aşakdaky faýllary üýtgedip bilersiňiz:

- `src/views/` - Täze sahypalary goşmak
- `src/components/` - Täze komponentleri döretmek
- `src/router/index.js` - Täze route-lary goşmak

## Liseniýa

Bu proýekt talyp maksatly döredildi.
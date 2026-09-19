# DevFolio Pro — Professional Developer Portfolio

> គេហទំព័រផលប័ត្រអ្នកអភិវឌ្ឍន៍វិជ្ជាជីវៈ (Production-Ready Developer Portfolio)
> Built with **React 19**, **Vite**, **Tailwind CSS**, **Framer Motion**, and **Netlify Forms**.

---

## 🌟 លក្ខណៈពិសេសសំខាន់ៗ (Key Features)

- 🎨 **Dark / Light Theme System**: Default modern dark mode with persistent user choice via `localStorage` and system media query sync.
- ⚡ **Lightning Fast Performance**: Powered by Vite and React 19 for optimal Core Web Vitals and sub-second loading.
- 📱 **Fully Responsive Layout**: Pixel-perfect presentation across mobile (320px, 375px, 425px), tablet (768px), and large desktop displays (1024px, 1440px, 1920px).
- 🧩 **Centralized Portfolio Architecture**: All content is cleanly managed inside `src/data/portfolio.ts`.
- 📁 **Filterable Projects Gallery**: Dynamic category filters (All, React, Laravel, Full Stack, Web, App) with animated transitions.
- 🛡️ **Netlify Forms Integration**: Fully configured `<form name="contact" method="POST" data-netlify="true">` with client-side validation and feedback states.
- 📄 **Interactive Resume Modal & Download**: In-browser printable and downloadable CV representation.
- 🔍 **Production SEO & Structured Data**: OpenGraph cards, Twitter Cards, meta descriptions, and Schema.org JSON-LD structured data.

---

## 🛠️ បច្ចេកវិទ្យាដែលបានប្រើប្រាស់ (Tech Stack)

- **Frontend**: React 19, TypeScript
- **Bundler & Tooling**: Vite
- **Styling**: Tailwind CSS v4
- **Animation**: Motion (Framer Motion)
- **Icons**: Lucide React
- **Hosting & Forms**: Netlify / Cloud Run

---

## 🚀 ការដំឡើង និងការអភិវឌ្ឍន៍ (Getting Started)

### 1. ការដំឡើង Dependencies (Install)
```bash
npm install
```

### 2. ដំណើរការសម្រាប់ការអភិវឌ្ឍន៍ (Run Development Server)
```bash
npm run dev
```
បើកកម្មវិធីរុករក (Browser) របស់អ្នកនៅ `http://localhost:3000`។

### 3. បង្កើតសម្រាប់ផលិតកម្ម (Production Build)
```bash
npm run build
```
កូដដែលបានបង្កើតនឹងស្ថិតនៅក្នុងថត `dist/`។

### 4. មើលជាមុននៃការបង្កើត (Preview Production Build)
```bash
npm run preview
```

---

## 🌐 ការដាក់ពង្រាយទៅកាន់ Netlify (Deploying to Netlify)

1. **រុញគម្រោងទៅកាន់ GitHub (Push to GitHub)**:
   ```bash
   git init
   git add .
   git commit -m "feat: initial DevFolio Pro portfolio commit"
   git branch -M main
   git remote add origin https://github.com/your-username/devfolio-pro.git
   git push -u origin main
   ```

2. **បើក Netlify (Open Netlify)**:
   - ចូលទៅកាន់ [https://app.netlify.com](https://app.netlify.com)
   - ចុចលើ **Add new site** > **Import an existing project**

3. **ភ្ជាប់ទៅ GitHub (Connect GitHub)**:
   - ជ្រើសរើស GitHub និងស្វែងរក Repository `devfolio-pro` របស់អ្នក។

4. **កំណត់ការកំណត់រចនាសម្ព័ន្ធសាងសង់ (Build Settings)**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

5. **ចុច Deploy Site**:
   - `netlify.toml` ត្រូវបានកំណត់រចនាសម្ព័ន្ធរួចជាស្រេចសម្រាប់ Single Page Application routing (`/*` -> `/index.html`) និង Netlify Forms handling។

---

## ⚙️ ការកំណត់អថេរបរិស្ថាន (Environment Variables)

ចម្លង `.env.example` ទៅជា `.env`:
```bash
cp .env.example .env
```

អថេរដែលមាន៖
```env
VITE_SITE_URL="https://devfolio-pro.netlify.app"
VITE_CONTACT_EMAIL="v4udevelop.app@gmail.com"
```

---

## 📝 អាជ្ញាប័ណ្ណ (License)
MIT © 2026 Alex Rivera / DevFolio Pro

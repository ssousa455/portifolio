# Portfolio + CMS Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Convert portifolio.html into a modern Astro site powered by cms-core (admin panel, plugins, blog system).

**Architecture:** All portfolio sections become Astro components under `src/components/portfolio/`, data comes from `src/data/portfolio.json`, blog posts from `astro:content`. The Walker theme layout wraps everything.

**Tech Stack:** Astro 5, React 18, Tailwind CSS 3, Bootstrap 5, cms-core CMS

---

### Task 1: Create portfolio data file

**Files:**
- Create: `src/data/portfolio.json`

- [ ] **Step 1: Write portfolio.json**

Write `src/data/portfolio.json` with all portfolio data:

```json
{
  "hero": {
    "title": "Automação & Tecnologia",
    "subtitle": "Analista de TI • Especialista em Automação • Gestão de Operações",
    "description": "8+ anos transformando processos complexos em soluções elegantes. Especialista em n8n, Python, IA generativa e otimização de operações. Código limpo, resultados mensuráveis.",
    "photoUrl": "https://i.ibb.co/nNwmGQHn/foto-curriculo.png",
    "buttons": [
      { "label": "Ver GitHub", "url": "https://github.com/ssousa455", "style": "primary" },
      { "label": "Falar Comigo", "url": "#contato", "style": "secondary" }
    ]
  },
  "stats": [
    { "value": "8+", "label": "Anos de Experiência" },
    { "value": "50+", "label": "Projetos Entregues" },
    { "value": "15k+", "label": "Corridas 4.9★" },
    { "value": "24/7", "label": "Aprendizado Contínuo" }
  ],
  "projects": [
    {
      "title": "edge-tts-gui",
      "lang": "Python",
      "description": "Interface gráfica simplificada para Edge TTS (Text-to-Speech da Microsoft). Converte texto em áudio natural com vozes de alta qualidade.",
      "url": "https://github.com/ssousa455/edge-tts-gui",
      "updated": "Atualizado recentemente"
    },
    {
      "title": "Concurseiro-Pro",
      "lang": "TypeScript",
      "description": "Sistema completo de gestão de estudos para concursos públicos. Focado em resolução de questões, acompanhamento de desempenho e metas.",
      "url": "https://github.com/ssousa455/Concurseiro-Pro",
      "updated": "Atualizado recentemente"
    },
    {
      "title": "video_dubbing_agent_colab",
      "lang": "Jupyter",
      "description": "Pipeline completo de dublagem automatizada para vídeos. Qualquer idioma → qualquer idioma usando IA e clonagem de voz.",
      "url": "https://github.com/ssousa455/video_dubbing_agent_colab",
      "updated": "Atualizado recentemente"
    },
    {
      "title": "mente-foco",
      "lang": "TypeScript",
      "description": "Sistema de controle de estudos com técnicas de produtividade e foco. Timer Pomodoro integrado e gamificação.",
      "url": "https://github.com/ssousa455/mente-foco",
      "updated": "Atualizado recentemente"
    },
    {
      "title": "ai_voice_dubbing",
      "lang": "Python",
      "description": "Suite de ferramentas para dublagem com IA. Processamento de áudio em lote, sincronização labial e manutenção de características vocais originais.",
      "url": "https://github.com/ssousa455/ai_voice_dubbing",
      "updated": "Atualizado em Abril"
    }
  ],
  "skills": [
    {
      "category": "Automação & IA",
      "items": ["n8n", "Make", "Claude Code", "ChatGPT API", "RAG", "LLMs", "Prompt Engineering"]
    },
    {
      "category": "Desenvolvimento",
      "items": ["Python", "TypeScript", "SQL", "HTML/CSS", "Git", "GitHub", "Google Colab"]
    },
    {
      "category": "Dados & BI",
      "items": ["Power BI", "Excel Avançado", "MS SQL Server", "PostgreSQL", "Análise de Dados"]
    },
    {
      "category": "Infra & Suporte",
      "items": ["Help Desk N1/N2", "Windows/Linux", "Redes", "WordPress", "SEO", "CRM"]
    }
  ],
  "contact": {
    "title": "Vamos Trabalhar Juntos?",
    "description": "Estou disponível para oportunidades de Analista de TI, Automação ou Gestão de Operações. Também aceito projetos freelance de consultoria.",
    "links": [
      { "icon": "envelope", "label": "Email", "url": "mailto:sergio.r.sousa@email.com" },
      { "icon": "linkedin", "label": "LinkedIn", "url": "https://linkedin.com/in/ssousa455" },
      { "icon": "github", "label": "GitHub", "url": "https://github.com/ssousa455" },
      { "icon": "whatsapp", "label": "(84) 99656-2202", "url": "https://wa.me/5584996562202" }
    ]
  },
  "seo": {
    "name": "Sérgio Sousa | Automação & TI",
    "description": "Portfólio de Sérgio Sousa — Analista de TI especializado em automação, Python, IA generativa e otimização de operações.",
    "url": "https://ssousa455.vercel.app"
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/data/portfolio.json
git commit -m "feat: add portfolio data file"
```

---

### Task 2: Create Hero component

**Files:**
- Create: `src/components/portfolio/Hero.astro`

- [ ] **Step 1: Write Hero.astro**

```astro
---
import { readData } from '../../lib/readData';
const portfolio = readData('portfolio.json');
const hero = portfolio.hero;
---

<section class="hero" style="background: var(--walker-dark); padding: 80px 0;">
  <div class="container-xl">
    <div class="row align-items-center">
      <div class="col-lg-7">
        <h1 style="font-family: var(--walker-font-heading); font-size: 3rem; font-weight: 700; color: #fff; line-height: 1.2; margin-bottom: 1rem;">
          {hero.title.split('<br>').length > 1 ? hero.title.split('<br>').map((part, i) => <span>{part}{i < hero.title.split('<br>').length - 1 ? <br/> : ''}</span>) : hero.title}
          <br><span style="color: var(--walker-primary);">Tecnologia</span>
        </h1>
        <p style="font-size: 1.25rem; color: rgba(255,255,255,0.7); margin-bottom: 1.5rem;">{hero.subtitle}</p>
        <p style="color: rgba(255,255,255,0.6); font-size: 1.1rem; margin-bottom: 2rem; max-width: 600px;">{hero.description}</p>
        <div class="d-flex gap-3 flex-wrap">
          {hero.buttons.map(btn => (
            <a href={btn.url} class={btn.style === 'primary' ? 'btn btn-primary btn-lg' : 'btn btn-outline-light btn-lg'} target={btn.url.startsWith('http') ? '_blank' : undefined}>
              {btn.label}
            </a>
          ))}
        </div>
      </div>
      <div class="col-lg-5 text-center mt-4 mt-lg-0">
        <img src={hero.photoUrl} alt="Sérgio Sousa" style="width: 280px; height: 280px; border-radius: 50%; object-fit: cover; border: 4px solid var(--walker-primary); box-shadow: 0 0 40px rgba(59,130,246,0.3);" />
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/portfolio/Hero.astro
git commit -m "feat: add Hero component"
```

---

### Task 3: Create Stats component

**Files:**
- Create: `src/components/portfolio/Stats.astro`

- [ ] **Step 1: Write Stats.astro**

```astro
---
import { readData } from '../../lib/readData';
const portfolio = readData('portfolio.json');
const stats = portfolio.stats;
---

<section style="background: var(--walker-dark); border-top: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1); padding: 48px 0;">
  <div class="container-xl">
    <div class="row text-center">
      {stats.map(stat => (
        <div class="col-6 col-lg-3 mb-3 mb-lg-0">
          <h3 style="font-family: var(--walker-font-heading); font-size: 2.5rem; font-weight: 700; color: var(--walker-primary); margin-bottom: 0.5rem;">{stat.value}</h3>
          <p style="color: rgba(255,255,255,0.6); font-size: 0.95rem;">{stat.label}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/portfolio/Stats.astro
git commit -m "feat: add Stats component"
```

---

### Task 4: Create Projects component

**Files:**
- Create: `src/components/portfolio/Projects.astro`

- [ ] **Step 1: Write Projects.astro**

```astro
---
import { readData } from '../../lib/readData';
const portfolio = readData('portfolio.json');
const projects = portfolio.projects;
---

<section style="padding: 80px 0;">
  <div class="container-xl">
    <div class="section-header" style="margin-bottom: 48px;">
      <h2 style="font-family: var(--walker-font-heading); font-size: 2rem; font-weight: 700;">Projetos Recentes</h2>
      <p style="color: var(--text-secondary, #6c757d);">Repositórios ativos no GitHub. Código funcionando, não só teoria.</p>
    </div>
    <div class="row g-4">
      {projects.map(project => (
        <div class="col-md-6 col-lg-4">
          <div class="card h-100 border-0 shadow-sm" style="border-radius: 12px; transition: transform 0.2s, border-color 0.2s;">
            <div class="card-body d-flex flex-column">
              <div class="d-flex justify-content-between align-items-start mb-3">
                <h3 class="h5" style="font-family: var(--walker-font-heading); font-weight: 600;">
                  <a href={project.url} target="_blank" style="color: inherit; text-decoration: none;">{project.title}</a>
                </h3>
                <span class="badge bg-light text-dark">{project.lang}</span>
              </div>
              <p class="card-text text-muted flex-grow-1" style="font-size: 0.95rem;">{project.description}</p>
              <div class="d-flex justify-content-between align-items-center mt-3">
                <small class="text-muted">{project.updated}</small>
                <a href={project.url} target="_blank" class="fw-semibold" style="color: var(--walker-primary); text-decoration: none;">Ver código →</a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/portfolio/Projects.astro
git commit -m "feat: add Projects component"
```

---

### Task 5: Create Skills component

**Files:**
- Create: `src/components/portfolio/Skills.astro`

- [ ] **Step 1: Write Skills.astro**

```astro
---
import { readData } from '../../lib/readData';
const portfolio = readData('portfolio.json');
const skills = portfolio.skills;
---

<section style="padding: 80px 0; background: #f8f9fa;">
  <div class="container-xl">
    <div class="section-header" style="margin-bottom: 48px;">
      <h2 style="font-family: var(--walker-font-heading); font-size: 2rem; font-weight: 700;">Stack Tecnológico</h2>
      <p style="color: var(--text-secondary, #6c757d);">Ferramentas que uso diariamente para entregar resultados.</p>
    </div>
    <div class="row g-4">
      {skills.map(cat => (
        <div class="col-md-6 col-lg-3">
          <div class="card h-100 border-0 shadow-sm" style="border-radius: 12px;">
            <div class="card-body">
              <h3 style="font-family: var(--walker-font-heading); font-size: 1.1rem; font-weight: 600; color: var(--walker-primary); margin-bottom: 1rem;">{cat.category}</h3>
              <div class="d-flex flex-wrap gap-2">
                {cat.items.map(skill => (
                  <span class="badge bg-light text-dark px-3 py-2" style="font-size: 0.85rem; font-weight: 500; border-radius: 6px;">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/portfolio/Skills.astro
git commit -m "feat: add Skills component"
```

---

### Task 6: Create Contact component

**Files:**
- Create: `src/components/portfolio/Contact.astro`

- [ ] **Step 1: Write Contact.astro**

```astro
---
import { readData } from '../../lib/readData';
const portfolio = readData('portfolio.json');
const contact = portfolio.contact;

const iconMap = {
  envelope: 'fa-envelope',
  linkedin: 'fa-linkedin-in',
  github: 'fa-github',
  whatsapp: 'fa-whatsapp'
};
---

<section id="contato" style="padding: 80px 0; background: var(--walker-dark);">
  <div class="container-xl text-center" style="max-width: 800px;">
    <h2 style="font-family: var(--walker-font-heading); font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 1rem;">{contact.title}</h2>
    <p style="color: rgba(255,255,255,0.6); margin-bottom: 2rem;">{contact.description}</p>
    <div class="d-flex justify-content-center gap-3 flex-wrap">
      {contact.links.map(link => (
        <a href={link.url} target="_blank" class="btn btn-light btn-lg px-4 py-3 d-flex align-items-center gap-2" style="border-radius: 8px;">
          <i class={`fab ${iconMap[link.icon] || 'fa-link'}`}></i>
          <span>{link.label}</span>
        </a>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/portfolio/Contact.astro
git commit -m "feat: add Contact component"
```

---

### Task 7: Rewrite home page (index.astro)

**Files:**
- Modify: `src/pages/index.astro` (replace entire content)

- [ ] **Step 1: Write new index.astro**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';
import Hero from '../components/portfolio/Hero.astro';
import Stats from '../components/portfolio/Stats.astro';
import Projects from '../components/portfolio/Projects.astro';
import Skills from '../components/portfolio/Skills.astro';
import Contact from '../components/portfolio/Contact.astro';

const posts = (await getCollection('blog')).sort(
  (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
);
const latestPosts = posts.slice(0, 3);

function formatDate(date: Date) {
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}
---

<BaseLayout title="Sérgio Sousa | Automação & TI" description="Portfólio de Sérgio Sousa — Analista de TI especializado em automação, Python, IA generativa e otimização de operações.">

  <Hero />
  <Stats />

  <!-- Projects -->
  <Projects />

  <!-- Blog -->
  <section id="blog" style="padding: 80px 0; background: #f8f9fa;">
    <div class="container-xl">
      <div class="section-header" style="margin-bottom: 48px;">
        <h2 style="font-family: var(--walker-font-heading); font-size: 2rem; font-weight: 700;">Últimas Publicações</h2>
        <p style="color: var(--text-secondary, #6c757d);">Insights sobre automação, IA e produtividade.</p>
      </div>
      <div class="row g-4">
        {latestPosts.map(post => (
          <div class="col-md-6 col-lg-4">
            <article class="card h-100 border-0 shadow-sm" style="border-radius: 12px; overflow: hidden;">
              <div class="card-body p-4">
                {post.data.category && (
                  <span class="badge bg-primary bg-opacity-10 text-primary mb-2">{post.data.category}</span>
                )}
                <h3 class="h5" style="font-family: var(--walker-font-heading); font-weight: 600;">
                  <a href={`/blog/${post.slug}`} style="color: inherit; text-decoration: none;">{post.data.title}</a>
                </h3>
                {post.data.description && (
                  <p class="card-text text-muted small mt-2">{post.data.description}</p>
                )}
                <p class="text-muted small mt-3 mb-0">{formatDate(post.data.pubDate)}</p>
              </div>
            </article>
          </div>
        ))}
      </div>
      {posts.length > 3 && (
        <div class="text-center mt-4">
          <a href="/blog" class="btn btn-primary btn-lg">Ver Todos os Posts</a>
        </div>
      )}
    </div>
  </section>

  <Skills />
  <Contact />

</BaseLayout>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: rewrite home page with portfolio sections + blog"
```

---

### Task 8: Update site config

**Files:**
- Modify: `src/data/siteConfig.json`

- [ ] **Step 1: Update siteConfig.json**

```json
{
  "name": "Sérgio Sousa | Automação & TI",
  "description": "Portfólio de Sérgio Sousa — Analista de TI especializado em automação, Python, IA generativa e otimização de operações.",
  "url": "https://ssousa455.vercel.app",
  "author": "Sérgio Sousa",
  "language": "pt-BR",
  "logo": "",
  "theme": {
    "primary": "#3B82F6",
    "accent": "#6366F1",
    "font": "inter",
    "dark": "#0f172a"
  },
  "social": {
    "instagram": "",
    "twitter": "",
    "facebook": "",
    "pinterest": "",
    "youtube": ""
  },
  "contact": {
    "email": "sergio.r.sousa@email.com",
    "phone": "5584996562202",
    "address": "",
    "name": "Sérgio Sousa"
  },
  "legal": {
    "terms_last_updated": "",
    "privacy_last_updated": ""
  },
  "phone": "5584996562202",
  "address": ""
}
```

- [ ] **Step 2: Commit**

```bash
git add src/data/siteConfig.json
git commit -m "chore: update site config for Sergio"
```

---

### Task 9: Rename portifolio.html, create .env, install deps and test

**Files:**
- Modify: `portifolio.html` → `index.html` (backup)
- Create: `.env` (from `.env.example`)

- [ ] **Step 1: Rename portifolio.html to index.html (backup)**

```bash
Rename-Item portifolio.html index.html
```

- [ ] **Step 2: Copy .env.example to .env**

```bash
Copy-Item .env.example .env
```

- [ ] **Step 3: Install dependencies and test build**

```bash
npm install
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "chore: rename portifolio, add env, install deps"
```

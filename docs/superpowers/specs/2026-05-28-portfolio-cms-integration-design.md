# Portfolio + CMS Integration Design

## Objective
Integrate the existing portfolio HTML design (`portifolio.html`) into the `cms-core` Astro framework, preserving the Walker CMS infrastructure (admin panel, plugins, blog) while adapting the portfolio content as components.

## Architecture

### Page Structure
| Route | Source | Description |
|---|---|---|
| `/` | New `src/pages/index.astro` | Home page with Hero, Stats, Projects, Skills, Contact sections |
| `/blog` | Existing `src/pages/blog/` | Blog post listing (from CMS) |
| `/blog/[slug]` | Existing `src/pages/blog/[slug].astro` | Individual blog post |
| `/admin/*` | Existing `src/pages/admin/` | Admin panel (28 pages, untouched) |
| `/api/*` | Existing `src/pages/api/` | API routes (15 routes, untouched) |
| `/categoria/[slug]` | Existing `src/pages/categoria/` | Category listing |
| `/sobre`, `/contato`, `/privacidade` | Existing static pages | Static content pages |

### Components to Create
All in `src/components/portfolio/`:

1. **Hero.astro** — Profile photo, title "Automação & Tecnologia", subtitle, description, CTA buttons (GitHub + Contato)
2. **Stats.astro** — 4 stat cards (8+ anos, 50+ projetos, 15k+ Corridas, 24/7 Aprendizado)
3. **Projects.astro** — Grid of project cards with data driven from JSON (linked to real GitHub repos)
4. **Skills.astro** — Category grid (Automação & IA, Desenvolvimento, Dados & BI, Infra & Suporte) with skill tags
5. **Contact.astro** — Contact links (Email, LinkedIn, GitHub, WhatsApp) with icons

### Data Flow
- Projects, skills, and contact info stored in `src/data/portfolio.json` (following CMS pattern)
- Blog posts fetched via `astro:content` `getCollection('blog')` — top 3 shown on home
- Walker layout (header, sidebar, footer, IG feed) wraps all pages unchanged

### Files Modified
- `src/pages/index.astro` — Replace existing with portfolio sections
- `src/data/siteConfig.json` — Update with Sergio's info (name, URL, social)

### Files NOT Modified
- `src/pages/admin/` — Untouched
- `src/pages/api/` — Untouched
- `src/pages/blog/` — Untouched
- `src/plugins/` — Untouched
- `src/layouts/BaseLayout.astro` — Untouched
- `src/lib/` — Untouched
- `src/middleware.ts` — Untouched

### Deploy
- Vercel via `@astrojs/vercel` (already configured)
- Env vars: `ADMIN_SECRET`, `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`
- No build changes needed

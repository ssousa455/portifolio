# Portfólio — Sérgio Sousa

Portfólio pessoal + blog integrado ao CMS [cms-core](https://github.com/arthurguedes375/cms-core).

## Stack

- **Framework:** Astro 5
- **CMS:** cms-core (admin, posts, plugins)
- **Estilo:** Bootstrap 5 + Tailwind CSS
- **Deploy:** Vercel (via GitHub Actions)

## Estrutura

```
src/
├── components/portfolio/   # Hero, Stats, Projects, Skills, Contact
├── content/blog/           # Posts do blog (Markdown)
├── data/                   # portfolio.json, menu.json, siteConfig.json, etc.
├── layouts/                # BaseLayout (tema Walker)
├── pages/
│   ├── index.astro         # Home (portfólio + últimos posts)
│   ├── blog/               # Listagem de posts
│   ├── admin/              # Painel CMS
│   └── [slug].astro        # Posts individuais
└── lib/                    # readData, blogRoutes, etc.
```

## Desenvolvimento

```bash
bun install
bun run dev
```

## Deploy

O Vercel detecta automaticamente pushes na branch `main`.

## Senha admin

Configurar a variável `ADMIN_SECRET` no `.env` do Vercel.

# faketri33.github.io

Personal engineering portfolio of Dmitriy Vilkov. React 19, Vite and Tailwind CSS 3, deployed to GitHub Pages
by `.github/workflows/deploy.yml` on every push to `main`.

The site is bilingual (English and Russian). The language comes from `?lang=`, then the saved choice, then the
browser language.

## Features

- Light and dark theme (follows the system, switch with the moon button or `D`), saved in the browser.
- Seasonal snowfall (`S` toggles it; the layer rests while scrolling). Planned: sakura petals in spring.
- Language switch EN/RU (`L`).
- "Save as PDF" prints the page with a dedicated print layout: about two A4 pages with the resume,
  projects and contacts. The language and theme of the printout follow the page language.
- Interactive restart-policy simulation in the Engineering section (try `help` in its console).

## Commands

```bash
npm ci          # install
npm run dev     # local dev server
npm run lint    # ESLint
npm run build   # production build into dist/
npm run preview # serve dist/ locally
```

## Where things live

| Path | What it holds |
| --- | --- |
| `src/styles/tokens.css` | Design tokens: colour, type scale, spacing, layout constants |
| `tailwind.config.js` | Maps the Tailwind theme onto those tokens |
| `src/index.css` | Base styles and component styles |
| `src/i18n/en.js`, `src/i18n/ru.js` | All visible text, one file per language, identical structure |
| `src/data/projects.js` | Language-neutral project facts: links, stacks, images |
| `src/components/` | Page sections (Hero, Resume, Work, Engineering, Contact); `visuals/` holds the diagrams and tables used in projects and notes |

## Editing content

- Change text in **both** `src/i18n/en.js` and `src/i18n/ru.js`; the two files must keep the same keys.
- Add a project: add its text under `work.items` in both language files, add an entry to `PROJECTS` in
  `src/data/projects.js`, and add a visual in `src/components/visuals/` if it needs one.
- Add a language: create `src/i18n/<code>.js`, register it in `src/i18n/content.js`.
- Change colours or type: edit `src/styles/tokens.css` only.

Fonts (Onest and IBM Plex Mono, both with Cyrillic) are self-hosted through `@fontsource` packages, so the site
makes no requests to third-party font servers.

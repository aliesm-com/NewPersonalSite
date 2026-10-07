# Ali Esmaeili — Cinematic Portfolio

A portable Astro + React + TypeScript portfolio, based on the dark study design. All content pages are generated as static HTML. Astro's `ClientRouter` provides client-side navigation and transitions between those pages. This is a static-first site with an SPA navigation experience; it does not require a Node server in production.

## Run

Node.js 22.12+ is required. The supplied lockfile pins the dependency tree.

```sh
npm ci
npm run dev
```

Open the URL printed by Astro (port 4173 by default).

```sh
npm run check
npm run build
npm run audit:build
npm run preview
```

Deploy the contents of `dist/` to any static host. Deep URLs are physical folders containing `index.html`; no SPA catch-all rewrite is required. The custom 404 page is `dist/404.html`. Do not redirect every unknown URL to the home page.

Set `SITE_URL` in `.env` before a production build. `.env.example` uses `https://aliesm.com`. The variable controls canonical URLs, the sitemap, and social metadata. The managed preview is built with its own origin.

## Where to edit

| Content                                             | Source                       |
| --------------------------------------------------- | ---------------------------- |
| Name, email, CV, navigation, skills, experience     | `src/data/site.ts`           |
| Projects and case studies                           | `src/content/projects/*.md`  |
| Podcasts, descriptions, platform links and episodes | `src/content/podcasts/*.md`  |
| Lab project names and links                         | `src/content/lab/*.md`       |
| Typography, colors, spacing and breakpoints         | `src/styles/global.css`      |
| Shared header, footer and metadata                  | `src/layouts/Layout.astro`   |
| Optimized images                                    | `public/images/`             |
| CV download                                         | `public/Ali-Esmaeili-CV.pdf` |

The collection schemas in `src/content.config.ts` validate frontmatter at build time. The filename becomes the URL slug. New project categories appear automatically in the React filter. Change navigation in `site.ts` when adding a completely new section.

## Add a project

Create `src/content/projects/my-project.md`:

```md
---
title: My Project
summary: A concise description of the actual project.
category: Backend
order: 4
image: study-interior
tags: [Python, PostgreSQL]
role: Your role
context: Organization or project context
featured: true
contributions:
  - A specific contribution
---

## The problem

Write the case study here. Add as many Markdown sections as needed.
```

Rebuild. `/projects/my-project/` is generated automatically and the project appears in the directory. Set `featured: true` to include it on the homepage. External project links are optional; add a Markdown link in the case-study body if needed.

## Add a podcast or episodes

Copy one of the files in `src/content/podcasts/`. Keep `image` equal to an optimized image basename, and assign an `order`.

Real listening URLs and audio files have deliberately not been invented. Until they are supplied, the podcast pages provide their introductions and topics without fake players. When ready, add:

```yaml
listenUrl: https://your-real-podcast-page.example
episodes:
  - title: Your real episode title
    description: A short introduction.
    audioSrc: /audio/your-episode.mp3
    url: https://your-real-episode-page.example
```

Put local audio in `public/audio/`, or use an HTTPS audio URL. `preload="none"` prevents audio downloads before interaction. Use files you have permission to publish. Omitting `audioSrc` gives an episode with an external link only. No audio files are bundled in this version.

## Images and performance

The UI mockups are not used as full-page screenshots. Text, headings, navigation, project cards and forms are HTML/CSS, with three clean photographic backgrounds underneath.

- Three shared scenes are reused across routes and cached by the browser.
- Each has 640, 1024 and 1600 pixel versions in AVIF and WebP.
- `<picture>` and `srcset` let the browser select a suitable format and size.
- The visible background loads eagerly at high priority. Lower images load lazily.
- The original large PNGs are not shipped to the browser or included in this source archive.
- Fonts are self-hosted WOFF2 with `font-display: swap`; no remote font requests.
- React hydrates only the project filter and contact form. The homepage and other content pages have no React islands.
- There is no video background, WebGL engine, animation library, analytics tracker, or third-party embed.
- Reduced-motion preferences are respected. Header navigation, content and direct email links work without JavaScript; project filtering and the email composer enhance that baseline when JavaScript is available.

To optimize a new background, create an ignored `assets-originals/` folder, add an image named like `new-scene.png`, then run:

```sh
npm run assets:optimize
```

Set `image: new-scene` in a project or podcast. The script generates all responsive versions. Keep important subjects toward the right if the image sits behind left-aligned text. For an art-direction change, regenerate or edit the clean source image, then optimize it; do not flatten the website UI into the image.

Measured image sizes and reduction percentages are in `docs/image-budget.json`. The build audit checks local links, page headings, document titles, image-size limits and the absence of React hydration on the homepage. `docs/build-report.json` records output sizes; its JavaScript total is the sum of every route's chunks, not a claim about the initial homepage transfer.

## Contact

The contact form opens the visitor's email app with an encoded draft. It does not send email from the server or claim successful delivery. To add direct delivery later, replace the submit handler with your own endpoint and proper server-side validation and rate limiting.

## Architecture

`src/pages/` → Astro routes and static generation

`src/layouts/` → shared shell, SEO metadata, client router

`src/components/` → reusable Astro visuals and two React islands

`src/content/` → Markdown content, separated from rendering

`src/data/` → typed site-wide data

`scripts/` → asset optimization, static-output audit, source packaging

For a future Django/API content source, replace the content collection loaders with build-time remote loaders or add a typed data adapter. Rebuild after content changes to update the SSG output. Add an Astro server adapter only if future requirements truly need server rendering or server endpoints.

## Scope and verification

13 HTML pages are generated including the 404 page, plus `sitemap.xml` and `robots.txt`. Resume content supplies the employment history and named projects. Project illustrations are conceptual environments, not screenshots of the actual products. Lab descriptions and repository URLs have not been invented.

Type/content checking, production compilation and static link/asset auditing are included. Full browser interaction and visual QA were not available in the build environment, so no Lighthouse score or cross-browser certification is claimed. Review the mobile layout and your real podcast links before a public launch.

See `README.fa.md` for a concise Persian guide.

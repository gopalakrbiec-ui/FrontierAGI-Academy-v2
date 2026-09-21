# FrontierAGI Academy v2

A curriculum-first rebuild of FrontierAGI Academy. It preserves the existing 105-article library while adding guided learning paths, searchable discovery, progress tracking, accessibility controls, editorial standards, reusable layouts, validation and automated GitHub Pages deployment.

## Local development

```bash
npm install
npm run sync
npm run dev
```

`npm run sync` imports the published content from `gopalakrbiec-ui/FrontierAGI-Academy` and places the preserved v1 experience under `public/archive`.

## Quality checks

```bash
npm run validate
npm run build
```

## Architecture

- Astro static output—no application server required
- Five curriculum paths derived from the existing article metadata
- Client-side library search, filtering, sorting and local progress tracking
- Reusable page shell and design system
- Reduced-motion support and keyboard-visible focus states
- Automated sitemap and GitHub Pages deployment
- Content validation and documented editorial requirements

See [`docs/CONTENT_MODEL.md`](docs/CONTENT_MODEL.md) for the migration target for future articles.

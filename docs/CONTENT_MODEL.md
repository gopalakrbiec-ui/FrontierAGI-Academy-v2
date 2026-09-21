# Content model

Every new article should provide:

- `title`, `slug`, `excerpt`, `author`, and reviewer
- publication date and last verified date
- reading time, difficulty, learning path, and prerequisites
- learning outcomes
- primary sources for consequential factual claims
- uncertainty and omissions notes
- correction history and AI-assistance disclosure

The current v1 manifest is imported by `npm run sync`. During migration, legacy HTML is preserved under `public/archive` so no existing article disappears.

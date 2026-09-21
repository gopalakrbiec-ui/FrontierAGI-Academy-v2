export const paths = [
  { id: 'foundations', icon: '◉', title: 'AI Foundations', description: 'Build the mathematical and conceptual base for modern machine learning.', tags: ['AI Research', 'Architecture', 'Research'], keywords: ['foundations', 'neural', 'mathematical', 'learning theory', 'transformer'], level: 'Beginner → Graduate', color: 'cyan' },
  { id: 'engineering', icon: '⌘', title: 'LLM Engineering', description: 'Move from model concepts to reliable systems, agents, evaluation and infrastructure.', tags: ['Infrastructure', 'Applied AI', 'AI Agents'], keywords: ['engineering', 'rag', 'agent', 'kernel', 'distributed', 'production'], level: 'Graduate → Practitioner', color: 'violet' },
  { id: 'research', icon: '∆', title: 'Frontier Research', description: 'Study reasoning, world models, alignment, interpretability and recursive improvement.', tags: ['Deep Research', 'AGI Safety', 'Alignment', 'Interpretability'], keywords: ['rsi', 'reasoning', 'world model', 'alignment', 'benchmark'], level: 'Graduate → Researcher', color: 'rose' },
  { id: 'builder', icon: '◇', title: 'AI Builder', description: 'Learn how frontier products, teams, laboratories and companies are built.', tags: ['Startups', 'Team Building', 'Careers', 'Founder Playbook'], keywords: ['startup', 'founding', 'team', 'financial', 'career'], level: 'Builder → Founder', color: 'amber' },
  { id: 'landscape', icon: '◎', title: 'AI Landscape', description: 'Understand laboratories, model lineages, geopolitics, policy and compute economics.', tags: ['AI Labs', 'Model History', 'Strategy', 'Economics'], keywords: ['lineage', 'sovereign', 'china', 'india', 'europe', 'openai', 'claude', 'gemini'], level: 'All levels', color: 'green' }
];

export function pathFor(article) {
  const haystack = `${article.title} ${article.excerpt} ${(article.tags || []).join(' ')}`.toLowerCase();
  return paths.reduce((best, path) => {
    const score = [...path.tags, ...path.keywords].reduce((n, term) => n + (haystack.includes(term.toLowerCase()) ? 1 : 0), 0);
    return score > best.score ? { id: path.id, score } : best;
  }, { id: 'research', score: 0 }).id;
}

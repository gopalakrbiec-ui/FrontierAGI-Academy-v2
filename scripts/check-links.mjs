import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve('dist');
const base = '/FrontierAGI-Academy-v2/';
const errors = [];

async function walk(directory) {
  const entries = await readdir(directory);
  const files = [];
  for (const entry of entries) {
    const target = path.join(directory, entry);
    (await stat(target)).isDirectory() ? files.push(...await walk(target)) : files.push(target);
  }
  return files;
}

for (const file of (await walk(dist)).filter(file => file.endsWith('.html'))) {
  const html = await readFile(file, 'utf8');
  if (path.relative(dist, file).startsWith(`archive${path.sep}`) && html.includes('href="../index.html"')) {
    errors.push(`${path.relative(dist, file)}: legacy homepage link was not migrated`);
  }
  for (const match of html.matchAll(/href=["']([^"'#?]+)["']/g)) {
    const href = match[1];
    if (href.startsWith('/FrontierAGI-Academy-v2') && !href.startsWith(base)) {
      errors.push(`${path.relative(dist, file)}: malformed base URL ${href}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('Validated generated internal link prefixes.');

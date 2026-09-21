import articles from '../src/data/articles.json' with { type: 'json' };
const errors=[];
const slugs=new Set();
let featured=0;
for(const [index,a] of articles.entries()){
  for(const field of ['slug','title','excerpt','author','date','readTime','tags']) if(!a[field]||a[field].length===0) errors.push(`Article ${index+1}: missing ${field}`);
  if(slugs.has(a.slug)) errors.push(`Duplicate slug: ${a.slug}`); slugs.add(a.slug);
  if(!/^\d{4}-\d{2}-\d{2}$/.test(a.date||'')) errors.push(`${a.slug}: invalid date`);
  if(a.featured) featured++;
}
if(featured>1) errors.push(`Only one featured article is allowed; found ${featured}`);
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Validated ${articles.length} articles.`);

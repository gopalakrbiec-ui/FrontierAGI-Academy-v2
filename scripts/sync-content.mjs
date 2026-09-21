import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const owner='gopalakrbiec-ui';
const repo='FrontierAGI-Academy';
const ref='claude/trusting-mendel-u9s1oh';
const raw=`https://raw.githubusercontent.com/${owner}/${repo}/${ref}`;
const api=`https://api.github.com/repos/${owner}/${repo}`;
const headers={Accept:'application/vnd.github+json','User-Agent':'FrontierAGI-Academy-v2'};

async function get(url){const response=await fetch(url,{headers});if(!response.ok)throw new Error(`${response.status} ${url}`);return response;}
const manifest=await (await get(`${raw}/blog/index.json`)).json();
await mkdir('src/data',{recursive:true});
await writeFile('src/data/articles.json',`${JSON.stringify(manifest.posts,null,2)}\n`);

const branch=await (await get(`${api}/branches/${encodeURIComponent(ref)}`)).json();
const tree=await (await get(`${api}/git/trees/${branch.commit.commit.tree.sha}?recursive=1`)).json();
const selected=tree.tree.filter(item=>item.type==='blob'&&(item.path==='styles.css'||item.path==='app.js'||item.path.startsWith('assets/')||item.path.startsWith('blog/')||item.path.startsWith('pages/')));
let copied=0;
for(const item of selected){
  const target=path.join('public','archive',item.path);
  await mkdir(path.dirname(target),{recursive:true});
  let body=Buffer.from(await (await get(`${raw}/${item.path}`)).arrayBuffer());
  if(item.path.endsWith('.html')){let html=body.toString('utf8');const bridge='\n<link rel="stylesheet" href="../../article-v2.css" />\n<script src="../../article-v2.js" defer></script>\n';html=html.replaceAll('href="../index.html"','href="../../"').replace('</head>',`${bridge}</head>`).replace('<body','<body data-v2-article="true"');body=Buffer.from(html,'utf8')}
  await writeFile(target,body); copied++;
}
console.log(`Synced ${manifest.posts.length} articles and ${copied} legacy assets.`);

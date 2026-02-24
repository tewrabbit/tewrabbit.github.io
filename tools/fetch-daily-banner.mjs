import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const projectRoot = process.cwd();
const outPath = path.join(projectRoot, 'source', 'medias', 'banner', 'daily.webp');

async function fetchJson(url) {
  const res = await fetch(url, { headers: { 'user-agent': 'hexo-matery-banner-fetch/1.0' } });
  if (!res.ok) {
    throw new Error(`Fetch failed ${res.status} ${res.statusText} for ${url}`);
  }
  return res.json();
}

async function fetchBuffer(url) {
  const res = await fetch(url, { headers: { 'user-agent': 'hexo-matery-banner-fetch/1.0' } });
  if (!res.ok) {
    throw new Error(`Download failed ${res.status} ${res.statusText} for ${url}`);
  }
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

async function main() {
  const apiUrl = 'https://danbooru.donmai.us/posts.json?limit=1&tags=order:score+rating:safe+-animated';
  const posts = await fetchJson(apiUrl);
  if (!Array.isArray(posts) || posts.length === 0) {
    throw new Error('No posts returned from danbooru');
  }

  const post = posts[0];
  const fileUrl = post.large_file_url || post.file_url;
  if (!fileUrl) {
    throw new Error('Post has no file_url/large_file_url');
  }

  const input = await fetchBuffer(fileUrl);

  let pipeline = sharp(input, { failOn: 'none' })
    .rotate()
    .resize(1280, 720, { fit: 'cover', position: 'attention' });

  let quality = 78;
  let output = await pipeline.webp({ quality }).toBuffer();

  while (output.byteLength > 200 * 1024 && quality >= 50) {
    quality -= 6;
    output = await pipeline.webp({ quality }).toBuffer();
  }

  if (output.byteLength > 200 * 1024) {
    output = await pipeline.resize(1024, 576, { fit: 'cover', position: 'attention' }).webp({ quality: 60 }).toBuffer();
  }

  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, output);

  const kb = Math.round(output.byteLength / 1024);
  console.log(`Saved daily banner: ${outPath} (${kb}KB)`);
  console.log(`Source: ${post.source || fileUrl}`);
}

await main();

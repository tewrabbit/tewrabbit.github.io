const fs = require('node:fs');
const path = require('node:path');

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function normalizeSlashes(p) {
  return p.replace(/\\/g, '/');
}

function readVideoListFromDir(dirPath, urlBase) {
  if (!fs.existsSync(dirPath)) return [];
  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((name) => !name.startsWith('.') && /\.(mp4|webm|mov|m4v)$/i.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map((name) => normalizeSlashes(urlBase + name));
}

hexo.extend.filter.register('before_generate', () => {
  const dataDir = path.join(hexo.source_dir, '_data');
  const outputVedioPath = path.join(dataDir, 'vedio.json');

  ensureDir(dataDir);

  const videoDir = path.join(hexo.source_dir, 'medias', 'video');
  const vedioDir = path.join(hexo.source_dir, 'medias', 'vedio');
  const list = Array.from(new Set([
    ...readVideoListFromDir(videoDir, '/medias/video/'),
    ...readVideoListFromDir(vedioDir, '/medias/vedio/'),
  ]));

  const next = JSON.stringify(list, null, 2) + '\n';
  const prevVedio = fs.existsSync(outputVedioPath) ? fs.readFileSync(outputVedioPath, 'utf8') : '';
  if (prevVedio !== next) fs.writeFileSync(outputVedioPath, next);
});

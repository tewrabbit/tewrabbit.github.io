const fs = require('node:fs');
const path = require('node:path');

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function normalizeSlashes(p) {
  return p.replace(/\\/g, '/');
}

hexo.extend.filter.register('before_generate', () => {
  const vedioDir = path.join(hexo.source_dir, 'medias', 'vedio');
  const dataDir = path.join(hexo.source_dir, '_data');
  const outputPath = path.join(dataDir, 'vedio.json');

  ensureDir(dataDir);

  let list = [];
  if (fs.existsSync(vedioDir)) {
    list = fs
      .readdirSync(vedioDir, { withFileTypes: true })
      .filter((e) => e.isFile())
      .map((e) => e.name)
      .filter((name) => !name.startsWith('.') && /\.(mp4|webm|mov|m4v)$/i.test(name))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
      .map((name) => normalizeSlashes('/medias/vedio/' + name));
  }

  const next = JSON.stringify(list, null, 2) + '\n';
  const prev = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, 'utf8') : '';
  if (prev !== next) {
    fs.writeFileSync(outputPath, next);
  }
});


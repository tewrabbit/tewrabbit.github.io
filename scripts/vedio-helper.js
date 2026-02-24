const fs = require('node:fs');
const path = require('node:path');

function normalizeSlashes(p) {
  return p.replace(/\\/g, '/');
}

hexo.extend.helper.register('vedio_list', function () {
  const vedioDir = path.join(hexo.source_dir, 'medias', 'vedio');
  if (!fs.existsSync(vedioDir)) return [];

  const maxSizeMB = Number((hexo.theme && hexo.theme.config && hexo.theme.config.homeVideo && hexo.theme.config.homeVideo.maxSizeMB) || 30);
  const maxBytes = maxSizeMB > 0 ? maxSizeMB * 1024 * 1024 : null;

  return fs
    .readdirSync(vedioDir, { withFileTypes: true })
    .filter((e) => e.isFile())
    .map((e) => ({ name: e.name, fullPath: path.join(vedioDir, e.name) }))
    .filter((e) => !e.name.startsWith('.') && /\.(mp4|webm|mov|m4v)$/i.test(e.name))
    .filter((e) => {
      if (!maxBytes) return true;
      try {
        return fs.statSync(e.fullPath).size <= maxBytes;
      } catch {
        return false;
      }
    })
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map((name) => normalizeSlashes('/medias/vedio/' + name));
});

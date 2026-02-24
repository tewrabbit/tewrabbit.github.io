const fs = require('node:fs');
const path = require('node:path');

function normalizeSlashes(p) {
  return p.replace(/\\/g, '/');
}

function readVideoListFromDir(dirPath, urlBase, maxBytes) {
  if (!fs.existsSync(dirPath)) return [];
  const maxSizeMB = Number((hexo.theme && hexo.theme.config && hexo.theme.config.homeVideo && hexo.theme.config.homeVideo.maxSizeMB) || 30);
  const limitBytes = typeof maxBytes === 'number' ? maxBytes : (maxSizeMB > 0 ? maxSizeMB * 1024 * 1024 : null);
  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((e) => e.isFile())
    .map((e) => ({ name: e.name, fullPath: path.join(dirPath, e.name) }))
    .filter((e) => !e.name.startsWith('.') && /\.(mp4|webm|mov|m4v)$/i.test(e.name))
    .filter((e) => {
      if (!limitBytes) return true;
      try {
        return fs.statSync(e.fullPath).size <= limitBytes;
      } catch {
        return false;
      }
    })
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map((name) => normalizeSlashes(urlBase + name));
}

function readVideoList() {
  const maxSizeMB = Number((hexo.theme && hexo.theme.config && hexo.theme.config.homeVideo && hexo.theme.config.homeVideo.maxSizeMB) || 30);
  const maxBytes = maxSizeMB > 0 ? maxSizeMB * 1024 * 1024 : null;
  const videoDir = path.join(hexo.source_dir, 'medias', 'video');
  const vedioDir = path.join(hexo.source_dir, 'medias', 'vedio');
  const list = [
    ...readVideoListFromDir(videoDir, '/medias/video/', maxBytes),
    ...readVideoListFromDir(vedioDir, '/medias/vedio/', maxBytes),
  ];
  return Array.from(new Set(list));
}

hexo.extend.helper.register('vedio_list', function () {
  return readVideoList();
});

hexo.extend.helper.register('video_list', function () {
  return readVideoList();
});

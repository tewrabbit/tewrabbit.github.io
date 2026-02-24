const fs = require('node:fs');
const path = require('node:path');
const { faststart } = require('moov-faststart');

const root = process.cwd();
const dir = path.join(root, 'source', 'medias', 'vedio');

function listMp4s() {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((n) => /\.mp4$/i.test(n))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((n) => path.join(dir, n));
}

function writeAtomic(targetPath, buf) {
  const tmpPath = targetPath + '.tmp';
  fs.writeFileSync(tmpPath, buf);
  fs.renameSync(tmpPath, targetPath);
}

function main() {
  const files = listMp4s();
  if (files.length === 0) {
    console.log('No mp4 files found in ' + dir);
    return;
  }

  for (const p of files) {
    const input = fs.readFileSync(p);
    const output = faststart(input);
    if (!Buffer.isBuffer(output)) {
      throw new Error('faststart() did not return a Buffer for ' + p);
    }
    writeAtomic(p, output);
    console.log(path.basename(p) + ': ' + Math.round(output.length / 1024) + 'KB');
  }
}

main();


const fs = require('node:fs');
const path = require('node:path');

const fileArg = process.argv[2] || 'source/medias/vedio/0.mp4';
const p = path.isAbsolute(fileArg) ? fileArg : path.join(process.cwd(), fileArg);

const buf = fs.readFileSync(p);
const s = buf.toString('latin1');
const tags = ['avc1', 'hvc1', 'hev1', 'av01', 'vp09', 'mp4a', 'Opus', 'fLaC'];
const found = tags.filter((t) => s.includes(t));

console.log(JSON.stringify({ file: p, bytes: buf.length, found }, null, 2));


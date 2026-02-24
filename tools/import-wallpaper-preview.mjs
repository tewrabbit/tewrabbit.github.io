import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const projectRoot = process.cwd();

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function findPreviewFile(folderPath) {
  const candidates = ['preview.webp', 'preview.png', 'preview.jpg', 'preview.jpeg'];
  for (const name of candidates) {
    const p = path.join(folderPath, name);
    if (await exists(p)) return p;
  }

  const entries = await fs.readdir(folderPath, { withFileTypes: true });
  const anyPreview = entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .find((name) => /^preview\.(jpg|jpeg|png|webp)$/i.test(name));
  if (anyPreview) return path.join(folderPath, anyPreview);

  return null;
}

async function encodeCoverWebp(inputPath, outputPath) {
  const base = sharp(inputPath, { failOn: 'none' })
    .rotate()
    .resize(1280, 720, { fit: 'cover', position: 'attention' });

  let quality = 78;
  let buf = await base.webp({ quality }).toBuffer();

  while (buf.byteLength > 200 * 1024 && quality >= 50) {
    quality -= 6;
    buf = await base.webp({ quality }).toBuffer();
  }

  if (buf.byteLength > 200 * 1024) {
    const smaller = sharp(inputPath, { failOn: 'none' })
      .rotate()
      .resize(1024, 576, { fit: 'cover', position: 'attention' });
    buf = await smaller.webp({ quality: 60 }).toBuffer();
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, buf);
  return buf.byteLength;
}

async function main() {
  const inputArg = process.argv[2] || '3394019828';
  const folderPath = path.isAbsolute(inputArg) ? inputArg : path.join(projectRoot, inputArg);

  if (!(await exists(folderPath))) {
    throw new Error(`Folder not found: ${folderPath}`);
  }

  const previewPath = await findPreviewFile(folderPath);
  if (!previewPath) {
    throw new Error(`preview.(jpg/png/webp) not found in: ${folderPath}`);
  }

  const id = path.basename(folderPath);
  const outputPath = path.join(projectRoot, 'source', 'medias', 'featureimages', `wallpaper-${id}.webp`);
  const bytes = await encodeCoverWebp(previewPath, outputPath);

  console.log(`Imported preview: ${previewPath}`);
  console.log(`Saved cover: ${outputPath} (${Math.round(bytes / 1024)}KB)`);
}

await main();

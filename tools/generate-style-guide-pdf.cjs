const fs = require('node:fs');
const path = require('node:path');
const PDFDocument = require('pdfkit');

const projectRoot = process.cwd();
const mdPath = path.join(projectRoot, 'docs', 'style-guide.md');
const outPath = path.join(projectRoot, 'docs', 'style-guide.pdf');

function pickFont() {
  const candidates = [
    'C:\\\\Windows\\\\Fonts\\\\simhei.ttf',
    'C:\\\\Windows\\\\Fonts\\\\msyh.ttf',
    'C:\\\\Windows\\\\Fonts\\\\simsun.ttf'
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function parseMd(md) {
  const lines = md.split(/\r?\n/);
  return lines.map((line) => {
    if (line.startsWith('# ')) return { type: 'h1', text: line.slice(2).trim() };
    if (line.startsWith('## ')) return { type: 'h2', text: line.slice(3).trim() };
    if (line.startsWith('### ')) return { type: 'h3', text: line.slice(4).trim() };
    if (line.startsWith('- ')) return { type: 'li', text: line.slice(2).trim() };
    if (line.trim().length === 0) return { type: 'sp', text: '' };
    return { type: 'p', text: line.trim() };
  });
}

function main() {
  const md = fs.readFileSync(mdPath, 'utf8');
  const blocks = parseMd(md);

  const doc = new PDFDocument({ size: 'A4', margin: 48 });
  const stream = fs.createWriteStream(outPath);
  doc.pipe(stream);

  const font = pickFont();
  if (font) {
    doc.registerFont('cn', font);
    doc.font('cn');
  }

  doc.fillColor('#111111');

  for (const b of blocks) {
    if (b.type === 'h1') {
      doc.moveDown(0.4);
      doc.fontSize(22).text(b.text, { continued: false });
      doc.moveDown(0.3);
      doc.moveTo(doc.x, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y).lineWidth(1).strokeColor('#F5F5F5').stroke();
      doc.moveDown(0.6);
      doc.fillColor('#111111');
      continue;
    }
    if (b.type === 'h2') {
      doc.moveDown(0.6);
      doc.fontSize(16).text(b.text);
      doc.moveDown(0.2);
      continue;
    }
    if (b.type === 'h3') {
      doc.moveDown(0.4);
      doc.fontSize(13).text(b.text);
      doc.moveDown(0.1);
      continue;
    }
    if (b.type === 'li') {
      doc.fontSize(11).fillColor('#111111').text('• ' + b.text, { indent: 12, lineGap: 4 });
      continue;
    }
    if (b.type === 'p') {
      doc.fontSize(11).fillColor('#111111').text(b.text, { lineGap: 4 });
      continue;
    }
    if (b.type === 'sp') {
      doc.moveDown(0.3);
    }
  }

  doc.end();
  stream.on('finish', () => {
    const stat = fs.statSync(outPath);
    console.log(`Generated: ${outPath} (${Math.round(stat.size / 1024)}KB)`);
  });
}

main();


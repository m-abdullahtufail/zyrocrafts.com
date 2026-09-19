const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const products = JSON.parse(fs.readFileSync('C:\\Users\\Abdullah Tufail\\Downloads\\products-raw.json', 'utf8'));
const outDir = path.join(__dirname, '..', 'public', 'products');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function download(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest)) { resolve('skip'); return; }
    const proto = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);
    proto.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) { file.close(); fs.unlinkSync(dest); reject(new Error(`${res.statusCode} ${url}`)); return; }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve('ok'); });
    }).on('error', (err) => { file.close(); fs.unlinkSync(dest); reject(err); });
  });
}

async function main() {
  let done = 0, failed = 0, skipped = 0;
  const BATCH = 10;
  for (let i = 0; i < products.length; i += BATCH) {
    const batch = products.slice(i, i + BATCH);
    const promises = batch.map((p) => {
      const dir = path.join(outDir, p.slug);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      return Promise.all(p.images.map((url, idx) => {
        const ext = path.extname(new URL(url).pathname) || '.jpeg';
        const fname = `${idx + 1}${ext}`;
        return download(url, path.join(dir, fname))
          .then(r => { if (r === 'ok') done++; else skipped++; })
          .catch(e => { failed++; console.error(`FAIL: ${p.slug}/${fname}: ${e.message}`); });
      }));
    });
    await Promise.all(promises);
    console.log(`Progress: ${Math.min(i + BATCH, products.length)}/${products.length} products`);
  }
  console.log(`\nDone: ${done} downloaded, ${skipped} skipped, ${failed} failed`);
}

main().catch(console.error);

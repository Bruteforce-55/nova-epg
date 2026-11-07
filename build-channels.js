// Baut aus sources.txt eine gemeinsame Senderliste für iptv-org/epg.
// Aufruf: node build-channels.js <pfad-zu-iptv-epg/sites> > nova.channels.xml
const fs = require('fs');
const path = require('path');

const sitesDir = process.argv[2];
const list = fs.readFileSync(path.join(__dirname, 'sources.txt'), 'utf8')
  .split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'));

const seen = new Set();
const out = ['<?xml version="1.0" encoding="UTF-8"?>', '<channels>'];
for (const rel of list) {
  const file = path.join(sitesDir, rel);
  if (!fs.existsSync(file)) { console.error('fehlt:', rel); continue; }
  const xml = fs.readFileSync(file, 'utf8');
  let n = 0;
  for (const m of xml.matchAll(/<channel\s[^>]*>[\s\S]*?<\/channel>/g)) {
    let line = m[0];
    const site = (line.match(/site="([^"]*)"/) || [])[1];
    const siteId = (line.match(/site_id="([^"]*)"/) || [])[1];
    // Ohne xmltv_id würde iptv-org nur die site_id nehmen, die sich zwischen Anbietern überschneidet
    if (/xmltv_id=""/.test(line) || !/xmltv_id=/.test(line)) {
      const id = (site + '-' + siteId).replace(/[^A-Za-z0-9._-]/g, '_');
      line = /xmltv_id=/.test(line) ? line.replace(/xmltv_id=""/, `xmltv_id="${id}"`) : line.replace('<channel ', `<channel xmltv_id="${id}" `);
    }
    const key = site + '|' + siteId;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push('  ' + line);
    n++;
  }
  console.error(rel + ': ' + n + ' Sender');
}
out.push('</channels>');
process.stdout.write(out.join('\n') + '\n');
console.error('gesamt: ' + seen.size + ' Sender');

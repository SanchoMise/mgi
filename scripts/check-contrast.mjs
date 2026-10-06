// Vérifie que chaque saison de theme.json donne des contrastes WCAG AA, et teste des couleurs extrêmes.
import { readFileSync } from 'node:fs';
import { buildPalette, auditPalette } from '../src/theme/color.js';

const theme = JSON.parse(readFileSync(new URL('../src/theme/theme.json', import.meta.url)));
const extremes = ['#ffffff', '#000000', '#ffff00', '#00ffff', '#808080', '#ff0000', '#0000ff', '#00ff00'];
let failures = 0;

for (const hex of [...theme.seasons.map((s) => s.primary), ...extremes]) {
  const rows = auditPalette(buildPalette(hex));
  const bad = rows.filter((r) => !r.ok);
  failures += bad.length;
  const min = Math.min(...rows.map((r) => r.ratio)).toFixed(2);
  console.log(`${hex}  pire contraste ${min}:1  ${bad.length ? 'ÉCHEC ' + bad.map((r) => r.name).join(', ') : 'OK'}`);
}
process.exit(failures ? 1 : 0);

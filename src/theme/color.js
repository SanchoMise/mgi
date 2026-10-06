// Génération d'une palette complète à partir d'UNE couleur principale (hex).
// Calcul en OKLCH : la luminosité perçue (L) est indépendante de la teinte (H),
// ce qui permet de garantir des contrastes sans effet de surprise selon la couleur.
// Module sans dépendance, utilisé à la fois au build (Astro) et dans le navigateur (aperçu en direct).
// Méthode documentée dans README.md : à reproduire à l'identique en PHP côté WordPress.

const clamp = (x, a, b) => Math.min(b, Math.max(a, x));

/* ---------- conversions sRGB <-> OKLCH ---------- */
const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toGamma = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

export function hexToRgb(hex) {
  let h = String(hex).trim().replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
}

export function rgbToHex([r, g, b]) {
  return '#' + [r, g, b].map((c) => Math.round(clamp(c, 0, 1) * 255).toString(16).padStart(2, '0')).join('');
}

export function rgbToOklch([r, g, b]) {
  const [lr, lg, lb] = [r, g, b].map(toLinear);
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const b2 = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return { l: L, c: Math.hypot(a, b2), h: ((Math.atan2(b2, a) * 180) / Math.PI + 360) % 360 };
}

function oklchToLinear({ l, c, h }) {
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ];
}

const inGamut = (lin) => lin.every((v) => v >= -0.0001 && v <= 1.0001);

/** OKLCH -> hex ; si hors gamut sRGB, on réduit la chroma (la teinte et la luminosité sont conservées). */
export function oklchToHex(color) {
  let { l, c, h } = color;
  l = clamp(l, 0, 1);
  let lin = oklchToLinear({ l, c, h });
  if (!inGamut(lin)) {
    let lo = 0;
    let hi = c;
    for (let i = 0; i < 24; i++) {
      const mid = (lo + hi) / 2;
      inGamut(oklchToLinear({ l, c: mid, h })) ? (lo = mid) : (hi = mid);
    }
    lin = oklchToLinear({ l, c: lo, h });
  }
  return rgbToHex(lin.map((v) => toGamma(clamp(v, 0, 1))));
}

/* ---------- contraste WCAG 2.x ---------- */
export function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map(toLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(hexA, hexB) {
  const [a, b] = [luminance(hexA), luminance(hexB)].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
}

/**
 * Éclaircit ou assombrit `color` (sans toucher à la teinte) jusqu'à atteindre `min` contre `against`.
 * `direction` : 'darker' | 'lighter'.
 */
function ensureContrast(color, against, min, direction) {
  let c = { ...color };
  const step = direction === 'darker' ? -0.005 : 0.005;
  for (let i = 0; i < 200; i++) {
    if (contrast(oklchToHex(c), against) >= min) break;
    c.l = clamp(c.l + step, 0, 1);
  }
  return oklchToHex(c);
}

const mix = (base, over) => ({ ...base, ...over });

/** Meilleur texte (blanc teinté ou quasi-noir teinté) sur un fond donné. */
function onColor(bgHex, hue) {
  const dark = oklchToHex({ l: 0.2, c: 0.03, h: hue });
  const light = oklchToHex({ l: 0.99, c: 0.01, h: hue });
  return contrast(bgHex, dark) >= contrast(bgHex, light) ? dark : light;
}

/** Fond de couleur sur lequel du texte clair ou foncé atteint 4,5:1 (la luminosité est ajustée au besoin). */
function legibleFill(color) {
  const best = (hex) => Math.max(contrast(hex, '#161616'), contrast(hex, '#ffffff'));
  const c = { ...color };
  for (let i = 0; i < 100 && best(oklchToHex(c)) < 4.7; i++) c.l += c.l > 0.6 ? 0.01 : -0.01;
  return oklchToHex(c);
}

/**
 * Palette complète à partir d'une couleur principale.
 * Retourne un objet { variableCss: valeur }.
 */
export function buildPalette(inputHex) {
  const rgb = hexToRgb(inputHex) ?? hexToRgb('#eca06c');
  const input = rgbToOklch(rgb);
  // Couleur neutre (gris) en entrée : teinte arbitraire stable plutôt que NaN.
  const H = input.c < 0.01 ? 40 : input.h;
  const C = clamp(input.c, 0.04, 0.2); // évite les couleurs fades ou fluo
  const L = clamp(input.l, 0.3, 0.88);

  // 1. Primaire : on garde la couleur choisie, ajustée seulement si aucun texte lisible n'est possible dessus.
  let primary = oklchToHex({ l: L, c: C, h: H });
  const best = (hex) => Math.max(contrast(hex, '#161616'), contrast(hex, '#ffffff'));
  let p = { l: L, c: C, h: H };
  for (let i = 0; i < 100 && best(oklchToHex(p)) < 4.5; i++) p.l += p.l > 0.6 ? 0.01 : -0.01;
  primary = oklchToHex(p);
  const onPrimary = onColor(primary, H);

  // 2. Secondaire et accent : rotation de teinte (+150° et +210°, « split complementary »).
  // Chaque couleur est ajustée en luminosité si aucun texte lisible (4,5:1) n'est possible dessus.
  const secondary = legibleFill({ l: clamp(L, 0.45, 0.78), c: C * 0.85, h: (H + 150) % 360 });
  const accent = legibleFill({ l: clamp(L, 0.5, 0.8), c: Math.min(0.2, C * 1.05), h: (H + 210) % 360 });

  // 3. Neutres teintés (même teinte que le primaire, chroma très faible).
  const bg = oklchToHex({ l: 0.985, c: 0.012, h: H });
  const surface = oklchToHex({ l: 0.962, c: 0.022, h: H });
  const surface2 = oklchToHex({ l: 0.93, c: 0.035, h: H });
  const border = oklchToHex({ l: 0.86, c: 0.04, h: H });

  // 4. Texte : calculé pour garantir >= 7:1 (AAA) sur le fond, très au-dessus des 4,5:1 requis (AA).
  const text = ensureContrast({ l: 0.3, c: 0.04, h: H }, surface2, 7, 'darker');
  const textMuted = ensureContrast({ l: 0.48, c: 0.04, h: H }, surface2, 4.6, 'darker');

  // 5. Variantes du primaire lisibles comme texte/lien sur le fond clair (>= 4.5:1).
  const primaryInk = ensureContrast({ l: Math.min(L, 0.55), c: C, h: H }, surface2, 4.6, 'darker');
  const secondaryInk = ensureContrast(rgbToOklch(hexToRgb(secondary)), surface2, 4.6, 'darker');

  // 6. Nuances claires et foncées du primaire (fonds, survols, bordures).
  const primaryHover = oklchToHex({ l: clamp(p.l + (p.l > 0.6 ? -0.07 : 0.06), 0, 1), c: p.c, h: H });
  const primarySoft = oklchToHex({ l: 0.94, c: Math.min(C, 0.05), h: H });
  const primaryTint = oklchToHex({ l: 0.88, c: Math.min(C, 0.09), h: H });

  // 7. Bande foncée (pied de page, héros inversé) + son texte.
  const ink = oklchToHex({ l: 0.24, c: Math.min(C * 0.6, 0.07), h: H });
  const onInk = onColor(ink, H);
  const inkAccent = ensureContrast({ l: 0.8, c: C, h: H }, ink, 4.5, 'lighter');

  return {
    '--color-primary': primary,
    '--color-on-primary': onPrimary,
    '--color-primary-hover': primaryHover,
    '--color-primary-ink': primaryInk,
    '--color-primary-soft': primarySoft,
    '--color-primary-tint': primaryTint,
    '--color-secondary': secondary,
    '--color-secondary-ink': secondaryInk,
    '--color-on-secondary': onColor(secondary, H),
    '--color-accent': accent,
    '--color-on-accent': onColor(accent, H),
    '--color-bg': bg,
    '--color-surface': surface,
    '--color-surface-2': surface2,
    '--color-border': border,
    '--color-text': text,
    '--color-text-muted': textMuted,
    '--color-ink': ink,
    '--color-on-ink': onInk,
    '--color-ink-accent': inkAccent,
  };
}

/** Contrastes clés, pour le panneau de démonstration et le script de contrôle. */
export function auditPalette(p) {
  const pairs = [
    ['texte / fond', p['--color-text'], p['--color-bg'], 4.5],
    ['texte atténué / fond', p['--color-text-muted'], p['--color-bg'], 4.5],
    ['texte / surface', p['--color-text'], p['--color-surface'], 4.5],
    ['texte atténué / surface foncée', p['--color-text-muted'], p['--color-surface-2'], 4.5],
    ['lien / surface foncée', p['--color-primary-ink'], p['--color-surface-2'], 4.5],
    ['lien / bande douce (primary-soft)', p['--color-primary-ink'], p['--color-primary-soft'], 4.5],
    ['texte sur primaire', p['--color-on-primary'], p['--color-primary'], 4.5],
    ['lien (primaire foncé) / fond', p['--color-primary-ink'], p['--color-bg'], 4.5],
    ['texte sur secondaire', p['--color-on-secondary'], p['--color-secondary'], 4.5],
    ['texte sur accent', p['--color-on-accent'], p['--color-accent'], 4.5],
    ['texte sur bande foncée', p['--color-on-ink'], p['--color-ink'], 4.5],
    ['lien sur bande foncée', p['--color-ink-accent'], p['--color-ink'], 4.5],
  ];
  return pairs.map(([name, fg, bg, min]) => {
    const ratio = contrast(fg, bg);
    return { name, fg, bg, ratio, min, ok: ratio >= min };
  });
}

export const paletteToCss = (p) => Object.entries(p).map(([k, v]) => `${k}:${v}`).join(';');

import theme from '../theme/theme.json';
import { buildPalette, auditPalette, paletteToCss } from '../theme/color.js';

const LS_THEME = 'mgi-theme-css';
const LS_PRIMARY = 'mgi-theme-primary';
const LS_FB = 'mgi-feedback';
const LS_NAME = 'mgi-feedback-name';

const store = {
  get: (k: string) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* stockage indisponible */ } },
  del: (k: string) => { try { localStorage.removeItem(k); } catch { /* idem */ } },
};

const defaultPrimary = () => theme.seasons.find((s) => s.id === theme.default)!.primary;
const currentPrimary = () => store.get(LS_PRIMARY) ?? defaultPrimary();

function applyPrimary(hex: string, persist = true) {
  const palette = buildPalette(hex);
  const css = paletteToCss(palette);
  document.documentElement.style.cssText = css;
  if (persist) { store.set(LS_THEME, css); store.set(LS_PRIMARY, hex); }
  return palette;
}

type FbMap = Record<string, { text: string; name: string; date: string; title: string }>;
const readFb = (): FbMap => { try { return JSON.parse(store.get(LS_FB) || '{}'); } catch { return {}; } };

function toMarkdown(fb: FbMap) {
  const rows = Object.entries(fb);
  if (!rows.length) return '';
  return '# Retours sur le prototype MGI\n\n' + rows.map(([k, v]) => `## ${v.title}\n\`${k}\` · ${v.name || 'anonyme'} · ${v.date}\n\n${v.text}\n`).join('\n');
}

export function initProto() {
  document.documentElement.classList.remove('no-js');
  initPage();
  const root = document.querySelector<HTMLElement>('[data-proto]');
  if (!root || !root.querySelector('[data-pick]')) return; // page Guide : pas de barre de prototype
  const variant = root.dataset.variant!;
  const path = root.dataset.path!;
  const key = `${variant}:${path}`;

  /* ---- la barre reste visible ; l'en-tête du site se cale dessous ---- */
  const setH = () => document.documentElement.style.setProperty('--proto-h', root.offsetHeight + 'px');
  setH();
  new ResizeObserver(setH).observe(root);

  /* ---- panneaux ---- */
  const panels = [...root.querySelectorAll<HTMLElement>('.panel')];
  root.querySelectorAll<HTMLButtonElement>('[data-panel]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = root.querySelector<HTMLElement>(`#panel-${btn.dataset.panel}`)!;
      const open = target.hidden;
      panels.forEach((p) => (p.hidden = true));
      root.querySelectorAll('[data-panel]').forEach((b) => b.setAttribute('aria-expanded', 'false'));
      if (open) { target.hidden = false; btn.setAttribute('aria-expanded', 'true'); }
    });
  });

  /* ---- couleurs ---- */
  const pick = root.querySelector<HTMLInputElement>('[data-pick]')!;
  const hexInput = root.querySelector<HTMLInputElement>('[data-hex]')!;
  const audit = root.querySelector<HTMLElement>('[data-audit]')!;
  const seasons = [...root.querySelectorAll<HTMLButtonElement>('[data-season]')];
  const render = (hex: string, persist = true) => {
    const palette = applyPrimary(hex, persist);
    pick.value = hex.length === 7 ? hex : pick.value;
    hexInput.value = hex;
    seasons.forEach((s) => s.setAttribute('aria-pressed', String(s.dataset.primary!.toLowerCase() === hex.toLowerCase())));
    audit.innerHTML = auditPalette(palette)
      .map((r) => `<tr><td>${r.name}</td><td>${r.ratio.toFixed(2)}:1</td><td class="${r.ok ? 'ok' : 'ko'}">${r.ok ? 'OK' : 'ÉCHEC'}</td></tr>`).join('');
  };
  render(currentPrimary(), false);
  seasons.forEach((b) => b.addEventListener('click', () => render(b.dataset.primary!)));
  pick.addEventListener('input', () => render(pick.value));
  hexInput.addEventListener('change', () => { const v = hexInput.value.startsWith('#') ? hexInput.value : '#' + hexInput.value; if (/^#[0-9a-fA-F]{6}$/.test(v)) render(v); });
  root.querySelector('[data-reset]')!.addEventListener('click', () => { store.del(LS_THEME); store.del(LS_PRIMARY); render(defaultPrimary(), false); });

  /* ---- retours ---- */
  const text = root.querySelector<HTMLTextAreaElement>('[data-fb-text]')!;
  const name = root.querySelector<HTMLInputElement>('[data-fb-name]')!;
  const list = root.querySelector<HTMLElement>('[data-fb-list]')!;
  const status = root.querySelector<HTMLElement>('[data-fb-status]')!;
  const count = root.querySelector<HTMLElement>('[data-fb-count]')!;
  name.value = store.get(LS_NAME) ?? '';
  const refresh = () => {
    const fb = readFb();
    text.value = fb[key]?.text ?? '';
    const n = Object.keys(fb).length;
    count.hidden = n === 0; count.textContent = String(n);
    list.innerHTML = Object.entries(fb).map(([k, v]) => `<li><small>${k.toUpperCase()}</small>${v.text.replace(/</g, '&lt;')}</li>`).join('') || '<li><small>Aucun retour pour l\'instant.</small></li>';
  };
  refresh();
  root.querySelector('[data-fb-save]')!.addEventListener('click', () => {
    const fb = readFb();
    const v = text.value.trim();
    if (v) fb[key] = { text: v, name: name.value.trim(), date: new Date().toLocaleDateString('fr-FR'), title: `${variant.toUpperCase()} · ${document.querySelector('h1')?.textContent?.trim() ?? path}` };
    else delete fb[key];
    store.set(LS_FB, JSON.stringify(fb)); store.set(LS_NAME, name.value.trim());
    status.textContent = v ? 'Retour enregistré.' : 'Retour supprimé.';
    refresh();
  });
  root.querySelector('[data-fb-copy]')!.addEventListener('click', async () => {
    const md = toMarkdown(readFb());
    try { await navigator.clipboard.writeText(md); status.textContent = md ? 'Copié dans le presse-papiers.' : 'Rien à copier.'; } catch { status.textContent = 'Copie impossible : utilise « Télécharger ».'; }
  });
  root.querySelector('[data-fb-download]')!.addEventListener('click', () => {
    const md = toMarkdown(readFb());
    if (!md) { status.textContent = 'Rien à télécharger.'; return; }
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([md], { type: 'text/markdown' }));
    a.download = 'retours-mgi.md'; a.click(); URL.revokeObjectURL(a.href);
  });
  root.querySelector('[data-fb-clear]')!.addEventListener('click', () => {
    if (confirm('Effacer tous les retours enregistrés dans ce navigateur ?')) { store.del(LS_FB); refresh(); status.textContent = 'Retours effacés.'; }
  });

}

function initPage() {
  /* ---- menu mobile ---- */
  const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
  const menu = document.getElementById('menu');
  toggle?.addEventListener('click', () => {
    const open = menu!.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  /* ---- galerie : filtres (sans JS, tout reste visible) ---- */
  const filters = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
  filters.forEach((b) => b.addEventListener('click', () => {
    filters.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    document.querySelectorAll<HTMLElement>('[data-gallery] [data-tags]').forEach((c) => {
      c.hidden = !!b.dataset.filter && !c.dataset.tags!.split('|').includes(b.dataset.filter);
    });
  }));

  /* ---- accueil B : filtre « Je suis… » ---- */
  const bRows = document.querySelector<HTMLElement>('[data-brows]');
  document.querySelectorAll<HTMLButtonElement>('[data-bfilter]').forEach((b, _i, all) => b.addEventListener('click', () => {
    all.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    if (b.dataset.bfilter) bRows?.setAttribute('data-filter', b.dataset.bfilter); else bRows?.removeAttribute('data-filter');
  }));

  /* ---- apparition au défilement ---- */
  const els = document.querySelectorAll<HTMLElement>('.reveal');
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) { els.forEach((e) => e.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  els.forEach((e) => io.observe(e));
}

// Après une navigation (View Transitions), la couleur choisie est réappliquée.
document.addEventListener('astro:after-swap', () => {
  const css = store.get(LS_THEME);
  if (css) document.documentElement.style.cssText = css;
  document.documentElement.classList.remove('no-js');
});

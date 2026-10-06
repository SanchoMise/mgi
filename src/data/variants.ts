// Arborescences : chaque variante place les pages du registre (pages.ts) à une URL et dans un menu.
// Pour ajouter une variante : ajouter une entrée dans VARIANTS (voir README, « Ajouter une variante »).
import { getPage, formationIds } from './pages';

export interface Node {
  id: string;
  slug?: string;      // remplace le slug par défaut de la page dans cette variante
  label?: string;     // remplace le libellé de menu dans cette variante
  nav?: boolean;      // false : absent du menu principal (présent dans le pied de page)
  children?: Node[];
}

export interface Variant {
  key: string;        // préfixe d'URL : /c/…
  name: string;       // « Variante C »
  tagline: string;
  description: string;
  root: Node;         // la racine est toujours la page « home »
}

const f = (slug: string): Node => ({ id: `formation-${slug}` });
const formationNodes = (): Node[] => formationIds.map((id) => ({ id }));

const maison: Node = {
  id: 'maison',
  children: [{ id: 'qui-sommes-nous' }, { id: 'equipe' }, { id: 'partenaires' }, { id: 'presse' }, { id: 'lieu-acces' }, { id: 'contact' }],
};

export const VARIANTS: Variant[] = [
  {
    key: 'a',
    name: 'Variante A',
    tagline: 'Par public',
    description: 'Un hub par visiteur : Parents et ados, Enseignants et écoles, Professionnels, La Maison. La discipline n\'est jamais une entrée.',
    root: {
      id: 'home',
      children: [
        {
          id: 'stages-ados', slug: 'parents-ados', label: 'Parents et ados',
          children: [
            { id: 'stage-photo', slug: 'stage-photo' }, { id: 'stage-video', slug: 'stage-video' }, { id: 'stage-theatre', slug: 'stage-theatre' },
            { id: 'samedis' }, { id: 'stage-3e' }, { id: 'tarifs-inscription' },
          ],
        },
        {
          id: 'ecoles', label: 'Enseignants et écoles',
          children: [
            { id: 'ateliers-classe' }, { id: 'parcours-croises' },
            { id: 'realisations', children: [{ id: 'real-cines' }, { id: 'real-etranges' }] },
          ],
        },
        { id: 'formations', slug: 'professionnels', label: 'Professionnels', children: [...formationNodes(), { id: 'accueil-espaces' }, { id: 'artistes' }] },
        { ...maison, children: [...maison.children!, { id: 'ressources', children: [{ id: 'agenda' }, { id: 'themes' }] }] },
      ],
    },
  },
  {
    key: 'b',
    name: 'Variante B',
    tagline: 'Par discipline',
    description: 'Une page forte par discipline (photo, vidéo, théâtre…) qui regroupe stages, formations et ateliers scolaires.',
    root: {
      id: 'home',
      children: [
        { id: 'disc-photo', children: [{ id: 'stage-photo', slug: 'stage-ados' }, f('cyanotype'), f('stenope')] },
        { id: 'disc-video', children: [{ id: 'stage-video', slug: 'stage-ados' }, f('cinema-animation'), f('realisation-audiovisuelle')] },
        { id: 'disc-theatre', children: [{ id: 'stage-theatre', slug: 'stage-ados' }, f('oral-aisance-impact'), f('theatre-3-6-ans-album')] },
        { id: 'disc-son', nav: false, children: [f('creation-sonore')] },
        { id: 'disc-danse', nav: false, children: [f('mouvement-danse')] },
        { id: 'stages-ados', label: 'Calendrier des stages', children: [{ id: 'samedis' }, { id: 'stage-3e' }, { id: 'tarifs-inscription' }] },
        { id: 'formations', label: 'Formations', children: [{ id: 'accueil-espaces' }, { id: 'artistes' }] },
        { id: 'ecoles', children: [{ id: 'ateliers-classe' }, { id: 'parcours-croises' }] },
        maison,
        { id: 'ressources', nav: false, children: [{ id: 'realisations', children: [{ id: 'real-cines' }, { id: 'real-etranges' }] }, { id: 'agenda' }, { id: 'themes' }] },
      ],
    },
  },
  {
    key: 'c',
    name: 'Variante C',
    tagline: 'Hybride (recommandée)',
    description: 'Hub par public en entrée, et pages disciplines sous chaque hub (/stages-ados/photo/) pour le référencement.',
    root: {
      id: 'home',
      children: [
        { id: 'stages-ados', children: [{ id: 'stage-photo' }, { id: 'stage-video' }, { id: 'stage-theatre' }, { id: 'samedis' }, { id: 'stage-3e' }, { id: 'tarifs-inscription' }] },
        { id: 'formations', children: [...formationNodes(), { id: 'accueil-espaces' }, { id: 'artistes' }] },
        { id: 'ecoles', children: [{ id: 'ateliers-classe' }, { id: 'parcours-croises' }] },
        maison,
        { id: 'ressources', nav: false, children: [{ id: 'realisations', children: [{ id: 'real-cines' }, { id: 'real-etranges' }] }, { id: 'agenda' }, { id: 'themes' }] },
      ],
    },
  },
];

export const DEFAULT_VARIANT = 'c';
export const getVariant = (key: string): Variant => {
  const v = VARIANTS.find((x) => x.key === key);
  if (!v) throw new Error(`Variante inconnue : ${key}`);
  return v;
};

export interface Entry {
  id: string;
  segments: string[];     // slugs depuis la racine
  path: string;           // /c/stages-ados/photo/
  parent: string | null;
  label: string;
  depth: number;
  node: Node;
}

const cache = new Map<string, Map<string, Entry>>();

export function indexVariant(key: string): Map<string, Entry> {
  if (cache.has(key)) return cache.get(key)!;
  const v = getVariant(key);
  const out = new Map<string, Entry>();
  const walk = (node: Node, segs: string[], parent: string | null, depth: number) => {
    const page = getPage(node.id);
    const segments = depth === 0 ? [] : [...segs, node.slug ?? page.slug];
    const path = `/${key}/${segments.join('/')}${segments.length ? '/' : ''}`;
    if (out.has(node.id)) throw new Error(`Page en double dans la variante ${key} : ${node.id}`);
    out.set(node.id, { id: node.id, segments, path, parent, label: node.label ?? page.label, depth, node });
    node.children?.forEach((c) => walk(c, segments, node.id, depth + 1));
  };
  walk(v.root, [], null, 0);
  const seen = new Map<string, string>();
  for (const e of out.values()) {
    if (seen.has(e.path)) throw new Error(`URL en double dans la variante ${key} : ${e.path}`);
    seen.set(e.path, e.id);
  }
  cache.set(key, out);
  return out;
}

export const pathOf = (key: string, id: string): string | undefined => indexVariant(key).get(id)?.path;

export function ancestors(key: string, id: string): Entry[] {
  const idx = indexVariant(key);
  const chain: Entry[] = [];
  let cur = idx.get(id);
  while (cur) { chain.unshift(cur); cur = cur.parent ? idx.get(cur.parent) : undefined; }
  return chain;
}

export const mainNav = (key: string): Entry[] =>
  (indexVariant(key).get('home')!.node.children ?? [])
    .filter((n) => n.nav !== false)
    .map((n) => indexVariant(key).get(n.id)!);

export const footerNav = (key: string): Entry[] =>
  (indexVariant(key).get('home')!.node.children ?? []).map((n) => indexVariant(key).get(n.id)!);

export const childrenOf = (key: string, id: string): Entry[] =>
  (indexVariant(key).get(id)?.node.children ?? []).map((n) => indexVariant(key).get(n.id)!);

/** Page équivalente dans une autre variante ; à défaut, première page liée présente, sinon l'accueil. */
export function equivalentPath(key: string, id: string): string {
  const idx = indexVariant(key);
  if (idx.has(id)) return idx.get(id)!.path;
  const page = getPage(id);
  for (const rel of page.related ?? []) if (idx.has(rel)) return idx.get(rel)!.path;
  return idx.get('home')!.path;
}

/** Nombre de clics depuis l'accueil (profondeur dans l'arbre). */
export const clicks = (key: string, id: string): number | undefined => indexVariant(key).get(id)?.depth;

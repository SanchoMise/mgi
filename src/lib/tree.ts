import { getVariant, indexVariant, type Node } from '../data/variants';
import { getPage } from '../data/pages';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

/** Arbre d'une variante en liste imbriquée HTML (liens inclus). `collapse` : ids dont les enfants sont résumés. */
export function renderTree(key: string, opts: { maxDepth?: number; collapse?: string[]; links?: boolean } = {}): string {
  const { maxDepth = 9, collapse = [], links = true } = opts;
  const idx = indexVariant(key);
  const walk = (n: Node, depth: number): string => {
    const e = idx.get(n.id)!;
    const label = esc(e.label);
    const name = links ? `<a href="${e.path}">${label}</a>` : label;
    const kids = n.children ?? [];
    let inner = '';
    if (kids.length && depth < maxDepth) {
      inner = collapse.includes(n.id)
        ? `<p class="tree__more">${kids.length} pages</p>`
        : `<ul>${kids.map((k) => walk(k, depth + 1)).join('')}</ul>`;
    }
    const tpl = getPage(n.id).template;
    return `<li class="tree__${depth === 0 ? 'root' : depth === 1 ? 'top' : 'leaf'}" data-tpl="${tpl}">${name}${n.nav === false && depth === 1 ? ' <small>(pied de page)</small>' : ''}${inner}</li>`;
  };
  return `<ul class="tree">${walk(getVariant(key).root, 0)}</ul>`;
}

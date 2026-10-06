const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
/** Échappe le texte et surligne les mentions [à compléter] / [à confirmer…] / [à fournir] pour qu'elles se voient. */
export const rich = (s: string): string => esc(s).replace(/\[(à [^\]]+)\]/g, '<em class="tbd">[$1]</em>');

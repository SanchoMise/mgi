# Prototype d'arborescence — Maison du Geste et de l'Image

Minisite statique (Astro) pour **comparer trois arborescences** du futur site de la MGI (variantes A, B, C), tester un **système de couleurs saisonnier** et collecter les retours du client. Ce n'est **pas** le site final : il est non indexé et une partie du contenu est factice (`[à compléter]`).

Documents de travail dans [`docs/`](docs/) : `inventaire.md` (+ `.csv`), `arborescences.md`, `questions.md`, `brief-mgi-arborescence.md`.

## Lancer

```bash
npm install
npm run dev            # http://localhost:4321
npm run build          # génère dist/ (111 pages)
npm run check:contrast # vérifie les contrastes WCAG de toutes les saisons
```

## Choix de la stack : Astro

HTML statique rapide, liens indexables, zéro JavaScript par défaut : JS seulement pour le sélecteur de couleurs, les retours, la galerie filtrable et les apparitions. Même base de design réutilisable ensuite. Les transitions entre pages utilisent les View Transitions (désactivées si `prefers-reduced-motion`).

## Structure

```
src/data/pages.ts      CONTENU des pages (un objet par page, indépendant de l'arborescence)
src/data/variants.ts   ARBORESCENCES : A, B, C placent les pages (par id) dans un arbre
src/data/site.ts       Nom, adresse, téléphone (source unique), lien de formulaire de retours
src/templates/         Gabarits : home, hub, offre (stage/école/formation), lieu, contact, réalisation, galerie…
src/theme/             Couleurs : theme.json (saisons) + color.js (calcul)
src/components/        Header, Footer, Fil d'Ariane, barre de prototype, logo…
```

## Ajouter une variante

1. Dans `src/data/variants.ts`, ajouter un objet à `VARIANTS` : `key` (préfixe d'URL, ex. `d`), `name`, `tagline`, `description`, `root` (l'arbre).
2. Chaque nœud : `{ id, slug?, label?, nav?, children? }`. `id` = une page de `pages.ts`. `slug` et `label` surchargent ceux de la page pour cette variante. `nav: false` retire du menu principal.
3. C'est tout : routes, menu, fil d'Ariane, pied de page, sélecteur A/B/C et passage à la « page équivalente » sont générés. Le build échoue si une URL ou une page est en double.

Ajouter une page : un objet dans `pages.ts` (template, title, description, h1 uniques), puis la placer dans les arbres.

## Système de couleurs saisonnier

**Une seule entrée** : la couleur principale (hex). Tout le reste est calculé dans [`src/theme/color.js`](src/theme/color.js) et posé en variables CSS sur `:root` (`--color-primary`, `--color-secondary`, `--color-accent`, `--color-bg`, `--color-surface`, `--color-text`…). Aucune couleur en dur dans les composants du site.

Saisons : [`src/theme/theme.json`](src/theme/theme.json) (une couleur principale par saison, `#eca06c` pour l'automne). Panneau « Couleurs » du prototype : saisons + couleur libre + tableau des contrastes en direct.

**Pourquoi OKLCH** : la luminosité (L) y correspond à la luminosité perçue, indépendamment de la teinte. Faire varier la teinte (rotation) ne change donc pas la lisibilité, ce qui est faux en HSL (un jaune et un bleu de même L ont des contrastes très différents).

### Méthode de calcul (à reproduire en PHP côté WordPress)

Soit `(L, C, H)` la couleur principale en OKLCH, avec `C` limité à [0,04 ; 0,20] et `L` à [0,30 ; 0,88]. Chaque couleur calculée est convertie en hex ; si elle sort du gamut sRGB, la chroma est réduite par dichotomie (teinte et luminosité conservées).

| Variable | Calcul |
|---|---|
| `--color-primary` | `(L, C, H)`, `L` décalée par pas de 0,01 jusqu'à ce que du texte clair ou foncé atteigne ≥ 4,5:1 dessus |
| `--color-on-primary` | du quasi-noir ou du quasi-blanc teinté (`H`), celui qui contraste le plus |
| `--color-secondary` | `H + 150°`, `C × 0,85`, `L` bornée [0,45 ; 0,78], ajustée comme le primaire |
| `--color-accent` | `H + 210°`, `C × 1,05` (max 0,2), `L` bornée [0,50 ; 0,80], ajustée comme le primaire |
| `--color-bg` / `--color-surface` / `--color-surface-2` / `--color-border` | `L` 0,985 / 0,962 / 0,93 / 0,86, `C` 0,012 / 0,022 / 0,035 / 0,04, teinte `H` |
| `--color-text` | `(0,30 ; 0,04 ; H)` assombri jusqu'à **≥ 7:1** sur `--color-bg` |
| `--color-text-muted` | `(0,48 ; 0,04 ; H)` assombri jusqu'à ≥ 4,6:1 |
| `--color-primary-ink` | primaire assombri jusqu'à ≥ 4,5:1 sur le fond (liens, petits titres) |
| `--color-primary-hover` / `-soft` / `-tint` | primaire ±0,06-0,07 en L ; `L` 0,94 et 0,88 avec chroma réduite |
| `--color-ink` / `--color-on-ink` / `--color-ink-accent` | bande foncée `L` 0,24 ; texte clair ou foncé ; lien éclairci jusqu'à ≥ 4,5:1 sur la bande |

Contraste = formule WCAG 2.x `(L1 + 0,05) / (L2 + 0,05)`. `npm run check:contrast` teste les 6 saisons et 8 couleurs extrêmes (blanc, noir, jaune, cyan, gris…) : toutes passent AA.

### Passation WordPress

- Un champ « Couleur principale » (ou une liste de saisons) dans l'administration (Customizer / ACF / `theme.json`).
- Un petit helper PHP qui implémente le tableau ci-dessus (conversions sRGB↔OKLCH : formules de Björn Ottosson, reprises dans `color.js`) et injecte `:root{--color-…}` dans `wp_head`. Possibilité de pré-calculer et stocker le résultat à l'enregistrement.
- Le CSS du thème n'utilise que `var(--color-…)`.

## Logo, apostrophe et typographie

- Le **logo** (SVG inline monochrome, `currentColor`) et l'**apostrophe** (SVG fourni par la MGI) prennent **la couleur de la saison** : logo en `--color-primary-ink` (toujours ≥ 4,5:1 sur le fond), apostrophe en filigrane sur les cartes, et logo sur la bande foncée du pied de page en `--color-ink-accent`. Seules les couleurs changent : forme, typographie et structure restent identiques.
- Typographie : **MGI Grotesque** (titres, fichier fourni, graisse unique) et **Bricolage Grotesque** (texte, variable).
- **Licence (vérifiée)** : Bricolage Grotesque est sous SIL Open Font License 1.1, sans « Reserved Font Name » déclaré : on peut modifier la police et lui donner un autre nom. MGI Grotesque porte déjà dans ses métadonnées la mention de copyright d'origine et la référence à la licence OFL. Obligations : la dérivée reste sous OFL (on ne peut pas la vendre seule ni la placer sous une autre licence) et chaque copie distribuée est accompagnée du texte de la licence (`public/fonts/OFL-BricolageGrotesque.txt` et `LICENSE-MGI-Grotesque.txt`). Le site peut l'utiliser, y compris commercialement ; les fichiers de la MGI sont libres de la partager sous ces conditions.
- Le dossier `Identité visuelle MGI/` (sources `.ai`, logos, polices) sert à la construction du minisite et **n'est pas versionné** (`.gitignore`). Seuls les fichiers nécessaires au site sont dans le dépôt : `public/fonts/*.woff2`, `src/assets/`.

## Mode retours (clients)

Bouton « Retours » : un commentaire par page (et par variante), stocké dans `localStorage` du navigateur, avec **export Markdown** (copier ou télécharger). Aucun back-end. Pour centraliser les retours, renseigner `feedbackFormUrl` dans `src/data/site.ts` (Tally, Google Forms…) : un lien « Formulaire en ligne » apparaît.

## Non indexé et protection

- `<meta name="robots" content="noindex, nofollow, noarchive">` sur chaque page, `public/robots.txt` (`Disallow: /`), en-tête `X-Robots-Tag` (`vercel.json`).
- **Mot de passe (optionnel)** : voir « Mot de passe sur Vercel » ci-dessous.

## Déployer sur Vercel

1. Importer le dépôt GitHub dans Vercel : le preset **Astro** est détecté (build `npm run build`, sortie `dist`). Aucune configuration nécessaire.
2. (Optionnel) Variable `SITE_PASSWORD` pour la protection.
3. Chaque push sur `main` redéploie automatiquement.

## Ce qui est vérifié / supposé

- Vérifié au build : 111 pages, aucun lien interne cassé, 1 seul H1 par page, `noindex` partout, title unique par page dans chaque variante.
- Textes : repris ou adaptés du site actuel quand ils existent (bandeau « Infos SEO » de chaque page). Tarifs, horaires des stages, durées de formation : `[à compléter]`.
- Données structurées (`LocalBusiness`, `Course`, `Event`, `FAQPage`) : **indiquées** par page dans « Infos SEO », non implémentées.
- Visuels : formes de remplacement (apostrophe) ; photos et vidéo en boucle à fournir.

## Mot de passe sur Vercel

[`middleware.ts`](middleware.ts) protège tout le site par une fenêtre identifiant / mot de passe (authentification HTTP « Basic »). Elle ne s'active que si la variable `SITE_PASSWORD` existe. Le plan Hobby de Vercel suffit (la fonction « Password Protection » intégrée à Vercel est, elle, payante).

1. Vercel → le projet → **Settings → Environment Variables**.
2. **Key** : `SITE_PASSWORD` · **Value** : le mot de passe choisi · environnements : *Production* et *Preview*. **Save**.
3. **Deployments** → les trois points du dernier déploiement → **Redeploy** (une variable n'est prise en compte qu'au déploiement suivant).
4. Ouvrir le site : le navigateur demande un identifiant (n'importe lequel) et le mot de passe.

Changer le mot de passe : modifier la valeur, puis Redeploy. Supprimer la protection : supprimer la variable, puis Redeploy.

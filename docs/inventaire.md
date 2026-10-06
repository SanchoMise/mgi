# Inventaire du contenu actuel — mgi-paris.org

Date de relevé : 6 octobre 2026. Données complètes : [`inventaire.csv`](inventaire.csv) (500 lignes : URL, titre, type, public, dernière MAJ, recommandation, niveau de vérification).

## Ce qui est vérifié et ce qui est supposé

| | |
|---|---|
| **Vérifié** | Le sitemap (500 URLs) et le menu de la home. Le contenu (title, meta, H1, début de texte) de 22 pages clés : stages, Toussaint, Haut-Parleurs, formation, infos pratiques, scolaires, stage de 3e, agenda, thèmes, institutionnel, galerie. |
| **Supposé** | Les 329 fiches `/portfolio/` et les ~140 autres archives : type, public et recommandation sont **déduits du slug**, colonne `verifie` = « non ». Je n'ai pas ouvert chaque page. |
| **Non vérifié** | Dates de dernière MAJ réelles : seule la date du sitemap est connue. Elle reflète parfois une régénération technique (beaucoup de pages 2020 ont `lastmod` 2020-06-19, c'est une migration, pas une vraie date de projet). |

⚠️ **Le sitemap est probablement tronqué.** Il compte exactement 500 URLs, ce qui ressemble à la limite d'un générateur gratuit (xml-sitemaps.com, d'après la feuille de style). Il manque des pages pourtant présentes dans le menu : `/rendez-vous-2026-2027/`, `/dilemme-2026-2027/`, `/galerie-des-ateliers/`. Le brief parle d'environ 400 URLs, et le nombre réel est donc à confirmer (export WordPress ou Search Console).

## Répartition par type

| Type | Nb | Reco principale |
|---|---|---|
| Réalisations `/portfolio/` (ateliers scolaires, projets) | 329 | Archiver dans une galerie filtrable, garder les plus récentes |
| Interviews + cartes blanches + thèmes annuels | ~60 | Archiver dans une rubrique « Ressources » |
| Fiches équipe individuelles `/team/` | 16 | Fusionner dans `/equipe/` |
| Pages d'offre en cours | 9 | Garder, refaire les URLs sans date |
| Pages institutionnelles | 7 | Garder, fusionner Lieu + Infos pratiques |
| Feeds, PDF, doublons techniques | ~24 | Retirer du sitemap, supprimer les obsolètes |
| Formation | 1 (+ 8 formations en H2, 5 fiches portfolio) | Garder : 1 page par formation |

## Constats importants

1. **Doublons de saison.** `/stages-ados-…-2025-2026/` et `/…-2026-2027/` ont le même titre SEO et la même meta. L'ancienne version doit rediriger (301) vers l'URL stable.
2. **Doublons techniques.** `/qui-sommes-nous/` et `/qui-sommes-nous-2/` (deux versions, sans H1). `/galerie-des-ateliers/` et `/galerie-des-ateliers-2/` (contenu identique).
3. **Des dates et des noms internes dans les URLs.** `/stage-photo-ado-vacances-toussaint-octobre-2026-atelier-paris/`, `/printemps-d-automne-saison-9-…`, `/haut-parleurs-2026-2027-6e-edition-…-qunadles-…` (avec une coquille). Chaque saison, une nouvelle URL est créée : aucun capital SEO ne s'accumule.
4. **Pages sans H1** : `/qui-sommes-nous/` et `/qui-sommes-nous-2/`. Titles génériques, identiques sur plusieurs pages (« Stages vacances et ateliers hebdo | Maison du Geste et de l'Image »). Sur les stages individuels, le title est « Photo ados | Maison… » : « Paris » et « stage » n'y apparaissent pas.
5. **Contenu daté ou erroné.** Meta description de `/stage-de-3e-…/` : « du 16 au 21 décembre 2024 » alors que la page dit 14-18 décembre 2026. Le menu pointe encore vers `/rendez-vous-2026-2027/` mais le sitemap contient `/rendez-vous-2025-2026/`.
6. **Incohérence d'âges.** 12-18 ans (2025-26), 12-20 ans (2026-27), Haut-Parleurs annoncé 14-18 ans (meta) et 15-20 ans (menu et page stages), consultation 15-24 ans. À clarifier avec la MGI.
7. **Inscription via HelloAsso** (lien externe sur la page photo) : l'inscription en ligne existe donc, hors WordPress.
8. **Les tarifs ne figurent pas dans le texte que j'ai lu** des pages stages : à confirmer (question pour la MGI).
9. **Adresse électronique** : `contact[at]mgi-paris.org` sur Infos pratiques, `contact@mgi-paris.org` dans le menu : harmoniser.
10. **Pages institutionnelles très courtes** : `/partenaires/` (462 caractères de texte, les logos sont sans doute des images, à vérifier).

## Nouveaux types de visiteurs repérés (en plus des 4 du brief)

- **Élèves de 3e** (stage d'observation, candidature à la MGI) : page dédiée existante. Le public est l'élève et sa famille, et il faut un parcours « Stage de 3e » court.
- **Artistes intervenants et compagnies** : cartes blanches, résidences (Judith Sibony, France Jolly…), équipe « artistes intervenants ». Ils cherchent comment collaborer ou être accueillis.
- **Jeunes 15-24 ans (consultation Haut-Parleurs)** : public qui répond à un questionnaire, qui n'est pas le public des stages.
- **Soutiens, mécènes, adhérents** : le bouton « Je soutiens la MGI » existe sur Qui sommes-nous.
- **Champ social / médico-social, structures de handicap** : cités dans la formation et dans les réalisations (« Champ social »). À mon avis ils peuvent rejoindre « Professionnels » sans parcours distinct.

## Menu actuel (relevé sur la home)

La Maison (Qui sommes-nous, Lieu, Partenaires, Équipe, Presse) · Stages jeunes (Toussaint 12/16, théâtre/photo/vidéo, Samedis 15/20) · Atelier scolaire · Agenda · Saisons (26-27 Dilemme, 25-26 … 19-20) · Galerie · Formations · Infos pratiques · Newsletter.

Problème principal : l'entrée « stages » est un libellé interne (« Stages jeunes ») qui mélange un stage de vacances 12-16 ans et un atelier du samedi 15-20 ans. Les « Saisons » (7 entrées) occupent presque autant de place que l'offre.

## Archives : proposition de traitement

| Lot | Nb | Traitement |
|---|---|---|
| Portfolio (ateliers scolaires, projets ; ~250 sur 329 hors stages et formations) | ~250 | Une **galerie filtrable** (discipline, public, année) ; pas de fiches indexées une à une sauf les 20-30 plus fortes. Les autres : `noindex` ou 301 vers la galerie. À décider avec la MGI. |
| Interviews, thèmes annuels | ~40 | Rubrique « Ressources et paroles » |
| Cartes blanches | ~21 | Intégrer à l'agenda archivé |
| Fiches `/team/` | 16 | Fusionner dans l'équipe, 301 |
| PDF anciens | 7 | Garder uniquement brochure courante, dossier de presse, fiches formation |

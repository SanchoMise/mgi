# Propositions d'arborescence — MGI

Priorités retenues (réponse de Bertrand) : **1. inscriptions stages ados, 2. formations pros**. Les ateliers scolaires marchent déjà bien (à préserver, sans les mettre en avant). La notoriété institutionnelle n'est pas une priorité, sauf si elle aide le référencement.

Principes communs aux trois variantes :
- URLs stables, sans saison ni date (`/stages-ados/photo/`). Les sessions (dates, tarifs) vivent dans la page.
- Les noms internes (Printemps d'automne, Haut-Parleurs, PourVoir) deviennent des **sous-titres**, jamais des entrées de menu. Le libellé de menu décrit ce que l'on y fait.
- Les **thèmes annuels** (Dilemme, Société en·jeux…) quittent le menu : ce sont des habillages éditoriaux, regroupés dans « Ressources » (à valider, question 3).
- Les archives se consultent dans une **galerie filtrable** : peu de pages indexées, pas de 329 fiches concurrentes.
- Contact, adresse et téléphone identiques partout (pied de page).

## Variante A — par public

```
/                               Accueil (contenu + 3 entrées de parcours)
├─ /parents-ados/               Parents et ados
│  ├─ stages-vacances/          (photo, vidéo, théâtre, son) 12-16 ans
│  ├─ ateliers-samedis/         Haut-Parleurs, 15-20 ans
│  ├─ stage-de-3e/
│  └─ inscription-tarifs/
├─ /ecoles/                     Enseignants et établissements
│  ├─ ateliers-en-classe/
│  ├─ parcours-croises-jeu-de-paume/
│  └─ realisations/
├─ /professionnels/
│  ├─ formations/               1 page par formation
│  ├─ accueil-tournages-espaces/    [à confirmer]
│  └─ artistes-residences/
├─ /la-maison/
│  ├─ qui-sommes-nous/ · equipe/ · partenaires/ · presse/
│  └─ lieu-et-acces/ · contact/
└─ /ressources/                 Archives, interviews, thèmes annuels
```

**Forces.** Réponse directe au problème n°1 (plusieurs visiteurs). Menu court (4 entrées). Facile à comprendre pour le client. Le menu reprend les mots des visiteurs.
**Limites.** Un stage photo existe dans « Parents-ados », mais les pages de formation photo (cyanotype, sténopé) sont dans « Professionnels » : la **discipline** n'est jamais une entrée, donc peu de pages « photo » qui concentrent le référencement. Un ado de 16 ans ne se reconnaît pas toujours dans « Parents et ados ».
**SEO.** Bon sur les requêtes « stage ados Paris » (hub `/parents-ados/`). Faible sur « stage photo ado Paris » (la page est enfouie à 2 niveaux, sans page disciplinaire transversale). Neutre sur les formations.
**Clics depuis l'accueil.** Stage : 2 (Parents-ados → stage) · Tarifs et inscription : 2 · Formation : 2 · Contact : 1 (pied de page).

## Variante B — par discipline

```
/                               Accueil
├─ /photo/                      Stages ados, formations (cyanotype, sténopé), ateliers scolaires, réalisations
├─ /video/
├─ /theatre/
├─ /son/ · /danse/
├─ /stages-ados/                  vue calendrier de tous les stages (filtre âge, discipline)
├─ /formations/ · /ecoles/
├─ /la-maison/
└─ /ressources/
```
Filtres par public et par âge sur chaque page disciplinaire.

**Forces.** Chaque discipline devient une page forte pour les requêtes génériques. Cohérent avec la façon dont les ados choisissent (« je veux faire de la photo »).
**Limites.** Un enseignant ou un professionnel doit traverser une page « photo » qui parle d'abord aux ados. Les formations (priorité n°2) se mélangent aux stages. Risque de contenu mélangé et de menu qui ne dit pas « qui fait quoi ». Le client pense en public, pas en discipline.
**SEO.** Le meilleur potentiel sur « stage photo ado Paris » / « atelier vidéo ados vacances Toussaint », mais contenu à écrire par discipline.
**Clics.** Stage : 2 · Tarifs : 3 (discipline → stage → tarifs) · Formation : 2-3 · Contact : 1.

## Variante C — hybride (hub par public + pages disciplines transversales)

```
/                               Accueil = vrai contenu + bloc de 3 parcours très visible
├─ /stages-ados/                Hub parents et ados (prochaines sessions, calendrier, inscription)
│  ├─ photo/ · video/ · theatre/ · son/     pages SEO, URLs permanentes
│  ├─ ateliers-samedis/ (Haut-Parleurs)
│  ├─ stage-de-3e/
│  └─ tarifs-inscription/
├─ /formations-pro/             Hub professionnels
│  ├─ (1 page par formation)
│  └─ accueil-tournages-espaces/ [à confirmer]
├─ /ecoles/                     Hub enseignants (ateliers en classe, Jeu de Paume, réalisations)
├─ /la-maison/ (qui sommes-nous, équipe, partenaires, presse, lieu et accès, contact)
└─ /ressources/                 Réalisations (galerie filtrable), interviews, thèmes annuels
```
Les disciplines vivent **sous** les hubs de public : `/stages-ados/photo/` (ado), `/formations-pro/…photo` (pro), `/ecoles/…`. Une discipline = plusieurs pages selon le public, reliées par des liens croisés (« Tu es enseignant ? Voir l'atelier photo en classe »).

**Forces.** Parcours clairs par visiteur **et** pages « stage photo ado Paris » bien nommées. Colle aux deux priorités du client : `/stages-ados/` et `/formations-pro/` sont des entrées de menu de premier niveau. Les écoles restent trouvables sans prendre la vedette. URLs stables et bonnes pour le maillage interne (stage → formation → lieu → contact).
**Limites.** Nécessite de rédiger des pages par discipline et par public, donc un travail éditorial plus lourd. Risque de contenu quasi dupliqué entre `/stages-ados/photo/` et `/formations-pro/photo` : à traiter avec des textes distincts et un canonical si besoin.
**SEO.** Fort : requêtes génériques ciblées par les pages disciplines ados, requêtes professionnelles par `/formations-pro/`, marque conservée en home.
**Clics.** Stage : 1 depuis le menu (Stages ados) puis 1 (discipline) = 2 · Tarifs et inscription : 2 (ou 1 via le bouton de la page stage) · Formation : 2 · Contact : 1.

## Tableau de comparaison

| Critère | A. Public | B. Discipline | C. Hybride |
|---|---|---|---|
| Clarté par visiteur | ★★★ | ★ | ★★★ |
| SEO requêtes génériques | ★ | ★★★ | ★★★ |
| Priorité 1 (stages ados) | ★★ | ★★ | ★★★ |
| Priorité 2 (formations) | ★★ | ★ | ★★★ |
| Effort éditorial | faible | moyen | élevé |
| Menu principal (nb d'entrées) | 4 | 6-7 | 5 |
| Facilité de passation WordPress | ★★★ | ★★ | ★★ |

## Recommandation : variante C, avec deux ajustements

1. **Niveau 1 du menu : Stages ados · Formations pro · Écoles · La Maison.** Pas d'entrée « Saisons » ni « Galerie » : elles passent en « Ressources » (pied de page ou sous La Maison). Les écoles marchent déjà, elles n'ont pas besoin d'une place plus visible que les deux priorités.
2. **Commencer par les pages de plus forte valeur** : `/stages-ados/{photo,video,theatre}/` (déjà existantes sur le site) et `/formations-pro/` (1 page par formation, 8 formations déjà listées). Les pages son et danse apparaissent quand la MGI propose réellement ces offres (le brief cite danse et son, mais le site 2026-27 n'affiche que théâtre, photo, vidéo : à confirmer).

**Alternative à challenger : variante D « calendrier-first ».** Une page `/stages-ados/` qui est avant tout un **calendrier/filtre** (âge, discipline, période) avec cartes de sessions, et les pages disciplines comme simples « fiches » liées. C'est la C, avec un filtre à la place d'une liste. Plus moderne à prototyper, mais je ne la crois pas nécessaire si le catalogue reste à 3-4 offres. À tester dans le prototype comme sous-option de C.

## Page d'accueil (étape 3) — mon choix

Une home **avec du vrai contenu** (hero avec titre H1 clair, prochaines sessions de stages, bloc formation, accès écoles) et, juste sous le hero, trois cartes « Je suis… » : Parent ou ado · Enseignant·e · Professionnel·le. Ce sont de vrais liens `<a>` vers les hubs `/stages-ados/`, `/ecoles/`, `/formations-pro/`, sans JavaScript requis, sans choix mémorisé. Pas d'interstitiel. Compromis accepté : la home parle à tout le monde, donc elle est un peu moins ciblée qu'une page de choix, mais Google voit du contenu et un maillage complet.

## Redirections nécessaires (principe)

Toutes les anciennes URLs de saison → 301 vers l'URL stable. Les `/portfolio/…` sans valeur → 301 vers la galerie ou `noindex` (décision MGI). Les `/team/…` → `/la-maison/equipe/`.

# Brief : minisite de test d'arborescence — Maison du Geste et de l'Image (MGI)

## Contexte

La MGI (Maison du Geste et de l'Image, 42 rue Saint-Denis, 75001 Paris, métro Châtelet) propose des ateliers de pratique artistique (photo, vidéo, théâtre, danse, son) pour les enfants et adolescents. Le site actuel (https://www.mgi-paris.org/, WordPress) va être refait. Il sera ensuite développé par un développeur WordPress ; mon rôle est l'arborescence, le design et la passation.

**Ta mission dans ce projet :** m'aider à concevoir et à tester une nouvelle arborescence, via un minisite de prototypage (pas le site final), poussé sur GitHub et hébergé sur Vercel. Le client (MGI) va aussi réfléchir de son côté à une arborescence : le minisite doit permettre de comparer facilement plusieurs propositions.

## Problèmes à résoudre

1. **Plusieurs visiteurs, un seul site.** Le site actuel parle d'abord aux institutions et aux enseignants, alors que les parents cherchent des stages pour leurs ados. Il faut des parcours clairs par type de visiteur.
2. **Visibilité Google insuffisante** sur les requêtes génériques (« stage photo ado Paris », « atelier vidéo ados vacances Toussaint »), alors que la marque ressort bien.
3. **Navigation actuelle confuse** : entrée « 26-27 », « Saisons passées » par thème (Liberté·s, Pouvoir·s…), noms internes (Haut-Parleurs, Printemps d'automne, PourVoir), URLs qui changent chaque saison.
4. **Contenu d'archives très nombreux** (environ 400 URLs dont des centaines de fiches `/portfolio/` de 2016 à 2021).

## Visiteurs identifiés (à confirmer et affiner)

- **Parents et ados** : trouver un stage (vacances, samedis), les dates, les tarifs, s'inscrire.
- **Enseignants et établissements scolaires** : monter un atelier en classe, séance découverte « PourVoir », voir des réalisations.
- **Professionnels** (animateurs, médiateurs, structures socio-culturelles) : formations 2026-2027, accueil de tournages et location d'espaces.
- **Partenaires, institutions, presse** : qui est la MGI, équipe, partenaires, dossier de presse.

Si tu repères d'autres types de visiteurs dans le contenu actuel, propose-les.

## Étape 1 : inventaire du contenu actuel

- Récupère la structure du site actuel : https://www.mgi-paris.org/sitemap.xml (et le menu de la home). Note que le sitemap contient des feeds, des PDF et beaucoup d'archives : filtre-les.
- Produis un inventaire en tableau (fichier `inventaire.md` ou `.csv`) : URL, titre, type de page (offre en cours, projet passé, interview, page institutionnelle, formation, PDF…), public visé, date de dernière mise à jour, recommandation (garder / fusionner / archiver / supprimer).
- Repère les doublons de saison (ex. pages 2025-2026 et 2026-2027) et les pages obsolètes.
- Si tu ne peux pas accéder à une page, dis-le moi plutôt que de supposer son contenu.

## Étape 2 : propositions d'arborescence

Propose **2 à 3 variantes** d'arborescence, chacune avec :

- un schéma (liste hiérarchique ou diagramme),
- ses forces et ses limites,
- l'impact SEO attendu,
- le nombre de clics pour atteindre les pages importantes (stage, tarifs, inscription, contact).

Pistes à explorer, à challenger :

- **Variante A : par public.** Un hub d'accueil qui oriente vers « Parents et ados », « Enseignants et écoles », « Professionnels », « La Maison ».
- **Variante B : par discipline** (photo, vidéo, théâtre, danse…), avec filtres par public et par âge.
- **Variante C : hybride.** Hub par public en accueil, et pages disciplines transversales qui servent le SEO (« stage photo ados Paris »).

Ta recommandation doit être argumentée, et tu peux proposer une autre variante si tu en vois une meilleure.

## Étape 3 : page d'accueil avec parcours

Idée à tester : une entrée qui propose des parcours selon le profil du visiteur (« Je suis parent / ado », « Je suis enseignant·e », « Je suis un·e professionnel·le »).

**Attention SEO, point important :** ne pas faire une page de choix bloquante (écran d'interstitiel sans contenu) à la place de la home. Google a besoin de texte, de titres et de liens indexables. Préfère une **home qui contient du vrai contenu et un bloc d'entrée par parcours très visible**, avec des liens HTML classiques (pas de navigation uniquement en JavaScript, pas de choix mémorisé qui cache le reste du site). Chaque parcours doit aussi avoir sa propre page d'atterrissage stable. Tu peux me proposer une alternative, en expliquant le compromis.

## Étape 4 : le minisite de test

Construis un prototype navigable, léger et moderne :

- **Stack suggérée** : un site statique (par exemple Astro, ou Next.js en export statique, ou Vite), sans back-end, déployable sur Vercel. Propose ton choix et justifie-le brièvement.
- **Contenu** : réel quand il existe (titres, textes courts, noms de pages actuelles), factice et clairement balisé sinon. Ne pas inventer de tarifs, de dates ou d'informations pratiques : utiliser des mentions du type « [à compléter] ».
- **Plusieurs arborescences dans le même prototype** : un sélecteur discret en haut de page (« Variante A / B / C ») pour comparer, sans dupliquer le code.
- **Navigation** : menu principal, fil d'Ariane, pied de page, page d'accueil avec parcours, une page de parcours type, une page de stage type, une page d'ateliers scolaires, une page formation, une page lieu et accès, une page de réalisation.
- **Moderne et dynamique** : transitions douces entre pages, animations légères à l'apparition, survols, éléments visuels attrayants (cartes, grandes images, vidéo en boucle si pertinent). Rester sobre et fluide, performant sur mobile, et respecter `prefers-reduced-motion`.
- **Responsive** et **accessible** : contrastes suffisants, navigation clavier, balises sémantiques, textes alternatifs.
- **Couleurs changeables en un clic** : voir la section « Système de couleurs saisonnier » plus bas.
- **Mode test** : un petit mode « retours » permettant au client de laisser un commentaire par page (ou un lien vers un formulaire simple), pour collecter les retours sans outil complexe.

### Identité visuelle (indices, à confirmer)

La MGI a une identité que j'ai conçue il y a quelques années : le logo « apostrophe » existe en version rose sur fond violet, et la couleur de thème actuelle du site est `#eca06c` (orange). Pour le prototype, reste sobre et neutre (on ne fait pas encore le design) : une seule couleur d'accent, une typographie lisible, beaucoup d'espace. Je te transmettrai les fichiers d'identité si nécessaire.

### Système de couleurs saisonnier (à prototyper)

Le site doit pouvoir changer de couleurs **très simplement**, avec un nouveau jeu de couleurs par saison (automne, hiver, printemps, été, ou saison d'activité de la MGI). Principe : **on choisit une seule couleur principale, et toutes les autres sont générées automatiquement.**

- **Une seule entrée** : une couleur principale (valeur hex). Tout le reste en découle.
- **Génération automatique** à partir de cette couleur (en OKLCH ou HSL, au choix, à justifier) : couleur secondaire et couleur d'accent (rotation de teinte), nuances claires et foncées (teintes de fond, survols, bordures), fonds neutres légèrement teintés, et **couleur de texte calculée pour garantir le contraste** (WCAG AA minimum : 4,5:1 pour le texte courant). Si la couleur choisie ne permet pas un contraste suffisant, le système ajuste la luminosité automatiquement plutôt que de produire une combinaison illisible.
- **Implémentation** : variables CSS (custom properties) sur `:root` (`--color-primary`, `--color-secondary`, `--color-accent`, `--color-bg`, `--color-surface`, `--color-text`, etc.). Aucune couleur écrite en dur dans les composants : tout passe par ces variables. Idéalement, un seul fichier de configuration (`theme.json` ou équivalent) contient la liste des saisons et leur couleur principale.
- **Presets par saison** : une liste de jeux prédéfinis (une couleur principale par saison, à partir de `#eca06c` pour l'un d'eux) et un **sélecteur dans le prototype** (menu discret ou panneau de démonstration) avec un sélecteur de couleur libre, pour que le client voie le site changer en direct.
- **Transition douce** entre deux jeux de couleurs, qui respecte `prefers-reduced-motion`.
- **Ce qui ne change pas** : le logo, la typographie et la structure restent identiques ; seules les couleurs bougent. Prévois comment le logo « apostrophe » s'adapte (version monochrome ou sur fond coloré) et signale-le-moi.
- **Passation WordPress** : conçois les variables pour qu'elles se transposent facilement dans le thème WordPress (par exemple un champ « couleur principale » dans l'administration, ou une saison choisie dans une liste, qui injecte les variables CSS). Documente la méthode de calcul des couleurs dérivées dans le `README`, pour que le développeur puisse la reproduire.

## Contraintes SEO à respecter dans l'arborescence et dans le prototype

- Une URL stable par offre, sans date ni saison dedans (`/stages-ados/photo/` et non `/stage-photo-ado-vacances-toussaint-octobre-2026/`) ; les dates et tarifs de chaque session se mettent à jour dans la page.
- Un `title` et une `meta description` uniques par page, avec « Paris » et la discipline quand c'est pertinent.
- Une seule balise `h1` par page, une hiérarchie `h2`/`h3` logique.
- Des liens internes explicites entre pages liées (stage → formation → lieu → contact).
- Des pages « Lieu et accès » et « Contact » avec nom, adresse et téléphone cohérents (42 rue Saint-Denis, 75001 Paris, 01 42 36 33 52).
- Données structurées prévues (`LocalBusiness`, `Event`/`Course`, `FAQPage`) : indique-les dans les gabarits, même si elles ne sont pas implémentées dans le prototype.
- **Le minisite doit rester non indexé** : balise `noindex` sur toutes les pages, `robots.txt` en `Disallow: /`, et une protection légère si possible. Il ne faut pas créer de doublon de contenu ni diluer le site actuel.

## Livrables attendus

1. `inventaire.md` : inventaire du contenu actuel avec recommandations.
2. `arborescences.md` : 2 à 3 variantes, comparaison, recommandation.
3. Le minisite (dépôt GitHub) déployé sur Vercel, avec un `README` expliquant comment le lancer, ajouter une variante et déployer.
4. `questions.md` : les questions ouvertes à poser à la MGI.

## Façon de travailler

- **Commence par me poser les questions importantes** (une à quatre à la fois) avant de construire : ce que tu ne peux pas deviner depuis le site actuel.
- Fais d'abord l'inventaire et les variantes d'arborescence, et **attends mon retour** avant de construire le minisite complet.
- Sois force de proposition : si tu vois une meilleure approche que celles décrites ici, dis-le et explique pourquoi.
- Signale clairement ce qui est supposé et ce qui est vérifié.
- Commits fréquents et lisibles ; un dépôt GitHub propre dès le début.

## Questions déjà identifiées pour la MGI

- Quelle est la priorité n°1 du site : inscriptions aux stages, ateliers scolaires, formations, ou notoriété institutionnelle ?
- Quelles pages d'archives doivent absolument rester accessibles (réalisations, interviews, thèmes annuels) ?
- Les thématiques annuelles (Égalité·s, Liberté·s, Pouvoir·s, Dilemme…) doivent-elles rester un axe de navigation ou devenir un simple habillage éditorial ?
- Y a-t-il un système d'inscription en ligne aujourd'hui, ou seulement un contact ? (à intégrer côté WordPress)
- Qui met à jour le site, et à quelle fréquence ?
- Faut-il une version en anglais ?

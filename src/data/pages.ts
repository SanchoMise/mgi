// Registre des pages : le CONTENU, indépendant de l'arborescence.
// Les arborescences (variants.ts) placent ces pages (par `id`) à des URLs différentes.
// Règle : contenu réel quand il existe sur le site actuel ; sinon « [à compléter] » (jamais de tarif, date ou info pratique inventés).

export type Template =
  | 'home' | 'hub' | 'stage' | 'ecole' | 'formation' | 'lieu' | 'realisation'
  | 'discipline' | 'text' | 'gallery' | 'contact';

export type Source = 'réel' | 'adapté' | 'à compléter';

export interface Session { label: string; dates: string; details?: string; }
export interface Faq { q: string; a: string; }

export interface PageDef {
  id: string;
  slug: string;
  label: string;          // libellé de menu (explicite, sans nom interne)
  template: Template;
  title: string;          // <title> unique
  description: string;    // meta description unique
  h1: string;
  subtitle?: string;      // nom interne éventuel (Printemps d'automne…) en sous-titre
  lead?: string;
  body?: string[];
  source: Source;         // pour le bandeau « contenu réel / à compléter »
  schema?: string[];      // données structurées prévues dans le gabarit (non implémentées)
  related?: string[];     // liens internes explicites entre pages liées
  cards?: string[];       // pour les hubs : pages mises en avant (sinon les enfants de l'arbre)
  audience?: string;
  sessions?: Session[];
  facts?: [string, string][];
  faq?: Faq[];
  tags?: string[];
  discipline?: string;
}

const T = '[à compléter]';

const faqStage = (what: string): Faq[] => [
  { q: 'Quel âge faut-il avoir ?', a: `Les stages vacances s'adressent aux 12-16 ans. ${T} (règle des âges à confirmer avec la MGI).` },
  { q: `Faut-il avoir déjà pratiqué (${what}) ?`, a: 'Non : le stage s\'adresse aussi bien aux débutants qu\'aux plus expérimentés.' },
  { q: 'Comment s\'inscrire ?', a: `Par le lien d'inscription HelloAsso de la page. ${T} tarifs et modalités.` },
  { q: 'Où a lieu le stage ?', a: 'À la MGI, 42 rue Saint-Denis, Paris 1er (métro Châtelet), ou chez un partenaire. Voir la page Lieu et accès.' },
];

const TOUSSAINT: Session = {
  label: 'Vacances de la Toussaint',
  dates: 'Du 19 au 23 octobre 2026',
  details: 'Présentation collective le vendredi 23 octobre à l\'Espace Jean Dame. Horaires par groupe : ' + T,
};

const FORMATIONS: [string, string, string, string][] = [
  // slug, label, titre, discipline
  ['oral-aisance-impact', "Développer son aisance et son impact à l'oral", "Développer son aisance et son impact à l'oral", 'theatre'],
  ['mouvement-danse', 'Faire groupe par le mouvement et la danse', 'Faire groupe par le mouvement et la danse', 'danse'],
  ['theatre-3-6-ans-album', "Animer un atelier théâtre pour les 3-6 ans avec l'album jeunesse", "Animer un atelier théâtre pour les 3-6 ans avec l'album jeunesse", 'theatre'],
  ['creation-sonore', "Concevoir un projet de création sonore pour un groupe d'enfants et d'adolescents", 'Concevoir un projet de création sonore', 'son'],
  ['cyanotype', "Le Cyanotype : pratique et expérimentation avec un groupe d'enfants et d'adolescents", 'Le Cyanotype', 'photo'],
  ['stenope', "Le Sténopé : pratique et expérimentation avec un groupe d'enfants et d'adolescents", 'Le Sténopé', 'photo'],
  ['cinema-animation', "Concevoir un projet de cinéma d'animation pour un groupe d'enfants et d'adolescents", "Concevoir un projet de cinéma d'animation", 'video'],
  ['realisation-audiovisuelle', "Initier un projet de réalisation audiovisuelle pour un groupe d'enfants et d'adolescents", 'Initier un projet de réalisation audiovisuelle', 'video'],
];

export const formationIds = FORMATIONS.map(([slug]) => `formation-${slug}`);

const formationPages: PageDef[] = FORMATIONS.map(([slug, h1, label, disc]) => ({
  id: `formation-${slug}`,
  slug,
  label,
  template: 'formation',
  title: `Formation : ${label} | Formation professionnelle à Paris | MGI`,
  description: `Formation courte à Paris : ${label.toLowerCase()}. Pour enseignant·es, animateur·rices, médiateur·rices et artistes intervenant·es. Maison du Geste et de l'Image.`,
  h1: h1,
  lead: "Formation de format court, pour imaginer et construire des projets artistiques avec un groupe d'enfants ou d'adolescents.",
  source: 'adapté',
  schema: ['Course', 'FAQPage'],
  discipline: disc,
  audience: 'Professionnel·les',
  facts: [
    ['Public', 'Enseignant·es, animateur·rices, médiateur·rices, professionnel·les du champ social, artistes intervenant·es'],
    ['Durée et dates', T],
    ['Tarif et prise en charge', T],
    ['Intervenant·e', T],
    ['Lieu', 'MGI, 42 rue Saint-Denis, Paris 1er'],
  ],
  faq: [
    { q: 'À qui s\'adresse cette formation ?', a: 'Aux professionnel·les qui souhaitent conduire un projet artistique avec un groupe d\'enfants ou d\'adolescents.' },
    { q: 'Peut-elle être prise en charge ?', a: T },
  ],
  related: ['formations', 'lieu-acces', 'contact', `disc-${disc}`],
}));

const pages: PageDef[] = [
  {
    id: 'home', slug: '', label: 'Accueil', template: 'home',
    title: "Stages ados et ateliers artistiques à Paris | Maison du Geste et de l'Image",
    description: "Stages photo, vidéo et théâtre pour les ados à Paris, ateliers en classe et formations pour professionnel·les. Maison du Geste et de l'Image, 42 rue Saint-Denis, Paris 1er.",
    h1: 'Ateliers de pratique artistique pour les enfants et les adolescent·es',
    lead: 'Théâtre, photo, vidéo et son, au cœur de Paris, à deux pas de Châtelet.',
    source: 'adapté',
    schema: ['LocalBusiness'],
    related: ['stages-ados', 'formations', 'ecoles', 'lieu-acces'],
  },

  /* ---------- Parents et ados ---------- */
  {
    id: 'stages-ados', slug: 'stages-ados', label: 'Stages ados', template: 'hub',
    title: 'Stages ados à Paris : théâtre, photo, vidéo (vacances et samedis) | MGI',
    description: 'Stages pendant les vacances pour les 12-16 ans et ateliers du samedi pour les 15-20 ans : théâtre, photo, vidéo. Prochaines dates, inscription, tarifs.',
    h1: 'Stages et ateliers pour les ados à Paris',
    lead: 'Pendant les petites vacances (12-16 ans) ou les samedis après-midi (15-20 ans) : choisis un champ artistique et crée avec des professionnel·les.',
    source: 'adapté', audience: 'Parents et ados',
    schema: ['Event', 'FAQPage'],
    cards: ['stage-photo', 'stage-video', 'stage-theatre', 'samedis', 'stage-3e', 'tarifs-inscription'],
    sessions: [TOUSSAINT],
    related: ['formations', 'lieu-acces', 'contact'],
  },
  {
    id: 'stage-photo', slug: 'photo', label: 'Stage photo ados', template: 'stage',
    title: 'Stage photo ados à Paris, 12-16 ans, vacances | MGI',
    description: 'Stage photo pour ados de 12 à 16 ans à Paris pendant les vacances : prise de vue en studio, matériel professionnel, avec un·e photographe. Maison du Geste et de l\'Image.',
    h1: 'Stage photo ados à Paris',
    subtitle: "Printemps d'automne, saison 9",
    lead: "Cinq jours dans un groupe de 5 à 10 jeunes photographes : prise de vue en vrai studio, matériel professionnel, avec un·e artiste photographe. Débutant·es ou expérimenté·es, tout le monde est bienvenu·e.",
    source: 'réel', audience: 'Parents et ados', discipline: 'photo',
    schema: ['Course', 'Event', 'FAQPage'],
    tags: ['12-16 ans', 'Vacances', 'Photo'],
    sessions: [TOUSSAINT],
    facts: [['Âge', '12-16 ans'], ['Groupe', '5 à 10 jeunes'], ['Durée', '5 jours'], ['Tarif', T], ['Inscription', 'HelloAsso (lien existant sur le site actuel)']],
    faq: faqStage('de la photo'),
    related: ['stage-video', 'stage-theatre', 'formation-cyanotype', 'lieu-acces', 'tarifs-inscription', 'contact', 'disc-photo'],
  },
  {
    id: 'stage-video', slug: 'video', label: 'Stage vidéo ados', template: 'stage',
    title: 'Stage vidéo ados à Paris, 12-16 ans, vacances | MGI',
    description: 'Stage vidéo pour ados de 12 à 16 ans à Paris pendant les vacances : écrire, tourner et monter un film collectif avec des professionnel·les. MGI, Paris 1er.',
    h1: 'Stage vidéo ados à Paris',
    subtitle: "Printemps d'automne, saison 9",
    lead: `Cinq jours pour imaginer et réaliser une forme vidéo à partir d'un texte contemporain, puis la présenter lors d'une représentation collective. ${T} (texte à reprendre de la page actuelle).`,
    source: 'adapté', audience: 'Parents et ados', discipline: 'video',
    schema: ['Course', 'Event', 'FAQPage'],
    tags: ['12-16 ans', 'Vacances', 'Vidéo'],
    sessions: [TOUSSAINT],
    facts: [['Âge', '12-16 ans'], ['Durée', '5 jours'], ['Tarif', T], ['Inscription', T]],
    faq: faqStage('de la vidéo'),
    related: ['stage-photo', 'stage-theatre', 'formation-realisation-audiovisuelle', 'lieu-acces', 'tarifs-inscription', 'contact', 'disc-video'],
  },
  {
    id: 'stage-theatre', slug: 'theatre', label: 'Stage théâtre ados', template: 'stage',
    title: 'Stage théâtre ados à Paris, 12-16 ans, vacances | MGI',
    description: 'Stage théâtre pour ados de 12 à 16 ans à Paris pendant les vacances : jouer un texte contemporain avec un·e metteur·se en scène et le présenter sur scène. MGI, Paris 1er.',
    h1: 'Stage théâtre ados à Paris',
    subtitle: "Printemps d'automne, saison 9",
    lead: `Cinq jours pour s'emparer d'un texte contemporain (« Gardien des arbres », de Lise Martin et Laurent Contamin) et le présenter lors d'une représentation collective à l'Espace Jean Dame.`,
    source: 'adapté', audience: 'Parents et ados', discipline: 'theatre',
    schema: ['Course', 'Event', 'FAQPage'],
    tags: ['12-16 ans', 'Vacances', 'Théâtre'],
    sessions: [TOUSSAINT],
    facts: [['Âge', '12-16 ans'], ['Durée', '5 jours'], ['Tarif', T], ['Inscription', T]],
    faq: faqStage('du théâtre'),
    related: ['stage-photo', 'stage-video', 'formation-oral-aisance-impact', 'lieu-acces', 'tarifs-inscription', 'contact', 'disc-theatre'],
  },
  {
    id: 'samedis', slug: 'ateliers-samedis', label: 'Ateliers du samedi (15-20 ans)', template: 'stage',
    title: 'Ateliers du samedi pour ados à Paris : écriture, théâtre, vidéo | MGI',
    description: "Un parcours de 50 h les samedis après-midi, d'octobre à mars : écriture, théâtre et vidéo autour de la jeunesse et de la démocratie. Maison du Geste et de l'Image, Paris.",
    h1: 'Ateliers du samedi : jeunesse et démocratie',
    subtitle: 'Haut-Parleurs, 6e édition',
    lead: "Droits humains, environnement, harcèlement, discriminations… Quels sujets te tiennent à cœur ? Un parcours d'écriture, de théâtre et de vidéo pour faire entendre ta voix.",
    source: 'adapté', audience: 'Ados et jeunes adultes',
    schema: ['Course', 'Event', 'FAQPage'],
    tags: ['Samedis', 'Écriture', 'Théâtre', 'Vidéo'],
    sessions: [{ label: 'Saison 2026-2027', dates: "Quelques samedis après-midi, d'octobre 2026 à mars 2027", details: "Environ 50 h d'ateliers et de stages. Calendrier : " + T }],
    facts: [['Âge', '[à confirmer : 14-18 ans ou 15-20 ans selon les pages actuelles]'], ['Volume', "50 h d'ateliers et stages"], ['Tarif', T]],
    faq: [
      { q: 'À qui s\'adressent ces ateliers ?', a: 'Aux ados et jeunes adultes. ' + T + ' (tranche d\'âge à confirmer).' },
      { q: 'Quelle différence avec les stages de vacances ?', a: 'Les stages durent cinq jours pendant les vacances ; les ateliers du samedi forment un parcours sur plusieurs mois.' },
    ],
    related: ['stages-ados', 'lieu-acces', 'tarifs-inscription', 'contact'],
  },
  {
    id: 'stage-3e', slug: 'stage-de-3e', label: 'Stage de 3e', template: 'text',
    title: 'Stage de 3e à Paris : découverte des métiers des arts et de la culture | MGI',
    description: "Stage d'observation de 3e à la MGI (Paris 1er) : rencontres avec l'équipe et des artistes, visite d'un lieu culturel, temps de pratique. Du 14 au 18 décembre 2026.",
    h1: 'Stage de 3e : découverte des métiers des arts et de la culture',
    lead: "Du 14 au 18 décembre 2026, la MGI accueille une dizaine d'élèves de 3e en stage d'observation.",
    body: [
      "Au programme : rencontres avec l'équipe (communication, médiation, direction, technique) et avec des artistes, visite d'un lieu culturel, temps de pratique artistique (théâtre, photo, vidéo, stop motion), observation de groupes en atelier, supports de rédaction du rapport de stage.",
      "Les élèves motivé·es adressent leur candidature à la MGI. Modalités de candidature : [à compléter].",
    ],
    source: 'réel', audience: 'Élèves de 3e et familles',
    related: ['stages-ados', 'contact', 'lieu-acces'],
  },
  {
    id: 'tarifs-inscription', slug: 'tarifs-inscription', label: 'Tarifs et inscription', template: 'text',
    title: 'Tarifs et inscription aux stages ados à Paris | MGI',
    description: "Comment s'inscrire à un stage ou à un atelier de la MGI à Paris : tarifs, modalités, aides possibles. Inscription en ligne.",
    h1: 'Tarifs et inscription',
    lead: "Les stages et ateliers se réservent en ligne. Les tarifs ci-dessous sont à compléter avec la MGI : aucun montant n'est inventé dans ce prototype.",
    body: [
      'Stage vacances 12-16 ans (5 jours) : [tarif à compléter]',
      'Ateliers du samedi (parcours de 50 h) : [tarif à compléter]',
      "Aides, tarif réduit, paiement en plusieurs fois : [à compléter]",
      "Inscription : en ligne via HelloAsso (système actuel). Procédure détaillée : [à compléter].",
    ],
    source: 'à compléter', audience: 'Parents et ados',
    schema: ['FAQPage'],
    related: ['stages-ados', 'contact'],
  },

  /* ---------- Professionnel·les ---------- */
  {
    id: 'formations', slug: 'formations-pro', label: 'Formations pro', template: 'hub',
    title: 'Formation professionnelle à Paris : animer un projet artistique avec des jeunes | MGI',
    description: "Formations courtes à Paris pour enseignant·es, animateur·rices, médiateur·rices et artistes : théâtre, photo, vidéo, son, danse. Programme 2026-2027.",
    h1: 'Formation professionnelle continue',
    lead: "Forte de 40 ans d'expérience dans la co-construction de parcours artistiques pour les classes, la MGI propose des formations courtes pour construire des projets artistiques avec un groupe d'enfants ou d'adolescents.",
    source: 'réel', audience: 'Professionnel·les',
    schema: ['Course', 'FAQPage'],
    cards: formationIds,
    facts: [['Programme 2026-2027 (PDF actuel)', 'fiches_formation_2026_2027-v4.pdf']],
    related: ['accueil-espaces', 'ecoles', 'lieu-acces', 'contact'],
  },
  ...formationPages,
  {
    id: 'accueil-espaces', slug: 'accueil-tournages-espaces', label: 'Accueil de tournages et espaces', template: 'text',
    title: "Location d'espaces et accueil de tournages à Paris, Châtelet | MGI",
    description: "Studio théâtre, labo photo, espaces multimédia et cabine d'enregistrement au cœur de Paris : accueil de tournages et d'ateliers. MGI, 42 rue Saint-Denis.",
    h1: "Accueil de tournages et location d'espaces",
    lead: "Offre citée dans le brief mais absente du site actuel : [à confirmer avec la MGI]. Cette page est un gabarit prévu pour la décrire.",
    body: ['Espaces disponibles : [à compléter]', 'Conditions et tarifs : [à compléter]', 'Contact : voir la page Contact.'],
    source: 'à compléter', audience: 'Professionnel·les',
    related: ['lieu-acces', 'contact', 'formations'],
  },
  {
    id: 'artistes', slug: 'artistes-residences', label: 'Artistes et résidences', template: 'text',
    title: 'Artistes intervenant·es et résidences à Paris | MGI',
    description: "Cartes blanches, résidences de création et artistes intervenant·es à la Maison du Geste et de l'Image, Paris 1er.",
    h1: 'Artistes et résidences',
    lead: "La MGI accueille des résidences de création (théâtre, vidéo…) et propose des cartes blanches. Contenu à reprendre de l'agenda actuel.",
    body: ['Comment proposer un projet : [à compléter]', 'Résidences à venir : voir l\'agenda.'],
    source: 'à compléter', audience: 'Artistes et compagnies',
    related: ['agenda', 'contact'],
  },

  /* ---------- Enseignant·es ---------- */
  {
    id: 'ecoles', slug: 'ecoles', label: 'Écoles', template: 'hub',
    title: 'Ateliers artistiques en classe à Paris : théâtre, photo, vidéo | MGI',
    description: "Parcours de pratique artistique sur mesure pour les classes, de la maternelle à la terminale : théâtre, vidéo, photographie, avec un·e artiste. MGI, Paris 1er.",
    h1: 'Parcours artistiques pour les classes',
    lead: "De la maternelle à la terminale, la MGI propose des parcours artistiques sur mesure, construits avec les enseignant·es et un·e artiste.",
    source: 'adapté', audience: 'Enseignant·es',
    cards: ['ateliers-classe', 'parcours-croises', 'realisations'],
    related: ['formations', 'lieu-acces', 'contact'],
  },
  {
    id: 'ateliers-classe', slug: 'ateliers-en-classe', label: 'Ateliers en classe : mode d\'emploi', template: 'ecole',
    title: "Ateliers artistiques en classe à Paris : mode d'emploi | MGI",
    description: "Enseignant·es, animateur·rices : construisez un projet de pratique artistique avec vos élèves (théâtre, vidéo, photo). Rencontrez la MGI à Paris.",
    h1: 'Parcours artistique en classe : mode d\'emploi',
    lead: "Primaire, collège, classes ULIS, SEGPA, lycée général, technologique ou professionnel : le parcours s'inscrit dans le volet culturel de l'établissement et son Parcours d'Éducation Artistique et Culturelle.",
    body: [
      "Théâtre, vidéo et photographie sont les trois disciplines principales. Elles peuvent s'articuler selon les objectifs artistiques et pédagogiques.",
      "Les responsables de secteurs co-construisent le parcours avec vous, en binôme avec l'artiste qui conduira l'atelier. Durée, calendrier et budget : [à compléter, voir page actuelle].",
    ],
    source: 'adapté', audience: 'Enseignant·es',
    schema: ['Course', 'FAQPage'],
    facts: [['Niveaux', 'De la maternelle à la terminale'], ['Disciplines', 'Théâtre, vidéo, photographie'], ['Durée / calendrier', T], ['Financement', T]],
    faq: [
      { q: 'Comment construire un projet avec la MGI ?', a: 'En contactant la responsable du secteur concerné (théâtre, audiovisuel, photo). ' + T },
      { q: 'Peut-on faire une séance découverte ?', a: '[à confirmer : séance « PourVoir » citée dans le brief, absente du site actuel]' },
    ],
    related: ['parcours-croises', 'realisations', 'formations', 'contact', 'lieu-acces'],
  },
  {
    id: 'parcours-croises', slug: 'parcours-croises-jeu-de-paume', label: 'Parcours croisés avec le Jeu de Paume', template: 'ecole',
    title: 'Parcours croisés Jeu de Paume x MGI : exposition et atelier pour les classes | Paris',
    description: "Un parcours en trois séances de pratique associé à la découverte des expositions du Jeu de Paume, pour une classe. Partenariat Jeu de Paume et MGI, Paris.",
    h1: 'Parcours croisés avec le Jeu de Paume',
    lead: "Le Jeu de Paume et la MGI associent la découverte des expositions à des ateliers de pratique (images fixes, images en mouvement ou théâtre).",
    body: ["Le projet comprend trois séances de trois heures de pratique. Détails et conditions : [à compléter]."],
    source: 'adapté', audience: 'Enseignant·es',
    facts: [['Séances', '3 séances de 3 h de pratique'], ['Tarif', T]],
    related: ['ateliers-classe', 'contact'],
  },

  /* ---------- La Maison ---------- */
  {
    id: 'maison', slug: 'la-maison', label: 'La Maison', template: 'hub',
    title: "La Maison du Geste et de l'Image : qui sommes-nous | Paris 1er",
    description: "Association de pratique artistique pour la jeunesse, subventionnée par la Ville de Paris et agréée par l'Éducation nationale. Équipe, partenaires, presse.",
    h1: 'La Maison',
    lead: "La pratique artistique est essentielle pour grandir : elle développe l'écoute, le regard, l'esprit critique.",
    source: 'adapté', audience: 'Partenaires, institutions, presse',
    cards: ['qui-sommes-nous', 'equipe', 'partenaires', 'presse', 'lieu-acces', 'contact'],
    related: ['contact'],
  },
  {
    id: 'qui-sommes-nous', slug: 'qui-sommes-nous', label: 'Qui sommes-nous ?', template: 'text',
    title: "Qui sommes-nous ? Lieu de pratique artistique pour la jeunesse à Paris | MGI",
    description: "La MGI place l'art au cœur de l'apprentissage des jeunes : une éducation active, par la coopération, à travers la pratique et l'expérimentation artistiques.",
    h1: 'Qui sommes-nous ?',
    lead: "La Maison du geste et de l'image travaille chaque jour à placer l'art au cœur de l'apprentissage des jeunes. Elle défend une éducation active, par la coopération, dans le respect des autres comme de soi.",
    body: ['Texte complet : à reprendre de la page actuelle « Qui sommes-nous ? » (deux versions existent aujourd\'hui, à fusionner).', 'Soutenir la MGI : [lien à compléter]'],
    source: 'adapté', audience: 'Partenaires, institutions, presse',
    related: ['equipe', 'partenaires', 'presse', 'lieu-acces'],
  },
  {
    id: 'equipe', slug: 'equipe', label: 'Équipe', template: 'text',
    title: "L'équipe de la MGI : permanents, artistes intervenant·es, conseil d'administration | Paris",
    description: "Coordonnées de l'équipe permanente, des artistes intervenant·es et des membres du conseil d'administration de la Maison du Geste et de l'Image.",
    h1: 'Équipe',
    lead: "Équipe permanente, artistes intervenant·es et conseil d'administration.",
    body: ["Liste à reprendre de la page actuelle. Les 16 fiches individuelles /team/ sont fusionnées dans cette page."],
    source: 'à compléter', audience: 'Partenaires, institutions, presse',
    related: ['qui-sommes-nous', 'contact'],
  },
  {
    id: 'partenaires', slug: 'partenaires', label: 'Partenaires', template: 'text',
    title: "Partenaires de la Maison du Geste et de l'Image | Paris",
    description: "Association loi 1901 subventionnée par la Mairie de Paris (DAC) et agréée par l'Éducation nationale ; partenaires opérationnels et culturels.",
    h1: 'Partenaires',
    lead: "Association de loi 1901 subventionnée par la Mairie de Paris (Direction des Affaires Culturelles) et agréée par le ministère de l'Éducation nationale.",
    body: ['Partenaires opérationnels (logos) : [à compléter].'],
    source: 'adapté', audience: 'Partenaires, institutions, presse',
    related: ['qui-sommes-nous', 'contact'],
  },
  {
    id: 'presse', slug: 'presse', label: 'Presse', template: 'text',
    title: 'Presse : dossier de presse de la MGI | Paris',
    description: "Dossier de presse et visuels de la Maison du Geste et de l'Image. Contact presse.",
    h1: 'Presse',
    lead: 'Dossier de presse 2023-2024 (PDF) disponible sur le site actuel.',
    body: ['Visuels et contact presse : [à compléter].'],
    source: 'à compléter', audience: 'Presse',
    related: ['qui-sommes-nous', 'contact'],
  },
  {
    id: 'lieu-acces', slug: 'lieu-et-acces', label: 'Lieu et accès', template: 'lieu',
    title: "Lieu et accès : MGI, 42 rue Saint-Denis, Paris 1er (Châtelet)",
    description: "La MGI à Paris : 1 200 m² dédiés à la pratique artistique, 42 rue Saint-Denis, métro Châtelet. Horaires, plan d'accès, accessibilité.",
    h1: 'Lieu et accès',
    lead: "Une maison au cœur de Paris, quartier Châtelet-Les Halles, accessible depuis toute la région parisienne.",
    source: 'réel', audience: 'Tous',
    schema: ['LocalBusiness'],
    facts: [
      ['Surface', "1 200 m² dédiés à la pratique, sur trois niveaux, jusqu'à cinq classes en même temps"],
      ['Fréquentation', "Près de 5 000 enfants et adolescent·es par an pendant le temps scolaire"],
      ['Métro', 'Châtelet (lignes 1, 4, 7, 11, 14), sortie Lescot · Les Halles (4) · Rambuteau (11) · Étienne Marcel (4)'],
      ['RER', 'Châtelet-Les Halles (A, B, D)'],
      ['Bus', 'Arrêt Châtelet-Les Halles (38, 47) · Arrêt Châtelet (58, 21, 67, 69, 70, 72, 74, 75, 76, 81, 85)'],
      ['Accessibilité', 'Accessible aux personnes à mobilité réduite par une entrée auxiliaire. Préparer sa visite : contacter la MGI.'],
    ],
    related: ['contact', 'stages-ados', 'formations'],
  },
  {
    id: 'contact', slug: 'contact', label: 'Contact', template: 'contact',
    title: 'Contact et horaires : MGI, Paris 1er, 01 42 36 33 52',
    description: "Contacter la Maison du Geste et de l'Image : téléphone, e-mail, horaires, adresse (42 rue Saint-Denis, 75001 Paris).",
    h1: 'Contact',
    lead: "Une question sur un stage, un atelier en classe ou une formation ? Écrivez-nous ou appelez-nous.",
    source: 'réel', audience: 'Tous',
    schema: ['LocalBusiness'],
    related: ['lieu-acces', 'stages-ados', 'formations', 'ecoles'],
  },

  /* ---------- Ressources et archives ---------- */
  {
    id: 'ressources', slug: 'ressources', label: 'Ressources et archives', template: 'hub',
    title: 'Réalisations, interviews et archives des ateliers | MGI Paris',
    description: "Galerie des ateliers, interviews, thèmes annuels et agenda de la Maison du Geste et de l'Image.",
    h1: 'Ressources et archives',
    lead: "Les réalisations des ateliers, les interviews et les thèmes des saisons passées, regroupés au même endroit.",
    source: 'adapté', audience: 'Tous',
    cards: ['realisations', 'agenda', 'themes'],
    related: ['ecoles', 'stages-ados'],
  },
  {
    id: 'realisations', slug: 'realisations', label: 'Galerie des ateliers', template: 'gallery',
    title: 'Galerie des ateliers : réalisations des élèves et des stagiaires | MGI Paris',
    description: "Zoom sur des projets artistiques (théâtre, vidéo, photo) réalisés par des élèves et des jeunes accompagnés par des artistes à Paris.",
    h1: 'Galerie des ateliers',
    lead: "Filtrez par discipline ou par public. Remplace les ~330 fiches /portfolio/ actuelles, regroupées en une galerie.",
    source: 'adapté', audience: 'Enseignant·es',
    related: ['ecoles', 'stages-ados'],
  },
  {
    id: 'real-cines', slug: 'des-cines-la-vie', label: '« Des cinés, la Vie ! »', template: 'realisation',
    title: '« Des cinés, la Vie ! » avec L\'Archipel des lucioles : atelier vidéo, Paris | MGI',
    description: "Projet vidéo mené avec L'Archipel des lucioles (champ social) à la Maison du Geste et de l'Image, Paris.",
    h1: '« Des cinés, la Vie ! » avec L\'Archipel des lucioles',
    lead: 'Atelier vidéo, champ social. Description à reprendre de la fiche actuelle.',
    tags: ['Champ social', 'Vidéo'], discipline: 'video',
    body: ['Présentation du projet : [à compléter].', 'Intervenant·e : [à compléter]', 'Extrait vidéo : [à fournir]'],
    source: 'à compléter', audience: 'Enseignant·es et professionnel·les',
    related: ['realisations', 'ateliers-classe', 'formation-realisation-audiovisuelle', 'contact'],
  },
  {
    id: 'real-etranges', slug: 'etranges-creatures', label: '« Étranges créatures »', template: 'realisation',
    title: '« Étranges créatures » : Haut-Parleurs, 5e édition | MGI Paris',
    description: "Création réalisée dans le cadre de la 5e édition de Haut-Parleurs à la Maison du Geste et de l'Image, Paris.",
    h1: '« Étranges créatures »',
    subtitle: 'Haut-Parleurs, 5e édition',
    lead: 'Projet réalisé pendant les ateliers du samedi. Description à reprendre de la fiche actuelle.',
    tags: ['Haut-Parleurs'],
    body: ['Présentation du projet : [à compléter].', 'Visuels : [à fournir]'],
    source: 'à compléter', audience: 'Ados',
    related: ['realisations', 'samedis', 'contact'],
  },
  {
    id: 'agenda', slug: 'agenda', label: 'Agenda', template: 'text',
    title: 'Agenda 2026-2027 : cartes blanches, résidences, stages | MGI Paris',
    description: "Tous les événements de la Maison du Geste et de l'Image en 2026-2027 : cartes blanches, résidences, sorties de résidence, stages.",
    h1: 'Agenda',
    lead: "Événements réels relevés sur la page actuelle (liste à tenir à jour par la MGI) :",
    body: [
      'Du 19 au 23 octobre 2026 : stages vacances de la Toussaint (12-16 ans), théâtre, photo, vidéo.',
      'Vendredi 30 octobre à 19h : France Jolly, « Même si les loups n\'y sont pour rien », sortie de résidence (théâtre).',
      'Jeudi 3 décembre : Contrechamps, Clara Baum, carte blanche #3 (vidéo).',
    ],
    source: 'réel', audience: 'Tous',
    schema: ['Event'],
    related: ['stages-ados', 'artistes'],
  },
  {
    id: 'themes', slug: 'themes-annuels', label: 'Thèmes annuels', template: 'text',
    title: 'Thèmes annuels de la MGI : Dilemme, Société en·jeux, Pouvoir·s… | Paris',
    description: "Chaque saison, la MGI explore un thème : Dilemme (2026-2027), Société en·jeux, Pouvoir·s en corps, Fraternité·Sororité, Égalité·s, Liberté·s.",
    h1: 'Thèmes annuels',
    lead: "Un habillage éditorial par saison, qui n'est plus un axe de navigation (à valider avec la MGI).",
    body: ['2026-2027 : Dilemme', '2025-2026 : Société en·jeux', '2023-2024 : Pouvoir·s en corps', '2022-2023 : Pouvoir·s', '2021-2022 : Fraternité·Sororité', '2020-2021 : Égalité·s', '2019-2020 : Liberté·s'],
    source: 'réel', audience: 'Enseignant·es',
    related: ['realisations', 'ateliers-classe'],
  },

  /* ---------- Disciplines (variante B) ---------- */
  ...(['photo', 'video', 'theatre', 'son', 'danse'] as const).map((d): PageDef => {
    const names = { photo: 'Photo', video: 'Vidéo', theatre: 'Théâtre', son: 'Son', danse: 'Danse' } as const;
    const stageId = `stage-${d}`;
    const real = d === 'photo' || d === 'video' || d === 'theatre';
    return {
      id: `disc-${d}`, slug: d, label: names[d], template: 'discipline',
      title: `${names[d]} à Paris : stages ados, formations et ateliers scolaires | MGI`,
      description: `${names[d]} pour les ados (stages), les classes (ateliers) et les professionnel·les (formations) à la Maison du Geste et de l'Image, Paris 1er.`,
      h1: `${names[d]} : stages, ateliers en classe et formations à Paris`,
      lead: real ? `Toute l'offre ${names[d].toLowerCase()} de la MGI sur une page, selon votre profil.` : `[Offre ${names[d].toLowerCase()} à confirmer : citée dans le brief, peu visible sur le site 2026-2027.]`,
      source: real ? 'adapté' : 'à compléter', discipline: d,
      schema: ['Course'],
      cards: real ? [stageId, ...formationIds.filter((id) => FORMATIONS.find(([s, , , dd]) => `formation-${s}` === id && dd === d)), 'ateliers-classe'] : formationIds.filter((id) => FORMATIONS.find(([s, , , dd]) => `formation-${s}` === id && dd === d)),
      related: ['stages-ados', 'formations', 'ecoles', 'contact'],
    };
  }),
];

export const PAGES = new Map<string, PageDef>(pages.map((p) => [p.id, p]));
export const getPage = (id: string): PageDef => {
  const p = PAGES.get(id);
  if (!p) throw new Error(`Page inconnue : ${id}`);
  return p;
};

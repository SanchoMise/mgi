// Protection par mot de passe (Vercel Routing Middleware). Voir README, section « Mot de passe ».
// Active seulement si la variable d'environnement SITE_PASSWORD est définie dans Vercel.
// Le navigateur affiche une fenêtre identifiant / mot de passe : identifiant libre, mot de passe = SITE_PASSWORD.
import { next } from '@vercel/functions';

export const config = {
  runtime: 'nodejs',
  matcher: ['/((?!favicon.svg|robots.txt).*)'],
};

export default function middleware(request: Request) {
  const password = process.env.SITE_PASSWORD;
  if (!password) return next(); // pas de mot de passe configuré : site ouvert (mais noindex)

  const header = request.headers.get('authorization') ?? '';
  if (header.startsWith('Basic ')) {
    try {
      const decoded = atob(header.slice(6));
      if (decoded.slice(decoded.indexOf(':') + 1) === password) return next();
    } catch {
      /* en-tête invalide : on redemande le mot de passe */
    }
  }
  return new Response('Accès protégé : prototype MGI.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Prototype MGI", charset="UTF-8"', 'X-Robots-Tag': 'noindex' },
  });
}

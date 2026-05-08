# Import HomePulse → projet Lovable (TanStack Start)

## Contexte du repo source

Le repo `Thedoud-Git/homepulse` est une **landing page cinématique** "HomePulse — diagnostic biologique au plus près du patient" (medtech, FR). Stack source :

- React 18/19 + Vite + TypeScript
- **Tailwind v3** avec couleurs custom (moss, clay, cream, charcoal) + fonts Google (Plus Jakarta, Cormorant Garamond, IBM Plex Mono)
- **GSAP 3** (free tier) pour animations cinématiques
- 9 composants single-page : Navbar, Hero, Features, Philosophy, Protocol, ProtocolVisuals, SocialProof, Pricing, Footer
- Assets : `hero.png` (13K), `icons.svg` (5K), `favicon.svg`
- Aucun backend, aucune variable d'env, aucune route secondaire

## Cible (ce projet)

Stack différente : **TanStack Start + Tailwind v4 (CSS-only) + React 19**. L'import demande donc une **adaptation**, pas un copier-coller brut.

## Adaptations nécessaires

| Source | Cible |
|---|---|
| `src/main.tsx` + `App.tsx` (SPA) | `src/routes/index.tsx` (route TanStack qui rend le layout HomePulse) |
| `index.html` (Google Fonts, title, meta) | `head()` de `__root.tsx` (links fonts) + `head()` de `index.tsx` (title/description/og) |
| `tailwind.config.ts` (colors, keyframes) | Tokens dans `src/styles.css` via `@theme inline` + couleurs `oklch` (moss/clay/cream/charcoal) + `@keyframes` |
| `src/index.css` (composants `.btn`, `.noise-overlay`, `.live-dot`, etc.) | Recopiés tels quels dans `src/styles.css` sous `@layer components` |
| `@/components/*` | `src/components/*` (chemins inchangés grâce à l'alias `@/`) |
| `src/lib/gsap.ts` + `splitWords.ts` | Copiés tels quels dans `src/lib/` |
| `src/assets/hero.png` + `public/icons.svg` + `public/favicon.svg` | Copiés à l'identique |

## Étapes d'implémentation

1. **Installer les dépendances manquantes**
   - `gsap` (animations), `lucide-react` (icônes — déjà probablement présent, à vérifier)

2. **Design system dans `src/styles.css`**
   - Ajouter les tokens couleurs HomePulse en `oklch` : `--moss`, `--clay`, `--cream`, `--charcoal`
   - Les enregistrer dans `@theme inline` pour activer `bg-moss`, `text-clay`, etc.
   - Override `--background` = cream et `--foreground` = charcoal
   - Recopier les `@keyframes` (spinSlow, spinReverse, blink, pulseDot) et utilitaires (`.btn`, `.btn-primary`, `.btn-ghost`, `.btn-dark`, `.noise-overlay`, `.grain-bg`, `.live-dot`, `.tw-cursor`, `.card-surface`, `.link-hover`, `.text-balance`)
   - Respecter `prefers-reduced-motion`

3. **Polices Google Fonts**
   - Ajouter les `<link>` Plus Jakarta Sans, Cormorant Garamond, IBM Plex Mono dans le `head()` de `__root.tsx`
   - Configurer `font-heading`, `font-drama`, `font-data` dans `@theme inline` de `styles.css`

4. **Copier les composants** (à l'identique, juste vérifier les imports `@/`)
   - `Navbar.tsx`, `Hero.tsx`, `Features.tsx`, `Philosophy.tsx`, `Protocol.tsx`, `ProtocolVisuals.tsx`, `SocialProof.tsx`, `Pricing.tsx`, `Footer.tsx`
   - `lib/gsap.ts`, `lib/splitWords.ts`

5. **Copier les assets**
   - `src/assets/hero.png`
   - `public/icons.svg`, `public/favicon.svg`

6. **Réécrire `src/routes/index.tsx`**
   - Supprimer le placeholder
   - Reproduire le contenu de `App.tsx` (Navbar + main avec 6 sections + Footer + noise overlay)
   - Ajouter `head()` avec title "HomePulse — Le diagnostic vient à vous", meta description, og:title, og:description, twitter card

7. **Mettre à jour `__root.tsx`**
   - Ajouter les `<link>` preconnect + Google Fonts dans la propriété `links` de `head()`
   - `lang="fr"` sur le `<html>` du `RootShell`

## Notes techniques

- **GSAP côté SSR** : GSAP touche au DOM. Tous les `useEffect` GSAP existants couvrent déjà ce point. Pas d'`useLayoutEffect` côté serveur. Si problème, passer à `if (typeof window !== "undefined")` dans le module `lib/gsap.ts`.
- **Pas de Lovable Cloud nécessaire** : aucun backend, aucune persistance.
- **Single-page intentionnel** : la landing est conçue comme un long scroll cinématique. Les ancres internes (#features, #philosophy, etc.) restent valides — c'est un cas légitime d'usage des hash anchors (TOC d'une seule page marketing), pas plusieurs routes.
- **Tailwind v3 → v4** : les classes utilisées (`bg-cream`, `text-charcoal`, `font-heading`, `animate-spin-slow`, `border-clay/30`, etc.) fonctionnent identiquement dès que les tokens sont déclarés dans `@theme inline`. Aucune réécriture de composant.

## Hors scope

- Pas de refonte design (on conserve fidèlement l'esthétique organic-tech)
- Pas d'ajout de pages secondaires (la source est volontairement single-page)
- Pas de connexion backend / formulaires (les CTA actuels sont `mailto:`)

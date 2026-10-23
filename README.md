# Bharatiya Vyapar Mahotsav 2026 — Next.js

A Next.js 16 (App Router, Tailwind CSS v4, TypeScript) rebuild of the BVM landing page, plus a 3D
**virtual expo** (`/virtual-expo`) built with Three.js.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Requires Node.js `>=20.9`.

> The npm scripts call Node directly (via `$npm_node_execpath`, the Node that launched npm) on purpose: a stray `node` package in
> `~/node_modules` (v20.4.0) can otherwise shadow your real Node inside `npm run`/`npx` and make Next refuse to start.

## Missing images

The saved site this was rebuilt from did not include every image (speaker portraits, hero/PM images,
QR code, brochures). Neutral placeholders were generated for them (`scripts/placeholder-assets.json`).
Replace them with the real files from the live site:

```bash
node scripts/fetch-missing-assets.mjs
```

## Structure

| Path | What |
| --- | --- |
| `app/page.tsx` | Landing page, composed from `components/sections/*` |
| `messages/en.json` | All page copy (kept in the original `next-intl` shape). `lib/i18n.ts` exposes `t("Namespace.key")` |
| `components/layout/` | Header, footer, floating buttons, accessibility toolbar, cookie banner, registration modal |
| `components/providers/` | Cookie consent, accessibility preferences and modal contexts |
| `lib/site.ts` | Event date, contact details, nav items, `REGISTRATION_OPEN` flag |
| `lib/data/` | Sector, partner and news data |
| `app/virtual-expo/**` | 3D expo routes: hall map → section → shop (products + FAQ chatbot) |
| `lib/expo/data.ts` | Expo content (fictional demo brands) — edit this to add real exhibitors |
| `components/expo/ExpoWorld.tsx` | The Three.js scene (drag to look, WASD / on-screen pad to walk) |

## Notes

- Registrations are closed in the source site, so every "Register" action opens a "Registration Closed"
  notice. Flip `REGISTRATION_OPEN` in `lib/site.ts` once forms are wired to a backend.
- The Hindi toggle is shown but disabled: no Hindi messages were available. Add `messages/hi.json`
  and a locale-aware `t()` to enable it.
- Analytics (Google Tag Manager) is off unless `NEXT_PUBLIC_GTM_ID` is set — see `.env.example`.
- `/privacy-policy`, `/terms-and-conditions` and `/screen-reader-access` are built from the original copy;
  their page layouts, the BISE page placeholder and the 3D expo are new.

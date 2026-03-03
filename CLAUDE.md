# CLAUDE.md — Immowo Ventures Real Estate Platform

## Project Overview

**Immowo Ventures** – Premium Immobilienmakler (Bauträger, Schlüsselfertig, Kauf ab Plan).

Monorepo with two apps:
- `apps/web` – Next.js (App Router) frontend (customer-facing website)
- `apps/cms` – Payload CMS (headless CMS + admin panel)

**Primary goal:** Migrate ALL content (texts, images, videos, PDFs, CTAs) from static data into Payload CMS. The Next.js frontend consumes Payload as its single source of truth.

> **Full documentation:** See `/docs/` folder for detailed reference:
> - `docs/README.md` — Quick Start, URLs, useful commands
> - `docs/database.md` — All collections, globals, fields, relationships
> - `docs/roles-access.md` — User roles, access matrix, accounts, how to add Makler
> - `docs/architecture.md` — System architecture, data flow, ENV vars
> - `docs/frontend.md` — Routes, components, design system

> **Credentials:** All passwords, API keys, and login credentials (admin, Makler accounts, DB, SMTP) are stored in **`.env`** at the project root. This file is git-ignored and never committed. Read it for all local dev credentials.

---

## Monorepo Structure

```
apps/
├── web/src/
│   ├── app/(site)/          # All public routes
│   ├── components/          # UI components
│   ├── lib/
│   │   ├── cms/             # CMS fetchers (home.ts, companyPage.ts) — currently returning fallback data
│   │   ├── data/            # listings.ts, references.ts — to be migrated to Payload
│   │   ├── types/           # listings.ts, references.ts (TypeScript types)
│   │   ├── seo/             # SEO metadata helpers
│   │   └── payloud.ts       # HTTP fetch helper for Payload REST API (NOTE: file is named payloud.ts with typo — keep it)
│   └── styles/
│       ├── globals.css      # Design tokens (primary — use these)
│       └── globals2.css     # Extended tokens
├── cms/src/
│   ├── collections/
│   │   ├── Immobilien.ts    # Main listings collection (fully built)
│   │   ├── Makler.ts        # Ansprechpartner/Makler collection
│   │   ├── Media.ts
│   │   └── Users.ts         # Auth collection (roles: admin, editor, makler)
│   ├── globals/
│   │   ├── Home.ts          # Home page content global
│   │   ├── Unternehmen.ts   # Company page global
│   │   ├── SiteSettings.ts  # Footer, socials, contact info
│   │   ├── Impressum.ts
│   │   ├── Datenschutz.ts
│   │   ├── AGB.ts
│   │   ├── Widerruf.ts
│   │   └── Cookies.ts
│   ├── components/
│   │   └── payload-admin/BeforeDashboard.tsx  # Custom dashboard (role-aware)
│   ├── access/              # Access control functions (inline in collections)
│   ├── hooks/               # Payload lifecycle hooks (inline in fields)
│   ├── seed/
│   │   ├── seed.ts          # Main seed script (immobilien data)
│   │   └── makler-seed.ts   # Makler profiles + user accounts seed
│   └── payload.config.ts    # Main config (PostgreSQL + Lexical)
```

---

## Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS
- **CMS:** Payload CMS v3, PostgreSQL adapter (`@payloadcms/db-postgres`), Lexical rich text
- **Styling:** CSS variables (design tokens in `globals.css`) + Tailwind utility classes
- **ISR:** `fetch(..., { next: { revalidate: 300 } })` for CMS content; `generateStaticParams` for slug pages

---

## Design System — Navy + Champagne Gold

The brand is **premium, calm, trustworthy**. Gold is accent only, not dominant.

### Always use CSS tokens — never hardcode colors:

```css
--color-bg              /* deep navy background */
--color-surface         /* rgba(255,255,255,0.04) */
--color-surface-2       /* rgba(255,255,255,0.06) */
--color-surface-3       /* rgba(255,255,255,0.08) */
--color-text            /* rgba(255,255,255,0.92) */
--color-text-muted      /* rgba(255,255,255,0.68) */
--color-border          /* rgba(255,255,255,0.10) */
--color-border-strong   /* rgba(255,255,255,0.16) */
--color-accent          /* champagne gold */
--color-accent-hover
--color-accent-strong
--color-link
--color-link-hover
--radius-lg, --radius-xl
--shadow-soft
```

### Tailwind token usage pattern:
```tsx
bg-[color:var(--color-bg)]
bg-[color:var(--color-surface-2)]
border-[color:var(--color-border-strong)]
text-[color:var(--color-text-muted)]
bg-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-hover)]
```

---

## Brand Language & Copy Rules (German)

- **Tone:** premium, ruhig, professionell, verständlich. Keine Übertreibungen.
- **Use:** „Kauf ab Plan", „Bauträgerprojekt", „schlüsselfertig", „Bestandsimmobilie", „Exposé auf Anfrage"
- **Avoid:** „vom Papier weg", „Mega", „Hammer", „billig", absolute Superlative
- Buttons: „Exposé auf Anfrage" / „Unterlagen anfordern" / „Rückruf anfragen"
- Badges: „Schlüsselfertig" / „Neubauprojekt (Kauf ab Plan)" / „Kapitalanlage" / „Verfügbar" / „Reserviert" / „Verkauft" / „In Bau"
- Currency: „1.250.000 €" (no cents), Area: „165 m²", Energy: „kWh/(m²a)"
- Address: always use region not exact address → „Augsburg (Region)", „Schwaben"

---

## Key Routes (apps/web)

| Route | File |
|---|---|
| `/` | `app/(site)/page.tsx` |
| `/immobilien` | listings list + filters |
| `/objekte/[slug]` | listing detail |
| `/referenzen` | references list |
| `/referenzen/[slug]` | reference detail |
| `/unternehmen` | company page |
| `/kontakt` | contact (API: `api/contact/route.ts`) |

---

## CMS Integration — Current State (COMPLETED)

### Built in Payload (all connected to frontend):
- `Immobilien` collection — fully modelled + connected (`lib/data/listings.ts`)
- `Makler` collection — Ansprechpartner, shown on `/objekte/[slug]` + `/kontakt`
- `Referenzen` collection — fully connected (`lib/data/references.ts`)
- `Home` global — connected (`lib/cms/home.ts`)
- `Unternehmen` global — connected (`lib/cms/companyPage.ts`)
- `SiteSettings` global
- Legal globals (Impressum, Datenschutz, AGB, Widerruf, Cookies)

### All fetchers use Payload with static fallback:
- `fetchHomeContent()` → `payloadGlobal('home')` → fallback: DEFAULT_HOME_CONTENT
- `fetchCompanyPageContent()` → `payloadGlobal('unternehmen')` → fallback: DEFAULT_COMPANY_PAGE_CONTENT
- `getListings()` / `getListingBySlug()` → `payloadFind('immobilien')` → fallback: static estates
- `getReferences()` / `getReferenceBySlug()` → `payloadFind('referenzen')` → fallback: static refs
- `getMakler()` → `payloadFind('makler')` → fallback: 2 hardcoded placeholder persons

### Payload HTTP helper: `apps/web/src/lib/payloud.ts`
Provides: `payloadFetch`, `payloadFind`, `payloadFindByID`, `payloadGlobal`, `payloadCreate`.

```
PAYLOAD_BASE_URL=http://localhost:3000
PAYLOAD_API_KEY=   # optional Bearer token
```

---

## Makler Feature

### Collections & Roles:
- `makler` collection: name, titleRole, phone, email, photo, availability, focus[], linkedUser
- Users `role`: `admin` | `editor` | **`makler`** (new)
- Users `maklerProfile`: relationship → makler (saveToJWT: true)
- Immobilien `ansprechpartner`: relationship → makler (sidebar, depth 1)

### Access: Makler role can:
- ✅ See and edit ALL Immobilien (including drafts), publish directly
- ✅ Upload media
- ❌ Cannot access: Referenzen, Home global, Unternehmen global, SiteSettings, Legal globals
- ❌ Cannot delete Immobilien, cannot manage Users or Makler collection

### Dashboard:
- `BeforeDashboard.tsx` uses `useAuth()` to detect role
- Makler sees: personalized welcome + same KPI stats + calendar teaser placeholder

### Fallback behavior:
- If no `ansprechpartner` set on listing → `/objekte/[slug]` shows "Immowo Ventures" generic info
- If Payload unreachable on `/kontakt` → shows 2 hardcoded placeholder persons

### Dev accounts (Makler):
- `max.mustermann@immowo.de` — see `.env`
- `julia.musterfrau@immowo.de` — see `.env`
- `thomas.bergmann@immowo.de` — see `.env`

### Media mapping pattern:
Payload returns `{ url, filename, mimeType }` inside relations. Convert relative URLs to absolute if needed:
```ts
const imgUrl = media?.url
  ? media.url.startsWith('http') ? media.url : `${PAYLOAD_BASE_URL}${media.url}`
  : undefined
```

---

## MANDATORY: Working in apps/cms

> **Whenever any work touches `apps/cms/`, these rules are non-negotiable:**

### 1. Always read AGENTS.md first
Before making any changes inside `apps/cms/`, read **`apps/cms/AGENTS.md`** in full. It is the authoritative instruction set for all Payload CMS work in this project. Follow every rule it contains.

### 2. Always consult the .cursor/rules files
The folder `apps/cms/.cursor/rules/` contains detailed rule files for every Payload topic. Read the relevant file(s) before writing code:

| File | When to read |
|---|---|
| `payload-overview.md` | Any CMS work — start here |
| `collections.md` | Creating or modifying collections |
| `fields.md` | Adding or changing fields |
| `field-type-guards.md` | Runtime type checking of fields |
| `access-control.md` | Any access control logic |
| `access-control-advanced.md` | Complex/nested access patterns |
| `hooks.md` | Adding lifecycle hooks |
| `queries.md` | Local API queries |
| `endpoints.md` | Custom API endpoints |
| `adapters.md` | DB/storage adapter changes |
| `components.md` | Custom Admin Panel components |
| `plugin-development.md` | Writing or modifying plugins |

**Do not write Payload code from memory alone — always cross-check with the relevant rule file.**

---

## Payload CMS Rules (apps/cms)

### After any schema change:
```bash
cd apps/cms && npm run generate:types   # regenerate payload-types.ts
```

### After adding/modifying components:
```bash
cd apps/cms && npx payload generate:importmap
```

### TypeScript validation:
```bash
cd apps/cms && npx tsc --noEmit
```

### Critical security — always `overrideAccess: false` when passing user:
```typescript
// ❌ WRONG — access control bypassed!
await payload.find({ collection: 'immobilien', user: someUser })

// ✅ CORRECT
await payload.find({ collection: 'immobilien', user: someUser, overrideAccess: false })
```

### Hooks — always pass `req` to nested operations:
```typescript
// ✅ Keeps operation in same transaction
await req.payload.create({ collection: 'audit-log', data: {...}, req })
```

### Prevent infinite hook loops:
```typescript
if (context.skipHooks) return
// ... then set context: { skipHooks: true } on the nested call
```

### Access control in Immobilien collection:
- `admin` + `editor` roles can create/update
- Only `admin` can delete
- Public sees only `_status: published` listings
- `vermarktungsStatus` field (NOT `status` — that collides with Payload's internal `_status`)

---

## Commission Gate (CommissionGateDialog)

- Desktop: **2-column layout** — left scrollable info, right confirmation panel always visible (no scroll needed)
- Use only token-based colors (see design tokens above)
- `CommissionGateEnforcer` and `CommissionGateLink` both use the same `CommissionGateDialog`
- Gold gradients must be subtle: `linear-gradient(90deg, rgba(gold,0.06), var(--color-bg), rgba(gold,0.06))`

---

## Known Quirks

- `payloud.ts` — intentional typo in filename, keep it consistent in all imports
- `layosut.tsx` in `app/(site)/` — typo in filename, keep imports consistent
- `vermarktungsStatus` — NOT `status` (Payload reserves `_status` for draft/publish workflow)
- Payload returns string IDs — always map `id` as `string`
- `slug` is required for all detail pages — no fallback is safe
- The Immobilien collection uses `versions: { drafts: true }` — public fetch must filter for published

---

## Payload CMS Resources

- Docs: https://payloadcms.com/docs
- LLM context: https://payloadcms.com/llms-full.txt
- Additional rules: `apps/cms/.cursor/rules/` (collections, fields, hooks, access-control, queries, endpoints, components)

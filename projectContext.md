# Project Context — Immowo / Adaki Website (Next.js + Payload CMS)

> This file is the single source of truth for future work with ChatGPT.
> Upload ONLY this file to restore full project context.

## 1) Goals

- Move ALL content (texts, images, videos, PDFs, CTAs) into Payload CMS.
- Customer can login to Payload Admin and:
  - edit existing listings (Immobilien)
  - create new listings (Immobilien inserieren)
  - manage references (Referenzen)
  - manage global page content (Home, Company/Unternehmen, etc.)
- Next.js should consume Payload as the **single source of truth**.
- Keep the overall design system: premium, trustworthy, navy background, subtle champagne-gold accents (borders).

## 2) Tech Stack & Constraints

- Next.js (App Router).
- Tailwind CSS.
- Design tokens in `styles/globals.css` / `styles/globals2.css`:
  - Use CSS variables for colors/radii/shadows:
    - `--color-bg`
    - `--color-surface`, `--color-surface-2`, `--color-surface-3` (if present)
    - `--color-text`, `--color-text-muted`
    - `--color-border`, `--color-border-strong`
    - `--color-accent`, `--color-accent-hover`
    - `--color-link`, `--color-link-hover`
    - `--radius-lg`, `--radius-xl`
    - `--shadow-soft` (if present)
- Do NOT hardcode gold RGBA in UI if possible. Prefer tokens.
- Commission gate UX requirement:
  - On desktop: no scroll required to see “confirm/accept”.
  - Use 2-column layout: left info scrollable, right confirmation panel fixed/always visible.

## 3) Current Project Structure (Snapshot)

src/
┣ app/
┃ ┣ (site)/
┃ ┃ ┣ agb/page.tsx
┃ ┃ ┣ cookies/page.tsx
┃ ┃ ┣ datenschutz/page.tsx
┃ ┃ ┣ immobilien/page.tsx
┃ ┃ ┣ impressum/page.tsx
┃ ┃ ┣ kontakt/page.tsx
┃ ┃ ┣ objekte/[slug]/page.tsx
┃ ┃ ┣ referenzen/page.tsx
┃ ┃ ┣ referenzen/[slug]/page.tsx
┃ ┃ ┣ unternehmen/page.tsx
┃ ┃ ┣ widerruf/page.tsx
┃ ┃ ┣ layosut.tsx (typo)
┃ ┃ ┗ page.tsx (home)
┃ ┣ api/contact/route.ts
┃ ┣ layout.tsx
┃ ┗ not-found.tsx
┣ components/
┃ ┣ base/header/Header.tsx
┃ ┣ base/nav/Navbar.tsx
┃ ┣ base/footer/Footer.tsx
┃ ┣ commission/
┃ ┃ ┣ CommissionGateDialog.tsx
┃ ┃ ┣ CommissionGateEnforcer.tsx
┃ ┃ ┗ CommissionGateLink.tsx
┃ ┣ consent/...
┃ ┣ home/...
┃ ┣ immobilien/...
┃ ┣ objekte/...
┃ ┣ referenzen/...
┃ ┗ unternehmen/...
┣ lib/
┃ ┣ cms/home.ts
┃ ┣ cms/companyPage.ts
┃ ┣ data/listings.ts
┃ ┣ data/references.ts
┃ ┣ seo/listingMetadata.ts
┃ ┣ seo/referencesMetadata.ts
┃ ┣ types/listings.ts
┃ ┣ types/references.ts
┃ ┣ payloud.ts
┃ ┗ utils.ts
┗ styles/
┣ globals.css
┗ globals2.css

## 4) Key Pages / Routes

- Home: `/` -> `src/app/(site)/page.tsx`
- Listings: `/immobilien` -> list + filters
- Listing detail: `/objekte/[slug]`
- References: `/referenzen` and `/referenzen/[slug]`
- Company: `/unternehmen`
- Contact: `/kontakt` (API route exists)
- Legal: `/agb`, `/datenschutz`, `/impressum`, `/widerruf`, `/cookies`

## 5) Data Domains to Move into Payload

### 5.1 Listings (Immobilien)

Content currently represented via `EstateDetails` type (see `lib/types/listings.ts`).

**Required fields in CMS:**

- `title` (string)
- `slug` (string, unique)
- `status` (enum) e.g. `verfügbar | reserviert | verkauft | in_bau`
- `location` (string)
- `price` (number) / allow empty => "Preis auf Anfrage"
- `livingArea` (number)
- `plotArea` (number)
- `rooms` (number)
- `bedrooms` (number)
- `bathrooms` (number)
- `yearBuilt` (number)
- `availability` (string)
- `description` (rich text or long text)
- `highlights` (array of strings)
- `features` (array of strings)

**Media:**

- `heroMedia` (relation to Media) [image or video]
- `gallery` (array relation to Media)
- `documents`:
  - `exposePdf` (relation to Media - pdf)
  - optional additional PDFs

**Energy:**

- `energyCertificateType` enum: `bedarf|verbrauch`
- `energyValue` number (kWh/(m²a))
- `energyClass` string (A+...H)
- `energyCarrier` string
- `energyYear` number

**Commission Gate:**

- `buyerCommission` object:
  - `kind`: `percent|fixed`
  - `value`: number
  - `vatIncluded`: boolean
  - `vatRate`: number
  - `due`: string (optional)
  - `basis`: string (optional)
  - `note`: string (optional)

**Optional:**

- `badge` string
- `videoSrc` string (prefer Media relation, but existing UI handles string)
- `imageSrc` string (prefer Media relation)
- `geo.lat`, `geo.lng` numbers (optional)

**SEO:**

- `seo.metaTitle`
- `seo.metaDescription`
- `seo.ogImage` (Media)

### 5.2 References (Referenzen)

Based on `lib/types/references.ts`:

- `title`, `slug`
- `cover` (media)
- `gallery` (media array)
- `excerpt`, `content`
- `seo` fields

### 5.3 Globals

- Global `home` => controls Header / hero texts, video, pills, CTAs
- Global `companyPage` => company hero, highlights, process, pillars, stats, CTA
- Optional `siteSettings` => footer, socials, phone/email, legal links

## 6) CMS Integration Strategy

- Keep UI components mostly unchanged.
- Replace `lib/data/*` static data with Payload fetch + mapping.
- Keep types strict; avoid `any`.
- Use Next ISR:
  - `fetch(..., { next: { revalidate: 300 }})` typical for content.
- Use `generateStaticParams` for slug pages to prerender.
- Support draft/preview later.

## 7) Existing CMS Layer (Already Present)

- `src/lib/cms/home.ts` (fallback content + future payload fetch)
- `src/lib/cms/companyPage.ts` (fallback content + future payload fetch)
  Goal: convert these to real Payload Global fetchers + mapping.

## 8) Commission Gate (Brand + UX rules)

- Ensure `CommissionGateEnforcer` + `CommissionGateLink` both use **the same** `CommissionGateDialog`.
- Dialog layout:
  - Desktop: 2 columns, right column contains checkbox + accept/decline always visible.
  - Use `globals.css` variables:
    - surfaces: `--color-surface-2` etc
    - borders: `--color-border`, `--color-border-strong`
    - accent: `--color-accent`, `--color-accent-hover`
    - bg: `--color-bg`
- Avoid heavy gold gradients. If hairline gradient is used, keep gold subtle:
  - e.g. `linear-gradient(90deg, rgba(gold,0.06), var(--color-bg), rgba(gold,0.06))`
  - prefer token mixing when possible.

## 9) Design System Notes (Navy + Champagne Gold)

- Overall: premium, calm, trustworthy.
- Gold is accent only (borders, subtle trims), not dominant.
- Prefer token usage:
  - backgrounds: `bg-[color:var(--color-bg)]`
  - surfaces: `bg-[color:var(--color-surface-2)]`
  - borders: `border-[color:var(--color-border-strong)]`
  - text muted: `text-[color:var(--color-text-muted)]`
  - CTA: `bg-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-hover)]`

## 10) Work Plan (Payload Migration Steps)

1. Implement robust `payloadFetch` helper in `src/lib/payloud.ts`
2. Migrate Listings:
   - Update `lib/data/listings.ts` to fetch from Payload.
   - Update `/immobilien` and `/objekte/[slug]` routes to use the updated data functions.
3. Migrate References:
   - Update `lib/data/references.ts` similarly.
4. Migrate Globals:
   - Replace fallback content in `lib/cms/home.ts` and `lib/cms/companyPage.ts` with Payload Globals.
5. SEO:
   - Update `lib/seo/listingMetadata.ts` and `lib/seo/referencesMetadata.ts` to use CMS SEO fields.
6. Publishing Workflow:
   - Draft mode (optional).
   - Webhooks to revalidate (optional but recommended).

## 11) What to Upload Next (When needed)

If more detail is needed, upload:

- `src/lib/types/listings.ts`
- `src/lib/types/references.ts`
- `src/lib/payloud.ts`
- `src/lib/data/listings.ts`
- `src/lib/data/references.ts`
- `src/app/(site)/objekte/[slug]/page.tsx`
- `src/app/(site)/immobilien/page.tsx`
- Payload collection configs (if embedded) or API sample responses

## 12) Notes / Known Pitfalls

- Ensure `id` is always string when mapping (Payload returns string ids).
- Ensure `slug` is required for detail pages; fallback is not safe.
- Media mapping:
  - Payload Media often returns `{ url, filename, mimeType, ... }` inside a relation.
  - Convert to absolute URL if payload returns relative.
- Avoid mixing default/named exports incorrectly.
- Some filenames contain typos (e.g. layosut.tsx, payloud.ts). Keep imports consistent.

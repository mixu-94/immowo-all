# Frontend — Routen, Komponenten & Design System

`apps/web/` — Next.js 14 App Router, TypeScript, Tailwind CSS

---

## Routen

Alle öffentlichen Routen liegen unter `apps/web/src/app/(site)/`.

| Route | Datei | Komponente | Datenquelle |
|---|---|---|---|
| `/` | `page.tsx` | `<Home />` | `fetchHomeContent()` → Global `home` |
| `/immobilien` | `immobilien/page.tsx` | `<ListingsPage />` | `getListings()` → Collection `immobilien` |
| `/objekte/[slug]` | `objekte/[slug]/page.tsx` | `<ObjectDetailPage />` | `getListingBySlug(slug)` → `immobilien` |
| `/referenzen` | `referenzen/page.tsx` | `<ReferencesPage />` | `getReferences()` → `referenzen` |
| `/referenzen/[slug]` | `referenzen/[slug]/page.tsx` | `<ReferenceDetail />` | `getReferenceBySlug(slug)` → `referenzen` |
| `/unternehmen` | `unternehmen/page.tsx` | `<CompanyPage />` | `fetchCompanyPageContent()` → Global `unternehmen` |
| `/kontakt` | `kontakt/page.tsx` | `<ContactPage />` | `getMakler()` → Collection `makler` |
| `/impressum` | `impressum/page.tsx` | `<LegalPage />` | Global `impressum` |
| `/datenschutz` | `datenschutz/page.tsx` | `<LegalPage />` | Global `datenschutz` |
| `/agb` | `agb/page.tsx` | `<LegalPage />` | Global `agb` |
| `/cookies` | `cookies/page.tsx` | `<LegalPage />` | Global `cookies` |
| `/widerruf` | `widerruf/page.tsx` | `<LegalPage />` | Global `widerruf` |

**Layout-Datei:** `layosut.tsx` ⚠️ (Tippfehler, bitte nicht umbenennen)

---

## API-Routen

| Route | Datei | Beschreibung |
|---|---|---|
| `POST /api/contact` | `app/api/contact/route.ts` | Kontaktformular → Nodemailer SMTP |
| `POST /api/revalidate` | `app/api/revalidate/route.ts` | On-Demand ISR-Cache leeren |

---

## Data Fetcher (`lib/`)

### `lib/payloud.ts` — HTTP-Client für Payload
*(Tippfehler im Dateinamen — bleibt so)*

```typescript
payloadFind(collection, params, fetchOpts)    // Collection-Query
payloadFindByID(collection, id, params)        // Einzeldokument
payloadGlobal(slug, params)                    // Global abrufen
payloadCreate(collection, data)                // Dokument anlegen
payloadFetch(path, opts)                       // Generic HTTP-Fetch
```

### `lib/data/listings.ts` — Immobilien

| Funktion | Beschreibung |
|---|---|
| `getListings()` | Alle Listings (published) |
| `getListingBySlug(slug)` | Einzelnes Listing |
| `getAllListingSlugs()` | Für `generateStaticParams()` |
| `getCategoryRows()` | Karussell-Gruppenstruktur |

Fallback: statische Mock-Daten in der gleichen Datei (wenn CMS nicht erreichbar).

### `lib/data/references.ts` — Referenzen

| Funktion | Beschreibung |
|---|---|
| `getReferences()` | Alle Referenzen |
| `getReferenceBySlug(slug)` | Einzelne Referenz |
| `getAllReferenceSlugs()` | Für `generateStaticParams()` |

### `lib/data/makler.ts` — Makler-Profile

| Funktion | Beschreibung |
|---|---|
| `getMakler()` | Alle Makler-Profile (für Kontaktseite) |

Fallback: 2 hardcodierte Placeholder-Personen.

### `lib/cms/home.ts` — Global: Startseite

```typescript
fetchHomeContent()  // → payloadGlobal('home') → DEFAULT_HOME_CONTENT
```

### `lib/cms/companyPage.ts` — Global: Unternehmen

```typescript
fetchCompanyPageContent()  // → payloadGlobal('unternehmen') → DEFAULT_COMPANY_PAGE_CONTENT
```

---

## Schlüssel-Komponenten

### Objektseite (`/objekte/[slug]`)

```
ObjectDetailPage
├── CommissionGateEnforcer  — Provision-Gate (zeigt Dialog vor Provision-Info)
├── ObjectHero              — Hero-Bild/-Video, Titel, Preis, Badges
├── ObjectMain              — Hauptinhalt (2-spaltig)
│   ├── (links) Beschreibung, Highlights, Energie, Features, Galerie, Karte
│   └── (Sidebar) Ansprechpartner-Karte, Download-Card, Eckdaten, Prozess
├── ObjectTrust             — 3 Vertrauens-Badges
└── ObjectCTA               — PDF-Download oder „Exposé auf Anfrage"
```

**Ansprechpartner-Karte** (`ObjectMain.tsx`, Sidebar):
- Liest `listing.ansprechpartner` (aus Payload, depth 1 aufgelöst)
- Fallback wenn kein Makler zugewiesen: „Immowo Ventures" mit generischen Kontaktdaten
- Zeigt: Avatar/Initial, Name, Titel, Erreichbarkeit, Telefon, E-Mail, CTA-Button

### Kontaktseite (`/kontakt`)

```
ContactPage
├── ContactHero      — Überschrift + Beschreibung
├── ContactPeople    — Makler-Karten (async Server Component, fetcht von Payload)
└── ContactForm      — Formular → POST /api/contact
    └── ContactTrust — Vertrauens-Hinweise
```

### Commission Gate (`components/commission/`)

Desktop: 2-Spalten-Layout — linke scrollbare Info, rechts fixiertes Bestätigungs-Panel.
Bestätigung gibt Provision-Informationen frei.

---

## TypeScript-Typen (`lib/types/`)

### `lib/types/listings.ts`

| Typ | Beschreibung |
|---|---|
| `Listing` | Minimal für Cards/Navigation (id, slug, title, imageSrc, location, pricing) |
| `EstateDetails` | Vollständig für Detailseite (extends Listing + facts, energy, media, ansprechpartner) |
| `MaklerContact` | Makler-Profil (id, name, titleRole, phone, email, photoUrl, availability, focus[]) |
| `ListingFacts` | Eckdaten (livingArea, plotArea, rooms, bedrooms, bathrooms, yearBuilt) |
| `ListingEnergy` | Energieausweis (certificateType, value, class, carrier, year) |
| `ListingDocuments` | Dokumente (exposePdfUrl, floorplanUrl, energyCertificateUrl) |
| `BuyerCommission` | Provision-Struktur (kind, value, vatIncluded, vatRate, due, basis, note) |
| `ListingClassification` | Badges/Tags (variant, status, badge, tags, categoryIds) |
| `ListingLocation` | Diskrete Lage (region, label, geo) |
| `ListingStatus` | `"verfügbar" \| "reserviert" \| "verkauft" \| "in_bau"` |
| `ListingVariant` | `"ready" \| "build" \| "investment"` |

### `lib/types/references.ts`

```typescript
Reference  // Einzelne Referenz
```

---

## Design System

### Marke: Navy + Champagne Gold

| Eigenschaft | Wert |
|---|---|
| Hintergrund | Tiefes Navy-Blau |
| Akzent | Champagner-Gold |
| Schrift | Weiß, gedämpft (rgba Abstufungen) |
| Radien | `--radius-lg`, `--radius-xl` |
| Stil | Premium, ruhig, vertrauenswürdig |

### CSS Design Tokens (`globals.css`)

```css
--color-bg              /* Tiefes Navy — Haupt-Hintergrund */
--color-surface         /* rgba(255,255,255,0.04) */
--color-surface-2       /* rgba(255,255,255,0.06) */
--color-surface-3       /* rgba(255,255,255,0.08) */
--color-text            /* rgba(255,255,255,0.92) */
--color-text-muted      /* rgba(255,255,255,0.68) */
--color-border          /* rgba(255,255,255,0.10) */
--color-border-strong   /* rgba(255,255,255,0.16) */
--color-accent          /* Champagner-Gold */
--color-accent-hover
--color-accent-strong
--color-link
--color-link-hover
--radius-lg, --radius-xl
--shadow-soft
```

### Tailwind-Token-Pattern

```tsx
// Immer Tokens verwenden — nie Hex-Farben hardcoden!
className="bg-[color:var(--color-bg)]"
className="bg-[color:var(--color-surface-2)]"
className="border-[color:var(--color-border-strong)]"
className="text-[color:var(--color-text-muted)]"
className="bg-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-hover)]"
```

---

## Deutsche Markensprache & Textregeln

| ✅ Verwenden | ❌ Vermeiden |
|---|---|
| „Kauf ab Plan" | „vom Papier weg" |
| „Bauträgerprojekt" | „Mega", „Hammer" |
| „Schlüsselfertig" | Absolute Superlative |
| „Exposé auf Anfrage" | „billig" |
| „Rückruf anfragen" | — |
| „Diskret & verlässlich" | — |

**Zahlenformat:**
- Preis: `1.250.000 €` (keine Cents)
- Fläche: `165 m²`
- Energie: `kWh/(m²a)`
- Adresse: Nur Region, nicht exakt → `„Augsburg (Region)"`, `„Schwaben"`

**Status-Badges:**
`Schlüsselfertig` · `Neubauprojekt (Kauf ab Plan)` · `Kapitalanlage` · `Verfügbar` · `Reserviert` · `Verkauft` · `In Bau`

---

## Wichtige Quirks & Regeln

| Thema | Regel |
|---|---|
| `payloud.ts` | Tippfehler im Dateinamen — in allen Imports konsistent halten |
| `layosut.tsx` | Tippfehler im Layout-Dateinamen — konsistent halten |
| TS-Strings | Keine typografischen Anführungszeichen (`„"`) in `.ts`-Dateien → `\u201e` / `\u201c` nutzen |
| `commissionText` | Wird aus `buyerCommission` im Mapper berechnet |
| Bilder ohne Quelle | `SmartImage` zeigt Shimmer-Skeleton + Gold-Spinner während des Ladens |
| `ContactPeople` | Async Server Component (fetcht zur Renderzeit) |

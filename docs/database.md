# Datenbank — Collections, Globals & Beziehungen

Alle Daten werden in **PostgreSQL** gespeichert und über **Payload CMS** verwaltet.
Die REST API ist unter `http://localhost:3000/api/` erreichbar.

---

## Datenbankzugang (Entwicklung)

```
Host:     localhost:5432
Datenbank: payload
User:     payload
Passwort: <in apps/cms/.env — DATABASE_URL>
Connection String: postgresql://payload:<password>@localhost:5432/payload
```

**Direkt verbinden:**
```bash
psql $(grep DATABASE_URL apps/cms/.env | cut -d= -f2)
```

---

## Beziehungsdiagramm

```
┌─────────────────────────────────────────────────────────────────┐
│                        COLLECTIONS                               │
│                                                                  │
│  ┌─────────┐      ┌──────────────┐      ┌──────────────────┐   │
│  │  users  │──────│    makler    │◄─────│   immobilien     │   │
│  │         │      │              │  1:N │                  │   │
│  │ role:   │      │ name         │      │ title            │   │
│  │ admin   │      │ titleRole    │      │ slug             │   │
│  │ editor  │      │ phone        │      │ ansprechpartner  │   │
│  │ makler  │      │ email        │      │   (→ makler)     │   │
│  │         │      │ photo────────┼──┐   │ heroMedia ───────┼──┐│
│  │ makler  │      │ availability │  │   │ gallery[] ───────┼──┤│
│  │ Profile │      │ focus[]      │  │   │ documents.expose-┼──┤│
│  │ (→makler│      │ linkedUser──┘│  │   │   Pdf ──────────┼──┤│
│  └─────────┘      └──────────────┘  │   │ seo.ogImage ────┼──┘│
│                                     │   └──────────────────┘   │
│  ┌──────────────┐                   │                          │
│  │    media     │◄──────────────────┘   ┌──────────────────┐   │
│  │              │                       │   referenzen     │   │
│  │ filename     │◄──────────────────────│ coverImage ──────┘   │
│  │ alt          │                       │ gallery[]            │
│  │ url          │                       │ documents.*          │
│  │ mimeType     │                       └──────────────────┘   │
│  │ sizes.*      │                                              │
│  └──────────────┘                                              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                          GLOBALS                                  │
│                                                                  │
│  home          → Startseite-Inhalte (Hero, USPs, CTAs)          │
│  unternehmen   → Unternehmensseite                              │
│  siteSettings  → Footer, Branding, Kontaktdaten, Socials        │
│  impressum     → Impressum-Text                                  │
│  datenschutz   → Datenschutzerklärung                           │
│  agb           → Allgemeine Geschäftsbedingungen                │
│  widerruf      → Widerrufsbelehrung                             │
│  cookies       → Cookie-Richtlinie                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## Collections

### `users` — Benutzerkonten

Auth-Collection. Login über `/admin` oder `/api/users/login`.

| Feld | Typ | Beschreibung |
|---|---|---|
| `email` | email (auto) | Login-E-Mail |
| `password` | hash (auto) | PBKDF2-gehashtes Passwort (salt + hash in DB) |
| `role` | select | `admin` \| `editor` \| `makler` — in JWT gespeichert |
| `maklerProfile` | relationship → makler | Verknüpftes Makler-Profil (nur bei Rolle `makler`) |

**Zugriffsregeln:**
- Nur Admin kann neue User anlegen / löschen
- Jeder User kann sein eigenes Profil lesen/bearbeiten
- `role` und `maklerProfile` nur durch Admin änderbar

---

### `makler` — Ansprechpartner / Makler-Profile

Öffentlich lesbar (für Frontend-Darstellung auf Objekt- und Kontaktseite).

| Feld | Typ | Beschreibung |
|---|---|---|
| `name` | text (required) | Vollständiger Name |
| `titleRole` | text | Berufsbezeichnung, z.B. „Immobilienberater" |
| `phone` | text | Telefonnummer |
| `email` | email | E-Mail-Adresse |
| `photo` | upload → media | Profilbild |
| `availability` | text | Erreichbarkeit, z.B. „Mo–Fr 9–18 Uhr" |
| `focus` | array `{ tag }[]` | Schwerpunkte, z.B. „Schlüsselfertig", „Kauf ab Plan" |
| `linkedUser` | relationship → users | Login-Account (nur Admin sichtbar) |

**Zugriffsregeln:**
- `read`: öffentlich (für Frontend-Fetch ohne Auth)
- `create` / `update` / `delete`: nur Admin

---

### `immobilien` — Immobilien-Listings

Haupt-Collection. Unterstützt Draft/Publish-Workflow.

| Tab | Feld | Typ | Beschreibung |
|---|---|---|---|
| **Basis** | `title` | text | Objekt-Titel |
| | `slug` | text (unique) | URL-Slug, auto-generiert aus Titel |
| | `vermarktungsStatus` | select | `verfuegbar` \| `reserviert` \| `verkauft` \| `in_bau` ⚠️ kein Umlaut |
| | `location` | text | Ort/Region (diskret) |
| | `price` | number | Kaufpreis (leer = „auf Anfrage") |
| | `livingArea` | number | Wohnfläche m² |
| | `plotArea` | number | Grundstücksfläche m² |
| | `rooms` | number | Zimmeranzahl |
| | `bedrooms` | number | Schlafzimmer |
| | `bathrooms` | number | Bäder |
| | `yearBuilt` | number | Baujahr |
| | `availability` | text | Verfügbarkeitstext |
| | `badge` | text | Kleiner Badge-Text im Hero |
| | `ansprechpartner` | relationship → makler | Zugewiesener Makler (Sidebar) |
| **Medien** | `heroMedia` | upload → media | Hauptbild/-video |
| | `gallery[]` | array `{ item }` | Fotogalerie |
| | `documents.exposePdf` | upload → media (PDF) | Exposé-Dokument |
| **Inhalte** | `description` | richText (Lexical) | Beschreibungstext |
| | `highlights[]` | array `{ text }` | Highlight-Punkte |
| | `features[]` | array `{ text }` | Ausstattungsmerkmale |
| **Energie** | `energy.certificateType` | select | `bedarf` \| `verbrauch` |
| | `energy.value` | number | kWh/(m²a) |
| | `energy.class` | text | A+ … H |
| | `energy.carrier` | text | Energieträger |
| | `energy.year` | number | Baujahr laut Ausweis |
| **Provision** | `buyerCommission.kind` | select | `percent` \| `fixed` |
| | `buyerCommission.value` | number | Prozentsatz oder Festbetrag |
| | `buyerCommission.vatIncluded` | checkbox | inkl. MwSt. |
| | `buyerCommission.vatRate` | number | MwSt.-Satz (default 19%) |
| | `buyerCommission.due` | text | Fälligkeit |
| | `buyerCommission.basis` | text | Berechnungsbasis |
| | `buyerCommission.note` | textarea | Hinweistext |
| **SEO** | `seo.metaTitle` | text | SEO-Titel |
| | `seo.metaDescription` | textarea | SEO-Beschreibung |
| | `seo.ogImage` | upload → media | Open Graph Bild |

**Zugriffsregeln:**
- `read`: Admin/Editor/Makler sehen alle (inkl. Entwürfe); öffentlich nur `_status: published`
- `create` / `update`: Admin, Editor, Makler
- `delete`: nur Admin
- Drafts aktiviert: `versions: { drafts: true }`

> ⚠️ **Wichtig:** `vermarktungsStatus` NICHT `status` — Payload reserviert `_status` intern für Draft/Publish.

---

### `referenzen` — Referenzprojekte

Portfolio-Projekte. Unterstützt Draft/Publish. Für Makler unsichtbar.

| Tab | Feld | Typ | Beschreibung |
|---|---|---|---|
| **Basis** | `title`, `slug` | text | Titel + URL-Slug |
| | `subtitle` | text | Untertitel |
| | `category` | select | Neubau \| Sanierung \| Projektentwicklung \| Verkauf \| Kapitalanlage \| Gewerbe |
| | `year` | text | Projektjahr |
| | `isFeatured` | checkbox | Featured = erscheint zuerst |
| | `sortOrder` | number | Manuelles Sortieren |
| | `location.region` | text | Region (z.B. „Schwaben") |
| | `location.label` | text | Anzeige-Ort (z.B. „Augsburg (Region)") |
| | `location.geo` | group `{ lat, lng }` | Grobe Koordinaten |
| | `description` | textarea | Kurzbeschreibung |
| | `highlights[]` | array `{ text }` | Schlagworte |
| **Medien** | `coverImage` | upload → media | Cover-Bild |
| | `gallery[]` | array `{ item, alt }` | Fotogalerie |
| | `documents.*` | uploads | caseStudyPdf, exposeSample, brochure |
| **Inhalte** | `facts.*` | group | units, livingArea, plotArea, rooms, buildTime, status |
| | `kpis[]` | array `{ label, value }` | KPI-Kacheln |
| | `services` | select (hasMany) | Leistungen (Projektentwicklung, Bauträger, …) |
| **Case Study** | `timeline[]` | array `{ title, text }` | Projektverlauf |
| | `sections[]` | array `{ heading, content }` | Textabschnitte |
| | `caseStudy.*` | group | challenge, approach, result |
| | `testimonial.*` | group | quote, author, role |
| **SEO** | `seo.*` | group | metaTitle, metaDescription, ogImage |

---

### `media` — Medienverwaltung

Zentrale Medienspeicherung. Öffentlich lesbar.

| Feld | Typ | Beschreibung |
|---|---|---|
| `alt` | text (required) | Alt-Text (Pflichtfeld) |
| `title` | text | Optionaler Titel |
| `filename` | auto | Dateiname |
| `mimeType` | auto | MIME-Typ |
| `url` | auto | Relativer Pfad |

**Bildgrößen (auto-generiert):**
- `thumbnail`: 400×300px
- `card`: 1200×800px

**Erlaubte MIME-Typen:** `image/*`, `application/pdf`, `video/*`

---

## Globals

Globals sind einzelne Dokumente (kein Array). Sie werden per `payloadGlobal(slug)` abgerufen.

| Slug | Label | Wer darf bearbeiten | Sichtbar für |
|---|---|---|---|
| `home` | Startseite | Admin | Admin, Editor |
| `unternehmen` | Unternehmen | Admin | Admin, Editor |
| `siteSettings` | Website Einstellungen | Admin | Admin |
| `impressum` | Impressum | Admin | Admin |
| `datenschutz` | Datenschutz | Admin | Admin |
| `agb` | AGB | Admin | Admin |
| `widerruf` | Widerruf | Admin | Admin |
| `cookies` | Cookies | Admin | Admin |

> Alle Globals: `read: () => true` (öffentlich lesbar für das Frontend) — aber im Admin-Panel nur für die angegebene Rolle sichtbar.

---

## Wichtige Quirks & Regeln

| Thema | Regel |
|---|---|
| `vermarktungsStatus` | In DB ohne Umlaut: `verfuegbar` (nicht `verfügbar`). Im Frontend mappen! |
| `_status` | Payload-intern für Draft/Publish. Nie selbst als Feldname verwenden. |
| Payload IDs | PostgreSQL-Adapter gibt numerische IDs zurück → im Frontend mit `String(id)` casten |
| Media-URLs | Payload gibt relative URLs zurück → `${PAYLOAD_BASE_URL}${url}` für absolute URLs |
| Lexical Rich Text | `description` in Immobilien ist Lexical-JSON → `lexicalToPlainText()` Helper in listings.ts |
| `focus[]` in Makler | Payload gibt `{ tag: string }[]` → im Frontend zu `string[]` flattened |
| Neue Felder | Nach Schema-Änderungen immer: `cd apps/cms && npm run generate:types` |

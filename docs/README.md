# Immowo Ventures — Projektdokumentation

> **Immowo Ventures** ist eine Premium-Immobilienplattform (Bauträger, Schlüsselfertig, Kauf ab Plan).
> Dieses Monorepo enthält das Next.js-Frontend und das Payload CMS.

---

## Inhaltsverzeichnis

| Dokument | Inhalt |
|---|---|
| [README.md](./README.md) | Dieses Dokument — Übersicht, Quick Start |
| [database.md](./database.md) | Collections, Globals, Felder, Beziehungen |
| [roles-access.md](./roles-access.md) | Benutzerrollen, Zugriffsmatrix, Accounts |
| [architecture.md](./architecture.md) | Systemarchitektur, Datenfluss, ENV-Vars |
| [frontend.md](./frontend.md) | Routen, Komponenten, Design System |

---

## Tech Stack

| | Web App | CMS |
|---|---|---|
| **Framework** | Next.js 14.2 (App Router) | Next.js 15.4 + Payload CMS 3.78 |
| **React** | 18.x | 19.x |
| **Sprache** | TypeScript | TypeScript |
| **Styling** | Tailwind CSS + CSS Design Tokens | Tailwind CSS |
| **Datenbank** | — | PostgreSQL (via `@payloadcms/db-postgres`) |
| **Rich Text** | — | Lexical Editor |
| **E-Mail** | Nodemailer (SMTP / IONOS) | — |
| **Port (Dev)** | **3001** | **3000** |

---

## Monorepo-Struktur

```
real-estate-platform/
├── apps/
│   ├── web/                        # Next.js Frontend (Kundenwebsite)
│   │   └── src/
│   │       ├── app/(site)/         # Alle öffentlichen Routen
│   │       ├── components/         # UI-Komponenten
│   │       └── lib/
│   │           ├── cms/            # Globals-Fetcher (home.ts, companyPage.ts)
│   │           ├── data/           # listings.ts, references.ts, makler.ts
│   │           ├── types/          # TypeScript-Typen
│   │           ├── seo/            # SEO-Metadaten-Helpers
│   │           └── payloud.ts      # HTTP-Client für Payload REST API ⚠️ Tippfehler im Namen
│   └── cms/                        # Payload CMS (Admin-Panel + API)
│       └── src/
│           ├── collections/        # Users, Media, Immobilien, Referenzen, Makler
│           ├── globals/            # Home, Unternehmen, SiteSettings, Rechtliches
│           ├── components/         # Custom Admin-UI Komponenten
│           ├── access/             # (inline in Collections)
│           ├── hooks/              # (inline in Fields)
│           └── seed/               # Seed-Scripts für Testdaten
└── docs/                           # Diese Dokumentation
```

---

## Quick Start

### Voraussetzungen
- Node.js >= 20.9.0
- PostgreSQL läuft lokal auf Port 5432
- Datenbank `payload` existiert (User: `payload`, Password: siehe `apps/cms/.env`)

### CMS starten (Port 3000)
```bash
cd apps/cms
npm run dev
```

### Web starten (Port 3001)
```bash
cd apps/web
npm run dev -- -p 3001
```

### Wichtige URLs

| URL | Beschreibung |
|---|---|
| `http://localhost:3000/admin` | Payload CMS Admin-Panel |
| `http://localhost:3000/api/immobilien` | REST API — Immobilien |
| `http://localhost:3000/api/makler` | REST API — Makler-Profile |
| `http://localhost:3001` | Frontend (Kundenwebsite) |
| `http://localhost:3001/immobilien` | Immobilien-Liste |
| `http://localhost:3001/kontakt` | Kontaktformular |

---

## Admin-Login (CMS)

| Feld | Wert |
|---|---|
| URL | `http://localhost:3000/admin` |
| E-Mail | `admin@immowo.de` |
| Passwort | `Admin1234!` |

> Weitere Accounts (Makler) → siehe [roles-access.md](./roles-access.md)

---

## Nützliche Befehle

```bash
# Nach Schema-Änderungen im CMS (immer ausführen!)
cd apps/cms && npm run generate:types

# Import Map regenerieren (nach neuen Admin-Komponenten)
cd apps/cms && npx payload generate:importmap

# TypeScript-Check
cd apps/cms && npx tsc --noEmit

# Makler-Daten einspielen
cd apps/cms
SEED_EMAIL=admin@immowo.de SEED_PASSWORD=<password> npx tsx src/seed/makler-seed.ts

# Alle Immobilien-Daten einspielen
cd apps/cms
SEED_EMAIL=admin@immowo.de SEED_PASSWORD=<password> npm run seed
```

---

## Bekannte Dateiname-Tippfehler (absichtlich — bitte nicht umbenennen)

| Datei | Wo | Anmerkung |
|---|---|---|
| `payloud.ts` | `apps/web/src/lib/` | Payload HTTP-Client (Tippfehler: payloud statt payload) |
| `layosut.tsx` | `apps/web/src/app/(site)/` | Layout-Datei (Tippfehler: layosut statt layout) |

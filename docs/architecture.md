# Systemarchitektur

---

## Überblick

```
┌─────────────────────────────────────────────────────────────────────┐
│                          BROWSER / USER                             │
└───────────────┬──────────────────────────────┬──────────────────────┘
                │                              │
                ▼                              ▼
┌──────────────────────────┐    ┌──────────────────────────────────────┐
│   Next.js Frontend       │    │   Payload CMS Admin                  │
│   apps/web               │    │   apps/cms                           │
│   Port: 3001             │    │   Port: 3000/admin                   │
│                          │    │                                      │
│  App Router (SSR/ISR)    │    │  Admin-Panel (React)                 │
│  TypeScript, Tailwind    │    │  Collections: Users, Media,          │
│                          │    │    Immobilien, Referenzen, Makler    │
│  Fetcher:                │    │  Globals: Home, Unternehmen,         │
│  lib/payloud.ts  ────────┼────►  SiteSettings, Rechtliches          │
│                          │    │                                      │
└──────────────────────────┘    └─────────────────┬────────────────────┘
                                                  │
                                                  ▼
                                ┌──────────────────────────────────────┐
                                │          PostgreSQL                  │
                                │          Port: 5432                  │
                                │          DB: payload                 │
                                └──────────────────────────────────────┘
```

---

## Web ↔ CMS Kommunikation

Das Frontend kommuniziert **ausschließlich über die Payload REST API** mit dem CMS.
Direkte Datenbankzugriffe gibt es im Frontend nicht.

### API-Basis-URL
```
PAYLOAD_BASE_URL=http://localhost:3000
```

### Authentifizierung
- Öffentliche Endpunkte (z.B. `/api/immobilien`) brauchen **keinen Auth-Header**
- Optional: `PAYLOAD_API_KEY` als Bearer-Token im Header (für private Endpunkte)

### HTTP-Client
Alle Fetch-Aufrufe gehen über `apps/web/src/lib/payloud.ts` (Tippfehler im Namen, bleibt so):

```typescript
// Collection abfragen
payloadFind('immobilien', { where: { _status: { equals: 'published' } }, depth: 2 })

// Einzelnes Dokument
payloadFindByID('immobilien', id)

// Global abrufen
payloadGlobal('home')

// Dokument erstellen
payloadCreate('immobilien', data)
```

---

## Datenfluss — Objektseite (`/objekte/[slug]`)

```
Browser → GET /objekte/villa-mit-seeblick-re1
          │
          ▼
    page.tsx (Server Component)
          │
          ▼
    getListingBySlug(slug)
          │
          ├─► payloadFind('immobilien', { where: { slug, _status: published }, depth: 2 })
          │         │
          │         ▼
          │   Payload REST API → PostgreSQL
          │         │
          │         ▼
          │   PayloadImmobilie (JSON)
          │   ├── ansprechpartner: { id, name, phone, ... }  ← depth:2 resolved
          │   ├── heroMedia: { url, alt }
          │   └── gallery: [{ item: { url } }]
          │
          ├─► mapPayloadToEstateDetails(p)  → EstateDetails
          │
          └─► Fallback: statische Mock-Daten (wenn CMS nicht erreichbar)
                │
                ▼
        <ObjectDetailPage listing={EstateDetails} />
              │
              ├── <ObjectHero />     — Bild, Titel, Badges
              ├── <ObjectMain />     — Details, Sidebar mit Makler-Karte
              ├── <ObjectTrust />    — Vertrauens-Badges
              └── <ObjectCTA />     — Exposé-Download oder Anfrage-CTA
```

---

## Datenfluss — Kontaktseite (`/kontakt`)

```
Browser → GET /kontakt
          │
          ▼
    ContactPage.tsx (Server Component)
          │
          ▼
    getMakler()  ← lib/data/makler.ts
          │
          ├─► payloadFind('makler', { limit: 20 })
          │         │
          │         ▼
          │   Payload REST API → PostgreSQL
          │
          └─► Fallback: 2 hardcodierte Placeholder-Personen
                │
                ▼
        <ContactPeople />  — Makler-Karten (dynamisch)
        <ContactForm />    — Formular → POST /api/contact
                                │
                                ▼
                          Nodemailer → SMTP (IONOS)
                          → E-Mail an CONTACT_TO_EMAIL
```

---

## Caching & ISR-Strategie

| Seite | Strategie | Revalidierung |
|---|---|---|
| `/` | ISR | `revalidate: 300` (5 Min) |
| `/immobilien` | ISR | `revalidate: 300` |
| `/objekte/[slug]` | ISR | `revalidate: 300`, Tag: `immobilien-{slug}` |
| `/referenzen` | ISR | `revalidate: 300` |
| `/referenzen/[slug]` | ISR | `revalidate: 300` |
| `/unternehmen` | ISR | `revalidate: 300` |
| `/kontakt` | SSR | `no-store` (Formular) |
| Legal pages | ISR | `revalidate: 300` |

### On-Demand Revalidierung (Webhook)
- Endpunkt: `POST /api/revalidate` (Next.js Route Handler)
- Secret: `REVALIDATION_SECRET` (in `.env.local`)
- Kann von Payload Hooks bei Content-Änderungen aufgerufen werden

---

## Umgebungsvariablen

### `apps/web/.env.local`

| Variable | Wert (Dev) | Beschreibung |
|---|---|---|
| `PAYLOAD_BASE_URL` | `http://localhost:3000` | Payload CMS URL |
| `PAYLOAD_API_KEY` | *(leer)* | Optionaler Bearer-Token |
| `REVALIDATION_SECRET` | `change_me_to_a_secure_random_token` | Webhook-Secret für ISR |
| `NEXT_PUBLIC_SITE_URL` | `https://immowo-ventures.de` | Öffentliche Site-URL (SEO) |
| `MAIL_MODE` | `smtp` | E-Mail-Modus |
| `CONTACT_TO_EMAIL` | `<empfaenger@email.de>` | Empfänger für Kontaktformular |
| `SMTP_HOST` | `<smtp.provider.de>` | SMTP-Server |
| `SMTP_PORT` | `587` | SMTP-Port (STARTTLS) |
| `SMTP_SECURE` | `false` | TLS (false = STARTTLS) |
| `SMTP_USER` | `<smtp-user>` | SMTP-Login |
| `SMTP_PASS` | `<smtp-password>` | SMTP-Passwort |
| `SMTP_FROM_NAME` | `Immowo Anfrage` | Absendername |

### `apps/cms/.env`

| Variable | Wert (Dev) | Beschreibung |
|---|---|---|
| `DATABASE_URL` | `postgresql://payload:<password>@localhost:5432/payload` | PostgreSQL Connection String |
| `PAYLOAD_SECRET` | *(gesetzt)* | JWT-Signing-Secret |

---

## API-Endpunkte Referenz

### Collections (REST)

| Methode | Endpunkt | Beschreibung |
|---|---|---|
| GET | `/api/immobilien` | Alle Immobilien (mit Where/Limit/Sort) |
| GET | `/api/immobilien/:id` | Einzelne Immobilie |
| POST | `/api/immobilien` | Neue Immobilie anlegen |
| PATCH | `/api/immobilien/:id` | Immobilie bearbeiten |
| DELETE | `/api/immobilien/:id` | Immobilie löschen |
| GET | `/api/makler` | Alle Makler |
| GET | `/api/referenzen` | Alle Referenzen |
| GET | `/api/media` | Alle Medien |
| POST | `/api/users/login` | Login → JWT Token |
| GET | `/api/users/me` | Eigenes Profil |

### Globals (REST)

| Methode | Endpunkt | Beschreibung |
|---|---|---|
| GET | `/api/globals/home` | Startseite-Inhalte |
| GET | `/api/globals/unternehmen` | Unternehmensseite |
| GET | `/api/globals/siteSettings` | Footer, Socials, Kontakt |
| GET | `/api/globals/impressum` | Impressum-Text |

### Query-Parameter (Collections)

```
?where[_status][equals]=published
?where[slug][equals]=villa-mit-seeblick
?where[vermarktungsStatus][equals]=verfuegbar
?limit=10&page=1
?sort=-updatedAt
?depth=2          ← Relations werden aufgelöst (z.B. ansprechpartner-Objekt)
?draft=true       ← Entwürfe einschließen (nur Auth)
```

---

## Deployment-Hinweise

> ⚠️ Diese Sektion betrifft zukünftiges Production-Deployment.

- **CMS-URL** in `PAYLOAD_BASE_URL` auf Production-Domain ändern
- **Starkes `PAYLOAD_SECRET`** generieren (min. 32 Zeichen)
- **`REVALIDATION_SECRET`** sicheres Token setzen
- Media-Uploads: Für Production S3-Adapter (`@payloadcms/storage-s3`) empfohlen
- HTTPS für alle Domains
- PostgreSQL-Credentials rotieren

# Benutzerrollen & Zugriffsrechte

Immowo Ventures nutzt ein rollenbasiertes Zugriffssystem (RBAC) direkt in Payload CMS.
Die Rolle wird im JWT-Token gespeichert (`saveToJWT: true`) und ist damit bei jedem Request verfügbar.

---

## Rollen-Übersicht

| Rolle | Beschreibung |
|---|---|
| `admin` | Vollzugriff auf alles — System-Management, alle Collections, alle Globals |
| `editor` | Inhaltspflege — alle Collections und Website-Globals bearbeiten |
| `makler` | Immobilien-Fokus — kann Immobilien anlegen/bearbeiten, kein Zugriff auf Website-Inhalte |

---

## Zugriffsmatrix

| Bereich | Admin | Editor | Makler | Öffentlich |
|---|---|---|---|---|
| **Immobilien** — Lesen (published) | ✅ | ✅ | ✅ | ✅ |
| **Immobilien** — Lesen (drafts) | ✅ | ✅ | ✅ | ❌ |
| **Immobilien** — Erstellen | ✅ | ✅ | ✅ | ❌ |
| **Immobilien** — Bearbeiten | ✅ | ✅ | ✅ | ❌ |
| **Immobilien** — Löschen | ✅ | ❌ | ❌ | ❌ |
| **Makler** — Lesen | ✅ | ✅ | ❌* | ✅ |
| **Makler** — Erstellen/Bearbeiten | ✅ | ❌ | ❌ | ❌ |
| **Referenzen** — Lesen/Bearbeiten | ✅ | ✅ | ❌* | ✅ (published) |
| **Media** — Hochladen | ✅ | ✅ | ✅ | ❌ |
| **Users** — Verwalten | ✅ | ❌ | ❌ | ❌ |
| **Global: Startseite** | ✅ (edit) | ✅ (sehen) | ❌* | ✅ (read) |
| **Global: Unternehmen** | ✅ (edit) | ✅ (sehen) | ❌* | ✅ (read) |
| **Global: SiteSettings** | ✅ (edit) | ❌* | ❌* | ✅ (read) |
| **Global: Rechtliches** | ✅ (edit) | ❌* | ❌* | ✅ (read) |
| **Admin Dashboard** | Vollständig | Standard | Makler-Dashboard | ❌ |

> ❌* = im Admin-Panel ausgeblendet (`admin.hidden`)

---

## Accounts (Entwicklung)

### Admin
| Feld | Wert |
|---|---|
| E-Mail | `admin@immowo.de` |
| Passwort | `<lokal gesetzt — nicht im Repo>` |
| Rolle | `admin` |

### Dummy-Makler (aus Seed)
| Name | E-Mail | Passwort | Schwerpunkte |
|---|---|---|---|
| Max Mustermann | `max.mustermann@immowo.de` | `<lokal gesetzt>` | Schlüsselfertig, Kauf ab Plan, Neubauprojekte |
| Julia Musterfrau | `julia.musterfrau@immowo.de` | `<lokal gesetzt>` | Bauträger, Kapitalanlage, Projektentwicklung |
| Thomas Bergmann | `thomas.bergmann@immowo.de` | `<lokal gesetzt>` | Bestandsimmobilien, Eigentumswohnungen, EFH |

---

## Makler-Dashboard

Wenn sich ein Makler einloggt, sieht er im Admin-Panel ein angepasstes Dashboard:

- **Willkommens-Banner** mit „Makler-Portal" Bezeichnung
- **Identische KPI-Karten** (Verfügbar / Reserviert / Verkauft / Entwürfe) — da Makler alle Immobilien sehen darf
- **Schnellzugriff:** „+ Neue Immobilie" und „Immobilien verwalten"
- **Kalender-Teaser** (Platzhalter): „Kalender & Terminvergabe — Demnächst"
- **Keine Sidebar-Einträge** für: Referenzen, Startseite, Unternehmen, SiteSettings, Rechtliches

---

## Neuen Makler anlegen (Schritt-für-Schritt)

### 1. Makler-Profil anlegen
1. Admin-Panel öffnen: `http://localhost:3000/admin`
2. Linke Sidebar → **Makler** → **Neu erstellen**
3. Felder ausfüllen: Name, Titel/Rolle, Telefon, E-Mail, Profilbild, Erreichbarkeit, Schwerpunkte
4. Speichern → **Makler-ID notieren** (in der URL sichtbar)

### 2. User-Account anlegen
1. Linke Sidebar → **Benutzer** → **Neu erstellen**
2. E-Mail und Passwort setzen
3. **Rolle: Makler** auswählen
4. **Makler-Profil** verknüpfen (Feld erscheint nach Rollen-Auswahl)
5. Speichern

### 3. Makler einer Immobilie zuweisen
1. Linke Sidebar → **Immobilien** → Objekt öffnen
2. Im **Basis-Tab** rechts in der Sidebar → Feld **„Ansprechpartner (Makler)"**
3. Makler auswählen und speichern

> Wenn kein Makler zugewiesen → Frontend zeigt automatisch **„Immowo Ventures"** als generischen Ansprechpartner.

---

## Passwort zurücksetzen (DB-Methode)

Falls ein Passwort vergessen wurde:

```bash
# 1. Neuen Hash generieren
node -e "
const crypto = require('crypto');
const password = 'NeuesPasswort123!';
const salt = crypto.randomBytes(32).toString('hex');
crypto.pbkdf2(password, salt, 25000, 512, 'sha256', (err, hash) => {
  console.log('SALT=' + salt);
  console.log('HASH=' + hash.toString('hex'));
});
"

# 2. In DB einspielen
psql $(grep DATABASE_URL apps/cms/.env | cut -d= -f2) -c "
UPDATE users SET salt='SALT_HIER', hash='HASH_HIER' WHERE email='user@example.com';
"

# 3. Falls Account gesperrt (zu viele Fehlversuche):
psql $(grep DATABASE_URL apps/cms/.env | cut -d= -f2) -c "
UPDATE users SET login_attempts=0, lock_until=NULL WHERE email='user@example.com';
"
```

> Payload nutzt **PBKDF2** (nicht bcrypt) mit 25.000 Iterationen, SHA-256, 512-Byte-Hash.

---

## Seed-Scripts

```bash
cd apps/cms

# Alle Immobilien-Daten
SEED_EMAIL=admin@immowo.de SEED_PASSWORD=<password> npm run seed

# Makler-Profile + User-Accounts
SEED_EMAIL=admin@immowo.de SEED_PASSWORD=<password> npx tsx src/seed/makler-seed.ts
```

> Beide Scripts sind **idempotent** — bereits existierende Einträge werden übersprungen.

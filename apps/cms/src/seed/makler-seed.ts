/**
 * Makler Seed Script
 * ─────────────────────────────────────────────────────────────────────────────
 * Legt 3 Dummy-Makler an: je ein Makler-Profil + einen Login-Account.
 *
 * Voraussetzungen:
 *   1. Payload CMS läuft auf http://localhost:3000
 *   2. Admin-Account vorhanden
 *
 * Ausführen:
 *   cd apps/cms
 *   SEED_EMAIL=admin@immowo.de SEED_PASSWORD=<password> npx tsx src/seed/makler-seed.ts
 * ─────────────────────────────────────────────────────────────────────────────
 */

const BASE_URL = process.env.PAYLOAD_BASE_URL ?? "http://localhost:3000";
const SEED_EMAIL = process.env.SEED_EMAIL ?? "";
const SEED_PASSWORD = process.env.SEED_PASSWORD ?? "";
const MAKLER_DEFAULT_PASSWORD = process.env.MAKLER_DEFAULT_PASSWORD ?? "ChangeMe123!";

// ─── Auth ─────────────────────────────────────────────────────────────────────

async function login(): Promise<string> {
  if (!SEED_EMAIL || !SEED_PASSWORD) {
    throw new Error(
      "SEED_EMAIL und SEED_PASSWORD als Env-Vars setzen.\n" +
        "Beispiel: SEED_EMAIL=admin@immowo.de SEED_PASSWORD=<password> npx tsx src/seed/makler-seed.ts"
    );
  }
  const res = await fetch(`${BASE_URL}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: SEED_EMAIL, password: SEED_PASSWORD }),
  });
  const data = (await res.json()) as { token?: string; message?: string };
  if (!res.ok || !data.token) {
    throw new Error(`Login fehlgeschlagen: ${data.message ?? JSON.stringify(data)}`);
  }
  console.log(`Eingeloggt als ${SEED_EMAIL}`);
  return data.token;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function apiFetch<T>(
  path: string,
  token: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
      ...(options.headers ?? {}),
    },
  });
  const data = (await res.json()) as T;
  if (!res.ok) {
    throw new Error(
      `API ${options.method ?? "GET"} ${path} fehlgeschlagen: ${JSON.stringify(data)}`
    );
  }
  return data;
}

async function findByEmail(email: string, token: string): Promise<number | null> {
  const data = await apiFetch<{ docs?: { id: number }[] }>(
    `/api/users?where[email][equals]=${encodeURIComponent(email)}&limit=1`,
    token
  );
  if (data.docs && data.docs.length > 0) return data.docs[0].id;
  return null;
}

async function findMaklerByName(name: string, token: string): Promise<number | null> {
  const data = await apiFetch<{ docs?: { id: number }[] }>(
    `/api/makler?where[name][equals]=${encodeURIComponent(name)}&limit=1`,
    token
  );
  if (data.docs && data.docs.length > 0) return data.docs[0].id;
  return null;
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

const MAKLER_DATA = [
  {
    name: "Max Mustermann",
    titleRole: "Immobilienberater",
    phone: "+49 821 123 456",
    email: "max.mustermann@immowo.de",
    availability: "Mo\u2013Fr 9\u201318 Uhr",
    focus: ["Schl\u00fcsselfertig", "Kauf ab Plan", "Neubauprojekte"],
    userPassword: MAKLER_DEFAULT_PASSWORD,
  },
  {
    name: "Julia Musterfrau",
    titleRole: "Projektentwicklung",
    phone: "+49 821 123 457",
    email: "julia.musterfrau@immowo.de",
    availability: "Mo\u2013Fr 9\u201317 Uhr",
    focus: ["Bautr\u00e4ger", "Kapitalanlage", "Projektentwicklung"],
    userPassword: MAKLER_DEFAULT_PASSWORD,
  },
  {
    name: "Thomas Bergmann",
    titleRole: "Immobilienmakler",
    phone: "+49 821 123 458",
    email: "thomas.bergmann@immowo.de",
    availability: "Mo\u2013Sa 9\u201319 Uhr",
    focus: ["Bestandsimmobilien", "Eigentumswohnungen", "Einfamilienh\u00e4user"],
    userPassword: MAKLER_DEFAULT_PASSWORD,
  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("\nMakler Seed gestartet...\n");
  const token = await login();

  for (const makler of MAKLER_DATA) {
    console.log(`\nVerarbeite: ${makler.name}`);

    // 1) Makler-Profil anlegen (idempotent)
    let maklerDocId = await findMaklerByName(makler.name, token);

    if (maklerDocId) {
      console.log(`  Makler-Profil existiert bereits (ID: ${maklerDocId}), wird übersprungen.`);
    } else {
      const created = await apiFetch<{ doc?: { id: number } }>(
        "/api/makler",
        token,
        {
          method: "POST",
          body: JSON.stringify({
            name: makler.name,
            titleRole: makler.titleRole,
            phone: makler.phone,
            email: makler.email,
            availability: makler.availability,
            focus: makler.focus.map((tag) => ({ tag })),
          }),
        }
      );
      maklerDocId = created.doc?.id ?? null;
      if (!maklerDocId) throw new Error(`Makler-Profil konnte nicht angelegt werden.`);
      console.log(`  Makler-Profil angelegt (ID: ${maklerDocId})`);
    }

    // 2) User-Account anlegen (idempotent)
    let userId = await findByEmail(makler.email, token);

    if (userId) {
      console.log(`  User-Account existiert bereits (ID: ${userId}), wird übersprungen.`);
    } else {
      const userCreated = await apiFetch<{ doc?: { id: number } }>(
        "/api/users",
        token,
        {
          method: "POST",
          body: JSON.stringify({
            email: makler.email,
            password: makler.userPassword,
            role: "makler",
            maklerProfile: maklerDocId,
          }),
        }
      );
      userId = userCreated.doc?.id ?? null;
      if (!userId) throw new Error(`User-Account konnte nicht angelegt werden.`);
      console.log(`  User-Account angelegt (ID: ${userId})`);
    }

    // 3) linkedUser am Makler-Profil setzen
    if (maklerDocId && userId) {
      await apiFetch(
        `/api/makler/${maklerDocId}`,
        token,
        {
          method: "PATCH",
          body: JSON.stringify({ linkedUser: userId }),
        }
      );
      console.log(`  linkedUser verkn\u00fcpft (Makler ${maklerDocId} -> User ${userId})`);
    }
  }

  console.log("\nMakler Seed abgeschlossen.\n");
  console.log("Login-Daten der Makler:");
  MAKLER_DATA.forEach((m) => {
    console.log(`  ${m.name}: ${m.email} / ${m.userPassword}`);
  });
}

main().catch((err) => {
  console.error("\nFehler:", err);
  process.exit(1);
});

/**
 * Legal Pages Seed Script
 * ─────────────────────────────────────────────────────────────────────────────
 * Befüllt Payload mit Rechtstexten für alle 4 Legal Globals:
 *   - Datenschutzerklärung (DSGVO)
 *   - AGB (Immobilienmakler, 3,57 % Provision)
 *   - Widerrufsbelehrung (§ 312g BGB)
 *   - Cookie-Richtlinie
 *
 * Voraussetzungen:
 *   1. Payload CMS läuft auf http://localhost:3000
 *   2. Admin-User existiert
 *   3. SEED_EMAIL + SEED_PASSWORD als Env-Vars gesetzt
 *
 * Ausführen:
 *   cd apps/cms
 *   SEED_EMAIL=admin@... SEED_PASSWORD=... npx tsx src/seed/legal-seed.ts
 * ─────────────────────────────────────────────────────────────────────────────
 */

const BASE_URL = process.env.PAYLOAD_BASE_URL ?? "http://localhost:3000";
const SEED_EMAIL = process.env.SEED_EMAIL ?? "";
const SEED_PASSWORD = process.env.SEED_PASSWORD ?? "";

// ─── Auth ─────────────────────────────────────────────────────────────────────

async function login(): Promise<string> {
  if (!SEED_EMAIL || !SEED_PASSWORD) {
    throw new Error(
      "SEED_EMAIL und SEED_PASSWORD müssen als Env-Vars gesetzt sein.\n" +
        "Beispiel: SEED_EMAIL=admin@example.com SEED_PASSWORD=password npx tsx src/seed/legal-seed.ts",
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
  console.log(`✅ Eingeloggt als ${SEED_EMAIL}`);
  return data.token;
}

// ─── Lexical Helpers ──────────────────────────────────────────────────────────

function para(text: string): object {
  return {
    type: "paragraph",
    version: 1,
    direction: "ltr",
    format: "",
    indent: 0,
    children: [
      { type: "text", version: 1, text, format: 0, style: "", mode: "normal", detail: 0 },
    ],
  };
}

function h2(text: string): object {
  return {
    type: "heading",
    version: 1,
    tag: "h2",
    direction: "ltr",
    format: "",
    indent: 0,
    children: [
      { type: "text", version: 1, text, format: 0, style: "", mode: "normal", detail: 0 },
    ],
  };
}

function h3(text: string): object {
  return {
    type: "heading",
    version: 1,
    tag: "h3",
    direction: "ltr",
    format: "",
    indent: 0,
    children: [
      { type: "text", version: 1, text, format: 0, style: "", mode: "normal", detail: 0 },
    ],
  };
}

function boldPara(boldText: string, rest: string): object {
  return {
    type: "paragraph",
    version: 1,
    direction: "ltr",
    format: "",
    indent: 0,
    children: [
      { type: "text", version: 1, text: boldText, format: 1, style: "", mode: "normal", detail: 0 },
      { type: "text", version: 1, text: rest, format: 0, style: "", mode: "normal", detail: 0 },
    ],
  };
}

function ul(items: string[]): object {
  return {
    type: "list",
    version: 1,
    listType: "bullet",
    direction: "ltr",
    format: "",
    indent: 0,
    start: 1,
    tag: "ul",
    children: items.map((item) => ({
      type: "listitem",
      version: 1,
      value: 1,
      checked: undefined,
      direction: "ltr",
      format: "",
      indent: 0,
      children: [
        { type: "text", version: 1, text: item, format: 0, style: "", mode: "normal", detail: 0 },
      ],
    })),
  };
}

function hr(): object {
  return { type: "horizontalrule", version: 1 };
}

function lexical(children: object[]): object {
  return {
    root: {
      type: "root",
      version: 1,
      direction: "ltr",
      format: "",
      indent: 0,
      children,
    },
  };
}

// ─── Content Definitions ──────────────────────────────────────────────────────

const COMPANY = "Immowo Ventures GmbH";
const ADDRESS = "Dossenbergerstra\u00dfe 5, 89312 G\u00fcnzburg";
const EMAIL_PLACEHOLDER = "[E-Mail-Adresse bitte im CMS erg\u00e4nzen]";
const PHONE_PLACEHOLDER = "[Telefonnummer bitte im CMS erg\u00e4nzen]";

const datenschutzContent = lexical([
  h2("1. Verantwortlicher"),
  para(
    `Verantwortlicher f\u00fcr die Datenverarbeitung auf dieser Website ist: ${COMPANY}, ${ADDRESS}. ` +
      `E-Mail: ${EMAIL_PLACEHOLDER}, Telefon: ${PHONE_PLACEHOLDER}.`,
  ),
  h2("2. Erhebung und Verarbeitung personenbezogener Daten"),
  h3("2.1 Beim Besuch der Website"),
  para(
    "Beim Aufrufen unserer Website \u00fcbermittelt Ihr Browser automatisch Daten an unseren Server. " +
      "Dies umfasst insbesondere: IP-Adresse (anonymisiert), Datum und Uhrzeit der Anfrage, " +
      "aufgerufene URL, Referrer-URL, verwendeter Browser und Betriebssystem. " +
      "Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der technischen Bereitstellung).",
  ),
  h3("2.2 Kontaktformular"),
  para(
    "Wenn Sie unser Kontaktformular nutzen, verarbeiten wir die von Ihnen eingegebenen Daten " +
      "(Name, E-Mail-Adresse, Telefon, Nachricht) ausschlie\u00dflich zur Bearbeitung Ihrer Anfrage. " +
      "Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse). " +
      "Wir speichern Ihre Kontaktanfrage f\u00fcr maximal 6 Monate, sofern kein Gesch\u00e4ftsverh\u00e4ltnis zustande kommt.",
  ),
  h3("2.3 Makler-Anfragen / Expos\u00e9s"),
  para(
    "Wenn Sie ein Expos\u00e9 oder Unterlagen anfordern, werden Ihre Kontaktdaten und die angefragte Immobilie " +
      "zur Bearbeitung gespeichert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO. " +
      "Sie k\u00f6nnen der Verarbeitung jederzeit widersprechen.",
  ),
  h2("3. Weitergabe von Daten"),
  para(
    "Eine \u00dcbermittlung Ihrer pers\u00f6nlichen Daten an Dritte findet nur statt, wenn dies f\u00fcr die " +
      "Vertragserf\u00fcllung erforderlich ist (z.B. Notar, Finanzierungsvermittler auf Ihren Wunsch), " +
      "Sie ausdr\u00fccklich eingewilligt haben oder wir gesetzlich dazu verpflichtet sind.",
  ),
  h2("4. Cookies und Tracking"),
  para(
    "Diese Website verwendet technisch notwendige Cookies, die f\u00fcr den Betrieb erforderlich sind " +
      "(z.B. Cookie-Consent-Pr\u00e4ferenz). Zus\u00e4tzliche Cookies (Analyse, Tracking) werden nur nach Ihrer " +
      "ausdr\u00fccklichen Einwilligung gesetzt. Sie k\u00f6nnen Ihre Cookie-Einstellungen jederzeit \u00fcber den " +
      '"Cookie-Einstellungen"-Link im Footer \u00e4ndern.',
  ),
  h2("5. Analyse / Matomo"),
  para(
    "Sofern Sie in die Analyse-Cookies eingewilligt haben, verwenden wir Matomo \u2014 eine datenschutzfreundliche, " +
      "selbst-gehostete Analysesoftware. Matomo anonymisiert Ihre IP-Adresse und setzt keine Drittanbieter-Cookies. " +
      "Die erhobenen Daten verbleiben auf unseren Servern in Deutschland. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO.",
  ),
  h2("6. Ihre Rechte"),
  para("Sie haben folgende Rechte bez\u00fcglich Ihrer pers\u00f6nlichen Daten:"),
  ul([
    "Auskunft \u00fcber die gespeicherten Daten (Art. 15 DSGVO)",
    "Berichtigung unrichtiger Daten (Art. 16 DSGVO)",
    "L\u00f6schung Ihrer Daten (Art. 17 DSGVO)",
    "Einschr\u00e4nkung der Verarbeitung (Art. 18 DSGVO)",
    "Daten\u00fcbertragbarkeit (Art. 20 DSGVO)",
    "Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)",
    "Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO)",
  ]),
  para(
    `Zur Aus\u00fcbung Ihrer Rechte wenden Sie sich an: ${EMAIL_PLACEHOLDER}. ` +
      "Sie haben au\u00dferdem das Recht, sich bei einer Datenschutzaufsichtsbeh\u00f6rde zu beschweren.",
  ),
  h2("7. Speicherdauer"),
  para(
    "Wir speichern pers\u00f6nliche Daten nur so lange, wie es f\u00fcr den jeweiligen Zweck erforderlich ist " +
      "oder gesetzliche Aufbewahrungspflichten bestehen (in der Regel 6\u201310 Jahre f\u00fcr Gesch\u00e4ftsdaten gem\u00e4\u00df HGB/AO).",
  ),
  h2("8. Aktualit\u00e4t dieser Datenschutzerkl\u00e4rung"),
  para(
    "Diese Datenschutzerkl\u00e4rung hat den Stand: 23.02.2026. " +
      "Wir behalten uns vor, diese bei \u00c4nderungen der Rechtslage oder unserer Leistungen anzupassen.",
  ),
]);

const agbContent = lexical([
  para(
    `Diese Allgemeinen Gesch\u00e4ftsbedingungen gelten f\u00fcr alle Leistungen der ${COMPANY} (nachfolgend \u201eMakler\u201c) ` +
      "gegen\u00fcber Interessenten, K\u00e4ufern und Verk\u00e4ufern von Immobilien.",
  ),
  h2("\u00a7 1 Geltungsbereich"),
  para(
    "Diese AGB gelten f\u00fcr alle Maklervertr\u00e4ge, die mit der Immowo Ventures GmbH geschlossen werden. " +
      "Abweichende Bedingungen des Kunden gelten nur, wenn der Makler diesen ausdr\u00fccklich schriftlich zugestimmt hat.",
  ),
  h2("\u00a7 2 Maklert\u00e4tigkeit"),
  para(
    "Der Makler vermittelt Kaufvertr\u00e4ge \u00fcber Grundst\u00fccke, Wohn- und Gewerbeimmobilien sowie Bautr\u00e4gerprojekte. " +
      "Die T\u00e4tigkeit umfasst insbesondere: Nachweis von Kaufgelegenheiten, \u00dcbermittlung von Expos\u00e9s, " +
      "Koordination von Besichtigungen sowie Unterst\u00fctzung bei der Vertragsanbahnung.",
  ),
  h2("\u00a7 3 Provision / Maklerprovision"),
  para(
    "Bei erfolgreicher Vermittlung (Abschluss eines notariellen Kaufvertrags) ist eine Provision f\u00e4llig:",
  ),
  ul([
    "K\u00e4uferprovision: 3,57 % des Kaufpreises inkl. gesetzl. MwSt. (3,00 % zzgl. 19 % MwSt.)",
    "F\u00e4lligkeitszeitpunkt: Mit Abschluss des notariellen Kaufvertrags",
    "Zahlungspflicht: Der K\u00e4ufer ist zur Zahlung verpflichtet, sofern ein Kaufvertrag zustande kommt",
  ]),
  para(
    "Die Provision ist verdient, wenn der Maklernachweis urs\u00e4chlich f\u00fcr den Vertragsabschluss war " +
      "(\u00a7 652 BGB). Eine Doppelt\u00e4tigkeit des Maklers (Provision von Verk\u00e4ufer und K\u00e4ufer) wird dem Kunden " +
      "offengelegt.",
  ),
  boldPara(
    "Textform (§ 656a BGB): ",
    "Alle Vereinbarungen über die Maklerprovision bedürfen der Textform gemäß § 656a BGB. " +
      "Die Zustimmung des Kunden zur Provision erfolgt durch die ausdrückliche Anforderung eines " +
      "Exposés oder die Beauftragung des Maklers in Textform (z.B. per E-Mail oder Kontaktformular).",
  ),
  h2("\u00a7 4 Exposé-Vertraulichkeit"),
  para(
    "Expos\u00e9s, Grundrisse und \u00dcbersichten werden ausschlie\u00dflich zum Zweck der Kaufpr\u00fcfung \u00fcbermittelt. " +
      "Eine Weitergabe an Dritte ohne schriftliche Zustimmung des Maklers ist untersagt.",
  ),
  h2("\u00a7 5 Pflichten des Kunden"),
  para("Der Kunde ist verpflichtet:"),
  ul([
    "Alle entscheidungsrelevanten Informationen wahrheitsgem\u00e4\u00df anzugeben",
    "Den Makler \u00fcber den Abschluss eines Kaufvertrags unverz\u00fcglich zu informieren",
    "Auf direkte Kontaktaufnahme mit dem Verk\u00e4ufer nur \u00fcber den Makler hinzuwirken",
  ]),
  h2("\u00a7 6 Haftung"),
  para(
    "Der Makler haftet nicht f\u00fcr die Richtigkeit der vom Verk\u00e4ufer \u00fcbermittelten Angaben (Fl\u00e4chen, " +
      "Baujahr, Zustand). Der Kunde ist verpflichtet, alle f\u00fcr ihn wesentlichen Informationen selbst " +
      "zu \u00fcberpr\u00fcfen. Die Haftung des Maklers ist auf Vorsatz und grobe Fahrl\u00e4ssigkeit beschr\u00e4nkt.",
  ),
  h2("\u00a7 7 Datenschutz"),
  para(
    "Im Rahmen der Maklerleistung werden personenbezogene Daten gem\u00e4\u00df der DSGVO verarbeitet. " +
      "Details zur Datenverarbeitung finden Sie in unserer Datenschutzerkl\u00e4rung.",
  ),
  h2("\u00a7 8 Schlussbestimmungen"),
  para(
    "Es gilt das Recht der Bundesrepublik Deutschland. Erf\u00fcllungsort und Gerichtsstand ist, soweit " +
      "gesetzlich zul\u00e4ssig, G\u00fcnzburg. Sollten einzelne Bestimmungen dieser AGB unwirksam sein, " +
      "bleibt die Wirksamkeit der \u00fcbrigen Bestimmungen unber\u00fchrt.",
  ),
]);

const widerrufContent = lexical([
  h2("Widerrufsrecht"),
  para(
    "Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gr\u00fcnden diesen Vertrag zu widerrufen.",
  ),
  para(
    "Die Widerrufsfrist betr\u00e4gt vierzehn Tage ab dem Tag des Vertragsschlusses.",
  ),
  para(
    "Um Ihr Widerrufsrecht auszu\u00fcben, m\u00fcssen Sie uns \u2014 " +
      `${COMPANY}, ${ADDRESS}, E-Mail: ${EMAIL_PLACEHOLDER} \u2014 ` +
      "mittels einer eindeutigen Erkl\u00e4rung (z.B. ein mit der Post versandter Brief oder eine E-Mail) " +
      "\u00fcber Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. " +
      "Sie k\u00f6nnen daf\u00fcr das beigef\u00fcgte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.",
  ),
  para(
    "Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung \u00fcber die Aus\u00fcbung des Widerrufsrechts " +
      "vor Ablauf der Widerrufsfrist absenden.",
  ),
  h2("Folgen des Widerrufs"),
  para(
    "Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, " +
      "unverz\u00fcglich und sp\u00e4testens binnen vierzehn Tagen ab dem Tag zur\u00fcckzuzahlen, an dem die Mitteilung " +
      "\u00fcber Ihren Widerruf dieses Vertrags bei uns eingegangen ist. F\u00fcr diese R\u00fcckzahlung verwenden wir dasselbe " +
      "Zahlungsmittel, das Sie bei der urspr\u00fcnglichen Transaktion eingesetzt haben.",
  ),
  h2("Vorzeitiges Erl\u00f6schen des Widerrufsrechts"),
  para(
    "Das Widerrufsrecht erl\u00f6scht bei einem Vertrag zur Erbringung von Dienstleistungen, wenn der Unternehmer die " +
      "Dienstleistung vollst\u00e4ndig erbracht hat und mit der Ausf\u00fchrung der Dienstleistung erst begonnen hat, " +
      "nachdem der Verbraucher dazu seine ausdr\u00fcckliche Zustimmung gegeben hat und gleichzeitig seine Kenntnis " +
      "best\u00e4tigt hat, dass er sein Widerrufsrecht verliert, sobald der Unternehmer den Vertrag vollst\u00e4ndig erf\u00fcllt hat.",
  ),
  hr(),
  h2("Muster-Widerrufsformular"),
  para(
    "(Wenn Sie den Vertrag widerrufen wollen, dann f\u00fcllen Sie bitte dieses Formular aus und senden Sie es zur\u00fcck.)",
  ),
  para(
    `An: ${COMPANY}, ${ADDRESS}, E-Mail: ${EMAIL_PLACEHOLDER}`,
  ),
  para(
    "Hiermit widerrufe(n) ich/wir den von mir/uns abgeschlossenen Vertrag \u00fcber die Erbringung der folgenden " +
      "Dienstleistung:",
  ),
  ul([
    "Bestellt am: __________________",
    "Name des/der Verbraucher(s): __________________",
    "Anschrift des/der Verbraucher(s): __________________",
    "Datum: __________________",
  ]),
]);

const cookiesContent = lexical([
  h2("1. Was sind Cookies?"),
  para(
    "Cookies sind kleine Textdateien, die auf Ihrem Endger\u00e4t gespeichert werden, wenn Sie eine Website besuchen. " +
      "Sie erm\u00f6glichen es Websites, bestimmte Informationen zu speichern und bei einem erneuten Besuch abzurufen.",
  ),
  h2("2. Welche Cookies verwenden wir?"),
  h3("2.1 Technisch notwendige Cookies"),
  para("Diese Cookies sind f\u00fcr den Betrieb der Website unbedingt erforderlich. Ohne sie funktionieren " +
    "grundlegende Funktionen nicht. Sie werden ohne Ihre Einwilligung gesetzt (berechtigtes Interesse, " +
    "Art. 6 Abs. 1 lit. f DSGVO):"),
  ul([
    "cookie_consent \u2014 Speichert Ihre Cookie-Pr\u00e4ferenzen (Laufzeit: 12 Monate)",
  ]),
  h3("2.2 Analyse-Cookies (nur mit Einwilligung)"),
  para(
    "Wenn Sie der Nutzungsanalyse zustimmen, setzen wir Matomo \u2014 eine datenschutzfreundliche, " +
      "selbst-gehostete Analysesoftware. Matomo anonymisiert Ihre IP-Adresse und verwendet keine " +
      "Drittanbieter-Server. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO.",
  ),
  ul([
    "_pk_id \u2014 Enth\u00e4lt anonymisierte Besucher-ID (Laufzeit: 13 Monate)",
    "_pk_ses \u2014 Sitzungs-Cookie f\u00fcr Matomo (Laufzeit: 30 Minuten)",
  ]),
  h2("3. Externe Inhalte"),
  para(
    "Wenn Sie externen Inhalten zustimmen, k\u00f6nnen YouTube-Videos auf den Immobilienseiten abgespielt werden. " +
      "Dabei werden von Google/YouTube Cookies und Daten \u00fcbermittelt. Ohne Ihre Einwilligung bleiben diese " +
      "Inhalte gesperrt.",
  ),
  h2("4. Ihre Einstellungen \u00e4ndern"),
  para(
    "Sie k\u00f6nnen Ihre Cookie-Einstellungen jederzeit \u00fcber den \u201eCookie-Einstellungen\u201c-Link im Footer \u00e4ndern " +
      "oder alle Cookies in Ihrem Browser l\u00f6schen. Bitte beachten Sie, dass das L\u00f6schen von Cookies die " +
      "Funktionsf\u00e4higkeit der Website beeintr\u00e4chtigen kann.",
  ),
  h2("5. Browser-Einstellungen"),
  para(
    "Die meisten Browser erm\u00f6glichen es Ihnen, Cookies zu deaktivieren oder zu l\u00f6schen. Bitte beachten Sie, " +
      "dass bei deaktivierten Cookies einige Funktionen der Website m\u00f6glicherweise nicht verf\u00fcgbar sind.",
  ),
  h2("6. Kontakt"),
  para(
    `Bei Fragen zu unserer Cookie-Nutzung wenden Sie sich an: ${EMAIL_PLACEHOLDER}`,
  ),
]);

// ─── Global Updater ───────────────────────────────────────────────────────────

async function updateGlobal(slug: string, data: object, token: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/globals/${slug}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = (await res.json()) as { message?: string; errors?: unknown };
  if (!res.ok) {
    throw new Error(`Fehler beim Aktualisieren von "${slug}": ${result.message ?? JSON.stringify(result)}`);
  }
  console.log(`  ✅ Global "${slug}" aktualisiert`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log("\n\uD83D\uDCDC Legal Pages Seed gestartet...\n");

  const token = await login();

  console.log("\n\uD83D\uDCDD Rechtliche Inhalte werden in Payload hochgeladen...");

  await updateGlobal("datenschutz", { content: datenschutzContent }, token);
  await updateGlobal("agb", { content: agbContent }, token);
  await updateGlobal("widerruf", { content: widerrufContent }, token);
  await updateGlobal("cookies", { content: cookiesContent }, token);

  console.log(
    "\n\u2728 Fertig! Alle Legal Pages wurden mit Inhalten bef\u00fcllt.\n" +
      "   \u2139\uFE0F Bitte im CMS (Rechtliches > Impressum) noch erg\u00e4nzen:\n" +
      "   \u2022 Telefonnummer\n" +
      "   \u2022 E-Mail-Adresse\n" +
      "   \u2022 Registergericht + HRB-Nummer\n" +
      "   \u2022 USt-IdNr. (falls vorhanden)\n" +
      "   \u2022 \u00a7 34c GewO Erlaubnis-Angaben\n",
  );
}

main().catch((err) => {
  console.error("\n\u274C Seed fehlgeschlagen:", err);
  process.exit(1);
});

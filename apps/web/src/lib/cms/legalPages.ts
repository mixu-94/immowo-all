// src/lib/cms/legalPages.ts
import { cache } from "react";
import { payloadGlobal } from "@/lib/payloud";

export type LexicalContent = Record<string, unknown>;

// Strukturierte Felder fuer Impressum (gemaess § 5 TMG)
export type ImpressumContent = {
  company?: string | null;
  streetAddress?: string | null;
  city?: string | null;
  country?: string | null;
  ceo?: string | null;
  responsible?: string | null;
  phone?: string | null;
  email?: string | null;
  registergericht?: string | null;
  hrb?: string | null;
  ustId?: string | null;
  gewo34cText?: string | null;
  streitbeilegung?: LexicalContent | null;
  lastUpdated?: string | null;
  updatedAt?: string;
};

// Einfacher RichText-Content fuer alle anderen Legal Pages
export type LegalPageContent = {
  content?: LexicalContent | null;
  dpo?: { name?: string | null; email?: string | null; phone?: string | null } | null;
  updatedAt?: string;
};

const slugMap = {
  impressum: "impressum",
  datenschutz: "datenschutz",
  agb: "agb",
  widerruf: "widerruf",
  cookies: "cookies",
} as const;

type LegalSlug = keyof typeof slugMap;

// ─── Static Fallback Content (shown when CMS is unreachable) ──────────────────

const COMPANY = "Immowo Ventures GmbH";
const ADDRESS = "Dossenbergerstra\u00dfe 5, 89312 G\u00fcnzburg";
const EMAIL = "info@immowo-ventures.de";
const SUPERVISORY_AUTHORITY =
  "Bayerisches Landesamt f\u00fcr Datenschutzaufsicht (BayLDA), Promenade 27, 91522 Ansbach, www.lda.bayern.de";

function para(text: string): object {
  return {
    type: "paragraph", version: 1, direction: "ltr", format: "", indent: 0,
    children: [{ type: "text", version: 1, text, format: 0, style: "", mode: "normal", detail: 0 }],
  };
}
function h2(text: string): object {
  return {
    type: "heading", version: 1, tag: "h2", direction: "ltr", format: "", indent: 0,
    children: [{ type: "text", version: 1, text, format: 0, style: "", mode: "normal", detail: 0 }],
  };
}
function boldPara(boldText: string, rest: string): object {
  return {
    type: "paragraph", version: 1, direction: "ltr", format: "", indent: 0,
    children: [
      { type: "text", version: 1, text: boldText, format: 1, style: "", mode: "normal", detail: 0 },
      { type: "text", version: 1, text: rest, format: 0, style: "", mode: "normal", detail: 0 },
    ],
  };
}
function ul(items: string[]): object {
  return {
    type: "list", version: 1, listType: "bullet", direction: "ltr", format: "", indent: 0, start: 1, tag: "ul",
    children: items.map((item) => ({
      type: "listitem", version: 1, value: 1, checked: undefined, direction: "ltr", format: "", indent: 0,
      children: [{ type: "text", version: 1, text: item, format: 0, style: "", mode: "normal", detail: 0 }],
    })),
  };
}
function hr(): object { return { type: "horizontalrule", version: 1 }; }
function lexical(children: object[]): LexicalContent {
  return { root: { type: "root", version: 1, direction: "ltr", format: "", indent: 0, children } };
}

const STATIC_DATENSCHUTZ: LexicalContent = lexical([
  h2("1. Verantwortlicher"),
  para(
    `Verantwortlicher f\u00fcr die Datenverarbeitung auf dieser Website ist: ${COMPANY}, ${ADDRESS}. ` +
      `E-Mail: ${EMAIL}.`,
  ),
  h2("2. Verarbeitungszwecke und Rechtsgrundlagen (Art. 6 DSGVO)"),
  para(
    "Wir verarbeiten personenbezogene Daten nur, soweit eine Rechtsgrundlage nach Art. 6 DSGVO vorliegt: " +
      "Einwilligung (lit. a), Vertragsanbahnung oder -erf\u00fcllung (lit. b), gesetzliche Verpflichtung (lit. c) " +
      "oder berechtigtes Interesse (lit. f). Die konkreten Grundlagen sind den jeweiligen Abschnitten zu entnehmen.",
  ),
  h2("3. Website-Besuch (Server-Logs)"),
  para(
    "Beim Aufrufen unserer Website \u00fcbermittelt Ihr Browser automatisch Daten an unseren Server. " +
      "Dies umfasst: IP-Adresse (wird umgehend anonymisiert), Datum und Uhrzeit der Anfrage, " +
      "aufgerufene URL, Referrer-URL, verwendeter Browser und Betriebssystem. " +
      "Server-Logs werden automatisch nach 14 Tagen gel\u00f6scht. " +
      "Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der technischen Bereitstellung).",
  ),
  h2("4. Kontaktformular"),
  para(
    "Wenn Sie unser Kontaktformular nutzen, verarbeiten wir die von Ihnen eingegebenen Daten " +
      "(Name, E-Mail-Adresse, Telefon, Nachricht) ausschlie\u00dflich zur Bearbeitung Ihrer Anfrage. " +
      "Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung). " +
      "Wir speichern Kontaktanfragen f\u00fcr maximal 6 Monate, sofern kein Gesch\u00e4ftsverh\u00e4ltnis zustande kommt. " +
      "Bei Vertragsschluss gelten die gesetzlichen Aufbewahrungsfristen (bis zu 10 Jahre).",
  ),
  h2("5. Immobilienanfragen und Maklerleistung"),
  para(
    "Wenn Sie ein Expos\u00e9 anfordern oder eine Besichtigung vereinbaren, werden Ihre Kontaktdaten " +
      "sowie die angefragte Immobilie zur Bearbeitung gespeichert. " +
      "Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung). " +
      "Im Rahmen der Maklerleistung k\u00f6nnen Daten an den Eigent\u00fcmer oder Notar weitergegeben werden, " +
      "soweit dies zur Vertragsdurchf\u00fchrung erforderlich ist (Art. 6 Abs. 1 lit. b DSGVO). " +
      "Sie k\u00f6nnen der Verarbeitung jederzeit widersprechen.",
  ),
  h2("6. Matomo-Analytics (nur mit Einwilligung)"),
  para(
    "Sofern Sie in die Nutzungsanalyse eingewilligt haben, verwenden wir Matomo \u2014 eine " +
      "datenschutzfreundliche, selbst-gehostete Open-Source-Analysesoftware. " +
      "Matomo anonymisiert Ihre IP-Adresse (die letzten 2 Bytes werden gel\u00f6scht), setzt keine " +
      "Drittanbieter-Cookies und \u00fcbertr\u00e4gt keine Daten an externe Server. " +
      "Die erhobenen Daten verbleiben ausschlie\u00dflich auf unseren Servern in Deutschland. " +
      "Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO. " +
      "Sie k\u00f6nnen Ihre Einwilligung jederzeit \u00fcber den \u201eCookie-Einstellungen\u201c-Link im Footer widerrufen.",
  ),
  h2("7. Weitergabe an Dritte"),
  para(
    "Eine \u00dcbermittlung Ihrer pers\u00f6nlichen Daten an Dritte findet grunds\u00e4tzlich nicht statt, " +
      "es sei denn, dies ist f\u00fcr die Vertragserf\u00fcllung erforderlich (z.B. Notar, Grundbuchamt, " +
      "Finanzierungsvermittler auf Ihren ausdr\u00fccklichen Wunsch), " +
      "Sie ausdr\u00fccklich eingewilligt haben oder wir gesetzlich dazu verpflichtet sind.",
  ),
  h2("8. Speicherdauer"),
  para(
    "Wir speichern pers\u00f6nliche Daten nur so lange, wie es f\u00fcr den jeweiligen Zweck erforderlich ist. " +
      "Danach werden die Daten gel\u00f6scht oder anonymisiert, sofern keine gesetzlichen " +
      "Aufbewahrungspflichten entgegenstehen. F\u00fcr Gesch\u00e4ftsdaten gelten handels- und steuerrechtliche " +
      "Aufbewahrungsfristen von 6 bis 10 Jahren (HGB, AO).",
  ),
  h2("9. Ihre Rechte als betroffene Person (Art. 15\u201321 DSGVO)"),
  para("Sie haben gegen\u00fcber uns folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:"),
  ul([
    "Auskunft \u00fcber die verarbeiteten Daten (Art. 15 DSGVO)",
    "Berichtigung unrichtiger oder unvollst\u00e4ndiger Daten (Art. 16 DSGVO)",
    "L\u00f6schung Ihrer Daten (\u201eRecht auf Vergessenwerden\u201c, Art. 17 DSGVO)",
    "Einschr\u00e4nkung der Verarbeitung (Art. 18 DSGVO)",
    "Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)",
    "Daten\u00fcbertragbarkeit in einem g\u00e4ngigen Format (Art. 20 DSGVO)",
    "Widerruf einer erteilten Einwilligung mit Wirkung f\u00fcr die Zukunft (Art. 7 Abs. 3 DSGVO)",
  ]),
  para(`Zur Aus\u00fcbung Ihrer Rechte wenden Sie sich bitte an: ${EMAIL}.`),
  h2("10. Beschwerderecht bei der Aufsichtsbeh\u00f6rde"),
  para(
    "Sie haben das Recht, sich bei einer Datenschutzaufsichtsbeh\u00f6rde \u00fcber die Verarbeitung " +
      "Ihrer personenbezogenen Daten durch uns zu beschweren. " +
      "Die zust\u00e4ndige Aufsichtsbeh\u00f6rde f\u00fcr Bayern ist: " +
      SUPERVISORY_AUTHORITY + ".",
  ),
  h2("11. Aktualit\u00e4t dieser Datenschutzerkl\u00e4rung"),
  para(
    "Diese Datenschutzerkl\u00e4rung hat den Stand: 04.03.2026. " +
      "Wir behalten uns vor, diese bei \u00c4nderungen der Rechtslage oder unserer Leistungen anzupassen. " +
      "Die jeweils aktuelle Version ist auf dieser Seite abrufbar.",
  ),
]);

const STATIC_AGB: LexicalContent = lexical([
  para(
    `Diese Allgemeinen Gesch\u00e4ftsbedingungen (AGB) gelten f\u00fcr alle Leistungen der ${COMPANY} ` +
      "(nachfolgend \u201eMakler\u201c) gegen\u00fcber Interessenten, K\u00e4ufern und Verk\u00e4ufern von Immobilien " +
      "in der Bundesrepublik Deutschland.",
  ),
  h2("\u00a7 1 Geltungsbereich"),
  para(
    "Diese AGB gelten f\u00fcr alle Maklervertr\u00e4ge, die mit der Immowo Ventures GmbH geschlossen werden. " +
      "Abweichende Bedingungen des Kunden gelten nur, wenn der Makler diesen ausdr\u00fccklich in Textform zugestimmt hat. " +
      "Ma\u00dfgeblich ist die zum Zeitpunkt des Vertragsschlusses g\u00fcltige Fassung.",
  ),
  h2("\u00a7 2 Maklerleistung (Nachweis und Vermittlung)"),
  para(
    "Der Makler vermittelt Kaufvertr\u00e4ge \u00fcber Grundst\u00fccke, Wohn- und Gewerbeimmobilien sowie " +
      "Bautr\u00e4gerprojekte (Kauf ab Plan, Neubau, Bestand). " +
      "Die T\u00e4tigkeit umfasst insbesondere: Nachweis von Kaufgelegenheiten, \u00dcbermittlung von Expos\u00e9s, " +
      "Koordination von Besichtigungen sowie Unterst\u00fctzung bei der Vertragsanbahnung bis zur notariellen Beurkundung.",
  ),
  h2("\u00a7 3 Zustandekommen des Maklervertrags"),
  para(
    "Der Maklervertrag kommt zustande, wenn der Kunde die Maklerleistung in Textform beauftragt oder " +
      "ein Expos\u00e9 ausdr\u00fccklich anfordert und dabei Kenntnis von der Provisionspflicht hat.",
  ),
  boldPara(
    "Textform (\u00a7 656a BGB): ",
    "Alle Vereinbarungen \u00fcber die Maklerprovision bed\u00fcrfen der Textform gem\u00e4\u00df \u00a7 656a BGB. " +
      "Die ausdr\u00fcckliche Anforderung eines Expos\u00e9s oder die Kontaktaufnahme \u00fcber das Formular gilt als " +
      "Beauftragung in Textform, sofern die Provisionspflicht vorher bekannt gemacht wurde.",
  ),
  h2("\u00a7 4 Maklerprovision"),
  para("Bei erfolgreicher Vermittlung (Abschluss eines notariellen Kaufvertrags) ist eine Provision f\u00e4llig:"),
  ul([
    "K\u00e4uferprovision: 3,57 % des beurkundeten Kaufpreises inkl. gesetzl. MwSt. (3,00 % zzgl. 19 % MwSt.)",
    "F\u00e4lligkeit: Mit notarieller Beurkundung des Kaufvertrags und Nachweis der Kausalit\u00e4t",
    "Zahlungspflicht: Der K\u00e4ufer ist zur Zahlung verpflichtet, sofern der Maklernachweis urs\u00e4chlich war",
  ]),
  para(
    "Die Provision ist verdient, wenn der Maklernachweis urs\u00e4chlich f\u00fcr den Vertragsabschluss war " +
      "(\u00a7 652 BGB). Im Fall der Doppelt\u00e4tigkeit (Provision von Verk\u00e4ufer und K\u00e4ufer) " +
      "wird der Kunde vorab ausdr\u00fccklich informiert (\u00a7 654 BGB).",
  ),
  h2("\u00a7 5 Expos\u00e9-Vertraulichkeit"),
  para(
    "Expos\u00e9s, Grundrisse, Preisangaben und \u00dcbersichten werden ausschlie\u00dflich zum Zweck der " +
      "pers\u00f6nlichen Kaufpr\u00fcfung \u00fcbermittelt. Eine Weitergabe an Dritte ohne schriftliche Zustimmung " +
      "des Maklers ist untersagt und kann Schadensersatzanspr\u00fcche begr\u00fcnden.",
  ),
  h2("\u00a7 6 Pflichten des Kunden"),
  para("Der Kunde ist verpflichtet:"),
  ul([
    "Alle entscheidungsrelevanten Informationen wahrheitsgem\u00e4\u00df anzugeben",
    "Den Makler \u00fcber den Abschluss eines Kaufvertrags unverz\u00fcglich zu informieren",
    "Auf direkte Kontaktaufnahme mit dem Verk\u00e4ufer nur \u00fcber den Makler hinzuwirken",
    "Keine weiteren Makler f\u00fcr dasselbe Objekt ohne vorherige Absprache einzuschalten",
  ]),
  h2("\u00a7 7 Widerrufsrecht bei Fernabsatz"),
  para(
    "Wird der Maklervertrag als Fernabsatzvertrag geschlossen (z.B. ausschlie\u00dflich per E-Mail oder " +
      "Online-Formular ohne pers\u00f6nlichen Kontakt), steht dem Verbraucher ein Widerrufsrecht von " +
      "14 Tagen ab Vertragsschluss zu (\u00a7 312g BGB). " +
      "Das Widerrufsrecht erl\u00f6scht vorzeitig, wenn der Makler die Dienstleistung vollst\u00e4ndig erbracht hat " +
      "und der Verbraucher ausdr\u00fccklich zugestimmt hat, dass mit der Ausf\u00fchrung vor Ablauf der Widerrufsfrist " +
      "begonnen wird. N\u00e4here Informationen entnehmen Sie der Widerrufsbelehrung.",
  ),
  h2("\u00a7 8 Haftung"),
  para(
    "Der Makler haftet nicht f\u00fcr die Richtigkeit der vom Verk\u00e4ufer \u00fcbermittelten Angaben " +
      "(Fl\u00e4chen, Baujahr, Zustand, Bebauungsm\u00f6glichkeiten). Der Kunde ist verpflichtet, " +
      "alle f\u00fcr ihn wesentlichen Informationen selbst oder durch Sachverst\u00e4ndige zu \u00fcberpr\u00fcfen. " +
      "Die Haftung des Maklers ist, soweit gesetzlich zul\u00e4ssig, auf Vorsatz und grobe Fahrl\u00e4ssigkeit beschr\u00e4nkt.",
  ),
  h2("\u00a7 9 Datenschutz"),
  para(
    "Im Rahmen der Maklerleistung werden personenbezogene Daten gem\u00e4\u00df der DSGVO verarbeitet. " +
      "Details zur Art, Umfang und Zweck der Verarbeitung entnehmen Sie bitte unserer Datenschutzerkl\u00e4rung " +
      "auf unserer Website.",
  ),
  h2("\u00a7 10 Schlussbestimmungen"),
  para(
    "Es gilt das Recht der Bundesrepublik Deutschland. Erf\u00fcllungsort und Gerichtsstand ist, " +
      "soweit gesetzlich zul\u00e4ssig, G\u00fcnzburg. " +
      "Sollten einzelne Bestimmungen dieser AGB unwirksam oder undurchf\u00fchrbar sein, " +
      "bleibt die Wirksamkeit der \u00fcbrigen Bestimmungen unber\u00fchrt.",
  ),
]);

const STATIC_WIDERRUF: LexicalContent = lexical([
  h2("Widerrufsrecht"),
  para("Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gr\u00fcnden diesen Vertrag zu widerrufen."),
  para("Die Widerrufsfrist betr\u00e4gt vierzehn Tage ab dem Tag des Vertragsschlusses."),
  para(
    `Um Ihr Widerrufsrecht auszu\u00fcben, m\u00fcssen Sie uns \u2014 ${COMPANY}, ${ADDRESS}, E-Mail: ${EMAIL} \u2014 ` +
      "mittels einer eindeutigen Erkl\u00e4rung (z.B. ein mit der Post versandter Brief oder eine E-Mail) " +
      "\u00fcber Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. " +
      "Sie k\u00f6nnen daf\u00fcr das beigef\u00fcgte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.",
  ),
  para(
    "Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung \u00fcber die Aus\u00fcbung des " +
      "Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.",
  ),
  h2("Folgen des Widerrufs"),
  para(
    "Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, " +
      "unverz\u00fcglich und sp\u00e4testens binnen vierzehn Tagen ab dem Tag zur\u00fcckzuzahlen, " +
      "an dem die Mitteilung \u00fcber Ihren Widerruf bei uns eingegangen ist. " +
      "F\u00fcr diese R\u00fcckzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der urspr\u00fcnglichen " +
      "Transaktion eingesetzt haben, sofern nicht ausdr\u00fccklich etwas anderes vereinbart wurde.",
  ),
  para(
    "Haben Sie verlangt, dass die Erbringung der Dienstleistungen w\u00e4hrend der Widerrufsfrist beginnen soll, " +
      "so haben Sie uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem Zeitpunkt, " +
      "zu dem Sie uns von der Aus\u00fcbung des Widerrufsrechts unterrichten, bereits erbrachten " +
      "Dienstleistungen im Vergleich zum Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.",
  ),
  h2("Vorzeitiges Erl\u00f6schen des Widerrufsrechts"),
  para(
    "Das Widerrufsrecht erl\u00f6scht vorzeitig, wenn der Makler die Dienstleistung (z.B. erfolgreiche " +
      "Vermittlung und Beurkundung des Kaufvertrags) vollst\u00e4ndig erbracht hat und mit der Ausf\u00fchrung erst " +
      "begonnen hat, nachdem der Verbraucher dazu seine ausdr\u00fcckliche Zustimmung gegeben hat und gleichzeitig " +
      "best\u00e4tigt hat, dass er sein Widerrufsrecht mit vollst\u00e4ndiger Vertragserf\u00fcllung durch den Unternehmer verliert.",
  ),
  hr(),
  h2("Muster-Widerrufsformular"),
  para("(Wenn Sie den Vertrag widerrufen wollen, dann f\u00fcllen Sie bitte dieses Formular aus und senden Sie es zur\u00fcck.)"),
  para(`An: ${COMPANY}, ${ADDRESS}`),
  para(`E-Mail: ${EMAIL}`),
  para(
    "Hiermit widerrufe(n) ich/wir den von mir/uns abgeschlossenen Vertrag \u00fcber die Erbringung der " +
      "folgenden Dienstleistung (Maklerleistung):",
  ),
  ul([
    "Beauftragt am / Expos\u00e9 angefordert am: __________________",
    "Name des/der Verbraucher(s): __________________",
    "Anschrift des/der Verbraucher(s): __________________",
    "Datum: __________________",
    "Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier): __________________",
  ]),
]);

const STATIC_COOKIES: LexicalContent = lexical([
  h2("1. Was sind Cookies?"),
  para(
    "Cookies sind kleine Textdateien, die auf Ihrem Endger\u00e4t (Computer, Smartphone, Tablet) " +
      "gespeichert werden, wenn Sie eine Website besuchen. " +
      "Sie erm\u00f6glichen es der Website, bestimmte Informationen zu speichern und bei einem " +
      "erneuten Besuch abzurufen, um die Nutzung zu verbessern.",
  ),
  h2("2. Technisch notwendige Cookies"),
  para(
    "Diese Cookies sind f\u00fcr den Betrieb der Website unbedingt erforderlich. " +
      "Ohne sie funktionieren grundlegende Funktionen (z.B. Navigation, Sicherheit) nicht korrekt. " +
      "Sie werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse) " +
      "ohne Ihre Einwilligung gesetzt:",
  ),
  ul(["cookie_consent \u2014 Speichert Ihre Cookie-Pr\u00e4ferenzen und Einwilligungen (Laufzeit: 12 Monate)"]),
  h2("3. Analyse-Cookies (nur mit Ihrer Einwilligung)"),
  para(
    "Wenn Sie der Nutzungsanalyse zustimmen, setzen wir Matomo \u2014 eine datenschutzfreundliche, " +
      "selbst-gehostete Open-Source-Analysesoftware. " +
      "Matomo erf\u00fcllt die Anforderungen der DSGVO:",
  ),
  ul([
    "IP-Anonymisierung: Die letzten 2 Bytes Ihrer IP-Adresse werden gel\u00f6scht",
    "Kein Drittanbieter: Alle Daten verbleiben auf unseren Servern in Deutschland",
    "Kein Tracking ohne Einwilligung: Matomo wird nur aktiviert, wenn Sie zustimmen",
    "Do Not Track: Die Einstellung Ihres Browsers wird respektiert",
    "_pk_id \u2014 Anonymisierte Besucher-ID (Laufzeit: 13 Monate)",
    "_pk_ses \u2014 Sitzungs-Cookie f\u00fcr Matomo (Laufzeit: 30 Minuten)",
  ]),
  para(
    "Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO. Sie k\u00f6nnen Ihre Einwilligung jederzeit " +
      "widerrufen (siehe Abschnitt 4).",
  ),
  h2("4. Externe Inhalte (YouTube-Videos)"),
  para(
    "Auf einigen Seiten k\u00f6nnen YouTube-Videos eingebettet sein. " +
      "Diese werden erst geladen und abgespielt, wenn Sie in externe Inhalte einwilligen. " +
      "Ohne Ihre Einwilligung werden keine Daten an Google/YouTube \u00fcbertragen. " +
      "Bei Einwilligung gelten die Datenschutzbestimmungen von Google LLC.",
  ),
  h2("5. Ihre Einstellungen \u00e4ndern oder widerrufen"),
  para(
    "Sie k\u00f6nnen Ihre Cookie-Einstellungen jederzeit \u00fcber den \u201eCookie-Einstellungen\u201c-Link " +
      "im Fu\u00dfbereich der Website \u00e4ndern oder Ihre Einwilligung widerrufen. " +
      "Zus\u00e4tzlich k\u00f6nnen Sie in Ihrem Browser alle Cookies l\u00f6schen. " +
      "Bitte beachten Sie, dass das L\u00f6schen von Cookies dazu f\u00fchren kann, " +
      "dass einige Funktionen der Website nicht mehr korrekt funktionieren.",
  ),
  h2("6. Cookies in Ihrem Browser verwalten"),
  para(
    "Die g\u00e4ngigen Browser bieten Einstellungen, mit denen Sie Cookies deaktivieren, " +
      "einschr\u00e4nken oder l\u00f6schen k\u00f6nnen. Eine Anleitung finden Sie in der Hilfe Ihres Browsers. " +
      "Bitte beachten Sie, dass bei deaktivierten Cookies einige Funktionen " +
      "der Website m\u00f6glicherweise nicht verf\u00fcgbar sind.",
  ),
  h2("7. \u00c4nderungen dieser Cookie-Richtlinie"),
  para(
    "Wir behalten uns vor, diese Cookie-Richtlinie anzupassen, wenn sich die Rechtslage oder " +
      "unsere technischen Gegebenheiten \u00e4ndern. Die aktuelle Fassung ist stets auf dieser Seite abrufbar. " +
      "Stand: 04.03.2026.",
  ),
  h2("8. Kontakt"),
  para(`Bei Fragen zu unserer Cookie-Nutzung wenden Sie sich an: ${EMAIL}`),
]);

const STATIC_FALLBACKS: Record<string, LexicalContent> = {
  datenschutz: STATIC_DATENSCHUTZ,
  agb: STATIC_AGB,
  widerruf: STATIC_WIDERRUF,
  cookies: STATIC_COOKIES,
};

// ─── Fetchers ─────────────────────────────────────────────────────────────────

async function fetchLegalPage(slug: LegalSlug): Promise<LegalPageContent> {
  try {
    const data = await payloadGlobal<{
      content?: LexicalContent | null;
      dpo?: { name?: string | null; email?: string | null; phone?: string | null } | null;
      updatedAt?: string;
    }>(
      slugMap[slug],
      { depth: 0 },
      { next: { revalidate: 300, tags: [slug] } },
    );
    return {
      content: data.content ?? STATIC_FALLBACKS[slug] ?? null,
      dpo: data.dpo ?? null,
      updatedAt: data.updatedAt,
    };
  } catch {
    return { content: STATIC_FALLBACKS[slug] ?? null };
  }
}

export const fetchImpressum = cache(async (): Promise<ImpressumContent> => {
  try {
    const data = await payloadGlobal<ImpressumContent>(
      "impressum",
      { depth: 0 },
      { next: { revalidate: 300, tags: ["impressum"] } },
    );
    return data;
  } catch {
    return {};
  }
});

export const fetchDatenschutz = cache(() => fetchLegalPage("datenschutz"));
export const fetchAgb = cache(() => fetchLegalPage("agb"));
export const fetchWiderruf = cache(() => fetchLegalPage("widerruf"));
export const fetchCookies = cache(() => fetchLegalPage("cookies"));

/**
 * Payload CMS Seed Script
 * ─────────────────────────────────────────────────────────────────────────────
 * Befüllt Payload mit allen Dummy-Daten aus dem Web-App-Projekt.
 *
 * Voraussetzungen:
 *   1. Payload CMS läuft auf http://localhost:3000
 *   2. Ein Admin-User existiert (beim ersten Start unter /admin anlegen)
 *   3. Credentials als Env-Vars setzen:
 *        SEED_EMAIL=admin@example.com
 *        SEED_PASSWORD=yourpassword
 *        PAYLOAD_BASE_URL=http://localhost:3000  (optional, default)
 *
 * Ausführen:
 *   cd apps/cms
 *   SEED_EMAIL=... SEED_PASSWORD=... npx tsx src/seed/seed.ts
 *
 * Oder via npm script:
 *   npm run seed
 * ─────────────────────────────────────────────────────────────────────────────
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.PAYLOAD_BASE_URL ?? "http://localhost:3000";
const SEED_EMAIL = process.env.SEED_EMAIL ?? "";
const SEED_PASSWORD = process.env.SEED_PASSWORD ?? "";

// Path to web app's public images folder (relative to this file at apps/cms/src/seed/)
const WEB_IMAGES = path.resolve(
    __dirname,
    "../../../../apps/web/public/assets/images/real-estate",
);

// ─── Auth ─────────────────────────────────────────────────────────────────────

async function login(): Promise<string> {
    if (!SEED_EMAIL || !SEED_PASSWORD) {
        throw new Error(
            "SEED_EMAIL und SEED_PASSWORD müssen als Env-Vars gesetzt sein.\n" +
                "Beispiel: SEED_EMAIL=admin@example.com SEED_PASSWORD=password npx tsx src/seed/seed.ts",
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

// ─── Media Upload ─────────────────────────────────────────────────────────────

type MediaDoc = { id: number | string; url: string; filename: string };

/** Upload eines Bildes oder gibt existierendes zurück (idempotent) */
async function uploadImage(filename: string, token: string): Promise<MediaDoc> {
    // Bereits vorhanden?
    const checkRes = await fetch(
        `${BASE_URL}/api/media?where[filename][equals]=${encodeURIComponent(filename)}&limit=1`,
        { headers: { Authorization: `JWT ${token}` } },
    );
    const checkData = (await checkRes.json()) as { docs?: MediaDoc[] };
    if (checkData.docs && checkData.docs.length > 0) {
        console.log(`  ↩ Media bereits vorhanden: ${filename}`);
        return checkData.docs[0];
    }

    const filePath = path.join(WEB_IMAGES, filename);
    if (!fs.existsSync(filePath)) {
        throw new Error(`Bild nicht gefunden: ${filePath}`);
    }

    const fileBuffer = fs.readFileSync(filePath);
    const ext = path.extname(filename).toLowerCase();
    const mimeType = ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "image/png";

    const altText = path.basename(filename, path.extname(filename)).replace(/-/g, " ");
    const formData = new FormData();
    const blob = new Blob([fileBuffer], { type: mimeType });
    formData.append("file", blob, filename);
    // Payload v3: extra fields must be passed as JSON in _payload
    formData.append("_payload", JSON.stringify({ alt: altText }));

    const res = await fetch(`${BASE_URL}/api/media`, {
        method: "POST",
        headers: { Authorization: `JWT ${token}` },
        body: formData,
    });

    const data = (await res.json()) as { doc?: MediaDoc; errors?: unknown; message?: string };
    if (!res.ok || !data.doc) {
        throw new Error(`Upload fehlgeschlagen für ${filename}: ${JSON.stringify(data)}`);
    }
    console.log(`  ✅ Hochgeladen: ${filename} → ID ${data.doc.id}`);
    return data.doc;
}

/** Lädt alle 11 Bilder hoch und gibt eine Filename→ID Map zurück */
async function uploadAllImages(token: string): Promise<Map<string, number | string>> {
    console.log("\n📸 Lade Bilder hoch...");
    const map = new Map<string, number | string>();
    const files = fs.readdirSync(WEB_IMAGES).filter((f) => /\.(jpg|jpeg|png)$/i.test(f));
    for (const filename of files) {
        const media = await uploadImage(filename, token);
        map.set(filename, media.id);
        // Also index by basename without extension for convenience
        map.set(path.basename(filename, path.extname(filename)), media.id);
    }
    return map;
}

/** Gibt die Media-ID für einen /assets/... Pfad zurück */
function mediaId(
    assetPath: string | undefined,
    mediaMap: Map<string, number | string>,
): number | string | undefined {
    if (!assetPath) return undefined;
    const filename = path.basename(assetPath);
    return mediaMap.get(filename) ?? mediaMap.get(path.basename(filename, path.extname(filename)));
}

// ─── Lexical Richtext Helper ──────────────────────────────────────────────────

function plainTextToLexical(text: string): object {
    return {
        root: {
            type: "root",
            children: [
                {
                    type: "paragraph",
                    children: [{ type: "text", text, version: 1 }],
                    version: 1,
                    direction: "ltr",
                    format: "",
                    indent: 0,
                },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            version: 1,
        },
    };
}

// ─── Create helpers ───────────────────────────────────────────────────────────

async function createDoc(
    collection: string,
    data: Record<string, unknown>,
    token: string,
): Promise<{ id: number | string }> {
    const res = await fetch(`${BASE_URL}/api/${collection}?draft=false`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
        },
        body: JSON.stringify({ ...data, _status: "published" }),
    });
    const json = (await res.json()) as { doc?: { id: number | string }; errors?: unknown; message?: string };
    if (!res.ok || !json.doc) {
        throw new Error(
            `Fehler beim Erstellen in ${collection}: ${JSON.stringify(json).slice(0, 300)}`,
        );
    }
    return json.doc;
}

async function docExists(
    collection: string,
    slug: string,
    token: string,
): Promise<boolean> {
    const res = await fetch(
        `${BASE_URL}/api/${collection}?where[slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=0`,
        { headers: { Authorization: `JWT ${token}` } },
    );
    const data = (await res.json()) as { totalDocs?: number };
    return (data.totalDocs ?? 0) > 0;
}

// ─── Listings Data ────────────────────────────────────────────────────────────

function slugify(input: string): string {
    return input
        .toLowerCase()
        .trim()
        .replace(/[ä]/g, "ae")
        .replace(/[ö]/g, "oe")
        .replace(/[ü]/g, "ue")
        .replace(/[ß]/g, "ss")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
}

function makeSlug(title: string, id: string): string {
    return `${slugify(title)}-${slugify(id)}`;
}

const DEFAULT_COMMISSION = {
    kind: "percent",
    value: 3.57,
    vatIncluded: true,
    vatRate: 19,
    basis: "Kaufpreis",
    due: "F\u00e4llig bei notarieller Beurkundung des Kaufvertrags.",
    note: "Die K\u00e4uferprovision ist vom K\u00e4ufer zu zahlen, sofern ein Kaufvertrag zustande kommt.",
};

const LISTINGS_RAW = [
    {
        id: "re1",
        title: "Moderne Villa mit Seeblick",
        imageSrc: "realestate1.jpg",
        location: "Bayern (Seeräume)",
        badge: "NEU",
        vermarktungsStatus: "verfuegbar" as const,
        price: 3950000,
        availability: "Nach Absprache",
        livingArea: 320, plotArea: 980, rooms: 7, bedrooms: 4, bathrooms: 3, yearBuilt: 2021,
        energy: { class: "A", certificateType: "bedarf" as const, value: 42, carrier: "W\u00e4rmepumpe", year: 2021 },
        description: "Eine moderne Villa mit gro\u00dfz\u00fcgigen Glasfronten, ruhiger Lage und beeindruckendem Blick auf den See. Hochwertige Materialien, klare Linien und ein durchdachtes Raumkonzept schaffen ein exklusives Wohngef\u00fchl.",
        highlights: ["Panoramablick auf den See", "Gro\u00dfz\u00fcgige S\u00fcdterrasse", "Smart-Home Vorbereitung", "Garage + Stellpl\u00e4tze"],
        features: ["Fu\u00dfbodenheizung", "Echtholzparkett", "Designer-K\u00fcche", "Weinklimaschrank", "Einbauschränke", "Smart Home vorbereitet"],
        gallery: ["realestate2.jpg", "realestate3.jpg", "realestate4.jpg", "realestate5.jpg"],
    },
    {
        id: "re2",
        title: "Luxus Penthouse im Gr\u00fcnen",
        imageSrc: "realestate2.jpg",
        location: "Starnberg (Region)",
        badge: "SECRET SALE",
        vermarktungsStatus: "reserviert" as const,
        price: 2450000,
        availability: "Nach Absprache",
        livingArea: 185, rooms: 4, bedrooms: 2, bathrooms: 2, yearBuilt: 2019,
        energy: { class: "B", certificateType: "verbrauch" as const, value: 78, carrier: "Fernw\u00e4rme", year: 2019 },
        description: "Exklusives Penthouse mit weitl\u00e4ufiger Terrasse, hochwertiger Ausstattung und unverbaubarem Gr\u00fcnblick. Ideal als Kapitalanlage oder Eigennutzung.",
        highlights: ["Gro\u00dfe Dachterrasse", "Aufzug bis in die Wohnung", "2 Stellpl\u00e4tze", "Hochwertige Ausstattung"],
        features: ["Klimatisierung", "Fu\u00dfbodenheizung", "Naturstein", "Einbauk\u00fcche", "Smart Home"],
        gallery: ["realestate6.jpg", "realestate7.jpg"],
    },
    {
        id: "re3",
        title: "Baugrundst\u00fcck mit Panorama",
        imageSrc: "realestate3.jpg",
        location: "Allg\u00e4u (Panoramalage)",
        badge: "NEU",
        vermarktungsStatus: "in_bau" as const,
        price: 690000,
        availability: "Kurzfristig",
        plotArea: 1200,
        description: "Attraktives Baugrundst\u00fcck in Panorama-Lage. Ideal f\u00fcr ein Neubauprojekt. Unterlagen, Visuals und Projektkonzept erhalten Sie auf Anfrage.",
        highlights: ["Panoramaaussicht", "Ruhige Lage", "Gute Anbindung", "Projektf\u00e4hig"],
        features: ["Hanglage m\u00f6glich", "Erschlie\u00dfung nach Absprache"],
        gallery: ["realestate4.jpg", "realestate5.jpg"],
    },
    {
        id: "re4",
        title: "Design Haus mit Pool",
        imageSrc: "realestate4.jpg",
        location: "M\u00fcnchen (Umland)",
        vermarktungsStatus: "verfuegbar" as const,
        price: 3190000,
        availability: "Nach Absprache",
        livingArea: 260, plotArea: 780, rooms: 6, bedrooms: 3, bathrooms: 3, yearBuilt: 2020,
        energy: { class: "A+", certificateType: "bedarf" as const, value: 35, carrier: "W\u00e4rmepumpe", year: 2020 },
        description: "Modernes Designhaus mit Pool, klarer Architektur und gro\u00dfz\u00fcgigem Outdoor-Bereich. Hochwertige Materialien und durchdachte Details.",
        highlights: ["Pool", "Gro\u00dfe Fensterfronten", "Offenes Wohnen", "Garten-Design"],
        features: ["Fu\u00dfbodenheizung", "Smart Home", "High-End K\u00fcche", "Alarmanlage"],
        gallery: ["realestate8.jpg", "realestate9.jpg"],
    },
    {
        id: "re5",
        title: "Architektenhaus in Hanglage",
        imageSrc: "realestate5.jpg",
        location: "Bodensee (Region)",
        badge: "NEU",
        vermarktungsStatus: "verfuegbar" as const,
        price: 2790000,
        availability: "Nach Absprache",
        livingArea: 210, plotArea: 640, rooms: 5, bedrooms: 3, bathrooms: 2, yearBuilt: 2018,
        energy: { class: "B", certificateType: "verbrauch" as const, value: 92, carrier: "Gas", year: 2018 },
        description: "Architektenhaus in Hanglage mit viel Licht, Blickachsen und hochwertigem Ausbau. Ideal f\u00fcr anspr\u00fcchsvolle K\u00e4ufer.",
        highlights: ["Hanglage", "Gro\u00dfz\u00fcgige Terrasse", "Designer-Details", "Ruhige Lage"],
        features: ["Kamin", "Einbauk\u00fcche", "Parkett", "G\u00e4ste-WC"],
        gallery: ["realestate10.jpg", "realestate11.jpg"],
    },
    {
        id: "re6",
        title: "Landhaus mit Privatsee",
        imageSrc: "realestate6.jpg",
        location: "Tirol (Seen\u00e4he)",
        vermarktungsStatus: "verfuegbar" as const,
        price: 4990000,
        availability: "Nach Absprache",
        livingArea: 360, plotArea: 4200, rooms: 9, bedrooms: 5, bathrooms: 4, yearBuilt: 2016,
        energy: { class: "C", certificateType: "verbrauch" as const, value: 118, carrier: "Pellet", year: 2016 },
        description: "Exklusives Landhaus mit Privatsee und Parkfl\u00e4che. Diskrete Vermarktung.",
        highlights: ["Privatsee", "Gro\u00dfes Grundst\u00fcck", "Privatsph\u00e4re", "Repr\u00e4sentativ"],
        features: ["Sauna", "Kamin", "Weinkeller", "Garage"],
        gallery: ["realestate1.jpg", "realestate2.jpg"],
    },
    {
        id: "re7",
        title: "Luxus Anwesen mit Park",
        imageSrc: "realestate7.jpg",
        location: "Salzburg (Region)",
        badge: "SECRET SALE",
        vermarktungsStatus: "verfuegbar" as const,
        price: 8900000,
        availability: "Nach Absprache",
        livingArea: 520, plotArea: 8900, rooms: 12, bedrooms: 6, bathrooms: 5, yearBuilt: 2014,
        energy: { class: "B", certificateType: "bedarf" as const, value: 68, carrier: "W\u00e4rmepumpe", year: 2014 },
        description: "Repr\u00e4sentatives Anwesen mit Parkanlage. Diskrete Vermarktung \u2013 Details und Unterlagen auf Anfrage.",
        highlights: ["Parkanlage", "Separate G\u00e4steeinheit", "Hohe Privatsph\u00e4re", "Luxusausstattung"],
        features: ["Pool", "Sauna", "Fitness", "Klimatisierung"],
        gallery: ["realestate8.jpg", "realestate9.jpg"],
    },
    {
        id: "re8",
        title: "Modernes Chalet in Alpenlage",
        imageSrc: "realestate8.jpg",
        location: "Zugspitze (Region)",
        vermarktungsStatus: "verfuegbar" as const,
        price: 3150000,
        availability: "Sofort",
        livingArea: 240, plotArea: 550, rooms: 6, bedrooms: 4, bathrooms: 3, yearBuilt: 2022,
        energy: { class: "A", certificateType: "bedarf" as const, value: 45, carrier: "W\u00e4rmepumpe", year: 2022 },
        description: "Modernes Chalet in traumhafter Alpenlage \u2013 hochwertiger Innenausbau, klare Linien, viel Holz und Licht.",
        highlights: ["Alpenlage", "Gro\u00dfe Fenster", "Sauna m\u00f6glich", "Garage"],
        features: ["Fu\u00dfbodenheizung", "Naturholz", "Kamin", "Einbauk\u00fcche"],
        gallery: ["realestate10.jpg", "realestate11.jpg"],
    },
    {
        id: "re9",
        title: "Villa mit Infinity Pool",
        imageSrc: "realestate9.jpg",
        location: "Gardasee (Region)",
        badge: "VERKAUFT",
        vermarktungsStatus: "verkauft" as const,
        price: 0,
        availability: "Verkauft",
        livingArea: 300, plotArea: 900, rooms: 7, bedrooms: 4, bathrooms: 3, yearBuilt: 2020,
        energy: { class: "B", certificateType: "bedarf" as const, value: 72, carrier: "W\u00e4rmepumpe", year: 2020 },
        description: "Referenz: Villa mit Infinity Pool und Seeblick \u2013 bereits verkauft.",
        highlights: ["Infinity Pool", "Seeblick", "High-End Ausstattung", "Referenz"],
        features: ["Pool", "Klimatisierung", "Smart Home"],
        gallery: ["realestate1.jpg", "realestate2.jpg"],
    },
    {
        id: "re10",
        title: "Waldresidenz mit Privatsph\u00e4re",
        imageSrc: "realestate10.jpg",
        location: "Schwarzwald (Region)",
        vermarktungsStatus: "verfuegbar" as const,
        price: 1890000,
        availability: "Nach Absprache",
        livingArea: 210, plotArea: 3200, rooms: 6, bedrooms: 4, bathrooms: 2, yearBuilt: 2012,
        energy: { class: "D", certificateType: "verbrauch" as const, value: 145, carrier: "\u00d6l", year: 2012 },
        description: "R\u00fcckzugsort mit viel Privatsph\u00e4re \u2013 diskrete Lage, gro\u00dfz\u00fcgiges Grundst\u00fcck, hochwertige Modernisierung.",
        highlights: ["Privatsph\u00e4re", "Gro\u00dfes Grundst\u00fcck", "Modernisiert", "Ruhige Lage"],
        features: ["Kamin", "Garage", "Gartenanlage"],
        gallery: ["realestate3.jpg", "realestate4.jpg"],
    },
    {
        id: "re11",
        title: "Seegrundst\u00fcck mit Steg",
        imageSrc: "realestate11.jpg",
        location: "Chiemsee (Region)",
        vermarktungsStatus: "verfuegbar" as const,
        price: 1250000,
        availability: "Nach Absprache",
        plotArea: 1400,
        description: "Seegrundst\u00fcck mit Steg \u2013 diskrete Vermarktung. Projektoptionen und Unterlagen auf Anfrage.",
        highlights: ["Seezugang", "Steg", "Projektoption", "Diskret"],
        features: ["Bebauung nach Absprache"],
        gallery: ["realestate5.jpg", "realestate6.jpg"],
    },
] as const;

// ─── References Data ──────────────────────────────────────────────────────────

const REFERENCES_RAW = [
    {
        id: "ref-efh-neubau-01",
        title: "Neubau Einfamilienhaus \u2013 Modernes Wohnen",
        subtitle: "Schl\u00fcsselfertig \u2022 energieeffizient \u2022 familienfreundlich",
        category: "Neubau",
        year: "2025",
        location: { region: "Schwaben", label: "Landkreis G\u00fcnzburg (Region)" },
        description: "Von der Planung bis zur Schl\u00fcsselübergabe: modernes EFH mit offener Raumaufteilung, klaren Linien und hochwertiger Ausstattung. Fokus lag auf effizienter Bauzeit, sauberer Dokumentation und hoher Ausf\u00fchrungsqualit\u00e4t.",
        highlights: ["Schl\u00fcsselfertig", "Fu\u00dfbodenheizung", "Gro\u00dfe Fensterfl\u00e4chen", "Hochwertige Ausstattung", "Diskrete Vermarktung", "Qualit\u00e4tssicherung"],
        facts: { livingArea: "165 m\u00b2", plotArea: "520 m\u00b2", rooms: "5 Zimmer", buildTime: "11 Monate", status: "fertiggestellt" },
        kpis: [
            { label: "Bauzeit", value: "11 Monate" },
            { label: "Wohnfl\u00e4che", value: "165 m\u00b2" },
            { label: "Status", value: "Fertiggestellt" },
            { label: "Ausstattung", value: "Premium" },
        ],
        coverImage: "realestate1.jpg",
        gallery: [
            { src: "realestate2.jpg", alt: "Au\u00dfenansicht" },
            { src: "realestate3.jpg", alt: "Wohnbereich" },
            { src: "realestate4.jpg", alt: "K\u00fcche / Details" },
            { src: "realestate5.jpg", alt: "Terrasse / Garten" },
        ],
        services: ["Projektentwicklung", "Bautr\u00e4ger", "Finishing", "Fotografie"],
        timeline: [
            { title: "Konzept & Planung", text: "Grundrissoptimierung, Budgetrahmen, Materialkonzept und Auswahl der Ausstattungslinie." },
            { title: "Bauphase", text: "Koordination der Gewerke, Qualit\u00e4tssicherung \u00fcber Checkpoints, Terminsteuerung und laufende Abstimmungen." },
            { title: "\u00dcbergabe", text: "Abnahme, Dokumentation, \u00dcbergabe der Unterlagen und Schl\u00fcsselübergabe." },
        ],
        caseStudy: {
            challenge: "Ziel war ein modernes, alltagstaugliches EFH \u2013 mit planbarer Bauzeit, hoher Ausf\u00fchrungsqualit\u00e4t und klarer Dokumentation f\u00fcr K\u00e4ufer.",
            approach: "Grundriss/Ausstattung wurden iterativ optimiert. In der Umsetzung standen Koordination, Qualit\u00e4tscheckpoints und transparente Kommunikation im Vordergrund.",
            result: "Schl\u00fcsselfertige \u00dcbergabe im geplanten Zeitrahmen. Hochwertige Ausf\u00fchrung und nachvollziehbare Unterlagen f\u00fcr Betrieb und Wartung.",
        },
        sections: [
            { heading: "Ausgangslage", content: "Das Projekt wurde mit dem Anspruch gestartet, modernes Wohnen mit hoher Alltagstauglichkeit zu verbinden. Besonderer Fokus lag auf Licht, Raumgef\u00fchl, Stauraum und einer langlebigen Ausstattung." },
            { heading: "Planung & Qualit\u00e4tssicherung", content: "Die Planung wurde entlang der Nutzung optimiert. In der Umsetzung wurden Checkpoints zur Qualit\u00e4tssicherung etabliert." },
            { heading: "Ergebnis & \u00dcbergabe", content: "Die \u00dcbergabe erfolgte mit strukturierter Dokumentation. Dadurch erhalten K\u00e4ufer eine klare Basis f\u00fcr Betrieb, Wartung und sp\u00e4tere Erweiterungen." },
        ],
        testimonial: {
            quote: "Sehr strukturierter Ablauf und klare Kommunikation. Besonders die dokumentierte \u00dcbergabe hat \u00fcberzeugt.",
            author: "K\u00e4ufer (anonymisiert)",
            role: "Privatkunde",
        },
        isFeatured: true,
        sortOrder: 10,
    },
    {
        id: "ref-mfh-verkauf-02",
        title: "Mehrfamilienhaus \u2013 Verkauf & Vermarktung",
        subtitle: "Kapitalanlage \u2022 klare Unterlagen \u2022 sauberer Prozess",
        category: "Verkauf",
        year: "2024",
        location: { region: "Schwaben", label: "Augsburg (Region)" },
        description: "Strukturierte Vermarktung mit vollst\u00e4ndigem Unterlagenpaket, professioneller Pr\u00e4sentation und sauberer Interessentenqualifizierung. Ziel war eine planbare Abwicklung mit hoher Qualit\u00e4t der Anfragen.",
        highlights: ["Unterlagenpaket", "K\u00e4uferqualifizierung", "Besichtigungsmanagement", "Diskret", "Schnelle Abwicklung"],
        facts: { units: "6 WE", livingArea: "520 m\u00b2", status: "verkauft" },
        kpis: [
            { label: "Einheiten", value: "6 WE" },
            { label: "Status", value: "Verkauft" },
            { label: "Fokus", value: "Vermarktung" },
            { label: "Unterlagen", value: "strukturiert" },
        ],
        coverImage: "realestate5.jpg",
        gallery: [
            { src: "realestate6.jpg", alt: "Au\u00dfenansicht" },
            { src: "realestate7.jpg", alt: "Details" },
        ],
        services: ["Vermarktung", "Fotografie", "Branding"],
        timeline: [
            { title: "Aufbereitung", text: "Unterlagen strukturiert, Expos\u00e9 erstellt, Bildmaterial abgestimmt, Daten konsolidiert." },
            { title: "Vermarktung", text: "Anfragen, Vorqualifizierung, klarer Ablauf f\u00fcr Besichtigungen & Feedback." },
            { title: "Abschluss", text: "Kommunikation bis Abschluss begleitet, Dokumentation und \u00dcbergabe der Unterlagen abgestimmt." },
        ],
        caseStudy: {
            challenge: "Ziel war eine diskrete, effiziente Vermarktung \u2013 mit klaren Unterlagen und qualifizierten Interessenten, ohne unn\u00f6tige Besichtigungstermine.",
            approach: "Unterlagenpaket standardisiert, Pr\u00e4sentation optimiert und einen klaren Prozess etabliert.",
            result: "Planbarer Ablauf mit hoher Anfragequalit\u00e4t und sauberer Kommunikation bis zum Abschluss.",
        },
        sections: [
            { heading: "Unterlagen & Struktur", content: "Ein vollst\u00e4ndiges Unterlagenpaket reduziert R\u00fcckfragen und erh\u00f6ht die Entscheidungssicherheit." },
            { heading: "Interessentenprozess", content: "Die Qualit\u00e4t der Anfragen wurde durch Vorqualifizierung und transparente Kommunikation gesteuert." },
        ],
        isFeatured: true,
        sortOrder: 9,
    },
    {
        id: "ref-projektentwicklung-03",
        title: "Projektentwicklung \u2013 Neubauprojekt (Kauf ab Plan)",
        subtitle: "Konzept \u2022 Planung \u2022 Umsetzung \u2022 \u00dcbergabe",
        category: "Projektentwicklung",
        year: "2025",
        location: { region: "Bayern", label: "Schwaben (Bayern)" },
        description: "Projektentwicklung ab Grundst\u00fccksbewertung: Konzept, Planung und Umsetzung koordiniert. Fokus auf wirtschaftliche Grundrisse, klare Kostensteuerung und terminsichere Umsetzung.",
        highlights: ["Kauf ab Plan", "Grundrissoptimierung", "Kostenrahmen", "Terminsicherheit", "Qualit\u00e4tssicherung"],
        facts: { units: "3 Einheiten", buildTime: "14 Monate", status: "fertiggestellt" },
        kpis: [
            { label: "Einheiten", value: "3" },
            { label: "Bauzeit", value: "14 Monate" },
            { label: "Modell", value: "Kauf ab Plan" },
            { label: "Status", value: "Fertiggestellt" },
        ],
        coverImage: "realestate8.jpg",
        gallery: [
            { src: "realestate9.jpg", alt: "Visualisierung" },
            { src: "realestate10.jpg", alt: "Baufortschritt" },
            { src: "realestate11.jpg", alt: "Fertigstellung" },
        ],
        services: ["Projektentwicklung", "Bautr\u00e4ger", "Vermarktung"],
        timeline: [
            { title: "Machbarkeit", text: "Bewertung, Potenzialanalyse, Konzept und Zielgruppe." },
            { title: "Planung", text: "Layouts, Kostenrahmen, Terminplan und Abstimmungen." },
            { title: "Umsetzung", text: "Koordination, Qualit\u00e4tssicherung, Abnahme, \u00dcbergabe." },
        ],
        caseStudy: {
            challenge: "Projektentwicklung mit Fokus auf wirtschaftliche Grundrisse, Kostenrahmen und terminsichere Umsetzung.",
            approach: "Machbarkeit gepr\u00fcft, Konzept/Layouts definiert, Kosten- und Terminplanung erstellt.",
            result: "Fertigstellung mit transparentem Ablauf. Strukturierte Unterlagenbasis f\u00fcr Vermarktung und \u00dcbergabe.",
        },
        sections: [
            { heading: "Machbarkeit & Konzept", content: "Zu Beginn stand die Potenzialanalyse: Layout-Varianten, Zielgruppe, Wirtschaftlichkeit und Risiken." },
            { heading: "Planung bis Umsetzung", content: "Kostenrahmen und Terminplan wurden entlang der Planung konkretisiert." },
        ],
        isFeatured: false,
        sortOrder: 8,
    },
    {
        id: "ref-sanierung-04",
        title: "Sanierung Bestand \u2013 Modernisierung & Wertsteigerung",
        subtitle: "Technik \u2022 Oberfl\u00e4che \u2022 Wohnkomfort \u2022 Pr\u00e4sentation",
        category: "Sanierung",
        year: "2024",
        location: { region: "Schwaben", label: "Neu-Ulm (Region)" },
        description: "Bestandsimmobilie modernisiert: Technik und Oberfl\u00e4chen erneuert, Raumwirkung verbessert und Wohnkomfort gesteigert. Ergebnis: bessere Marktpositionierung und hochwertige Pr\u00e4sentation.",
        highlights: ["Modernisierung", "Innenausbau", "B\u00e4der", "Neuer Look & Feel", "Aufbereitung zur Vermarktung"],
        facts: { livingArea: "120 m\u00b2", rooms: "4 Zimmer", status: "fertiggestellt", buildTime: "10 Wochen" },
        kpis: [
            { label: "Dauer", value: "10 Wochen" },
            { label: "Wohnfl\u00e4che", value: "120 m\u00b2" },
            { label: "Status", value: "Fertiggestellt" },
            { label: "Fokus", value: "Wertsteigerung" },
        ],
        coverImage: "realestate4.jpg",
        gallery: [
            { src: "realestate3.jpg", alt: "Nachher \u2013 Wohnbereich" },
            { src: "realestate2.jpg", alt: "Nachher \u2013 Details" },
        ],
        services: ["Sanierung", "Innenausbau", "Fotografie"],
        timeline: [
            { title: "Analyse", text: "Zustand, Ma\u00dfnahmenpaket, Budget und Zeitplan." },
            { title: "Umsetzung", text: "Technik, Oberfl\u00e4chen, Innenausbau, Abnahme." },
            { title: "Pr\u00e4sentation", text: "Hochwertige Darstellung zur Vermarktung." },
        ],
        caseStudy: {
            challenge: "Bestand sollte modernisiert und marktf\u00e4hig positioniert werden \u2013 mit Fokus auf Wohnkomfort und saubere Ausf\u00fchrung innerhalb kurzer Zeit.",
            approach: "Ma\u00dfnahmenpaket definiert, Umsetzung strukturiert koordiniert und die Pr\u00e4sentation aufgewertet.",
            result: "Modernes, stimmiges Gesamtbild mit deutlich verbessertem Wohngef\u00fchl und starker Darstellung f\u00fcr die Vermarktung.",
        },
        sections: [
            { heading: "Ma\u00dfnahmenpaket", content: "Technik und Oberfl\u00e4chen wurden gezielt erneuert, um Wartbarkeit und Komfort zu steigern." },
            { heading: "Pr\u00e4sentation", content: "Nach Abschluss wurde die Immobilie professionell pr\u00e4sentiert \u2013 mit Fokus auf Licht, Raumgef\u00fchl und Details." },
        ],
        isFeatured: false,
        sortOrder: 7,
    },
] as const;

// ─── Seed Listings ────────────────────────────────────────────────────────────

async function seedListings(
    token: string,
    mediaMap: Map<string, number | string>,
): Promise<void> {
    console.log("\n🏠 Seede Immobilien...");

    for (const listing of LISTINGS_RAW) {
        const slug = makeSlug(listing.title, listing.id);

        if (await docExists("immobilien", slug, token)) {
            console.log(`  ↩ Bereits vorhanden: ${listing.title}`);
            continue;
        }

        const heroId = mediaId(listing.imageSrc, mediaMap);
        const galleryItems = "gallery" in listing && listing.gallery
            ? listing.gallery
                .map((f) => {
                    const id = mediaId(f, mediaMap);
                    return id ? { item: id } : null;
                })
                .filter(Boolean)
            : [];

        const doc: Record<string, unknown> = {
            title: listing.title,
            slug,
            vermarktungsStatus: listing.vermarktungsStatus,
            location: listing.location,
            price: "price" in listing ? listing.price : undefined,
            availability: "availability" in listing ? listing.availability : undefined,
            badge: "badge" in listing ? listing.badge : undefined,
            livingArea: "livingArea" in listing ? listing.livingArea : undefined,
            plotArea: "plotArea" in listing ? listing.plotArea : undefined,
            rooms: "rooms" in listing ? (listing.rooms !== 0 ? listing.rooms : undefined) : undefined,
            bedrooms: "bedrooms" in listing ? (listing.bedrooms !== 0 ? listing.bedrooms : undefined) : undefined,
            bathrooms: "bathrooms" in listing ? (listing.bathrooms !== 0 ? listing.bathrooms : undefined) : undefined,
            yearBuilt: "yearBuilt" in listing ? (listing.yearBuilt !== 0 ? listing.yearBuilt : undefined) : undefined,
            heroMedia: heroId ?? undefined,
            gallery: galleryItems,
            description: plainTextToLexical(listing.description),
            highlights: listing.highlights.map((text) => ({ text })),
            features: listing.features.map((text) => ({ text })),
            buyerCommission: DEFAULT_COMMISSION,
        };

        if ("energy" in listing && listing.energy) {
            doc.energy = listing.energy;
        }

        const created = await createDoc("immobilien", doc, token);
        console.log(`  ✅ Erstellt: ${listing.title} (ID ${created.id})`);
    }
}

// ─── Seed References ──────────────────────────────────────────────────────────

async function seedReferences(
    token: string,
    mediaMap: Map<string, number | string>,
): Promise<void> {
    console.log("\n📋 Seede Referenzen...");

    for (const ref of REFERENCES_RAW) {
        const slug = makeSlug(ref.title, ref.id);

        if (await docExists("referenzen", slug, token)) {
            console.log(`  ↩ Bereits vorhanden: ${ref.title}`);
            continue;
        }

        const coverId = mediaId(ref.coverImage, mediaMap);
        const galleryItems = ref.gallery
            .map((g) => {
                const id = mediaId(g.src, mediaMap);
                return id ? { item: id, alt: g.alt } : null;
            })
            .filter(Boolean);

        const doc: Record<string, unknown> = {
            title: ref.title,
            slug,
            subtitle: ref.subtitle,
            category: ref.category,
            year: ref.year,
            isFeatured: ref.isFeatured,
            sortOrder: ref.sortOrder,
            location: ref.location,
            description: ref.description,
            highlights: ref.highlights.map((text) => ({ text })),
            facts: ref.facts,
            kpis: ref.kpis,
            coverImage: coverId ?? undefined,
            gallery: galleryItems,
            services: ref.services,
            timeline: ref.timeline,
            caseStudy: ref.caseStudy,
            sections: ref.sections,
        };

        if ("testimonial" in ref && ref.testimonial) {
            doc.testimonial = ref.testimonial;
        }

        const created = await createDoc("referenzen", doc, token);
        console.log(`  ✅ Erstellt: ${ref.title} (ID ${created.id})`);
    }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
    console.log("🚀 Payload Seed Script gestartet");
    console.log(`   CMS URL: ${BASE_URL}`);
    console.log(`   Bilder:  ${WEB_IMAGES}\n`);

    if (!fs.existsSync(WEB_IMAGES)) {
        throw new Error(
            `Bilder-Ordner nicht gefunden: ${WEB_IMAGES}\n` +
                "Stelle sicher, dass das Skript aus dem apps/cms Verzeichnis gestartet wird.",
        );
    }

    const token = await login();
    const mediaMap = await uploadAllImages(token);
    await seedListings(token, mediaMap);
    await seedReferences(token, mediaMap);

    console.log("\n🎉 Seed abgeschlossen! Alle Daten sind in Payload gespeichert.");
    console.log(`   Admin Panel: ${BASE_URL}/admin`);
    console.log(`   Web App:     http://localhost:3001`);
}

main().catch((err) => {
    console.error("\n❌ Seed fehlgeschlagen:", err.message ?? err);
    process.exit(1);
});

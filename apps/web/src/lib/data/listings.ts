// src/lib/data/listings.ts
import type { CategoryRow, Listing, EstateDetails } from "@/lib/types/listings";
import { payloadFind } from "@/lib/payloud";

const ESTATE_BASE_PATH = "/objekte";

/**
 * ----------------------------------------------------------------------------
 * ROUTING HELPERS
 * ----------------------------------------------------------------------------
 * - slug/href werden zentral abgeleitet => keine leeren href/slug mehr
 * - wichtig für: /objekte/[slug] + Sharing + Gate keys + SEO
 * ----------------------------------------------------------------------------
 */
function slugify(input: string) {
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

export function makeListingSlug(title: string, id: string) {
    return `${slugify(title)}-${slugify(id)}`;
}

/**
 * ----------------------------------------------------------------------------
 * DEFAULT COMMISSION (can be overridden per listing)
 * ----------------------------------------------------------------------------
 * - bewusst zentral, damit du später easy pro Objekt ändern kannst
 * - wenn Provision geändert wird, kann Gate-Hash ggf. neu greifen (wenn du Hash nutzt)
 * ----------------------------------------------------------------------------
 */
const DEFAULT_BUYER_COMMISSION = {
    kind: "percent" as const,
    value: 3.57,
    vatIncluded: true,
    vatRate: 19,
    basis: "Kaufpreis",
    due: "Fällig bei notarieller Beurkundung des Kaufvertrags.",
    note: "Die Käuferprovision ist vom Käufer zu zahlen, sofern ein Kaufvertrag zustande kommt.",
};

/**
 * ----------------------------------------------------------------------------
 * LOCAL TYPES (payload-ready)
 * ----------------------------------------------------------------------------
 * Hinweis: Diese Datei ist Mock-Data. Der Typ darf ruhig "mehr" können
 * als das aktuelle UI nutzt.
 */
type ListingVariant = "ready" | "build" | "investment";
type ListingStatus = "verfügbar" | "reserviert" | "verkauft" | "in_bau";

/**
 * ListingFull = dein Listing + Detailfelder, die auf Objektseiten gebraucht werden.
 * (Später in Payload: entspricht einem "Listing" Document)
 */
type ListingFull = Listing &
    EstateDetails & {
        // filters/UX
        variant: ListingVariant;
        status: ListingStatus;

        // region/label (no exact address)
        region: string;
        locationLabel: string;

        // categorization
        categoryIds: string[];

        // optional docs
        pdfUrl?: string;
        floorplanUrl?: string;
        energyCertificateUrl?: string;

        // legacy GEG fields (falls UI noch darauf basiert)
        energyCertificateType?: "bedarf" | "verbrauch";
        energyValue?: number;
        energyCarrier?: string;
        energyYear?: number;
    };

/**
 * ----------------------------------------------------------------------------
 * CENTRAL ESTATE DATA
 * ----------------------------------------------------------------------------
 * - Legacy Felder bleiben drin (price/livingArea/energyClass/gallery...)
 * - Zusätzlich füllen wir pricing/facts/energy/media für neue Komponenten
 * ----------------------------------------------------------------------------
 */
const estates: ListingFull[] = [
    {
        id: "re1",
        title: "Moderne Villa mit Seeblick",
        imageSrc: "/assets/images/real-estate/realestate1.jpg",
        location: "Bayern",
        badge: "NEU",

        variant: "ready",
        status: "verfügbar",
        region: "Bayern",
        locationLabel: "Bayern (Seenähe)",
        categoryIds: ["new", "most"],

        // legacy pricing
        price: 3950000,
        currency: "EUR",
        availability: "Nach Absprache",
        commissionText: "3,57% inkl. MwSt. Käuferprovision",

        // new pricing
        pricing: {
            price: 3950000,
            currency: "EUR",
            availability: "Nach Absprache",
            buyerCommission: DEFAULT_BUYER_COMMISSION,
            commissionText: "3,57% inkl. MwSt. Käuferprovision",
        },

        // legacy facts
        geo: { lat: 48.2439, lng: 10.3626 }, // Dummy
        livingArea: 320,
        plotArea: 980,
        rooms: 7,
        bedrooms: 4,
        bathrooms: 3,
        yearBuilt: 2021,

        // new facts
        facts: {
            livingArea: 320,
            plotArea: 980,
            rooms: 7,
            bedrooms: 4,
            bathrooms: 3,
            yearBuilt: 2021,
        },

        // legacy energy
        energyClass: "A",
        heatingType: "Wärmepumpe",
        energyCertificateType: "bedarf",
        energyValue: 42,
        energyCarrier: "Wärmepumpe",
        energyYear: 2021,

        // new energy
        energy: {
            class: "A",
            heatingType: "Wärmepumpe",
            certificateType: "bedarf",
            value: 42,
            carrier: "Wärmepumpe",
            year: 2021,
        },

        // docs
        pdfUrl: "/assets/pdfs/expose-demo.pdf",
        floorplanUrl: "/assets/pdfs/floorplan-demo.pdf",

        description:
            "Eine moderne Villa mit großzügigen Glasfronten, ruhiger Lage und beeindruckendem Blick auf den See. Hochwertige Materialien, klare Linien und ein durchdachtes Raumkonzept schaffen ein exklusives Wohngefühl.",
        highlights: ["Panoramablick auf den See", "Großzügige Südterrasse", "Smart-Home Vorbereitung", "Garage + Stellplätze"],
        features: ["Fußbodenheizung", "Echtholzparkett", "Designer-Küche", "Weinklimaschrank", "Einbauschränke", "Smart Home vorbereitet"],

        // legacy media
        gallery: [
            "/assets/images/real-estate/realestate2.jpg",
            "/assets/images/real-estate/realestate3.jpg",
            "/assets/images/real-estate/realestate4.jpg",
            "/assets/images/real-estate/realestate5.jpg",
        ],

        // new media
        media: {
            galleryUrls: [
                "/assets/images/real-estate/realestate2.jpg",
                "/assets/images/real-estate/realestate3.jpg",
                "/assets/images/real-estate/realestate4.jpg",
                "/assets/images/real-estate/realestate5.jpg",
            ],
        },
    },

    {
        id: "re2",
        title: "Luxus Penthouse im Grünen",
        imageSrc: "/assets/images/real-estate/realestate2.jpg",
        location: "Starnberg",
        badge: "SECRET SALE",

        variant: "investment",
        status: "reserviert",
        region: "Oberbayern",
        locationLabel: "Starnberg (Region)",
        categoryIds: ["new", "most"],

        // legacy pricing
        price: 2450000,
        currency: "EUR",
        availability: "Nach Absprache",
        commissionText: "3,57% inkl. MwSt. Käuferprovision",

        // new pricing
        pricing: {
            price: 2450000,
            currency: "EUR",
            availability: "Nach Absprache",
            buyerCommission: DEFAULT_BUYER_COMMISSION,
            commissionText: "3,57% inkl. MwSt. Käuferprovision",
        },

        // legacy facts
        geo: { lat: 48.2439, lng: 10.3626 }, // Dummy
        livingArea: 185,
        rooms: 4,
        bedrooms: 2,
        bathrooms: 2,
        yearBuilt: 2019,

        // new facts
        facts: {
            livingArea: 185,
            rooms: 4,
            bedrooms: 2,
            bathrooms: 2,
            yearBuilt: 2019,
        },

        // legacy energy
        energyClass: "B",
        heatingType: "Fernwärme",
        energyCertificateType: "verbrauch",
        energyValue: 78,
        energyCarrier: "Fernwärme",
        energyYear: 2019,

        // new energy
        energy: {
            class: "B",
            heatingType: "Fernwärme",
            certificateType: "verbrauch",
            value: 78,
            carrier: "Fernwärme",
            year: 2019,
        },

        description:
            "Exklusives Penthouse mit weitläufiger Terrasse, hochwertiger Ausstattung und unverbaubarem Grünblick. Ideal als Kapitalanlage oder Eigennutzung.",
        highlights: ["Große Dachterrasse", "Aufzug bis in die Wohnung", "2 Stellplätze", "Hochwertige Ausstattung"],
        features: ["Klimatisierung", "Fußbodenheizung", "Naturstein", "Einbauküche", "Smart Home"],

        // legacy media
        gallery: ["/assets/images/real-estate/realestate6.jpg", "/assets/images/real-estate/realestate7.jpg"],

        // new media
        media: {
            galleryUrls: ["/assets/images/real-estate/realestate6.jpg", "/assets/images/real-estate/realestate7.jpg"],
        },
    },

    {
        id: "re3",
        title: "Baugrundstück mit Panorama",
        imageSrc: "/assets/images/real-estate/realestate3.jpg",
        location: "Allgäu",
        badge: "NEU",

        variant: "build",
        status: "in_bau",
        region: "Allgäu",
        locationLabel: "Allgäu (Panoramalage)",
        categoryIds: ["new"],

        // legacy pricing
        price: 690000,
        currency: "EUR",
        availability: "Kurzfristig",
        commissionText: "3,57% inkl. MwSt. Käuferprovision",

        // new pricing
        pricing: {
            price: 690000,
            currency: "EUR",
            availability: "Kurzfristig",
            buyerCommission: DEFAULT_BUYER_COMMISSION,
            commissionText: "3,57% inkl. MwSt. Käuferprovision",
        },

        // legacy facts
        plotArea: 1200,
        rooms: 0,
        bedrooms: 0,
        bathrooms: 0,
        yearBuilt: 0,

        // new facts
        facts: {
            plotArea: 1200,
            rooms: 0,
            bedrooms: 0,
            bathrooms: 0,
            yearBuilt: 0,
        },

        // energy not available for land yet -> leave empty

        description:
            "Attraktives Baugrundstück in Panorama-Lage. Ideal für ein Neubauprojekt vom Papier weg. Unterlagen, Visuals und Projektkonzept erhalten Sie auf Anfrage.",
        highlights: ["Panoramaaussicht", "Ruhige Lage", "Gute Anbindung", "Projektfähig"],
        features: ["Hanglage möglich", "Erschließung nach Absprache"],

        // legacy media
        gallery: ["/assets/images/real-estate/realestate4.jpg", "/assets/images/real-estate/realestate5.jpg"],

        // new media
        media: {
            galleryUrls: ["/assets/images/real-estate/realestate4.jpg", "/assets/images/real-estate/realestate5.jpg"],
        },
    },

    {
        id: "re4",
        title: "Design Haus mit Pool",
        imageSrc: "/assets/images/real-estate/realestate4.jpg",
        location: "München Umland",

        variant: "ready",
        status: "verfügbar",
        region: "Oberbayern",
        locationLabel: "München (Umland)",
        categoryIds: ["new"],

        // legacy pricing (optional, for existing UI)
        price: 3190000,
        currency: "EUR",
        availability: "Nach Absprache",
        commissionText: "3,57% inkl. MwSt.",

        // new pricing
        pricing: {
            price: 3190000,
            currency: "EUR",
            availability: "Nach Absprache",
            buyerCommission: DEFAULT_BUYER_COMMISSION,
            commissionText: "3,57% inkl. MwSt.",
        },

        // legacy facts (optional)
        livingArea: 260,
        plotArea: 780,
        rooms: 6,
        bedrooms: 3,
        bathrooms: 3,
        yearBuilt: 2020,

        // new facts
        facts: {
            livingArea: 260,
            plotArea: 780,
            rooms: 6,
            bedrooms: 3,
            bathrooms: 3,
            yearBuilt: 2020,
        },

        // legacy energy
        energyClass: "A+",
        heatingType: "Wärmepumpe",
        energyCertificateType: "bedarf",
        energyValue: 35,
        energyCarrier: "Wärmepumpe",
        energyYear: 2020,

        // new energy
        energy: {
            class: "A+",
            heatingType: "Wärmepumpe",
            certificateType: "bedarf",
            value: 35,
            carrier: "Wärmepumpe",
            year: 2020,
        },

        description:
            "Modernes Designhaus mit Pool, klarer Architektur und großzügigem Outdoor-Bereich. Hochwertige Materialien und durchdachte Details.",
        highlights: ["Pool", "Große Fensterfronten", "Offenes Wohnen", "Garten-Design"],
        features: ["Fußbodenheizung", "Smart Home", "High-End Küche", "Alarmanlage"],

        // legacy media
        gallery: ["/assets/images/real-estate/realestate8.jpg", "/assets/images/real-estate/realestate9.jpg"],

        // new media
        media: {
            galleryUrls: ["/assets/images/real-estate/realestate8.jpg", "/assets/images/real-estate/realestate9.jpg"],
        },
    },

    {
        id: "re5",
        title: "Architektenhaus in Hanglage",
        imageSrc: "/assets/images/real-estate/realestate5.jpg",
        location: "Bodensee",
        badge: "NEU",

        variant: "ready",
        status: "verfügbar",
        region: "Bodensee",
        locationLabel: "Bodensee (Region)",
        categoryIds: ["new"],

        // legacy pricing
        price: 2790000,
        currency: "EUR",
        availability: "Nach Absprache",
        commissionText: "3,57% inkl. MwSt.",

        // new pricing
        pricing: {
            price: 2790000,
            currency: "EUR",
            availability: "Nach Absprache",
            buyerCommission: DEFAULT_BUYER_COMMISSION,
            commissionText: "3,57% inkl. MwSt.",
        },

        // legacy facts
        livingArea: 210,
        plotArea: 640,
        rooms: 5,
        bedrooms: 3,
        bathrooms: 2,
        yearBuilt: 2018,

        // new facts
        facts: {
            livingArea: 210,
            plotArea: 640,
            rooms: 5,
            bedrooms: 3,
            bathrooms: 2,
            yearBuilt: 2018,
        },

        // legacy energy
        energyClass: "B",
        heatingType: "Gas",
        energyCertificateType: "verbrauch",
        energyValue: 92,
        energyCarrier: "Gas",
        energyYear: 2018,

        // new energy
        energy: {
            class: "B",
            heatingType: "Gas",
            certificateType: "verbrauch",
            value: 92,
            carrier: "Gas",
            year: 2018,
        },

        description:
            "Architektenhaus in Hanglage mit viel Licht, Blickachsen und hochwertigem Ausbau. Ideal für anspruchsvolle Käufer.",
        highlights: ["Hanglage", "Großzügige Terrasse", "Designer-Details", "Ruhige Lage"],
        features: ["Kamin", "Einbauküche", "Parkett", "Gäste-WC"],

        // legacy media
        gallery: ["/assets/images/real-estate/realestate10.jpg", "/assets/images/real-estate/realestate11.jpg"],

        // new media
        media: {
            galleryUrls: ["/assets/images/real-estate/realestate10.jpg", "/assets/images/real-estate/realestate11.jpg"],
        },
    },

    {
        id: "re6",
        title: "Landhaus mit Privatsee",
        imageSrc: "/assets/images/real-estate/realestate6.jpg",
        location: "Tirol",

        variant: "investment",
        status: "verfügbar",
        region: "Tirol",
        locationLabel: "Tirol (Seenähe)",
        categoryIds: ["most"],

        // legacy pricing
        price: 4990000,
        currency: "EUR",
        availability: "Nach Absprache",
        commissionText: "3,57% inkl. MwSt. Käuferprovision",

        // new pricing
        pricing: {
            price: 4990000,
            currency: "EUR",
            availability: "Nach Absprache",
            buyerCommission: DEFAULT_BUYER_COMMISSION,
            commissionText: "3,57% inkl. MwSt. Käuferprovision",
        },

        // legacy facts
        livingArea: 360,
        plotArea: 4200,
        rooms: 9,
        bedrooms: 5,
        bathrooms: 4,
        yearBuilt: 2016,

        // new facts
        facts: {
            livingArea: 360,
            plotArea: 4200,
            rooms: 9,
            bedrooms: 5,
            bathrooms: 4,
            yearBuilt: 2016,
        },

        // legacy energy
        energyClass: "C",
        heatingType: "Pellet",
        energyCertificateType: "verbrauch",
        energyValue: 118,
        energyCarrier: "Pellet",
        energyYear: 2016,

        // new energy
        energy: {
            class: "C",
            heatingType: "Pellet",
            certificateType: "verbrauch",
            value: 118,
            carrier: "Pellet",
            year: 2016,
        },

        description: "Exklusives Landhaus mit Privatsee und Parkfläche. Diskrete Vermarktung.",
        highlights: ["Privatsee", "Großes Grundstück", "Privatsphäre", "Repräsentativ"],
        features: ["Sauna", "Kamin", "Weinkeller", "Garage"],

        // legacy media
        gallery: ["/assets/images/real-estate/realestate1.jpg", "/assets/images/real-estate/realestate2.jpg"],

        // new media
        media: {
            galleryUrls: ["/assets/images/real-estate/realestate1.jpg", "/assets/images/real-estate/realestate2.jpg"],
        },
    },

    {
        id: "re7",
        title: "Luxus Anwesen mit Park",
        imageSrc: "/assets/images/real-estate/realestate7.jpg",
        location: "Salzburg",
        badge: "SECRET SALE",

        variant: "investment",
        status: "verfügbar",
        region: "Salzburg",
        locationLabel: "Salzburg (Region)",
        categoryIds: ["most"],

        // legacy pricing
        price: 8900000,
        currency: "EUR",
        availability: "Nach Absprache",
        commissionText: "3,57% inkl. MwSt. Käuferprovision",

        // new pricing
        pricing: {
            price: 8900000,
            currency: "EUR",
            availability: "Nach Absprache",
            buyerCommission: DEFAULT_BUYER_COMMISSION,
            commissionText: "3,57% inkl. MwSt. Käuferprovision",
        },

        // legacy facts
        livingArea: 520,
        plotArea: 8900,
        rooms: 12,
        bedrooms: 6,
        bathrooms: 5,
        yearBuilt: 2014,

        // new facts
        facts: {
            livingArea: 520,
            plotArea: 8900,
            rooms: 12,
            bedrooms: 6,
            bathrooms: 5,
            yearBuilt: 2014,
        },

        // legacy energy
        energyClass: "B",
        heatingType: "Wärmepumpe",
        energyCertificateType: "bedarf",
        energyValue: 68,
        energyCarrier: "Wärmepumpe",
        energyYear: 2014,

        // new energy
        energy: {
            class: "B",
            heatingType: "Wärmepumpe",
            certificateType: "bedarf",
            value: 68,
            carrier: "Wärmepumpe",
            year: 2014,
        },

        description:
            "Repräsentatives Anwesen mit Parkanlage. Diskrete Vermarktung – Details und Unterlagen auf Anfrage.",
        highlights: ["Parkanlage", "Separate Gästeeinheit", "Hohe Privatsphäre", "Luxusausstattung"],
        features: ["Pool", "Sauna", "Fitness", "Klimatisierung"],

        // legacy media
        gallery: ["/assets/images/real-estate/realestate8.jpg", "/assets/images/real-estate/realestate9.jpg"],

        // new media
        media: {
            galleryUrls: ["/assets/images/real-estate/realestate8.jpg", "/assets/images/real-estate/realestate9.jpg"],
        },
    },

    {
        id: "re8",
        title: "Modernes Chalet in Alpenlage",
        imageSrc: "/assets/images/real-estate/realestate8.jpg",
        location: "Zugspitze Region",

        variant: "ready",
        status: "verfügbar",
        region: "Alpen",
        locationLabel: "Zugspitze (Region)",
        categoryIds: ["most"],

        // legacy pricing
        price: 3150000,
        currency: "EUR",
        availability: "Sofort",
        commissionText: "3,57% inkl. MwSt.",

        // new pricing
        pricing: {
            price: 3150000,
            currency: "EUR",
            availability: "Sofort",
            buyerCommission: DEFAULT_BUYER_COMMISSION,
            commissionText: "3,57% inkl. MwSt.",
        },

        // legacy facts
        livingArea: 240,
        plotArea: 550,
        rooms: 6,
        bedrooms: 4,
        bathrooms: 3,
        yearBuilt: 2022,

        // new facts
        facts: {
            livingArea: 240,
            plotArea: 550,
            rooms: 6,
            bedrooms: 4,
            bathrooms: 3,
            yearBuilt: 2022,
        },

        // legacy energy
        energyClass: "A",
        heatingType: "Wärmepumpe",
        energyCertificateType: "bedarf",
        energyValue: 45,
        energyCarrier: "Wärmepumpe",
        energyYear: 2022,

        // new energy
        energy: {
            class: "A",
            heatingType: "Wärmepumpe",
            certificateType: "bedarf",
            value: 45,
            carrier: "Wärmepumpe",
            year: 2022,
        },

        description:
            "Modernes Chalet in traumhafter Alpenlage – hochwertiger Innenausbau, klare Linien, viel Holz und Licht.",
        highlights: ["Alpenlage", "Große Fenster", "Sauna möglich", "Garage"],
        features: ["Fußbodenheizung", "Naturholz", "Kamin", "Einbauküche"],

        // legacy media
        gallery: ["/assets/images/real-estate/realestate10.jpg", "/assets/images/real-estate/realestate11.jpg"],

        // new media
        media: {
            galleryUrls: ["/assets/images/real-estate/realestate10.jpg", "/assets/images/real-estate/realestate11.jpg"],
        },
    },

    {
        id: "re9",
        title: "Villa mit Infinity Pool",
        imageSrc: "/assets/images/real-estate/realestate9.jpg",
        location: "Gardasee",
        badge: "VERKAUFT",

        variant: "ready",
        status: "verkauft",
        region: "Italien",
        locationLabel: "Gardasee (Region)",
        categoryIds: ["most"],

        // legacy pricing
        price: 0,
        currency: "EUR",
        availability: "Verkauft",
        commissionText: "3,57% inkl. MwSt.",

        // new pricing
        pricing: {
            price: 0,
            currency: "EUR",
            availability: "Verkauft",
            buyerCommission: DEFAULT_BUYER_COMMISSION,
            commissionText: "3,57% inkl. MwSt.",
        },

        // legacy facts
        livingArea: 300,
        plotArea: 900,
        rooms: 7,
        bedrooms: 4,
        bathrooms: 3,
        yearBuilt: 2020,

        // new facts
        facts: {
            livingArea: 300,
            plotArea: 900,
            rooms: 7,
            bedrooms: 4,
            bathrooms: 3,
            yearBuilt: 2020,
        },

        // legacy energy
        energyClass: "B",
        heatingType: "Wärmepumpe",
        energyCertificateType: "bedarf",
        energyValue: 72,
        energyCarrier: "Wärmepumpe",
        energyYear: 2020,

        // new energy
        energy: {
            class: "B",
            heatingType: "Wärmepumpe",
            certificateType: "bedarf",
            value: 72,
            carrier: "Wärmepumpe",
            year: 2020,
        },

        description: "Referenz: Villa mit Infinity Pool und Seeblick – bereits verkauft.",
        highlights: ["Infinity Pool", "Seeblick", "High-End Ausstattung", "Referenz"],
        features: ["Pool", "Klimatisierung", "Smart Home"],

        // legacy media
        gallery: ["/assets/images/real-estate/realestate1.jpg", "/assets/images/real-estate/realestate2.jpg"],

        // new media
        media: {
            galleryUrls: ["/assets/images/real-estate/realestate1.jpg", "/assets/images/real-estate/realestate2.jpg"],
        },
    },

    {
        id: "re10",
        title: "Waldresidenz mit Privatsphäre",
        imageSrc: "/assets/images/real-estate/realestate10.jpg",
        location: "Schwarzwald",

        variant: "investment",
        status: "verfügbar",
        region: "Schwarzwald",
        locationLabel: "Schwarzwald (Region)",
        categoryIds: ["most"],

        // legacy pricing
        price: 1890000,
        currency: "EUR",
        availability: "Nach Absprache",
        commissionText: "3,57% inkl. MwSt.",

        // new pricing
        pricing: {
            price: 1890000,
            currency: "EUR",
            availability: "Nach Absprache",
            buyerCommission: DEFAULT_BUYER_COMMISSION,
            commissionText: "3,57% inkl. MwSt.",
        },

        // legacy facts
        livingArea: 210,
        plotArea: 3200,
        rooms: 6,
        bedrooms: 4,
        bathrooms: 2,
        yearBuilt: 2012,

        // new facts
        facts: {
            livingArea: 210,
            plotArea: 3200,
            rooms: 6,
            bedrooms: 4,
            bathrooms: 2,
            yearBuilt: 2012,
        },

        // legacy energy
        energyClass: "D",
        heatingType: "Öl",
        energyCertificateType: "verbrauch",
        energyValue: 145,
        energyCarrier: "Öl",
        energyYear: 2012,

        // new energy
        energy: {
            class: "D",
            heatingType: "Öl",
            certificateType: "verbrauch",
            value: 145,
            carrier: "Öl",
            year: 2012,
        },

        description:
            "Rückzugsort mit viel Privatsphäre – diskrete Lage, großzügiges Grundstück, hochwertige Modernisierung.",
        highlights: ["Privatsphäre", "Großes Grundstück", "Modernisiert", "Ruhige Lage"],
        features: ["Kamin", "Garage", "Gartenanlage"],

        // legacy media
        gallery: ["/assets/images/real-estate/realestate3.jpg", "/assets/images/real-estate/realestate4.jpg"],

        // new media
        media: {
            galleryUrls: ["/assets/images/real-estate/realestate3.jpg", "/assets/images/real-estate/realestate4.jpg"],
        },
    },

    {
        id: "re11",
        title: "Seegrundstück mit Steg",
        imageSrc: "/assets/images/real-estate/realestate11.jpg",
        location: "Chiemsee",

        variant: "build",
        status: "verfügbar",
        region: "Chiemsee",
        locationLabel: "Chiemsee (Region)",
        categoryIds: ["most"],

        // legacy pricing
        price: 1250000,
        currency: "EUR",
        availability: "Nach Absprache",
        commissionText: "3,57% inkl. MwSt. Käuferprovision",

        // new pricing
        pricing: {
            price: 1250000,
            currency: "EUR",
            availability: "Nach Absprache",
            buyerCommission: DEFAULT_BUYER_COMMISSION,
            commissionText: "3,57% inkl. MwSt. Käuferprovision",
        },

        // legacy facts
        plotArea: 1400,
        rooms: 0,
        bedrooms: 0,
        bathrooms: 0,
        yearBuilt: 0,

        // new facts
        facts: {
            plotArea: 1400,
            rooms: 0,
            bedrooms: 0,
            bathrooms: 0,
            yearBuilt: 0,
        },

        description:
            "Seegrundstück mit Steg – diskrete Vermarktung. Projektoptionen und Unterlagen auf Anfrage.",
        highlights: ["Seezugang", "Steg", "Projektoption", "Diskret"],
        features: ["Bebauung nach Absprache"],

        // legacy media
        gallery: ["/assets/images/real-estate/realestate5.jpg", "/assets/images/real-estate/realestate6.jpg"],

        // new media
        media: {
            galleryUrls: ["/assets/images/real-estate/realestate5.jpg", "/assets/images/real-estate/realestate6.jpg"],
        },
    },
];

/**
 * ----------------------------------------------------------------------------
 * ROUTING ENRICHMENT
 * ----------------------------------------------------------------------------
 * Adds slug + href once, based on title + id.
 */
function enrichRouting(items: ListingFull[]): ListingFull[] {
    return items.map((item) => {
        const slug = makeListingSlug(item.title, item.id);
        return {
            ...item,
            slug,
            href: `${ESTATE_BASE_PATH}/${slug}`,
        };
    });
}

const estatesWithRouting = enrichRouting(estates);

/**
 * ----------------------------------------------------------------------------
 * CATEGORIES (derived)
 * ----------------------------------------------------------------------------
 * Best practice: Keep categories lightweight, derive rows from listing.categoryIds
 */
const categories: Array<{ id: string; title: string; href: string }> = [
    { id: "new", title: "NEU", href: "/neu" },
    { id: "most", title: "MEISTGESEHEN", href: "/meistgesehen" },
];

function buildCategoryRows(items: ListingFull[]): CategoryRow[] {
    return categories.map((cat) => {
        const catItems = items.filter((i) => i.categoryIds.includes(cat.id));
        return {
            id: cat.id,
            title: cat.title,
            href: cat.href,
            items: catItems as any, // ListingFull enthält eh alles
        };
    });
}


export const categoryRows: CategoryRow[] = buildCategoryRows(estatesWithRouting);

/**
 * ----------------------------------------------------------------------------
 * PAYLOAD FETCH LAYER
 * ----------------------------------------------------------------------------
 * Versucht Daten aus Payload zu laden. Bei Fehler → statischer Fallback.
 */
const PAYLOAD_BASE_URL = process.env.PAYLOAD_BASE_URL ?? "";

function resolveMediaUrl(url?: string): string | undefined {
    if (!url) return undefined;
    return url.startsWith("http") ? url : `${PAYLOAD_BASE_URL}${url}`;
}

/** Extrahiert Plaintext aus Payload Lexical-JSON */
function lexicalToPlainText(json: unknown): string {
    if (!json || typeof json !== "object") return "";
    const node = json as Record<string, unknown>;
    if (typeof node.text === "string") return node.text;
    if (Array.isArray(node.children)) {
        return (node.children as unknown[])
            .map(lexicalToPlainText)
            .join(" ")
            .replace(/\s+/g, " ")
            .trim();
    }
    if (node.root) return lexicalToPlainText(node.root);
    return "";
}

type PayloadVermarktungsStatus = "verfuegbar" | "reserviert" | "verkauft" | "in_bau";

function mapVermarktungsStatus(s?: PayloadVermarktungsStatus): ListingStatus {
    if (s === "verfuegbar") return "verfügbar";
    if (s === "in_bau") return "in_bau";
    return (s ?? "verfügbar") as ListingStatus;
}

type PayloadMedia = { url?: string; alt?: string; filename?: string } | null;

type PayloadImmobilie = {
    id: number | string;
    title: string;
    slug: string;
    vermarktungsStatus?: PayloadVermarktungsStatus;
    location?: string;
    price?: number;
    livingArea?: number;
    plotArea?: number;
    rooms?: number;
    bedrooms?: number;
    bathrooms?: number;
    yearBuilt?: number;
    availability?: string;
    badge?: string;
    heroMedia?: PayloadMedia;
    gallery?: { item?: PayloadMedia }[];
    documents?: { exposePdf?: PayloadMedia };
    description?: unknown;
    highlights?: { text: string }[];
    features?: { text: string }[];
    energy?: {
        certificateType?: "bedarf" | "verbrauch";
        value?: number;
        class?: string;
        carrier?: string;
        year?: number;
    };
    buyerCommission?: {
        kind?: "percent" | "fixed";
        value?: number;
        vatIncluded?: boolean;
        vatRate?: number;
        due?: string;
        basis?: string;
        note?: string;
    };
    seo?: { metaTitle?: string; metaDescription?: string; ogImage?: PayloadMedia };
};

function mapPayloadToEstateDetails(p: PayloadImmobilie): EstateDetails {
    const slug = p.slug;
    const status = mapVermarktungsStatus(p.vermarktungsStatus);
    const heroUrl = resolveMediaUrl(p.heroMedia?.url);

    return {
        id: String(p.id),
        title: p.title,
        slug,
        href: `/objekte/${slug}`,
        subtitle: undefined,
        badge: p.badge,
        imageSrc: heroUrl,
        location: p.location,
        classification: {
            status,
            badge: p.badge,
        },
        locationInfo: p.location ? { label: p.location } : undefined,
        pricing: {
            price: p.price ?? null,
            currency: "EUR",
            availability: p.availability,
            buyerCommission: p.buyerCommission?.kind
                ? {
                      kind: p.buyerCommission.kind,
                      value: p.buyerCommission.value ?? 0,
                      vatIncluded: p.buyerCommission.vatIncluded,
                      vatRate: p.buyerCommission.vatRate,
                      due: p.buyerCommission.due,
                      basis: p.buyerCommission.basis,
                      note: p.buyerCommission.note,
                  }
                : undefined,
        },
        facts: {
            livingArea: p.livingArea,
            plotArea: p.plotArea,
            rooms: p.rooms,
            bedrooms: p.bedrooms,
            bathrooms: p.bathrooms,
            yearBuilt: p.yearBuilt,
        },
        energy: p.energy
            ? {
                  certificateType: p.energy.certificateType,
                  value: p.energy.value,
                  class: p.energy.class as any,
                  carrier: p.energy.carrier,
                  year: p.energy.year,
              }
            : undefined,
        documents: p.documents?.exposePdf
            ? { exposePdfUrl: resolveMediaUrl(p.documents.exposePdf.url) }
            : undefined,
        media: {
            gallery: p.gallery
                ?.filter((g) => g.item?.url)
                .map((g) => ({
                    type: "image" as const,
                    src: resolveMediaUrl(g.item!.url)!,
                    alt: g.item!.alt,
                })),
        },
        description: lexicalToPlainText(p.description),
        highlights: p.highlights?.map((h) => h.text),
        features: p.features?.map((f) => f.text),
        seo: p.seo
            ? {
                  title: p.seo.metaTitle,
                  description: p.seo.metaDescription,
                  ogImage: resolveMediaUrl(p.seo.ogImage?.url),
              }
            : undefined,
    };
}

async function fetchListingsFromPayload(): Promise<EstateDetails[] | null> {
    try {
        const res = await payloadFind<PayloadImmobilie>(
            "immobilien",
            {
                where: { _status: { equals: "published" } },
                limit: 100,
                depth: 2,
            },
            { next: { revalidate: 300, tags: ["immobilien"] } },
        );
        return res.docs.map(mapPayloadToEstateDetails);
    } catch (err) {
        console.warn("[listings] Payload nicht erreichbar, nutze Fallback.", err);
        return null;
    }
}

async function fetchListingBySlugFromPayload(slug: string): Promise<EstateDetails | null> {
    try {
        const res = await payloadFind<PayloadImmobilie>(
            "immobilien",
            {
                where: {
                    and: [
                        { slug: { equals: slug } },
                        { _status: { equals: "published" } },
                    ],
                },
                limit: 1,
                depth: 2,
            },
            { next: { revalidate: 300, tags: [`immobilien-${slug}`] } },
        );
        return res.docs[0] ? mapPayloadToEstateDetails(res.docs[0]) : null;
    } catch (err) {
        console.warn(`[listings] Payload nicht erreichbar für slug "${slug}", nutze Fallback.`, err);
        return null;
    }
}

/**
 * ----------------------------------------------------------------------------
 * PUBLIC API
 * ----------------------------------------------------------------------------
 * Versucht Payload → fällt auf statische Daten zurück, wenn Payload offline.
 */
export async function getCategoryRows(): Promise<CategoryRow[]> {
    const listings = await fetchListingsFromPayload();
    if (!listings) return categoryRows;

    // Baue eine einzige Kategorie-Zeile mit allen verfügbaren Listings
    if (listings.length === 0) return categoryRows;
    return [
        {
            id: "alle",
            title: "AKTUELLE ANGEBOTE",
            href: "/immobilien",
            items: listings,
        },
    ];
}

export async function getListings(): Promise<EstateDetails[]> {
    const listings = await fetchListingsFromPayload();
    return listings ?? (estatesWithRouting as unknown as EstateDetails[]);
}

export async function getEstateBySlug(slug: string): Promise<EstateDetails | null> {
    const fromPayload = await fetchListingBySlugFromPayload(slug);
    if (fromPayload !== null) return fromPayload;
    // Fallback: statische Daten
    return (estatesWithRouting.find((x) => x.slug === slug) as unknown as EstateDetails) ?? null;
}

export async function getAllListingSlugs(): Promise<string[]> {
    try {
        const res = await payloadFind<{ slug: string }>(
            "immobilien",
            {
                where: { _status: { equals: "published" } },
                limit: 200,
                depth: 0,
            },
            { next: { revalidate: 300, tags: ["immobilien"] } },
        );
        if (res.docs.length > 0) return res.docs.map((d) => d.slug).filter(Boolean);
    } catch {
        // Fallback
    }
    return estatesWithRouting.map((l: any) => l.slug ?? l.id).filter(Boolean);
}

export async function getListingBySlug(slug: string): Promise<EstateDetails | null> {
    return getEstateBySlug(slug);
}


// // src/lib/data/listings.ts
// import type { CategoryRow, Listing, EstateDetails } from "@/lib/types/listings";

// const ESTATE_BASE_PATH = "/objekte";

// /**
//  * ----------------------------------------------------------------------------
//  * BEST PRACTICE SETUP (Payload-ready)
//  * ----------------------------------------------------------------------------
//  * ✅ Single Source of Truth: `estates`
//  * ✅ Categories are DERIVED from estates (no duplicate item data)
//  * ✅ Details can still be enriched per listing (already part of each object)
//  *
//  * Later with Payload:
//  * - estates[] becomes a fetch from Payload collection `listings`
//  * - categories could be a field on each listing: `categoryIds`
//  * - or a separate collection `listingCategories`
//  * ----------------------------------------------------------------------------
//  */

// function slugify(input: string) {
//     return input
//         .toLowerCase()
//         .trim()
//         .replace(/[ä]/g, "ae")
//         .replace(/[ö]/g, "oe")
//         .replace(/[ü]/g, "ue")
//         .replace(/[ß]/g, "ss")
//         .replace(/[^a-z0-9]+/g, "-")
//         .replace(/(^-|-$)+/g, "");
// }

// export function makeListingSlug(title: string, id: string) {
//     return `${slugify(title)}-${slugify(id)}`;
// }

// type ListingVariant = "ready" | "build" | "investment";
// type ListingStatus = "verfügbar" | "reserviert" | "verkauft" | "in_bau";

// /**
//  * IMPORTANT:
//  * Listing/EstateDetails types in your project might not include all fields below yet.
//  * If TS complains, extend your types in `lib/types/listings.ts` later (Payload will need them anyway).
//  */
// type ListingFull = Listing &
//     EstateDetails & {
//         // ✅ filters/UX
//         variant: ListingVariant;
//         status: ListingStatus;

//         // ✅ region/label (no exact address)
//         region: string; // e.g. "Schwaben", "Allgäu"
//         locationLabel: string; // e.g. "Krumbach (Umgebung)"

//         // ✅ documents (if missing => "auf Anfrage")
//         pdfUrl?: string; // Exposé
//         floorplanUrl?: string;
//         energyCertificateUrl?: string;

//         // ✅ energy details (GEG fields)
//         energyCertificateType?: "bedarf" | "verbrauch";
//         energyValue?: number; // kWh/(m²a)
//         energyCarrier?: string; // e.g. "Wärmepumpe", "Gas"
//         energyYear?: number; // year from energy certificate (often same as yearBuilt)

//         // ✅ categorization (single source -> category rows derived)
//         categoryIds: string[];
//     };

// /**
//  * ----------------------------------------------------------------------------
//  * ✅ CENTRAL ESTATE DATA
//  * ----------------------------------------------------------------------------
//  * These are "dummy but production-like" records.
//  * Try to keep these fields as close as possible to what Payload will store later.
//  */
// const estates: ListingFull[] = [
//     {
//         id: "re1",
//         title: "Moderne Villa mit Seeblick",
//         imageSrc: "/assets/images/real-estate/realestate1.jpg",
//         location: "Bayern",
//         badge: "NEU",
//         href: "",
//         slug: "",

//         // payload-ready fields
//         variant: "ready",
//         status: "verfügbar",
//         region: "Bayern",
//         locationLabel: "Bayern (Seenähe)",
//         categoryIds: ["new", "most"],

//         price: 3950000,
//         currency: "EUR",
//         geo: { lat: 48.2439, lng: 10.3626 }, // Dummy
//         livingArea: 320,
//         plotArea: 980,
//         rooms: 7,
//         bedrooms: 4,
//         bathrooms: 3,
//         yearBuilt: 2021,

//         // energy (GEG-relevant)
//         energyClass: "A",
//         heatingType: "Wärmepumpe",
//         energyCertificateType: "bedarf",
//         energyValue: 42,
//         energyCarrier: "Wärmepumpe",
//         energyYear: 2021,

//         commissionText: "3,57% inkl. MwSt. Käuferprovision",
//         availability: "Nach Absprache",

//         // docs (if missing -> UI shows 'auf Anfrage')
//         pdfUrl: "/assets/pdfs/expose-demo.pdf",
//         floorplanUrl: "/assets/pdfs/floorplan-demo.pdf",

//         description:
//             "Eine moderne Villa mit großzügigen Glasfronten, ruhiger Lage und beeindruckendem Blick auf den See. Hochwertige Materialien, klare Linien und ein durchdachtes Raumkonzept schaffen ein exklusives Wohngefühl.",
//         highlights: ["Panoramablick auf den See", "Großzügige Südterrasse", "Smart-Home Vorbereitung", "Garage + Stellplätze"],
//         features: ["Fußbodenheizung", "Echtholzparkett", "Designer-Küche", "Weinklimaschrank", "Einbauschränke", "Smart Home vorbereitet"],
//         gallery: [
//             "/assets/images/real-estate/realestate2.jpg",
//             "/assets/images/real-estate/realestate3.jpg",
//             "/assets/images/real-estate/realestate4.jpg",
//             "/assets/images/real-estate/realestate5.jpg",
//         ],
//     },

//     {
//         id: "re2",
//         title: "Luxus Penthouse im Grünen",
//         imageSrc: "/assets/images/real-estate/realestate2.jpg",
//         location: "Starnberg",
//         badge: "SECRET SALE",
//         href: "",
//         slug: "",

//         variant: "investment",
//         status: "reserviert",
//         region: "Oberbayern",
//         locationLabel: "Starnberg (Region)",
//         categoryIds: ["new", "most"],

//         price: 2450000,
//         currency: "EUR",
//         geo: { lat: 48.2439, lng: 10.3626 }, // Dummy
//         livingArea: 185,
//         rooms: 4,
//         bedrooms: 2,
//         bathrooms: 2,
//         yearBuilt: 2019,

//         energyClass: "B",
//         heatingType: "Fernwärme",
//         energyCertificateType: "verbrauch",
//         energyValue: 78,
//         energyCarrier: "Fernwärme",
//         energyYear: 2019,

//         availability: "Nach Absprache",
//         commissionText: "3,57% inkl. MwSt. Käuferprovision",

//         // docs intentionally missing -> UI will show "auf Anfrage"
//         description:
//             "Exklusives Penthouse mit weitläufiger Terrasse, hochwertiger Ausstattung und unverbaubarem Grünblick. Ideal als Kapitalanlage oder Eigennutzung.",
//         highlights: ["Große Dachterrasse", "Aufzug bis in die Wohnung", "2 Stellplätze", "Hochwertige Ausstattung"],
//         features: ["Klimatisierung", "Fußbodenheizung", "Naturstein", "Einbauküche", "Smart Home"],
//         gallery: ["/assets/images/real-estate/realestate6.jpg", "/assets/images/real-estate/realestate7.jpg"],
//     },

//     {
//         id: "re3",
//         title: "Baugrundstück mit Panorama",
//         imageSrc: "/assets/images/real-estate/realestate3.jpg",
//         location: "Allgäu",
//         badge: "NEU",
//         href: "",
//         slug: "",

//         variant: "build",
//         status: "in_bau",
//         region: "Allgäu",
//         locationLabel: "Allgäu (Panoramalage)",
//         categoryIds: ["new"],

//         price: 690000,
//         currency: "EUR",
//         plotArea: 1200,
//         rooms: 0,
//         bedrooms: 0,
//         bathrooms: 0,
//         yearBuilt: 0,

//         // energy not available for land / project yet
//         commissionText: "3,57% inkl. MwSt. Käuferprovision",
//         availability: "Kurzfristig",

//         // docs (project bundle later)
//         // pdfUrl intentionally missing -> 'auf Anfrage'
//         description:
//             "Attraktives Baugrundstück in Panorama-Lage. Ideal für ein Neubauprojekt vom Papier weg. Unterlagen, Visuals und Projektkonzept erhalten Sie auf Anfrage.",
//         highlights: ["Panoramaaussicht", "Ruhige Lage", "Gute Anbindung", "Projektfähig"],
//         features: ["Hanglage möglich", "Erschließung nach Absprache"],
//         gallery: ["/assets/images/real-estate/realestate4.jpg", "/assets/images/real-estate/realestate5.jpg"],
//     },

//     {
//         id: "re4",
//         title: "Design Haus mit Pool",
//         imageSrc: "/assets/images/real-estate/realestate4.jpg",
//         location: "München Umland",
//         slug: "design-haus-mit-pool-muenchen-umland",
//         href: "/objekte/design-haus-mit-pool-muenchen-umland",

//         variant: "ready",
//         status: "verfügbar",
//         region: "Oberbayern",
//         locationLabel: "München (Umland)",
//         categoryIds: ["new"],

//         pricing: {
//             price: 3190000,
//             currency: "EUR",
//             availability: "Nach Absprache",
//             buyerCommission: {
//                 kind: "percent",
//                 value: 3.57,
//                 vatIncluded: true,
//                 vatRate: 19,
//                 basis: "Kaufpreis",
//                 due: "Fällig bei notarieller Beurkundung des Kaufvertrags.",
//                 note: "Die Käuferprovision ist vom Käufer zu zahlen, sofern ein Kaufvertrag zustande kommt.",
//             },
//             commissionText: "3,57% inkl. MwSt.",
//         },

//         facts: {
//             livingArea: 260,
//             plotArea: 780,
//             rooms: 6,
//             bedrooms: 3,
//             bathrooms: 3,
//             yearBuilt: 2020,
//         },

//         energy: {
//             class: "A+",
//             heatingType: "Wärmepumpe",
//             certificateType: "bedarf",
//             value: 35,
//             carrier: "Wärmepumpe",
//             year: 2020,
//         },

//         description:
//             "Modernes Designhaus mit Pool, klarer Architektur und großzügigem Outdoor-Bereich. Hochwertige Materialien und durchdachte Details.",
//         highlights: ["Pool", "Große Fensterfronten", "Offenes Wohnen", "Garten-Design"],
//         features: ["Fußbodenheizung", "Smart Home", "High-End Küche", "Alarmanlage"],

//         media: {
//             galleryUrls: [
//                 "/assets/images/real-estate/realestate8.jpg",
//                 "/assets/images/real-estate/realestate9.jpg",
//             ],
//         },
//     },

//     {
//         id: "re5",
//         title: "Architektenhaus in Hanglage",
//         imageSrc: "/assets/images/real-estate/realestate5.jpg",
//         location: "Bodensee",
//         badge: "NEU",
//         href: "",
//         slug: "",

//         variant: "ready",
//         status: "verfügbar",
//         region: "Bodensee",
//         locationLabel: "Bodensee (Region)",
//         categoryIds: ["new"],

//         price: 2790000,
//         currency: "EUR",
//         buyerCommission: {
//             kind: "percent",
//             value: 3.57,
//             vatIncluded: true,
//             vatRate: 19,
//             basis: "Kaufpreis",
//             due: "Fällig bei notarieller Beurkundung des Kaufvertrags.",
//             note: "Die Käuferprovision ist vom Käufer zu zahlen, sofern ein Kaufvertrag zustande kommt.",
//         },
//         commissionText: "3,57% inkl. MwSt.",
//         livingArea: 210,
//         plotArea: 640,
//         rooms: 5,
//         bedrooms: 3,
//         bathrooms: 2,
//         yearBuilt: 2018,

//         energyClass: "B",
//         heatingType: "Gas",
//         energyCertificateType: "verbrauch",
//         energyValue: 92,
//         energyCarrier: "Gas",
//         energyYear: 2018,

//         availability: "Nach Absprache",
//         description:
//             "Architektenhaus in Hanglage mit viel Licht, Blickachsen und hochwertigem Ausbau. Ideal für anspruchsvolle Käufer.",
//         highlights: ["Hanglage", "Großzügige Terrasse", "Designer-Details", "Ruhige Lage"],
//         features: ["Kamin", "Einbauküche", "Parkett", "Gäste-WC"],
//         gallery: ["/assets/images/real-estate/realestate10.jpg", "/assets/images/real-estate/realestate11.jpg"],
//     },

//     {
//         id: "re6",
//         title: "Landhaus mit Privatsee",
//         imageSrc: "/assets/images/real-estate/realestate6.jpg",
//         location: "Tirol",
//         href: "",
//         slug: "",

//         variant: "investment",
//         status: "verfügbar",
//         region: "Tirol",
//         locationLabel: "Tirol (Seenähe)",
//         categoryIds: ["most"],

//         price: 4990000,
//         currency: "EUR",
//         livingArea: 360,
//         plotArea: 4200,
//         rooms: 9,
//         bedrooms: 5,
//         bathrooms: 4,
//         yearBuilt: 2016,

//         energyClass: "C",
//         heatingType: "Pellet",
//         energyCertificateType: "verbrauch",
//         energyValue: 118,
//         energyCarrier: "Pellet",
//         energyYear: 2016,

//         availability: "Nach Absprache",
//         description:
//             "Exklusives Landhaus mit Privatsee und Parkfläche. Diskrete Vermarktung.",
//         highlights: ["Privatsee", "Großes Grundstück", "Privatsphäre", "Repräsentativ"],
//         features: ["Sauna", "Kamin", "Weinkeller", "Garage"],
//         gallery: ["/assets/images/real-estate/realestate1.jpg", "/assets/images/real-estate/realestate2.jpg"],
//     },

//     {
//         id: "re7",
//         title: "Luxus Anwesen mit Park",
//         imageSrc: "/assets/images/real-estate/realestate7.jpg",
//         location: "Salzburg",
//         badge: "SECRET SALE",
//         href: "",
//         slug: "",

//         variant: "investment",
//         status: "verfügbar",
//         region: "Salzburg",
//         locationLabel: "Salzburg (Region)",
//         categoryIds: ["most"],

//         price: 8900000,
//         currency: "EUR",
//         livingArea: 520,
//         plotArea: 8900,
//         rooms: 12,
//         bedrooms: 6,
//         bathrooms: 5,
//         yearBuilt: 2014,

//         energyClass: "B",
//         heatingType: "Wärmepumpe",
//         energyCertificateType: "bedarf",
//         energyValue: 68,
//         energyCarrier: "Wärmepumpe",
//         energyYear: 2014,

//         availability: "Nach Absprache",
//         description:
//             "Repräsentatives Anwesen mit Parkanlage. Diskrete Vermarktung – Details und Unterlagen auf Anfrage.",
//         highlights: ["Parkanlage", "Separate Gästeeinheit", "Hohe Privatsphäre", "Luxusausstattung"],
//         features: ["Pool", "Sauna", "Fitness", "Klimatisierung"],
//         gallery: ["/assets/images/real-estate/realestate8.jpg", "/assets/images/real-estate/realestate9.jpg"],
//     },

//     {
//         id: "re8",
//         title: "Modernes Chalet in Alpenlage",
//         imageSrc: "/assets/images/real-estate/realestate8.jpg",
//         location: "Zugspitze Region",
//         href: "",
//         slug: "",

//         variant: "ready",
//         status: "verfügbar",
//         region: "Alpen",
//         locationLabel: "Zugspitze (Region)",
//         categoryIds: ["most"],

//         price: 3150000,
//         currency: "EUR",

//         buyerCommission: {
//             kind: "percent",
//             value: 3.57,
//             vatIncluded: true,
//             vatRate: 19,
//             basis: "Kaufpreis",
//             due: "Fällig bei notarieller Beurkundung des Kaufvertrags.",
//             note: "Die Käuferprovision ist vom Käufer zu zahlen, sofern ein Kaufvertrag zustande kommt.",
//         },
//         commissionText: "3,57% inkl. MwSt.",
//         livingArea: 240,
//         plotArea: 550,
//         rooms: 6,
//         bedrooms: 4,
//         bathrooms: 3,
//         yearBuilt: 2022,

//         energyClass: "A",
//         heatingType: "Wärmepumpe",
//         energyCertificateType: "bedarf",
//         energyValue: 45,
//         energyCarrier: "Wärmepumpe",
//         energyYear: 2022,

//         availability: "Sofort",
//         description:
//             "Modernes Chalet in traumhafter Alpenlage – hochwertiger Innenausbau, klare Linien, viel Holz und Licht.",
//         highlights: ["Alpenlage", "Große Fenster", "Sauna möglich", "Garage"],
//         features: ["Fußbodenheizung", "Naturholz", "Kamin", "Einbauküche"],
//         gallery: ["/assets/images/real-estate/realestate10.jpg", "/assets/images/real-estate/realestate11.jpg"],
//     },

//     {
//         id: "re9",
//         title: "Villa mit Infinity Pool",
//         imageSrc: "/assets/images/real-estate/realestate9.jpg",
//         location: "Gardasee",
//         badge: "VERKAUFT",
//         href: "",
//         slug: "",

//         variant: "ready",
//         status: "verkauft",
//         region: "Italien",
//         locationLabel: "Gardasee (Region)",
//         categoryIds: ["most"],

//         price: 0, // sold
//         currency: "EUR",

//         buyerCommission: {
//             kind: "percent",
//             value: 3.57,
//             vatIncluded: true,
//             vatRate: 19,
//             basis: "Kaufpreis",
//             due: "Fällig bei notarieller Beurkundung des Kaufvertrags.",
//             note: "Die Käuferprovision ist vom Käufer zu zahlen, sofern ein Kaufvertrag zustande kommt.",
//         },
//         commissionText: "3,57% inkl. MwSt.",
//         livingArea: 300,
//         plotArea: 900,
//         rooms: 7,
//         bedrooms: 4,
//         bathrooms: 3,
//         yearBuilt: 2020,

//         energyClass: "B",
//         heatingType: "Wärmepumpe",
//         energyCertificateType: "bedarf",
//         energyValue: 72,
//         energyCarrier: "Wärmepumpe",
//         energyYear: 2020,

//         availability: "Verkauft",
//         description:
//             "Referenz: Villa mit Infinity Pool und Seeblick – bereits verkauft.",
//         highlights: ["Infinity Pool", "Seeblick", "High-End Ausstattung", "Referenz"],
//         features: ["Pool", "Klimatisierung", "Smart Home"],
//         gallery: ["/assets/images/real-estate/realestate1.jpg", "/assets/images/real-estate/realestate2.jpg"],
//     },

//     {
//         id: "re10",
//         title: "Waldresidenz mit Privatsphäre",
//         imageSrc: "/assets/images/real-estate/realestate10.jpg",
//         location: "Schwarzwald",
//         slug: "waldresidenz-mit-privatsphaere-schwarzwald",
//         href: "/objekte/waldresidenz-mit-privatsphaere-schwarzwald",

//         variant: "investment",
//         status: "verfügbar",
//         region: "Schwarzwald",
//         locationLabel: "Schwarzwald (Region)",
//         categoryIds: ["most"],

//         price: 1890000,
//         currency: "EUR",


//         buyerCommission: {
//             kind: "percent",
//             value: 3.57,
//             vatIncluded: true,
//             vatRate: 19,
//             basis: "Kaufpreis",
//             due: "Fällig bei notarieller Beurkundung des Kaufvertrags.",
//             note: "Die Käuferprovision ist vom Käufer zu zahlen, sofern ein Kaufvertrag zustande kommt.",
//         },
//         commissionText: "3,57% inkl. MwSt.",

//         livingArea: 210,
//         plotArea: 3200,
//         rooms: 6,
//         bedrooms: 4,
//         bathrooms: 2,
//         yearBuilt: 2012,

//         energyClass: "D",
//         heatingType: "Öl",
//         energyCertificateType: "verbrauch",
//         energyValue: 145,
//         energyCarrier: "Öl",
//         energyYear: 2012,

//         availability: "Nach Absprache",
//         description:
//             "Rückzugsort mit viel Privatsphäre – diskrete Lage, großzügiges Grundstück, hochwertige Modernisierung.",
//         highlights: ["Privatsphäre", "Großes Grundstück", "Modernisiert", "Ruhige Lage"],
//         features: ["Kamin", "Garage", "Gartenanlage"],
//         gallery: [
//             "/assets/images/real-estate/realestate3.jpg",
//             "/assets/images/real-estate/realestate4.jpg",
//         ],
//     },

//     {
//         id: "re11",
//         title: "Seegrundstück mit Steg",
//         imageSrc: "/assets/images/real-estate/realestate11.jpg",
//         location: "Chiemsee",
//         href: "",
//         slug: "",

//         variant: "build",
//         status: "verfügbar",
//         region: "Chiemsee",
//         locationLabel: "Chiemsee (Region)",
//         categoryIds: ["most"],

//         price: 1250000,
//         currency: "EUR",
//         plotArea: 1400,
//         rooms: 0,
//         bedrooms: 0,
//         bathrooms: 0,
//         yearBuilt: 0,

//         availability: "Nach Absprache",
//         description:
//             "Seegrundstück mit Steg – diskrete Vermarktung. Projektoptionen und Unterlagen auf Anfrage.",
//         highlights: ["Seezugang", "Steg", "Projektoption", "Diskret"],
//         features: ["Bebauung nach Absprache"],
//         gallery: ["/assets/images/real-estate/realestate5.jpg", "/assets/images/real-estate/realestate6.jpg"],
//     },
// ];

// /**
//  * ----------------------------------------------------------------------------
//  * ✅ ROUTING ENRICHMENT
//  * ----------------------------------------------------------------------------
//  * Adds slug + href once, based on title + id.
//  */
// function enrichRouting(items: ListingFull[]): ListingFull[] {
//     return items.map((item) => {
//         const slug = makeListingSlug(item.title, item.id);
//         return {
//             ...item,
//             slug,
//             href: `${ESTATE_BASE_PATH}/${slug}`,
//         };
//     });
// }

// const estatesWithRouting = enrichRouting(estates);

// /**
//  * ----------------------------------------------------------------------------
//  * ✅ CATEGORIES (derived)
//  * ----------------------------------------------------------------------------
//  * Best practice: Keep categories lightweight, derive rows from listing.categoryIds
//  */
// const categories: Array<{ id: string; title: string; href: string }> = [
//     { id: "new", title: "NEU", href: "/neu" },
//     { id: "most", title: "MEISTGESEHEN", href: "/meistgesehen" },
// ];

// function buildCategoryRows(items: ListingFull[]): CategoryRow[] {
//     return categories.map((cat) => {
//         const catItems = items
//             .filter((i) => i.categoryIds.includes(cat.id))
//             // keep carousel minimal: only base fields needed
//             .map((i) => ({
//                 id: i.id,
//                 title: i.title,
//                 imageSrc: i.imageSrc,
//                 href: i.href,
//                 location: i.locationLabel || i.location,
//                 badge: i.badge,
//                 slug: i.slug,
//             })) as unknown as Listing[];

//         return {
//             id: cat.id,
//             title: cat.title,
//             href: cat.href,
//             items: catItems,
//         };
//     });
// }

// export const categoryRows: CategoryRow[] = buildCategoryRows(estatesWithRouting);

// /**
//  * ----------------------------------------------------------------------------
//  * ✅ PUBLIC API
//  * ----------------------------------------------------------------------------
//  * Use these everywhere in the app.
//  *
//  * Later with Payload:
//  * - getCategoryRows(): either build server-side grouping or query a "featured" flag
//  * - getListings(): query all listings (with filters, pagination)
//  * - getEstateBySlug(): fetch one listing by slug
//  */
// export async function getCategoryRows(): Promise<CategoryRow[]> {
//     return categoryRows;
// }

// export async function getListings(): Promise<ListingFull[]> {
//     // Used by /immobilien for filter + grid
//     return estatesWithRouting;
// }

// export async function getEstateBySlug(slug: string): Promise<ListingFull | null> {
//     const all = await getListings();
//     return all.find((x) => x.slug === slug) ?? null;
// }

// export async function getAllListingSlugs(): Promise<string[]> {
//     const all = await getListings();
//     return all.map((l: any) => l.slug ?? l.id).filter(Boolean);
// }

// export async function getListingBySlug(slug: string): Promise<EstateDetails | null> {
//     // nutzt deine bestehende Funktion (Mock: Merge aus base+details)
//     return getEstateBySlug(slug) as unknown as EstateDetails | null;
// }




// // src/lib/data/listings.ts
// import type { CategoryRow, Listing, EstateDetails } from "@/lib/types/listings";

// const ESTATE_BASE_PATH = "/objekte";

// function slugify(input: string) {
//     return input
//         .toLowerCase()
//         .trim()
//         .replace(/[ä]/g, "ae")
//         .replace(/[ö]/g, "oe")
//         .replace(/[ü]/g, "ue")
//         .replace(/[ß]/g, "ss")
//         .replace(/[^a-z0-9]+/g, "-")
//         .replace(/(^-|-$)+/g, "");
// }

// export function makeListingSlug(title: string, id: string) {
//     return `${slugify(title)}-${slugify(id)}`;
// }

// function withRouting(rows: CategoryRow[]): CategoryRow[] {
//     return rows.map((row) => ({
//         ...row,
//         items: row.items.map((item) => {
//             const slug = makeListingSlug(item.title, item.id);
//             return {
//                 ...item,
//                 slug,
//                 href: `${ESTATE_BASE_PATH}/${slug}`,
//             };
//         }),
//     }));
// }

// /**
//  * ✅ ROW DATA (used for carousels/overview)
//  * Keep it minimal = fast + clean.
//  */
// const rawRows: CategoryRow[] = [
//     {
//         id: "new",
//         title: "NEU",
//         href: "/neu",
//         items: [
//             {
//                 id: "re1",
//                 title: "Moderne Villa mit Seeblick",
//                 imageSrc: "/assets/images/real-estate/realestate1.jpg",
//                 href: "",
//                 location: "Bayern",
//                 badge: "NEU",
//             },
//             {
//                 id: "re2",
//                 title: "Luxus Penthouse im Grünen",
//                 imageSrc: "/assets/images/real-estate/realestate2.jpg",
//                 href: "",
//                 location: "Starnberg",
//                 badge: "SECRET SALE",
//             },
//             {
//                 id: "re3",
//                 title: "Baugrundstück mit Panorama",
//                 imageSrc: "/assets/images/real-estate/realestate3.jpg",
//                 href: "",
//                 location: "Allgäu",
//                 badge: "NEU",
//             },
//             {
//                 id: "re4",
//                 title: "Design Haus mit Pool",
//                 imageSrc: "/assets/images/real-estate/realestate4.jpg",
//                 href: "",
//                 location: "München Umland",
//             },
//             {
//                 id: "re5",
//                 title: "Architektenhaus in Hanglage",
//                 imageSrc: "/assets/images/real-estate/realestate5.jpg",
//                 href: "",
//                 location: "Bodensee",
//                 badge: "NEU",
//             },
//         ],
//     },
//     {
//         id: "most",
//         title: "MEISTGESEHEN",
//         href: "/meistgesehen",
//         items: [
//             {
//                 id: "re6",
//                 title: "Landhaus mit Privatsee",
//                 imageSrc: "/assets/images/real-estate/realestate6.jpg",
//                 href: "",
//                 location: "Tirol",
//             },
//             {
//                 id: "re7",
//                 title: "Luxus Anwesen mit Park",
//                 imageSrc: "/assets/images/real-estate/realestate7.jpg",
//                 href: "",
//                 location: "Salzburg",
//                 badge: "SECRET SALE",
//             },
//             {
//                 id: "re8",
//                 title: "Modernes Chalet in Alpenlage",
//                 imageSrc: "/assets/images/real-estate/realestate8.jpg",
//                 href: "",
//                 location: "Zugspitze Region",
//             },
//             {
//                 id: "re9",
//                 title: "Villa mit Infinity Pool",
//                 imageSrc: "/assets/images/real-estate/realestate9.jpg",
//                 href: "",
//                 location: "Gardasee",
//                 badge: "VERKAUFT",
//             },
//             {
//                 id: "re10",
//                 title: "Waldresidenz mit Privatsphäre",
//                 imageSrc: "/assets/images/real-estate/realestate10.jpg",
//                 href: "",
//                 location: "Schwarzwald",
//             },
//             {
//                 id: "re11",
//                 title: "Seegrundstück mit Steg",
//                 imageSrc: "/assets/images/real-estate/realestate11.jpg",
//                 href: "",
//                 location: "Chiemsee",
//             },
//         ],
//     },
// ];

// export const categoryRows: CategoryRow[] = withRouting(rawRows);

// /** Für Startseite/Carousels */
// export async function getCategoryRows(): Promise<CategoryRow[]> {
//     return categoryRows;
// }

// /** Für /immobilien (flache Liste) */
// export async function getListings(): Promise<Listing[]> {
//     return categoryRows.flatMap((r) => r.items);
// }

// /**
//  * ✅ DETAIL DATA (used for /objekte/[slug])
//  * Map by listing id so you can keep row data lightweight.
//  */
// const estateDetailsById: Record<string, Omit<EstateDetails, keyof Listing>> = {
//     re1: {
//         price: 3950000,
//         geo: { lat: 48.2439, lng: 10.3626 }, // Dummy
//         currency: "EUR",
//         livingArea: 320,
//         plotArea: 980,
//         rooms: 7,
//         bedrooms: 4,
//         bathrooms: 3,
//         yearBuilt: 2021,
//         energyClass: "A",
//         heatingType: "Wärmepumpe",
//         commissionText: "3,57% inkl. MwSt. Käuferprovision",
//         availability: "Nach Absprache",
//         description:
//             "Eine moderne Villa mit großzügigen Glasfronten, ruhiger Lage und beeindruckendem Blick auf den See. Hochwertige Materialien, klare Linien und ein durchdachtes Raumkonzept schaffen ein exklusives Wohngefühl.",
//         highlights: [
//             "Panoramablick auf den See",
//             "Großzügige Südterrasse",
//             "Smart-Home Vorbereitung",
//             "Garage + Stellplätze",
//         ],
//         features: [
//             "Fußbodenheizung",
//             "Echtholzparkett",
//             "Designer-Küche",
//             "Weinklimaschrank",
//             "Einbauschränke",
//             "Alarmanlage vorbereitet",
//         ],
//         gallery: [
//             "/assets/images/real-estate/realestate2.jpg",
//             "/assets/images/real-estate/realestate3.jpg",
//             "/assets/images/real-estate/realestate4.jpg",
//             "/assets/images/real-estate/realestate5.jpg",
//         ],
//     },

//     re2: {
//         price: 2450000,
//         geo: { lat: 48.2439, lng: 10.3626 }, // Dummy
//         currency: "EUR",
//         livingArea: 185,
//         rooms: 4,
//         bedrooms: 2,
//         bathrooms: 2,
//         yearBuilt: 2019,
//         energyClass: "A+",
//         heatingType: "Fernwärme",
//         commissionText: "3,57% inkl. MwSt. Käuferprovision",
//         availability: "Sofort verfügbar",
//         description:
//             "Ein zurückgezogenes Penthouse mit Privatsphäre, Dachterrasse und lichtdurchfluteten Wohnbereichen. Ideal für diskrete Käufer, die hochwertige Architektur und Naturanbindung kombinieren möchten.",
//         highlights: ["Private Dachterrasse", "Aufzug direkt in die Wohnung", "2 TG-Stellplätze"],
//         features: ["Kamin", "Klimatisierung", "Gäste-WC", "Smart Lighting"],
//         gallery: [
//             "/assets/images/real-estate/realestate6.jpg",
//             "/assets/images/real-estate/realestate7.jpg",
//             "/assets/images/real-estate/realestate8.jpg",
//         ],
//         // videoSrc: "/assets/videos/penthouse.mp4",
//     },

//     re3: {
//         price: 890000,
//         geo: { lat: 48.2439, lng: 10.3626 }, // Dummy
//         currency: "EUR",
//         plotArea: 1620,
//         commissionText: "3,57% inkl. MwSt. Käuferprovision",
//         availability: "Nach Absprache",
//         description:
//             "Großzügiges Grundstück mit Weitblick in begehrter Höhenlage. Ideale Voraussetzungen für ein modernes Einfamilienhaus oder ein anspruchsvolles Chalet-Konzept (vorbehaltlich Genehmigung).",
//         highlights: ["Panoramablick", "Ruhige Lage", "Sehr gute Anbindung"],
//         features: ["Süd-West Ausrichtung", "Anliegerstraße", "Erschließung in der Nähe"],
//         gallery: [
//             "/assets/images/real-estate/realestate9.jpg",
//             "/assets/images/real-estate/realestate10.jpg",
//         ],
//     },

//     re4: {
//         price: 2790000,
//         geo: { lat: 48.2439, lng: 10.3626 }, // Dummy
//         currency: "EUR",
//         livingArea: 265,
//         plotArea: 740,
//         rooms: 6,
//         bedrooms: 4,
//         bathrooms: 3,
//         yearBuilt: 2020,
//         energyClass: "A",
//         heatingType: "Wärmepumpe",
//         commissionText: "3,57% inkl. MwSt. Käuferprovision",
//         availability: "Nach Absprache",
//         description:
//             "Puristische Architektur mit klaren Linien, großformatigen Glasflächen und privatem Außenbereich. Der beheizte Pool und die hochwertige Ausstattung machen dieses Objekt zu einem ganzjährigen Rückzugsort.",
//         highlights: ["Beheizter Pool", "Offene Galerie", "Private Lounge-Terrasse"],
//         features: ["Naturstein", "Einbauküche", "Home Office", "Elektrische Verschattung"],
//         gallery: [
//             "/assets/images/real-estate/realestate1.jpg",
//             "/assets/images/real-estate/realestate5.jpg",
//             "/assets/images/real-estate/realestate8.jpg",
//         ],
//     },

//     re5: {
//         price: 3180000,
//         currency: "EUR",
//         livingArea: 290,
//         plotArea: 910,
//         rooms: 7,
//         bedrooms: 4,
//         bathrooms: 3,
//         yearBuilt: 2017,
//         energyClass: "A",
//         heatingType: "Pellet + Solarthermie",
//         commissionText: "3,57% inkl. MwSt. Käuferprovision",
//         availability: "Nach Absprache",
//         description:
//             "Architektonisches Statement in Hanglage mit Terrassierung und beeindruckender Lichtführung. Ein Zuhause, das Design und Alltagstauglichkeit auf höchstem Niveau verbindet.",
//         highlights: ["Hanglage mit Terrassen", "Weitblick", "Doppelgarage"],
//         features: ["Sauna", "Fitnessraum", "Hauswirtschaftsraum", "Outdoor-Küche"],
//         gallery: [
//             "/assets/images/real-estate/realestate2.jpg",
//             "/assets/images/real-estate/realestate7.jpg",
//             "/assets/images/real-estate/realestate11.jpg",
//         ],
//     },

//     re6: {
//         price: 4650000,
//         geo: { lat: 48.2439, lng: 10.3626 }, // Dummy
//         currency: "EUR",
//         livingArea: 410,
//         plotArea: 5200,
//         rooms: 10,
//         bedrooms: 6,
//         bathrooms: 5,
//         yearBuilt: 2012,
//         energyClass: "B",
//         heatingType: "Biomasse",
//         commissionText: "3,57% inkl. MwSt. Käuferprovision",
//         availability: "Nach Absprache",
//         description:
//             "Ein außergewöhnliches Landhaus mit eigenem Privatsee und weitläufigem Park. Absolute Privatsphäre, repräsentative Räume und ein unvergleichliches Naturerlebnis.",
//         highlights: ["Privatsee", "Parkähnliches Grundstück", "Gästehaus"],
//         features: ["Bootssteg", "Weinkeller", "Kaminlounge", "Security-System"],
//         gallery: [
//             "/assets/images/real-estate/realestate7.jpg",
//             "/assets/images/real-estate/realestate8.jpg",
//             "/assets/images/real-estate/realestate9.jpg",
//         ],
//     },

//     re7: {
//         price: 8900000,
//         geo: { lat: 48.2439, lng: 10.3626 }, // Dummy
//         currency: "EUR",
//         livingArea: 720,
//         plotArea: 11000,
//         rooms: 14,
//         bedrooms: 8,
//         bathrooms: 7,
//         yearBuilt: 2008,
//         energyClass: "B",
//         heatingType: "Gas + Solar",
//         commissionText: "3,57% inkl. MwSt. Käuferprovision",
//         availability: "Diskret / nach Vereinbarung",
//         description:
//             "Repräsentatives Anwesen mit Park, Blickachsen und hochwertigen Details. Ideal für Käufer, die Diskretion und außergewöhnliche Qualität in bester Lage suchen.",
//         highlights: ["Parkanlage", "Indoor Spa", "Gäste-Trakt"],
//         features: ["Indoor-Pool", "Spa & Sauna", "Aufzug", "Personalwohnung", "Weinkeller"],
//         gallery: [
//             "/assets/images/real-estate/realestate10.jpg",
//             "/assets/images/real-estate/realestate11.jpg",
//             "/assets/images/real-estate/realestate6.jpg",
//         ],
//     },

//     re8: {
//         price: 3290000,
//         geo: { lat: 48.2439, lng: 10.3626 }, // Dummy
//         currency: "EUR",
//         livingArea: 240,
//         plotArea: 620,
//         rooms: 6,
//         bedrooms: 4,
//         bathrooms: 3,
//         yearBuilt: 2018,
//         energyClass: "A",
//         heatingType: "Wärmepumpe",
//         commissionText: "3,57% inkl. MwSt. Käuferprovision",
//         availability: "Saison 2026 verfügbar",
//         description:
//             "Modernes Chalet mit alpinem Charakter: warme Materialien, großzügige Sichtachsen und perfekte Balance aus Design und Gemütlichkeit.",
//         highlights: ["Bergblick", "Offener Kamin", "Ski-Room"],
//         features: ["Sauna", "Kamin", "Ski-/Bike-Room", "Panorama-Terrasse", "E-Ladestation"],
//         gallery: [
//             "/assets/images/real-estate/realestate9.jpg",
//             "/assets/images/real-estate/realestate4.jpg",
//             "/assets/images/real-estate/realestate2.jpg",
//         ],
//     },

//     re9: {
//         price: 0,
//         currency: "EUR",
//         geo: { lat: 48.2439, lng: 10.3626 }, // Dummy
//         livingArea: 360,
//         plotArea: 1200,
//         rooms: 8,
//         bedrooms: 5,
//         bathrooms: 4,
//         yearBuilt: 2016,
//         energyClass: "A",
//         heatingType: "Wärmepumpe",
//         commissionText: "3,57% inkl. MwSt. Käuferprovision",
//         availability: "Verkauft",
//         description:
//             "Exklusive Villa mit Infinity Pool und Blick auf den See. Dieses Objekt ist bereits verkauft, dient jedoch als Referenz für ähnliche Off-Market Angebote.",
//         highlights: ["Infinity Pool", "Seeblick", "Off-Market Referenz"],
//         features: ["Outdoor Lounge", "Smart Home", "Weinkeller"],
//         gallery: [
//             "/assets/images/real-estate/realestate1.jpg",
//             "/assets/images/real-estate/realestate3.jpg",
//         ],
//     },

//     re10: {
//         price: 1980000,
//         geo: { lat: 48.2439, lng: 10.3626 }, // Dummy
//         currency: "EUR",
//         livingArea: 215,
//         plotArea: 4300,
//         rooms: 6,
//         bedrooms: 3,
//         bathrooms: 2,
//         yearBuilt: 2014,
//         energyClass: "B",
//         heatingType: "Pellet",
//         commissionText: "3,57% inkl. MwSt. Käuferprovision",
//         availability: "Nach Absprache",
//         description:
//             "Rückzugsort im Grünen: Waldresidenz mit großem Grundstück, ruhiger Zufahrt und behaglicher Atmosphäre.",
//         highlights: ["Sehr ruhige Lage", "Großes Grundstück", "Home Office möglich"],
//         features: ["Kamin", "Werkstatt", "Gartenhaus", "Carport"],
//         gallery: [
//             "/assets/images/real-estate/realestate5.jpg",
//             "/assets/images/real-estate/realestate6.jpg",
//             "/assets/images/real-estate/realestate11.jpg",
//         ],
//     },

//     re11: {
//         price: 2150000,
//         geo: { lat: 48.2439, lng: 10.3626 }, // Dummy
//         currency: "EUR",
//         plotArea: 980,
//         commissionText: "3,57% inkl. MwSt. Käuferprovision",
//         availability: "Nach Absprache",
//         description:
//             "Seltenes Seegrundstück mit privatem Steg. Perfekt für eine außergewöhnliche Neubauplanung (vorbehaltlich Genehmigungen).",
//         highlights: ["Privater Steg", "Direkter Seezugang", "Rarität"],
//         features: ["Süd-Ausrichtung", "Ruhige Nachbarschaft", "Gute Infrastruktur"],
//         gallery: [
//             "/assets/images/real-estate/realestate2.jpg",
//             "/assets/images/real-estate/realestate8.jpg",
//         ],
//     },
// };

// export async function getAllEstates(): Promise<Listing[]> {
//     const rows = await getListings();
//     return rows.flatMap((r) => r.items);
// }

// export async function getEstateBySlug(slug: string): Promise<EstateDetails | null> {
//     const all = await getListings();
//     const base = all.find((x) => x.slug === slug);
//     if (!base) return null;

//     const details = estateDetailsById[base.id] ?? {};
//     return { ...base, ...details };
// }
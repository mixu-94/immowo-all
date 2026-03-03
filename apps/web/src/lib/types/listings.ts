// src/lib/types/listings.ts

/**
 * ============================================================================
 * IMMOBILIEN TYPES (Payload-ready)
 * ============================================================================
 * Ziel:
 * - Ein Typeset, das heute mit Mock-Daten funktioniert und später 1:1 in Payload abbildbar ist.
 * - Fokus auf: /immobilien Grid + Filter, /objekte/[slug] Detailseite, Energie/GEG, Dokumente (PDF),
 *   Status/Variant Badges, diskrete Lage, Medien, SEO.
 *
 * Best Practice:
 * - Viele Felder optional, damit MVP nicht blockiert.
 * - "Marketing Badge" getrennt von "Status" (verfügbar/reserviert/etc.).
 * - Region/LocationLabel statt Adresse (Diskretion).
 * ============================================================================
 */

export type Currency = "EUR";

/** Objektart: steuert Banner/Badges, CTA-Texte, Filter */
export type ListingVariant = "ready" | "build" | "investment";

/** Verfügbarkeit/Status: steuert Badges/Filter */
export type ListingStatus = "verfügbar" | "reserviert" | "verkauft" | "in_bau";

/** Energieausweis-Art (GEG) */
export type EnergyCertificateType = "bedarf" | "verbrauch";

/** Energieeffizienzklasse */
export type EnergyClass =
    | "A+"
    | "A"
    | "B"
    | "C"
    | "D"
    | "E"
    | "F"
    | "G"
    | "H";

/** Grobe Geo-Koordinaten (für diskrete Karte/Link). Keine exakte Adresse nötig */
export type GeoPoint = {
    lat: number;
    lng: number;
};

/** Medienobjekt (Payload Media kann später gut darauf gemappt werden) */
export type MediaItem =
    | {
        type: "image";
        src: string; // public path oder später Payload media URL
        alt?: string;
    }
    | {
        type: "video";
        src: string; // mp4 url
        posterSrc?: string;
    };

/** Dokumente (PDF/Grundriss/Energieausweis). Wenn URL fehlt → UI zeigt "auf Anfrage". */
export type ListingDocuments = {
    exposePdfUrl?: string;
    floorplanUrl?: string;
    energyCertificateUrl?: string;

    /** Optional: weitere Unterlagen */
    brochureUrl?: string;
    specsUrl?: string; // Leistungsbeschreibung
};

/** Energieinformationen (GEG-relevant Felder). */
export type ListingEnergy = {
    /** Bedarf-/Verbrauchsausweis */
    certificateType?: EnergyCertificateType;

    /** Endenergiekennwert (kWh/(m²a)) */
    value?: number;

    /** Energieeffizienzklasse */
    class?: EnergyClass;

    /** Wesentlicher Energieträger (z.B. Wärmepumpe, Gas, Fernwärme) */
    carrier?: string;

    /** Baujahr laut Energieausweis (oft gleich yearBuilt, aber nicht immer) */
    year?: number;

    /** Optional: Zusätzliche Details */
    heatingType?: string; // wenn du das getrennt vom carrier führen willst
    note?: string; // Freitext
};

/** Diskrete Lage (keine Adresse). */
export type ListingLocation = {
    /** grobe Region für Filter/SEO (z.B. "Schwaben", "Allgäu") */
    region?: string;

    /** Anzeige-Ort (z.B. "Krumbach (Umgebung)") */
    label?: string;

    /** Optional: Land/Bundesland */
    country?: string; // "DE"
    state?: string; // "Bayern"

    /** Optional: Karte (grob), falls vorhanden */
    geo?: GeoPoint;

    /**
     * Optional: Adresse (meist gated / nicht öffentlich)
     * Empfehlung: nur nutzen, wenn ihr wirklich braucht – sonst weglassen.
     */
    address?: {
        street?: string;
        zip?: string;
        city?: string;
    };
};

/** Eckdaten (für Cards/Detail). */
export type ListingFacts = {
    livingArea?: number; // m²
    plotArea?: number; // m²
    rooms?: number;
    bedrooms?: number;
    bathrooms?: number;

    yearBuilt?: number;

    /** Optional: Etage / Stockwerke */
    floor?: string; // "3. OG"
    floorsTotal?: number;

    /** Optional: Stellplätze */
    parking?: {
        count?: number;
        type?: string; // "Garage", "Carport", "Außenstellplatz"
    };
};

export type BuyerCommission = {
    /** z.B. 3.57% oder 5950 EUR */
    kind: "percent" | "fixed";
    value: number;

    /** i.d.R. true in DE (inkl. MwSt.) */
    vatIncluded?: boolean;
    vatRate?: number; // default 19

    /** Freitext für rechtliche Nuancen */
    note?: string;

    /** typischerweise: "fällig bei notariellem Kaufvertrag" */
    due?: string;

    /** optional: "Kaufpreis" / "Beurkundung" etc */
    basis?: string;
};

/** Preis/Verfügbarkeit */
export type ListingPricing = {
    /** Kaufpreis, null/undefined = Preis auf Anfrage */
    price?: number | null;
    currency?: Currency;

    /** Courtage textlich (rechtlich wichtig, wenn relevant) */
    commissionText?: string;

    /** strukturierte Käuferprovision pro Objekt */
    buyerCommission?: BuyerCommission;

    /** Verfügbarkeitstext (z.B. "Sofort", "Nach Absprache") */
    availability?: string;

    /** Optional: Kaufpreis pro m² (nice to have) */
    pricePerSqm?: number;
};

/** Klassifikation/Tags für Filter/Teaser */
export type ListingClassification = {
    variant?: ListingVariant;
    status?: ListingStatus;

    /**
     * Marketing/Teaser Badge (NEU, SECRET SALE, TOP)
     * Nicht verwechseln mit status!
     */
    badge?: string;

    /** Freie Tags (z.B. "Seeblick", "Pool", "KfW 40") */
    tags?: string[];

    /** Für Kategorien/Carousels. Best Practice: IDs statt doppelte Strukturen */
    categoryIds?: string[];
};

/** Für SEO und Social Sharing (später super wichtig) */
export type ListingSEO = {
    title?: string;
    description?: string;
    ogImage?: string;
    canonicalUrl?: string;
};

/** Makler / Ansprechpartner (aus Payload Makler-Collection) */
export type MaklerContact = {
    id: string;
    name: string;
    titleRole?: string;
    phone?: string;
    email?: string;
    photoUrl?: string;
    availability?: string;
    focus?: string[];
};

/**
 * ============================================================================
 * BASE LISTING
 * ============================================================================
 * Das ist die minimal benötigte Struktur für Cards/Navigation.
 * ============================================================================
 */
export type Listing = {
    id: string;

    /** URL-Slug für /objekte/[slug] */
    slug: string;

    title: string;

    /** optionaler Untertitel für Card/Detail */
    subtitle?: string;

    badge?: string;

    /** Hero-Bild für Card/Detail */
    imageSrc?: string;

    /** Link (kann aus slug abgeleitet werden, aber ist praktisch im Mock) */
    href?: string;

    /** location quick label (legacy), besser: location.label */
    location?: string;
    pricing?: ListingPricing;
};

/**
 * ============================================================================
 * ESTATE DETAILS (Detailseite)
 * ============================================================================
 * Vereint: Listing + Facts + Pricing + Energy + Docs + Media + Content
 * ============================================================================
 */
export type EstateDetails = Listing & {
    // classification
    classification?: ListingClassification;

    // location (diskret)
    locationInfo?: ListingLocation;

    // pricing
    pricing?: ListingPricing;

    // facts
    facts?: ListingFacts;

    // energy (GEG)
    energy?: ListingEnergy;

    // documents
    documents?: ListingDocuments;

    // media
    media?: {
        heroVideoSrc?: string; // wenn du das weiter separat brauchst
        gallery?: MediaItem[]; // bevorzugt
        // legacy compatibility (falls du schon so baust)
        videoSrc?: string;
        galleryUrls?: string[];
    };

    // content
    description?: string;
    highlights?: string[];
    features?: string[];

    // optional: projekt/bau-spezifische Infos
    project?: {
        /** für build-Objekte */
        stage?: string; // "Planung", "Rohbau", "Innenausbau"
        completionDate?: string; // ISO date string
        kfw?: string; // "KfW 40"
        handover?: string; // "Q3 2026"
        note?: string;
    };

    // optional: SEO
    seo?: ListingSEO;

    // Ansprechpartner (Makler)
    ansprechpartner?: MaklerContact;
};

/**
 * ============================================================================
 * CATEGORY ROWS (für Frontpage / Carousels)
 * ============================================================================
 * Best Practice: Items sind Listings (minimal), nicht volle Details.
 * ============================================================================
 */
export type CategoryRow = {
    id: string; // "new" | "most" | ...
    title: string; // "NEU" etc.
    href?: string; // optional
    items: Listing[];
};

/**
 * ============================================================================
 * FRONTEND HELPERS (Filter)
 * ============================================================================
 * Für Filter-/Search-UI hilfreich (kannst du nutzen, musst du nicht)
 * ============================================================================
 */
export type ListingsFilter = {
    q?: string;
    region?: string;
    variant?: ListingVariant | "any";
    status?: ListingStatus | "any";
    minPrice?: number;
    maxPrice?: number;
    minArea?: number;
    maxArea?: number;
    minRooms?: number;
    energyClass?: EnergyClass | "any";
};

/**
 * ============================================================================
 * MIGRATION NOTE (für Payload später)
 * ============================================================================
 * Payload mapping (typisch):
 * - collection: listings
 * - fields: title, slug, variant, status, region, locationLabel, pricing.price, facts.*, energy.*, documents.*, media.*
 * - media fields: upload relation to Media collection
 *
 * UI requirement reminder:
 * - Wenn documents.exposePdfUrl fehlt => "auf Anfrage" CTA zeigen
 * - Wenn energy vorhanden => Energie-Section zeigen
 * - GEG: certificateType, value, carrier, year, class (wenn Ausweis vorliegt)
 * ============================================================================
 */


// export type ListingBadge = "NEU" | "SECRET SALE" | "VERKAUFT";

// export type Listing = {
//     id: string;
//     title: string;
//     imageSrc: string;
//     href: string;
//     location?: string;
//     badge?: ListingBadge;

//     // optional routing helpers
//     slug?: string;
// };

// export type CategoryRow = {
//     id: string;
//     title: string; // "NEU", "MEISTGESEHEN"
//     items: Listing[];
//     href?: string; // "mehr" link
// };

// /**
//  * ✅ Detail page type (Payload-ready)
//  * Keep these optional so your UI only renders what exists.
//  */
// export type EstateDetails = Listing & {
//     videoSrc?: string;
//     gallery?: string[];
//     geo?: GeoPoint;
//     price?: number;
//     currency?: "EUR";
//     livingArea?: number;
//     plotArea?: number;
//     rooms?: number;
//     bedrooms?: number;
//     bathrooms?: number;
//     yearBuilt?: number;
//     energyClass?: string;
//     heatingType?: string;
//     commissionText?: string;
//     availability?: string;
//     description?: string;
//     highlights?: string[];
//     features?: string[];
// };


// export type GeoPoint = {
//     lat: number;
//     lng: number;
// };

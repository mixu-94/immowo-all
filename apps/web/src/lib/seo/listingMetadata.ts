// src/lib/seo/listingMetadata.ts
import type { Metadata } from "next";
import type { EstateDetails } from "@/lib/types/listings";

const SITE_NAME = "Immowo Ventures";
const DEFAULT_OG = "/assets/images/real-estate/realestate1.jpg"; // optional
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL; // z.B. https://deine-domain.de

function clean(text: string) {
    return text.replace(/\s+/g, " ").trim();
}

function truncate(text: string, max = 160) {
    const t = clean(text);
    return t.length <= max ? t : t.slice(0, max - 1) + "…";
}

function formatEUR(value?: number | null) {
    if (!value || value <= 0) return "Preis auf Anfrage";
    return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
    }).format(value);
}

export function buildListingMetadata(listing: EstateDetails): Metadata {
    const anyListing = listing as any;
    const slug = anyListing.slug ?? listing.id;
    const url = BASE_URL ? `${BASE_URL}/objekte/${slug}` : undefined;

    const location =
        anyListing.locationLabel ??
        anyListing.locationInfo?.label ??
        listing.location ??
        anyListing.locationInfo?.region ??
        "";

    const priceLabel = formatEUR(anyListing.price ?? anyListing.pricing?.price ?? null);
    const rooms = anyListing.rooms ?? anyListing.facts?.rooms;
    const area = anyListing.livingArea ?? anyListing.facts?.livingArea;
    const energyClass = anyListing.energyClass ?? anyListing.energy?.class;

    // Title: Marke | Titel – Location (kurz, suchrelevant)
    const titleParts = [
        listing.title,
        location ? `– ${location}` : "",
        `| ${SITE_NAME}`,
    ].filter(Boolean);
    const title = clean(titleParts.join(" "));

    // Description: datenreich, seriös, CTA soft
    const descBits = [
        location ? `Standort: ${location}.` : "",
        area ? `Wohnfläche ca. ${area} m².` : "",
        rooms ? `${rooms} Zimmer.` : "",
        energyClass ? `Energieklasse ${energyClass}.` : "",
        `Preis: ${priceLabel}.`,
        `Exposé & Unterlagen auf Anfrage. Persönliche Beratung & transparente Abwicklung.`,
    ].filter(Boolean);

    const description = truncate(descBits.join(" "));

    // OG image: hero image if exists — must be absolute URL for social share
    const rawOgImage =
        listing.imageSrc ??
        anyListing.imageSrc ??
        anyListing.media?.heroImage ??
        DEFAULT_OG;

    // Ensure absolute URL (Payload returns relative paths like /api/media/file/...)
    const ogImage =
        rawOgImage && BASE_URL && !rawOgImage.startsWith("http")
            ? `${BASE_URL}${rawOgImage}`
            : rawOgImage;

    return {
        title,
        description,
        alternates: url ? { canonical: url } : undefined,
        openGraph: {
            title,
            description,
            type: "article",
            siteName: SITE_NAME,
            url,
            images: ogImage
                ? [{ url: ogImage, width: 1200, height: 630, alt: listing.title }]
                : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ogImage ? [ogImage] : undefined,
        },
    };
}
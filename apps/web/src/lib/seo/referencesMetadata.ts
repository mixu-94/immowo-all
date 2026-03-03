// src/lib/seo/referencesMetadata.ts
import type { Metadata } from "next";
import { Reference } from "../types/references";

const SITE_NAME = "Immowo Ventures";
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

function clean(text: string) {
    return text.replace(/\s+/g, " ").trim();
}

function truncate(text: string, max = 160) {
    const t = clean(text);
    return t.length <= max ? t : t.slice(0, max - 1) + "…";
}

export function buildReferenceMetadata(ref: Reference): Metadata {
    const url = BASE_URL ? `${BASE_URL}/referenzen/${ref.slug}` : undefined;

    const location = ref.location?.label ?? ref.location?.region ?? "";
    const title = clean(`${ref.title}${location ? ` – ${location}` : ""} | Referenzen | ${SITE_NAME}`);

    const descBits = [
        `${ref.category} • ${ref.year}`,
        location ? `Region: ${location}.` : "",
        ref.subtitle ? ref.subtitle : "",
        ref.description,
        ref.highlights?.length ? `Highlights: ${ref.highlights.slice(0, 4).join(", ")}.` : "",
        "Referenzprojekt – Details & Einblick auf Anfrage.",
    ].filter(Boolean);

    const description = truncate(descBits.join(" "));

    const rawOgImage =
        ref.seo?.ogImage ??
        ref.coverImage?.src ??
        "/assets/images/real-estate/realestate1.jpg";

    // Ensure absolute URL for social share
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
                ? [{ url: ogImage, width: 1200, height: 630, alt: ref.title }]
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

/** Für /referenzen Indexseite */
export function buildReferencesIndexMetadata(): Metadata {
    const title = `Referenzen | ${SITE_NAME}`;
    const description = truncate(
        "Abgeschlossene Projekte: Neubau, Sanierung, Projektentwicklung und Verkauf. Premium Präsentation, diskrete Details auf Anfrage."
    );

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "website",
            siteName: SITE_NAME,
            url: BASE_URL ? `${BASE_URL}/referenzen` : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}
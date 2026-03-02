import type { EstateDetails } from "@/lib/types/listings";

export function formatEUR(value: number) {
    return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
    }).format(value);
}

export type ListingVariant = "build" | "ready" | "investment" | "default";
export type ListingStatus = "verfügbar" | "reserviert" | "verkauft" | "in_bau";

export function getListingVariant(listing: EstateDetails): ListingVariant {
    const anyListing = listing as any;

    const explicit = (anyListing.variant ??
        anyListing.estateType ??
        anyListing.type) as ListingVariant | string | undefined;

    if (explicit === "build" || explicit === "ready" || explicit === "investment") {
        return explicit;
    }

    const haystack = [
        listing.badge ?? "",
        listing.title ?? "",
        ...(listing.highlights ?? []),
        ...(listing.features ?? []),
    ]
        .join(" ")
        .toLowerCase();

    if (/(projekt|neubau|bauphase|kauf ab plan|ab plan|vom papier|grundstück|rohbau|kfw)/.test(haystack)) {
        return "build";
    }
    if (/(kapitalanlage|rendite|vermietet|miete|investment)/.test(haystack)) {
        return "investment";
    }
    if (/(bezugsfertig|schlüsselfertig|einzug|sofort)/.test(haystack)) {
        return "ready";
    }

    return "default";
}

export function getListingStatus(listing: EstateDetails): ListingStatus {
    const anyListing = listing as any;

    const explicit = (anyListing.status ??
        anyListing.availabilityStatus) as ListingStatus | string | undefined;

    if (
        explicit === "verfügbar" ||
        explicit === "reserviert" ||
        explicit === "verkauft" ||
        explicit === "in_bau"
    ) {
        return explicit;
    }

    const haystack = [
        listing.badge ?? "",
        anyListing.statusText ?? "",
        listing.availability ?? "",
        listing.title ?? "",
    ]
        .join(" ")
        .toLowerCase();

    if (listing.price === 0) return "verkauft";
    if (/(verkauft|sold)/.test(haystack)) return "verkauft";
    if (/(reserviert|reserved)/.test(haystack)) return "reserviert";
    if (/(in bau|bauphase|rohbau)/.test(haystack)) return "in_bau";

    return "verfügbar";
}

export function extractKfw(listing: EstateDetails): string | undefined {
    const haystack = [
        listing.badge ?? "",
        listing.title ?? "",
        ...(listing.highlights ?? []),
        ...(listing.features ?? []),
    ].join(" ");

    const m = haystack.match(/\bKfW\s*(\d{2})\b/i);
    if (m?.[1]) return `KfW ${m[1]}`;

    return undefined;
}

export function extractEnergy(listing: EstateDetails): {
    certificateType?: "bedarf" | "verbrauch";
    value?: number;
    class?: string;
    carrier?: string;
    year?: number;
} {
    const anyListing = listing as any;

    const certificateType = (anyListing.energyCertificateType ??
        anyListing.energy?.certificateType) as "bedarf" | "verbrauch" | undefined;

    const valueRaw = anyListing.energyValue ?? anyListing.energy?.value;
    const value = typeof valueRaw === "number" ? valueRaw : undefined;

    const cls = (anyListing.energyClass ??
        anyListing.energy?.class ??
        (listing as any).energyClass) as string | undefined;

    const carrier = (anyListing.heatingType ??
        anyListing.energyCarrier ??
        anyListing.energy?.carrier ??
        listing.heatingType) as string | undefined;

    const year = (anyListing.energyYear ?? anyListing.energy?.year ?? listing.yearBuilt) as
        | number
        | undefined;

    return { certificateType, value, class: cls, carrier, year };
}

// // components/objekte/utils.ts
// import type { EstateDetails } from "@/lib/types/listings";

// export function formatEUR(value: number) {
//     return new Intl.NumberFormat("de-DE", {
//         style: "currency",
//         currency: "EUR",
//         maximumFractionDigits: 0,
//     }).format(value);
// }

// export type ListingVariant = "build" | "ready" | "investment" | "default";
// export type ListingStatus = "verfügbar" | "reserviert" | "verkauft" | "in_bau";

// export function getListingVariant(listing: EstateDetails): ListingVariant {
//     const anyListing = listing as any;
//     const explicit = (anyListing.variant ?? anyListing.estateType ?? anyListing.type) as
//         | ListingVariant
//         | string
//         | undefined;

//     if (explicit === "build" || explicit === "ready" || explicit === "investment") return explicit;

//     const haystack = [
//         listing.badge ?? "",
//         listing.title ?? "",
//         ...(listing.highlights ?? []),
//         ...(listing.features ?? []),
//     ]
//         .join(" ")
//         .toLowerCase();

//     if (/(projekt|neubau|bauphase|vom papier|grundstück|rohbau|kfw)/.test(haystack)) return "build";
//     if (/(kapitalanlage|rendite|vermietet|miete|investment)/.test(haystack)) return "investment";
//     if (/(bezugsfertig|schlüsselfertig|einzug|sofort)/.test(haystack)) return "ready";

//     return "default";
// }

// export function getListingStatus(listing: EstateDetails): ListingStatus {
//     const anyListing = listing as any;
//     const explicit = (anyListing.status ?? anyListing.availabilityStatus) as ListingStatus | string | undefined;
//     if (explicit === "verfügbar" || explicit === "reserviert" || explicit === "verkauft" || explicit === "in_bau") {
//         return explicit;
//     }

//     const haystack = [
//         listing.badge ?? "",
//         anyListing.statusText ?? "",
//         listing.availability ?? "",
//         listing.title ?? "",
//     ]
//         .join(" ")
//         .toLowerCase();

//     if (listing.price === 0) return "verkauft";
//     if (/(verkauft|sold)/.test(haystack)) return "verkauft";
//     if (/(reserviert|reserved)/.test(haystack)) return "reserviert";
//     if (/(in bau|bauphase|rohbau)/.test(haystack)) return "in_bau";
//     return "verfügbar";
// }

// export function extractKfw(listing: EstateDetails): string | undefined {
//     const haystack = [
//         listing.badge ?? "",
//         listing.title ?? "",
//         ...(listing.highlights ?? []),
//         ...(listing.features ?? []),
//     ].join(" ");

//     const m = haystack.match(/\bKfW\s*(\d{2})\b/i);
//     if (m?.[1]) return `KfW ${m[1]}`;
//     return undefined;
// }

// export function extractEnergy(listing: EstateDetails): {
//     certificateType?: "bedarf" | "verbrauch";
//     value?: number;
//     class?: string;
//     carrier?: string;
//     year?: number;
// } {
//     const anyListing = listing as any;

//     const certificateType = (anyListing.energyCertificateType ?? anyListing.energy?.certificateType) as
//         | "bedarf"
//         | "verbrauch"
//         | undefined;

//     const valueRaw = anyListing.energyValue ?? anyListing.energy?.value;
//     const value = typeof valueRaw === "number" ? valueRaw : undefined;

//     const cls = (anyListing.energyClass ?? anyListing.energy?.class ?? (listing as any).energyClass) as
//         | string
//         | undefined;

//     const carrier = (anyListing.heatingType ?? anyListing.energyCarrier ?? anyListing.energy?.carrier ?? listing.heatingType) as
//         | string
//         | undefined;

//     const year = (anyListing.energyYear ?? anyListing.energy?.year ?? listing.yearBuilt) as number | undefined;

//     return { certificateType, value, class: cls, carrier, year };
// }
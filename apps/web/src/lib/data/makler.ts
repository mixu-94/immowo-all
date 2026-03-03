import type { MaklerContact } from "@/lib/types/listings";
import { payloadFind } from "@/lib/payloud";

const PAYLOAD_BASE_URL = process.env.PAYLOAD_BASE_URL ?? "";

function resolveMediaUrl(url?: string | null): string | undefined {
    if (!url) return undefined;
    if (url.startsWith("http")) return url;
    return `${PAYLOAD_BASE_URL}${url}`;
}

type PayloadMakler = {
    id: number | string;
    name: string;
    titleRole?: string;
    phone?: string;
    email?: string;
    photo?: { url?: string } | null;
    availability?: string;
    focus?: { tag: string }[];
};

function mapPayloadMakler(m: PayloadMakler): MaklerContact {
    return {
        id: String(m.id),
        name: m.name,
        titleRole: m.titleRole,
        phone: m.phone,
        email: m.email,
        photoUrl: resolveMediaUrl(m.photo?.url),
        availability: m.availability,
        focus: m.focus?.map((f) => f.tag),
    };
}

// Fallback data shown when Payload is unreachable
const FALLBACK_MAKLER: MaklerContact[] = [
    {
        id: "fallback-1",
        name: "Max Mustermann",
        titleRole: "Immobilienberater",
        phone: "+49 821 123 456",
        email: "kontakt@immowo.de",
        availability: "Mo\u2013Fr 9\u201318 Uhr",
        focus: ["Schl\u00fcsselfertig", "Kauf ab Plan"],
    },
    {
        id: "fallback-2",
        name: "Julia Musterfrau",
        titleRole: "Projektentwicklung",
        phone: "+49 821 123 457",
        email: "kontakt@immowo.de",
        availability: "Mo\u2013Fr 9\u201317 Uhr",
        focus: ["Bautr\u00e4ger", "Kapitalanlage"],
    },
];

export async function getMakler(): Promise<MaklerContact[]> {
    try {
        const res = await payloadFind<PayloadMakler>(
            "makler",
            { limit: 20 },
            { next: { revalidate: 300, tags: ["makler"] } },
        );
        if (!res.docs?.length) return FALLBACK_MAKLER;
        return res.docs.map(mapPayloadMakler);
    } catch {
        return FALLBACK_MAKLER;
    }
}

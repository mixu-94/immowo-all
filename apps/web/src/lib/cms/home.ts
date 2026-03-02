// src/lib/cms/home.ts
import { cache } from "react";
import { payloadGlobal } from "@/lib/payloud";

export type HomeHeaderContent = {
    badge: string;
    headline: {
        before: string;
        highlight: string;
        after: string;
    };
    subline: {
        text: string;
        highlight: string;
    };
    trustPills: string[];
    scrollHint: string;
    video: {
        src: string;
        type: string;
    };
};

export type HomeContent = {
    header: HomeHeaderContent;
};

export const DEFAULT_HOME_CONTENT: HomeContent = {
    header: {
        badge: "BAUTRÄGER • VERKAUF • PROJEKTENTWICKLUNG",
        headline: {
            before: "Immobilien, die",
            highlight: "überzeugen",
            after: ".",
        },
        subline: {
            text: "Schlüsselfertige Objekte und Neubauprojekte",
            highlight: "Kauf ab Plan",
        },
        trustPills: ["Transparenter Prozess", "Saubere Unterlagen", "Qualität bis zur Übergabe"],
        scrollHint: "Scrollen, um mehr zu entdecken",
        video: { src: "/assets/videos/beach.mp4", type: "video/mp4" },
    },
};

type PayloadHome = {
    badge?: string;
    headline?: { before?: string; highlight?: string; after?: string };
    subline?: { text?: string; highlight?: string };
    trustPills?: { text: string }[];
    scrollHint?: string;
    heroVideo?: { src?: string; type?: string };
};

function mapPayloadToHomeContent(p: PayloadHome): HomeContent {
    const def = DEFAULT_HOME_CONTENT.header;
    return {
        header: {
            badge: p.badge ?? def.badge,
            headline: {
                before: p.headline?.before ?? def.headline.before,
                highlight: p.headline?.highlight ?? def.headline.highlight,
                after: p.headline?.after ?? def.headline.after,
            },
            subline: {
                text: p.subline?.text ?? def.subline.text,
                highlight: p.subline?.highlight ?? def.subline.highlight,
            },
            trustPills: p.trustPills?.map((t) => t.text) ?? def.trustPills,
            scrollHint: p.scrollHint ?? def.scrollHint,
            video: {
                src: p.heroVideo?.src ?? def.video.src,
                type: p.heroVideo?.type ?? def.video.type,
            },
        },
    };
}

export const fetchHomeContent = cache(async (): Promise<HomeContent> => {
    try {
        const data = await payloadGlobal<PayloadHome>(
            "home",
            { depth: 1 },
            { next: { revalidate: 300, tags: ["home"] } },
        );
        return mapPayloadToHomeContent(data);
    } catch (err) {
        console.warn("[fetchHomeContent] Payload nicht erreichbar, nutze Fallback.", err);
        return DEFAULT_HOME_CONTENT;
    }
});

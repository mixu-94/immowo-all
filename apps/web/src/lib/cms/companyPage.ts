// lib/cms/companyPage.ts
import { cache } from "react";
import { payloadGlobal } from "@/lib/payloud";

export type CompanyPageContent = {
    hero: {
        badge: string;
        headlineTop: string;
        headlineMuted: string;
        headlineGradient: string;
        description: string;
        primaryCta: { label: string; href: string };
        secondaryCta: { label: string; href: string };
        cards: { title: string; text: string }[];
        images: { a: string; b: string; c: string; d: string };
    };
    highlights: {
        image: { src: string; alt: string };
        title: string;
        description: string;
        bullets: string[];
    };
    process: {
        title: string;
        description: string;
        steps: { title: string; text: string }[];
    };
    pillars: {
        title: string;
        description: string;
        items: { title: string; text: string; icon: "Building" | "Sparkles" | "Home" | "FileCheck2" }[];
    };
    stats: {
        items: { label: string; value: string; icon: "Building2" | "ShieldCheck" | "Scale" | "Handshake" }[];
    };
    cta: {
        title: string;
        description: string;
        primaryCta: { label: string; href: string };
        secondaryCta: { label: string; href: string };
    };
};

export const DEFAULT_COMPANY_PAGE_CONTENT: CompanyPageContent = {
    hero: {
        badge: "BAUTRÄGER • VERKAUF • PROJEKTENTWICKLUNG",
        headlineTop: "Unternehmen",
        headlineMuted: " – Immobilien, die wir",
        headlineGradient: "bauen & verkaufen.",
        description:
            "Wir verbinden Bautr\u00e4ger-Kompetenz mit einem klaren Verkaufsprozess: Neubau \u201eKauf ab Plan\u201c, schl\u00fcsselfertige Immobilien und ausgew\u00e4hlte Bestandsobjekte \u2013 professionell, transparent und hochwertig pr\u00e4sentiert.",
        primaryCta: { label: "Aktuelle Angebote", href: "/immobilien" },
        secondaryCta: { label: "Projekt anfragen", href: "/kontakt" },
        cards: [
            { title: "Bauträger", text: "Planung → Bau → Übergabe" },
            { title: "Verkauf", text: "Klarer Prozess & Unterlagen" },
            { title: "Qualität", text: "Saubere Ausführung & Standards" },
        ],
        images: {
            a: "/assets/images/real-estate/realestate1.jpg",
            b: "/assets/images/real-estate/realestate2.jpg",
            c: "/assets/images/real-estate/realestate3.jpg",
            d: "/assets/images/real-estate/realestate4.jpg",
        },
    },
    highlights: {
        image: { src: "/assets/images/real-estate/realestate6.jpg", alt: "Immobilienqualität und Baukompetenz" },
        title: "Warum Kunden mit uns arbeiten",
        description:
            "Weil wir Immobilien nicht nur 'vermitteln', sondern ganzheitlich denken: Bau, Qualit\u00e4t, Dokumentation und ein sauberer Prozess sind entscheidend.",
        bullets: [
            "Bauträger-Projekte von der Planung bis zur Übergabe",
            "Verkauf schlüsselfertiger Immobilien & ausgewählter Bestandsobjekte",
            "Saubere Unterlagen, klare Kommunikation, strukturierte Abwicklung",
            "Hochwertige Präsentation für schnelle, sichere Entscheidungen",
        ],
    },
    process: {
        title: "So läuft es bei uns",
        description:
            "Ein schlanker Prozess – egal ob schlüsselfertig oder Neubauprojekt (Kauf ab Plan). Klarheit gewinnt.",
        steps: [
            { title: "Erstgespräch & Bedarf", text: "Wir klären Ziel, Budget, Zeitplan und Anforderungen – ohne Umwege." },
            { title: "Objekt / Projekt passend wählen", text: "Neubau (Kauf ab Plan) oder Bestandsobjekt – mit klaren Eckdaten und Unterlagen." },
            { title: "Unterlagenpaket & Transparenz", text: "Exposé, Leistungsbeschreibung, Kosten-/Zeitplan (wo relevant) – sauber und nachvollziehbar." },
            { title: "Besichtigung / Beratung", text: "Effizient geplant, gut vorbereitet – damit du schnell eine fundierte Entscheidung triffst." },
            { title: "Abwicklung bis Übergabe", text: "Koordiniert, dokumentiert, fair – inklusive Support bis zum Abschluss." },
        ],
    },
    pillars: {
        title: "Wofür wir stehen",
        description:
            "Immobilien sind Vertrauenssache. Deshalb kombinieren wir Baukompetenz mit einem modernen, transparenten Verkaufsprozess – ohne unnötigen Schnickschnack.",
        items: [
            { icon: "Building", title: "Bauträger-Projekte", text: "Von der Idee über Planung und Bau bis zur schlüsselfertigen Übergabe – effizient, strukturiert und mit klarem Qualitätsanspruch." },
            { icon: "Sparkles", title: "Kauf ab Plan", text: "Frühzeitige Vermarktung inkl. Visuals, Unterlagenpaket und transparenter Käuferreise – ideal für Neubauprojekte." },
            { icon: "Home", title: "Schlüsselfertige Immobilien", text: "Ausgewählte Objekte mit hochwertiger Ausstattung – sauber präsentiert, klar dokumentiert und professionell begleitet." },
            { icon: "FileCheck2", title: "Unterlagen & Prozesse", text: "Exposé, Bau- und Leistungsbeschreibungen, Klarheit zu Ablauf und Konditionen – damit Entscheidungen schnell und sicher möglich sind." },
        ],
    },
    stats: {
        items: [
            { icon: "Building2", label: "Fokus", value: "Bauträger & Verkauf" },
            { icon: "ShieldCheck", label: "Qualität", value: "Saubere Standards" },
            { icon: "Scale", label: "Transparenz", value: "Klare Unterlagen" },
            { icon: "Handshake", label: "Abwicklung", value: "Zuverlässig & fair" },
        ],
    },
    cta: {
        title: "Bereit für den nächsten Schritt?",
        description:
            "Ob Neubau (Kauf ab Plan) oder schlüsselfertiges Objekt – wir geben dir schnell Klarheit zu Ablauf, Unterlagen und Möglichkeiten.",
        primaryCta: { label: "Kontakt aufnehmen", href: "/kontakt" },
        secondaryCta: { label: "Angebote ansehen", href: "/immobilien" },
    },
};

// ─── Payload response shape ───────────────────────────────────────────────────

type PayloadMedia = { url?: string; alt?: string } | null

type PayloadUnternehmen = {
    badge?: string
    headlineTop?: string
    headlineMuted?: string
    headlineGradient?: string
    description?: string
    primaryCta?: { label?: string; href?: string }
    secondaryCta?: { label?: string; href?: string }
    heroCards?: { title: string; text: string }[]
    heroImages?: { a?: PayloadMedia; b?: PayloadMedia; c?: PayloadMedia; d?: PayloadMedia }

    highlightsTitle?: string
    highlightsDescription?: string
    highlightsImage?: PayloadMedia
    highlightsBullets?: { text: string }[]

    processTitle?: string
    processDescription?: string
    steps?: { title: string; text: string }[]

    pillarsTitle?: string
    pillarsDescription?: string
    pillars?: { icon: string; title: string; text: string }[]

    stats?: { icon?: string; value: string; label: string }[]

    ctaTitle?: string
    ctaDescription?: string
    ctaPrimaryLabel?: string
    ctaPrimaryHref?: string
    ctaSecondaryLabel?: string
    ctaSecondaryHref?: string
}

const BASE_URL = process.env.PAYLOAD_BASE_URL ?? ""

function mediaUrl(m: PayloadMedia, fallback: string): string {
    if (!m?.url) return fallback
    return m.url.startsWith("http") ? m.url : `${BASE_URL}${m.url}`
}

function mapPayloadToCompanyPageContent(p: PayloadUnternehmen): CompanyPageContent {
    const def = DEFAULT_COMPANY_PAGE_CONTENT

    return {
        hero: {
            badge: p.badge ?? def.hero.badge,
            headlineTop: p.headlineTop ?? def.hero.headlineTop,
            headlineMuted: p.headlineMuted ?? def.hero.headlineMuted,
            headlineGradient: p.headlineGradient ?? def.hero.headlineGradient,
            description: p.description ?? def.hero.description,
            primaryCta: {
                label: p.primaryCta?.label ?? def.hero.primaryCta.label,
                href: p.primaryCta?.href ?? def.hero.primaryCta.href,
            },
            secondaryCta: {
                label: p.secondaryCta?.label ?? def.hero.secondaryCta.label,
                href: p.secondaryCta?.href ?? def.hero.secondaryCta.href,
            },
            cards: p.heroCards?.length ? p.heroCards : def.hero.cards,
            images: {
                a: mediaUrl(p.heroImages?.a ?? null, def.hero.images.a),
                b: mediaUrl(p.heroImages?.b ?? null, def.hero.images.b),
                c: mediaUrl(p.heroImages?.c ?? null, def.hero.images.c),
                d: mediaUrl(p.heroImages?.d ?? null, def.hero.images.d),
            },
        },
        highlights: {
            title: p.highlightsTitle ?? def.highlights.title,
            description: p.highlightsDescription ?? def.highlights.description,
            image: {
                src: mediaUrl(p.highlightsImage ?? null, def.highlights.image.src),
                alt: p.highlightsImage?.alt ?? def.highlights.image.alt,
            },
            bullets: p.highlightsBullets?.map((b) => b.text) ?? def.highlights.bullets,
        },
        process: {
            title: p.processTitle ?? def.process.title,
            description: p.processDescription ?? def.process.description,
            steps: p.steps?.length ? p.steps : def.process.steps,
        },
        pillars: {
            title: p.pillarsTitle ?? def.pillars.title,
            description: p.pillarsDescription ?? def.pillars.description,
            items: p.pillars?.length
                ? p.pillars.map((item) => ({
                      icon: item.icon as CompanyPageContent["pillars"]["items"][number]["icon"],
                      title: item.title,
                      text: item.text,
                  }))
                : def.pillars.items,
        },
        stats: {
            items: p.stats?.length
                ? p.stats.map((s) => ({
                      icon: (s.icon ?? "Building2") as CompanyPageContent["stats"]["items"][number]["icon"],
                      value: s.value,
                      label: s.label,
                  }))
                : def.stats.items,
        },
        cta: {
            title: p.ctaTitle ?? def.cta.title,
            description: p.ctaDescription ?? def.cta.description,
            primaryCta: {
                label: p.ctaPrimaryLabel ?? def.cta.primaryCta.label,
                href: p.ctaPrimaryHref ?? def.cta.primaryCta.href,
            },
            secondaryCta: {
                label: p.ctaSecondaryLabel ?? def.cta.secondaryCta.label,
                href: p.ctaSecondaryHref ?? def.cta.secondaryCta.href,
            },
        },
    }
}

export const fetchCompanyPageContent = cache(async (): Promise<CompanyPageContent> => {
    try {
        const data = await payloadGlobal<PayloadUnternehmen>(
            "unternehmen",
            { depth: 2 },
            { next: { revalidate: 300, tags: ["unternehmen"] } },
        )
        return mapPayloadToCompanyPageContent(data)
    } catch (err) {
        console.warn("[fetchCompanyPageContent] Payload nicht erreichbar, nutze Fallback.", err)
        return DEFAULT_COMPANY_PAGE_CONTENT
    }
})

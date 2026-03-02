// src/content/companyPageContent.ts
export type CompanyHeroContent = {
    headline: string;
    subheadline: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    trustLine: string;
};

export type CompanyHighlightItem = {
    title: string;
    description: string;
};

export type CompanyHighlightsContent = {
    title: string;
    items: CompanyHighlightItem[];
};

export type CompanyProcessStep = {
    title: string;
    description: string;
};

export type CompanyProcessContent = {
    title: string;
    steps: CompanyProcessStep[];
};

export type CompanyPillar = {
    title: string;
    description: string;
};

export type CompanyPillarsContent = {
    title: string;
    pillars: CompanyPillar[];
};

export type CompanyStat = {
    label: string;
    value: string;
    hint?: string;
};

export type CompanyStatsContent = {
    title: string;
    stats: CompanyStat[];
};

export type CompanyCtaContent = {
    title: string;
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
    note?: string;
};

export type CompanyPageContent = {
    hero: CompanyHeroContent;
    highlights: CompanyHighlightsContent;
    process: CompanyProcessContent;
    pillars: CompanyPillarsContent;
    stats: CompanyStatsContent;
    cta: CompanyCtaContent;
};

/**
 * ✅ Fallback / Default Copy (professionell, ruhig, premium)
 * Später ersetzt du diese Defaults mit CMS-Daten – Komponenten bleiben gleich.
 */
export const DEFAULT_COMPANY_PAGE_CONTENT: CompanyPageContent = {
    hero: {
        headline: "Immobilien kaufen – schlüsselfertig, Bestand & Neubauprojekte (Kauf ab Plan)",
        subheadline:
            "Immowo Ventures vermittelt ausgewählte Immobilien und Bauträgerprojekte. Diskret in der Vermarktung, transparent in der Abwicklung – mit Unterlagen auf Anfrage und persönlicher Beratung.",
        primaryCta: { label: "Unterlagen anfordern", href: "/kontakt?anfrage=expose" },
        secondaryCta: { label: "Angebote ansehen", href: "/immobilien" },
        trustLine: "Diskrete Vermarktung • Klare Objektinformationen • Verlässliche Begleitung bis zum Abschluss",
    },

    highlights: {
        title: "Worauf Sie sich verlassen können",
        items: [
            {
                title: "Schlüsselfertig",
                description:
                    "Bezugsfertige Immobilien mit klaren Eckdaten – ideal für Eigennutzer und Investoren mit Anspruch an Planbarkeit.",
            },
            {
                title: "Bestandsimmobilien",
                description:
                    "Sorgfältig ausgewählte Objekte mit transparenter Einordnung zu Zustand, Potenzialen und relevanten Unterlagen.",
            },
            {
                title: "Neubau (Kauf ab Plan)",
                description:
                    "Bauträgerprojekte mit strukturiertem Ablauf. Visualisierungen, Leistungsbeschreibung und Zeitplan erhalten Sie auf Anfrage.",
            },
            {
                title: "Diskretion & Klarheit",
                description:
                    "Exposé, Grundriss und Lage-Details stellen wir aus Diskretionsgründen erst nach Anfrage bereit – klar, geordnet, nachvollziehbar.",
            },
        ],
    },

    process: {
        title: "So läuft die Anfrage ab",
        steps: [
            {
                title: "Anfrage senden",
                description:
                    "Teilen Sie uns kurz mit, welches Objekt Sie interessiert – gern mit Rückruf- oder Terminwunsch.",
            },
            {
                title: "Unterlagen erhalten",
                description:
                    "Sie bekommen Exposé und Dokumente strukturiert aufbereitet – auf Wunsch inklusive kompaktem Überblick zu den Eckdaten.",
            },
            {
                title: "Besichtigung & Abschluss",
                description:
                    "Wir koordinieren den nächsten Schritt, klären offene Punkte und begleiten Sie zuverlässig bis zur Entscheidung.",
            },
        ],
    },

    pillars: {
        title: "Unser Anspruch",
        pillars: [
            {
                title: "Qualität vor Quantität",
                description:
                    "Wir setzen auf ausgewählte Objekte und Projekte statt auf Masse – mit Fokus auf Substanz, Lage und Nachvollziehbarkeit.",
            },
            {
                title: "Transparenz im Prozess",
                description:
                    "Klare Kommunikation, nachvollziehbare Unterlagen und ein Ablauf, der die wichtigsten Fragen früh beantwortet.",
            },
            {
                title: "Diskretion als Standard",
                description:
                    "Sensible Details werden geschützt. Informationen erhalten Sie auf Anfrage – professionell und zielgerichtet.",
            },
        ],
    },

    stats: {
        title: "Kompakt auf den Punkt",
        stats: [
            { label: "Objektfokus", value: "Bestand & Neubau", hint: "Schlüsselfertig & Kauf ab Plan" },
            { label: "Unterlagen", value: "Auf Anfrage", hint: "Exposé, Grundrisse, Details" },
            { label: "Abwicklung", value: "Strukturiert", hint: "Vom Erstkontakt bis zum Abschluss" },
            { label: "Kommunikation", value: "Persönlich", hint: "Direkt, diskret, verbindlich" },
        ],
    },

    cta: {
        title: "Unterlagen anfordern – diskret und unkompliziert",
        description:
            "Exposé, Grundriss und Detailinformationen erhalten Sie aus Diskretionsgründen auf Anfrage. Hinterlassen Sie Ihre Kontaktdaten – wir melden uns zeitnah.",
        primaryCta: { label: "Unterlagen anfordern", href: "/kontakt?anfrage=expose" },
        secondaryCta: { label: "Rückruf anfragen", href: "/kontakt?anfrage=rueckruf" },
        note: "Hinweis: Adresse und bestimmte Objektinformationen werden erst nach qualifizierter Anfrage bereitgestellt.",
    },
};
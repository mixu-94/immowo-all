// src/lib/cms/legalPages.ts
import { cache } from "react";
import { payloadGlobal } from "@/lib/payloud";

export type LexicalContent = Record<string, unknown>;

// Strukturierte Felder fuer Impressum (gemaess § 5 TMG)
export type ImpressumContent = {
  company?: string | null;
  streetAddress?: string | null;
  city?: string | null;
  country?: string | null;
  ceo?: string | null;
  responsible?: string | null;
  phone?: string | null;
  email?: string | null;
  registergericht?: string | null;
  hrb?: string | null;
  ustId?: string | null;
  gewo34cText?: string | null;
  streitbeilegung?: LexicalContent | null;
  lastUpdated?: string | null;
  updatedAt?: string;
};

// Einfacher RichText-Content fuer alle anderen Legal Pages
export type LegalPageContent = {
  content?: LexicalContent | null;
  dpo?: { name?: string | null; email?: string | null; phone?: string | null } | null;
  updatedAt?: string;
};

const slugMap = {
  impressum: "impressum",
  datenschutz: "datenschutz",
  agb: "agb",
  widerruf: "widerruf",
  cookies: "cookies",
} as const;

type LegalSlug = keyof typeof slugMap;

async function fetchLegalPage(slug: LegalSlug): Promise<LegalPageContent> {
  try {
    const data = await payloadGlobal<{
      content?: LexicalContent | null;
      dpo?: { name?: string | null; email?: string | null; phone?: string | null } | null;
      updatedAt?: string;
    }>(
      slugMap[slug],
      { depth: 0 },
      { next: { revalidate: 300, tags: [slug] } },
    );
    return {
      content: data.content ?? null,
      dpo: data.dpo ?? null,
      updatedAt: data.updatedAt,
    };
  } catch {
    return { content: null };
  }
}

export const fetchImpressum = cache(async (): Promise<ImpressumContent> => {
  try {
    const data = await payloadGlobal<ImpressumContent>(
      "impressum",
      { depth: 0 },
      { next: { revalidate: 300, tags: ["impressum"] } },
    );
    return data;
  } catch {
    return {};
  }
});

export const fetchDatenschutz = cache(() => fetchLegalPage("datenschutz"));
export const fetchAgb = cache(() => fetchLegalPage("agb"));
export const fetchWiderruf = cache(() => fetchLegalPage("widerruf"));
export const fetchCookies = cache(() => fetchLegalPage("cookies"));

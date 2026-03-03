// src/lib/cms/legalPages.ts
import { cache } from "react";
import { payloadGlobal } from "@/lib/payloud";

export type LexicalContent = Record<string, unknown>;

export type LegalPageContent = {
  content?: LexicalContent | null;
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

type PayloadLegalGlobal = {
  content?: LexicalContent | null;
  updatedAt?: string;
};

async function fetchLegalPage(slug: LegalSlug): Promise<LegalPageContent> {
  try {
    const data = await payloadGlobal<PayloadLegalGlobal>(
      slugMap[slug],
      { depth: 0 },
      { next: { revalidate: 300, tags: [slug] } },
    );
    return {
      content: data.content ?? null,
      updatedAt: data.updatedAt,
    };
  } catch {
    return { content: null };
  }
}

export const fetchImpressum = cache(() => fetchLegalPage("impressum"));
export const fetchDatenschutz = cache(() => fetchLegalPage("datenschutz"));
export const fetchAgb = cache(() => fetchLegalPage("agb"));
export const fetchWiderruf = cache(() => fetchLegalPage("widerruf"));
export const fetchCookies = cache(() => fetchLegalPage("cookies"));

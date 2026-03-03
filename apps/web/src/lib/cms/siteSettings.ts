// src/lib/cms/siteSettings.ts
import { cache } from "react";
import { payloadGlobal } from "@/lib/payloud";

export type SocialLink = {
  label: string;
  url: string;
};

export type SiteSettings = {
  brandName: string;
  tagline?: string;
  company: string;
  addressLine1?: string;
  addressLine2?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  socials: SocialLink[];
  footerHeadline?: string;
  footerText?: string;
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  brandName: "Immowo Ventures",
  company: "Immowo Ventures GmbH",
  addressLine1: "Dossenbergerstra\u00dfe 5",
  addressLine2: "89312 G\u00fcnzburg, Deutschland",
  socials: [],
  footerHeadline: "Sprechen wir \u00fcber Ihr Projekt.",
  footerText:
    "Wir begleiten Sie transparent, strukturiert und mit einem hohen Anspruch an Qualit\u00e4t \u2013 vom Erstgespr\u00e4ch bis zur \u00dcbergabe.",
};

type PayloadSiteSettings = {
  brandName?: string;
  tagline?: string;
  company?: string;
  addressLine1?: string;
  addressLine2?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  socials?: { label: string; url: string }[];
  footerHeadline?: string;
  footerText?: string;
};

function mapPayloadToSiteSettings(p: PayloadSiteSettings): SiteSettings {
  const d = DEFAULT_SITE_SETTINGS;
  return {
    brandName: p.brandName ?? d.brandName,
    tagline: p.tagline ?? undefined,
    company: p.company ?? d.company,
    addressLine1: p.addressLine1 ?? d.addressLine1,
    addressLine2: p.addressLine2 ?? d.addressLine2,
    phone: p.phone ?? undefined,
    email: p.email ?? undefined,
    whatsapp: p.whatsapp ?? undefined,
    socials: Array.isArray(p.socials)
      ? p.socials.map((s) => ({ label: s.label, url: s.url }))
      : d.socials,
    footerHeadline: p.footerHeadline ?? d.footerHeadline,
    footerText: p.footerText ?? d.footerText,
  };
}

export const fetchSiteSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const data = await payloadGlobal<PayloadSiteSettings>(
      "siteSettings",
      { depth: 0 },
      { next: { revalidate: 300, tags: ["siteSettings"] } },
    );
    return mapPayloadToSiteSettings(data);
  } catch (err) {
    console.warn(
      "[fetchSiteSettings] Payload nicht erreichbar, nutze Fallback.",
      err,
    );
    return DEFAULT_SITE_SETTINGS;
  }
});

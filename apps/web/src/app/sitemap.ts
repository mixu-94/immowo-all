import { MetadataRoute } from "next";
import { payloadFind } from "@/lib/payloud";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://immowo-ventures.de";

type SlugDoc = { slug: string; updatedAt?: string };

const staticRoutes: MetadataRoute.Sitemap = [
  { url: `${BASE_URL}/`, priority: 1.0, changeFrequency: "weekly" as const },
  {
    url: `${BASE_URL}/immobilien`,
    priority: 0.9,
    changeFrequency: "daily" as const,
  },
  {
    url: `${BASE_URL}/referenzen`,
    priority: 0.8,
    changeFrequency: "weekly" as const,
  },
  {
    url: `${BASE_URL}/unternehmen`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  },
  {
    url: `${BASE_URL}/kontakt`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  },
  {
    url: `${BASE_URL}/bewertung`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  },
  {
    url: `${BASE_URL}/impressum`,
    priority: 0.3,
    changeFrequency: "yearly" as const,
  },
  {
    url: `${BASE_URL}/datenschutz`,
    priority: 0.3,
    changeFrequency: "yearly" as const,
  },
  { url: `${BASE_URL}/agb`, priority: 0.3, changeFrequency: "yearly" as const },
  {
    url: `${BASE_URL}/widerruf`,
    priority: 0.3,
    changeFrequency: "yearly" as const,
  },
  {
    url: `${BASE_URL}/cookies`,
    priority: 0.3,
    changeFrequency: "yearly" as const,
  },
].map((r) => ({ ...r, lastModified: new Date() }));

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let listingEntries: MetadataRoute.Sitemap = [];
  let referenceEntries: MetadataRoute.Sitemap = [];

  try {
    const listings = await payloadFind<SlugDoc>("immobilien", {
      limit: 500,
      depth: 0,
      where: { _status: { equals: "published" } },
    });
    listingEntries = listings.docs
      .filter((l) => l.slug)
      .map((l) => ({
        url: `${BASE_URL}/objekte/${l.slug}`,
        lastModified: l.updatedAt ? new Date(l.updatedAt) : new Date(),
        priority: 0.8,
        changeFrequency: "weekly" as const,
      }));
  } catch {
    // Payload not reachable — skip dynamic entries
  }

  try {
    const references = await payloadFind<SlugDoc>("referenzen", {
      limit: 500,
      depth: 0,
    });
    referenceEntries = references.docs
      .filter((r) => r.slug)
      .map((r) => ({
        url: `${BASE_URL}/referenzen/${r.slug}`,
        lastModified: r.updatedAt ? new Date(r.updatedAt) : new Date(),
        priority: 0.6,
        changeFrequency: "monthly" as const,
      }));
  } catch {
    // Payload not reachable — skip dynamic entries
  }

  return [...staticRoutes, ...listingEntries, ...referenceEntries];
}

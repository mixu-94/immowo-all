// app/(site)/objekte/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ObjectDetailPage } from "@/components/objekte/ObjectDetailPage";
import { buildListingMetadata } from "@/lib/seo/listingMetadata";
import { getAllListingSlugs, getListingBySlug } from "@/lib/data/listings";

// ISR: Seite wird statisch ausgeliefert, aber regelmäßig aktualisiert
export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getAllListingSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const listing = await getListingBySlug(params.slug);
  if (!listing) return { title: "Objekt nicht gefunden | Immowo Ventures" };

  return buildListingMetadata(listing);
}

export default async function Page({ params }: { params: { slug: string } }) {
  const listing = await getListingBySlug(params.slug);
  if (!listing) notFound();

  const anyListing = listing as any;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const slug = anyListing.slug ?? listing.id ?? "";

  const rawOgImage =
    listing.imageSrc ??
    anyListing.imageSrc ??
    anyListing.media?.heroImage ??
    null;

  const absoluteImg =
    rawOgImage && siteUrl && !rawOgImage.startsWith("http")
      ? `${siteUrl}${rawOgImage}`
      : rawOgImage;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: listing.title,
    description:
      anyListing.description ??
      anyListing.shortDescription ??
      `Immobilie: ${listing.title}`,
    url: `${siteUrl}/objekte/${slug}`,
    ...(absoluteImg ? { image: absoluteImg } : {}),
    offers: {
      "@type": "Offer",
      price:
        anyListing.price ?? anyListing.pricing?.price ?? undefined,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "DE",
      addressRegion:
        listing.location ??
        anyListing.locationInfo?.region ??
        anyListing.locationInfo?.label ??
        "",
    },
    broker: {
      "@type": "RealEstateAgent",
      name: "Immowo Ventures",
      url: siteUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ObjectDetailPage listing={listing} />
    </>
  );
}

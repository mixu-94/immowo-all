import type { EstateDetails } from "@/lib/types/listings";
import { ObjectShell } from "./ObjectShell";
import { ObjectHero } from "./ObjectHero";
import { ObjectMain } from "./ObjectMain";
import { ObjectTrust } from "./ObjectTrust";
import { ObjectCTA } from "./ObjectCTA";
import { CommissionGateEnforcer } from "../commission/CommissionGateEnforcer";
import { ShareBar } from "@/components/ui/ShareBar";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export function ObjectDetailPage({ listing }: { listing: EstateDetails }) {
  const anyListing = listing as any;
  const slug = anyListing.slug ?? listing.id ?? "";
  const shareUrl = `${SITE_URL}/objekte/${slug}`;

  return (
    <ObjectShell>
      <CommissionGateEnforcer
        slug={listing.slug}
        commission={listing.buyerCommission}
      />
      <ObjectHero listing={listing} />
      <ObjectMain listing={listing} />
      <ObjectTrust />
      <ObjectCTA listing={listing} />
      {/* Share Buttons */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-10">
        <div className="flex items-center gap-3 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4">
          <span className="text-sm text-[color:var(--color-text-muted)]">Dieses Objekt teilen:</span>
          <ShareBar url={shareUrl} title={listing.title ?? "Immobilie"} />
        </div>
      </section>
    </ObjectShell>
  );
}

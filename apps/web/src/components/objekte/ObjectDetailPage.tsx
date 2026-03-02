import type { EstateDetails } from "@/lib/types/listings";
import { ObjectShell } from "./ObjectShell";
import { ObjectHero } from "./ObjectHero";
import { ObjectMain } from "./ObjectMain";
import { ObjectTrust } from "./ObjectTrust";
import { ObjectCTA } from "./ObjectCTA";
import { CommissionGateEnforcer } from "../commission/CommissionGateEnforcer";

export function ObjectDetailPage({ listing }: { listing: EstateDetails }) {
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
    </ObjectShell>
  );
}

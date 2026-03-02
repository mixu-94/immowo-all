// components/immobilien/ListingsGrid.tsx
import ListingCard from "../listings/ListingCard";
import type { ListingLike } from "./filters";

export function ListingsGrid({ listings }: { listings: ListingLike[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {listings.map((l, i) => (
        <ListingCard
          key={l.slug ?? l.id ?? (l.title ? `${l.title}-${i}` : `row-${i}`)}
          listing={l}
        />
      ))}
    </div>
  );
}

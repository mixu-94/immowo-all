// components/immobilien/ListingCard.tsx
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Ruler, BedDouble, Leaf } from "lucide-react";
import type { ListingLike } from "./filters";

function formatEUR(value?: number) {
  if (!value || value <= 0) return "Preis auf Anfrage";
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function ListingCard({ listing }: { listing: ListingLike }) {
  const slug = listing.slug ?? listing.id ?? "";
  const href = `/objekte/${encodeURIComponent(slug)}`;

  return (
    <Link
      href={href}
      className="
        group relative block overflow-hidden
        rounded-[var(--radius-xl)]
        border border-[color:var(--color-border)]
        bg-[color:var(--color-surface)]
        shadow-[var(--shadow-card)]
        will-change-transform
        transition-[transform,box-shadow,border-color] duration-700 ease-[cubic-bezier(.16,1,.3,1)]
        hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(0,0,0,.45)]
        hover:border-[color:var(--color-border-strong)]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]/60
      "
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={listing.imageSrc ?? "/assets/images/real-estate/realestate1.jpg"}
          alt={listing.title}
          fill
          className="
            object-cover opacity-95
            will-change-transform
            transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)]
            group-hover:scale-[1.08]
          "
          sizes="(max-width: 1024px) 100vw, 33vw"
        />

        {/* Premium overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Subtle gold glow on hover */}
        <div
          className="
            pointer-events-none absolute inset-0
            opacity-0 transition-opacity duration-700 ease-[cubic-bezier(.16,1,.3,1)]
            group-hover:opacity-100
            bg-[radial-gradient(60%_60%_at_50%_20%,rgba(214,181,109,0.18),transparent_65%)]
          "
        />

        {/* Gold accent line */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-accent)]/70 to-transparent" />

        {/* Content on image */}
        <div className="absolute bottom-3 left-3 right-3">
          {listing.location ? (
            <div className="text-xs text-white/75">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {listing.location}
              </span>
            </div>
          ) : null}

          <div className="mt-1 line-clamp-1 text-lg font-semibold text-white">
            {listing.title}
          </div>

          <div className="mt-1 text-sm font-semibold text-white/90">
            {formatEUR(listing.price)}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-3 p-5">
        <div
          className="
            grid grid-cols-3 gap-2
            rounded-[var(--radius-lg)]
            border border-[color:var(--color-border)]
            bg-[color:var(--color-surface-2)]
            p-2
            transition-colors duration-700 ease-[cubic-bezier(.16,1,.3,1)]
            group-hover:border-[color:var(--color-border-strong)]
          "
        >
          <Mini
            icon={
              <Ruler className="h-4 w-4 text-[color:var(--color-accent)]/85" />
            }
            value={listing.livingArea ? `${listing.livingArea} m²` : "—"}
          />
          <Mini
            icon={
              <BedDouble className="h-4 w-4 text-[color:var(--color-accent)]/85" />
            }
            value={listing.rooms ? `${listing.rooms} Zi.` : "—"}
          />
          <Mini
            icon={
              <Leaf className="h-4 w-4 text-[color:var(--color-accent)]/85" />
            }
            value={listing.energyClass ?? "—"}
          />
        </div>

        <div className="flex items-center justify-between text-sm text-[color:var(--color-text-muted)]">
          <span className="line-clamp-1">
            {listing.badge ?? "Premium Listing"}
          </span>

          <span
            className="
              inline-flex items-center gap-1 font-semibold
              text-[color:var(--color-accent)]
              transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]
              group-hover:translate-x-0.5
            "
          >
            Details <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function Mini({ icon, value }: { icon: ReactNode; value: string }) {
  return (
    <div
      className="
        rounded-[var(--radius-lg)]
        border border-[color:var(--color-border)]
        bg-[color:var(--color-surface)]
        p-3 text-center
        transition-colors duration-700 ease-[cubic-bezier(.16,1,.3,1)]
        group-hover:border-[color:var(--color-border-strong)]
      "
    >
      <div className="mx-auto mb-1 flex w-full items-center justify-center">
        {icon}
      </div>
      <div className="text-xs font-semibold text-[color:var(--color-text)]/90">
        {value}
      </div>
    </div>
  );
}

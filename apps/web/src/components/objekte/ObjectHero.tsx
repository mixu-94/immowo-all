import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Euro,
  Images,
  KeyRound,
  MapPin,
  PlayCircle,
} from "lucide-react";
import type { EstateDetails } from "@/lib/types/listings";
import {
  extractKfw,
  extractEnergy,
  formatEUR,
  getListingStatus,
  getListingVariant,
} from "./utils";
import { ListingBanner } from "./ListingBanner";
import { ListingBadges } from "./ListingBadges";

export function ObjectHero({ listing }: { listing: EstateDetails }) {
  const heroIsVideo = Boolean(listing.videoSrc);
  const heroIsImage = Boolean(listing.imageSrc) && !heroIsVideo;

  const variant = getListingVariant(listing);
  const status = getListingStatus(listing);
  const kfw = extractKfw(listing);
  const energy = extractEnergy(listing);

  return (
    <header className="relative w-full overflow-hidden">
      <div className="relative h-[62vh] min-h-[520px] w-full">
        {heroIsVideo ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={listing.videoSrc}
            controls
            playsInline
            preload="metadata"
          />
        ) : heroIsImage ? (
          <Image
            src={listing.imageSrc}
            alt={listing.title}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/75" />

        {/* Champagne gold glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-56 left-1/2 h-[760px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(214,181,109,0.16),transparent_60%)] blur-3xl" />
          <div className="absolute -top-40 right-[-180px] h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle_at_center,rgba(214,181,109,0.12),transparent_62%)] blur-3xl" />
        </div>

        <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_140px_rgba(0,0,0,0.6)]" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40">
          <div
            className="
              absolute inset-0
              backdrop-blur-md
              bg-black/20
              [mask-image:linear-gradient(to_bottom,transparent,black_45%,black)]
              [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_45%,black)]
            "
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-[#050B1A]" />
        </div>

        {/* Top Bar */}
        <div className="absolute left-0 right-0 top-0 z-10">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(214,181,109,0.32)] bg-[rgba(255,255,255,0.06)] px-4 py-2 text-xs font-semibold tracking-widest text-white/90 backdrop-blur transition hover:bg-[rgba(214,181,109,0.10)]"
            >
              <ArrowLeft className="h-4 w-4" />
              ZURÜCK
            </Link>

            <div className="flex items-center gap-2">
              {listing.badge ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(214,181,109,0.32)] bg-[rgba(255,255,255,0.06)] px-4 py-2 text-xs font-semibold tracking-widest text-white/90 backdrop-blur">
                  <BadgeCheck className="h-4 w-4" />
                  {listing.badge}
                </span>
              ) : null}

              {heroIsVideo ? (
                <span className="hidden items-center gap-2 rounded-full border border-[rgba(214,181,109,0.32)] bg-[rgba(255,255,255,0.06)] px-4 py-2 text-xs font-semibold tracking-widest text-white/90 backdrop-blur sm:inline-flex">
                  <PlayCircle className="h-4 w-4" />
                  VIDEO
                </span>
              ) : heroIsImage ? (
                <span className="hidden items-center gap-2 rounded-full border border-[rgba(214,181,109,0.32)] bg-[rgba(255,255,255,0.06)] px-4 py-2 text-xs font-semibold tracking-widest text-white/90 backdrop-blur sm:inline-flex">
                  <Images className="h-4 w-4" />
                  FOTO
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {/* Bottom Title */}
        <div className="absolute inset-0 z-[1] flex items-end">
          <div className="mx-auto w-full max-w-7xl px-6 pb-10">
            <div className="max-w-3xl">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {listing.location ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(214,181,109,0.32)] bg-[rgba(255,255,255,0.06)] px-4 py-2 text-xs font-semibold tracking-widest text-white/90 backdrop-blur">
                    <MapPin className="h-4 w-4" />
                    {listing.location}
                  </span>
                ) : null}

                {listing.commissionText ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(214,181,109,0.32)] bg-[rgba(255,255,255,0.06)] px-4 py-2 text-xs font-semibold tracking-widest text-white/90 backdrop-blur">
                    <KeyRound className="h-4 w-4" />
                    COURTAGE
                  </span>
                ) : null}

                <ListingBanner variant={variant} />
              </div>

              <div className="mb-4">
                <ListingBadges
                  variant={variant === "default" ? undefined : (variant as any)}
                  status={status}
                  energyClass={energy.class}
                  kfw={kfw}
                />
              </div>

              <h1 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl [text-shadow:0_10px_40px_rgba(0,0,0,0.55)]">
                {listing.title}
              </h1>

              {typeof listing.price === "number" && listing.price > 0 ? (
                <div className="mt-5 inline-flex items-center gap-3 rounded-2xl border border-[rgba(214,181,109,0.32)] bg-[rgba(255,255,255,0.06)] px-5 py-3 backdrop-blur">
                  <Euro className="h-5 w-5 text-white/90" />
                  <span className="text-lg font-semibold text-white">
                    {formatEUR(listing.price)}
                  </span>
                  <span className="text-xs font-semibold tracking-widest text-white/60">
                    KAUFPREIS
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
// // components/objekte/ObjectHero.tsx
// import Image from "next/image";
// import Link from "next/link";
// import {
//   ArrowLeft,
//   BadgeCheck,
//   Euro,
//   Images,
//   KeyRound,
//   MapPin,
//   PlayCircle,
// } from "lucide-react";
// import type { EstateDetails } from "@/lib/types/listings";
// import {
//   extractKfw,
//   extractEnergy,
//   formatEUR,
//   getListingStatus,
//   getListingVariant,
// } from "./utils";
// import { ListingBanner } from "./ListingBanner";
// import { ListingBadges } from "./ListingBadges";

// export function ObjectHero({ listing }: { listing: EstateDetails }) {
//   const heroIsVideo = Boolean(listing.videoSrc);
//   const heroIsImage = Boolean(listing.imageSrc) && !heroIsVideo;

//   const variant = getListingVariant(listing);
//   const status = getListingStatus(listing);
//   const kfw = extractKfw(listing);
//   const energy = extractEnergy(listing);

//   return (
//     <header className="relative w-full overflow-hidden">
//       <div className="relative h-[62vh] min-h-[520px] w-full">
//         {heroIsVideo ? (
//           <video
//             className="absolute inset-0 h-full w-full object-cover"
//             src={listing.videoSrc}
//             controls
//             playsInline
//             preload="metadata"
//           />
//         ) : heroIsImage ? (
//           <Image
//             src={listing.imageSrc}
//             alt={listing.title}
//             fill
//             priority
//             className="object-cover"
//           />
//         ) : (
//           <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
//         )}

//         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/75" />

//         {/* Premium navy glow */}
//         <div className="pointer-events-none absolute inset-0">
//           <div className="absolute -top-56 left-1/2 h-[760px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.18),transparent_60%)] blur-3xl" />
//           <div className="absolute -top-40 right-[-180px] h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.14),transparent_62%)] blur-3xl" />
//         </div>

//         <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_140px_rgba(0,0,0,0.6)]" />

//         <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40">
//           <div
//             className="
//               absolute inset-0
//               backdrop-blur-md
//               bg-black/20
//               [mask-image:linear-gradient(to_bottom,transparent,black_45%,black)]
//               [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_45%,black)]
//             "
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-[#050B1A]" />
//         </div>

//         {/* Top Bar */}
//         <div className="absolute left-0 right-0 top-0 z-10">
//           <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
//             <Link
//               href="/"
//               className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest text-white/90 backdrop-blur transition hover:bg-white/10"
//             >
//               <ArrowLeft className="h-4 w-4" />
//               ZURÜCK
//             </Link>

//             <div className="flex items-center gap-2">
//               {listing.badge ? (
//                 <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest text-white/90 backdrop-blur">
//                   <BadgeCheck className="h-4 w-4" />
//                   {listing.badge}
//                 </span>
//               ) : null}

//               {heroIsVideo ? (
//                 <span className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest text-white/90 backdrop-blur sm:inline-flex">
//                   <PlayCircle className="h-4 w-4" />
//                   VIDEO
//                 </span>
//               ) : heroIsImage ? (
//                 <span className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest text-white/90 backdrop-blur sm:inline-flex">
//                   <Images className="h-4 w-4" />
//                   FOTO
//                 </span>
//               ) : null}
//             </div>
//           </div>
//         </div>

//         {/* Bottom Title */}
//         <div className="absolute inset-0 z-[1] flex items-end">
//           <div className="mx-auto w-full max-w-7xl px-6 pb-10">
//             <div className="max-w-3xl">
//               <div className="mb-4 flex flex-wrap items-center gap-2">
//                 {listing.location ? (
//                   <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest text-white/90 backdrop-blur">
//                     <MapPin className="h-4 w-4" />
//                     {listing.location}
//                   </span>
//                 ) : null}

//                 {listing.commissionText ? (
//                   <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest text-white/90 backdrop-blur">
//                     <KeyRound className="h-4 w-4" />
//                     COURTAGE
//                   </span>
//                 ) : null}

//                 <ListingBanner variant={variant} />
//               </div>

//               {/* Professional badge row */}
//               <div className="mb-4">
//                 <ListingBadges
//                   variant={variant === "default" ? undefined : (variant as any)}
//                   status={status}
//                   energyClass={energy.class}
//                   kfw={kfw}
//                 />
//               </div>

//               <h1 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl [text-shadow:0_10px_40px_rgba(0,0,0,0.55)]">
//                 {listing.title}
//               </h1>

//               {typeof listing.price === "number" && listing.price > 0 ? (
//                 <div className="mt-5 inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 backdrop-blur">
//                   <Euro className="h-5 w-5 text-white/90" />
//                   <span className="text-lg font-semibold text-white">
//                     {formatEUR(listing.price)}
//                   </span>
//                   <span className="text-xs font-semibold tracking-widest text-white/60">
//                     KAUFPREIS
//                   </span>
//                 </div>
//               ) : null}
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

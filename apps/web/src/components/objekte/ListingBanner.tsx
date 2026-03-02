import { Building2, Key, TrendingUp, Sparkles } from "lucide-react";
import type { ListingVariant } from "./utils";

export function ListingBanner({ variant }: { variant: ListingVariant }) {
  const cfg = getCfg(variant);

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(214,181,109,0.32)] bg-[rgba(255,255,255,0.06)] px-4 py-2 text-xs font-semibold tracking-widest text-white/90 backdrop-blur">
      <cfg.icon className="h-4 w-4" />
      {cfg.text}
    </div>
  );
}

function getCfg(variant: ListingVariant) {
  switch (variant) {
    case "build":
      return { icon: Building2, text: "BAUPROJEKT • KAUF AB PLAN" };
    case "ready":
      return { icon: Key, text: "FERTIGE IMMOBILIE • BESICHTIGUNG MÖGLICH" };
    case "investment":
      return { icon: TrendingUp, text: "KAPITALANLAGE • INVESTMENT" };
    default:
      return { icon: Sparkles, text: "PREMIUM LISTING" };
  }
}

// // components/objekte/ListingBanner.tsx
// import { Building2, Key, TrendingUp, Sparkles } from "lucide-react";
// import type { ListingVariant } from "./utils";

// export function ListingBanner({ variant }: { variant: ListingVariant }) {
//   const cfg = getCfg(variant);

//   return (
//     <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest text-white/90 backdrop-blur">
//       <cfg.icon className="h-4 w-4" />
//       {cfg.text}
//     </div>
//   );
// }

// function getCfg(variant: ListingVariant) {
//   switch (variant) {
//     case "build":
//       return { icon: Building2, text: "BAUPROJEKT • VOM PAPIER WEG" };
//     case "ready":
//       return { icon: Key, text: "FERTIGE IMMOBILIE • BESICHTIGUNG MÖGLICH" };
//     case "investment":
//       return { icon: TrendingUp, text: "KAPITALANLAGE • INVESTMENT" };
//     default:
//       return { icon: Sparkles, text: "PREMIUM LISTING" };
//   }
// }

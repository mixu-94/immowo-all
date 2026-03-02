import { Flame, Leaf, Hammer, KeyRound, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  variant?: "build" | "ready" | "investment";
  status?: "verfügbar" | "reserviert" | "verkauft" | "in_bau";
  energyClass?: string; // A+ ... H
  kfw?: string; // "KfW 40" etc.
};

export function ListingBadges({ variant, status, energyClass, kfw }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {variant ? (
        <Badge icon={variantIcon(variant)} text={variantText(variant)} />
      ) : null}
      {status ? <Badge text={statusText(status)} /> : null}
      {energyClass ? (
        <Badge
          icon={<Leaf className="h-4 w-4" />}
          text={`Energieklasse ${energyClass}`}
        />
      ) : null}
      {kfw ? <Badge icon={<Flame className="h-4 w-4" />} text={kfw} /> : null}
    </div>
  );
}

function Badge({ icon, text }: { icon?: ReactNode; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(214,181,109,0.32)] bg-[rgba(255,255,255,0.06)] px-4 py-2 text-xs font-semibold tracking-widest text-white/90 backdrop-blur">
      {icon}
      {text}
    </span>
  );
}

function variantIcon(v: "build" | "ready" | "investment") {
  if (v === "build") return <Hammer className="h-4 w-4" />;
  if (v === "ready") return <KeyRound className="h-4 w-4" />;
  return <TrendingUp className="h-4 w-4" />;
}

function variantText(v: "build" | "ready" | "investment") {
  if (v === "build") return "BAUPROJEKT";
  if (v === "ready") return "FERTIGE IMMOBILIE";
  return "KAPITALANLAGE";
}

function statusText(s: NonNullable<Props["status"]>) {
  switch (s) {
    case "verfügbar":
      return "VERFÜGBAR";
    case "reserviert":
      return "RESERVIERT";
    case "verkauft":
      return "VERKAUFT";
    case "in_bau":
      return "IN BAU";
  }
}

// import { Flame, Leaf, Hammer, KeyRound, TrendingUp } from "lucide-react";

// type Props = {
//   variant?: "build" | "ready" | "investment";
//   status?: "verfügbar" | "reserviert" | "verkauft" | "in_bau";
//   energyClass?: string; // A+ ... H
//   kfw?: string; // "KfW 40" etc.
// };

// export function ListingBadges({ variant, status, energyClass, kfw }: Props) {
//   return (
//     <div className="flex flex-wrap items-center gap-2">
//       {variant ? (
//         <Badge icon={variantIcon(variant)} text={variantText(variant)} />
//       ) : null}

//       {status ? <Badge text={statusText(status)} /> : null}

//       {energyClass ? (
//         <Badge
//           icon={<Leaf className="h-4 w-4" />}
//           text={`Energieklasse ${energyClass}`}
//         />
//       ) : null}

//       {kfw ? <Badge icon={<Flame className="h-4 w-4" />} text={kfw} /> : null}
//     </div>
//   );
// }

// function Badge({ icon, text }: { icon?: React.ReactNode; text: string }) {
//   return (
//     <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest text-white/90 backdrop-blur">
//       {icon}
//       {text}
//     </span>
//   );
// }

// function variantIcon(v: "build" | "ready" | "investment") {
//   if (v === "build") return <Hammer className="h-4 w-4" />;
//   if (v === "ready") return <KeyRound className="h-4 w-4" />;
//   return <TrendingUp className="h-4 w-4" />;
// }

// function variantText(v: "build" | "ready" | "investment") {
//   if (v === "build") return "BAUPROJEKT";
//   if (v === "ready") return "FERTIGE IMMOBILIE";
//   return "KAPITALANLAGE";
// }

// function statusText(s: NonNullable<Props["status"]>) {
//   switch (s) {
//     case "verfügbar":
//       return "VERFÜGBAR";
//     case "reserviert":
//       return "RESERVIERT";
//     case "verkauft":
//       return "VERKAUFT";
//     case "in_bau":
//       return "IN BAU";
//   }
// }

// components/unternehmen/CompanyStats.tsx
import { ShieldCheck, Handshake, Scale, Building2 } from "lucide-react";
import type { CompanyPageContent } from "@/lib/cms/companyPage";

type Props = { content?: CompanyPageContent["stats"] };

const STATS_FALLBACK: NonNullable<Props["content"]> = {
  items: [
    { icon: "Building2", label: "Fokus", value: "Bauträger & Verkauf" },
    { icon: "ShieldCheck", label: "Qualität", value: "Saubere Standards" },
    { icon: "Scale", label: "Transparenz", value: "Klare Unterlagen" },
    { icon: "Handshake", label: "Abwicklung", value: "Zuverlässig & fair" },
  ],
};

const ICONS = {
  Building2,
  ShieldCheck,
  Scale,
  Handshake,
} as const;

export function CompanyStats({ content }: Props) {
  const c = content ?? STATS_FALLBACK;

  return (
    <section className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {c.items.map((s) => {
        const Icon = ICONS[s.icon];
        return (
          <div
            key={s.label}
            className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-white/15 hover:bg-white/7"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-2">
                <Icon className="h-5 w-5 text-white/85" />
              </div>
              <div className="text-xs font-semibold uppercase tracking-widest text-white/55">
                {s.label}
              </div>
            </div>
            <div className="mt-3 text-lg font-semibold tracking-tight text-white">
              {s.value}
            </div>
          </div>
        );
      })}
    </section>
  );
}
// // components/unternehmen/CompanyStats.tsx
// import { ShieldCheck, Handshake, Scale, Building2 } from "lucide-react";

// const stats = [
//   { icon: Building2, label: "Fokus", value: "Bauträger & Verkauf" },
//   { icon: ShieldCheck, label: "Qualität", value: "Saubere Standards" },
//   { icon: Scale, label: "Transparenz", value: "Klare Unterlagen" },
//   { icon: Handshake, label: "Abwicklung", value: "Zuverlässig & fair" },
// ];

// export function CompanyStats() {
//   return (
//     <section className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//       {stats.map((s) => (
//         <div
//           key={s.label}
//           className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-white/15 hover:bg-white/7"
//         >
//           <div className="flex items-center gap-3">
//             <div className="rounded-2xl border border-white/10 bg-black/20 p-2">
//               <s.icon className="h-5 w-5 text-white/85" />
//             </div>
//             <div className="text-xs font-semibold uppercase tracking-widest text-white/55">
//               {s.label}
//             </div>
//           </div>
//           <div className="mt-3 text-lg font-semibold tracking-tight text-white">
//             {s.value}
//           </div>
//         </div>
//       ))}
//     </section>
//   );
// }

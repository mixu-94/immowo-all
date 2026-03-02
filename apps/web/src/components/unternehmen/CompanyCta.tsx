// components/unternehmen/CompanyCta.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CompanyPageContent } from "@/lib/cms/companyPage";

type Props = { content?: CompanyPageContent["cta"] };

const CTA_FALLBACK: NonNullable<Props["content"]> = {
  title: "Bereit für den nächsten Schritt?",
  description:
    "Ob Neubau (Kauf ab Plan) oder schlüsselfertiges Objekt – wir geben dir schnell Klarheit zu Ablauf, Unterlagen und Möglichkeiten.",
  primaryCta: { label: "Kontakt aufnehmen", href: "/kontakt" },
  secondaryCta: { label: "Angebote ansehen", href: "/immobilien" },
};

export function CompanyCta({ content }: Props) {
  const c = content ?? CTA_FALLBACK;

  return (
    <section className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur md:p-8">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <h2 className="text-lg font-semibold text-white">{c.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            {c.description}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href={c.primaryCta.href}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            {c.primaryCta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={c.secondaryCta.href}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
          >
            {c.secondaryCta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// // components/unternehmen/CompanyCta.tsx
// import Link from "next/link";
// import { ArrowRight } from "lucide-react";

// export function CompanyCta() {
//   return (
//     <section className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur md:p-8">
//       <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
//         <div className="max-w-2xl">
//           <h2 className="text-lg font-semibold text-white">
//             Bereit für den nächsten Schritt?
//           </h2>
//           <p className="mt-2 text-sm leading-relaxed text-white/70">
//             Ob Neubau „vom Papier weg“ oder schlüsselfertiges Objekt – wir geben
//             dir schnell Klarheit zu Ablauf, Unterlagen und Möglichkeiten.
//           </p>
//         </div>

//         <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
//           <Link
//             href="/kontakt"
//             className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:shadow-xl"
//           >
//             Kontakt aufnehmen
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//           <Link
//             href="/immobilien"
//             className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
//           >
//             Angebote ansehen
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

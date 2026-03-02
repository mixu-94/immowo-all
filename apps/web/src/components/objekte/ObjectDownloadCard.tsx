import Link from "next/link";
import { Download, FileText, Lock, ArrowRight } from "lucide-react";
import type { EstateDetails } from "@/lib/types/listings";

type Props = {
  listing: EstateDetails;
};

export function ObjectDownloadCard({ listing }: Props) {
  const anyListing = listing as any;

  const pdfUrl: string | undefined =
    anyListing.pdfUrl ??
    anyListing.exposePdfUrl ??
    anyListing.documents?.exposePdfUrl ??
    undefined;

  const contactHref = `/kontakt?listing=${encodeURIComponent(
    anyListing.slug ?? listing.id ?? "",
  )}`;

  return (
    <div className="rounded-3xl border border-[rgba(214,181,109,0.22)] bg-[rgba(255,255,255,0.06)] p-6 backdrop-blur transition hover:border-[rgba(214,181,109,0.32)] hover:bg-[rgba(255,255,255,0.07)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl border border-[rgba(214,181,109,0.22)] bg-black/20 p-2">
            <FileText className="h-5 w-5 text-white/85" />
          </div>
          <div>
            <div className="text-base font-semibold text-white">
              Exposé als PDF
            </div>
            <div className="mt-1 text-sm leading-relaxed text-white/70">
              Alle Eckdaten, Highlights, Lagehinweise und Unterlagen kompakt
              zusammengefasst.
            </div>
          </div>
        </div>

        <span className="hidden rounded-full border border-[rgba(214,181,109,0.22)] bg-black/20 px-3 py-1 text-[11px] font-semibold tracking-widest text-white/70 md:inline-flex">
          {pdfUrl ? "DOWNLOAD" : "AUF ANFRAGE"}
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {pdfUrl ? (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-[var(--color-accent)] px-5 text-sm font-semibold text-black shadow-lg shadow-black/30 transition hover:bg-[var(--color-accent-hover)]"
          >
            <Download className="h-4 w-4" />
            PDF herunterladen
          </a>
        ) : (
          <Link
            href={contactHref}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-[var(--color-accent)] px-5 text-sm font-semibold text-black shadow-lg shadow-black/30 transition hover:bg-[var(--color-accent-hover)]"
          >
            <Lock className="h-4 w-4" />
            PDF anfordern
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}

        <div className="inline-flex h-11 items-center justify-center rounded-2xl border border-[rgba(214,181,109,0.32)] bg-[rgba(255,255,255,0.06)] px-5 text-sm font-semibold text-white/90 backdrop-blur">
          <span className="text-white/70">
            {pdfUrl ? "Sofort verfügbar" : "Diskret nach Anfrage"}
          </span>
        </div>
      </div>

      <p className="mt-3 text-xs text-white/55">
        Hinweis: Aus Diskretionsgründen können bestimmte Dokumente/Adressen erst
        nach Anfrage freigegeben werden.
      </p>
    </div>
  );
}

// import Link from "next/link";
// import { Download, FileText, Lock, ArrowRight } from "lucide-react";
// import type { EstateDetails } from "@/lib/types/listings";

// type Props = {
//   listing: EstateDetails;
// };

// /**
//  * MVP: nutzt eine simple URL am Listing.
//  * Payload später: z.B. listing.documents?.exposePdfUrl oder listing.pdfUrl.
//  */
// export function ObjectDownloadCard({ listing }: Props) {
//   const anyListing = listing as any;

//   // ✅ Später: hier nur das Feld anpassen
//   const pdfUrl: string | undefined =
//     anyListing.pdfUrl ??
//     anyListing.exposePdfUrl ??
//     anyListing.documents?.exposePdfUrl ??
//     undefined;

//   const contactHref = `/kontakt?listing=${encodeURIComponent(anyListing.slug ?? listing.id ?? "")}`;

//   return (
//     <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-white/15 hover:bg-white/7">
//       <div className="flex items-start justify-between gap-4">
//         <div className="flex items-start gap-3">
//           <div className="rounded-2xl border border-white/10 bg-black/20 p-2">
//             <FileText className="h-5 w-5 text-white/85" />
//           </div>
//           <div>
//             <div className="text-base font-semibold text-white">
//               Exposé als PDF
//             </div>
//             <div className="mt-1 text-sm leading-relaxed text-white/70">
//               Alle Eckdaten, Highlights, Lagehinweise und Unterlagen kompakt
//               zusammengefasst.
//             </div>
//           </div>
//         </div>

//         <span className="hidden rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] font-semibold tracking-widest text-white/70 md:inline-flex">
//           {pdfUrl ? "DOWNLOAD" : "AUF ANFRAGE"}
//         </span>
//       </div>

//       <div className="mt-5 grid gap-3 sm:grid-cols-2">
//         {pdfUrl ? (
//           <a
//             href={pdfUrl}
//             target="_blank"
//             rel="noreferrer"
//             className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-semibold text-black shadow-lg shadow-black/20 transition hover:bg-white/90"
//           >
//             <Download className="h-4 w-4" />
//             PDF herunterladen
//           </a>
//         ) : (
//           <Link
//             href={contactHref}
//             className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-semibold text-black shadow-lg shadow-black/20 transition hover:bg-white/90"
//           >
//             <Lock className="h-4 w-4" />
//             PDF anfordern
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         )}

//         <div className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white/90 backdrop-blur">
//           <span className="text-white/70">
//             {pdfUrl ? "Sofort verfügbar" : "Diskret nach Anfrage"}
//           </span>
//         </div>
//       </div>

//       <p className="mt-3 text-xs text-white/55">
//         Hinweis: Aus Diskretionsgründen können bestimmte Dokumente/Adressen erst
//         nach Anfrage freigegeben werden.
//       </p>
//     </div>
//   );
// }

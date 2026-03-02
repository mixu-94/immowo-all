import Link from "next/link";
import { ArrowRight, Download, FileText, PhoneCall } from "lucide-react";
import type { EstateDetails } from "@/lib/types/listings";
import { getListingVariant } from "./utils";

export function ObjectCTA({ listing }: { listing: EstateDetails }) {
  const anyListing = listing as any;
  const variant = getListingVariant(listing);

  const pdfUrl: string | undefined =
    anyListing.pdfUrl ??
    anyListing.exposePdfUrl ??
    anyListing.documents?.exposePdfUrl ??
    undefined;

  const slug = anyListing.slug ?? listing.id ?? "";
  const title = listing.title ?? "";

  const contactHref = `/kontakt?listing=${encodeURIComponent(slug)}&title=${encodeURIComponent(
    title,
  )}`;

  const headline =
    variant === "build"
      ? "Interesse am Projekt?"
      : variant === "investment"
        ? "Interesse an der Kapitalanlage?"
        : "Interesse an diesem Objekt?";

  const copy = pdfUrl
    ? "Das Exposé ist verfügbar. Alternativ können Sie direkt einen Rückruf anfragen."
    : "Exposé & Unterlagen sind aus Diskretionsgründen auf Anfrage. Hinterlassen Sie Ihre Kontaktdaten – wir melden uns zeitnah.";

  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-16">
      <div className="overflow-hidden rounded-3xl border border-[rgba(214,181,109,0.22)] bg-[rgba(255,255,255,0.06)] backdrop-blur">
        <div className="p-6 md:p-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <h2 className="text-lg font-semibold text-white">{headline}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {copy}
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              {pdfUrl ? (
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-black/25 transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <Download className="h-4 w-4" />
                  PDF herunterladen
                  <ArrowRight className="h-4 w-4" />
                </a>
              ) : (
                <Link
                  href={contactHref}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-black/25 transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <FileText className="h-4 w-4" />
                  Exposé auf Anfrage
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}

              <Link
                href={contactHref}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[rgba(214,181,109,0.32)] bg-[rgba(255,255,255,0.06)] px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-[rgba(214,181,109,0.10)]"
              >
                <PhoneCall className="h-4 w-4" />
                Rückruf anfragen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// import Link from "next/link";
// import { ArrowRight, Download, FileText, PhoneCall } from "lucide-react";
// import type { EstateDetails } from "@/lib/types/listings";
// import { getListingVariant } from "./utils";

// export function ObjectCTA({ listing }: { listing: EstateDetails }) {
//   const anyListing = listing as any;
//   const variant = getListingVariant(listing);

//   // ✅ Feld später aus Payload mappen (z.B. documents.exposePdfUrl)
//   const pdfUrl: string | undefined =
//     anyListing.pdfUrl ??
//     anyListing.exposePdfUrl ??
//     anyListing.documents?.exposePdfUrl ??
//     undefined;

//   const slug = anyListing.slug ?? listing.id ?? "";
//   const title = listing.title ?? "";

//   const contactHref = `/kontakt?listing=${encodeURIComponent(slug)}&title=${encodeURIComponent(title)}`;

//   const headline =
//     variant === "build"
//       ? "Interesse am Projekt?"
//       : variant === "investment"
//         ? "Interesse an der Kapitalanlage?"
//         : "Interesse an diesem Objekt?";

//   const copy = pdfUrl
//     ? "Das Exposé ist verfügbar. Alternativ können Sie direkt einen Rückruf anfragen."
//     : "Exposé & Unterlagen sind aus Diskretionsgründen auf Anfrage. Hinterlassen Sie Ihre Kontaktdaten – wir melden uns zeitnah.";

//   return (
//     <section className="mx-auto w-full max-w-7xl px-6 pb-16">
//       <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
//         <div className="p-6 md:p-8">
//           <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
//             <div className="max-w-2xl">
//               <h2 className="text-lg font-semibold text-white">{headline}</h2>
//               <p className="mt-2 text-sm leading-relaxed text-white/70">
//                 {copy}
//               </p>
//             </div>

//             <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
//               {pdfUrl ? (
//                 <a
//                   href={pdfUrl}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:shadow-xl"
//                 >
//                   <Download className="h-4 w-4" />
//                   PDF herunterladen
//                   <ArrowRight className="h-4 w-4" />
//                 </a>
//               ) : (
//                 <Link
//                   href={contactHref}
//                   className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:shadow-xl"
//                 >
//                   <FileText className="h-4 w-4" />
//                   Exposé auf Anfrage
//                   <ArrowRight className="h-4 w-4" />
//                 </Link>
//               )}

//               <Link
//                 href={contactHref}
//                 className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
//               >
//                 <PhoneCall className="h-4 w-4" />
//                 Rückruf anfragen
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

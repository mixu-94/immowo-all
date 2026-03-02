"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { BuyerCommission } from "@/lib/types/listings";
import { acceptCommission, hasAcceptedCommission } from "@/lib/commission/gate";
import { CommissionGateDialog } from "./CommissionGateDialog";

type Props = {
  href?: string;
  slug: string;
  commission?: BuyerCommission;
  className?: string;
  children: React.ReactNode;
};

export function CommissionGateLink({
  href,
  slug,
  commission,
  className,
  children,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const targetHref = useMemo(() => {
    const trimmed = (href ?? "").trim();
    return trimmed.length > 0 ? trimmed : `/objekte/${slug}`;
  }, [href, slug]);

  const accepted = useMemo(
    () => hasAcceptedCommission(slug, commission),
    [slug, commission],
  );

  useEffect(() => {
    // no-op, aber lässt dir später easy Analytics/Hooks reinwerfen
  }, [open]);

  return (
    <>
      <Link
        href={targetHref}
        onClick={(e) => {
          if (accepted) return;
          e.preventDefault();
          setOpen(true);
        }}
        className={className}
      >
        {children}
      </Link>

      <CommissionGateDialog
        open={open}
        onOpenChange={setOpen}
        commission={commission}
        onAccept={() => {
          acceptCommission(slug, commission);
          setOpen(false);
          // direkt navigieren, ohne unnötige Delay-Hacks
          router.push(targetHref);
        }}
        onDecline={() => setOpen(false)}
      />
    </>
  );
}

// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useMemo, useState } from "react";
// import type { BuyerCommission } from "@/lib/types/listings";
// import { acceptCommission, hasAcceptedCommission } from "@/lib/commission/gate";

// import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// function formatCommission(c?: BuyerCommission) {
//   if (!c) return "Provision auf Anfrage";
//   const vatRate = c?.vatRate ?? 19;
//   const vatLabel = c?.vatIncluded ? "inkl. MwSt." : `zzgl. MwSt. (${vatRate}%)`;
//   if (c?.kind === "percent")
//     return `${c.value.toFixed(2).replace(".", ",")}% ${vatLabel}`;
//   if (c?.kind === "fixed")
//     return `${Math.round(c.value).toLocaleString("de-DE")} € ${vatLabel}`;
//   return "Provision auf Anfrage";
// }

// type Props = {
//   href?: string;
//   slug: string;
//   commission?: BuyerCommission;
//   className?: string;
//   children: React.ReactNode;
// };

// export function CommissionGateLink({
//   href,
//   slug,
//   commission,
//   className,
//   children,
// }: Props) {
//   const router = useRouter();
//   const [open, setOpen] = useState(false);
//   const [checked, setChecked] = useState(false);

//   const targetHref = useMemo(() => {
//     const trimmed = (href ?? "").trim();
//     return trimmed.length > 0 ? trimmed : `/objekte/${slug}`;
//   }, [href, slug]);

//   const accepted = useMemo(
//     () => hasAcceptedCommission(slug, commission),
//     [slug, commission],
//   );

//   useEffect(() => {
//     if (open) setChecked(false);
//   }, [open]);

//   const commissionText = useMemo(
//     () => formatCommission(commission),
//     [commission],
//   );

//   return (
//     <>
//       <Link
//         href={targetHref}
//         onClick={(e) => {
//           if (accepted) return;
//           e.preventDefault();
//           setOpen(true);
//         }}
//         className={className}
//       >
//         {children}
//       </Link>

//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent
//           className="
//             z-[110]
//             w-[calc(100vw-1.25rem)] sm:w-full sm:max-w-[720px]
//             max-h-[calc(100svh-1.25rem)] overflow-hidden
//             p-0
//             rounded-[var(--radius-xl)]
//             border border-[color:var(--color-border)]
//             bg-[color:var(--color-bg)]
//             text-[color:var(--color-text)]
//             shadow-[var(--shadow-soft)]
//           "
//         >
//           <div className="max-h-[calc(100svh-1.25rem)] overflow-y-auto p-4 sm:p-6">
//             <DialogHeader className="space-y-3">
//               <DialogTitle className="text-lg sm:text-xl font-semibold tracking-tight">
//                 Hinweis zur Käuferprovision
//               </DialogTitle>
//               <DialogDescription className="text-sm leading-relaxed text-[color:var(--color-text-muted)]">
//                 Bevor Sie die Objektseite aufrufen, bestätigen Sie bitte, dass
//                 Sie den Hinweis zur Käuferprovision zur Kenntnis genommen haben.
//               </DialogDescription>
//             </DialogHeader>

//             <div
//               className="
//                 mt-4 rounded-[var(--radius-lg)]
//                 border border-[color:var(--color-border)]
//                 bg-[color:var(--color-surface)]
//                 p-4 sm:p-5
//               "
//             >
//               <div className="text-[11px] font-semibold uppercase tracking-widest text-[color:var(--color-text-muted)]">
//                 Käuferprovision (falls Kauf zustande kommt)
//               </div>

//               <div className="mt-1 text-base sm:text-lg font-semibold">
//                 {commissionText}
//               </div>

//               <div className="mt-3 space-y-2 text-sm text-[color:var(--color-text-muted)]">
//                 <p>
//                   <span className="font-semibold text-[color:var(--color-text)]">
//                     Fälligkeit:
//                   </span>{" "}
//                   {commission?.due ??
//                     "In der Regel fällig bei notarieller Beurkundung des Kaufvertrags."}
//                 </p>
//                 <p>
//                   <span className="font-semibold text-[color:var(--color-text)]">
//                     Hinweis:
//                   </span>{" "}
//                   Die Provision wird grundsätzlich nur fällig, wenn ein
//                   wirksamer Kaufvertrag zustande kommt und ein
//                   Provisionsanspruch besteht.
//                 </p>
//                 {commission?.basis ? (
//                   <p>
//                     <span className="font-semibold text-[color:var(--color-text)]">
//                       Berechnungsbasis:
//                     </span>{" "}
//                     {commission.basis}
//                   </p>
//                 ) : null}
//                 {commission?.note ? <p>{commission.note}</p> : null}
//               </div>

//               <div
//                 className="
//                   mt-4 rounded-xl border border-[color:var(--color-border)]
//                   bg-[color:var(--color-surface-2)]
//                   p-3 text-xs leading-relaxed text-[color:var(--color-text-muted)]
//                 "
//               >
//                 Details zu Provisionsregelungen, Widerruf und
//                 Vertragsbedingungen finden Sie in unseren{" "}
//                 <Link
//                   href="/agb"
//                   className="font-semibold underline underline-offset-4 text-[color:var(--color-link)] hover:text-[color:var(--color-link-hover)]"
//                 >
//                   AGB
//                 </Link>{" "}
//                 sowie in der{" "}
//                 <Link
//                   href="/widerruf"
//                   className="font-semibold underline underline-offset-4 text-[color:var(--color-link)] hover:text-[color:var(--color-link-hover)]"
//                 >
//                   Widerrufsbelehrung
//                 </Link>
//                 .
//               </div>
//             </div>

//             <div
//               className="
//                 mt-4 rounded-[var(--radius-lg)]
//                 border border-[color:var(--color-border)]
//                 bg-[color:var(--color-surface)]
//                 p-4 sm:p-5
//               "
//             >
//               <p className="text-sm font-semibold">Wichtige Belehrung</p>
//               <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[color:var(--color-text-muted)]">
//                 <li>
//                   Mit der Bestätigung erklären Sie{" "}
//                   <span className="font-semibold text-[color:var(--color-text)]">
//                     nicht
//                   </span>
//                   , dass Sie die Immobilie kaufen – sondern nur, dass Sie den
//                   Provisionshinweis gelesen haben.
//                 </li>
//                 <li>
//                   Eine Provision wird in der Regel nur fällig, wenn ein
//                   Kaufvertrag zustande kommt und ein Provisionsanspruch
//                   rechtlich besteht (z. B. durch
//                   Maklervertrag/Nachweis/Vermittlung).
//                 </li>
//                 <li>
//                   Wenn sich die Provisionshöhe für dieses Objekt ändert, kann
//                   die Bestätigung erneut erforderlich sein.
//                 </li>
//                 <li>
//                   Bei Fragen kontaktieren Sie uns bitte vorab – wir erklären
//                   Ihnen die genaue Regelung transparent.
//                 </li>
//               </ul>
//             </div>

//             <div
//               className="
//                 mt-4 rounded-[var(--radius-lg)]
//                 border-2 border-[color:var(--color-accent)]
//                 bg-[color:var(--color-surface-2)]
//                 p-4 sm:p-5
//               "
//             >
//               <div className="flex items-start gap-3">
//                 <Checkbox
//                   id="commission-ack-link"
//                   checked={checked}
//                   onCheckedChange={(v) => setChecked(v === true)}
//                   className="
//                     mt-1 h-6 w-6
//                     border-[color:var(--color-border)]
//                     data-[state=checked]:bg-[color:var(--color-accent)]
//                     data-[state=checked]:text-black
//                   "
//                 />
//                 <label
//                   htmlFor="commission-ack-link"
//                   className="cursor-pointer select-none"
//                 >
//                   <div className="text-sm sm:text-base font-semibold">
//                     Pflicht: Ich habe den Hinweis zur Käuferprovision gelesen
//                     und verstanden.
//                   </div>
//                   <div className="mt-1 text-xs sm:text-sm text-[color:var(--color-text-muted)]">
//                     (Ohne diese Bestätigung kann die Objektseite nicht geöffnet
//                     werden.)
//                   </div>
//                 </label>
//               </div>
//             </div>

//             <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
//               <Button
//                 type="button"
//                 variant="secondary"
//                 onClick={() => setOpen(false)}
//                 className="
//                   h-11 sm:h-10
//                   border border-[color:var(--color-border)]
//                   bg-[color:var(--color-surface)]
//                   text-[color:var(--color-text)]
//                   hover:bg-[color:var(--color-surface-2)]
//                 "
//               >
//                 Ablehnen
//               </Button>

//               <Button
//                 type="button"
//                 disabled={!checked}
//                 onClick={() => {
//                   acceptCommission(slug, commission);
//                   setOpen(false);
//                   setTimeout(() => router.push(targetHref), 0);
//                 }}
//                 className="
//                   h-11 sm:h-10
//                   bg-[color:var(--color-accent)]
//                   text-black
//                   hover:bg-[color:var(--color-accent-hover)]
//                   disabled:opacity-50
//                 "
//               >
//                 Einverstanden &amp; weiter
//               </Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

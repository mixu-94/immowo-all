"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { BuyerCommission } from "@/lib/types/listings";

function formatCommission(c?: BuyerCommission) {
  if (!c) return "Provision auf Anfrage";
  const vatRate = c.vatRate ?? 19;
  const vatLabel = c.vatIncluded ? "inkl. MwSt." : `zzgl. MwSt. (${vatRate}%)`;

  if (c.kind === "percent")
    return `${c.value.toFixed(2).replace(".", ",")}% ${vatLabel}`;
  return `${Math.round(c.value).toLocaleString("de-DE")} € ${vatLabel}`;
}

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  commission?: BuyerCommission;
  onAccept: () => void;
  onDecline?: () => void;
};

export function CommissionGateDialog({
  open,
  onOpenChange,
  commission,
  onAccept,
  onDecline,
}: Props) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (open) setChecked(false);
  }, [open]);

  const commissionText = useMemo(
    () => formatCommission(commission),
    [commission],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          z-[110]
          w-[calc(100vw-1.5rem)]
          max-w-[980px]
          p-0
          overflow-hidden

          /* Premium shell */
          bg-[var(--color-bg)]
          text-[color:var(--color-text)]
          rounded-[var(--radius-xl)]
          shadow-[0_30px_90px_rgba(0,0,0,0.55)]
          border border-[rgba(214,181,109,0.28)]
        "
      >
        {/* Decorative gold hairline */}
        <div className="pointer-events-none absolute -inset-px rounded-[var(--radius-xl)] bg-[linear-gradient(90deg,rgba(214,181,109,0.10)_0%,var(--color-bg)_18%,var(--color-bg)_82%,rgba(214,181,109,0.10)_100%)] opacity-40 blur-[4px]" />

        {/* Layout: scroll area + sticky footer (no “Accept button below fold”) */}
        <div className="relative grid max-h-[88svh] grid-cols-1 lg:grid-cols-[1fr_360px]">
          {/* LEFT: Content */}
          <div className="min-h-0 overflow-y-auto px-5 pb-6 pt-5 sm:px-7 sm:pt-6">
            <DialogHeader className="space-y-2">
              <DialogTitle className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                Hinweis zur Käuferprovision
              </DialogTitle>
              <DialogDescription className="text-sm leading-relaxed text-white/70">
                Bevor Sie die Objektseite aufrufen, bestätigen Sie bitte, dass
                Sie den Hinweis zur Käuferprovision zur Kenntnis genommen haben.
              </DialogDescription>
            </DialogHeader>

            {/* Key info */}
            <div className="mt-5 rounded-[var(--radius-lg)] border border-[rgba(214,181,109,0.22)] bg-[rgba(255,255,255,0.06)] p-4 sm:p-5 backdrop-blur">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-white/60">
                Käuferprovision (falls Kauf zustande kommt)
              </div>

              <div className="mt-1 text-base font-semibold text-white sm:text-lg">
                {commissionText}
              </div>

              <div className="mt-3 space-y-2 text-sm text-white/70">
                <p>
                  <span className="font-semibold text-white">Fälligkeit:</span>{" "}
                  {commission?.due ??
                    "In der Regel fällig bei notarieller Beurkundung des Kaufvertrags."}
                </p>
                <p>
                  <span className="font-semibold text-white">Hinweis:</span> Die
                  Provision wird grundsätzlich nur fällig, wenn ein wirksamer
                  Kaufvertrag zustande kommt und ein Provisionsanspruch besteht.
                </p>
                {commission?.basis ? (
                  <p>
                    <span className="font-semibold text-white">
                      Berechnungsbasis:
                    </span>{" "}
                    {commission.basis}
                  </p>
                ) : null}
                {commission?.note ? (
                  <p className="text-white/65">{commission.note}</p>
                ) : null}
              </div>

              <div className="mt-4 rounded-2xl border border-[rgba(214,181,109,0.18)] bg-black/20 p-3 text-xs leading-relaxed text-white/65">
                Details finden Sie in unseren{" "}
                <Link
                  href="/agb"
                  className="font-semibold underline underline-offset-4 text-[color:var(--color-accent)] hover:text-[color:var(--color-accent-hover)]"
                >
                  AGB
                </Link>{" "}
                sowie in der{" "}
                <Link
                  href="/widerruf"
                  className="font-semibold underline underline-offset-4 text-[color:var(--color-accent)] hover:text-[color:var(--color-accent-hover)]"
                >
                  Widerrufsbelehrung
                </Link>
                .
              </div>
            </div>

            {/* Belehrung */}
            <div className="mt-4 rounded-[var(--radius-lg)] border border-[rgba(214,181,109,0.22)] bg-[rgba(255,255,255,0.06)] p-4 sm:p-5 backdrop-blur">
              <p className="text-sm font-semibold text-white">
                Wichtige Belehrung
              </p>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-white/70">
                <li>
                  Mit der Bestätigung erklären Sie{" "}
                  <span className="font-semibold text-white">nicht</span>, dass
                  Sie die Immobilie kaufen – sondern nur, dass Sie den
                  Provisionshinweis gelesen haben.
                </li>
                <li>
                  Eine Provision wird in der Regel nur fällig, wenn ein
                  Kaufvertrag zustande kommt und ein Provisionsanspruch
                  rechtlich besteht.
                </li>
                <li>
                  Wenn sich die Provisionshöhe für dieses Objekt ändert, kann
                  die Bestätigung erneut erforderlich sein.
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT: Actions (always visible on desktop) */}
          <aside className="border-t border-[rgba(214,181,109,0.18)] bg-[#050B1A]/92 p-5 backdrop-blur lg:border-l lg:border-t-0 sm:p-7">
            <div className="flex h-full flex-col">
              <div className="mb-4">
                <div className="text-xs font-semibold uppercase tracking-widest text-white/60">
                  Bestätigung
                </div>
                <div className="mt-2 text-sm leading-relaxed text-white/70">
                  Bitte bestätigen Sie den Provisionshinweis, um fortzufahren.
                </div>
              </div>

              <div className="rounded-[var(--radius-lg)] border border-[rgba(214,181,109,0.40)] bg-[rgba(214,181,109,0.08)] p-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="commission-ack"
                    checked={checked}
                    onCheckedChange={(v) => setChecked(v === true)}
                    className="
              mt-1 h-6 w-6
              border-[rgba(214,181,109,0.35)]
              data-[state=checked]:bg-[color:var(--color-accent)]
              data-[state=checked]:text-black
            "
                  />
                  <label
                    htmlFor="commission-ack"
                    className="cursor-pointer select-none"
                  >
                    <div className="text-sm font-semibold text-white">
                      Ich habe den Hinweis zur Käuferprovision gelesen und
                      verstanden.
                    </div>
                    <div className="mt-1 text-xs text-white/70">
                      Pflichtfeld, um fortzufahren.
                    </div>
                  </label>
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                <Button
                  type="button"
                  onClick={onAccept}
                  disabled={!checked}
                  className="
            h-11
            bg-[color:var(--color-accent)]
            text-black
            hover:bg-[color:var(--color-accent-hover)]
            disabled:opacity-50
          "
                >
                  Einverstanden &amp; weiter
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    onDecline?.();
                    onOpenChange(false);
                  }}
                  className="
            h-11
            border border-[rgba(214,181,109,0.22)]
            bg-[rgba(255,255,255,0.06)]
            text-white/90
            hover:bg-[rgba(214,181,109,0.10)]
          "
                >
                  Ablehnen
                </Button>
              </div>

              <p className="mt-auto pt-4 text-xs text-white/55">
                Hinweis: Bestätigung betrifft nur den Provisionshinweis – kein
                Kaufabschluss.
              </p>
            </div>
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// "use client";

// import Link from "next/link";
// import { useEffect, useMemo, useState } from "react";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import type { BuyerCommission } from "@/lib/types/listings";

// function formatCommission(c?: BuyerCommission) {
//   if (!c) return "Provision auf Anfrage";
//   const vatRate = c.vatRate ?? 19;
//   const vatLabel = c.vatIncluded ? "inkl. MwSt." : `zzgl. MwSt. (${vatRate}%)`;

//   if (c.kind === "percent")
//     return `${c.value.toFixed(2).replace(".", ",")}% ${vatLabel}`;
//   return `${Math.round(c.value).toLocaleString("de-DE")} € ${vatLabel}`;
// }

// type Props = {
//   open: boolean;
//   onOpenChange: (v: boolean) => void;
//   commission?: BuyerCommission;
//   onAccept: () => void;
//   onDecline?: () => void;
// };

// export function CommissionGateDialog({
//   open,
//   onOpenChange,
//   commission,
//   onAccept,
//   onDecline,
// }: Props) {
//   const [checked, setChecked] = useState(false);

//   useEffect(() => {
//     if (open) setChecked(false);
//   }, [open]);

//   const commissionText = useMemo(
//     () => formatCommission(commission),
//     [commission],
//   );

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent
//         className="
//           z-[110]
//           sm:w-full sm:max-w-[720px] w-[1200px]
//           max-h-[calc(100svh-1.25rem)]
//           overflow-hidden
//           p-0

//           border border-[color:var(--color-border)]
//           bg-[color:var(--color-bg)]
//           text-[color:var(--color-text)]
//           shadow-[var(--shadow-soft)]
//           rounded-[var(--radius-xl)]
//         "
//       >
//         {/* Scroll container */}
//         <div className="max-h-[calc(100svh-1.25rem)] overflow-y-auto p-4 sm:p-6 ">
//           <DialogHeader className="space-y-3">
//             <DialogTitle className="text-lg sm:text-xl font-semibold tracking-tight">
//               Hinweis zur Käuferprovision
//             </DialogTitle>
//             <DialogDescription className="text-sm leading-relaxed text-[color:var(--color-text-muted)]">
//               Bevor Sie die Objektseite aufrufen, bestätigen Sie bitte, dass Sie
//               den Hinweis zur Käuferprovision zur Kenntnis genommen haben.
//             </DialogDescription>
//           </DialogHeader>

//           {/* Key info */}
//           <div
//             className="
//               mt-4 rounded-[var(--radius-lg)]
//               border border-[color:var(--color-border)]
//               bg-[color:var(--color-surface)]
//               p-4 sm:p-5
//             "
//           >
//             <div className="text-[11px] font-semibold uppercase tracking-widest text-[color:var(--color-text-muted)]">
//               Käuferprovision (falls Kauf zustande kommt)
//             </div>

//             <div className="mt-1 text-base sm:text-lg font-semibold text-[color:var(--color-text)]">
//               {commissionText}
//             </div>

//             <div className="mt-3 space-y-2 text-sm text-[color:var(--color-text-muted)]">
//               <p>
//                 <span className="font-semibold text-[color:var(--color-text)]">
//                   Fälligkeit:
//                 </span>{" "}
//                 {commission?.due ??
//                   "In der Regel fällig bei notarieller Beurkundung des Kaufvertrags."}
//               </p>
//               <p>
//                 <span className="font-semibold text-[color:var(--color-text)]">
//                   Hinweis:
//                 </span>{" "}
//                 Die Provision wird grundsätzlich nur fällig, wenn ein wirksamer
//                 Kaufvertrag zustande kommt und ein Provisionsanspruch besteht.
//               </p>
//               {commission?.basis ? (
//                 <p>
//                   <span className="font-semibold text-[color:var(--color-text)]">
//                     Berechnungsbasis:
//                   </span>{" "}
//                   {commission.basis}
//                 </p>
//               ) : null}
//               {commission?.note ? (
//                 <p className="text-[color:var(--color-text-muted)]">
//                   {commission.note}
//                 </p>
//               ) : null}
//             </div>

//             <div
//               className="
//                 mt-4 rounded-xl
//                 border border-[color:var(--color-border)]
//                 bg-[color:var(--color-surface-2)]
//                 p-3 text-xs leading-relaxed
//                 text-[color:var(--color-text-muted)]
//               "
//             >
//               Details zu Provisionsregelungen, Widerruf und Vertragsbedingungen
//               finden Sie in unseren{" "}
//               <Link
//                 href="/agb"
//                 className="font-semibold underline underline-offset-4 text-[color:var(--color-link)] hover:text-[color:var(--color-link-hover)]"
//               >
//                 AGB
//               </Link>{" "}
//               sowie in der{" "}
//               <Link
//                 href="/widerruf"
//                 className="font-semibold underline underline-offset-4 text-[color:var(--color-link)] hover:text-[color:var(--color-link-hover)]"
//               >
//                 Widerrufsbelehrung
//               </Link>
//               .
//             </div>
//           </div>

//           {/* Belehrung */}
//           <div
//             className="
//               mt-4 rounded-[var(--radius-lg)]
//               border border-[color:var(--color-border)]
//               bg-[color:var(--color-surface)]
//               p-4 sm:p-5
//             "
//           >
//             <p className="text-sm font-semibold text-[color:var(--color-text)]">
//               Wichtige Belehrung
//             </p>
//             <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[color:var(--color-text-muted)]">
//               <li>
//                 Mit der Bestätigung erklären Sie{" "}
//                 <span className="font-semibold text-[color:var(--color-text)]">
//                   nicht
//                 </span>
//                 , dass Sie die Immobilie kaufen – sondern nur, dass Sie den
//                 Provisionshinweis gelesen haben.
//               </li>
//               <li>
//                 Eine Provision wird in der Regel nur fällig, wenn ein
//                 Kaufvertrag zustande kommt und ein Provisionsanspruch rechtlich
//                 besteht (z. B. durch Maklervertrag/Nachweis/Vermittlung).
//               </li>
//               <li>
//                 Wenn sich die Provisionshöhe für dieses Objekt ändert, kann die
//                 Bestätigung erneut erforderlich sein.
//               </li>
//               <li>
//                 Bei Fragen kontaktieren Sie uns bitte vorab – wir erklären Ihnen
//                 die genaue Regelung transparent.
//               </li>
//             </ul>
//           </div>

//           {/* Checkbox highlight */}
//           <div
//             className="
//               mt-4 rounded-[var(--radius-lg)]
//               border-2 border-[color:var(--color-accent)]
//               bg-[color:var(--color-surface-2)]
//               p-4 sm:p-5
//               shadow-[0_0_0_1px_rgba(201,162,74,0.20)]
//             "
//           >
//             <div className="flex items-start gap-3">
//               <Checkbox
//                 id="commission-ack"
//                 checked={checked}
//                 onCheckedChange={(v) => setChecked(v === true)}
//                 className="
//                   mt-1 h-6 w-6
//                   border-[color:var(--color-border)]
//                   data-[state=checked]:bg-[color:var(--color-accent)]
//                   data-[state=checked]:text-black
//                 "
//               />
//               <label
//                 htmlFor="commission-ack"
//                 className="cursor-pointer select-none"
//               >
//                 <div className="text-sm sm:text-base font-semibold text-[color:var(--color-text)]">
//                   Pflicht: Ich habe den Hinweis zur Käuferprovision gelesen und
//                   verstanden.
//                 </div>
//                 <div className="mt-1 text-xs sm:text-sm text-[color:var(--color-text-muted)]">
//                   (Ohne diese Bestätigung kann die Objektseite nicht geöffnet
//                   werden.)
//                 </div>
//               </label>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
//             <Button
//               type="button"
//               variant="secondary"
//               onClick={() => {
//                 onDecline?.();
//                 onOpenChange(false);
//               }}
//               className="
//                 h-11 sm:h-10
//                 border border-[color:var(--color-border)]
//                 bg-[color:var(--color-surface)]
//                 text-[color:var(--color-text)]
//                 hover:bg-[color:var(--color-surface-2)]
//               "
//             >
//               Ablehnen
//             </Button>

//             <Button
//               type="button"
//               onClick={() => {
//                 // IMPORTANT: caller decides closing/navigation logic
//                 onAccept();
//               }}
//               disabled={!checked}
//               className="
//                 h-11 sm:h-10
//                 bg-[color:var(--color-accent)]
//                 text-black
//                 hover:bg-[color:var(--color-accent-hover)]
//                 disabled:opacity-50
//               "
//             >
//               Einverstanden &amp; weiter
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

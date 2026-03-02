// components/referenzen/ReferencesShell.tsx
import type { ReactNode } from "react";

type Props = { children: ReactNode };

export function ReferencesShell({ children }: Props) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[color:var(--color-bg)]">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0">
        {/* Champagne gold glows */}
        <div className="absolute -top-56 left-1/2 h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(214,181,109,0.18),transparent_60%)] blur-3xl" />
        <div className="absolute -top-40 right-[-180px] h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle_at_center,rgba(214,181,109,0.14),transparent_62%)] blur-3xl" />
        <div className="absolute -bottom-72 left-[-160px] h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle_at_center,rgba(214,181,109,0.10),transparent_65%)] blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.35),transparent_55%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-12 md:py-16 text-[color:var(--color-text)]">
        {children}
      </div>
    </div>
  );
}

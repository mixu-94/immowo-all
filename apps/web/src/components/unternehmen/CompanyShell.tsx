// src/components/company/CompanyShell.tsx
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/**
 * CompanyShell (Legacy Design)
 * - Full-page background (gradient, glow blobs, subtle vignette)
 * - Inner container keeps content width consistent
 */
export function CompanyShell({ children }: Props) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050B1A] text-white">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050B1A] via-[#060F2A] to-[#050B1A]" />

        <div className="absolute -top-56 left-1/2 h-[760px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.22),transparent_60%)] blur-3xl" />
        <div className="absolute -top-40 right-[-180px] h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.16),transparent_62%)] blur-3xl" />
        <div className="absolute -bottom-72 left-[-160px] h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.10),transparent_65%)] blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.35),transparent_55%)]" />
      </div>

      {/* Content container */}
      <div className="relative mx-auto w-full max-w-7xl px-6 py-12 md:py-16">
        {children}
      </div>
    </main>
  );
}

// // components/unternehmen/CompanyShell.tsx
// import type { ReactNode } from "react";

// type Props = { children: ReactNode };

// export function CompanyShell({ children }: Props) {
//   return (
//     <main className="relative min-h-screen overflow-hidden bg-[#050B1A] text-white">
//       {/* Background layers */}
//       <div className="pointer-events-none absolute inset-0">
//         <div className="absolute inset-0 bg-gradient-to-b from-[#050B1A] via-[#060F2A] to-[#050B1A]" />

//         <div className="absolute -top-56 left-1/2 h-[760px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.22),transparent_60%)] blur-3xl" />
//         <div className="absolute -top-40 right-[-180px] h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.16),transparent_62%)] blur-3xl" />
//         <div className="absolute -bottom-72 left-[-160px] h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.10),transparent_65%)] blur-3xl" />

//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.35),transparent_55%)]" />
//       </div>

//       <div className="relative mx-auto w-full max-w-7xl px-6 py-12 md:py-16">
//         {children}
//       </div>
//     </main>
//   );
// }

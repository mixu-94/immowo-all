import Link from "next/link";
import { ArrowRight, Home, Search, PhoneCall } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
      {/* Navy background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050B1A] via-[#060F2A] to-[#050B1A]" />
        <div className="absolute -top-56 left-1/2 h-[760px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.22),transparent_60%)] blur-3xl" />
        <div className="absolute -top-40 right-[-180px] h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.16),transparent_62%)] blur-3xl" />
        <div className="absolute -bottom-72 left-[-160px] h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.10),transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.35),transparent_55%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-16">
        <div className="grid w-full gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest text-white/85 backdrop-blur">
              404 • SEITE NICHT GEFUNDEN
            </div>

            <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
              Diese Seite ist{" "}
              <span className="bg-gradient-to-r from-cyan-200 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">
                nicht verfügbar
              </span>
              .
            </h1>

            <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-white/70 md:text-base">
              Der Link ist möglicherweise veraltet oder die Seite wurde
              verschoben. Sie können zurück zur Startseite, aktuelle Immobilien
              ansehen oder direkt Kontakt aufnehmen.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <Home className="h-4 w-4" />
                Startseite
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/immobilien"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
              >
                <Search className="h-4 w-4" />
                Angebote ansehen
              </Link>

              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
              >
                <PhoneCall className="h-4 w-4" />
                Kontakt
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <InfoCard
                title="Schlüsselfertig"
                text="Direkt verfügbare Immobilien & Besichtigungen."
              />
              <InfoCard
                title="Neubau"
                text="Projekte „vom Papier weg“ – transparent begleitet."
              />
              <InfoCard
                title="Diskret"
                text="Unterlagen/Details auf Anfrage, professionell."
              />
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-tr from-cyan-400/15 via-fuchsia-400/10 to-indigo-400/15 blur-2xl" />
            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="text-xs font-semibold tracking-widest text-white/60">
                FEHLER 404
              </div>
              <div className="mt-3 text-7xl font-semibold tracking-tight text-white/90">
                404
              </div>
              <div className="mt-2 text-sm text-white/70">
                Seite nicht gefunden
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-5">
                <div className="text-sm font-semibold text-white">Tipp</div>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Wenn Sie von einer Objektseite kamen, finden Sie das passende
                  Angebot meist über die Übersicht. Alternativ: schreiben Sie
                  uns kurz – wir senden Ihnen den Link.
                </p>
                <Link
                  href="/immobilien"
                  className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-2xl bg-white px-5 text-sm font-semibold text-black shadow-lg shadow-black/20 transition hover:bg-white/90"
                >
                  Zur Immobilienübersicht
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-white/15 hover:bg-white/7">
      <div className="text-sm font-semibold text-white">{title}</div>
      <div className="mt-2 text-sm text-white/70">{text}</div>
    </div>
  );
}

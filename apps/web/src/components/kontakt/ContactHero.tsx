import Image from "next/image";
import { PhoneCall, Clock, ShieldCheck } from "lucide-react";

export function ContactHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-[rgba(214,181,109,0.22)] bg-[color:var(--color-surface)]">
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(214,181,109,0.55)] to-transparent" />

      {/* Ambient gold glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(214,181,109,0.12),transparent_65%)] blur-2xl" />
        <div className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(214,181,109,0.08),transparent_65%)] blur-2xl" />
      </div>

      <div className="relative grid gap-8 p-6 md:grid-cols-[1.05fr_0.95fr] md:items-center md:p-10">
        {/* Left: text */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(214,181,109,0.30)] bg-[rgba(214,181,109,0.08)] px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-[color:var(--color-accent)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)] shadow-[0_0_0_3px_rgba(214,181,109,0.20)]" />
            KONTAKT • RÜCKRUF • TERMINWUNSCH
          </div>

          <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-[color:var(--color-text)] md:text-5xl">
            Persönlich erreichbar –{" "}
            <span className="bg-[linear-gradient(90deg,var(--color-accent),rgba(230,205,143,1),rgba(214,181,109,0.85))] bg-clip-text text-transparent">
              diskret & professionell
            </span>
            .
          </h1>

          <p className="mt-5 max-w-xl text-pretty text-sm leading-relaxed text-[color:var(--color-text-muted)] md:text-base">
            Ob schlüsselfertige Immobilie oder Neubauprojekt (Kauf ab Plan):
            Wir klären die nächsten Schritte strukturiert – und melden uns
            zeitnah mit einer Bestätigung.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <MiniTrust
              icon={<Clock className="h-4 w-4 text-[color:var(--color-accent)]" />}
              title="Schnelle Rückmeldung"
              text="Terminvorschlag & Bestätigung"
            />
            <MiniTrust
              icon={<ShieldCheck className="h-4 w-4 text-[color:var(--color-accent)]" />}
              title="Diskret"
              text="Unterlagen auf Anfrage"
            />
            <MiniTrust
              icon={<PhoneCall className="h-4 w-4 text-[color:var(--color-accent)]" />}
              title="Direkt"
              text="Kurzer Draht zum Team"
            />
          </div>
        </div>

        {/* Right: image */}
        <div className="relative">
          <div className="absolute -inset-4 rounded-[28px] bg-[radial-gradient(ellipse_at_center,rgba(214,181,109,0.14),transparent_65%)] blur-xl" />
          <div className="relative overflow-hidden rounded-2xl border border-[rgba(214,181,109,0.20)]">
            <div className="relative aspect-[4/3] md:aspect-[5/4]">
              <Image
                src="/assets/images/real-estate/realestate6.jpg"
                alt="Beratung & Kontakt"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            </div>

            {/* Overlay card */}
            <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-[rgba(214,181,109,0.25)] bg-black/50 p-4 backdrop-blur">
              <div className="text-[10px] font-semibold tracking-widest text-[color:var(--color-accent)]">
                RÜCKRUF-OPTION
              </div>
              <div className="mt-1 text-sm font-semibold text-[color:var(--color-text)]">
                Wunschzeit angeben – wir bestätigen den Termin.
              </div>
              <div className="mt-2 text-xs text-[color:var(--color-text-muted)]">
                Details & Dokumente werden aus Diskretionsgründen häufig erst nach Anfrage freigegeben.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniTrust({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface-2)] p-4 transition-colors duration-200 hover:border-[rgba(214,181,109,0.28)]">
      <div className="flex items-center gap-2 text-sm font-semibold text-[color:var(--color-text)]">
        {icon}
        {title}
      </div>
      <div className="mt-1 text-xs text-[color:var(--color-text-muted)]">{text}</div>
    </div>
  );
}

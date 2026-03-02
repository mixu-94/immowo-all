// components/kontakt/ContactTrust.tsx
import { Lock, Scale, BadgeCheck } from "lucide-react";

export function ContactTrust() {
  return (
    <section className="mt-10 grid gap-4 lg:grid-cols-3">
      <Card
        icon={<BadgeCheck className="h-4.5 w-4.5 text-[color:var(--color-accent)]" />}
        title="Professionelle Abwicklung"
        text="Klare Kommunikation, strukturierte Prozesse und nachvollziehbare Unterlagen – damit Entscheidungen sicher getroffen werden."
      />
      <Card
        icon={<Scale className="h-4.5 w-4.5 text-[color:var(--color-accent)]" />}
        title="Transparenz & Fairness"
        text="Wir sprechen offen über Ablauf, Konditionen und nächste Schritte – ohne unnötige Reibung."
      />
      <Card
        icon={<Lock className="h-4.5 w-4.5 text-[color:var(--color-accent)]" />}
        title="Datenschutz & Diskretion"
        text="Ihre Daten behandeln wir vertraulich und nur zum Zweck der Anfrage. Datensparsamkeit ist Standard."
      />
    </section>
  );
}

function Card({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 transition-all duration-300 hover:border-[rgba(214,181,109,0.35)] hover:bg-[rgba(214,181,109,0.03)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(214,181,109,0.50)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(214,181,109,0.25)] bg-[rgba(214,181,109,0.08)]">
          {icon}
        </div>
        <h3 className="text-sm font-semibold text-[color:var(--color-text)]">{title}</h3>
      </div>
      <p className="text-sm leading-relaxed text-[color:var(--color-text-muted)]">{text}</p>
    </div>
  );
}

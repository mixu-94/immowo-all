// components/kontakt/ContactPeople.tsx
import Image from "next/image";
import { Mail, Phone, BadgeCheck } from "lucide-react";

type Person = {
  name: string;
  role: string;
  phone: string;
  email: string;
  imageSrc: string;
  focus: string[];
};

const people: Person[] = [
  {
    name: "Max Mustermann",
    role: "Vertrieb \u2022 Neubau & Bestand",
    phone: "+49 170 1234567",
    email: "vertrieb@beispiel.de",
    imageSrc: "/assets/images/real-estate/realestate5.jpg",
    focus: ["Schlüsselfertig", "Besichtigungen", "Käuferprozess"],
  },
  {
    name: "Julia Musterfrau",
    role: "Projektentwicklung \u2022 Bauträger",
    phone: "+49 170 7654321",
    email: "projekte@beispiel.de",
    imageSrc: "/assets/images/real-estate/realestate6.jpg",
    focus: ["Kauf ab Plan", "Planung", "Bauablauf"],
  },
];

export function ContactPeople() {
  return (
    <aside className="space-y-4">
      {/* Header card */}
      <div className="relative overflow-hidden rounded-2xl border border-[rgba(214,181,109,0.22)] bg-[color:var(--color-surface)] p-6">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(214,181,109,0.50)] to-transparent" />
        <div className="mb-1 text-[10px] font-semibold tracking-widest text-[color:var(--color-accent)]">
          ANSPRECHPARTNER
        </div>
        <h2 className="text-lg font-semibold text-[color:var(--color-text)]">Direkter Kontakt</h2>
        <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-text-muted)]">
          Wählen Sie den passenden Ansprechpartner – oder senden Sie einfach das
          Formular. Wir melden uns schnellstmöglich.
        </p>
      </div>

      {people.map((p) => (
        <div
          key={p.email}
          className="group relative overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5 transition-all duration-300 hover:border-[rgba(214,181,109,0.35)] hover:bg-[rgba(214,181,109,0.03)]"
        >
          {/* Gold shimmer on hover */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(214,181,109,0.50)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="flex gap-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-[rgba(214,181,109,0.22)]">
              <Image
                src={p.imageSrc}
                alt={p.name}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <div className="truncate text-sm font-semibold text-[color:var(--color-text)]">
                  {p.name}
                </div>
                <BadgeCheck className="h-4 w-4 shrink-0 text-[color:var(--color-accent)]" />
              </div>
              <div className="mt-0.5 text-xs text-[color:var(--color-text-muted)]">{p.role}</div>

              <div className="mt-3 flex flex-col gap-2 text-sm">
                <a
                  href={`tel:${p.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 text-[color:var(--color-text-muted)] transition-colors hover:text-[color:var(--color-accent)]"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {p.phone}
                </a>
                <a
                  href={`mailto:${p.email}`}
                  className="inline-flex items-center gap-2 text-[color:var(--color-text-muted)] transition-colors hover:text-[color:var(--color-accent)]"
                >
                  <Mail className="h-3.5 w-3.5" />
                  {p.email}
                </a>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.focus.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[rgba(214,181,109,0.22)] bg-[rgba(214,181,109,0.06)] px-2.5 py-1 text-[11px] text-[color:var(--color-accent)] opacity-85"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </aside>
  );
}

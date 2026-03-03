// components/kontakt/ContactPeople.tsx
import Image from "next/image";
import { Mail, Phone, BadgeCheck } from "lucide-react";
import { getMakler } from "@/lib/data/makler";
import type { MaklerContact } from "@/lib/types/listings";

export async function ContactPeople() {
  const makler = await getMakler();

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
          W\u00e4hlen Sie den passenden Ansprechpartner \u2013 oder senden Sie einfach das
          Formular. Wir melden uns schnellstm\u00f6glich.
        </p>
      </div>

      {makler.map((m: MaklerContact) => (
        <div
          key={m.id}
          className="group relative overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5 transition-all duration-300 hover:border-[rgba(214,181,109,0.35)] hover:bg-[rgba(214,181,109,0.03)]"
        >
          {/* Gold shimmer on hover */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(214,181,109,0.50)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="flex gap-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-[rgba(214,181,109,0.22)] bg-[rgba(255,255,255,0.06)]">
              {m.photoUrl ? (
                <Image
                  src={m.photoUrl}
                  alt={m.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-[rgba(214,181,109,0.7)]">
                  {m.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <div className="truncate text-sm font-semibold text-[color:var(--color-text)]">
                  {m.name}
                </div>
                <BadgeCheck className="h-4 w-4 shrink-0 text-[color:var(--color-accent)]" />
              </div>
              {m.titleRole && (
                <div className="mt-0.5 text-xs text-[color:var(--color-text-muted)]">{m.titleRole}</div>
              )}

              <div className="mt-3 flex flex-col gap-2 text-sm">
                {m.phone && (
                  <a
                    href={`tel:${m.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 text-[color:var(--color-text-muted)] transition-colors hover:text-[color:var(--color-accent)]"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {m.phone}
                  </a>
                )}
                {m.email && (
                  <a
                    href={`mailto:${m.email}`}
                    className="inline-flex items-center gap-2 text-[color:var(--color-text-muted)] transition-colors hover:text-[color:var(--color-accent)]"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    {m.email}
                  </a>
                )}
              </div>

              {m.focus && m.focus.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {m.focus.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[rgba(214,181,109,0.22)] bg-[rgba(214,181,109,0.06)] px-2.5 py-1 text-[11px] text-[color:var(--color-accent)] opacity-85"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </aside>
  );
}

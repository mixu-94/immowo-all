"use client";

import React, { useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Mail, User, MessageSquare, Send, Phone,
  CheckCircle2, CalendarDays, Clock3, Timer,
  HelpCircle, FileText, ExternalLink,
} from "lucide-react";

type DoneState = null | "ok" | string;

type ContactFormProps = {
  listing?: string;
  listingTitle?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function safeDuration(v: FormDataEntryValue | null, fallback = 15) {
  const n = Number(v ?? fallback);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(15, Math.min(120, Math.round(n)));
}

export function ContactForm(props: ContactFormProps) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<DoneState>(null);

  const formRef = useRef<HTMLFormElement | null>(null);
  const params = useSearchParams();

  const listing = (props.listing ?? params.get("listing") ?? "").trim();
  const listingTitle = (props.listingTitle ?? params.get("title") ?? "").trim();
  const listingHref = listing ? `/objekte/${encodeURIComponent(listing)}` : "";

  const defaultTopic = useMemo(() => {
    if (listing) return "expose";
    return "allgemein";
  }, [listing]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(null);
    const formEl = e.currentTarget;
    setLoading(true);
    const form = new FormData(formEl);

    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const contactPreference = String(form.get("contactPreference") ?? "telefon").trim();
    const topic = String(form.get("topic") ?? "allgemein").trim();
    const message = String(form.get("message") ?? "").trim();
    const callbackRequested = form.get("callbackRequested") === "on";
    const preferredDate = String(form.get("preferredDate") ?? "").trim();
    const preferredTimeWindow = String(form.get("preferredTimeWindow") ?? "").trim();
    const preferredTime = String(form.get("preferredTime") ?? "").trim();
    const durationMinutes = safeDuration(form.get("durationMinutes"), 15);
    const listingValue = String(form.get("listing") ?? listing).trim();
    const listingTitleValue = String(form.get("listingTitle") ?? listingTitle).trim();
    const website = String(form.get("website") ?? "").trim();

    if (!name || !email) { setLoading(false); setDone("Bitte Name und E-Mail ausfüllen."); return; }
    if (!isValidEmail(email)) { setLoading(false); setDone("Bitte eine gültige E-Mail-Adresse angeben."); return; }
    if (!message && !callbackRequested) { setLoading(false); setDone("Bitte Nachricht ausfüllen oder Rückruf anfragen."); return; }
    if (callbackRequested && !phone) { setLoading(false); setDone("Für einen Rückruf bitte eine Telefonnummer angeben."); return; }

    const payload = {
      name, email, phone, contactPreference, topic, message, callbackRequested,
      preferredDate, preferredTimeWindow, preferredTime, durationMinutes,
      listing: listingValue, listingTitle: listingTitleValue,
      website, tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => null)) as any;
      setLoading(false);
      if (!res.ok || !data?.ok) { setDone(data?.error ?? "Fehler beim Senden."); return; }
      setDone("ok");
      formEl.reset();
    } catch {
      setLoading(false);
      setDone("Netzwerkfehler. Bitte später erneut versuchen.");
    }
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 md:p-8">
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(214,181,109,0.45)] to-transparent" />

      <header className="mb-6">
        <div className="text-[10px] font-semibold tracking-widest text-[color:var(--color-accent)]">
          KONTAKTFORMULAR
        </div>
        <h2 className="mt-2 text-xl font-semibold text-[color:var(--color-text)]">
          Nachricht senden oder Rückruf anfragen
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-text-muted)]">
          Hinterlassen Sie Ihre Daten – optional mit Terminwunsch. Wir melden
          uns mit einer Bestätigung zurück.
        </p>
      </header>

      {/* Listing context card */}
      {listing ? (
        <div className="mb-6 overflow-hidden rounded-xl border border-[rgba(214,181,109,0.25)] bg-[rgba(214,181,109,0.05)] p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[rgba(214,181,109,0.25)] bg-[rgba(214,181,109,0.08)]">
                <FileText className="h-4 w-4 text-[color:var(--color-accent)]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[color:var(--color-text)]">
                  Anfrage zu Objekt
                </div>
                <div className="mt-1 text-sm text-[color:var(--color-text-muted)]">
                  {listingTitle ? listingTitle : `Objekt ${listing}`}
                </div>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-[rgba(214,181,109,0.22)] bg-[rgba(214,181,109,0.06)] px-3 py-1 text-[11px] font-semibold text-[color:var(--color-accent)]">
                  ID/Slug: {listing}
                </div>
              </div>
            </div>
            {listingHref ? (
              <a
                href={listingHref}
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-strong)] bg-transparent px-4 py-2 text-xs font-semibold text-[color:var(--color-text-muted)] transition hover:border-[rgba(214,181,109,0.35)] hover:text-[color:var(--color-accent)]"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Objekt ansehen
              </a>
            ) : null}
          </div>
          <p className="mt-3 text-xs text-[color:var(--color-text-muted)]">
            Tipp: Exposé/Unterlagen werden aus Diskretionsgründen häufig erst nach Anfrage freigegeben.
          </p>
        </div>
      ) : null}

      <form ref={formRef} onSubmit={onSubmit} className="space-y-5">
        <input name="website" autoComplete="off" tabIndex={-1} className="hidden" />
        <input type="hidden" name="listing" value={listing} readOnly />
        <input type="hidden" name="listingTitle" value={listingTitle} readOnly />

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Name" icon={<User className="h-4 w-4 text-[color:var(--color-text-muted)]" />}>
            <input
              name="name" required disabled={loading}
              className="w-full bg-transparent text-[color:var(--color-text)] outline-none placeholder:text-[color:var(--color-text-muted)] disabled:opacity-70"
              placeholder="Max Mustermann"
            />
          </Field>
          <Field label="E-Mail" icon={<Mail className="h-4 w-4 text-[color:var(--color-text-muted)]" />}>
            <input
              name="email" type="email" required disabled={loading}
              className="w-full bg-transparent text-[color:var(--color-text)] outline-none placeholder:text-[color:var(--color-text-muted)] disabled:opacity-70"
              placeholder="name@domain.de"
            />
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <Field label="Telefon (optional)" icon={<Phone className="h-4 w-4 text-[color:var(--color-text-muted)]" />}>
              <input
                name="phone" type="tel" disabled={loading}
                className="w-full bg-transparent text-[color:var(--color-text)] outline-none placeholder:text-[color:var(--color-text-muted)] disabled:opacity-70"
                placeholder="+49 170 1234567"
                inputMode="tel" autoComplete="tel"
              />
            </Field>
            <p className="mt-2 text-xs text-[color:var(--color-text-muted)]">
              Empfohlen, wenn Sie einen Rückruf wünschen.
            </p>
          </div>

          <div className="grid gap-3">
            <label className="flex items-start gap-3 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface-2)] px-4 py-3 text-sm text-[color:var(--color-text-muted)] transition hover:border-[rgba(214,181,109,0.28)] hover:bg-[rgba(214,181,109,0.04)]">
              <input
                type="checkbox" name="callbackRequested"
                className="mt-1 h-4 w-4 accent-[color:var(--color-accent)]"
                disabled={loading}
              />
              <span className="leading-relaxed">
                Bitte um Rückruf{" "}
                <span className="text-[color:var(--color-text-muted)] opacity-70">(wir melden uns zeitnah)</span>
              </span>
            </label>

            <div className="grid grid-cols-2 gap-3">
              <Select
                name="contactPreference" label="Bevorzugt"
                icon={<HelpCircle className="h-4 w-4 text-[color:var(--color-text-muted)]" />}
                options={[{ value: "telefon", label: "Telefon" }, { value: "email", label: "E-Mail" }]}
                defaultValue="telefon" disabled={loading}
              />
              <Select
                name="topic" label="Thema"
                icon={<MessageSquare className="h-4 w-4 text-[color:var(--color-text-muted)]" />}
                options={[
                  { value: "allgemein", label: "Allgemein" },
                  { value: "expose", label: "Exposé / Unterlagen" },
                  { value: "kaufen", label: "Immobilie kaufen" },
                  { value: "neubau", label: "Neubau / Kauf ab Plan" },
                  { value: "verkauf", label: "Verkauf / Vermarktung" },
                ]}
                defaultValue={defaultTopic} disabled={loading}
              />
            </div>
          </div>
        </div>

        {/* Terminwunsch */}
        <div className="overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface-2)]">
          <div className="border-b border-[color:var(--color-border)] px-5 py-3">
            <div className="text-sm font-semibold text-[color:var(--color-text)]">Terminwunsch</div>
            <div className="mt-0.5 text-xs text-[color:var(--color-text-muted)]">
              Wir bestätigen den Termin per E-Mail/Telefon.
            </div>
          </div>
          <div className="p-5">
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="Datum" icon={<CalendarDays className="h-4 w-4 text-[color:var(--color-text-muted)]" />}>
                <input
                  type="date" name="preferredDate" disabled={loading}
                  className="w-full bg-transparent text-[color:var(--color-text)] outline-none disabled:opacity-70"
                />
              </Field>
              <Select
                name="preferredTimeWindow" label="Zeitfenster"
                icon={<Clock3 className="h-4 w-4 text-[color:var(--color-text-muted)]" />}
                options={[
                  { value: "", label: "Bitte wählen" },
                  { value: "09-12", label: "09:00 – 12:00" },
                  { value: "12-15", label: "12:00 – 15:00" },
                  { value: "15-18", label: "15:00 – 18:00" },
                  { value: "18-20", label: "18:00 – 20:00" },
                ]}
                defaultValue="" disabled={loading}
              />
              <Select
                name="durationMinutes" label="Dauer"
                icon={<Timer className="h-4 w-4 text-[color:var(--color-text-muted)]" />}
                options={[
                  { value: "15", label: "15 Min." },
                  { value: "30", label: "30 Min." },
                  { value: "45", label: "45 Min." },
                  { value: "60", label: "60 Min." },
                ]}
                defaultValue="15" disabled={loading}
              />
            </div>
            <div className="mt-4">
              <Field label="Bevorzugte Uhrzeit (optional)" icon={<Clock3 className="h-4 w-4 text-[color:var(--color-text-muted)]" />}>
                <input
                  type="time" name="preferredTime" disabled={loading}
                  className="w-full bg-transparent text-[color:var(--color-text)] outline-none disabled:opacity-70"
                />
              </Field>
              <p className="mt-2 text-xs text-[color:var(--color-text-muted)]">
                Wenn möglich richten wir uns danach – ansonsten innerhalb Ihres Zeitfensters.
              </p>
            </div>
          </div>
        </div>

        {/* Nachricht */}
        <div>
          <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-[color:var(--color-text-muted)]">
            Nachricht (optional)
          </label>
          <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface-2)] px-4 py-3 transition-colors focus-within:border-[rgba(214,181,109,0.35)]">
            <div className="mb-2 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-[color:var(--color-text-muted)]" />
              <span className="text-xs text-[color:var(--color-text-muted)]">Worum geht es?</span>
            </div>
            <textarea
              name="message" rows={5} disabled={loading}
              className="w-full resize-none bg-transparent text-sm text-[color:var(--color-text)] outline-none placeholder:text-[color:var(--color-text-muted)] disabled:opacity-70"
              placeholder="Kurzbeschreibung (z.B. Objekt, Standort, Budget, Fragen)…"
            />
          </div>
          <p className="mt-2 text-xs text-[color:var(--color-text-muted)]">
            Wenn Sie nur einen Rückruf möchten, kann das Feld leer bleiben.
          </p>
        </div>

        <p className="text-xs text-[color:var(--color-text-muted)]">
          Wenn Sie uns über das Kontaktformular kontaktieren, verarbeiten wir Ihre Angaben zur
          Bearbeitung Ihrer Anfrage und zur Kontaktaufnahme. Weitere Informationen finden Sie in
          unserer{" "}
          <a href="/datenschutz" className="text-[color:var(--color-accent)] underline underline-offset-2 hover:opacity-80">
            Datenschutzerklärung
          </a>
          .
        </p>

        <button
          type="submit" disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--color-accent)] px-6 py-3 text-sm font-semibold text-black shadow-[0_8px_28px_rgba(214,181,109,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[color:var(--color-accent-hover)] hover:shadow-[0_12px_36px_rgba(214,181,109,0.36)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send className="h-4 w-4" />
          {loading ? "Senden…" : "Absenden"}
        </button>

        {done === "ok" ? (
          <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-4 text-sm text-emerald-300">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <div className="font-semibold">Vielen Dank!</div>
                <div className="mt-1 opacity-80">
                  Ihre Anfrage ist eingegangen. Wir melden uns zeitnah bei Ihnen.
                </div>
              </div>
            </div>
          </div>
        ) : done ? (
          <div className="rounded-xl border border-red-500/25 bg-red-500/10 p-4 text-sm text-red-300">
            {done}
          </div>
        ) : null}

        <p className="text-xs text-[color:var(--color-text-muted)]">
          Hinweis: Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet.
        </p>
      </form>
    </section>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-[color:var(--color-text-muted)]">
        {label}
      </label>
      <div className="flex items-center gap-3 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface-2)] px-4 py-3 transition-colors focus-within:border-[rgba(214,181,109,0.35)]">
        {icon}
        {children}
      </div>
    </div>
  );
}

function Select({
  name, label, icon, options, defaultValue, disabled,
}: {
  name: string; label: string; icon: React.ReactNode;
  options: { value: string; label: string }[];
  defaultValue: string; disabled?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-[color:var(--color-text-muted)]">
        {label}
      </label>
      <div className="flex items-center gap-3 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface-2)] px-4 py-3 transition-colors focus-within:border-[rgba(214,181,109,0.35)]">
        {icon}
        <select
          name={name}
          className="w-full bg-transparent text-sm text-[color:var(--color-text)] outline-none disabled:opacity-70"
          defaultValue={defaultValue}
          disabled={disabled}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-[#0f1623] text-white">
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

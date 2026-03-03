// src/app/(site)/datenschutz/page.tsx
import type { Metadata } from "next";
import { LegalPage } from "@/components/Legals/LegalPage";

export const metadata: Metadata = {
  title: "Datenschutzerkl\u00e4rung",
  description:
    "Informationen zur Verarbeitung personenbezogener Daten nach DSGVO sowie zu Cookies, externen Inhalten und Kontaktanfragen.",
  openGraph: {
    title: "Datenschutzerkl\u00e4rung | Immowo Ventures",
    description:
      "Datenschutzerkl\u00e4rung der Immowo Ventures GmbH gem\u00e4\u00df DSGVO.",
  },
  robots: { index: false, follow: false },
};

type TocItem = { id: string; label: string };

const toc: TocItem[] = [
  { id: "verantwortlicher", label: "1. Verantwortlicher" },
  { id: "dsb", label: "2. Datenschutzbeauftragter" },
  { id: "allgemeines", label: "3. Allgemeines / Rechtsgrundlagen" },
  { id: "serverlogs", label: "4. Hosting & Server-Logfiles" },
  { id: "kontakt", label: "5. Kontaktaufnahme & Kontaktformular" },
  {
    id: "immobilien",
    label: "6. Immobilienanfragen / Expos\u00e9 / Besichtigung",
  },
  { id: "cookies", label: "7. Cookies & Consent (TDDDG/DSGVO)" },
  { id: "analytics", label: "8. Reichweitenmessung / Analytics (optional)" },
  { id: "maps", label: "9. Google Maps (optional)" },
  { id: "youtube", label: "10. YouTube / Videos (optional)" },
  { id: "social", label: "11. Social Media Links" },
  { id: "empfaenger", label: "12. Empf\u00e4nger & Auftragsverarbeiter" },
  { id: "drittland", label: "13. Drittland\u00fcbermittlungen" },
  { id: "speicherdauer", label: "14. Speicherdauer / L\u00f6schung" },
  { id: "rechte", label: "15. Betroffenenrechte" },
  { id: "aufsicht", label: "16. Aufsichtsbeh\u00f6rde" },
  { id: "sicherheit", label: "17. Sicherheit" },
  { id: "aenderungen", label: "18. \u00c4nderungen" },
];

const Stand = "26.02.2026";

export default function Page() {
  return (
    <LegalPage title="Datenschutzerkl\u00e4rung" lastUpdated={Stand}>
      <div className="not-prose">
        {/* TOC + Content two-column layout */}
        <div className="grid gap-10 lg:grid-cols-12">
          {/* TOC sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-6 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-[color:var(--color-text)]">
                  Inhalt
                </h2>
                <span className="rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface-2)] px-2 py-0.5 text-xs text-[color:var(--color-text-muted)]">
                  DSGVO
                </span>
              </div>
              <nav className="mt-4">
                <ul className="space-y-1">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="block rounded-lg px-2 py-1.5 text-sm text-[color:var(--color-text-muted)] transition hover:bg-[color:var(--color-surface-2)] hover:text-[color:var(--color-text)]"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-5 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface-2)] p-4 text-xs leading-relaxed text-[color:var(--color-text-muted)]">
                <p className="font-semibold text-[color:var(--color-text)]">
                  Hinweis
                </p>
                <p className="mt-1">
                  Bitte ersetzen Sie die{" "}
                  <span className="font-semibold">[Platzhalter]</span> durch
                  Ihre tats\u00e4chlichen Angaben. Falsche Angaben k\u00f6nnen
                  rechtliche Risiken begr\u00fcnden.
                </p>
              </div>
            </div>
          </aside>

          {/* Content */}
          <article className="prose prose-invert max-w-none lg:col-span-8 prose-p:leading-relaxed prose-p:text-white/80 prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-xl prose-h2:font-semibold prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-3 prose-ul:my-4 prose-li:my-1 prose-li:text-white/80 prose-strong:text-white">
            <h2 id="verantwortlicher">1. Verantwortlicher</h2>
            <p>
              Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO)
              ist:
            </p>
            <div className="not-prose rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5">
              <p className="font-semibold text-[color:var(--color-text)]">
                [Unternehmensname]
              </p>
              <p className="text-[color:var(--color-text-muted)]">
                [Stra\u00dfe Hausnummer]
              </p>
              <p className="text-[color:var(--color-text-muted)]">
                [PLZ Ort], [Land]
              </p>
              <p className="mt-3 text-[color:var(--color-text-muted)]">
                E-Mail:{" "}
                <span className="font-medium text-[color:var(--color-text)]">
                  [info@\u2026]
                </span>
                <br />
                Telefon:{" "}
                <span className="font-medium text-[color:var(--color-text)]">
                  [+49 \u2026]
                </span>
              </p>
            </div>

            <h2 id="dsb">2. Datenschutzbeauftragter</h2>
            <p>
              <strong>
                Sofern ein Datenschutzbeauftragter bestellt ist
              </strong>
              , erreichen Sie diesen unter:{" "}
              <span className="font-semibold">
                [Name/Firma, Anschrift, E-Mail, Telefon]
              </span>
            </p>
            <p>
              Falls kein Datenschutzbeauftragter bestellt ist:{" "}
              <em>
                Es ist kein Datenschutzbeauftragter bestellt.
              </em>
            </p>

            <h2 id="allgemeines">3. Allgemeines / Rechtsgrundlagen</h2>
            <p>
              Wir verarbeiten personenbezogene Daten nur, soweit dies zur
              Bereitstellung dieser Website, zur Bearbeitung Ihrer Anfragen oder
              zur Durchf\u00fchrung (vor-)vertraglicher Ma\u00dfnahmen
              erforderlich ist.
            </p>
            <ul>
              <li>
                <strong>Art. 6 Abs. 1 lit. b DSGVO</strong> \u2013 Vertrag /
                vorvertragliche Ma\u00dfnahmen
              </li>
              <li>
                <strong>Art. 6 Abs. 1 lit. f DSGVO</strong> \u2013 berechtigtes
                Interesse
              </li>
              <li>
                <strong>Art. 6 Abs. 1 lit. a DSGVO</strong> \u2013 Einwilligung
              </li>
            </ul>
            <p>
              Zus\u00e4tzlich gelten f\u00fcr das Speichern/Auslesen von
              Informationen auf Ihrem Endger\u00e4t die Regeln des{" "}
              <strong>TDDDG (\u00a7 25)</strong> (ehem. TTDSG).
            </p>

            <h2 id="serverlogs">4. Hosting & Server-Logfiles</h2>
            <p>
              Beim Besuch der Website werden durch unseren Hostinganbieter
              Server-Logfiles verarbeitet (IP-Adresse, Zugriffsdatum,
              Browsertyp, Statuscodes u.\u00a0\u00e4.).
            </p>
            <p>
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO.
              <br />
              <strong>Speicherdauer:</strong> [z.\u00a0B. 7\u201314 Tage]
              <br />
              <strong>Hosting-Dienstleister:</strong> [z.\u00a0B.
              Vercel/Hetzner/\u2026], [Land]
            </p>

            <h2 id="kontakt">5. Kontaktaufnahme & Kontaktformular</h2>
            <p>
              Wenn Sie uns kontaktieren, verarbeiten wir die von Ihnen
              \u00fcbermittelten Daten (Name, E-Mail, Telefon, Nachricht), um
              Ihre Anfrage zu bearbeiten.
            </p>
            <p>
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO und
              Art. 6 Abs. 1 lit. f DSGVO.
              <br />
              <strong>Speicherdauer:</strong> [z.\u00a0B. 12 Monate nach
              Abschluss der Bearbeitung]
            </p>

            <h2 id="immobilien">
              6. Immobilienanfragen / Expos\u00e9 / Besichtigung
            </h2>
            <p>
              Als Immobilienmakler verarbeiten wir Ihre Angaben zur Bearbeitung
              von Immobilienanfragen, Expos\u00e9-Zusendung, Terminvereinbarung
              und Vermittlungsleistungen.
            </p>
            <p>
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO.
              <br />
              <strong>Speicherdauer:</strong> [z.\u00a0B. 24 Monate nach letztem
              Kontakt]
            </p>

            <h2 id="cookies">7. Cookies & Consent (TDDDG/DSGVO)</h2>
            <p>
              Wir verwenden technisch notwendige Cookies sowie \u2013 nach
              Einwilligung \u2013 optionale Cookies f\u00fcr Analyse und externe
              Inhalte. Sie k\u00f6nnen Ihre Einwilligung jederzeit \u00fcber
              unsere Cookie-Einstellungen widerrufen.
            </p>

            <h2 id="analytics">
              8. Reichweitenmessung / Analytics (optional)
            </h2>
            <p>
              <strong>Nur falls genutzt:</strong>{" "}
              <strong>Tool:</strong> [z.\u00a0B. Google Analytics 4 / Matomo]
              <br />
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO
              i.\u00a0V.\u00a0m. \u00a7 25 TDDDG.
            </p>

            <h2 id="maps">9. Google Maps (optional)</h2>
            <p>
              <strong>Nur falls eingebunden.</strong> Anbieter: Google Ireland
              Limited, Dublin. Rechtsgrundlage: Einwilligung.
            </p>

            <h2 id="youtube">10. YouTube / Videos (optional)</h2>
            <p>
              <strong>Nur falls eingebunden.</strong> Anbieter: Google Ireland
              Limited (YouTube). Rechtsgrundlage: Einwilligung.
            </p>

            <h2 id="social">11. Social Media Links</h2>
            <p>
              Auf unserer Website k\u00f6nnen Links zu Social-Media-Profilen
              enthalten sein. Bei einem Klick werden Sie auf die jeweilige
              Plattform weitergeleitet. Dort gilt die Datenschutzerkl\u00e4rung
              des Anbieters.
            </p>

            <h2 id="empfaenger">12. Empf\u00e4nger & Auftragsverarbeiter</h2>
            <p>
              Wir setzen Dienstleister ein, die Daten in unserem Auftrag
              verarbeiten (Art. 28 DSGVO): Hosting, E-Mail, ggf. CRM/Analytics.
            </p>
            <p>
              <strong>Konkrete Dienstleister:</strong> [Hosting: \u2026],
              [E-Mail: \u2026]
            </p>

            <h2 id="drittland">13. Drittland\u00fcbermittlungen</h2>
            <p>
              Sofern Dienstleister Daten au\u00dferhalb der EU/des EWR
              verarbeiten, erfolgt eine \u00dcbermittlung nur unter den
              Voraussetzungen der Art. 44 ff. DSGVO (z.\u00a0B.
              Standardvertragsklauseln).
            </p>

            <h2 id="speicherdauer">14. Speicherdauer / L\u00f6schung</h2>
            <ul>
              <li>Kontaktanfragen/Leads: [z.\u00a0B. 12\u201324 Monate]</li>
              <li>
                Immobilienvorg\u00e4nge: [z.\u00a0B. 24 Monate, je nach Status]
              </li>
              <li>Server-Logfiles: [z.\u00a0B. 7\u201314 Tage]</li>
              <li>
                Einwilligungs-/Consent-Protokolle: [z.\u00a0B. 12\u201336
                Monate]
              </li>
            </ul>

            <h2 id="rechte">15. Betroffenenrechte</h2>
            <p>
              Sie haben nach der DSGVO das Recht auf Auskunft (Art. 15),
              Berichtigung (Art. 16), L\u00f6schung (Art. 17),
              Einschr\u00e4nkung (Art. 18), Daten\u00fcbertragbarkeit (Art. 20),
              Widerspruch (Art. 21) sowie Widerruf einer Einwilligung (Art. 7
              Abs. 3 DSGVO).
            </p>
            <p>
              Zur Aus\u00fcbung gen\u00fcgt eine Nachricht an die unter
              \u201eVerantwortlicher\u201c genannten Kontaktdaten.
            </p>

            <h2 id="aufsicht">16. Aufsichtsbeh\u00f6rde</h2>
            <p>
              Sie haben das Recht, sich bei einer
              Datenschutzaufsichtsbeh\u00f6rde zu beschweren. F\u00fcr
              Unternehmen in Bayern ist zust\u00e4ndig:
            </p>
            <div className="not-prose rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5">
              <p className="font-semibold text-[color:var(--color-text)]">
                Bayerisches Landesamt f\u00fcr Datenschutzaufsicht (BayLDA)
              </p>
              <p className="text-[color:var(--color-text-muted)]">
                Promenade 18, 91522 Ansbach, Deutschland
              </p>
            </div>

            <h2 id="sicherheit">17. Sicherheit</h2>
            <p>
              Wir treffen technische und organisatorische Ma\u00dfnahmen zum
              Schutz Ihrer Daten (HTTPS/TLS, Zugriffskontrollen,
              Rate-Limiting/Spam-Schutz).
            </p>

            <h2 id="aenderungen">18. \u00c4nderungen</h2>
            <p>
              Wir aktualisieren diese Datenschutzerkl\u00e4rung, wenn sich
              unsere Website, Dienste oder Rechtslage \u00e4ndern. Die jeweils
              aktuelle Version finden Sie auf dieser Seite.
            </p>
          </article>
        </div>
      </div>
    </LegalPage>
  );
}

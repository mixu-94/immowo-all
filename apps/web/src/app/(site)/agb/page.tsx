import type { Metadata } from "next";
import { LegalPage } from "@/components/Legals/LegalPage";

export const metadata: Metadata = {
  title: "AGB",
  description:
    "Allgemeine Gesch\u00e4ftsbedingungen der Immowo Ventures GmbH f\u00fcr die Nutzung der Website und Online-Dienste.",
  openGraph: {
    title: "AGB | Immowo Ventures",
    description:
      "Allgemeine Gesch\u00e4ftsbedingungen der Immowo Ventures GmbH.",
  },
  robots: { index: false, follow: false },
};

export default function AGBPage() {
  return (
    <LegalPage
      title="Allgemeine Geschäftsbedingungen (AGB)"
      lastUpdated="23.02.2026"
    >
      {/* IMPORTANT: Wir stylen die Page selbst (nicht über prose) */}
      <div className="not-prose space-y-6">
        {/* Intro */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm leading-relaxed text-white/80">
            Diese AGB regeln die Nutzung der Website und Online-Dienste der{" "}
            <span className="font-semibold text-white">
              Immowo Ventures GmbH
            </span>
            , Dossenbergerstraße 5, 89312 Günzburg, Deutschland (nachfolgend
            „Anbieter“).
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Hinweis: Der Anbieter betreibt eine Informations- und
            Kontaktplattform rund um Immobilien. Ein Immobilienkauf/-verkauf
            kommt ausschließlich zwischen den jeweiligen Vertragsparteien
            zustande.
          </p>
        </div>

        {/* 1 */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/60">
            1. Geltungsbereich
          </h2>
          <p className="text-sm leading-relaxed text-white/80">
            Diese AGB gelten für alle Nutzer der Website, insbesondere für die
            Nutzung von Inhalten, Objektinformationen, Exposés (sofern
            bereitgestellt) sowie Kontakt- und Anfragefunktionen. Abweichende
            Bedingungen des Nutzers finden keine Anwendung, es sei denn, der
            Anbieter stimmt ihrer Geltung ausdrücklich schriftlich zu.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            AGB sind vorformulierte Vertragsbedingungen; entscheidend ist, dass
            sie wirksam einbezogen werden und keine unzulässigen Klauseln
            enthalten.
          </p>
        </section>

        {/* 2 */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/60">
            2. Leistungen des Anbieters
          </h2>

          <div className="space-y-3 text-sm leading-relaxed text-white/80">
            <p>
              Der Anbieter stellt über die Website Informationen zu Immobilien
              und immobilienbezogenen Themen bereit (z. B. Objekt-Übersichten,
              Lage-/Markthinweise, Kontaktmöglichkeiten). Inhalte können sich
              ändern oder entfallen.
            </p>
            <p>
              Der Anbieter kann den Zugang zu bestimmten Inhalten von der Angabe
              von Kontaktdaten abhängig machen (siehe Ziffer 3).
            </p>
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
            Vergleichbare Immobilienportale regeln in ihren Bedingungen
            typischerweise Vertragsgegenstand, Nutzungsrechte, Verfügbarkeit und
            Haftung.
          </div>
        </section>

        {/* 3 */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/60">
            3. Zugang, Pflichtangaben und Nutzerpflichten
          </h2>

          <div className="space-y-3 text-sm leading-relaxed text-white/80">
            <p>
              Für den Zugriff auf bestimmte Inhalte ist die Angabe von{" "}
              <span className="font-semibold text-white">Name</span>,{" "}
              <span className="font-semibold text-white">E-Mail-Adresse</span>{" "}
              und{" "}
              <span className="font-semibold text-white">Telefonnummer</span>{" "}
              erforderlich. Die Angaben müssen wahrheitsgemäß sein. Der Anbieter
              kann Eingaben technisch verifizieren und bei offensichtlich
              falschen Angaben den Zugang verweigern.
            </p>

            <p>
              Nutzer dürfen die Website nicht missbräuchlich nutzen,
              insbesondere keine Sicherheitsmechanismen umgehen, keine
              automatisierten Abfragen (Scraping/Crawling) durchführen und keine
              Inhalte unbefugt vervielfältigen oder verwerten.
            </p>
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
            Hinweis: Für werbliche E-Mails ist in der Regel eine ausdrückliche
            Einwilligung sinnvoll (siehe Ziffer 6 und Datenschutzerklärung).
          </div>
        </section>

        {/* 4 */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/60">
            4. Zustandekommen von Verträgen / keine automatische
            Maklerbeauftragung
          </h2>

          <div className="space-y-3 text-sm leading-relaxed text-white/80">
            <p>
              Die Nutzung der Website (einschließlich Freischaltung von Inhalten
              nach Dateneingabe) stellt grundsätzlich{" "}
              <span className="font-semibold text-white">keinen</span>{" "}
              kostenpflichtigen Vertrag über Maklerleistungen, Beratung oder
              sonstige entgeltliche Dienstleistungen dar, sofern dies nicht
              ausdrücklich vereinbart wird.
            </p>

            <p>
              Falls der Anbieter im Einzelfall Makler- oder
              Vermittlungsleistungen anbietet, erfolgt die Beauftragung
              ausschließlich über eine separate, eindeutige Vereinbarung (z. B.
              Textform) mit transparenter Kosten-/Provisionsinformation. Ohne
              eine solche Vereinbarung entstehen keine Provisionsansprüche.
            </p>
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
            Hintergrund: Manche Makler-AGB knüpfen einen Vertrag an die
            Exposé-Anforderung – das ist ein anderes Modell und sollte nur
            genutzt werden, wenn ihr das wirklich so wollt.
          </div>
        </section>

        {/* 5 */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/60">
            5. Objektangaben, Exposés, Aktualität
          </h2>

          <div className="space-y-3 text-sm leading-relaxed text-white/80">
            <p>
              Objektinformationen, Exposés, Flächen, Ausstattungen, Preise,
              Verfügbarkeiten und sonstige Angaben beruhen häufig auf
              Informationen Dritter (z. B. Eigentümer, Verwalter, Partner) und
              können sich kurzfristig ändern. Der Anbieter übernimmt keine
              Gewähr für Vollständigkeit, Richtigkeit und Aktualität, soweit
              gesetzlich zulässig.
            </p>

            <p>
              Nutzer sind verpflichtet, Angaben vor einer Entscheidung
              eigenständig zu prüfen (z. B. durch Einsicht in Unterlagen,
              Besichtigung, Rückfragen). Dies gilt insbesondere für rechtlich
              und wirtschaftlich wesentliche Eigenschaften.
            </p>
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
            Hinweis: Fehlerhafte Exposé-Angaben können rechtliche Risiken
            auslösen; deshalb ist die klare Abgrenzung von Fremdinformationen
            und die Empfehlung zur Eigenprüfung üblich.
          </div>
        </section>

        {/* 6 */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/60">
            6. Kommunikation per E-Mail / Telefon
          </h2>

          <div className="space-y-3 text-sm leading-relaxed text-white/80">
            <p>
              Der Anbieter kann Nutzer über die angegebenen Kontaktdaten
              kontaktieren, um Anfragen zu bearbeiten, Objektinformationen zu
              übermitteln, Rückfragen zu klären oder Terminabstimmungen
              vorzunehmen.
            </p>

            <p>
              Zusätzlich kann der Anbieter Informationen zu passenden Immobilien
              und Services per E-Mail versenden. Für rein werbliche
              Kommunikation gelten die Vorgaben der Datenschutzerklärung
              (insbesondere Einwilligung und Abmeldemöglichkeit).
            </p>
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
            Plattform-AGB regeln typischerweise auch Verfügbarkeit,
            Kommunikation und Nutzerpflichten.
          </div>
        </section>

        {/* 7 */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/60">
            7. Nutzungsrechte / Urheberrecht
          </h2>

          <p className="text-sm leading-relaxed text-white/80">
            Inhalte der Website (Texte, Bilder, Layout, Datenbanken, Marken)
            sind geschützt. Nutzern wird ein einfaches, nicht übertragbares
            Recht eingeräumt, Inhalte für den eigenen, privaten Gebrauch im
            Rahmen der Website-Nutzung abzurufen. Jede darüber hinausgehende
            Nutzung (z. B. systematisches Kopieren, Veröffentlichung,
            Weiterverkauf, Datenbankexport) ist ohne vorherige Zustimmung
            untersagt.
          </p>
        </section>

        {/* 8 */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/60">
            8. Verfügbarkeit / Änderungen
          </h2>

          <p className="text-sm leading-relaxed text-white/80">
            Der Anbieter bemüht sich um eine hohe Verfügbarkeit der Website,
            kann diese aber nicht garantieren. Wartungsarbeiten,
            Sicherheitsupdates oder Störungen können zu vorübergehenden
            Einschränkungen führen. Der Anbieter darf Funktionen und Inhalte
            weiterentwickeln, anpassen oder einstellen.
          </p>

          <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
            Regelungen zur Verfügbarkeit und Haftungsbegrenzung sind für
            Plattform-AGB typisch.
          </div>
        </section>

        {/* 9 */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/60">
            9. Haftung
          </h2>

          <div className="space-y-3 text-sm leading-relaxed text-white/80">
            <p>
              Der Anbieter haftet unbeschränkt bei Vorsatz und grober
              Fahrlässigkeit sowie bei Verletzung von Leben, Körper oder
              Gesundheit.
            </p>
            <p>
              Bei leichter Fahrlässigkeit haftet der Anbieter nur bei Verletzung
              wesentlicher Vertragspflichten (Kardinalpflichten) und beschränkt
              auf den vorhersehbaren, vertragstypischen Schaden.
            </p>
            <p>
              Im Übrigen ist die Haftung – soweit gesetzlich zulässig –
              ausgeschlossen. Die Haftung nach dem Produkthaftungsgesetz bleibt
              unberührt.
            </p>
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
            Bei Objekt-/Exposé-Angaben ist die klare Haftungsabgrenzung gängige
            Praxis, weil Informationen oft von Dritten stammen.
          </div>
        </section>

        {/* 10 */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/60">
            10. Externe Links / Inhalte Dritter
          </h2>

          <p className="text-sm leading-relaxed text-white/80">
            Soweit die Website Links zu externen Websites Dritter enthält, hat
            der Anbieter auf deren Inhalte keinen Einfluss. Für Inhalte Dritter
            wird keine Gewähr übernommen. Zum Zeitpunkt der Verlinkung waren
            keine rechtswidrigen Inhalte erkennbar.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Klauseln zu Drittinhalten/Links sind in Muster-AGB üblich, sollten
            aber nicht als „Freifahrtschein“ verstanden werden (Prüfpflichten im
            Einzelfall).
          </p>
        </section>

        {/* 11 */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/60">
            11. Laufzeit, Sperrung, Kündigung
          </h2>

          <div className="space-y-3 text-sm leading-relaxed text-white/80">
            <p>
              Nutzer können die Nutzung jederzeit einstellen. Der Anbieter kann
              den Zugang sperren oder einschränken, wenn ein Nutzer gegen diese
              AGB verstößt, missbräuchlich handelt oder falsche Angaben macht.
            </p>
            <p>
              Gesetzliche Rechte (z. B. Unterlassungs- und
              Schadensersatzansprüche) bleiben unberührt.
            </p>
          </div>
        </section>

        {/* 12 */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/60">
            12. Änderungen dieser AGB
          </h2>

          <p className="text-sm leading-relaxed text-white/80">
            Der Anbieter kann diese AGB anpassen, wenn dies aus rechtlichen,
            technischen oder betrieblichen Gründen erforderlich ist. Die jeweils
            aktuelle Fassung wird auf der Website bereitgestellt. Bei
            wesentlichen Änderungen werden Nutzer in geeigneter Weise
            informiert, sofern dies im Einzelfall erforderlich ist.
          </p>
        </section>

        {/* 13 */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/60">
            13. Verbraucherstreitbeilegung
          </h2>

          <p className="text-sm leading-relaxed text-white/80">
            Wir sind nicht verpflichtet und nicht bereit, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.{" "}
            <span className="text-white/60">[Bei Bedarf anpassen]</span>
          </p>
        </section>

        {/* 14 */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/60">
            14. Schlussbestimmungen
          </h2>

          <div className="space-y-3 text-sm leading-relaxed text-white/80">
            <p>
              Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts.
              Gerichtsstand ist – soweit gesetzlich zulässig – der Sitz des
              Anbieters.
            </p>
            <p>
              Sollten einzelne Bestimmungen unwirksam sein oder werden, bleibt
              die Wirksamkeit der übrigen Bestimmungen unberührt.
            </p>
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
            Hinweis: Muster/Generatoren können helfen, aber AGB sollten immer
            auf das konkrete Geschäftsmodell zugeschnitten sein.
          </div>
        </section>

        {/* Platzhalter Kontaktdaten Hinweis */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/60">
            Kontaktdaten für rechtliche Erklärungen
          </h2>
          <p className="text-sm leading-relaxed text-white/80">
            Immowo Ventures GmbH, Dossenbergerstraße 5, 89312 Günzburg,
            Deutschland
            <br />
            E-Mail:{" "}
            <span className="font-semibold text-white">
              [E-Mail-Adresse ergänzen]
            </span>
            <br />
            Telefon:{" "}
            <span className="font-semibold text-white">
              [Telefonnummer ergänzen]
            </span>
          </p>
        </div>
      </div>
    </LegalPage>
  );
}

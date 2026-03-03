import type { Metadata } from "next";
import { LegalPage } from "@/components/Legals/LegalPage";

export const metadata: Metadata = {
  title: "Widerrufsrecht",
  description:
    "Widerrufsbelehrung und Muster-Widerrufsformular der Immowo Ventures GmbH gem\u00e4\u00df \u00a7 312g BGB.",
  openGraph: {
    title: "Widerrufsrecht | Immowo Ventures",
    description: "Widerrufsbelehrung der Immowo Ventures GmbH.",
  },
  robots: { index: false, follow: false },
};

export default function WiderrufPage() {
  return (
    <LegalPage title="Widerrufsrecht" lastUpdated="23.02.2026">
      <div className="not-prose space-y-6">
        {/* Hinweisbox */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/60">
            Hinweis zur Anwendbarkeit
          </h2>
          <p className="text-sm leading-relaxed text-white/80">
            Diese Widerrufsbelehrung gilt für{" "}
            <span className="font-semibold text-white">Verbraucher</span> (§ 13
            BGB), sofern über diese Website ein{" "}
            <span className="font-semibold text-white">
              entgeltlicher Vertrag
            </span>{" "}
            im Fernabsatz abgeschlossen wird (z. B. kostenpflichtige
            Dienstleistungen).
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Wenn über die Website lediglich unverbindliche Informationen
            bereitgestellt und Kontaktdaten für Anfragen erhoben werden, kann
            ein Widerrufsrecht im Einzelfall nicht einschlägig sein.
          </p>
        </div>

        {/* Widerrufsbelehrung */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/60">
            Widerrufsbelehrung
          </h2>

          <div className="rounded-xl border border-white/10 bg-black/20 p-5">
            <h3 className="text-base font-semibold text-white">
              Widerrufsrecht
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen
              diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn
              Tage ab dem Tag des Vertragsabschlusses.
            </p>
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-5">
            <h3 className="text-base font-semibold text-white">
              Ausübung des Widerrufs
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Immowo Ventures
              GmbH, Dossenbergerstraße 5, 89312 Günzburg, Deutschland, E-Mail:{" "}
              <span className="font-semibold text-white">
                [E-Mail ergänzen]
              </span>
              , Telefon:{" "}
              <span className="font-semibold text-white">
                [Telefon ergänzen]
              </span>
              ) mittels einer eindeutigen Erklärung (z. B. ein mit der Post
              versandter Brief oder E-Mail) über Ihren Entschluss, diesen
              Vertrag zu widerrufen, informieren.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die
              Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der
              Widerrufsfrist absenden.
            </p>
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-5">
            <h3 className="text-base font-semibold text-white">
              Folgen des Widerrufs
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle
              Zahlungen, die wir von Ihnen erhalten haben, unverzüglich und
              spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem
              die Mitteilung über Ihren Widerruf dieses Vertrags bei uns
              eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe
              Zahlungsmittel, das Sie bei der ursprünglichen Transaktion
              eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas
              anderes vereinbart; in keinem Fall werden Ihnen wegen dieser
              Rückzahlung Entgelte berechnet.
            </p>
          </div>
        </section>

        {/* Musterformular */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/60">
            Muster-Widerrufsformular
          </h2>

          <p className="text-sm leading-relaxed text-white/70">
            (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte
            dieses Formular aus und senden Sie es zurück.)
          </p>

          <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-5">
            <div className="text-sm leading-relaxed text-white/80">
              <p className="font-semibold text-white">An:</p>
              <p className="mt-2">
                Immowo Ventures GmbH
                <br />
                Dossenbergerstraße 5
                <br />
                89312 Günzburg
                <br />
                Deutschland
                <br />
                E-Mail:{" "}
                <span className="font-semibold text-white">
                  [E-Mail ergänzen]
                </span>
              </p>

              <div className="mt-5 border-t border-white/10 pt-5">
                <p>
                  Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*)
                  abgeschlossenen Vertrag über die Erbringung der folgenden
                  Dienstleistung (*)
                </p>

                <div className="mt-4 space-y-3">
                  <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                    <p className="text-xs uppercase tracking-wide text-white/50">
                      Dienstleistung
                    </p>
                    <p className="mt-1 text-sm text-white/80">
                      [Bitte eintragen]
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                      <p className="text-xs uppercase tracking-wide text-white/50">
                        Bestellt am
                      </p>
                      <p className="mt-1 text-sm text-white/80">[Datum]</p>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                      <p className="text-xs uppercase tracking-wide text-white/50">
                        Erhalten am
                      </p>
                      <p className="mt-1 text-sm text-white/80">[Datum]</p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                    <p className="text-xs uppercase tracking-wide text-white/50">
                      Name des/der Verbraucher(s)
                    </p>
                    <p className="mt-1 text-sm text-white/80">
                      [Bitte eintragen]
                    </p>
                  </div>

                  <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                    <p className="text-xs uppercase tracking-wide text-white/50">
                      Anschrift des/der Verbraucher(s)
                    </p>
                    <p className="mt-1 text-sm text-white/80">
                      [Bitte eintragen]
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                      <p className="text-xs uppercase tracking-wide text-white/50">
                        Unterschrift (nur bei Papier)
                      </p>
                      <p className="mt-1 text-sm text-white/80">
                        [Unterschrift]
                      </p>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                      <p className="text-xs uppercase tracking-wide text-white/50">
                        Datum
                      </p>
                      <p className="mt-1 text-sm text-white/80">[Datum]</p>
                    </div>
                  </div>

                  <p className="pt-2 text-xs text-white/50">
                    (*) Unzutreffendes streichen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Optional: Erlöschen */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/60">
            Erlöschen des Widerrufsrechts (optional)
          </h2>
          <p className="text-sm leading-relaxed text-white/80">
            Wenn Sie ausdrücklich verlangen, dass wir vor Ablauf der
            Widerrufsfrist mit der Leistung beginnen, kann Ihr Widerrufsrecht
            bei vollständiger Vertragserfüllung erlöschen.{" "}
            <span className="text-white/60">
              [Nur verwenden, wenn ihr wirklich kostenpflichtige
              Dienstleistungen habt und das juristisch sauber im
              Checkout/Vertrag abbildet.]
            </span>
          </p>
        </section>

        {/* Kontaktblock */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/60">
            Kontakt für Widerruf
          </h2>
          <p className="text-sm leading-relaxed text-white/80">
            Immowo Ventures GmbH, Dossenbergerstraße 5, 89312 Günzburg,
            Deutschland
            <br />
            E-Mail:{" "}
            <span className="font-semibold text-white">[E-Mail ergänzen]</span>
            <br />
            Telefon:{" "}
            <span className="font-semibold text-white">[Telefon ergänzen]</span>
          </p>
        </div>
      </div>
    </LegalPage>
  );
}

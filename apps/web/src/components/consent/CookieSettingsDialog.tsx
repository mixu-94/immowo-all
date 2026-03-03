"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Cookie,
  ExternalLink,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { useConsent } from "./ConsentProvider";

// shadcn ui
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function Row({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4">
      <div className="flex min-w-0 items-start gap-3">
        <div className="mt-0.5 text-[color:var(--color-text)]">{icon}</div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-[color:var(--color-text)]">{title}</div>
          <div className="mt-1 text-xs leading-relaxed text-[color:var(--color-text-muted)]">
            {description}
          </div>
        </div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export default function CookieSettingsDialog({ open, onOpenChange }: Props) {
  const {
    consent,
    setConsent,
    acceptAll,
    acceptNecessaryOnly,
    analyticsAllowed,
    externalMediaAllowed,
  } = useConsent();

  const initial = useMemo(
    () => ({
      analytics: analyticsAllowed,
      externalMedia: externalMediaAllowed,
    }),
    [analyticsAllowed, externalMediaAllowed],
  );

  const [analytics, setAnalytics] = useState(initial.analytics);
  const [externalMedia, setExternalMedia] = useState(initial.externalMedia);

  useEffect(() => {
    if (!open) return;
    setAnalytics(initial.analytics);
    setExternalMedia(initial.externalMedia);
  }, [open, initial.analytics, initial.externalMedia]);

  const hasChanges =
    analytics !== initial.analytics || externalMedia !== initial.externalMedia;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="z-[110] border-[color:var(--color-border)] bg-black/70 text-[color:var(--color-text)] backdrop-blur-xl sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
              <Cookie className="h-5 w-5 text-[color:var(--color-text)]" />
            </span>
            Cookie-Einstellungen
          </DialogTitle>

          <DialogDescription className="text-[color:var(--color-text-muted)]">
            Hier kannst du auswählen, welche optionalen Dienste wir verwenden
            dürfen. Notwendige Cookies sind immer aktiv, damit die Website
            zuverlässig funktioniert. Du kannst deine Auswahl jederzeit ändern
            oder widerrufen.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-3">
          <Row
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Notwendig"
            description="Erforderlich für Grundfunktionen (z. B. Sicherheit, Consent-Speicherung, Formular-Übertragung). Diese sind nicht deaktivierbar."
          >
            <Switch checked disabled aria-readonly />
          </Row>

          <Row
            icon={<BarChart3 className="h-5 w-5" />}
            title="Analytics (optional)"
            description="Reichweitenmessung & Optimierung der Website mit Matomo (selbst gehostet, kein Drittland-Transfer). Anonymisierte Auswertung. Wird nur nach Einwilligung aktiviert."
          >
            <Switch checked={analytics} onCheckedChange={setAnalytics} />
          </Row>

          <Row
            icon={<Globe className="h-5 w-5" />}
            title="Externe Medien (optional)"
            description="Einbindung externer Inhalte (z. B. Google Maps, YouTube). Beim Laden können Daten an Drittanbieter übertragen werden (z. B. IP-Adresse); Drittlandübermittlung (z. B. USA) ist möglich. Aktivierung nur nach Einwilligung."
          >
            <Switch
              checked={externalMedia}
              onCheckedChange={setExternalMedia}
            />
          </Row>

          <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4 text-[12px] leading-relaxed text-[color:var(--color-text-muted)]">
            Mehr Informationen findest du in unserer{" "}
            <Link
              href="/datenschutz"
              className="inline-flex items-center gap-1 font-semibold text-[color:var(--color-text)] underline underline-offset-4 hover:text-white"
            >
              Datenschutzerklärung <ExternalLink className="h-3.5 w-3.5" />
            </Link>
            .
            <div className="mt-2 text-[color:var(--color-text-muted)]">
              Consent-Status:{" "}
              <span className="font-semibold text-[color:var(--color-text)]">
                {consent ? "gesetzt" : "nicht gesetzt"}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-2 flex flex-col gap-2 sm:flex-row sm:justify-between">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              className="border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] text-[color:var(--color-text)] hover:bg-[color:var(--color-surface-2)]"
              onClick={() => {
                acceptNecessaryOnly();
                onOpenChange(false);
              }}
            >
              Nur notwendig
            </Button>

            <Button
              type="button"
              variant="secondary"
              className="border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] text-[color:var(--color-text)] hover:bg-[color:var(--color-surface-2)]"
              onClick={() => {
                acceptAll();
                onOpenChange(false);
              }}
            >
              Alle akzeptieren
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              className="text-[color:var(--color-text-muted)] hover:bg-[color:var(--color-surface-2)] hover:text-white"
              onClick={() => onOpenChange(false)}
            >
              Abbrechen
            </Button>

            <Button
              type="button"
              className="bg-white text-black hover:bg-white/90 disabled:opacity-60"
              disabled={!hasChanges}
              onClick={() => {
                setConsent({ analytics, externalMedia });
                onOpenChange(false);
              }}
            >
              Speichern
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

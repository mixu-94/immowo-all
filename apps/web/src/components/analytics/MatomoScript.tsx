"use client";

import { useEffect } from "react";
import { useConsent } from "@/components/consent/ConsentProvider";

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;

declare global {
  interface Window {
    _paq?: Array<unknown[]>;
  }
}

export function MatomoScript() {
  const { analyticsAllowed } = useConsent();

  useEffect(() => {
    if (!MATOMO_URL || !MATOMO_SITE_ID) return;

    const _paq = (window._paq = window._paq || []);

    if (!analyticsAllowed) {
      // Widerruf: Tracking stoppen sobald Einwilligung entzogen wird
      _paq.push(["optUserOut"]);
      return;
    }

    // Einwilligung vorhanden: Opt-out aufheben falls zuvor aktiv
    _paq.push(["forgetUserOptOut"]);

    // Script schon geladen (z. B. bei SPA-Navigation) — nur opt-out aufheben, kein Double-Init
    if (document.querySelector("script[data-matomo]")) return;

    // Konfiguration zuerst, dann Tracking-Calls
    _paq.push(["setTrackerUrl", `${MATOMO_URL}/matomo.php`]);
    _paq.push(["setSiteId", MATOMO_SITE_ID]);
    _paq.push(["setDoNotTrack", true]); // Browser-DNT respektieren
    _paq.push(["trackPageView"]);
    _paq.push(["enableLinkTracking"]);

    const script = document.createElement("script");
    script.async = true;
    script.src = `${MATOMO_URL}/matomo.js`;
    script.setAttribute("data-matomo", "1");
    document.head.appendChild(script);
  }, [analyticsAllowed]);

  return null;
}

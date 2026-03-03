// src/lib/consent/types.ts

export const CONSENT_VERSION = 1 as const;

export type ConsentCategory = "necessary" | "analytics" | "externalMedia";

export type ConsentState = {
    version: typeof CONSENT_VERSION;
    necessary: true; // always true / not togglable
    analytics: boolean;
    externalMedia: boolean;
    updatedAt: string; // ISO string
};

export const DEFAULT_CONSENT_STATE: ConsentState = {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: false,
    externalMedia: false,
    updatedAt: new Date(0).toISOString(), // will be overwritten on first save
};

export const CONSENT_STORAGE_KEY = "immowo.consent";

/** Convenience helpers */
export const acceptAll = (): ConsentState => ({
    version: CONSENT_VERSION,
    necessary: true,
    analytics: true,
    externalMedia: true,
    updatedAt: new Date().toISOString(),
});

export const necessaryOnly = (): ConsentState => ({
    version: CONSENT_VERSION,
    necessary: true,
    analytics: false,
    externalMedia: false,
    updatedAt: new Date().toISOString(),
});


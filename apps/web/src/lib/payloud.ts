// src/lib/payload.ts
import "server-only";

type PayloadClientConfig = {
    baseUrl: string;          // z.B. https://cms.example.com
    apiKey?: string;          // optional: Payload API Key / Bearer Token
};

const config: PayloadClientConfig = {
    baseUrl: process.env.PAYLOAD_BASE_URL ?? "",
    apiKey: process.env.PAYLOAD_API_KEY,
};

if (!config.baseUrl) {
    // In MVP lieber hart failen, damit es nicht stillschweigend "leer" ist
    console.log("[payload] Missing env PAYLOAD_BASE_URL");
}

export class PayloadError extends Error {
    status: number;
    details?: unknown;

    constructor(message: string, status: number, details?: unknown) {
        super(message);
        this.name = "PayloadError";
        this.status = status;
        this.details = details;
    }
}

type FetchOptions = {
    method?: "GET" | "POST" | "PATCH" | "DELETE";
    // Next.js fetch options:
    cache?: RequestCache; // "no-store" | "force-cache" etc.
    next?: { revalidate?: number; tags?: string[] };
    headers?: Record<string, string>;
    body?: unknown;
    query?: Record<string, string | number | boolean | undefined | null>;
};

function buildUrl(path: string, query?: FetchOptions["query"]) {
    const url = new URL(path, config.baseUrl);

    if (query) {
        Object.entries(query).forEach(([k, v]) => {
            if (v === undefined || v === null) return;
            url.searchParams.set(k, String(v));
        });
    }

    return url.toString();
}

export async function payloadFetch<T>(path: string, opts: FetchOptions = {}): Promise<T> {
    const url = buildUrl(path, opts.query);

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(opts.headers ?? {}),
    };

    // Auth optional (nur server-side!)
    if (config.apiKey) {
        headers.Authorization = `Bearer ${config.apiKey}`;
    }

    // If revalidate is set, let Next.js ISR handle caching (don't also set cache: no-store)
    const cacheValue = opts.cache ?? (opts.next?.revalidate !== undefined ? undefined : "no-store");

    const res = await fetch(url, {
        method: opts.method ?? "GET",
        headers,
        body: opts.body ? JSON.stringify(opts.body) : undefined,
        ...(cacheValue !== undefined ? { cache: cacheValue } : {}),
        next: opts.next,
    });

    // Payload liefert i.d.R. JSON
    const json = await res.json().catch(() => null);

    if (!res.ok) {
        throw new PayloadError(
            `[payloadFetch] ${res.status} ${res.statusText}`,
            res.status,
            json
        );
    }

    return json as T;
}

/**
 * -------------------------
 * Convenience Helpers
 * -------------------------
 */

// Standard Payload "find" response
export type PayloadFindResponse<T> = {
    docs: T[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page?: number;
    pagingCounter?: number;
    hasPrevPage?: boolean;
    hasNextPage?: boolean;
    prevPage?: number | null;
    nextPage?: number | null;
};

export async function payloadFind<T>(
    collection: string,
    params?: {
        where?: Record<string, unknown>;
        limit?: number;
        page?: number;
        sort?: string;
        depth?: number;
        locale?: string;
        fallbackLocale?: string;
        draft?: boolean;
    },
    fetchOpts?: Omit<FetchOptions, "query" | "method">
) {
    // Payload REST expects where as JSON string in query
    const query: Record<string, string | number | boolean | undefined> = {
        limit: params?.limit ?? 10,
        page: params?.page ?? 1,
        sort: params?.sort,
        depth: params?.depth,
        locale: params?.locale,
        fallbackLocale: params?.fallbackLocale,
        draft: params?.draft,
        where: params?.where ? JSON.stringify(params.where) : undefined,
    };

    return payloadFetch<PayloadFindResponse<T>>(`/api/${collection}`, {
        ...fetchOpts,
        method: "GET",
        query,
    });
}

export async function payloadFindByID<T>(
    collection: string,
    id: string,
    params?: { depth?: number; locale?: string; fallbackLocale?: string; draft?: boolean },
    fetchOpts?: Omit<FetchOptions, "query" | "method">
) {
    const query: Record<string, string | number | boolean | undefined> = {
        depth: params?.depth,
        locale: params?.locale,
        fallbackLocale: params?.fallbackLocale,
        draft: params?.draft,
    };

    return payloadFetch<T>(`/api/${collection}/${id}`, {
        ...fetchOpts,
        method: "GET",
        query,
    });
}

export async function payloadGlobal<T>(
    slug: string,
    params?: { depth?: number; locale?: string; fallbackLocale?: string; draft?: boolean },
    fetchOpts?: Omit<FetchOptions, "query" | "method">
) {
    const query: Record<string, string | number | boolean | undefined> = {
        depth: params?.depth,
        locale: params?.locale,
        fallbackLocale: params?.fallbackLocale,
        draft: params?.draft,
    };

    return payloadFetch<T>(`/api/globals/${slug}`, {
        ...fetchOpts,
        method: "GET",
        query,
    });
}

export async function payloadCreate<T>(
    collection: string,
    data: unknown,
    fetchOpts?: Omit<FetchOptions, "method" | "body">
) {
    return payloadFetch<T>(`/api/${collection}`, {
        ...fetchOpts,
        method: "POST",
        body: data,
    });
}
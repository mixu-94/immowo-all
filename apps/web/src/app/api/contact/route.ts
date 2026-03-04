// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { payloadCreate } from "@/lib/payloud";

// Simple in-memory IP rate limiter (resets on server restart)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // max 5 requests per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || entry.resetAt <= now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count++;
  return false;
}

export const runtime = "nodejs";

type Payload = {
    name: string;
    email: string;

    phone?: string;
    contactPreference?: "telefon" | "email";
    topic?: string;

    message?: string;
    callbackRequested?: boolean;

    preferredDate?: string;
    preferredTimeWindow?: string;
    preferredTime?: string;
    durationMinutes?: number;
    tz?: string;

    listing?: string;
    listingTitle?: string;

    website?: string; // honeypot
};

function safeStr(v: unknown) {
    return String(v ?? "").trim();
}

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function clampInt(v: unknown, fallback: number, min: number, max: number) {
    const n = Number(v);
    if (!Number.isFinite(n)) return fallback;
    return Math.max(min, Math.min(max, Math.round(n)));
}

function escapeHtml(s: string) {
    return s
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function timeWindowLabel(win: string) {
    const map: Record<string, string> = {
        "09-12": "09:00 – 12:00",
        "12-15": "12:00 – 15:00",
        "15-18": "15:00 – 18:00",
        "18-20": "18:00 – 20:00",
    };
    return map[win] ?? win;
}

function topicLabel(topic: string) {
    const t = topic.toLowerCase();
    const map: Record<string, string> = {
        allgemein: "Allgemein",
        expose: "Exposé / Unterlagen",
        kaufen: "Immobilie kaufen",
        neubau: "Neubau / vom Papier weg",
        verkauf: "Verkauf / Vermarktung",
    };
    return map[t] ?? topic;
}

export async function POST(req: Request) {
    try {
        // Rate limit check
        const fwdHeader = req.headers.get("x-forwarded-for") ?? "";
        const clientIp = fwdHeader.split(",")[0]?.trim() || "unknown";
        if (isRateLimited(clientIp)) {
            return NextResponse.json(
                { ok: false, error: "Zu viele Anfragen. Bitte warten Sie einen Moment." },
                { status: 429 }
            );
        }

        const body = (await req.json()) as Partial<Payload>;

        // Honeypot
        const website = safeStr(body.website);
        if (website) return NextResponse.json({ ok: true }, { status: 200 });

        // Fields
        const name = safeStr(body.name);
        const email = safeStr(body.email);
        const phone = safeStr(body.phone);
        const topic = safeStr(body.topic);
        const message = safeStr(body.message);

        const callbackRequested = Boolean(body.callbackRequested);

        const contactPreferenceRaw = safeStr(body.contactPreference);
        const contactPreference =
            contactPreferenceRaw === "telefon" || contactPreferenceRaw === "email"
                ? (contactPreferenceRaw as "telefon" | "email")
                : undefined;

        const preferredDate = safeStr(body.preferredDate);
        const preferredTimeWindow = safeStr(body.preferredTimeWindow);
        const preferredTime = safeStr(body.preferredTime);
        const durationMinutes = clampInt(body.durationMinutes, 15, 15, 120);
        const tz = safeStr(body.tz);

        const listing = safeStr(body.listing);
        const listingTitle = safeStr(body.listingTitle);

        // Validation
        if (!name || !email) {
            return NextResponse.json(
                { ok: false, error: "Bitte Name und E-Mail ausfüllen." },
                { status: 400 }
            );
        }

        if (!isValidEmail(email)) {
            return NextResponse.json(
                { ok: false, error: "Bitte eine gültige E-Mail angeben." },
                { status: 400 }
            );
        }

        const hasMessage = message.length > 0;
        if (!hasMessage && !callbackRequested) {
            return NextResponse.json(
                { ok: false, error: "Bitte eine Nachricht schreiben oder Rückruf auswählen." },
                { status: 400 }
            );
        }
        if (callbackRequested && phone.length === 0) {
            return NextResponse.json(
                { ok: false, error: "Für einen Rückruf bitte eine Telefonnummer angeben." },
                { status: 400 }
            );
        }

        // Meta
        const ua = req.headers.get("user-agent") ?? "";
        const fwd = req.headers.get("x-forwarded-for") ?? "";
        const ip = fwd.split(",")[0]?.trim() ?? "";
        const receivedAt = new Date().toISOString();

        const topicNice = topic ? topicLabel(topic) : "-";

        // Persist to CMS (fire-and-forget — does not block email delivery)
        payloadCreate("anfragen", {
            name,
            email,
            phone: phone || undefined,
            contactPreference: contactPreference ?? undefined,
            topic: topic || "allgemein",
            message: message || undefined,
            callbackRequested,
            preferredDate: preferredDate || undefined,
            preferredTimeWindow: preferredTimeWindow || undefined,
            preferredTime: preferredTime || undefined,
            durationMinutes: durationMinutes || undefined,
            listingTitle: listingTitle || undefined,
            status: "neu",
            receivedAt,
            ipAddress: ip || undefined,
            userAgent: ua || undefined,
        }).catch((err: unknown) => {
            console.warn("[contact] Anfrage konnte nicht in Payload gespeichert werden:", err);
        });

        // Subject
        const subjectParts = ["Kontaktanfrage", name];
        if (listing) subjectParts.push(`Objekt: ${listing}`);
        if (topicNice !== "-") subjectParts.push(topicNice);
        const subject = subjectParts.join(" | ");

        // Text mail
        const text = [
            "KONTAKTANFRAGE (Website)",
            "=======================",
            "",
            "Kontakt",
            `- Name: ${name}`,
            `- E-Mail: ${email}`,
            `- Telefon: ${phone || "-"}`,
            `- Bevorzugter Kontakt: ${contactPreference ?? "-"}`,
            `- Thema: ${topicNice}`,
            `- Rückruf gewünscht: ${callbackRequested ? "Ja" : "Nein"}`,
            "",
            "Objekt-Kontext",
            `- Objekt/Slug: ${listing || "-"}`,
            `- Objekttitel: ${listingTitle || "-"}`,
            "",
            "Terminwunsch",
            `- Datum: ${preferredDate || "-"}`,
            `- Zeitfenster: ${preferredTimeWindow ? timeWindowLabel(preferredTimeWindow) : "-"}`,
            `- Uhrzeit (optional): ${preferredTime || "-"}`,
            `- Dauer: ${durationMinutes} Min.`,
            `- Zeitzone: ${tz || "-"}`,
            "",
            "Nachricht",
            message || "-",
            "",
            "Technische Infos",
            `- Eingegangen: ${receivedAt}`,
            `- IP: ${ip || "-"}`,
            `- User-Agent: ${ua || "-"}`,
        ].join("\n");

        // HTML mail
        const html = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height:1.5;">
        <h2 style="margin:0 0 12px;">Kontaktanfrage (Website)</h2>

        <h3 style="margin:18px 0 8px;">Kontakt</h3>
        <ul style="margin:0; padding-left:18px;">
          <li><b>Name:</b> ${escapeHtml(name)}</li>
          <li><b>E-Mail:</b> ${escapeHtml(email)}</li>
          <li><b>Telefon:</b> ${escapeHtml(phone || "-")}</li>
          <li><b>Bevorzugter Kontakt:</b> ${escapeHtml(contactPreference ?? "-")}</li>
          <li><b>Thema:</b> ${escapeHtml(topicNice)}</li>
          <li><b>Rückruf gewünscht:</b> ${callbackRequested ? "Ja" : "Nein"}</li>
        </ul>

        <h3 style="margin:18px 0 8px;">Objekt-Kontext</h3>
        <ul style="margin:0; padding-left:18px;">
          <li><b>Objekt/Slug:</b> ${escapeHtml(listing || "-")}</li>
          <li><b>Objekttitel:</b> ${escapeHtml(listingTitle || "-")}</li>
        </ul>

        <h3 style="margin:18px 0 8px;">Terminwunsch</h3>
        <ul style="margin:0; padding-left:18px;">
          <li><b>Datum:</b> ${escapeHtml(preferredDate || "-")}</li>
          <li><b>Zeitfenster:</b> ${escapeHtml(
            preferredTimeWindow ? timeWindowLabel(preferredTimeWindow) : "-"
        )}</li>
          <li><b>Uhrzeit (optional):</b> ${escapeHtml(preferredTime || "-")}</li>
          <li><b>Dauer:</b> ${durationMinutes} Min.</li>
          <li><b>Zeitzone:</b> ${escapeHtml(tz || "-")}</li>
        </ul>

        <h3 style="margin:18px 0 8px;">Nachricht</h3>
        <div style="white-space:pre-wrap; border:1px solid #eee; padding:12px; border-radius:10px;">
          ${escapeHtml(message || "-")}
        </div>

        <p style="color:#666; margin-top:18px; font-size:12px;">
          Eingegangen: ${escapeHtml(receivedAt)}<br/>
          IP: ${escapeHtml(ip || "-")}<br/>
          User-Agent: ${escapeHtml(ua || "-")}
        </p>
      </div>
    `;

        // ✅ LOG MODE (ohne SMTP)
        const MAIL_MODE = process.env.MAIL_MODE ?? "smtp";
        if (MAIL_MODE === "log") {
            console.log("[api/contact] SUBJECT:", subject);
            console.log("[api/contact] TEXT:\n" + text);

            return NextResponse.json(
                { ok: true, mode: "log", preview: { subject, text, html } },
                { status: 200 }
            );
        }

        // SMTP MODE
        const {
            CONTACT_TO_EMAIL,
            SMTP_HOST,
            SMTP_PORT,
            SMTP_SECURE,
            SMTP_USER,
            SMTP_PASS,
            SMTP_FROM_NAME,
        } = process.env;

        if (!CONTACT_TO_EMAIL || !SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
            return NextResponse.json(
                { ok: false, error: "Server-Mail-Konfiguration fehlt (ENV)." },
                { status: 500 }
            );
        }

        const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: Number(SMTP_PORT),
            secure: String(SMTP_SECURE).toLowerCase() === "true",
            auth: { user: SMTP_USER, pass: SMTP_PASS },
            tls: {
                rejectUnauthorized: false, // ⚠️ IONOS SMTP: self-signed cert in chain
            },
        });

        await transporter.sendMail({
            from: `"${SMTP_FROM_NAME ?? "Website"}" <${SMTP_USER}>`,
            to: CONTACT_TO_EMAIL,
            subject,
            text,
            html,
            replyTo: email,
        });

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (err) {
        console.error("[api/contact] ERROR:", err);
        return NextResponse.json(
            { ok: false, error: "Senden fehlgeschlagen. Bitte später erneut versuchen." },
            { status: 500 }
        );
    }
}



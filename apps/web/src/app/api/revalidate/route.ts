import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;

export async function POST(req: NextRequest) {
    // Authentifizierung: Bearer Token im Header oder ?secret= Query-Param
    const authHeader = req.headers.get("authorization");
    const querySecret = req.nextUrl.searchParams.get("secret");

    const provided =
        authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : querySecret;

    if (!REVALIDATION_SECRET || provided !== REVALIDATION_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let body: { tags?: string[]; paths?: string[] } = {};
    try {
        body = await req.json();
    } catch {
        // Body optional – ohne Body alles revalidieren
    }

    const tags: string[] = body.tags ?? [];
    const paths: string[] = body.paths ?? [];

    // Tags revalidieren (z. B. "immobilien", "referenzen", "home", "unternehmen")
    for (const tag of tags) {
        revalidateTag(tag);
    }

    // Pfade revalidieren (z. B. "/immobilien", "/referenzen")
    for (const path of paths) {
        revalidatePath(path);
    }

    return NextResponse.json({
        revalidated: true,
        tags,
        paths,
        timestamp: new Date().toISOString(),
    });
}

import { NextResponse } from "next/server";
import { normalizeAllyCode } from "@/lib/roster";
import { swgohGgPlayerUrl, toRoster, type SwgohGgPlayer } from "@/lib/swgoh-gg";

/** Solution de secours : le navigateur interroge d'abord swgoh.gg directement (voir RosterProvider) */
export async function GET(_request: Request, { params }: { params: Promise<{ allyCode: string }> }) {
  const allyCode = normalizeAllyCode((await params).allyCode);
  if (allyCode.length !== 9) {
    return NextResponse.json({ error: "Le code allié doit contenir 9 chiffres." }, { status: 400 });
  }

  const response = await fetch(swgohGgPlayerUrl(allyCode), {
    headers: { Accept: "application/json", "User-Agent": "swgoh-teams (fan site)" },
    // Un roster ne change pas à la minute : on garde la réponse 1 h en cache côté Vercel
    next: { revalidate: 3600 },
  }).catch(() => null);

  if (!response) {
    return NextResponse.json({ error: "swgoh.gg est injoignable." }, { status: 502 });
  }
  if (response.status === 404) {
    return NextResponse.json({ error: "Aucun joueur trouvé pour ce code allié." }, { status: 404 });
  }
  if (!response.ok) {
    return NextResponse.json({ error: `swgoh.gg a répondu ${response.status}.` }, { status: 502 });
  }

  const roster = toRoster(allyCode, (await response.json()) as SwgohGgPlayer);
  return NextResponse.json(roster, {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
  });
}

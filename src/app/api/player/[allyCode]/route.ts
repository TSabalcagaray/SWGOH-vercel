import { NextResponse } from "next/server";
import { normalizeAllyCode, type Roster, type RosterUnit } from "@/lib/roster";

interface SwgohGgUnit {
  data: {
    base_id: string;
    name: string;
    combat_type: number;
    rarity: number;
    level: number;
    gear_level: number;
    relic_tier: number | null;
  };
}

interface SwgohGgPlayer {
  data: { name: string; ally_code: number };
  units: SwgohGgUnit[];
}

/** swgoh.gg encode la relique avec un décalage de 2 (2 = R0, 3 = R1…) */
const toRelic = (gearLevel: number, relicTier: number | null) =>
  gearLevel === 13 && relicTier ? Math.max(0, relicTier - 2) : 0;

export async function GET(_request: Request, { params }: { params: Promise<{ allyCode: string }> }) {
  const allyCode = normalizeAllyCode((await params).allyCode);
  if (allyCode.length !== 9) {
    return NextResponse.json({ error: "Le code allié doit contenir 9 chiffres." }, { status: 400 });
  }

  const response = await fetch(`https://swgoh.gg/api/player/${allyCode}/`, {
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

  const player = (await response.json()) as SwgohGgPlayer;
  const units: RosterUnit[] = player.units.map(({ data }) => ({
    baseId: data.base_id,
    name: data.name,
    combatType: data.combat_type === 2 ? 2 : 1,
    rarity: data.rarity,
    level: data.level,
    gearLevel: data.gear_level,
    relic: toRelic(data.gear_level, data.relic_tier),
  }));

  const roster: Roster = { allyCode, playerName: player.data.name, units };
  return NextResponse.json(roster, {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
  });
}

import type { Roster, RosterUnit } from "@/lib/roster";

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

export interface SwgohGgPlayer {
  data: { name: string; ally_code: number };
  units: SwgohGgUnit[];
}

export const swgohGgPlayerUrl = (allyCode: string) => `https://swgoh.gg/api/player/${allyCode}/`;

/** swgoh.gg encode la relique avec un décalage de 2 (2 = R0, 3 = R1…) */
const toRelic = (gearLevel: number, relicTier: number | null) =>
  gearLevel === 13 && relicTier ? Math.max(0, relicTier - 2) : 0;

export const toRoster = (allyCode: string, player: SwgohGgPlayer): Roster => ({
  allyCode,
  playerName: player.data.name,
  units: player.units.map(({ data }): RosterUnit => ({
    baseId: data.base_id,
    name: data.name,
    combatType: data.combat_type === 2 ? 2 : 1,
    rarity: data.rarity,
    level: data.level,
    gearLevel: data.gear_level,
    relic: toRelic(data.gear_level, data.relic_tier),
  })),
});

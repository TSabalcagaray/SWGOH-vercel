export interface RosterUnit {
  baseId: string;
  name: string;
  /** 1 = personnage, 2 = vaisseau */
  combatType: 1 | 2;
  rarity: number;
  level: number;
  gearLevel: number;
  /** Niveau de relique (0 si aucune) */
  relic: number;
}

export interface Roster {
  allyCode: string;
  playerName: string;
  units: RosterUnit[];
}

export const normalizeAllyCode = (value: string) => value.replace(/\D/g, "");

export const formatAllyCode = (code: string) =>
  code.replace(/^(\d{3})(\d{3})(\d{3})$/, "$1-$2-$3");

const normalizeName = (name: string) =>
  name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

/** Retrouve une unité du roster par son nom (égalité d'abord, puis inclusion) */
export const findUnit = (roster: Roster, name: string, combatType: 1 | 2) => {
  const key = normalizeName(name);
  const candidates = roster.units.filter((unit) => unit.combatType === combatType);
  return (
    candidates.find((unit) => normalizeName(unit.name) === key) ??
    candidates.find((unit) => {
      const unitKey = normalizeName(unit.name);
      return unitKey.includes(key) || key.includes(unitKey);
    })
  );
};

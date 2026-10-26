"use client";

import { getCharacterImage } from "@/data/characters";
import { findUnit, type RosterUnit } from "@/lib/roster";
import { useRoster } from "@/components/roster/roster-provider";
import { useT } from "@/i18n/locale-provider";
import { ExternalImage } from "@/components/external-image/external-image";

const Stars = ({ count }: { count: number }) => {
  const { t } = useT();
  return (
    <span className="tracking-[1px] text-starter" aria-label={t("roster.stars", { count })}>
      {"★".repeat(count)}
      <span className="text-white/20">{"★".repeat(Math.max(0, 7 - count))}</span>
    </span>
  );
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((word) => word[0])
    .slice(-2)
    .join("");

// Relique : losange rouge bordé d'or, comme en jeu
const relicClass = "relic-shape border border-starter bg-linear-to-b from-[#d63a3a] to-[#8f1d1d] px-1.5 text-white";
const gearClass = "rounded bg-[#c7d2e0] text-space";
const absentClass = "rounded bg-[#7a1f1f] text-white";

/** Pastille sous le portrait : relique, sinon gear, sinon niveau */
const describeCharacter = (unit: RosterUnit) => {
  if (unit.relic > 0) return { label: `R${unit.relic}`, className: relicClass };
  if (unit.gearLevel) return { label: `G${unit.gearLevel}`, className: gearClass };
  return { label: `${unit.level}`, className: gearClass };
};

interface PilotProps {
  name: string;
  unit: RosterUnit | undefined;
  showLevel: boolean;
}

const Pilot = ({ name, unit, showLevel }: PilotProps) => {
  const { unit: unitName } = useT();
  const label = unitName(name);
  const image = getCharacterImage(name);
  const initials = <span className="text-[0.62rem] font-bold">{getInitials(label)}</span>;
  const level = unit ? describeCharacter(unit) : null;

  return (
    <span className="relative inline-flex pb-1.5" title={label}>
      <span
        className={`grid w-8 aspect-square place-items-center overflow-hidden rounded-full border-[1.5px] border-white/40 bg-panel text-white ${
          showLevel && !unit ? "opacity-35 grayscale" : ""
        }`}
      >
        {image ? <ExternalImage src={image} alt={label} className="size-full object-cover" fallback={initials} /> : initials}
      </span>
      {showLevel && (
        <span
          className={`${level?.className ?? absentClass} absolute bottom-0 left-1/2 min-w-5.5 -translate-x-1/2 px-1 text-center text-[0.6rem] leading-[13px] font-extrabold whitespace-nowrap`}
        >{level?.label ?? "✕"}</span>
      )}
    </span>
  );
};

interface UnitStatsProps {
  shipName: string;
  pilots: string[];
  align?: "center" | "start";
}

/** Étoiles du vaisseau (si code allié) et pilotes, avec leur niveau de relique */
export const UnitStats = ({ shipName, pilots, align = "center" }: UnitStatsProps) => {
  const { roster } = useRoster();
  const { t } = useT();
  const ship = roster ? findUnit(roster, shipName, 2) : undefined;

  return (
    <div className={`flex flex-col gap-1 text-[0.72rem] ${align === "start" ? "items-start" : "items-center"}`}>
      {roster &&
        (ship ? <Stars count={ship.rarity} /> : <span className="text-missing">{t("roster.locked")}</span>)}
      {pilots.length > 0 && (
        <span className="mt-0.5 flex gap-1.5">
          {pilots.map((name) => (
            <Pilot key={name} name={name} unit={roster ? findUnit(roster, name, 1) : undefined} showLevel={!!roster} />
          ))}
        </span>
      )}
    </div>
  );
};

"use client";

import { getCharacterImage } from "@/data/characters";
import { findUnit, type RosterUnit } from "@/lib/roster";
import { useRoster } from "@/components/roster/roster-provider";
import { useT } from "@/i18n/locale-provider";
import { ExternalImage } from "@/components/external-image/external-image";

/** Initiales de secours, sans la précision entre parenthèses (« The Mandalorian (Beskar Armor) » -> « TM ») */
const getInitials = (name: string) =>
  name
    .replace(/\(.*\)/, "")
    .trim()
    .split(" ")
    .map((word) => word[0])
    .slice(-2)
    .join("");

// Relique : pastille néon rouge
const relicClass =
  "rounded-full border border-[#ff4d4d] bg-[#1a0507]/90 px-1.5 text-[#ffe1e1] shadow-[0_0_6px_#ff2a2a,inset_0_0_4px_rgb(255_42_42/0.6)] [text-shadow:0_0_4px_#ff2a2a]";
const gearClass = "rounded bg-[#c7d2e0] text-space";
const absentClass = "rounded bg-[#7a1f1f] text-white";

/** Pastille sous le portrait : relique, sinon gear, sinon niveau */
const describeCharacter = (unit: RosterUnit) => {
  if (unit.relic > 0) return { label: `R${unit.relic}`, className: relicClass };
  if (unit.gearLevel) return { label: `G${unit.gearLevel}`, className: gearClass };
  return { label: `${unit.level}`, className: gearClass };
};

/** Coin de chaque pilote autour de la vignette : bas droite, bas gauche, puis haut droite */
const pilotCorners = ["-right-2 -bottom-1", "-left-2 -bottom-1", "-right-2 -top-1"];

const pilotSizes = {
  small: "w-6 text-[0.5rem]",
  medium: "w-8 text-[0.62rem]",
};

interface PilotProps {
  name: string;
  unit: RosterUnit | undefined;
  showLevel: boolean;
  size: keyof typeof pilotSizes;
  className: string;
}

const Pilot = ({ name, unit, showLevel, size, className }: PilotProps) => {
  const { unit: unitName } = useT();
  const label = unitName(name);
  const image = getCharacterImage(name);
  const initials = <span className="font-bold">{getInitials(label)}</span>;
  const level = unit ? describeCharacter(unit) : null;

  return (
    <span className={`${className} absolute z-[1] inline-flex`} title={label}>
      <span
        className={`${pilotSizes[size]} grid aspect-square place-items-center overflow-hidden rounded-full border-[1.5px] border-white/50 bg-panel text-white shadow-[0_2px_6px_rgb(0_0_0/0.6)] ${
          showLevel && !unit ? "opacity-40 grayscale" : ""
        }`}
      >
        {image ? <ExternalImage src={image} alt={label} className="size-full object-cover" fallback={initials} /> : initials}
      </span>
      {showLevel && (
        <span
          className={`${level?.className ?? absentClass} absolute -bottom-1.5 left-1/2 min-w-5.5 -translate-x-1/2 text-center text-[0.6rem] leading-[13px] font-extrabold whitespace-nowrap`}
        >
          {level?.label ?? "✕"}
        </span>
      )}
    </span>
  );
};

interface CrewAvatarProps {
  /** Vignette du vaisseau */
  children: React.ReactNode;
  pilots: string[];
  size?: keyof typeof pilotSizes;
}

/** Vignette du vaisseau avec la tête de chaque pilote dans un coin, et son niveau si un code allié est chargé */
export const CrewAvatar = ({ children, pilots, size = "medium" }: CrewAvatarProps) => {
  const { roster } = useRoster();

  return (
    <span className="relative mb-1.5 inline-flex shrink-0">
      {children}
      {pilots.slice(0, pilotCorners.length).map((name, index) => (
        <Pilot
          key={name}
          name={name}
          unit={roster ? findUnit(roster, name, 1) : undefined}
          showLevel={!!roster}
          size={size}
          className={pilotCorners[index]}
        />
      ))}
    </span>
  );
};

/** Étoiles du vaisseau, ou « Non débloqué » (rien sans code allié) */
export const ShipStars = ({ shipName }: { shipName: string }) => {
  const { roster } = useRoster();
  const { t } = useT();
  if (!roster) return null;
  const ship = findUnit(roster, shipName, 2);
  if (!ship) return <span className="text-[0.72rem] text-missing">{t("roster.locked")}</span>;

  return (
    <span className="text-[0.72rem] tracking-[1px] text-starter" aria-label={t("roster.stars", { count: ship.rarity })}>
      {"★".repeat(ship.rarity)}
      <span className="text-white/20">{"★".repeat(Math.max(0, 7 - ship.rarity))}</span>
    </span>
  );
};

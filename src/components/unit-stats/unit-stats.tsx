"use client";

import { getCharacterImage } from "@/data/characters";
import { findUnit, type RosterUnit } from "@/lib/roster";
import { useRoster } from "@/components/roster/roster-provider";
import { useT } from "@/i18n/locale-provider";
import { ExternalImage } from "@/components/external-image/external-image";
import styles from "./unit-stats.module.css";

const Stars = ({ count }: { count: number }) => {
  const { t } = useT();
  return (
    <span className={styles.stars} aria-label={t("roster.stars", { count })}>
      {"★".repeat(count)}
      <span className={styles.starsOff}>{"★".repeat(Math.max(0, 7 - count))}</span>
    </span>
  );
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((word) => word[0])
    .slice(-2)
    .join("");

/** Pastille sous le portrait : relique, sinon gear, sinon niveau */
const describeCharacter = (unit: RosterUnit) => {
  if (unit.relic > 0) return { label: `R${unit.relic}`, className: styles.relic };
  if (unit.gearLevel) return { label: `G${unit.gearLevel}`, className: styles.gear };
  return { label: `${unit.level}`, className: styles.gear };
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
  const initials = <span className={styles.initials}>{getInitials(label)}</span>;
  const level = unit ? describeCharacter(unit) : null;

  return (
    <span className={`${styles.pilot} ${showLevel && !unit ? styles.missing : ""}`} title={label}>
      <span className={styles.portrait}>
        {image ? <ExternalImage src={image} alt={label} className={styles.image} fallback={initials} /> : initials}
      </span>
      {showLevel && (
        <span className={`${styles.level} ${level?.className ?? styles.absent}`}>{level?.label ?? "✕"}</span>
      )}
    </span>
  );
};

interface UnitStatsProps {
  shipName: string;
  pilots: string[];
}

/** Étoiles du vaisseau (si code allié) et pilotes, avec leur niveau de relique */
export const UnitStats = ({ shipName, pilots }: UnitStatsProps) => {
  const { roster } = useRoster();
  const { t } = useT();
  const ship = roster ? findUnit(roster, shipName, 2) : undefined;

  return (
    <div className={styles.stats}>
      {roster &&
        (ship ? <Stars count={ship.rarity} /> : <span className={styles.locked}>{t("roster.locked")}</span>)}
      {pilots.length > 0 && (
        <span className={styles.pilots}>
          {pilots.map((name) => (
            <Pilot key={name} name={name} unit={roster ? findUnit(roster, name, 1) : undefined} showLevel={!!roster} />
          ))}
        </span>
      )}
    </div>
  );
};

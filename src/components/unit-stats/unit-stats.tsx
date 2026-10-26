"use client";

import { findUnit, type RosterUnit } from "@/lib/roster";
import { useRoster } from "@/components/roster/roster-provider";
import styles from "./unit-stats.module.css";

const Stars = ({ count }: { count: number }) => (
  <span className={styles.stars} aria-label={`${count} étoiles`}>
    {"★".repeat(count)}
    <span className={styles.starsOff}>{"★".repeat(Math.max(0, 7 - count))}</span>
  </span>
);

const describeCharacter = (unit: RosterUnit) => {
  if (unit.relic > 0) return `R${unit.relic}`;
  return unit.gearLevel ? `G${unit.gearLevel}` : `Niv. ${unit.level}`;
};

interface UnitStatsProps {
  shipName: string;
  pilots: string[];
}

/** Niveau du vaisseau et de ses pilotes dans le roster du joueur (rien si aucun code allié) */
export const UnitStats = ({ shipName, pilots }: UnitStatsProps) => {
  const { roster } = useRoster();
  if (!roster) return null;
  const ship = findUnit(roster, shipName, 2);

  return (
    <div className={styles.stats}>
      {ship ? (
        <>
          <Stars count={ship.rarity} />
          <span>Niv. {ship.level}</span>
        </>
      ) : (
        <span className={styles.missing}>Non débloqué</span>
      )}
      {pilots.map((pilotName) => {
        const pilot = findUnit(roster, pilotName, 1);
        return (
          <span key={pilotName} className={styles.pilot} title={pilotName}>
            {pilotName.split(" ").at(-1)} :{" "}
            {pilot ? `${pilot.rarity}★ ${describeCharacter(pilot)}` : <span className={styles.missing}>absent</span>}
          </span>
        );
      })}
    </div>
  );
};

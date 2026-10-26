"use client";

import { useState } from "react";
import type { CapitalShip } from "@/data/capital-ships";
import type { Fleet, Lineup } from "@/data/fleets";
import { getShipPilots } from "@/data/ships";
import { findUnit, type Roster, type RosterUnit } from "@/lib/roster";
import { FighterIcon } from "@/components/ship-icon/ship-icon";
import { CapitalShipPortrait } from "@/components/capital-ship-portrait/capital-ship-portrait";
import { useRoster } from "@/components/roster/roster-provider";
import styles from "./fleet-formation.module.css";

type Mode = "offense" | "defense";

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
  roster: Roster | null;
  shipName: string;
  pilots: string[];
}

/** Niveau du vaisseau et de ses pilotes dans le roster du joueur */
const UnitStats = ({ roster, shipName, pilots }: UnitStatsProps) => {
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

interface FleetFormationProps {
  ship: CapitalShip;
  fleet: Fleet;
}

export const FleetFormation = ({ ship, fleet }: FleetFormationProps) => {
  const { roster } = useRoster();
  const [mode, setMode] = useState<Mode>("offense");
  const lineup: Lineup = mode === "defense" && fleet.defense ? fleet.defense : fleet.offense;

  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.toggle} role="tablist" aria-label="Mode de la flotte">
          {(["offense", "defense"] as const).map((value) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={mode === value}
              className={mode === value ? styles.active : undefined}
              onClick={() => setMode(value)}
            >
              {value === "offense" ? "Attaque" : "Défense"}
            </button>
          ))}
        </div>
        {mode === "defense" && !fleet.defense && (
          <p className={styles.notice}>Pas de composition spécifique en défense : même flotte qu&apos;en attaque.</p>
        )}
      </div>

      {lineup.notes && <p className={styles.lineupNotes}>{lineup.notes}</p>}

      <div className={styles.formation}>
        <div className={styles.group}>
          <h3 className={styles.groupTitle}>Vaisseau mère</h3>
          <div className={`${styles.slot} ${styles.capital}`}>
            <CapitalShipPortrait ship={ship} size="small" />
            <span className={styles.slotName}>{ship.name}</span>
            <UnitStats roster={roster} shipName={ship.name} pilots={[ship.commander]} />
          </div>
        </div>

        <div className={styles.group}>
          <h3 className={styles.groupTitle}>Départ</h3>
          <ol className={styles.row}>
            {lineup.starters.map((name, index) => (
              <li key={name} className={`${styles.slot} ${styles.starter}`}>
                <span className={styles.badge}>{index + 1}</span>
                <FighterIcon className={styles.slotIcon} />
                <span className={styles.slotName}>{name}</span>
                <UnitStats roster={roster} shipName={name} pilots={getShipPilots(name)} />
              </li>
            ))}
          </ol>
        </div>

        {lineup.reinforcements.length > 0 && (
          <div className={styles.group}>
            <h3 className={styles.groupTitle}>Renforts</h3>
            <ol className={styles.row}>
              {lineup.reinforcements.map((name, index) => (
                <li key={name} className={`${styles.slot} ${styles.reinforcement}`}>
                  <span className={styles.badge}>R{index + 1}</span>
                  <FighterIcon className={styles.slotIcon} />
                  <span className={styles.slotName}>{name}</span>
                  <UnitStats roster={roster} shipName={name} pilots={getShipPilots(name)} />
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </>
  );
};

"use client";

import { useState } from "react";
import type { CapitalShip } from "@/data/capital-ships";
import type { Fleet, Lineup } from "@/data/fleets";
import { getShipPilots } from "@/data/ships";
import { ShipThumb } from "@/components/ship-thumb/ship-thumb";
import { CapitalShipPortrait } from "@/components/capital-ship-portrait/capital-ship-portrait";
import { UnitStats } from "@/components/unit-stats/unit-stats";
import { useT } from "@/i18n/locale-provider";
import styles from "./fleet-formation.module.css";

type Mode = "offense" | "defense";

interface FleetFormationProps {
  ship: CapitalShip;
  fleet: Fleet;
}

export const FleetFormation = ({ ship, fleet }: FleetFormationProps) => {
  const { t, unit } = useT();
  const [mode, setMode] = useState<Mode>("offense");
  const lineup: Lineup = mode === "defense" && fleet.defense ? fleet.defense : fleet.offense;

  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.toggle} role="tablist" aria-label={t("fleet.mode")}>
          {(["offense", "defense"] as const).map((value) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={mode === value}
              className={mode === value ? styles.active : undefined}
              onClick={() => setMode(value)}
            >
              {t(value === "offense" ? "fleet.offense" : "fleet.defense")}
            </button>
          ))}
        </div>
        {mode === "defense" && !fleet.defense && (
          <p className={styles.notice}>{t("fleet.sameAsOffense")}</p>
        )}
      </div>

      {lineup.notes && <p className={styles.lineupNotes}>{lineup.notes}</p>}

      <div className={styles.formation}>
        <div className={styles.group}>
          <h3 className={styles.groupTitle}>{t("fleet.capitalShip")}</h3>
          <div className={`${styles.slot} ${styles.capital}`}>
            <CapitalShipPortrait ship={ship} size="small" />
            <span className={styles.slotName}>{ship.name}</span>
            <UnitStats shipName={ship.name} pilots={[ship.commander]} />
          </div>
        </div>

        <div className={styles.group}>
          <h3 className={styles.groupTitle}>{t("fleet.starters")}</h3>
          <ol className={styles.row}>
            {lineup.starters.map((name, index) => (
              <li key={name} className={`${styles.slot} ${styles.starter}`}>
                <span className={styles.badge}>{index + 1}</span>
                <ShipThumb name={name} />
                <span className={styles.slotName}>{unit(name)}</span>
                <UnitStats shipName={name} pilots={getShipPilots(name)} />
              </li>
            ))}
          </ol>
        </div>

        {lineup.reinforcements.length > 0 && (
          <div className={styles.group}>
            <h3 className={styles.groupTitle}>{t("fleet.reinforcements")}</h3>
            <ol className={styles.row}>
              {lineup.reinforcements.map((name, index) => (
                <li key={name} className={`${styles.slot} ${styles.reinforcement}`}>
                  <span className={styles.badge}>R{index + 1}</span>
                  <ShipThumb name={name} />
                  <span className={styles.slotName}>{unit(name)}</span>
                  <UnitStats shipName={name} pilots={getShipPilots(name)} />
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </>
  );
};

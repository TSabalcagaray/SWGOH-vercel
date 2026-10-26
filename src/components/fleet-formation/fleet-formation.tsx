"use client";

import { useState } from "react";
import type { CapitalShip } from "@/data/capital-ships";
import type { Fleet, Lineup } from "@/data/fleets";
import { getShipPilots } from "@/data/ships";
import { ShipThumb } from "@/components/ship-thumb/ship-thumb";
import { CapitalShipPortrait } from "@/components/capital-ship-portrait/capital-ship-portrait";
import { CrewAvatar, ShipStars } from "@/components/unit-stats/unit-stats";
import { useT } from "@/i18n/locale-provider";

const groupClass = "flex flex-col gap-3 max-[600px]:w-full";
const groupTitleClass = "text-[0.8rem] font-semibold tracking-[0.12em] uppercase opacity-70";
const rowClass = "flex flex-wrap gap-3 max-[600px]:grid max-[600px]:grid-cols-3 max-[600px]:gap-x-2 max-[600px]:gap-y-4";
// Hauteur fixe : tous les vaisseaux ont la même taille, avec ou sans pilote
const slotClass =
  "relative flex h-[204px] w-33 flex-col items-center gap-2 rounded-[14px] border border-white/15 bg-space/70 px-2.5 pt-5 pb-3 text-center max-[600px]:h-[184px] max-[600px]:w-auto";
const slotNameClass = "text-[0.85rem] leading-tight text-white max-[600px]:text-xs";
const badgeClass =
  "absolute -top-2.5 left-1/2 min-w-6.5 -translate-x-1/2 rounded-full border px-2 py-0.5 text-xs font-bold";

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
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <div className="inline-flex rounded-full border border-white/20 bg-space/70 p-1" role="tablist" aria-label={t("fleet.mode")}>
          {(["offense", "defense"] as const).map((value) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={mode === value}
              className={`cursor-pointer rounded-full px-4.5 py-1.5 text-[0.85rem] font-semibold tracking-[0.06em] uppercase transition-colors ${
                mode === value ? "bg-(--accent) text-space shadow-[0_0_14px_-2px_var(--accent)]" : "text-white/70"
              }`}
              onClick={() => setMode(value)}
            >
              {t(value === "offense" ? "fleet.offense" : "fleet.defense")}
            </button>
          ))}
        </div>
        {mode === "defense" && !fleet.defense && (
          <p className="text-[0.9rem] italic opacity-70">{t("fleet.sameAsOffense")}</p>
        )}
      </div>

      {lineup.notes && <p className="mt-4 rounded-r-lg border-l-3 border-(--accent) bg-white/5 px-3.5 py-2.5">{lineup.notes}</p>}

      <div className="mt-6 flex flex-wrap gap-8">
        <div className={groupClass}>
          <h3 className={groupTitleClass}>{t("fleet.capitalShip")}</h3>
          <div className={`${slotClass} w-45 border-(--accent) glow max-[600px]:w-full`}>
            <CrewAvatar pilots={[ship.commander]}>
              <CapitalShipPortrait ship={ship} size="small" />
            </CrewAvatar>
            <span className={slotNameClass}>{ship.name}</span>
            <span className="mt-auto">
              <ShipStars shipName={ship.name} />
            </span>
          </div>
        </div>

        <div className={groupClass}>
          <h3 className={groupTitleClass}>{t("fleet.starters")}</h3>
          <ol className={rowClass}>
            {lineup.starters.map((name, index) => (
              <li
                key={name}
                className={`${slotClass} border-2 border-starter bg-[radial-gradient(ellipse_at_top,rgb(255_215_106/0.18),rgb(2_6_15/0.8)_70%)] text-starter shadow-[0_0_20px_-4px_rgb(255_215_106/0.7)]`}
              >
                <span className={`${badgeClass} border-starter bg-starter text-[#1a1204]`}>{index + 1}</span>
                <CrewAvatar pilots={getShipPilots(name)}>
                  <ShipThumb name={name} />
                </CrewAvatar>
                <span className={slotNameClass}>{unit(name)}</span>
                <span className="mt-auto">
                  <ShipStars shipName={name} />
                </span>
              </li>
            ))}
          </ol>
        </div>

        {lineup.reinforcements.length > 0 && (
          <div className={groupClass}>
            <h3 className={groupTitleClass}>{t("fleet.reinforcements")}</h3>
            <ol className={rowClass}>
              {lineup.reinforcements.map((name, index) => (
                <li key={name} className={`${slotClass} border-dashed opacity-75`}>
                  <span className={`${badgeClass} border-white/25 bg-badge`}>R{index + 1}</span>
                  <CrewAvatar pilots={getShipPilots(name)}>
                    <ShipThumb name={name} />
                  </CrewAvatar>
                  <span className={slotNameClass}>{unit(name)}</span>
                  <span className="mt-auto">
                    <ShipStars shipName={name} />
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </>
  );
};

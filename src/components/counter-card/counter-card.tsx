import Link from "next/link";
import type { CapitalShip } from "@/data/capital-ships";
import type { Counter } from "@/data/fleets";
import { getShipPilots } from "@/data/ships";
import { CapitalShipPortrait } from "@/components/capital-ship-portrait/capital-ship-portrait";
import { CounterVideo } from "@/components/counter-video/counter-video";
import { ShipThumb } from "@/components/ship-thumb/ship-thumb";
import { UnitStats } from "@/components/unit-stats/unit-stats";
import { T, UnitName } from "@/i18n/locale-provider";
import { RateBadge } from "./rate-badge";
import styles from "./counter-card.module.css";

/** Vert à partir de 80 % de moyenne, orange à partir de 60 %, rouge en dessous */
const getRateTone = ([min, max]: [number, number]) => {
  const average = (min + max) / 2;
  if (average >= 80) return styles.high;
  if (average >= 60) return styles.medium;
  return styles.low;
};

const formatRate = ([min, max]: [number, number]) => (min === max ? `${min} %` : `${min}–${max} %`);

interface ShipRowProps {
  names: string[];
  kind: "starter" | "reinforcement";
}

const ShipRow = ({ names, kind }: ShipRowProps) => (
  <ol className={styles.lineup}>
    {names.map((name, index) => (
      <li key={name} className={`${styles.ship} ${styles[kind]}`}>
        <span className={styles.badge}>{kind === "starter" ? index + 1 : `R${index + 1}`}</span>
        <ShipThumb name={name} size="small" />
        <span className={styles.shipName}>
          <UnitName name={name} />
        </span>
        <UnitStats shipName={name} pilots={getShipPilots(name)} />
      </li>
    ))}
  </ol>
);

interface CounterCardProps {
  counter: Counter;
  capitalShip: CapitalShip;
  alsoBeats: CapitalShip[];
}

export const CounterCard = ({ counter, capitalShip, alsoBeats }: CounterCardProps) => {
  const { starters, reinforcements } = counter.lineup;

  return (
    <article className={`${styles.card} ${capitalShip.alignment === "light" ? styles.light : styles.dark}`}>
      <div className={styles.details}>
        <header className={styles.header}>
          <CapitalShipPortrait ship={capitalShip} size="tiny" />
          <div className={styles.heading}>
            <h3 className={styles.name}>
              <Link href={`/vaisseaux/${capitalShip.slug}`}>{capitalShip.name}</Link>
            </h3>
            <UnitStats shipName={capitalShip.name} pilots={[capitalShip.commander]} />
          </div>
          {counter.successRate && (
            <RateBadge className={`${styles.rate} ${getRateTone(counter.successRate)}`}>
              {formatRate(counter.successRate)}*
            </RateBadge>
          )}
        </header>

        <div className={styles.rows}>
          <ShipRow names={starters} kind="starter" />
          {reinforcements.length > 0 && <ShipRow names={reinforcements} kind="reinforcement" />}
        </div>

        {alsoBeats.length > 0 && (
          <p className={styles.alsoBeats}>
            <T k="counters.alsoBeats" />{" "}
            {alsoBeats.map((ship, index) => (
              <span key={ship.slug}>
                {index > 0 && ", "}
                <Link href={`/vaisseaux/${ship.slug}`}>{ship.name}</Link>
              </span>
            ))}
          </p>
        )}

        {counter.notes && <p className={styles.notes}>{counter.notes}</p>}
      </div>

      <div className={styles.video}>
        <CounterVideo url={counter.videoUrl} name={capitalShip.name} />
      </div>
    </article>
  );
};

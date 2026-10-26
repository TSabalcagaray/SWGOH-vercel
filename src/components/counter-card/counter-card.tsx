import Link from "next/link";
import type { CapitalShip } from "@/data/capital-ships";
import type { Counter } from "@/data/fleets";
import { getShipPilots } from "@/data/ships";
import { CapitalShipPortrait } from "@/components/capital-ship-portrait/capital-ship-portrait";
import { CounterVideo } from "@/components/counter-video/counter-video";
import { UnitStats } from "@/components/unit-stats/unit-stats";
import styles from "./counter-card.module.css";

/** Vert à partir de 80 % de moyenne, orange à partir de 60 %, rouge en dessous */
const getRateTone = ([min, max]: [number, number]) => {
  const average = (min + max) / 2;
  if (average >= 80) return styles.high;
  if (average >= 60) return styles.medium;
  return styles.low;
};

interface CounterCardProps {
  counter: Counter;
  capitalShip: CapitalShip;
  alsoBeats: CapitalShip[];
}

export const CounterCard = ({ counter, capitalShip, alsoBeats }: CounterCardProps) => {
  const { starters, reinforcements } = counter.lineup;

  return (
    <article className={`${styles.card} ${capitalShip.alignment === "light" ? styles.light : styles.dark}`}>
      <header className={styles.header}>
        <CapitalShipPortrait ship={capitalShip} size="tiny" />
        <div className={styles.heading}>
          <h3 className={styles.name}>
            <Link href={`/vaisseaux/${capitalShip.slug}`}>{capitalShip.name}</Link>
          </h3>
          <UnitStats shipName={capitalShip.name} pilots={[capitalShip.commander]} />
        </div>
        {counter.successRate && (
          <span className={`${styles.rate} ${getRateTone(counter.successRate)}`}>
            {counter.successRate[0]}–{counter.successRate[1]} %
          </span>
        )}
      </header>

      <ol className={styles.lineup}>
        {starters.map((name, index) => (
          <li key={name} className={`${styles.ship} ${styles.starter}`}>
            <span className={styles.badge}>{index + 1}</span>
            <span className={styles.shipName}>{name}</span>
            <UnitStats shipName={name} pilots={getShipPilots(name)} />
          </li>
        ))}
        {reinforcements.map((name, index) => (
          <li key={name} className={`${styles.ship} ${styles.reinforcement}`}>
            <span className={styles.badge}>R{index + 1}</span>
            <span className={styles.shipName}>{name}</span>
            <UnitStats shipName={name} pilots={getShipPilots(name)} />
          </li>
        ))}
      </ol>

      {alsoBeats.length > 0 && (
        <p className={styles.alsoBeats}>
          Casse aussi :{" "}
          {alsoBeats.map((ship, index) => (
            <span key={ship.slug}>
              {index > 0 && ", "}
              <Link href={`/vaisseaux/${ship.slug}`}>{ship.name}</Link>
            </span>
          ))}
        </p>
      )}

      {counter.notes && <p className={styles.notes}>{counter.notes}</p>}

      {counter.videoUrl ? (
        <CounterVideo url={counter.videoUrl} title={`Counter ${capitalShip.name}`} />
      ) : (
        <p className={styles.noVideo}>▶ Vidéo à venir</p>
      )}
    </article>
  );
};

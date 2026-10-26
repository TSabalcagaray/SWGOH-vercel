import { getCapitalShip, type CapitalShip } from "@/data/capital-ships";
import { getAlsoBeats, type Fleet } from "@/data/fleets";
import { FleetFormation } from "@/components/fleet-formation/fleet-formation";
import { CapitalShipPortrait } from "@/components/capital-ship-portrait/capital-ship-portrait";
import { CounterCard } from "@/components/counter-card/counter-card";
import styles from "./fleet-page.module.css";

interface FleetPageProps {
  ship: CapitalShip;
  fleet: Fleet;
}

export const FleetPage = ({ ship, fleet }: FleetPageProps) => (
  <div className={ship.alignment === "light" ? styles.light : styles.dark}>
    <section className={styles.hero}>
      <CapitalShipPortrait ship={ship} size="large" />
      <div>
        <span className={styles.faction}>{ship.faction}</span>
        <h1 className={styles.title}>{ship.name}</h1>
        <p className={styles.commander}>{ship.commander}</p>
      </div>
    </section>

    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Flotte</h2>
      {fleet.isExample && (
        <p className={styles.notice}>Flotte d&apos;exemple, en attendant la vraie composition.</p>
      )}

      <FleetFormation ship={ship} fleet={fleet} />
    </section>

    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Counters</h2>
      {fleet.counters.some((counter) => counter.successRate) && (
        <p className={styles.legend}>* Taux de réussite estimés à partir des combats en GA.</p>
      )}
      {fleet.counters.length === 0 ? (
        <p className={styles.notice}>Aucun counter pour l&apos;instant.</p>
      ) : (
        <ul className={styles.counters}>
          {fleet.counters.map((counter) => {
            const capitalShip = getCapitalShip(counter.capitalShip);
            if (!capitalShip) return null;
            const alsoBeats = getAlsoBeats(counter, ship.slug)
              .map(getCapitalShip)
              .filter((other) => other !== undefined);
            return (
              <li key={`${counter.capitalShip}-${counter.lineup.starters.join("-")}`}>
                <CounterCard counter={counter} capitalShip={capitalShip} alsoBeats={alsoBeats} />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  </div>
);

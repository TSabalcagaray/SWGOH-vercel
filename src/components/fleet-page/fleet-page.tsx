import type { CapitalShip } from "@/data/capital-ships";
import type { Fleet } from "@/data/fleets";
import { FleetFormation } from "@/components/fleet-formation/fleet-formation";
import { CapitalShipPortrait } from "@/components/capital-ship-portrait/capital-ship-portrait";
import { CounterVideo } from "@/components/counter-video/counter-video";
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
      {fleet.counters.length === 0 ? (
        <p className={styles.notice}>Aucun counter pour l&apos;instant.</p>
      ) : (
        <ul className={styles.counters}>
          {fleet.counters.map((counter) => (
            <li key={counter.title} className={styles.counter}>
              <CounterVideo url={counter.videoUrl} title={counter.title} />
              <div className={styles.counterBody}>
                <h3 className={styles.counterTitle}>{counter.title}</h3>
                {counter.notes && <p className={styles.counterNotes}>{counter.notes}</p>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  </div>
);

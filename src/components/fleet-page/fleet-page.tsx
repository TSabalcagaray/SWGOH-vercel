import type { CapitalShip } from "@/data/capital-ships";
import type { Fleet } from "@/data/fleets";
import { FighterIcon } from "@/components/ship-icon/ship-icon";
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

      <div className={styles.formation}>
        <div className={styles.group}>
          <h3 className={styles.groupTitle}>Vaisseau mère</h3>
          <div className={`${styles.slot} ${styles.capital}`}>
            <CapitalShipPortrait ship={ship} size="small" />
            <span className={styles.slotName}>{ship.name}</span>
          </div>
        </div>

        <div className={styles.group}>
          <h3 className={styles.groupTitle}>Départ</h3>
          <ol className={styles.row}>
            {fleet.starters.map((name, index) => (
              <li key={name} className={`${styles.slot} ${styles.starter}`}>
                <span className={styles.badge}>{index + 1}</span>
                <FighterIcon className={styles.slotIcon} />
                <span className={styles.slotName}>{name}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.group}>
          <h3 className={styles.groupTitle}>Renforts</h3>
          <ol className={styles.row}>
            {fleet.reinforcements.map((name, index) => (
              <li key={name} className={`${styles.slot} ${styles.reinforcement}`}>
                <span className={styles.badge}>R{index + 1}</span>
                <FighterIcon className={styles.slotIcon} />
                <span className={styles.slotName}>{name}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
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

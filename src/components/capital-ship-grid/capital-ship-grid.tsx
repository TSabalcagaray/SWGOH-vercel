import Link from "next/link";
import type { CapitalShip } from "@/data/capital-ships";
import { CapitalShipIcon } from "@/components/ship-icon/ship-icon";
import styles from "./capital-ship-grid.module.css";

interface CapitalShipGridProps {
  ships: CapitalShip[];
}

export const CapitalShipGrid = ({ ships }: CapitalShipGridProps) => (
  <section>
    <h1 className={styles.title}>Vaisseaux</h1>
    <p className={styles.subtitle}>Choisis un capital ship pour voir sa flotte et ses counters.</p>
    <ul className={styles.grid}>
      {ships.map((ship) => (
        <li key={ship.slug}>
          <Link
            href={`/vaisseaux/${ship.slug}`}
            className={`${styles.card} ${ship.alignment === "light" ? styles.light : styles.dark}`}
          >
            <CapitalShipIcon silhouette={ship.silhouette} className={styles.icon} />
            <h2 className={styles.name}>{ship.name}</h2>
            <p className={styles.commander}>{ship.commander}</p>
            <span className={styles.faction}>{ship.faction}</span>
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

import Link from "next/link";
import type { CapitalShip } from "@/data/capital-ships";
import { T, UnitName } from "@/i18n/locale-provider";
import { CapitalShipPortrait } from "@/components/capital-ship-portrait/capital-ship-portrait";
import styles from "./capital-ship-grid.module.css";

interface CapitalShipGridProps {
  ships: CapitalShip[];
}

export const CapitalShipGrid = ({ ships }: CapitalShipGridProps) => (
  <section>
    <h1 className={styles.title}>
      <T k="ships.title" />
    </h1>
    <p className={styles.subtitle}>
      <T k="ships.subtitle" />
    </p>
    <ul className={styles.grid}>
      {ships.map((ship) => (
        <li key={ship.slug}>
          <Link
            href={`/vaisseaux/${ship.slug}`}
            className={`${styles.card} ${ship.alignment === "light" ? styles.light : styles.dark}`}
          >
            <CapitalShipPortrait ship={ship} className={styles.icon} />
            <h2 className={styles.name}>{ship.name}</h2>
            <p className={styles.commander}>
              <UnitName name={ship.commander} />
            </p>
            <span className={styles.faction}>
              <T k={ship.faction} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

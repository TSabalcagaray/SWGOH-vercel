import type { CapitalShip } from "@/data/capital-ships";
import { CapitalShipIcon } from "@/components/ship-icon/ship-icon";
import { ExternalImage } from "@/components/external-image/external-image";
import styles from "./capital-ship-portrait.module.css";

interface CapitalShipPortraitProps {
  ship: CapitalShip;
  size?: "tiny" | "small" | "medium" | "large";
  className?: string;
}

/** Vignette du vaisseau */
export const CapitalShipPortrait = ({ ship, size = "medium", className }: CapitalShipPortraitProps) => (
  <div className={`${styles.portrait} ${styles[size]} ${className ?? ""}`}>
    <ExternalImage
      src={ship.image}
      alt={ship.name}
      className={styles.ship}
      fallback={<CapitalShipIcon silhouette={ship.silhouette} className={styles.fallback} />}
    />
  </div>
);

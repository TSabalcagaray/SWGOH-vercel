import { getShipImage } from "@/data/ships";
import { ExternalImage } from "@/components/external-image/external-image";
import { FighterIcon } from "@/components/ship-icon/ship-icon";
import styles from "./ship-thumb.module.css";

interface ShipThumbProps {
  name: string;
  size?: "small" | "medium";
}

/** Vignette d'un vaisseau, ou silhouette si l'image n'est pas connue ou ne charge pas */
export const ShipThumb = ({ name, size = "medium" }: ShipThumbProps) => {
  const image = getShipImage(name);
  const fallback = <FighterIcon className={styles.fallback} />;

  return (
    <span className={`${styles.thumb} ${styles[size]}`}>
      {image ? <ExternalImage src={image} alt={name} className={styles.image} fallback={fallback} /> : fallback}
    </span>
  );
};

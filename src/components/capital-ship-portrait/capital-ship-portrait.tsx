"use client";

import { useEffect, useRef, useState } from "react";
import type { CapitalShip } from "@/data/capital-ships";
import { CapitalShipIcon } from "@/components/ship-icon/ship-icon";
import styles from "./capital-ship-portrait.module.css";

interface ExternalImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback: React.ReactNode;
}

/**
 * Image externe chargée directement par le navigateur (pas de next/image, donc rien ne passe par notre serveur).
 * Affiche `fallback` si l'image échoue, y compris quand l'échec arrive avant l'hydratation.
 */
const ExternalImage = ({ src, alt, className, fallback }: ExternalImageProps) => {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) return <>{fallback}</>;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
};

interface CapitalShipPortraitProps {
  ship: CapitalShip;
  size?: "small" | "medium" | "large";
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

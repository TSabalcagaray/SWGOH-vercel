import type { CapitalShip } from "@/data/capital-ships";
import { CapitalShipIcon } from "@/components/ship-icon/ship-icon";
import { ExternalImage } from "@/components/external-image/external-image";

const sizes = {
  tiny: "w-16",
  small: "w-22",
  medium: "w-30",
  large: "w-[min(240px,60vw)]",
};

interface CapitalShipPortraitProps {
  ship: CapitalShip;
  size?: keyof typeof sizes;
  className?: string;
}

/** Vignette du vaisseau */
export const CapitalShipPortrait = ({ ship, size = "medium", className = "" }: CapitalShipPortraitProps) => (
  <div
    className={`${sizes[size]} ${className} relative grid aspect-square shrink-0 place-items-center rounded-full border-2 border-[var(--accent,#fff)] bg-[radial-gradient(circle,rgb(255_255_255/0.08),#050b16_70%)] shadow-[0_0_20px_-4px_var(--accent,#fff)]`}
  >
    <ExternalImage
      src={ship.image}
      alt={ship.name}
      className="size-full rounded-full object-cover"
      fallback={
        <CapitalShipIcon
          silhouette={ship.silhouette}
          className="w-[85%] text-[var(--accent,#fff)] drop-shadow-[0_0_6px_var(--accent,#fff)]"
        />
      }
    />
  </div>
);

import { getShipImage } from "@/data/ships";
import { ExternalImage } from "@/components/external-image/external-image";
import { FighterIcon } from "@/components/ship-icon/ship-icon";

const sizes = {
  small: "w-13",
  medium: "w-22 max-[600px]:w-17",
};

interface ShipThumbProps {
  name: string;
  size?: keyof typeof sizes;
}

/** Vignette d'un vaisseau, ou silhouette si l'image n'est pas connue ou ne charge pas */
export const ShipThumb = ({ name, size = "medium" }: ShipThumbProps) => {
  const image = getShipImage(name);
  const fallback = <FighterIcon className="w-full" />;

  return (
    <span
      className={`${sizes[size]} grid aspect-square shrink-0 place-items-center overflow-hidden rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.06),#050b16_70%)]`}
    >
      {image ? <ExternalImage src={image} alt={name} className="size-full object-cover" fallback={fallback} /> : fallback}
    </span>
  );
};

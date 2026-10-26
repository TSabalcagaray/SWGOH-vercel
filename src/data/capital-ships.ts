import { swgohAsset } from "@/lib/swgoh-gg";

export type Alignment = "light" | "dark";

export type Silhouette = "wedge" | "cruiser" | "crescent";

export interface CapitalShip {
  slug: string;
  name: string;
  commander: string;
  faction: string;
  alignment: Alignment;
  silhouette: Silhouette;
  /** Vignette du vaisseau (URL externe) */
  image: string;
}

/**
 * Images hébergées par swgoh.gg (chargées directement par le navigateur, rien ne passe par notre serveur).
 * Si une URL ne répond pas, la silhouette SVG est affichée à la place.
 * Toutes les URL ont été vérifiées.
 */

export const capitalShips: CapitalShip[] = [
  { slug: "executor", name: "Executor", commander: "Admiral Piett", faction: "Empire", alignment: "dark", silhouette: "wedge", image: swgohAsset("executor") },
  { slug: "leviathan", name: "Leviathan", commander: "Darth Malgus", faction: "Sith", alignment: "dark", silhouette: "crescent", image: swgohAsset("leviathan") },
  { slug: "profundity", name: "Profundity", commander: "Admiral Raddus", faction: "Rebelles", alignment: "light", silhouette: "cruiser", image: swgohAsset("profundity") },
  { slug: "executrix", name: "Executrix", commander: "Grand Moff Tarkin", faction: "Empire", alignment: "dark", silhouette: "wedge", image: swgohAsset("stardestroyer") },
  { slug: "chimaera", name: "Chimaera", commander: "Grand Admiral Thrawn", faction: "Empire", alignment: "dark", silhouette: "wedge", image: swgohAsset("chimaera") },
  { slug: "finalizer", name: "Finalizer", commander: "General Hux", faction: "Premier Ordre", alignment: "dark", silhouette: "wedge", image: swgohAsset("finalizer") },
  { slug: "malevolence", name: "Malevolence", commander: "General Grievous", faction: "Séparatistes", alignment: "dark", silhouette: "crescent", image: swgohAsset("malevolence") },
  { slug: "negotiator", name: "Negotiator", commander: "General Kenobi", faction: "République", alignment: "light", silhouette: "wedge", image: swgohAsset("negotiator") },
  { slug: "endurance", name: "Endurance", commander: "Mace Windu", faction: "République", alignment: "light", silhouette: "wedge", image: swgohAsset("venator") },
  { slug: "home-one", name: "Home One", commander: "Admiral Ackbar", faction: "Rebelles", alignment: "light", silhouette: "cruiser", image: swgohAsset("moncalamarilibertycruiser") },
  { slug: "raddus", name: "Raddus", commander: "Admiral Holdo", faction: "Résistance", alignment: "light", silhouette: "cruiser", image: swgohAsset("raddus") },
];

export const getCapitalShip = (slug: string) =>
  capitalShips.find((ship) => ship.slug === slug);

import { swgohAsset } from "@/lib/swgoh-gg";
import type { MessageKey } from "@/i18n/messages";

export type Alignment = "light" | "dark";

export type Silhouette = "wedge" | "cruiser" | "crescent";

export interface CapitalShip {
  slug: string;
  name: string;
  /** Nom anglais du commandant (traduit à l'affichage) */
  commander: string;
  /** Clé de traduction de la faction */
  faction: MessageKey;
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

/** Dans l'ordre d'affichage de la page Vaisseaux */
export const capitalShips: CapitalShip[] = [
  { slug: "leviathan", name: "Leviathan", commander: "Darth Malgus", faction: "faction.sith", alignment: "dark", silhouette: "crescent", image: swgohAsset("leviathan") },
  { slug: "profundity", name: "Profundity", commander: "Admiral Raddus", faction: "faction.rebels", alignment: "light", silhouette: "cruiser", image: swgohAsset("profundity") },
  { slug: "executor", name: "Executor", commander: "Admiral Piett", faction: "faction.empire", alignment: "dark", silhouette: "wedge", image: swgohAsset("executor") },
  { slug: "negotiator", name: "Negotiator", commander: "General Kenobi", faction: "faction.republic", alignment: "light", silhouette: "wedge", image: swgohAsset("negotiator") },
  { slug: "malevolence", name: "Malevolence", commander: "General Grievous", faction: "faction.separatists", alignment: "dark", silhouette: "crescent", image: swgohAsset("malevolence") },
  { slug: "raddus", name: "Raddus", commander: "Amilyn Holdo", faction: "faction.resistance", alignment: "light", silhouette: "cruiser", image: swgohAsset("raddus") },
  { slug: "finalizer", name: "Finalizer", commander: "General Hux", faction: "faction.firstOrder", alignment: "dark", silhouette: "wedge", image: swgohAsset("finalizer") },
  { slug: "home-one", name: "Home One", commander: "Admiral Ackbar", faction: "faction.rebels", alignment: "light", silhouette: "cruiser", image: swgohAsset("moncalamarilibertycruiser") },
  { slug: "chimaera", name: "Chimaera", commander: "Grand Admiral Thrawn", faction: "faction.empire", alignment: "dark", silhouette: "wedge", image: swgohAsset("chimaera") },
  { slug: "endurance", name: "Endurance", commander: "Mace Windu", faction: "faction.republic", alignment: "light", silhouette: "wedge", image: swgohAsset("venator") },
  { slug: "executrix", name: "Executrix", commander: "Grand Moff Tarkin", faction: "faction.empire", alignment: "dark", silhouette: "wedge", image: swgohAsset("stardestroyer") },
];

export const getCapitalShip = (slug: string) =>
  capitalShips.find((ship) => ship.slug === slug);

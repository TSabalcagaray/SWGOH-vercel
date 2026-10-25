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
  /** Portrait du pilote (URL externe) */
  pilotImage: string;
}

/**
 * Images hébergées par swgoh.gg (chargées directement par le navigateur, rien ne passe par notre serveur).
 * Si une URL ne répond pas, la silhouette SVG et les initiales du pilote sont affichées à la place.
 */
const swgohAsset = (texture: string) =>
  `https://game-assets.swgoh.gg/textures/tex.charui_${texture}.png`;

export const capitalShips: CapitalShip[] = [
  { slug: "executor", name: "Executor", commander: "Admiral Piett", faction: "Empire", alignment: "dark", silhouette: "wedge", image: swgohAsset("executor"), pilotImage: swgohAsset("piett") },
  { slug: "leviathan", name: "Leviathan", commander: "Darth Malgus", faction: "Sith", alignment: "dark", silhouette: "crescent", image: swgohAsset("leviathan"), pilotImage: swgohAsset("malgus") },
  { slug: "profundity", name: "Profundity", commander: "Admiral Raddus", faction: "Rebelles", alignment: "light", silhouette: "cruiser", image: swgohAsset("profundity"), pilotImage: swgohAsset("admiralraddus") },
  { slug: "executrix", name: "Executrix", commander: "Grand Moff Tarkin", faction: "Empire", alignment: "dark", silhouette: "wedge", image: swgohAsset("stardestroyer"), pilotImage: swgohAsset("tarkinadmiral") },
  { slug: "chimaera", name: "Chimaera", commander: "Grand Admiral Thrawn", faction: "Empire", alignment: "dark", silhouette: "wedge", image: swgohAsset("chimaera"), pilotImage: swgohAsset("thrawn") },
  { slug: "finalizer", name: "Finalizer", commander: "General Hux", faction: "Premier Ordre", alignment: "dark", silhouette: "wedge", image: swgohAsset("finalizer"), pilotImage: swgohAsset("generalhux") },
  { slug: "malevolence", name: "Malevolence", commander: "General Grievous", faction: "Séparatistes", alignment: "dark", silhouette: "crescent", image: swgohAsset("malevolence"), pilotImage: swgohAsset("grievous") },
  { slug: "negotiator", name: "Negotiator", commander: "General Kenobi", faction: "République", alignment: "light", silhouette: "wedge", image: swgohAsset("negotiator"), pilotImage: swgohAsset("obiwangeneral") },
  { slug: "endurance", name: "Endurance", commander: "Mace Windu", faction: "République", alignment: "light", silhouette: "wedge", image: swgohAsset("jedicruiser_mace"), pilotImage: swgohAsset("macewindu") },
  { slug: "home-one", name: "Home One", commander: "Admiral Ackbar", faction: "Rebelles", alignment: "light", silhouette: "cruiser", image: swgohAsset("moncalamaricruiser"), pilotImage: swgohAsset("ackbar") },
  { slug: "raddus", name: "Raddus", commander: "Admiral Holdo", faction: "Résistance", alignment: "light", silhouette: "cruiser", image: swgohAsset("raddus"), pilotImage: swgohAsset("holdo") },
];

export const getCapitalShip = (slug: string) =>
  capitalShips.find((ship) => ship.slug === slug);

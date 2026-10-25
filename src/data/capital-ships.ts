export type Alignment = "light" | "dark";

export type Silhouette = "wedge" | "cruiser" | "crescent";

export interface CapitalShip {
  slug: string;
  name: string;
  commander: string;
  faction: string;
  alignment: Alignment;
  silhouette: Silhouette;
}

export const capitalShips: CapitalShip[] = [
  { slug: "executor", name: "Executor", commander: "Admiral Piett", faction: "Empire", alignment: "dark", silhouette: "wedge" },
  { slug: "leviathan", name: "Leviathan", commander: "Darth Malgus", faction: "Sith", alignment: "dark", silhouette: "crescent" },
  { slug: "profundity", name: "Profundity", commander: "Admiral Raddus", faction: "Rebelles", alignment: "light", silhouette: "cruiser" },
  { slug: "executrix", name: "Executrix", commander: "Grand Moff Tarkin", faction: "Empire", alignment: "dark", silhouette: "wedge" },
  { slug: "chimaera", name: "Chimaera", commander: "Grand Admiral Thrawn", faction: "Empire", alignment: "dark", silhouette: "wedge" },
  { slug: "finalizer", name: "Finalizer", commander: "General Hux", faction: "Premier Ordre", alignment: "dark", silhouette: "wedge" },
  { slug: "malevolence", name: "Malevolence", commander: "General Grievous", faction: "Séparatistes", alignment: "dark", silhouette: "crescent" },
  { slug: "negotiator", name: "Negotiator", commander: "General Kenobi", faction: "République", alignment: "light", silhouette: "wedge" },
  { slug: "endurance", name: "Endurance", commander: "Mace Windu", faction: "République", alignment: "light", silhouette: "wedge" },
  { slug: "home-one", name: "Home One", commander: "Admiral Ackbar", faction: "Rebelles", alignment: "light", silhouette: "cruiser" },
  { slug: "raddus", name: "Raddus", commander: "Admiral Holdo", faction: "Résistance", alignment: "light", silhouette: "cruiser" },
];

export const getCapitalShip = (slug: string) =>
  capitalShips.find((ship) => ship.slug === slug);

import { swgohAsset } from "@/lib/swgoh-gg";

/**
 * Textures swgoh.gg des personnages (tex.charui_<texture>.png), par nom tel qu'affiché dans le jeu.
 * Vérifiées : ackbaradmiral, vader. Les autres sont à confirmer (les initiales s'affichent si l'image ne charge pas).
 */
const characterTextures: Record<string, string> = {
  "Admiral Piett": "piett",
  "Darth Malgus": "malgus",
  "Admiral Raddus": "admiralraddus",
  "Grand Moff Tarkin": "tarkinadmiral",
  "Grand Admiral Thrawn": "thrawn",
  "General Hux": "generalhux",
  "General Grievous": "grievous",
  "General Kenobi": "obiwangeneral",
  "Mace Windu": "macewindu",
  "Admiral Ackbar": "ackbaradmiral",
  "Amilyn Holdo": "holdo",
  "Darth Maul": "maul",
  Dengar: "dengar",
  "Cad Bane": "cadbane",
  "Boba Fett": "bobafett",
  "Darth Vader": "vader",
};

export const getCharacterImage = (name: string) => {
  const texture = characterTextures[name];
  return texture ? swgohAsset(texture) : undefined;
};

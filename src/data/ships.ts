import { swgohAsset } from "@/lib/swgoh-gg";

interface ShipInfo {
  /** Pilotes (noms tels qu'affichés dans le jeu). Absent = sans équipage ou pas encore renseigné. */
  pilots?: string[];
  /** Nom de la texture swgoh.gg (tex.charui_<texture>.png) */
  texture?: string;
}

/**
 * Infos des vaisseaux, par nom tel qu'affiché dans le jeu.
 * Textures vérifiées : slave1, furyclassinterceptor, b28extinctionclassbomber, sithsupremacyclass. Les autres sont à confirmer (la silhouette s'affiche si l'image ne charge pas).
 */
const ships: Record<string, ShipInfo> = {
  "Fury-class Interceptor": { pilots: ["Darth Malgus"], texture: "furyclassinterceptor" },
  "B-28 Extinction-class Bomber": { texture: "b28extinctionclassbomber" },
  "TIE Dagger": { texture: "tiedagger" },
  Scimitar: { pilots: ["Darth Maul"], texture: "sithinfiltrator" },
  "Sith Fighter": { texture: "sithfighter" },
  "Mark VI Interceptor": { pilots: ["Sith Empire Trooper"], texture: "sithsupremacyclass" },
  "Punishing One": { pilots: ["Dengar"], texture: "punishingone" },
  "Razor Crest": { pilots: ["The Mandalorian (Beskar Armor)"], texture: "razorcrest" },
  "Xanadu Blood": { pilots: ["Cad Bane"], texture: "xanadublood" },
  "Slave I": { pilots: ["Boba Fett"], texture: "slave1" },
  Scythe: { pilots: ["Grand Inquisitor", "Fifth Brother"], texture: "scythe" },
  "TIE Advanced x1": { pilots: ["Darth Vader"], texture: "tieadvanced" },
  "Imperial TIE Bomber": { texture: "tiebomber" },
  "Rebel B-wing": { texture: "bwing" },
  "TIE Defender": { texture: "tiedefender" },
  "Millennium Falcon": { texture: "mfalcon" },
  Ghost: { texture: "ghost" },
  "Phantom II": { texture: "phantom" },
  Outrider: { texture: "outrider" },
  "Biggs Darklighter's X-wing": { texture: "xwing_red3" },
  "Rebel Y-wing": { texture: "ywing_rebel" },
  "Bistan's U-wing": { texture: "uwing" },
};

export const getShipPilots = (shipName: string) => ships[shipName]?.pilots ?? [];

export const getShipImage = (shipName: string) => {
  const texture = ships[shipName]?.texture;
  return texture ? swgohAsset(texture) : undefined;
};

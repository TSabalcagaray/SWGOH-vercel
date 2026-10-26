import type { Locale } from "./messages";

/**
 * Noms français des unités. La clé est le nom anglais du jeu, qui sert aussi à retrouver l'unité dans le roster.
 * Absent = même nom dans les deux langues.
 */
const frenchNames: Record<string, string> = {
  // Vaisseaux
  "Fury-class Interceptor": "Intercepteur de classe Fury",
  "B-28 Extinction-class Bomber": "Bombardier B-28 de classe Extinction",
  Scimitar: "Cimeterre",
  "Sith Fighter": "Chasseur Sith",
  "Mark VI Interceptor": "Intercepteur Mark VI",
  "Imperial TIE Bomber": "Bombardier TIE impérial",
  "Rebel B-wing": "B-wing rebelle",
  "Millennium Falcon": "Faucon Millenium",
  "Biggs Darklighter's X-wing": "X-wing de Biggs Darklighter",
  "Rebel Y-wing": "Y-wing rebelle",
  "Bistan's U-wing": "U-wing de Bistan",
  // Personnages
  "Admiral Piett": "Amiral Piett",
  "Darth Malgus": "Dark Malgus",
  "Admiral Raddus": "Amiral Raddus",
  "Grand Admiral Thrawn": "Grand Amiral Thrawn",
  "General Hux": "Général Hux",
  "General Grievous": "Général Grievous",
  "General Kenobi": "Général Kenobi",
  "Admiral Ackbar": "Amiral Ackbar",
  "Darth Maul": "Dark Maul",
  "Darth Vader": "Dark Vador",
  "Grand Inquisitor": "Grand Inquisiteur",
  "Fifth Brother": "Cinquième Frère",
};

export const unitName = (name: string, locale: Locale) =>
  locale === "fr" ? (frenchNames[name] ?? name) : name;

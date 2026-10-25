export interface Counter {
  title: string;
  /** Lien YouTube (watch, youtu.be, shorts ou embed) */
  videoUrl?: string;
  notes?: string;
}

export interface Fleet {
  /** Les 3 vaisseaux de départ */
  starters: [string, string, string];
  /** Les renforts, dans l'ordre d'appel */
  reinforcements: string[];
  counters: Counter[];
  /** Flotte de démonstration, à remplacer par la vraie */
  isExample?: boolean;
}

const exampleFleet: Fleet = {
  starters: ["Millennium Falcon", "Ghost", "Phantom II"],
  reinforcements: ["Outrider", "Biggs Darklighter's X-wing", "Rebel Y-wing", "Bistan's U-wing"],
  counters: [
    {
      title: "Counter d'exemple",
      notes: "Ajoute ici le lien YouTube du counter et quelques notes (ordre des tirs, timing des renforts…).",
    },
  ],
  isExample: true,
};

/** Flottes par slug de capital ship. Tant qu'une flotte n'est pas renseignée, l'exemple est affiché. */
const fleets: Record<string, Fleet> = {};

export const getFleet = (slug: string): Fleet => fleets[slug] ?? exampleFleet;

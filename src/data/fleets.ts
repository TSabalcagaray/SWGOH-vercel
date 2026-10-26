export interface Counter {
  title: string;
  /** Lien YouTube (watch, youtu.be, shorts ou embed) */
  videoUrl?: string;
  notes?: string;
}

export interface Lineup {
  /** Vaisseaux de départ (3 au maximum) */
  starters: string[];
  /** Renforts, dans l'ordre d'appel */
  reinforcements: string[];
  notes?: string;
}

export interface Fleet {
  offense: Lineup;
  /** Composition en défense, si elle diffère de l'attaque */
  defense?: Lineup;
  counters: Counter[];
  /** Flotte de démonstration, à remplacer par la vraie */
  isExample?: boolean;
}

const exampleFleet: Fleet = {
  offense: {
    starters: ["Millennium Falcon", "Ghost", "Phantom II"],
    reinforcements: ["Outrider", "Biggs Darklighter's X-wing", "Rebel Y-wing", "Bistan's U-wing"],
  },
  counters: [
    {
      title: "Counter d'exemple",
      notes: "Ajoute ici le lien YouTube du counter et quelques notes (ordre des tirs, timing des renforts…).",
    },
  ],
  isExample: true,
};

/** Flottes par slug de capital ship. Tant qu'une flotte n'est pas renseignée, l'exemple est affiché. */
const fleets: Record<string, Fleet> = {
  leviathan: {
    offense: {
      starters: ["Fury-class Interceptor", "B-28 Extinction-class Bomber", "TIE Dagger"],
      reinforcements: ["Scimitar", "Sith Fighter", "Mark VI Interceptor"],
    },
    defense: {
      starters: ["Scimitar"],
      reinforcements: [],
      notes: "En défense, le mieux est le Scimitar seul.",
    },
    counters: [],
  },
};

export const getFleet = (slug: string): Fleet => fleets[slug] ?? exampleFleet;

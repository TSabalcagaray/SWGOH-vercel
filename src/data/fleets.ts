export interface Lineup {
  /** Vaisseaux de départ (3 au maximum) */
  starters: string[];
  /** Renforts, dans l'ordre d'appel */
  reinforcements: string[];
  notes?: string;
}

export interface Counter {
  /** Slug du capital ship utilisé pour le counter */
  capitalShip: string;
  lineup: Lineup;
  /** Taux de réussite estimé en GA, en %, sous forme de fourchette [min, max]. Absent = non renseigné. */
  successRate?: [number, number];
  /** Lien YouTube (watch, youtu.be, shorts ou embed) */
  videoUrl?: string;
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
  counters: [],
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
      starters: ["Fury-class Interceptor", "B-28 Extinction-class Bomber", "TIE Dagger"],
      reinforcements: ["Scimitar"],
      notes: "En défense, un seul renfort : le Scimitar.",
    },
    counters: [
      {
        capitalShip: "leviathan",
        videoUrl: "https://www.youtube.com/watch?v=W_JEgGAfgaA",
        successRate: [100, 100],
        lineup: {
          starters: ["Fury-class Interceptor", "B-28 Extinction-class Bomber", "TIE Dagger"],
          reinforcements: ["Scimitar", "Mark VI Interceptor"],
        },
      },
      {
        capitalShip: "executor",
        videoUrl: "https://www.youtube.com/watch?v=ARtJF2lieVM",
        successRate: [80, 90],
        lineup: {
          starters: ["Punishing One", "Razor Crest", "Xanadu Blood"],
          reinforcements: ["Mark VI Interceptor", "Slave I"],
        },
      },
      {
        capitalShip: "home-one",
        videoUrl: "https://www.youtube.com/watch?v=cng1agMML8U",
        successRate: [60, 80],
        lineup: {
          starters: ["Scythe", "TIE Advanced x1", "Imperial TIE Bomber"],
          reinforcements: ["Rebel B-wing", "TIE Defender"],
        },
      },
    ],
  },
};

export const getFleet = (slug: string): Fleet => fleets[slug] ?? exampleFleet;

/** Deux counters sont « le même » s'ils partent du même capital ship avec les mêmes vaisseaux de départ */
const sameCounter = (a: Counter, b: Counter) =>
  a.capitalShip === b.capitalShip &&
  [...a.lineup.starters].sort().join("|") === [...b.lineup.starters].sort().join("|");

/** Autres flottes (slugs) que ce counter casse aussi */
export const getAlsoBeats = (counter: Counter, currentSlug: string) =>
  Object.entries(fleets)
    .filter(([slug, fleet]) => slug !== currentSlug && fleet.counters.some((other) => sameCounter(other, counter)))
    .map(([slug]) => slug);

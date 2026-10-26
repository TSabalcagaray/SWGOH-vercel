/** Pilotes de chaque vaisseau (noms tels qu'affichés dans le jeu). Absent = vaisseau sans équipage. */
export const shipPilots: Record<string, string[]> = {
  Scimitar: ["Darth Maul"],
};

export const getShipPilots = (shipName: string) => shipPilots[shipName] ?? [];

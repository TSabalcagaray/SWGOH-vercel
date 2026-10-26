/** Pilotes de chaque vaisseau (noms tels qu'affichés dans le jeu). Absent = sans équipage ou pas encore renseigné. */
export const shipPilots: Record<string, string[]> = {
  Scimitar: ["Darth Maul"],
  "Punishing One": ["Dengar"],
  "Xanadu Blood": ["Cad Bane"],
  "Slave I": ["Boba Fett"],
  "TIE Advanced x1": ["Darth Vader"],
};

export const getShipPilots = (shipName: string) => shipPilots[shipName] ?? [];

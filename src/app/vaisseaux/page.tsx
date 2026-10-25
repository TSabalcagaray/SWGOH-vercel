import type { Metadata } from "next";
import { SpacePage } from "@/components/space-page/space-page";
import { CapitalShipGrid } from "@/components/capital-ship-grid/capital-ship-grid";
import { capitalShips } from "@/data/capital-ships";

export const metadata: Metadata = {
  title: "Vaisseaux · SWGOH Teams",
};

export default function VaisseauxPage() {
  return (
    <SpacePage backHref="/" backLabel="Retour">
      <CapitalShipGrid ships={capitalShips} />
    </SpacePage>
  );
}

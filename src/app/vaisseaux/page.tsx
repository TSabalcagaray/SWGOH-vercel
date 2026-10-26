import type { Metadata } from "next";
import { DocumentTitle } from "@/i18n/locale-provider";
import { SpacePage } from "@/components/space-page/space-page";
import { CapitalShipGrid } from "@/components/capital-ship-grid/capital-ship-grid";
import { capitalShips } from "@/data/capital-ships";

export const metadata: Metadata = {
  title: "Vaisseaux · SWGOH Teams",
};

export default function VaisseauxPage() {
  return (
    <SpacePage backHref="/" backLabel="nav.back">
      <DocumentTitle k="ships.title" />
      <CapitalShipGrid ships={capitalShips} />
    </SpacePage>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SpacePage } from "@/components/space-page/space-page";
import { FleetPage } from "@/components/fleet-page/fleet-page";
import { capitalShips, getCapitalShip } from "@/data/capital-ships";
import { getFleet } from "@/data/fleets";

interface FleetRouteProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export const generateStaticParams = () =>
  capitalShips.map((ship) => ({ slug: ship.slug }));

export const generateMetadata = async ({ params }: FleetRouteProps): Promise<Metadata> => {
  const ship = getCapitalShip((await params).slug);
  return { title: `${ship?.name ?? "SWGOH"} · SWGOH Teams` };
};

export default async function FleetRoute({ params }: FleetRouteProps) {
  const { slug } = await params;
  const ship = getCapitalShip(slug);
  if (!ship) notFound();

  return (
    <SpacePage backHref="/vaisseaux" backLabel="nav.ships">
      <FleetPage ship={ship} fleet={getFleet(slug)} />
    </SpacePage>
  );
}

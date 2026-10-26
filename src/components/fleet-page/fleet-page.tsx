import { getCapitalShip, type CapitalShip } from "@/data/capital-ships";
import { getAlsoBeats, type Fleet } from "@/data/fleets";
import { FleetFormation } from "@/components/fleet-formation/fleet-formation";
import { CapitalShipPortrait } from "@/components/capital-ship-portrait/capital-ship-portrait";
import { CounterGroup, type CounterVariant } from "@/components/counter-card/counter-group";
import { CounterChoiceCard } from "@/components/counter-card/counter-choice-card";
import { T, UnitName } from "@/i18n/locale-provider";

interface FleetPageProps {
  ship: CapitalShip;
  fleet: Fleet;
}

/** Regroupe les counters par capital ship, dans l'ordre où ils sont renseignés */
const groupCounters = (fleet: Fleet, slug: string) => {
  const groups = new Map<string, { capitalShip: CapitalShip; variants: CounterVariant[] }>();
  for (const counter of fleet.counters) {
    const capitalShip = getCapitalShip(counter.capitalShip);
    if (!capitalShip) continue;
    const alsoBeats = getAlsoBeats(counter, slug)
      .map(getCapitalShip)
      .filter((other) => other !== undefined);
    const group = groups.get(capitalShip.slug) ?? { capitalShip, variants: [] };
    group.variants.push({ counter, alsoBeats });
    groups.set(capitalShip.slug, group);
  }
  return [...groups.values()];
};

export const FleetPage = ({ ship, fleet }: FleetPageProps) => {
  const groups = groupCounters(fleet, ship.slug);

  return (
    <div className={ship.alignment === "light" ? "accent-light" : "accent-dark"}>
      <section className="flex flex-wrap items-center gap-8">
        <CapitalShipPortrait ship={ship} size="large" />
        <div>
          <span className="inline-block rounded-full border border-(--accent) px-2.5 py-0.5 text-xs tracking-[0.08em] text-(--accent) uppercase">
            <T k={ship.faction} />
          </span>
          <h1 className="mt-2 text-[clamp(2rem,6vw,4rem)] font-extrabold tracking-[0.12em] uppercase text-glow">
            {ship.name}
          </h1>
          <p className="mt-1 text-[1.1rem] opacity-80">
            <UnitName name={ship.commander} />
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="border-b border-white/15 pb-2 text-[1.4rem] font-bold tracking-widest uppercase">
          <T k="fleet.title" />
        </h2>
        {fleet.isExample && (
          <p className="mt-3 text-[0.9rem] italic opacity-70">
            <T k="fleet.example" />
          </p>
        )}

        <FleetFormation ship={ship} fleet={fleet} />
      </section>

      <section className="mt-12">
        <h2 className="border-b border-white/15 pb-2 text-[1.4rem] font-bold tracking-widest uppercase">
          <T k="counters.title" />
        </h2>
        {fleet.counters.length === 0 ? (
          <p className="mt-3 text-[0.9rem] italic opacity-70">
            <T k="counters.none" />
          </p>
        ) : (
          <ul className="mt-6 flex flex-col gap-6">
            {groups.map(({ capitalShip, variants }) => (
              <li key={capitalShip.slug}>
                <CounterGroup capitalShip={capitalShip} variants={variants} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {groups.some(({ variants }) => variants.length > 1) && (
        <section className="mt-12">
          <h2 className="border-b border-white/15 pb-2 text-[1.4rem] font-bold tracking-widest uppercase">
            <T k="counters.choiceTitle" />
          </h2>
          <p className="mt-3 text-[0.9rem] italic opacity-70">
            <T k="counters.choiceHint" />
          </p>
          <ul className="mt-6 flex flex-col gap-6">
            {groups
              .filter(({ variants }) => variants.length > 1)
              .map(({ capitalShip, variants }) => (
                <li key={capitalShip.slug}>
                  <CounterChoiceCard capitalShip={capitalShip} counters={variants.map(({ counter }) => counter)} />
                </li>
              ))}
          </ul>
        </section>
      )}
    </div>
  );
};

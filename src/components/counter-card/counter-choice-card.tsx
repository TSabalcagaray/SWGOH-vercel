import Link from "next/link";
import type { CapitalShip } from "@/data/capital-ships";
import type { Counter } from "@/data/fleets";
import { getShipPilots } from "@/data/ships";
import { CapitalShipPortrait } from "@/components/capital-ship-portrait/capital-ship-portrait";
import { CounterVideo } from "@/components/counter-video/counter-video";
import { ShipThumb } from "@/components/ship-thumb/ship-thumb";
import { CrewAvatar, ShipStars } from "@/components/unit-stats/unit-stats";
import { T, UnitName } from "@/i18n/locale-provider";
import { badgeKindClass, formatRate, getRateTone, shipKindClass } from "./counter-card";

type Kind = "starter" | "reinforcement";

/** Pour chaque position, le vaisseau de chaque variante (null si la variante n'en a pas) */
const mergeSlots = (counters: Counter[], kind: Kind) => {
  const lists = counters.map((counter) => (kind === "starter" ? counter.lineup.starters : counter.lineup.reinforcements));
  const length = Math.max(...lists.map((list) => list.length));
  return Array.from({ length }, (_, index) => lists.map((list) => list[index] ?? null));
};

const VariantTag = ({ numbers }: { numbers: number[] }) => (
  <span className="rounded-full bg-white/12 px-1.5 text-[0.62rem] font-bold text-white/80">{numbers.join("+")}</span>
);

interface SlotProps {
  options: (string | null)[];
  kind: Kind;
  index: number;
}

const Slot = ({ options, kind, index }: SlotProps) => {
  const unique = [...new Set(options)];
  const badge = kind === "starter" ? index + 1 : `R${index + 1}`;
  const badgeElement = (
    <span
      className={`${badgeKindClass[kind]} absolute -top-[9px] left-1/2 -translate-x-1/2 rounded-full border px-[7px] py-px text-[0.68rem] font-bold`}
    >
      {badge}
    </span>
  );

  // Même vaisseau dans toutes les variantes : case classique
  if (unique.length === 1 && unique[0]) {
    const name = unique[0];
    return (
      <li className={`${shipKindClass[kind]} relative flex h-[150px] flex-col items-center gap-1.5 rounded-[10px] px-1.5 pt-4 pb-2 text-center`}>
        {badgeElement}
        <CrewAvatar pilots={getShipPilots(name)} size="small">
          <ShipThumb name={name} size="small" />
        </CrewAvatar>
        <span className="text-[0.8rem] leading-[1.2] text-white">
          <UnitName name={name} />
        </span>
        <span className="mt-auto">
          <ShipStars shipName={name} />
        </span>
      </li>
    );
  }

  // Vaisseaux différents selon la variante : case « au choix »
  return (
    <li
      className={`${shipKindClass[kind]} relative flex h-[150px] flex-col justify-center gap-1 rounded-[10px] border-dashed! px-1.5 pt-4 pb-2`}
    >
      {badgeElement}
      {unique.map((name, optionIndex) => (
        <div key={name ?? "none"} className="flex flex-col gap-1">
          {optionIndex > 0 && (
            <span className="text-center text-[0.62rem] tracking-widest text-white/50 uppercase">
              <T k="counters.or" />
            </span>
          )}
          <div className="flex items-center gap-1.5">
            {name ? <ShipThumb name={name} size="tiny" /> : <span className="w-7" />}
            <span className="min-w-0 flex-1 text-[0.72rem] leading-tight text-white">
              {name ? <UnitName name={name} /> : <span className="italic opacity-60"><T k="counters.nothing" /></span>}
            </span>
            <VariantTag numbers={options.flatMap((option, variant) => (option === name ? [variant + 1] : []))} />
          </div>
        </div>
      ))}
    </li>
  );
};

interface CounterChoiceCardProps {
  capitalShip: CapitalShip;
  counters: Counter[];
}

/** Autre présentation : une seule carte, les positions qui changent proposent un vaisseau au choix */
export const CounterChoiceCard = ({ capitalShip, counters }: CounterChoiceCardProps) => {
  const video = counters.find((counter) => counter.videoUrl)?.videoUrl;

  return (
    <article
      className={`${capitalShip.alignment === "light" ? "accent-light" : "accent-dark"} grid grid-cols-2 items-start gap-6 rounded-[14px] border border-white/15 bg-space/75 p-4 max-[800px]:grid-cols-1`}
    >
      <div className="flex min-w-0 flex-col gap-4">
        <header className="flex items-center gap-3.5">
          <CrewAvatar pilots={[capitalShip.commander]} size="small">
            <CapitalShipPortrait ship={capitalShip} size="tiny" />
          </CrewAvatar>
          <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
            <h3 className="text-[1.15rem] font-extrabold tracking-[0.08em] uppercase">
              <Link href={`/vaisseaux/${capitalShip.slug}`} className="hover:text-(--accent)">
                {capitalShip.name}
              </Link>
            </h3>
            <ShipStars shipName={capitalShip.name} />
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            {counters.map((counter, index) =>
              counter.successRate ? (
                <span
                  key={index}
                  className={`${getRateTone(counter.successRate)} flex items-center gap-1.5 rounded-full border border-current bg-current/15 px-2.5 py-0.5 text-[0.8rem] font-bold whitespace-nowrap`}
                >
                  <VariantTag numbers={[index + 1]} />
                  {formatRate(counter.successRate)}
                </span>
              ) : null,
            )}
          </div>
        </header>

        <div className="flex flex-col gap-4">
          {(["starter", "reinforcement"] as const).map((kind) => {
            const slots = mergeSlots(counters, kind);
            return slots.length > 0 ? (
              <ol key={kind} className="grid grid-cols-3 gap-2">
                {slots.map((options, index) => (
                  <Slot key={index} options={options} kind={kind} index={index} />
                ))}
              </ol>
            ) : null;
          })}
        </div>
      </div>

      <div className="overflow-hidden rounded-[10px]">
        <CounterVideo url={video} name={capitalShip.name} />
      </div>
    </article>
  );
};

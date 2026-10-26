import Link from "next/link";
import type { CapitalShip } from "@/data/capital-ships";
import type { Counter } from "@/data/fleets";
import { getShipPilots } from "@/data/ships";
import { CapitalShipPortrait } from "@/components/capital-ship-portrait/capital-ship-portrait";
import { CounterVideo } from "@/components/counter-video/counter-video";
import { ShipThumb } from "@/components/ship-thumb/ship-thumb";
import { CrewAvatar, ShipStars } from "@/components/unit-stats/unit-stats";
import { T, UnitName } from "@/i18n/locale-provider";
import { RateBadge } from "./rate-badge";

/** Vert à partir de 80 % de moyenne, orange à partir de 60 %, rouge en dessous */
export const getRateTone = ([min, max]: [number, number]) => {
  const average = (min + max) / 2;
  if (average >= 80) return "text-rate-high";
  if (average >= 60) return "text-rate-medium";
  return "text-rate-low";
};

export const shipKindClass = {
  starter: "border-2 border-starter bg-[radial-gradient(ellipse_at_top,rgb(255_215_106/0.14),transparent_70%)] text-starter",
  reinforcement: "border border-dashed border-white/15 opacity-80",
};

export const badgeKindClass = {
  starter: "border-starter bg-starter text-[#1a1204]",
  reinforcement: "border-white/25 bg-badge",
};

export const formatRate = ([min, max]: [number, number]) => (min === max ? `${min} %` : `${min}–${max} %`);

interface ShipRowProps {
  names: string[];
  kind: "starter" | "reinforcement";
}

const ShipRow = ({ names, kind }: ShipRowProps) => (
  <ol className="grid grid-cols-3 gap-2">
    {names.map((name, index) => (
      <li
        key={name}
        className={`${shipKindClass[kind]} relative flex h-[150px] flex-col items-center gap-1.5 rounded-[10px] px-1.5 pt-4 pb-2 text-center`}
      >
        <span
          className={`${badgeKindClass[kind]} absolute -top-[9px] left-1/2 -translate-x-1/2 rounded-full border px-[7px] py-px text-[0.68rem] font-bold`}
        >{kind === "starter" ? index + 1 : `R${index + 1}`}</span>
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
    ))}
  </ol>
);

interface CounterCardProps {
  counter: Counter;
  capitalShip: CapitalShip;
  alsoBeats: CapitalShip[];
  /** Affiché en haut de la carte (ex. switch entre variantes) */
  toolbar?: React.ReactNode;
}

export const CounterCard = ({ counter, capitalShip, alsoBeats, toolbar }: CounterCardProps) => {
  const { starters, reinforcements } = counter.lineup;

  return (
    <article
      className={`${capitalShip.alignment === "light" ? "accent-light" : "accent-dark"} group/card grid grid-cols-2 items-start gap-6 rounded-[14px] border border-white/15 bg-space/75 p-4 max-[800px]:grid-cols-1`}
    >
      <div className="flex min-w-0 flex-col gap-4">
        {toolbar}
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
          {counter.successRate && (
            <RateBadge
              className={`${getRateTone(counter.successRate)} block rounded-full border border-current bg-current/15 px-3 py-1 text-[0.9rem] font-bold whitespace-nowrap`}
            >
              {formatRate(counter.successRate)}
            </RateBadge>
          )}
        </header>

        <div className="flex flex-col gap-4">
          <ShipRow names={starters} kind="starter" />
          {reinforcements.length > 0 && <ShipRow names={reinforcements} kind="reinforcement" />}
        </div>

        {alsoBeats.length > 0 && (
          <p className="text-[0.85rem] opacity-85">
            <T k="counters.alsoBeats" />{" "}
            {alsoBeats.map((ship, index) => (
              <span key={ship.slug}>
                {index > 0 && ", "}
                <Link href={`/vaisseaux/${ship.slug}`} className="font-semibold underline underline-offset-3">
                  {ship.name}
                </Link>
              </span>
            ))}
          </p>
        )}

        {counter.notes && <p className="text-[0.9rem] leading-normal opacity-80">{counter.notes}</p>}
      </div>

      <div className="overflow-hidden rounded-[10px]">
        <CounterVideo url={counter.videoUrl} name={capitalShip.name} />
      </div>
    </article>
  );
};

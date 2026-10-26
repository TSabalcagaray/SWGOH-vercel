import Link from "next/link";
import type { CapitalShip } from "@/data/capital-ships";
import { T, UnitName } from "@/i18n/locale-provider";
import { CapitalShipPortrait } from "@/components/capital-ship-portrait/capital-ship-portrait";

interface CapitalShipGridProps {
  ships: CapitalShip[];
}

export const CapitalShipGrid = ({ ships }: CapitalShipGridProps) => (
  <section>
    <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-[0.12em] uppercase [text-shadow:0_0_24px_rgb(77_184_255/0.5)]">
      <T k="ships.title" />
    </h1>
    <p className="mt-2 tracking-[0.04em] opacity-75">
      <T k="ships.subtitle" />
    </p>
    <ul className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
      {ships.map((ship) => (
        <li key={ship.slug}>
          <Link
            href={`/vaisseaux/${ship.slug}`}
            className={`${ship.alignment === "light" ? "accent-light" : "accent-dark"} group relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-white/12 bg-[radial-gradient(ellipse_at_top,rgb(255_255_255/0.06),rgb(2_6_15/0.75)_70%)] px-4 pt-6 pb-5 text-center backdrop-blur-xs transition-[transform,border-color,box-shadow] duration-400 ease-swift hover:-translate-y-1 hover:border-(--accent) hover:shadow-[0_0_24px_-4px_var(--accent)] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-(--accent)`}
          >
            <CapitalShipPortrait ship={ship} className="transition-transform duration-500 ease-swift group-hover:scale-[1.08]" />
            <h2 className="mt-3 text-xl font-extrabold tracking-widest uppercase transition-[text-shadow] duration-300 group-hover:[text-shadow:0_0_12px_var(--accent)]">
              {ship.name}
            </h2>
            <p className="mt-1 text-[0.9rem] opacity-75">
              <UnitName name={ship.commander} />
            </p>
            <span className="mt-3 rounded-full border border-(--accent) px-2.5 py-0.5 text-xs tracking-[0.08em] text-(--accent) uppercase">
              <T k={ship.faction} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

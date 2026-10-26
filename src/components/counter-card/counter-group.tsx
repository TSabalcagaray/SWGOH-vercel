"use client";

import { useState } from "react";
import type { CapitalShip } from "@/data/capital-ships";
import type { Counter } from "@/data/fleets";
import { useT } from "@/i18n/locale-provider";
import { CounterCard, formatRate, getRateTone } from "./counter-card";

export interface CounterVariant {
  counter: Counter;
  alsoBeats: CapitalShip[];
}

interface CounterGroupProps {
  capitalShip: CapitalShip;
  variants: CounterVariant[];
}

/** Counters partant du même capital ship : un switch en haut de la carte pour passer de l'un à l'autre */
export const CounterGroup = ({ capitalShip, variants }: CounterGroupProps) => {
  const { t } = useT();
  const [selected, setSelected] = useState(0);
  const { counter, alsoBeats } = variants[Math.min(selected, variants.length - 1)];

  const toolbar =
    variants.length > 1 ? (
      <div
        className="inline-flex self-start rounded-full border border-white/20 bg-space/70 p-1"
        role="tablist"
        aria-label={t("counters.variants")}
      >
        {variants.map((variant, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={selected === index}
            onClick={() => setSelected(index)}
            className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1 text-[0.8rem] font-semibold transition-colors ${
              selected === index ? "bg-(--accent) text-space shadow-[0_0_14px_-2px_var(--accent)]" : "text-white/70 hover:text-white"
            }`}
          >
            {t("counters.variant", { number: index + 1 })}
            {variant.counter.successRate && (
              <span
                className={`text-[0.7rem] ${selected === index ? "opacity-75" : getRateTone(variant.counter.successRate)}`}
              >
                {formatRate(variant.counter.successRate)}
              </span>
            )}
          </button>
        ))}
      </div>
    ) : undefined;

  return <CounterCard counter={counter} capitalShip={capitalShip} alsoBeats={alsoBeats} toolbar={toolbar} />;
};

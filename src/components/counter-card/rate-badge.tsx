"use client";

import { useId } from "react";
import { useT } from "@/i18n/locale-provider";

/** Pastille du taux de réussite. L'infobulle (estimation GA) apparaît au survol de la carte du counter. */
export const RateBadge = ({ className, children }: { className: string; children: React.ReactNode }) => {
  const { t } = useT();
  const tooltipId = useId();
  return (
    <span className="group/rate relative shrink-0" tabIndex={0}>
      <span className={`${className} cursor-help`} aria-describedby={tooltipId}>
        {children}
      </span>
      <span
        id={tooltipId}
        role="tooltip"
        className="pointer-events-none absolute top-[calc(100%+8px)] right-0 z-10 w-max max-w-[220px] rounded-lg border border-white/15 bg-space/95 px-3 py-2 text-[0.8rem] font-normal text-white opacity-0 shadow-[0_8px_24px_rgb(0_0_0/0.5)] transition-opacity duration-200 group-hover/card:opacity-100 group-focus/rate:opacity-100"
      >
        {t("counters.rateTooltip")}
      </span>
    </span>
  );
};

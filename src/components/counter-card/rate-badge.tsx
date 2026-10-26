"use client";

import { useT } from "@/i18n/locale-provider";

/** Pastille du taux de réussite, avec l'infobulle traduite */
export const RateBadge = ({ className, children }: { className: string; children: React.ReactNode }) => {
  const { t } = useT();
  return (
    <span className={className} title={t("counters.rateTooltip")}>
      {children}
    </span>
  );
};

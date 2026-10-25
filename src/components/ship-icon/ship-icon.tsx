import type { Silhouette } from "@/data/capital-ships";

interface CapitalShipIconProps {
  silhouette: Silhouette;
  className?: string;
}

/** Silhouette stylisée d'un capital ship */
export const CapitalShipIcon = ({ silhouette, className }: CapitalShipIconProps) => (
  <svg viewBox="0 0 200 100" className={className} aria-hidden="true">
    <g fill="#0b1220" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      {silhouette === "wedge" && (
        <>
          <path d="M10 50 L170 18 L190 50 L170 82 Z" />
          <path d="M60 50 L150 34 L150 66 Z" opacity="0.6" />
          <rect x="150" y="42" width="22" height="16" rx="2" />
        </>
      )}
      {silhouette === "cruiser" && (
        <>
          <path d="M14 50 Q30 22 110 24 Q180 28 190 50 Q180 72 110 76 Q30 78 14 50 Z" />
          <path d="M40 50 Q60 38 120 38 Q160 40 170 50 Q160 60 120 62 Q60 62 40 50 Z" opacity="0.6" />
        </>
      )}
      {silhouette === "crescent" && (
        <>
          <path d="M10 50 Q60 6 180 30 L150 40 Q90 34 60 50 Q90 66 150 60 L180 70 Q60 94 10 50 Z" />
          <circle cx="40" cy="50" r="8" />
        </>
      )}
    </g>
    <circle cx="14" cy="50" r="4" fill="currentColor" opacity="0.9" />
  </svg>
);

/** Silhouette stylisée d'un chasseur */
export const FighterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <g fill="#0b1220" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round">
      <path d="M50 12 L58 50 L56 86 L44 86 L42 50 Z" />
      <path d="M42 52 L14 70 L14 78 L44 70 Z" />
      <path d="M58 52 L86 70 L86 78 L56 70 Z" />
    </g>
    <circle cx="50" cy="88" r="4" fill="currentColor" opacity="0.9" />
  </svg>
);

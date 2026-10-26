import Link from "next/link";
import { T } from "@/i18n/locale-provider";
import type { MessageKey } from "@/i18n/messages";

const sections: { href: string; side: string; label: MessageKey; subtitle: MessageKey; className: string; background: string }[] = [
  {
    href: "/personnages",
    side: "characters",
    label: "home.characters",
    subtitle: "home.charactersSubtitle",
    className: "accent-dark",
    background: "bg-[url(/images/characters-bg.svg)]",
  },
  {
    href: "/vaisseaux",
    side: "ships",
    label: "home.ships",
    subtitle: "home.shipsSubtitle",
    className: "accent-light",
    background: "bg-[url(/images/ships-bg.svg)]",
  },
];

export const SplitHome = () => {
  return (
    <main className="group/split relative flex h-svh w-screen overflow-hidden bg-black max-[700px]:flex-col">
      {sections.map((section) => (
        <Link
          key={section.href}
          href={section.href}
          data-side={section.side}
          className={`${section.className} group relative flex flex-1 basis-0 items-center justify-center overflow-hidden text-white transition-[flex-grow] duration-600 ease-swift hover:grow-[1.25] focus-visible:outline-3 focus-visible:-outline-offset-6 focus-visible:outline-(--accent)`}
        >
          <div
            className={`${section.background} absolute inset-0 scale-[1.02] bg-cover bg-center brightness-60 saturate-70 transition-[transform,filter] duration-800 ease-swift group-hover:scale-[1.08] group-hover:brightness-95 group-hover:saturate-110`}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgb(0_0_0/0.65)_100%)] transition-opacity duration-600 group-hover:opacity-60"
            aria-hidden="true"
          />
          <div className="relative px-4 text-center">
            <h2 className="text-[clamp(1.75rem,4vw,4rem)] font-extrabold tracking-[0.12em] uppercase [text-shadow:0_0_24px_rgb(0_0_0/0.8)] transition-[letter-spacing,text-shadow] duration-600 ease-swift group-hover:tracking-[0.18em] group-hover:text-glow">
              <T k={section.label} />
            </h2>
            <p className="mt-3 translate-y-2.5 text-[clamp(0.9rem,1.4vw,1.15rem)] tracking-[0.08em] opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-90 max-[700px]:translate-y-0 max-[700px]:opacity-85">
              <T k={section.subtitle} />
            </p>
          </div>
        </Link>
      ))}
      {/* Séparateur : suit le panneau qui s'agrandit (1.25 / 2.25 ≈ 55.5 %) */}
      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-linear-to-b from-transparent via-white/85 to-transparent shadow-[0_0_18px_rgb(255_255_255/0.6)] transition-[left] duration-600 ease-swift group-has-[[data-side=characters]:hover]/split:left-[55.5%] group-has-[[data-side=ships]:hover]/split:left-[44.5%] max-[700px]:inset-x-0 max-[700px]:top-1/2 max-[700px]:bottom-auto max-[700px]:left-0! max-[700px]:h-0.5 max-[700px]:w-auto max-[700px]:translate-x-0 max-[700px]:-translate-y-1/2 max-[700px]:bg-linear-to-r"
        aria-hidden="true"
      />
    </main>
  );
};

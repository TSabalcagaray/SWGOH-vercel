import Link from "next/link";
import { T } from "@/i18n/locale-provider";
import type { MessageKey } from "@/i18n/messages";

interface SpacePageProps {
  backHref: string;
  backLabel: MessageKey;
  children: React.ReactNode;
}

/** Mise en page sombre reprenant l'ambiance du panneau Vaisseaux de l'accueil */
export const SpacePage = ({ backHref, backLabel, children }: SpacePageProps) => (
  <div className="relative isolate min-h-svh bg-space text-white">
    <div
      className="fixed inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(2_6_15/0.55),rgb(2_6_15/0.92)),url(/images/ships-bg.svg)] bg-cover bg-center bg-no-repeat"
      aria-hidden="true"
    />
    <header className="mx-auto max-w-[1200px] px-4 py-6">
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-space/50 px-4 py-2 text-[0.95rem] backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/10"
      >
        ← <T k={backLabel} />
      </Link>
    </header>
    <main className="mx-auto max-w-[1200px] px-4 pb-16">{children}</main>
  </div>
);

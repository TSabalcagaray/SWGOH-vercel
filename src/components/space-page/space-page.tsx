import Link from "next/link";
import { T } from "@/i18n/locale-provider";
import type { MessageKey } from "@/i18n/messages";
import styles from "./space-page.module.css";

interface SpacePageProps {
  backHref: string;
  backLabel: MessageKey;
  children: React.ReactNode;
}

/** Mise en page sombre reprenant l'ambiance du panneau Vaisseaux de l'accueil */
export const SpacePage = ({ backHref, backLabel, children }: SpacePageProps) => (
  <div className={styles.page}>
    <div className={styles.background} aria-hidden="true" />
    <header className={styles.header}>
      <Link href={backHref} className={styles.back}>
        ← <T k={backLabel} />
      </Link>
    </header>
    <main className={styles.main}>{children}</main>
  </div>
);

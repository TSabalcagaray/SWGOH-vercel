import Link from "next/link";
import styles from "./space-page.module.css";

interface SpacePageProps {
  backHref: string;
  backLabel: string;
  children: React.ReactNode;
}

/** Mise en page sombre reprenant l'ambiance du panneau Vaisseaux de l'accueil */
export const SpacePage = ({ backHref, backLabel, children }: SpacePageProps) => (
  <div className={styles.page}>
    <div className={styles.background} aria-hidden="true" />
    <header className={styles.header}>
      <Link href={backHref} className={styles.back}>
        ← {backLabel}
      </Link>
    </header>
    <main className={styles.main}>{children}</main>
  </div>
);

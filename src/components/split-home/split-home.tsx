import Link from "next/link";
import { T } from "@/i18n/locale-provider";
import type { MessageKey } from "@/i18n/messages";
import styles from "./split-home.module.css";

const sections: { href: string; label: MessageKey; subtitle: MessageKey; className: string }[] = [
  {
    href: "/personnages",
    label: "home.characters",
    subtitle: "home.charactersSubtitle",
    className: styles.characters,
  },
  {
    href: "/vaisseaux",
    label: "home.ships",
    subtitle: "home.shipsSubtitle",
    className: styles.ships,
  },
];

export const SplitHome = () => {
  return (
    <main className={styles.split}>
      {sections.map((section) => (
        <Link
          key={section.href}
          href={section.href}
          className={`${styles.panel} ${section.className}`}
        >
          <div className={styles.background} aria-hidden="true" />
          <div className={styles.overlay} aria-hidden="true" />
          <div className={styles.content}>
            <h2 className={styles.label}>
              <T k={section.label} />
            </h2>
            <p className={styles.subtitle}>
              <T k={section.subtitle} />
            </p>
          </div>
        </Link>
      ))}
      <div className={styles.divider} aria-hidden="true" />
    </main>
  );
};

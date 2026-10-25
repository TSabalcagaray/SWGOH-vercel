import Link from "next/link";
import styles from "./split-home.module.css";

const sections = [
  {
    href: "/personnages",
    label: "Personnages",
    subtitle: "Escouades, counters & vidéos",
    className: styles.characters,
  },
  {
    href: "/vaisseaux",
    label: "Vaisseaux",
    subtitle: "Flottes, counters & vidéos",
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
            <h2 className={styles.label}>{section.label}</h2>
            <p className={styles.subtitle}>{section.subtitle}</p>
          </div>
        </Link>
      ))}
      <div className={styles.divider} aria-hidden="true" />
    </main>
  );
};

import Link from "next/link";
import styles from "./category-page.module.css";

interface CategoryPageProps {
  title: string;
}

export const CategoryPage = ({ title }: CategoryPageProps) => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.back}>
          ← Retour
        </Link>
      </header>
      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>
      </main>
    </div>
  );
};

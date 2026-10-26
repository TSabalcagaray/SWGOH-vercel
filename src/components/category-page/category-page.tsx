import Link from "next/link";
import { DocumentTitle, T } from "@/i18n/locale-provider";
import type { MessageKey } from "@/i18n/messages";
import styles from "./category-page.module.css";

interface CategoryPageProps {
  title: MessageKey;
}

export const CategoryPage = ({ title }: CategoryPageProps) => {
  return (
    <div className={styles.page}>
      <DocumentTitle k={title} />
      <header className={styles.header}>
        <Link href="/" className={styles.back}>
          ← <T k="nav.back" />
        </Link>
      </header>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <T k={title} />
        </h1>
      </main>
    </div>
  );
};

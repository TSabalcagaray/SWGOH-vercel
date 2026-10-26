import Link from "next/link";
import { DocumentTitle, T } from "@/i18n/locale-provider";
import type { MessageKey } from "@/i18n/messages";

interface CategoryPageProps {
  title: MessageKey;
}

export const CategoryPage = ({ title }: CategoryPageProps) => {
  return (
    <div className="min-h-svh bg-white text-neutral-900">
      <DocumentTitle k={title} />
      <header className="mx-auto max-w-[1200px] px-4 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-black/12 px-4 py-2 text-[0.95rem] transition-colors hover:border-transparent hover:bg-neutral-100"
        >
          ← <T k="nav.back" />
        </Link>
      </header>
      <main className="mx-auto max-w-[1200px] px-4 pb-12">
        <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold">
          <T k={title} />
        </h1>
      </main>
    </div>
  );
};

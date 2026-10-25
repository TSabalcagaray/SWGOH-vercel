import type { Metadata } from "next";
import { CategoryPage } from "@/components/category-page/category-page";

export const metadata: Metadata = {
  title: "Vaisseaux · SWGOH Teams",
};

export default function VaisseauxPage() {
  return <CategoryPage title="Vaisseaux" />;
}

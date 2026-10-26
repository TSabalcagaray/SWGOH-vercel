import type { Metadata } from "next";
import { CategoryPage } from "@/components/category-page/category-page";

export const metadata: Metadata = {
  title: "Personnages · SWGOH Teams",
};

export default function PersonnagesPage() {
  return <CategoryPage title="home.characters" />;
}

import type { Metadata } from "next";
import { AuctionBrowser } from "./browser";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "المزادات",
  description: "تصفح جميع المزادات المفتوحة: عقارات، سيارات، نمر وأرقام مميزة، مجوهرات ومقتنيات.",
};

export default async function AuctionsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; section?: string; sort?: string }>;
}) {
  const sp = await searchParams;
  return (
    <>
      <PageHero
        eyebrow="المزادات المفتوحة"
        title={<>كل المزادات <span className="gold-text">في مكان واحد</span></>}
        description="ابحث وصفِّ حسب القسم والسعر والحالة، وتابع العدّاد التنازلي لكل مزاد."
      />
      <AuctionBrowser initialQuery={sp.q ?? ""} initialSection={sp.section ?? ""} initialSort={sp.sort ?? "featured"} />
    </>
  );
}

import type { Metadata } from "next";
import { AuctionBrowser } from "./browser";

export const metadata: Metadata = { title: "المزادات" };

export default async function AuctionsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tab?: string }>;
}) {
  const sp = await searchParams;
  return <AuctionBrowser initialQuery={sp.q ?? ""} initialTab={sp.tab ?? ""} />;
}

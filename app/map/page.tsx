import type { Metadata } from "next";
import { MapScreen } from "@/components/map-screen";

export const metadata: Metadata = { title: "الخريطة" };

export default async function Page({ searchParams }: { searchParams: Promise<{ area?: string }> }) {
  const sp = await searchParams;
  return <MapScreen initialArea={sp.area ?? ""} />;
}

import type { Metadata } from "next";
import { LiveRoom } from "@/components/live-room";

export const metadata: Metadata = { title: "المزايدة المباشرة" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <LiveRoom id={id} />;
}

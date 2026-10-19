import type { Metadata } from "next";
import { getProperty } from "@/lib/ema";
import { AuctionDetail } from "@/components/auction-detail";

export function generateStaticParams() {
  return ["A1021", "A1044", "A1067", "A1090", "D2003", "D2018", "D2027", "A1102", "A1098"].map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const property = getProperty((await params).id);
  return { title: property?.title.ar || "Auction" };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AuctionDetail id={id} />;
}

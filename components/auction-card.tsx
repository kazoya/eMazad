import Link from "next/link";
import { Gavel, MapPin, Sparkles, Timer } from "lucide-react";
import type { Auction } from "@/lib/data";
import { conditionAr, getSection, priceOf } from "@/lib/data";
import { jod, num } from "@/lib/utils";
import { Countdown } from "./countdown";
import { LotVisual } from "./lot-visual";

export function AuctionCard({ auction, priority }: { auction: Auction; priority?: boolean }) {
  const section = getSection(auction.section);
  return (
    <Link
      href={`/auctions/${auction.id}`}
      className="card-lift group flex flex-col overflow-hidden rounded-3xl border border-line bg-ink-2"
    >
      <div className="relative">
        <LotVisual auction={auction} priority={priority} className="aspect-[4/3]" />
        <div className="absolute inset-x-3 top-3 flex items-center justify-between">
          <span className="glass rounded-full px-3 py-1 text-[11px] text-white">{section.name}</span>
          {auction.featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-[11px] font-semibold text-ink">
              <Sparkles className="size-3" /> مميّز
            </span>
          )}
        </div>
        <div className="glass absolute bottom-3 start-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1">
          <Timer className="size-3.5 text-gold-2" />
          <Countdown endInDays={auction.endInDays} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="line-clamp-1 text-base font-semibold text-white">{auction.title}</h3>
          <p className="mt-1 line-clamp-1 text-sm text-mist">{auction.subtitle}</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-mist">
          <span className="inline-flex items-center gap-1"><MapPin className="size-3.5" />{auction.location}</span>
          <span className="rounded-full border border-line px-2 py-0.5">{conditionAr[auction.condition]}</span>
        </div>
        <div className="mt-auto flex items-end justify-between border-t border-line pt-4">
          <div>
            <div className="text-[11px] text-mist">{auction.currentBid ? "أعلى مزايدة" : "السعر الابتدائي"}</div>
            <div className="tabular text-lg font-bold text-gold-2">{jod(priceOf(auction))}</div>
          </div>
          <div className="inline-flex items-center gap-1 text-xs text-mist">
            <Gavel className="size-3.5" /> {num(auction.bids)} مزايدة
          </div>
        </div>
      </div>
    </Link>
  );
}

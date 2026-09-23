"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Auction } from "@/lib/data";
import { LotVisual } from "@/components/lot-visual";
import { cn } from "@/lib/utils";

export function Gallery({ auction }: { auction: Auction }) {
  const [i, setI] = useState(0);
  const v = auction.visual;

  if (v.kind !== "images") {
    return <LotVisual auction={auction} size="lg" priority className="aspect-[16/10] rounded-[2rem] border border-line" />;
  }

  const imgs = v.images;
  const go = (d: number) => setI((x) => (x + d + imgs.length) % imgs.length);

  return (
    <div className="space-y-3">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-line bg-ink-3">
        {imgs.map((src, idx) => (
          <Image
            key={src}
            src={src}
            alt={`${auction.title} — صورة ${idx + 1}`}
            fill
            priority={idx === 0}
            sizes="(min-width: 1024px) 60vw, 100vw"
            className={cn("object-cover transition-opacity duration-500", idx === i ? "opacity-100" : "opacity-0")}
          />
        ))}
        <button onClick={() => go(-1)} aria-label="الصورة السابقة" className="glass absolute right-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full text-white">
          <ChevronRight className="size-5" />
        </button>
        <button onClick={() => go(1)} aria-label="الصورة التالية" className="glass absolute left-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full text-white">
          <ChevronLeft className="size-5" />
        </button>
        <span className="glass tabular absolute bottom-4 left-4 rounded-full px-3 py-1 text-xs text-white" dir="ltr">
          {i + 1} / {imgs.length}
        </span>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {imgs.map((src, idx) => (
          <button
            key={src}
            onClick={() => setI(idx)}
            aria-label={`عرض الصورة ${idx + 1}`}
            className={cn(
              "relative aspect-[4/3] overflow-hidden rounded-xl border-2 transition",
              idx === i ? "border-gold" : "border-transparent opacity-60 hover:opacity-100"
            )}
          >
            <Image src={src} alt="" fill sizes="12vw" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

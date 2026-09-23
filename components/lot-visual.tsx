import Image from "next/image";
import type { Auction } from "@/lib/data";
import { getSection } from "@/lib/data";
import { Icon } from "./icon";
import { cn } from "@/lib/utils";

export function Plate({ code, number, size = "md" }: { code: string; number: string; size?: "md" | "lg" }) {
  return (
    <div
      dir="ltr"
      className={cn(
        "flex items-stretch overflow-hidden rounded-lg border-2 border-slate-900 bg-white text-slate-900 shadow-2xl",
        size === "lg" ? "h-28 text-6xl" : "h-16 text-3xl"
      )}
    >
      <div className={cn("flex flex-col items-center justify-center bg-[#b11e2b] px-2 text-white", size === "lg" ? "w-16" : "w-10")}>
        <span className={cn("font-bold", size === "lg" ? "text-sm" : "text-[9px]")}>JOR</span>
        <span className={cn(size === "lg" ? "text-xs" : "text-[8px]")}>الأردن</span>
      </div>
      <div className="flex items-center gap-3 px-4 font-mono font-bold tracking-wider">
        <span>{code}</span>
        <span className="text-slate-400">-</span>
        <span>{number}</span>
      </div>
    </div>
  );
}

export function Phone({ number, operator, size = "md" }: { number: string; operator: string; size?: "md" | "lg" }) {
  return (
    <div className="text-center">
      <div className={cn("font-mono font-bold tracking-wider text-white", size === "lg" ? "text-5xl" : "text-2xl")} dir="ltr">
        {number}
      </div>
      <div className="mt-2 inline-block rounded-full border border-violet-300/30 bg-violet-400/10 px-3 py-0.5 text-xs text-violet-200">
        {operator}
      </div>
    </div>
  );
}

export function LotVisual({
  auction,
  size = "md",
  priority,
  className,
}: {
  auction: Auction;
  size?: "md" | "lg";
  priority?: boolean;
  className?: string;
}) {
  const v = auction.visual;
  const section = getSection(auction.section);

  if (v.kind === "images") {
    return (
      <div className={cn("relative overflow-hidden bg-ink-3", className)}>
        <Image
          src={v.images[0]}
          alt={auction.title}
          fill
          priority={priority}
          sizes={size === "lg" ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div className={cn("relative grid place-items-center overflow-hidden bg-gradient-to-br bg-ink-3", section.tone, className)}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:18px_18px]" />
      {v.kind === "plate" && <Plate code={v.code} number={v.number} size={size} />}
      {v.kind === "phone" && <Phone number={v.number} operator={v.operator} size={size} />}
      {v.kind === "icon" && (
        <div className="grid place-items-center gap-3">
          <div className={cn("grid place-items-center rounded-3xl border border-white/15 bg-white/5", size === "lg" ? "size-36" : "size-20")}>
            <Icon name={v.icon} className={cn("text-gold-2", size === "lg" ? "size-16" : "size-9")} />
          </div>
          <span className="text-xs text-mist">صور المعاينة تُرفع عند النشر الرسمي</span>
        </div>
      )}
    </div>
  );
}

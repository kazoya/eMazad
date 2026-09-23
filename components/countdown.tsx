"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const DAY = 86_400_000;

// المزادات التجريبية تُغلق دائماً بعد عدد أيام ثابت من اليوم، الساعة 8 مساءً
export function endsAt(endInDays: number, now: number) {
  const d = new Date(now);
  d.setHours(20, 0, 0, 0);
  return d.getTime() + endInDays * DAY;
}

export function useNow(interval = 1000) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), interval);
    return () => clearInterval(t);
  }, [interval]);
  return now;
}

function split(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

const pad = (n: number) => n.toString().padStart(2, "0");

export function Countdown({ endInDays, variant = "compact" }: { endInDays: number; variant?: "compact" | "large" }) {
  const now = useNow();
  const t = now === null ? null : split(endsAt(endInDays, now) - now);
  const urgent = t !== null && t.d < 1;

  if (variant === "compact") {
    return (
      <span className={cn("tabular inline-flex items-center gap-1 font-mono text-xs", urgent ? "text-rose-300" : "text-white")} dir="ltr">
        {t === null ? "--:--:--" : `${t.d > 0 ? `${t.d}d ` : ""}${pad(t.h)}:${pad(t.m)}:${pad(t.s)}`}
      </span>
    );
  }

  const units: [string, number | null][] = [
    ["يوم", t?.d ?? null],
    ["ساعة", t?.h ?? null],
    ["دقيقة", t?.m ?? null],
    ["ثانية", t?.s ?? null],
  ];

  return (
    <div className="grid grid-cols-4 gap-2" aria-live="off">
      {units.map(([label, v]) => (
        <div key={label} className="rounded-xl border border-line bg-ink/60 px-2 py-3 text-center">
          <div className={cn("tabular font-mono text-2xl font-semibold", urgent ? "text-rose-300" : "text-gold-2")}>
            {v === null ? "--" : pad(v)}
          </div>
          <div className="mt-1 text-[11px] text-mist">{label}</div>
        </div>
      ))}
    </div>
  );
}

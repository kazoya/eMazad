"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { AuctionCard } from "@/components/auction-card";
import { Container, DemoNote } from "@/components/ui";
import { Icon } from "@/components/icon";
import { auctions, conditionAr, priceOf, sections, type Condition } from "@/lib/data";
import { cn, num } from "@/lib/utils";

const sorts = [
  { id: "featured", label: "المميزة أولاً" },
  { id: "ending", label: "الأقرب انتهاءً" },
  { id: "price-asc", label: "السعر: الأقل" },
  { id: "price-desc", label: "السعر: الأعلى" },
  { id: "bids", label: "الأكثر مزايدة" },
];

const priceBands = [
  { id: "", label: "كل الأسعار", min: 0, max: Infinity },
  { id: "5k", label: "حتى 5,000", min: 0, max: 5000 },
  { id: "50k", label: "5,000 – 50,000", min: 5000, max: 50000 },
  { id: "200k", label: "50,000 – 200,000", min: 50000, max: 200000 },
  { id: "max", label: "أكثر من 200,000", min: 200000, max: Infinity },
];

export function AuctionBrowser({
  initialQuery,
  initialSection,
  initialSort,
}: {
  initialQuery: string;
  initialSection: string;
  initialSort: string;
}) {
  const [q, setQ] = useState(initialQuery);
  const [section, setSection] = useState(initialSection);
  const [sort, setSort] = useState(sorts.some((s) => s.id === initialSort) ? initialSort : "featured");
  const [band, setBand] = useState("");
  const [condition, setCondition] = useState<Condition | "">("");
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    const b = priceBands.find((p) => p.id === band)!;
    const list = auctions.filter((a) => {
      if (section && a.section !== section) return false;
      if (condition && a.condition !== condition) return false;
      const p = priceOf(a);
      if (p < b.min || p >= b.max) return false;
      if (term) {
        const corpus = [a.title, a.subtitle, a.description, a.location, a.subcategory, ...Object.values(a.specs)]
          .join(" ")
          .toLowerCase();
        if (!corpus.includes(term)) return false;
      }
      return true;
    });
    return list.sort((x, y) => {
      switch (sort) {
        case "ending": return x.endInDays - y.endInDays;
        case "price-asc": return priceOf(x) - priceOf(y);
        case "price-desc": return priceOf(y) - priceOf(x);
        case "bids": return y.bids - x.bids;
        default: return Number(!!y.featured) - Number(!!x.featured);
      }
    });
  }, [q, section, sort, band, condition]);

  const active = !!(q || section || band || condition);
  const reset = () => { setQ(""); setSection(""); setBand(""); setCondition(""); };

  return (
    <Container>
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
        <button
          onClick={() => setSection("")}
          className={cn("shrink-0 rounded-full border px-4 py-2 text-sm", !section ? "border-gold bg-gold text-ink" : "border-line text-mist hover:text-white")}
        >
          الكل · {num(auctions.length)}
        </button>
        {sections.map((s) => {
          const n = auctions.filter((a) => a.section === s.id).length;
          return (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm",
                section === s.id ? "border-gold bg-gold text-ink" : "border-line text-mist hover:text-white"
              )}
            >
              <Icon name={s.icon} className="size-4" /> {s.name} · {num(n)}
            </button>
          );
        })}
      </div>

      <div className="glass mb-8 flex flex-col gap-3 rounded-3xl p-3 md:flex-row md:items-center">
        <label className="flex flex-1 items-center gap-2 rounded-2xl bg-ink/60 px-4">
          <Search className="size-4 text-mist" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ابحث بالاسم، المنطقة، الموديل…"
            className="w-full bg-transparent py-3 text-sm text-white placeholder:text-mist/70 focus:outline-none"
          />
        </label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-2xl border border-line bg-ink px-4 py-3 text-sm text-white"
          aria-label="الترتيب"
        >
          {sorts.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
        <button
          onClick={() => setShowFilters((v) => !v)}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-line px-4 py-3 text-sm text-white hover:border-gold/50"
        >
          <SlidersHorizontal className="size-4" /> فلاتر
        </button>
      </div>

      {showFilters && (
        <div className="mb-8 grid gap-6 rounded-3xl border border-line bg-ink-2/70 p-6 md:grid-cols-2">
          <div>
            <div className="mb-3 text-sm text-white">نطاق السعر (د.أ)</div>
            <div className="flex flex-wrap gap-2">
              {priceBands.map((p) => (
                <button key={p.id} onClick={() => setBand(p.id)}
                  className={cn("rounded-full border px-3 py-1.5 text-xs", band === p.id ? "border-gold text-gold-2" : "border-line text-mist")}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-3 text-sm text-white">الحالة</div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setCondition("")}
                className={cn("rounded-full border px-3 py-1.5 text-xs", !condition ? "border-gold text-gold-2" : "border-line text-mist")}>
                الكل
              </button>
              {(Object.keys(conditionAr) as Condition[]).map((c) => (
                <button key={c} onClick={() => setCondition(c)}
                  className={cn("rounded-full border px-3 py-1.5 text-xs", condition === c ? "border-gold text-gold-2" : "border-line text-mist")}>
                  {conditionAr[c]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mb-5 flex items-center justify-between text-sm text-mist">
        <span>{num(results.length)} نتيجة</span>
        {active && (
          <button onClick={reset} className="inline-flex items-center gap-1 text-gold-2 hover:underline">
            <X className="size-4" /> مسح الفلاتر
          </button>
        )}
      </div>

      {results.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((a, i) => <AuctionCard key={a.id} auction={a} priority={i < 4} />)}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-line py-20 text-center text-mist">
          لا توجد مزادات نشطة تطابق بحثك حالياً.
        </div>
      )}

      <DemoNote className="mt-10" />
    </Container>
  );
}

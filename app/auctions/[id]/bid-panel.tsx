"use client";

import { useEffect, useState } from "react";
import { Gavel, MessageCircle, Minus, Plus, ShieldCheck } from "lucide-react";
import { Countdown } from "@/components/countdown";
import type { Auction } from "@/lib/data";
import { MIN_INCREMENT, priceOf } from "@/lib/data";
import { waLink } from "@/lib/config";
import { jod, num } from "@/lib/utils";

type Local = { amount: number; bids: number };

export function BidPanel({ auction }: { auction: Auction }) {
  const key = `emazad-bid-${auction.id}`;
  const [local, setLocal] = useState<Local | null>(null);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setLocal(JSON.parse(raw));
    } catch {}
  }, [key]);

  const current = Math.max(priceOf(auction), local?.amount ?? 0);
  const hasBid = !!auction.currentBid || !!local;
  const minNext = hasBid ? current + MIN_INCREMENT : auction.startingBid;
  const [amount, setAmount] = useState(minNext);
  useEffect(() => setAmount(minNext), [minNext]);

  const bids = auction.bids + (local?.bids ?? 0);

  const place = () => {
    if (!Number.isFinite(amount) || amount < minNext) {
      setMessage({ ok: false, text: hasBid ? `أقل مزايدة مسموحة ${jod(minNext)} (زيادة ${MIN_INCREMENT} د.أ على الأقل)` : `المزايدة يجب ألا تقل عن السعر الابتدائي ${jod(minNext)}` });
      return;
    }
    const next = { amount, bids: (local?.bids ?? 0) + 1 };
    setLocal(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
    setMessage({ ok: true, text: `تم تسجيل مزايدتك ${jod(amount)} — أنت الأعلى حالياً (تجريبي).` });
  };

  return (
    <div className="overflow-hidden rounded-[2rem] border border-line bg-ink-2 shadow-2xl">
      <div className="border-b border-line bg-gradient-to-br from-gold/15 to-transparent p-6">
        <div className="mb-4 flex items-center justify-between text-sm">
          <span className="inline-flex items-center gap-1.5 text-emerald-300">
            <span className="live-dot size-1.5 rounded-full bg-emerald-400" /> مزاد مباشر
          </span>
          <span className="text-mist">{num(bids)} مزايدة</span>
        </div>
        <div className="text-xs text-mist">{hasBid ? "أعلى مزايدة حالية" : "السعر الابتدائي"}</div>
        <div className="tabular mt-1 text-4xl font-bold text-gold-2">{jod(current)}</div>
        {local && <div className="mt-2 text-xs text-emerald-300">مزايدتك هي الأعلى</div>}
      </div>

      <div className="space-y-5 p-6">
        <div>
          <div className="mb-2 text-xs text-mist">ينتهي المزاد خلال</div>
          <Countdown endInDays={auction.endInDays} variant="large" />
        </div>

        <div>
          <label htmlFor="bid" className="mb-2 block text-xs text-mist">
            مبلغ مزايدتك (الحد الأدنى {jod(minNext)})
          </label>
          <div className="flex items-center gap-2">
            <button onClick={() => setAmount((x) => Math.max(minNext, x - MIN_INCREMENT))} aria-label="إنقاص" className="grid size-12 shrink-0 place-items-center rounded-2xl border border-line text-white hover:border-gold/50">
              <Minus className="size-4" />
            </button>
            <input
              id="bid"
              type="number"
              inputMode="numeric"
              value={amount}
              step={MIN_INCREMENT}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="tabular h-12 w-full rounded-2xl border border-line bg-ink px-4 text-center text-lg font-semibold text-white focus:border-gold focus:outline-none"
            />
            <button onClick={() => setAmount((x) => x + MIN_INCREMENT)} aria-label="زيادة" className="grid size-12 shrink-0 place-items-center rounded-2xl border border-line text-white hover:border-gold/50">
              <Plus className="size-4" />
            </button>
          </div>
          <div className="mt-2 flex gap-2">
            {[MIN_INCREMENT, 250, 500, 1000].map((inc) => (
              <button key={inc} onClick={() => setAmount(Math.max(minNext, current + inc))} className="tabular flex-1 rounded-xl border border-line py-1.5 text-xs text-mist hover:text-white">
                +{num(inc)}
              </button>
            ))}
          </div>
        </div>

        <button onClick={place} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gold py-4 font-semibold text-ink transition hover:bg-gold-2">
          <Gavel className="size-5" /> زايد الآن
        </button>

        {message && (
          <p role="status" className={`rounded-2xl px-4 py-3 text-sm ${message.ok ? "bg-emerald-400/10 text-emerald-200" : "bg-rose-400/10 text-rose-200"}`}>
            {message.text}
          </p>
        )}

        <a
          href={waLink(`مرحباً، أريد الاستفسار عن مزاد: ${auction.title} (رقم ${auction.id})`)}
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-line py-3 text-sm text-white hover:border-gold/50"
        >
          <MessageCircle className="size-4 text-emerald-300" /> استفسر عبر واتساب
        </a>

        <p className="flex items-start gap-2 text-xs leading-6 text-mist">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-gold" />
          الزيادة الدنيا {MIN_INCREMENT} د.أ. المزايدة هنا تجريبية وتُحفظ على جهازك فقط؛ المزايدة الملزمة تتم بعد التحقق من الحساب.
        </p>
      </div>
    </div>
  );
}

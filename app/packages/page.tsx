import type { Metadata } from "next";
import { Check, Crown, MessageCircle } from "lucide-react";
import { Container, DemoNote, PageHero } from "@/components/ui";
import { packages } from "@/lib/data";
import { waLink } from "@/lib/config";
import { cn, num } from "@/lib/utils";

export const metadata: Metadata = {
  title: "باقات المزايدة",
  description: "باقات رصيد المزايدة في إي مزاد: الأساسية والمميزة وباقة كبار المزايدين.",
};

export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="باقات المزايدة"
        title={<>اختر الباقة التي <span className="gold-text">تناسب طموحك</span></>}
        description="رصيد المزايدة يمنحك حق المشاركة في المزادات. ابدأ بالأساسية، أو انتقل للمميزة للحصول على إشعارات أولوية ودعم هاتفي."
      />
      <Container>
        <div className="grid gap-5 md:grid-cols-3">
          {packages.map((p) => (
            <div
              key={p.id}
              className={cn(
                "relative flex flex-col rounded-[2rem] border p-8",
                p.popular ? "border-gold/60 bg-gradient-to-b from-gold/15 to-ink-2 shadow-[0_30px_80px_-30px_rgb(212_169_74/0.5)]" : "border-line bg-ink-2/70"
              )}
            >
              {p.popular && (
                <span className="absolute -top-3 start-8 inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-ink">
                  <Crown className="size-3.5" /> الأكثر طلباً
                </span>
              )}
              <h2 className="font-display text-2xl text-white">{p.name}</h2>
              <p className="mt-2 text-sm text-mist">{p.description}</p>
              <div className="my-8 flex items-baseline gap-2">
                <span className="tabular font-display text-5xl text-white">{num(p.price)}</span>
                <span className="text-mist">د.أ</span>
              </div>
              <div className="mb-6 rounded-2xl border border-line bg-ink/50 px-4 py-3 text-sm">
                <span className="tabular font-bold text-gold-2">{num(p.credits)}</span> <span className="text-mist">رصيد مزايدة</span>
              </div>
              <ul className="mb-8 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-white/85">
                    <Check className="size-4 text-gold" /> {f}
                  </li>
                ))}
              </ul>
              <a
                href={waLink(`مرحباً، أرغب بالاشتراك في ${p.name} (${p.price} د.أ)`)}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "mt-auto flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-semibold",
                  p.popular ? "bg-gold text-ink hover:bg-gold-2" : "border border-line text-white hover:border-gold/50"
                )}
              >
                <MessageCircle className="size-4" /> اطلب الباقة
              </a>
            </div>
          ))}
        </div>
        <DemoNote className="mt-10" />
      </Container>
    </>
  );
}

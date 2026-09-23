import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Brain, ChevronLeft, MapPin } from "lucide-react";
import { AuctionCard } from "@/components/auction-card";
import { Container, DemoNote } from "@/components/ui";
import { auctions, conditionAr, getAuction, getSection } from "@/lib/data";
import { jod, num } from "@/lib/utils";
import { Gallery } from "./gallery";
import { BidPanel } from "./bid-panel";

export function generateStaticParams() {
  return auctions.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const a = getAuction((await params).id);
  if (!a) return {};
  return { title: a.title, description: a.description };
}

export default async function AuctionPage({ params }: { params: Promise<{ id: string }> }) {
  const a = getAuction((await params).id);
  if (!a) notFound();
  const section = getSection(a.section);
  const related = auctions.filter((x) => x.section === a.section && x.id !== a.id).slice(0, 4);
  const [lo, hi] = a.appraisal;

  const facts: [string, string][] = [
    ["القسم", section.name],
    ...(a.subcategory ? [["الفئة", a.subcategory] as [string, string]] : []),
    ["الحالة", conditionAr[a.condition]],
    ...(a.year ? [["السنة", String(a.year)] as [string, string]] : []),
    ...(a.mileage ? [[a.mileageLabel ?? "المسافة المقطوعة", `${num(a.mileage)} ${a.mileageLabel ? "" : "كم"}`.trim()] as [string, string]] : []),
    ["الموقع", a.location],
    ...(a.seller ? [["البائع", a.seller] as [string, string]] : []),
  ];

  return (
    <Container className="pt-8">
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-mist" aria-label="مسار التنقل">
        <Link href="/" className="hover:text-white">الرئيسية</Link>
        <ChevronLeft className="size-4" />
        <Link href="/auctions" className="hover:text-white">المزادات</Link>
        <ChevronLeft className="size-4" />
        <Link href={`/auctions?section=${a.section}`} className="hover:text-white">{section.name}</Link>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr]">
        <div className="space-y-8">
          <Gallery auction={a} />

          <div className="space-y-4">
            <h1 className="font-display text-3xl leading-tight text-white md:text-4xl">{a.title}</h1>
            <p className="inline-flex items-center gap-1.5 text-mist"><MapPin className="size-4" /> {a.location}</p>
            <p className="text-lg leading-9 text-white/85">{a.description}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-line bg-ink-2/70 p-6">
              <h2 className="mb-4 font-semibold text-white">معلومات المزاد</h2>
              <dl className="divide-y divide-line text-sm">
                {facts.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-2.5">
                    <dt className="text-mist">{k}</dt>
                    <dd className="text-white">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-3xl border border-line bg-ink-2/70 p-6">
              <h2 className="mb-4 font-semibold text-white">المواصفات</h2>
              <dl className="divide-y divide-line text-sm">
                {Object.entries(a.specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-2.5">
                    <dt className="text-mist">{k}</dt>
                    <dd className="text-white">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="rounded-3xl border border-gold/25 bg-gradient-to-br from-gold/10 to-transparent p-6">
            <div className="mb-4 flex items-center gap-2">
              <Brain className="size-5 text-gold-2" />
              <h2 className="font-semibold text-white">تقييم الذكاء الاصطناعي</h2>
            </div>
            <div className="relative h-3 rounded-full bg-white/10">
              <div className="absolute inset-y-0 right-[15%] left-[15%] rounded-full bg-gradient-to-l from-gold-3 via-gold to-gold-2" />
            </div>
            <div className="tabular mt-3 flex justify-between text-sm">
              <span className="text-mist">من <b className="text-white">{jod(lo)}</b></span>
              <span className="text-mist">إلى <b className="text-white">{jod(hi)}</b></span>
            </div>
            <p className="mt-4 text-xs leading-6 text-mist">
              نطاق استرشادي مبني على بيانات السوق وحالة الأصل، وليس تثميناً قانونياً. القرار النهائي للسعر يبقى بشرياً.
            </p>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <BidPanel auction={a} />
        </aside>
      </div>

      {related.length > 0 && (
        <section className="pt-20">
          <h2 className="mb-8 font-display text-2xl text-white">مزادات مشابهة في {section.name}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => <AuctionCard key={r.id} auction={r} />)}
          </div>
        </section>
      )}

      <DemoNote className="mt-12" />
    </Container>
  );
}

import Link from "next/link";
import {
  ArrowLeft, BadgeCheck, Bell, Brain, Gavel, Languages, Search, ShieldCheck, Sparkles, Timer, TrendingUp,
} from "lucide-react";
import { AuctionCard } from "@/components/auction-card";
import { Countdown } from "@/components/countdown";
import { Icon } from "@/components/icon";
import { LotVisual } from "@/components/lot-visual";
import { Container, Eyebrow, SectionTitle } from "@/components/ui";
import { auctions, countBySection, getSection, priceOf, sections } from "@/lib/data";
import { jod, num } from "@/lib/utils";

export default function HomePage() {
  const spotlight = auctions.find((a) => a.id === "1")!;
  const featured = auctions.filter((a) => a.featured);
  const endingSoon = [...auctions].sort((a, b) => a.endInDays - b.endInDays).slice(0, 4);
  const counts = countBySection();
  const totalValue = auctions.reduce((s, a) => s + priceOf(a), 0);
  const totalBids = auctions.reduce((s, a) => s + a.bids, 0);

  return (
    <>
      {/* Hero */}
      <Container className="grid items-center gap-12 pb-16 pt-10 md:pt-16 lg:grid-cols-[1.1fr_1fr]">
        <div className="rise space-y-7">
          <Eyebrow>
            <span className="live-dot inline-block size-1.5 rounded-full bg-emerald-400" /> {num(auctions.length)} مزاداً مفتوحاً الآن
          </Eyebrow>
          <h1 className="font-display text-[2.6rem] leading-[1.2] text-white md:text-6xl">
            السوق لا يحتاج إعلاناً آخر،
            <br />
            <span className="gold-text">يحتاج ثقةً في السعر.</span>
          </h1>
          <p className="max-w-xl text-lg leading-8 text-mist">
            منصة مزادات إلكترونية حديثة تربط المشترين والبائعين في بيئة آمنة: عقارات، سيارات، نمر وأرقام مميزة،
            مجوهرات ومقتنيات — مع تقييم مدعوم بالذكاء الاصطناعي ومزايدة شفافة لحظة بلحظة.
          </p>
          <form action="/auctions" className="glass flex items-center gap-2 rounded-full p-1.5 ps-5">
            <Search className="size-5 shrink-0 text-mist" />
            <input
              name="q"
              placeholder="ابحث: شقة عبدون، نمرة 7777، كامري…"
              className="min-w-0 flex-1 bg-transparent py-2 text-sm text-white placeholder:text-mist/70 focus:outline-none"
            />
            <button className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-gold-2">
              ابحث
            </button>
          </form>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/auctions" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-white hover:border-gold/50">
              <Gavel className="size-4 text-gold-2" /> تصفّح المزادات
            </Link>
            <Link href="/appraise" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-white hover:border-gold/50">
              <Sparkles className="size-4 text-gold-2" /> قيّم أصلك مجاناً
            </Link>
          </div>
        </div>

        <Link href={`/auctions/${spotlight.id}`} className="rise group relative block [animation-delay:150ms]">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-gold/25 via-transparent to-blue-500/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink-2 shadow-2xl">
            <LotVisual auction={spotlight} size="lg" priority className="aspect-[16/11]" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/85 to-transparent p-6 pt-24">
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <div className="mb-1 inline-flex items-center gap-1.5 text-xs text-emerald-300">
                    <span className="live-dot size-1.5 rounded-full bg-emerald-400" /> مزاد مباشر · {getSection(spotlight.section).name}
                  </div>
                  <div className="text-xl font-semibold text-white">{spotlight.title}</div>
                </div>
                <div className="text-left">
                  <div className="text-[11px] text-mist">أعلى مزايدة</div>
                  <div className="tabular text-2xl font-bold text-gold-2">{jod(priceOf(spotlight))}</div>
                </div>
              </div>
              <Countdown endInDays={spotlight.endInDays} variant="large" />
            </div>
          </div>
        </Link>
      </Container>

      {/* Stats */}
      <Container>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4">
          {[
            { label: "مزاد نشط", value: num(auctions.length), icon: Gavel },
            { label: "إجمالي المزايدات", value: num(totalBids), icon: TrendingUp },
            { label: "القيمة الحالية للمزادات", value: jod(totalValue), icon: BadgeCheck },
            { label: "قسماً متخصصاً", value: num(sections.length), icon: Sparkles },
          ].map((s) => (
            <div key={s.label} className="bg-ink-2 p-6">
              <s.icon className="mb-3 size-5 text-gold" />
              <div className="tabular text-2xl font-bold text-white md:text-3xl">{s.value}</div>
              <div className="mt-1 text-sm text-mist">{s.label}</div>
            </div>
          ))}
        </div>
      </Container>

      {/* Ticker */}
      <div className="mt-14 overflow-hidden border-y border-line bg-ink-2/50 py-4" aria-hidden>
        <div className="marquee flex w-max gap-10 whitespace-nowrap">
          {[...auctions, ...auctions].map((a, i) => (
            <span key={i} className="inline-flex items-center gap-3 text-sm text-mist">
              <span className="size-1.5 rounded-full bg-gold" />
              <span className="text-white">{a.title}</span>
              <span className="tabular text-gold-2">{jod(priceOf(a))}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Sections */}
      <Container className="pt-24">
        <SectionTitle
          eyebrow="أقسام المزادات"
          title="تصفّح المزادات حسب القسم"
          description="عشرة أقسام متخصصة، لكل منها قواعد تحقق خاصة بطبيعة الأصل: ملكية العقار، قابلية نقل النمرة، أصالة الساعة."
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {sections.map((s) => (
            <Link
              key={s.id}
              href={`/auctions?section=${s.id}`}
              className={`card-lift group relative overflow-hidden rounded-2xl border border-line bg-gradient-to-br ${s.tone} p-5`}
            >
              <div className="mb-8 flex items-start justify-between">
                <span className="grid size-11 place-items-center rounded-xl border border-white/10 bg-ink/50">
                  <Icon name={s.icon} className="size-5 text-gold-2" />
                </span>
                <span className="tabular font-mono text-sm text-mist">{num(counts.get(s.id) ?? 0)}</span>
              </div>
              <div className="font-semibold text-white">{s.name}</div>
              <div className="mt-1 line-clamp-2 text-xs leading-5 text-mist">{s.description}</div>
            </Link>
          ))}
        </div>
      </Container>

      {/* Featured */}
      <Container className="pt-24">
        <SectionTitle
          eyebrow="مزادات مميزة"
          title={<>أصول مختارة <span className="gold-text">بعناية</span></>}
          action={{ href: "/auctions", label: "كل المزادات" }}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.slice(0, 4).map((a, i) => (
            <AuctionCard key={a.id} auction={a} priority={i < 2} />
          ))}
        </div>
      </Container>

      {/* AI appraisal */}
      <Container className="pt-24">
        <div className="relative overflow-hidden rounded-[2rem] border border-gold/20 bg-gradient-to-br from-ink-3 via-ink-2 to-ink p-8 md:p-12">
          <div className="absolute -left-20 -top-20 size-80 rounded-full bg-gold/10 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-5">
              <Eyebrow>تقييم مدعوم بالذكاء الاصطناعي</Eyebrow>
              <h2 className="font-display text-3xl leading-tight text-white md:text-4xl">
                اعرف القيمة العادلة <span className="gold-text">قبل</span> أن تبدأ المزايدة
              </h2>
              <p className="leading-8 text-mist">
                أدخل بيانات سيارتك أو عقارك أو نمرتك، واحصل على نطاق تقييم مبني على بيانات السوق مع اقتراح
                لسعر ابتدائي يعظّم فرص البيع. الاقتراح يظهر فوراً — والنشر لا يتم إلا باعتماد بشري.
              </p>
              <Link href="/appraise" className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink hover:bg-gold-2">
                جرّب التقييم الآن <ArrowLeft className="size-4" />
              </Link>
            </div>
            <div className="glass rounded-3xl p-6">
              <div className="mb-5 flex items-center justify-between text-sm">
                <span className="text-white">تويوتا كامري 2022 · 15,000 كم</span>
                <span className="rounded-full bg-emerald-400/10 px-2.5 py-0.5 text-xs text-emerald-300">ثقة عالية</span>
              </div>
              <div className="relative h-3 rounded-full bg-white/10">
                <div className="absolute inset-y-0 right-[18%] left-[22%] rounded-full bg-gradient-to-l from-gold-3 via-gold to-gold-2" />
                <div className="absolute -top-1.5 right-[52%] size-6 rounded-full border-4 border-ink bg-white shadow" />
              </div>
              <div className="tabular mt-4 flex justify-between text-sm">
                <span className="text-mist">الحد الأدنى <b className="text-white">19,000</b></span>
                <span className="text-mist">الحد الأعلى <b className="text-white">22,000</b></span>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-line p-4">
                  <div className="text-xs text-mist">السعر الابتدائي المقترح</div>
                  <div className="tabular mt-1 text-lg font-bold text-gold-2">20,000 د.أ</div>
                </div>
                <div className="rounded-2xl border border-line p-4">
                  <div className="text-xs text-mist">أعلى مزايدة حالياً</div>
                  <div className="tabular mt-1 text-lg font-bold text-white">21,500 د.أ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Ending soon */}
      <Container className="pt-24">
        <SectionTitle
          eyebrow="ينتهي قريباً"
          title="آخر فرصة للمزايدة"
          action={{ href: "/auctions?sort=ending", label: "الأقرب انتهاءً" }}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {endingSoon.map((a) => (
            <AuctionCard key={a.id} auction={a} />
          ))}
        </div>
      </Container>

      {/* Why */}
      <Container className="pt-24">
        <SectionTitle eyebrow="لماذا إي مزاد" title="كل ما تحتاجه لمزاد عادل وآمن" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "آمن وموثوق", text: "مصادقة قوية للمستخدمين وتحقق من البريد والهاتف والهوية لبناء مجتمع جدير بالثقة." },
            { icon: Brain, title: "تقييمات بالذكاء الاصطناعي", text: "اقتراحات مبنية على البيانات للأسعار المبدئية لتعظيم إمكانات سلعتك." },
            { icon: Timer, title: "مزايدة لحظية", text: "إثارة المزادات المباشرة مع عدّاد تنازلي وتحديثات فورية لكل مزايدة." },
            { icon: BadgeCheck, title: "مزادات موثّقة", text: "قوائم مراجَعة عبر القطاعات الرئيسية، ولا يُنشر مزاد قبل اعتماد بشري." },
            { icon: Bell, title: "إشعارات ذكية", text: "تنبيه عند تجاوز مزايدتك وقبل انتهاء المزاد حتى لا تفوتك الفرصة." },
            { icon: Languages, title: "ثنائية اللغة", text: "دعم كامل للعربية والإنجليزية لقاعدة مستخدمين متنوعة داخل الأردن وخارجه." },
          ].map((f) => (
            <div key={f.title} className="rounded-3xl border border-line bg-ink-2/70 p-6">
              <span className="mb-5 grid size-12 place-items-center rounded-2xl bg-gold/10 ring-gold">
                <f.icon className="size-5 text-gold-2" />
              </span>
              <h3 className="mb-2 font-semibold text-white">{f.title}</h3>
              <p className="text-sm leading-7 text-mist">{f.text}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* CTA */}
      <Container className="pt-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-l from-gold-3 via-gold to-gold-2 p-10 text-ink md:p-14">
          <div className="absolute -bottom-24 -left-10 size-72 rounded-full bg-white/20 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-xl space-y-3">
              <h2 className="font-display text-3xl md:text-4xl">لديك أصل تريد بيعه بالمزاد؟</h2>
              <p className="leading-8 text-ink/80">
                أرسل طلب عرض مزادك، نراجعه ونقيّمه ونعيد لك مسودة الإعلان خلال يوم عمل.
              </p>
            </div>
            <Link href="/sell" className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white hover:bg-ink-3">
              اطلب عرض مزادك <ArrowLeft className="size-4" />
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}

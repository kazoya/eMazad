import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Container, PageHero, SectionTitle } from "@/components/ui";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "من نحن",
  description: "إي مزاد: منصة مزادات حديثة وسهلة الاستخدام تربط المشترين والبائعين في بيئة سلسة وآمنة.",
};

const features = [
  "مجموعة واسعة من الفئات: من العقارات والمركبات إلى النمر والأرقام المميزة والمقتنيات.",
  "تقييمات مدعومة بالذكاء الاصطناعي: اقتراحات تعتمد على البيانات للأسعار المبدئية لتعظيم إمكانات سلعتك.",
  "آمن وموثوق: مصادقة وتحقق قوي للمستخدمين، بما في ذلك التحقق من الهاتف والهوية.",
  "منصة ثنائية اللغة: دعم كامل للعربية والإنجليزية.",
  "مزايدة في الوقت الفعلي: إثارة المزادات المباشرة مع تحديثات وإشعارات فورية.",
];

const how = [
  { t: "أنشئ حسابك", d: "سجّل بالبريد الإلكتروني وأكّده، ثم وثّق رقم هاتفك." },
  { t: "اشحن رصيد المزايدة", d: "اختر الباقة المناسبة لتتمكن من المشاركة في المزادات." },
  { t: "زايد بثقة", d: "تابع العداد التنازلي، وزايد بزيادة لا تقل عن 50 د.أ على أعلى مزايدة." },
  { t: "الفوز والتسليم", d: "بعد الإغلاق يُعلن الفائز بعد التحقق البشري، ثم يتم الدفع ونقل الملكية نظامياً." },
];

const terms = [
  "المزايدة ملزمة لصاحبها بعد تأكيدها على المنصة الرسمية.",
  "الحد الأدنى للزيادة 50 ديناراً أردنياً على أعلى مزايدة قائمة.",
  "تقييم الذكاء الاصطناعي استرشادي ولا يُعد تثميناً قانونياً.",
  "لا يُنشر أي مزاد ولا يُعلن أي فائز قبل مراجعة واعتماد بشري.",
  "نقل ملكية العقارات والنمر والأرقام يتم عبر الجهات الرسمية المختصة.",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="من نحن"
        title={<>منصتك الأولى <span className="gold-text">للمزادات عبر الإنترنت</span></>}
        description="إي مزاد منصة مزادات حديثة وسهلة الاستخدام، مصممة لربط المشترين والبائعين في بيئة سلسة وآمنة — سواء كنت تبحث عن أصل فريد أو ترغب في بيع مقتنياتك الثمينة لجمهور واسع."
      />
      <Container className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-[2rem] border border-line bg-ink-2/70 p-8 leading-9 text-white/85">
          <p>
            مهمتنا هي إحداث نقلة في تجربة المزادات عبر الإنترنت من خلال الاستفادة من أحدث التقنيات، بما في ذلك
            التقييمات المدعومة بالذكاء الاصطناعي، والتحقق القوي من المستخدمين، والالتزام بالشفافية والمزايدة العادلة.
          </p>
          <p className="mt-4 text-mist">
            هذه الواجهة الجديدة تقدّم محتوى منصة{" "}
            <a href={site.sourceUrl} target="_blank" rel="noreferrer" className="text-gold-2 hover:underline">{site.source}</a>{" "}
            بتصميم أحدث وتجربة أسرع على الجوال.
          </p>
        </div>
        <div className="rounded-[2rem] border border-gold/25 bg-gradient-to-br from-gold/10 to-transparent p-8">
          <h2 className="mb-5 font-semibold text-white">ما نقدمه لك</h2>
          <ul className="space-y-4 text-sm leading-7 text-white/85">
            {features.map((f) => (
              <li key={f} className="flex gap-3"><CheckCircle2 className="mt-1 size-5 shrink-0 text-gold" />{f}</li>
            ))}
          </ul>
        </div>
      </Container>

      <Container className="pt-24" >
        <div id="how" className="scroll-mt-24">
          <SectionTitle eyebrow="كيف تعمل المزادات" title="أربع خطوات من التسجيل إلى الفوز" />
          <ol className="grid gap-4 md:grid-cols-4">
            {how.map((s, i) => (
              <li key={s.t} className="relative rounded-3xl border border-line bg-ink-2/70 p-6">
                <span className="tabular font-display text-5xl text-gold/30">{`0${i + 1}`}</span>
                <h3 className="mt-3 font-semibold text-white">{s.t}</h3>
                <p className="mt-2 text-sm leading-7 text-mist">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>

      <Container className="pt-24">
        <div id="terms" className="scroll-mt-24 rounded-[2rem] border border-line bg-ink-2/70 p-8 md:p-10">
          <h2 className="mb-6 font-display text-2xl text-white">الشروط والأحكام — أبرز البنود</h2>
          <ul className="grid gap-3 text-sm leading-7 text-white/85 md:grid-cols-2">
            {terms.map((t) => (
              <li key={t} className="flex gap-3 rounded-2xl bg-ink/50 p-4"><span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold" />{t}</li>
            ))}
          </ul>
          <Link href="/auctions" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink hover:bg-gold-2">
            ابدأ المزايدة <ArrowLeft className="size-4" />
          </Link>
        </div>
      </Container>
    </>
  );
}

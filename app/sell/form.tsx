"use client";

import { useState } from "react";
import { CheckCircle2, FileCheck2, Gavel, Mail, MessageCircle, ScanSearch, Send } from "lucide-react";
import { Container } from "@/components/ui";
import { sections } from "@/lib/data";
import { site, waLink } from "@/lib/config";

const field = "w-full rounded-2xl border border-line bg-ink px-4 py-3 text-sm text-white focus:border-gold focus:outline-none";
const labelCls = "mb-2 block text-xs text-mist";

const steps = [
  { icon: Send, title: "أرسل الطلب", text: "بيانات الأصل والسعر الذي تتوقعه ووسيلة التواصل." },
  { icon: ScanSearch, title: "مراجعة وتقييم", text: "نتحقق من الملكية والمستندات ونقترح السعر الابتدائي." },
  { icon: FileCheck2, title: "اعتماد الإعلان", text: "تصلك مسودة الإعلان، ولا يُنشر إلا بموافقتك واعتماد الإدارة." },
  { icon: Gavel, title: "المزاد والتسليم", text: "يبدأ العد التنازلي، وبعد الإغلاق نرتّب الدفع ونقل الملكية." },
];

export function SellForm() {
  const [message, setMessage] = useState<string | null>(null);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const s = (k: string) => String(f.get(k) ?? "").trim();
    const section = sections.find((x) => x.id === s("section"))?.name ?? "";
    setMessage(
      [
        "طلب عرض مزاد — إي مزاد",
        `الاسم: ${s("name")}`,
        `الهاتف: ${s("phone")}`,
        `القسم: ${section}`,
        `الأصل: ${s("title")}`,
        `الموقع: ${s("location")}`,
        `السعر المتوقع: ${s("price") || "غير محدد"} د.أ`,
        `التفاصيل: ${s("details")}`,
      ].join("\n")
    );
  };

  return (
    <Container className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
      <div className="rounded-[2rem] border border-line bg-ink-2/80 p-6 md:p-8">
        {message ? (
          <div className="rise space-y-6 text-center">
            <CheckCircle2 className="mx-auto size-14 text-emerald-300" />
            <div className="space-y-2">
              <h2 className="font-display text-2xl text-white">طلبك جاهز للإرسال</h2>
              <p className="text-sm leading-7 text-mist">اختر وسيلة الإرسال، وسيتواصل معك الفريق خلال يوم عمل.</p>
            </div>
            <pre className="whitespace-pre-wrap rounded-2xl bg-ink p-4 text-start font-sans text-xs leading-6 text-mist">{message}</pre>
            <div className="flex flex-col gap-2 sm:flex-row">
              <a href={waLink(message)} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gold py-3.5 text-sm font-semibold text-ink hover:bg-gold-2">
                <MessageCircle className="size-4" /> إرسال عبر واتساب
              </a>
              <a href={`mailto:${site.email}?subject=${encodeURIComponent("طلب عرض مزاد")}&body=${encodeURIComponent(message)}`} className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-line py-3.5 text-sm text-white hover:border-gold/50">
                <Mail className="size-4" /> إرسال بالبريد
              </a>
            </div>
            <button onClick={() => setMessage(null)} className="text-sm text-gold-2 hover:underline">تعديل الطلب</button>
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor="name">الاسم الكامل</label>
              <input id="name" name="name" required className={field} />
            </div>
            <div>
              <label className={labelCls} htmlFor="phone">رقم الهاتف</label>
              <input id="phone" name="phone" required inputMode="tel" dir="ltr" placeholder="07X XXX XXXX" className={field} />
            </div>
            <div>
              <label className={labelCls} htmlFor="section">القسم</label>
              <select id="section" name="section" defaultValue="real_estate" className={field}>
                {sections.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="location">الموقع</label>
              <input id="location" name="location" placeholder="المدينة / المنطقة" className={field} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls} htmlFor="title">عنوان الأصل</label>
              <input id="title" name="title" required placeholder="مثال: شقة 180 م² في خلدا / نمرة 12-3333" className={field} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls} htmlFor="price">السعر المتوقع (د.أ) — اختياري</label>
              <input id="price" name="price" type="number" className={field} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls} htmlFor="details">التفاصيل</label>
              <textarea id="details" name="details" rows={5} placeholder="الحالة، المستندات المتوفرة، سبب البيع، أي ملاحظات…" className={field} />
            </div>
            <button className="flex items-center justify-center gap-2 rounded-2xl bg-gold py-4 font-semibold text-ink transition hover:bg-gold-2 sm:col-span-2">
              <Send className="size-5" /> تجهيز الطلب
            </button>
          </form>
        )}
      </div>

      <div className="space-y-3">
        {steps.map((s, i) => (
          <div key={s.title} className="flex gap-4 rounded-3xl border border-line bg-ink-2/60 p-5">
            <div className="relative">
              <span className="grid size-12 place-items-center rounded-2xl bg-gold/10 ring-gold">
                <s.icon className="size-5 text-gold-2" />
              </span>
              <span className="tabular absolute -top-2 -start-2 grid size-6 place-items-center rounded-full bg-gold text-[11px] font-bold text-ink">{i + 1}</span>
            </div>
            <div>
              <h3 className="font-semibold text-white">{s.title}</h3>
              <p className="mt-1 text-sm leading-7 text-mist">{s.text}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

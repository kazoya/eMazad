"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Building2, Car, MessageCircle, Package, RectangleHorizontal, Smartphone, Sparkles } from "lucide-react";
import { Container } from "@/components/ui";
import {
  appraiseOther, appraisePhone, appraisePlate, appraiseRealEstate, appraiseVehicle, conditionFactor, propertyTypes,
  regions, vehicleSegments, type AppraisalKind, type AppraisalResult,
} from "@/lib/appraisal";
import { waLink } from "@/lib/config";
import { cn, jod } from "@/lib/utils";

const kinds: { id: AppraisalKind; label: string; icon: typeof Car }[] = [
  { id: "vehicle", label: "سيارة", icon: Car },
  { id: "real_estate", label: "عقار", icon: Building2 },
  { id: "plate", label: "نمرة مميزة", icon: RectangleHorizontal },
  { id: "phone", label: "رقم هاتف", icon: Smartphone },
  { id: "other", label: "أصل آخر", icon: Package },
];

const field = "w-full rounded-2xl border border-line bg-ink px-4 py-3 text-sm text-white focus:border-gold focus:outline-none";
const labelCls = "mb-2 block text-xs text-mist";

type Cond = keyof typeof conditionFactor;

export function AppraisalForm() {
  const [kind, setKind] = useState<AppraisalKind>("vehicle");
  const [result, setResult] = useState<AppraisalResult | null>(null);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const s = (k: string) => String(f.get(k) ?? "");
    const n = (k: string) => Number(f.get(k) ?? 0);
    setError("");
    let r: AppraisalResult | null = null;
    let sum = "";
    switch (kind) {
      case "vehicle":
        if (n("year") < 1980 || n("year") > 2027) return setError("أدخل سنة صنع صحيحة.");
        r = appraiseVehicle({ segment: s("segment") as keyof typeof vehicleSegments, year: n("year"), mileage: n("mileage"), condition: s("condition") as Cond });
        sum = `سيارة ${s("name")} موديل ${n("year")}، ${n("mileage")} كم`;
        break;
      case "real_estate":
        if (n("area") < 20) return setError("أدخل مساحة صحيحة بالمتر المربع.");
        r = appraiseRealEstate({ type: s("type") as keyof typeof propertyTypes, region: s("region") as keyof typeof regions, area: n("area"), age: n("age"), streets: n("streets") || 1 });
        sum = `${propertyTypes[s("type") as keyof typeof propertyTypes]} بمساحة ${n("area")} م²`;
        break;
      case "plate":
        r = appraisePlate(s("plate"));
        if (!r) return setError("أدخل رقم نمرة من 1 إلى 5 خانات.");
        sum = `نمرة ${s("code")}-${s("plate")}`;
        break;
      case "phone":
        r = appraisePhone(s("phone"));
        if (!r) return setError("أدخل رقماً أردنياً صحيحاً يبدأ بـ 077 أو 078 أو 079.");
        sum = `رقم هاتف ${s("phone")}`;
        break;
      case "other":
        if (n("reference") <= 0) return setError("أدخل سعراً مرجعياً تقريبياً.");
        r = appraiseOther({ reference: n("reference"), condition: s("condition") as Cond });
        sum = s("name") || "أصل";
        break;
    }
    setSummary(sum);
    setResult(r);
  };

  const condSelect = (
    <div>
      <label className={labelCls} htmlFor="condition">الحالة</label>
      <select id="condition" name="condition" defaultValue="Good" className={field}>
        {(Object.keys(conditionFactor) as Cond[]).map((c) => <option key={c} value={c}>{conditionFactor[c].label}</option>)}
      </select>
    </div>
  );

  return (
    <Container className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <div className="rounded-[2rem] border border-line bg-ink-2/80 p-6 md:p-8">
        <div className="mb-8 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {kinds.map((k) => (
            <button
              key={k.id}
              type="button"
              onClick={() => { setKind(k.id); setResult(null); setError(""); }}
              className={cn(
                "flex flex-col items-center gap-2 rounded-2xl border px-2 py-4 text-xs transition",
                kind === k.id ? "border-gold bg-gold/10 text-gold-2" : "border-line text-mist hover:text-white"
              )}
            >
              <k.icon className="size-5" />
              {k.label}
            </button>
          ))}
        </div>

        <form key={kind} onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
          {kind === "vehicle" && (
            <>
              <div className="sm:col-span-2">
                <label className={labelCls} htmlFor="name">الماركة والموديل</label>
                <input id="name" name="name" placeholder="مثال: تويوتا كامري" className={field} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls} htmlFor="segment">الفئة</label>
                <select id="segment" name="segment" defaultValue="mid" className={field}>
                  {Object.entries(vehicleSegments).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls} htmlFor="year">سنة الصنع</label>
                <input id="year" name="year" type="number" defaultValue={2020} className={field} />
              </div>
              <div>
                <label className={labelCls} htmlFor="mileage">المسافة المقطوعة (كم)</label>
                <input id="mileage" name="mileage" type="number" defaultValue={60000} className={field} />
              </div>
              {condSelect}
            </>
          )}

          {kind === "real_estate" && (
            <>
              <div>
                <label className={labelCls} htmlFor="type">نوع العقار</label>
                <select id="type" name="type" defaultValue="apartment" className={field}>
                  {Object.entries(propertyTypes).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls} htmlFor="area">المساحة (م²)</label>
                <input id="area" name="area" type="number" defaultValue={180} className={field} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls} htmlFor="region">المنطقة</label>
                <select id="region" name="region" defaultValue="upper" className={field}>
                  {Object.entries(regions).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls} htmlFor="age">عمر البناء (سنوات)</label>
                <input id="age" name="age" type="number" defaultValue={8} className={field} />
              </div>
              <div>
                <label className={labelCls} htmlFor="streets">عدد الواجهات / الشوارع</label>
                <input id="streets" name="streets" type="number" min={1} max={4} defaultValue={1} className={field} />
              </div>
            </>
          )}

          {kind === "plate" && (
            <>
              <div>
                <label className={labelCls} htmlFor="code">الرمز</label>
                <input id="code" name="code" defaultValue="10" className={cn(field, "text-center font-mono")} dir="ltr" />
              </div>
              <div>
                <label className={labelCls} htmlFor="plate">رقم النمرة</label>
                <input id="plate" name="plate" defaultValue="7777" inputMode="numeric" className={cn(field, "text-center font-mono")} dir="ltr" />
              </div>
            </>
          )}

          {kind === "phone" && (
            <div className="sm:col-span-2">
              <label className={labelCls} htmlFor="phone">رقم الهاتف</label>
              <input id="phone" name="phone" defaultValue="0797777777" inputMode="tel" className={cn(field, "text-center font-mono text-lg")} dir="ltr" />
            </div>
          )}

          {kind === "other" && (
            <>
              <div className="sm:col-span-2">
                <label className={labelCls} htmlFor="name">اسم الأصل ووصفه</label>
                <input id="name" name="name" placeholder="مثال: ساعة رولكس، لوحة فنية، معدات مطعم…" className={field} />
              </div>
              <div>
                <label className={labelCls} htmlFor="reference">سعر مرجعي تقريبي (د.أ)</label>
                <input id="reference" name="reference" type="number" defaultValue={5000} className={field} />
              </div>
              {condSelect}
            </>
          )}

          {error && <p className="rounded-2xl bg-rose-400/10 px-4 py-3 text-sm text-rose-200 sm:col-span-2">{error}</p>}

          <button className="flex items-center justify-center gap-2 rounded-2xl bg-gold py-4 font-semibold text-ink transition hover:bg-gold-2 sm:col-span-2">
            <Sparkles className="size-5" /> احصل على التقييم
          </button>
        </form>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        {result ? (
          <div className="rise overflow-hidden rounded-[2rem] border border-gold/30 bg-gradient-to-br from-gold/10 via-ink-2 to-ink-2">
            <div className="border-b border-line p-6 md:p-8">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-mist">{summary}</span>
                <span className="rounded-full bg-white/5 px-3 py-0.5 text-xs text-gold-2">ثقة {result.confidence}</span>
              </div>
              <div className="text-xs text-mist">نطاق القيمة التقديري</div>
              <div className="tabular mt-1 font-display text-3xl text-white md:text-4xl">
                {jod(result.min)} <span className="text-mist">—</span> {jod(result.max)}
              </div>
              <div className="mt-6 rounded-2xl border border-gold/30 bg-ink/60 p-4">
                <div className="text-xs text-mist">السعر الابتدائي المقترح للمزاد</div>
                <div className="tabular mt-1 text-2xl font-bold text-gold-2">{jod(result.suggestedStart)}</div>
              </div>
            </div>
            <div className="space-y-4 p-6 md:p-8">
              <h3 className="text-sm font-semibold text-white">أسباب التقدير</h3>
              <ul className="space-y-2.5 text-sm leading-7 text-mist">
                {result.reasons.map((r) => (
                  <li key={r} className="flex gap-2"><span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold" />{r}</li>
                ))}
              </ul>
              <p className="rounded-2xl bg-white/[0.04] p-4 text-xs leading-6 text-mist">
                الاقتراح يظهر فوراً — لكن النشر لا يتم إلا باعتماد بشري بعد مراجعة المستندات والصور. هذا التقدير استرشادي
                وليس تثميناً قانونياً.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Link href="/sell" className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gold py-3 text-sm font-semibold text-ink hover:bg-gold-2">
                  اعرضه في مزاد <ArrowLeft className="size-4" />
                </Link>
                <a
                  href={waLink(`مرحباً، حصلت على تقييم مبدئي في إي مزاد:\n${summary}\nالنطاق: ${result.min} – ${result.max} د.أ\nأرغب بمراجعة بشرية.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-line py-3 text-sm text-white hover:border-gold/50"
                >
                  <MessageCircle className="size-4 text-emerald-300" /> اطلب مراجعة خبير
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid min-h-80 place-items-center rounded-[2rem] border border-dashed border-line p-8 text-center">
            <div className="space-y-3">
              <Sparkles className="mx-auto size-10 text-gold/60" />
              <p className="text-mist">أدخل التفاصيل واضغط «احصل على التقييم»</p>
              <p className="text-xs text-mist/70">يعمل على السيارات والعقارات والنمر وأرقام الهواتف وأي أصل آخر.</p>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

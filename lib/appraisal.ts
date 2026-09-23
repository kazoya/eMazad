// نموذج تقدير أولي شفاف (قواعد) لتجربة التقييم الذكي.
// لا يُعد تثميناً قانونياً؛ النتيجة استرشادية وتخضع لمراجعة بشرية قبل النشر.

export type AppraisalKind = "vehicle" | "real_estate" | "plate" | "phone" | "other";

export type AppraisalResult = {
  min: number;
  max: number;
  suggestedStart: number;
  confidence: "عالية" | "متوسطة" | "منخفضة";
  reasons: string[];
};

const CURRENT_YEAR = 2026;
const round = (n: number, step = 100) => Math.max(step, Math.round(n / step) * step);

function finalize(mid: number, spread: number, confidence: AppraisalResult["confidence"], reasons: string[], step = 100): AppraisalResult {
  const min = round(mid * (1 - spread), step);
  const max = round(mid * (1 + spread), step);
  return { min, max, suggestedStart: round(min * 0.95, step), confidence, reasons };
}

export const vehicleSegments = {
  economy: { label: "اقتصادية (كيا، هيونداي، تويوتا يارس…)", base: 15000 },
  mid: { label: "متوسطة (كامري، أكورد، CR-V…)", base: 26000 },
  luxury: { label: "فاخرة (مرسيدس، BMW، لكزس…)", base: 48000 },
  pickup: { label: "بيك أب / دفع رباعي", base: 30000 },
} as const;

export const conditionFactor = {
  New: { label: "جديد", f: 1.05 },
  Excellent: { label: "ممتاز", f: 1 },
  Good: { label: "جيد", f: 0.92 },
  Fair: { label: "مقبول", f: 0.8 },
} as const;

export function appraiseVehicle(input: {
  segment: keyof typeof vehicleSegments;
  year: number;
  mileage: number;
  condition: keyof typeof conditionFactor;
}): AppraisalResult {
  const seg = vehicleSegments[input.segment];
  const age = Math.max(0, CURRENT_YEAR - input.year);
  const dep = Math.pow(0.9, age);
  const expectedKm = Math.max(1, age) * 15000;
  const kmDelta = (input.mileage - expectedKm) / 10000;
  const kmAdj = Math.min(1.06, Math.max(0.8, 1 - kmDelta * 0.008));
  const cond = conditionFactor[input.condition];
  const mid = seg.base * dep * kmAdj * cond.f;
  return finalize(mid, 0.07, age <= 8 ? "عالية" : "متوسطة", [
    `الفئة: ${seg.label.split(" (")[0]} — قيمة مرجعية ${seg.base.toLocaleString("ar-JO")} د.أ للسيارة الحديثة.`,
    `العمر ${age} سنة: استهلاك تقديري ${Math.round((1 - dep) * 100)}٪.`,
    input.mileage > expectedKm
      ? `المسافة أعلى من المعدل المتوقع (${expectedKm.toLocaleString("ar-JO")} كم) — خصم ${Math.round((1 - kmAdj) * 100)}٪.`
      : `المسافة ضمن المعدل أو أقل — أثر إيجابي بسيط.`,
    `الحالة «${cond.label}» تؤثر بمعامل ${cond.f}.`,
  ]);
}

export const regions = {
  premium: { label: "عبدون، دابوق، دير غبار، الصويفية", apt: 1150, land: 650 },
  upper: { label: "خلدا، الجبيهة، تلاع العلي، أم السماق", apt: 850, land: 380 },
  mid: { label: "طبربور، مرج الحمام، طريق المطار", apt: 600, land: 220 },
  gov: { label: "الزرقاء، إربد، السلط، مادبا", apt: 480, land: 140 },
  aqaba: { label: "العقبة", apt: 700, land: 260 },
} as const;

export const propertyTypes = {
  apartment: "شقة",
  villa: "فيلا",
  building: "عمارة",
  land: "أرض",
} as const;

export function appraiseRealEstate(input: {
  type: keyof typeof propertyTypes;
  region: keyof typeof regions;
  area: number;
  age: number;
  streets: number;
}): AppraisalResult {
  const r = regions[input.region];
  const isLand = input.type === "land";
  const typeF = input.type === "villa" ? 1.25 : input.type === "building" ? 0.9 : 1;
  const perM = isLand ? r.land : r.apt * typeF;
  const ageAdj = isLand ? 1 : 1 - Math.min(0.3, input.age * 0.015);
  const streetAdj = 1 + Math.max(0, Math.min(3, input.streets - 1)) * 0.03;
  const mid = perM * input.area * ageAdj * streetAdj;
  return finalize(mid, 0.09, "متوسطة", [
    `${propertyTypes[input.type]} في منطقة «${r.label.split("،")[0]}…» — سعر مرجعي ${Math.round(perM).toLocaleString("ar-JO")} د.أ للمتر.`,
    `المساحة ${input.area.toLocaleString("ar-JO")} م².`,
    isLand ? "الأرض لا تخضع لاستهلاك البناء." : `عمر البناء ${input.age} سنة — خصم ${Math.round((1 - ageAdj) * 100)}٪.`,
    input.streets > 1 ? `${input.streets} واجهات — علاوة ${Math.round((streetAdj - 1) * 100)}٪.` : "واجهة واحدة.",
    "التقييم العقاري الرسمي يتطلب مخمّناً مرخصاً قبل النشر.",
  ], 1000);
}

function pattern(digits: string) {
  const counts = new Map<string, number>();
  for (const d of digits) counts.set(d, (counts.get(d) ?? 0) + 1);
  const maxRepeat = Math.max(...counts.values());
  const allSame = maxRepeat === digits.length;
  let seq = digits.length >= 3;
  for (let i = 1; i < digits.length; i++) if (+digits[i] !== +digits[i - 1] + 1) seq = false;
  const mirrored = digits.length >= 4 && digits === [...digits].reverse().join("");
  return { maxRepeat, allSame, seq, mirrored };
}

export function appraisePlate(number: string): AppraisalResult | null {
  const d = number.replace(/\D/g, "");
  if (!d || d.length > 5) return null;
  const base = [0, 25000, 25000, 9000, 3000, 1600][d.length];
  const p = pattern(d);
  const mult = p.allSame ? 4 : p.seq ? 1.6 : p.mirrored ? 1.5 : p.maxRepeat >= d.length - 1 ? 1.8 : 1;
  const reasons = [`نمرة من ${d.length} خانات — قيمة مرجعية ${base.toLocaleString("ar-JO")} د.أ.`];
  if (p.allSame) reasons.push("جميع الخانات متطابقة — أعلى فئة تميّز (×4).");
  else if (p.seq) reasons.push("أرقام متسلسلة — علاوة ×1.6.");
  else if (p.mirrored) reasons.push("نمط متناظر — علاوة ×1.5.");
  else if (mult > 1) reasons.push("تكرار شبه كامل — علاوة ×1.8.");
  else reasons.push("لا نمط تميّز واضح.");
  reasons.push("قابلية النقل لدى إدارة الترخيص شرط قبل النشر.");
  return finalize(base * mult, 0.2, "متوسطة", reasons);
}

export function appraisePhone(number: string): AppraisalResult | null {
  const d = number.replace(/\D/g, "").replace(/^962/, "0");
  if (!/^07[789]\d{7}$/.test(d)) return null;
  const tail = d.slice(3);
  const p = pattern(tail);
  const base = p.maxRepeat >= 7 ? 4200 : p.maxRepeat === 6 ? 1900 : p.maxRepeat === 5 ? 700 : p.seq ? 900 : p.maxRepeat === 4 ? 300 : 80;
  const op = { "7": "أورانج", "8": "أمنية", "9": "زين" }[d[2]] ?? "";
  return finalize(base, 0.2, p.maxRepeat >= 5 ? "عالية" : "منخفضة", [
    `المشغّل حسب البادئة ${d.slice(0, 3)}: ${op} (يُتحقق منه لدى المشغّل).`,
    `أعلى تكرار لرقم واحد في الخانات السبع الأخيرة: ${p.maxRepeat}.`,
    p.maxRepeat >= 6 ? "نمط نادر جداً — طلب مرتفع في المزادات." : "نمط عادي إلى متوسط التميّز.",
    "نقل الملكية يتم عبر المشغّل بعد الدفع.",
  ], 50);
}

export function appraiseOther(input: { reference: number; condition: keyof typeof conditionFactor }): AppraisalResult {
  const cond = conditionFactor[input.condition];
  return finalize(input.reference * cond.f * 0.9, 0.15, "منخفضة", [
    `مبني على السعر المرجعي الذي أدخلته (${input.reference.toLocaleString("ar-JO")} د.أ).`,
    "خصم 10٪ لطبيعة البيع بالمزاد (بيع سريع).",
    `الحالة «${cond.label}» بمعامل ${cond.f}.`,
    "يُنصح بإرفاق صور وفاتورة أو شهادة أصالة لرفع دقة التقييم.",
  ]);
}

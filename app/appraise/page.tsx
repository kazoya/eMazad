import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { AppraisalForm } from "./form";

export const metadata: Metadata = {
  title: "التقييم الذكي",
  description: "احصل على نطاق تقييم استرشادي وسعر ابتدائي مقترح لسيارتك أو عقارك أو نمرتك أو رقمك المميز.",
};

export default function AppraisePage() {
  return (
    <>
      <PageHero
        eyebrow="تقييم مدعوم بالذكاء الاصطناعي"
        title={<>كم يساوي أصلك <span className="gold-text">في المزاد؟</span></>}
        description="اختر نوع الأصل وأدخل التفاصيل الأساسية، لتحصل فوراً على نطاق قيمة وسعر ابتدائي مقترح مع شرح واضح لأسباب التقدير."
      />
      <AppraisalForm />
    </>
  );
}

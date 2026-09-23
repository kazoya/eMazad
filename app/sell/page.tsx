import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { SellForm } from "./form";

export const metadata: Metadata = {
  title: "اعرض مزادك",
  description: "أرسل طلب عرض أصلك في مزاد: عقار، سيارة، نمرة، رقم مميز أو مقتنيات. نراجع الطلب ونقيّمه قبل النشر.",
};

export default function SellPage() {
  return (
    <>
      <PageHero
        eyebrow="طلب عرض مزاد"
        title={<>حوّل أصلك إلى <span className="gold-text">مزاد ناجح</span></>}
        description="املأ الطلب في دقيقة. يراجعه فريق الإدارة ويقيّمه، ثم يعود إليك بمسودة الإعلان والسعر الابتدائي المقترح — ولا يُنشر شيء قبل موافقتك واعتمادنا."
      />
      <SellForm />
    </>
  );
}

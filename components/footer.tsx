import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { Logo } from "./logo";
import { site, waLink } from "@/lib/config";
import { sections } from "@/lib/data";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-ink-2/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-sm text-sm leading-7 text-mist">{site.tagline}.</p>
          <div className="flex flex-wrap gap-2">
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-mist hover:text-white">
              <Mail className="size-3.5" /> {site.email}
            </a>
            <a href={waLink("مرحباً إي مزاد")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-mist hover:text-white">
              <MessageCircle className="size-3.5" /> {site.whatsappName} · <span dir="ltr">{site.whatsappLabel}</span>
            </a>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold text-white">المنصة</h3>
          <ul className="space-y-2.5 text-sm text-mist">
            <li><Link href="/auctions" className="hover:text-gold-2">كل المزادات</Link></li>
            <li><Link href="/appraise" className="hover:text-gold-2">التقييم بالذكاء الاصطناعي</Link></li>
            <li><Link href="/sell" className="hover:text-gold-2">اطلب عرض مزادك</Link></li>
            <li><Link href="/packages" className="hover:text-gold-2">باقات المزايدة</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold text-white">الأقسام</h3>
          <ul className="space-y-2.5 text-sm text-mist">
            {sections.slice(0, 5).map((s) => (
              <li key={s.id}>
                <Link href={`/auctions?section=${s.id}`} className="hover:text-gold-2">{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold text-white">عن إي مزاد</h3>
          <ul className="space-y-2.5 text-sm text-mist">
            <li><Link href="/about" className="hover:text-gold-2">من نحن</Link></li>
            <li><Link href="/about#how" className="hover:text-gold-2">كيف تعمل المزادات</Link></li>
            <li><Link href="/about#terms" className="hover:text-gold-2">الشروط والأحكام</Link></li>
            <li><a href={site.sourceUrl} target="_blank" rel="noreferrer" className="hover:text-gold-2">المنصة الحية: {site.source}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-mist/80 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 إي مزاد — واجهة جديدة لمحتوى منصة {site.source}.</p>
          <p>المزادات المعروضة هنا عينات عرض؛ المزايدة الفعلية والدفع يتمّان على المنصة الرسمية.</p>
        </div>
      </div>
    </footer>
  );
}

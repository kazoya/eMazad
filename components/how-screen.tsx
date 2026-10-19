"use client";

import Link from "next/link";
import { useState } from "react";
import { useSite } from "@/components/site";

const auction = [
  ["أنشئ حسابا موثقا", "Create a verified account", "سجل وأكمل توثيق الهوية. يضمن ذلك أن كل مزايد حقيقي.", "Sign up and complete a quick identity check so every bidder is real.", "لمرة واحدة"],
  ["ادفع العربون القابل للاسترداد", "Pay the refundable deposit", "يُحفظ في الضمان ويُعاد كاملا إن لم تفز.", "Held in escrow and returned in full if you don't win.", "محمي بالضمان"],
  ["زايد مباشرة واربح", "Bid live and win", "زايد لحظيا أو فعّل المزايدة التلقائية حتى حدك الأقصى.", "Bid in real time, or let auto-bid work up to your maximum.", ""],
  ["أكمل نقل الملكية", "Complete the transfer", "بعد الفوز يرتب الفريق نقل السند في دائرة الأراضي.", "After you win, the team handles the Land Department transfer.", ""],
];

const direct = [
  ["أنشئ حسابا موثقا", "Create a verified account", "نفس التوثيق المستخدم في كل المنصة.", "The same verification used across the platform.", ""],
  ["اعثر على عرض مباشر", "Find a direct offer", "سعر ثابت دون مزايدة، مع صور ومستندات موثقة.", "A fixed price, with photos and verified documents.", ""],
  ["ادفع العربون للحجز", "Pay the deposit to reserve", "يحتسب العربون من إجمالي السعر ويُحجز العقار لك.", "The deposit counts toward the price and reserves the property.", ""],
  ["إمزادك يتم الصفقة", "Emazadak completes the deal", "يتواصل الفريق خلال 24 ساعة لإتمام النقل.", "The team contacts you within 24 hours to finish the transfer.", ""],
];

const faq = [
  ["هل العربون قابل للاسترداد فعلا؟", "Is the deposit really refundable?", "في المزادات يُعاد كاملا إن لم تفز. في العروض المباشرة يحتسب من السعر.", "Auctions refund it if you don't win. Direct offers count it toward the price."],
  ["هل أحتاج عربونا قبل بدء المزاد؟", "Do I need a deposit before the auction starts?", "يمكنك دفعه في أي وقت. المزايدة المباشرة تفتح عند انطلاق المزاد.", "You can pay any time. Live bidding opens when the auction starts."],
  ["ما هي المزايدة التلقائية؟", "What is Auto-Bid?", "تزايد نيابة عنك بزيادة واحدة حتى الحد الذي تحدده.", "It bids one increment at a time up to the maximum you set."],
  ["كيف تنقل الملكية؟", "How is ownership transferred?", "بعد الفوز أو قبول العرض نرتب النقل في دائرة الأراضي.", "After a win or accepted offer we arrange the official transfer."],
];

export function HowScreen() {
  const { lang, t } = useSite();
  const en = lang === "en";
  const [mode, setMode] = useState<"auction" | "direct">("auction");
  const steps = mode === "auction" ? auction : direct;
  return (
    <>
      <section className="hero" style={{ minHeight: 360 }}>
        <div className="hero-inner">
          <span className="hero-pill">{en ? "Verified · Escrow-secured · Transparent" : "موثق · ضمان آمن · شفاف"}</span>
          <h1>{en ? "How Emazadak works" : "كيف يعمل إمزادك"}</h1>
          <p className="lead">{en ? "From browsing to ownership — a clear path for auctions and direct purchases." : "من التصفح إلى التملك — مسار واضح للمزادات والشراء المباشر."}</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap narrow">
          <div className="tabs">
            <button className={mode === "auction" ? "on" : ""} type="button" onClick={() => setMode("auction")}>{t("auction")}</button>
            <button className={mode === "direct" ? "on" : ""} type="button" onClick={() => setMode("direct")}>{t("directOffer")}</button>
          </div>
          <div className="steps">
            {steps.map((step, i) => (
              <article key={step[0]} className={i === 1 ? "step gold" : "step"}>
                <div className="num">{i + 1}</div>
                <div>
                  <h3 style={{ margin: 0 }}>{en ? step[1] : step[0]}</h3>
                  <p className="muted">{en ? step[3] : step[2]}</p>
                  {step[4] && <span className="chip chip-green">{step[4]}</span>}
                </div>
              </article>
            ))}
          </div>
          <h2 style={{ marginTop: 36 }}>{en ? "Frequently asked questions" : "الأسئلة الشائعة"}</h2>
          <div className="steps">
            {faq.map((item) => (
              <details key={item[0]} className="faq"><summary><b>{en ? item[1] : item[0]}</b></summary><p>{en ? item[3] : item[2]}</p></details>
            ))}
          </div>
          <div className="finance" style={{ marginTop: 28 }}>
            <div>
              <h2 style={{ margin: 0 }}>{en ? "Ready to find your property?" : "جاهز للعثور على عقارك؟"}</h2>
              <p>{en ? "Browse verified auctions and direct offers across Jordan." : "تصفح المزادات والعروض المباشرة الموثقة في كل الأردن."}</p>
            </div>
            <Link className="btn btn-gold" href="/auctions">{t("browse")}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
